// scripts/prepare-media.mjs
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { FOLDER_RULES, FILE_OVERRIDES } from './folder-mapping.mjs';

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'assets');
const OUT_MEDIA_DIR = path.join(ROOT, 'public', 'media');
const DATA_OUT_FILE = path.join(ROOT, 'src', 'data', 'generated-media.json');

const DIRS = ['thumb', 'full', 'poster', 'preview', 'video'];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function hasFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function getAllFiles(dir, baseFolder = '__root__') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subResults = await getAllFiles(fullPath, entry.name);
      results = results.concat(subResults);
    } else if (/\.(jpg|jpeg|png|webp|mp4)$/i.test(entry.name)) {
      results.push({ fullPath, folderName: baseFolder, fileName: entry.name });
    }
  }
  return results;
}

async function main() {
  console.log('🎨 Preparing optimized media from /assets...');
  for (const d of DIRS) {
    await fs.mkdir(path.join(OUT_MEDIA_DIR, d), { recursive: true });
  }
  await fs.mkdir(path.dirname(DATA_OUT_FILE), { recursive: true });

  const ffmpegReady = hasFfmpeg();
  if (!ffmpegReady) {
    console.warn('⚠️ FFmpeg not found in PATH. Videos will be copied as-is. Install FFmpeg (`winget install Gyan.FFmpeg`) for smaller video sizes & hover previews.');
  }

  const rawFiles = await getAllFiles(ASSETS_DIR);
  const items = [];
  const folderCounts = {};

  for (const file of rawFiles) {
    const relKey = file.folderName === '__root__' ? file.fileName : `${file.folderName}/${file.fileName}`;
    const rule = FOLDER_RULES[file.folderName] || {
      category: 'social-campaigns',
      client: 'personal-hak',
      seriesTitle: file.folderName,
      featuredPriority: 3,
    };
    const override = FILE_OVERRIDES[relKey] || {};
    const id = slugify(`${file.folderName}-${path.parse(file.fileName).name}`);
    const isVideo = /\.mp4$/i.test(file.fileName);

    folderCounts[file.folderName] = (folderCounts[file.folderName] || 0) + 1;
    const indexInFolder = folderCounts[file.folderName];

    // Curated view logic: include all priority 1-2 series (up to 6/3 per folder) + first 4 from large 30+ archives
    const maxCuratedFromFolder = rule.featuredPriority === 1 ? 6 : rule.featuredPriority === 2 ? 3 : 4;
    const isCurated = isVideo || indexInFolder <= maxCuratedFromFolder;

    if (!isVideo) {
      const thumbRel = `/media/thumb/${id}.webp`;
      const fullRel = `/media/full/${id}.webp`;
      const thumbOut = path.join(OUT_MEDIA_DIR, 'thumb', `${id}.webp`);
      const fullOut = path.join(OUT_MEDIA_DIR, 'full', `${id}.webp`);

      const img = sharp(file.fullPath);
      const meta = await img.metadata();
      const stats = await img.stats();
      const dom = stats.dominant || { r: 235, g: 232, b: 226 };
      const dominantHex = `#${[dom.r, dom.g, dom.b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;

      if (!existsSync(thumbOut)) {
        await sharp(file.fullPath)
          .resize({ width: 640, withoutEnlargement: true })
          .webp({ quality: 78, effort: 4 })
          .toFile(thumbOut);
      }
      if (!existsSync(fullOut)) {
        await sharp(file.fullPath)
          .resize({ width: 1440, height: 1440, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 86, effort: 4 })
          .toFile(fullOut);
      }

      const singleItemFolder = file.folderName === '__root__' || file.folderName === 'New folder (13)';

      items.push({
        id,
        type: 'image',
        title: override.title || (singleItemFolder ? rule.seriesTitle : `${rule.seriesTitle} #${indexInFolder}`),
        seriesTitle: rule.seriesTitle,
        category: override.category || rule.category,
        client: override.client || rule.client,
        width: meta.width || 1080,
        height: meta.height || 1080,
        dominantColor: dominantHex,
        thumbSrc: thumbRel,
        fullSrc: fullRel,
        isCurated,
        priority: rule.featuredPriority,
      });
    } else {
      const posterRel = `/media/poster/${id}.webp`;
      const previewRel = `/media/preview/${id}.mp4`;
      const videoRel = `/media/video/${id}.mp4`;

      const posterOut = path.join(OUT_MEDIA_DIR, 'poster', `${id}.webp`);
      const previewOut = path.join(OUT_MEDIA_DIR, 'preview', `${id}.mp4`);
      const videoOut = path.join(OUT_MEDIA_DIR, 'video', `${id}.mp4`);

      const timestamp = override.posterTimestamp || '00:00:03';

      let realWidth = override.aspectWidth || 720;
      let realHeight = override.aspectHeight || 1280;

      if (ffmpegReady) {
        if (!existsSync(posterOut)) {
          const tempPng = `${posterOut}.png`;
          execFileSync('ffmpeg', ['-y', '-ss', timestamp, '-i', file.fullPath, '-frames:v', '1', tempPng], { stdio: 'ignore' });
          const posterMeta = await sharp(tempPng).metadata();
          if (posterMeta.width && posterMeta.height) {
            realWidth = posterMeta.width;
            realHeight = posterMeta.height;
          }
          await sharp(tempPng).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 82 }).toFile(posterOut);
          await fs.unlink(tempPng);
        } else {
          const posterMeta = await sharp(posterOut).metadata();
          if (posterMeta.width && posterMeta.height) {
            realWidth = posterMeta.width;
            realHeight = posterMeta.height;
          }
        }
        if (!existsSync(previewOut)) {
          // 4-second muted 480p hover micro-loop (< 700 KB!)
          execFileSync(
            'ffmpeg',
            ['-y', '-ss', '00:00:02', '-t', '4', '-i', file.fullPath, '-an', '-vf', 'scale=-2:480', '-c:v', 'libx264', '-crf', '28', '-preset', 'fast', '-movflags', '+faststart', previewOut],
            { stdio: 'ignore' }
          );
        }
        if (!existsSync(videoOut)) {
          // Streamable faststart MP4 with audio intact (~65-75% smaller than raw file!)
          execFileSync(
            'ffmpeg',
            ['-y', '-i', file.fullPath, '-c:v', 'libx264', '-crf', '25', '-preset', 'medium', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', videoOut],
            { stdio: 'ignore' }
          );
        }
      } else {
        if (!existsSync(videoOut)) await fs.copyFile(file.fullPath, videoOut);
      }

      items.push({
        id,
        type: 'video',
        title: override.title || `${rule.seriesTitle} #${indexInFolder}`,
        seriesTitle: rule.seriesTitle,
        category: override.category || rule.category,
        client: override.client || rule.client,
        width: realWidth,
        height: realHeight,
        dominantColor: '#18181f',
        thumbSrc: existsSync(posterOut) ? posterRel : '',
        previewVideoSrc: existsSync(previewOut) ? previewRel : '',
        fullSrc: videoRel,
        durationLabel: override.durationLabel || 'Reel',
        isCurated: true,
        priority: 1,
      });
    }
  }

  // Interleave items cleanly across folders and priorities so the masonry wall has rich visual variety
  const byFolder = new Map();
  for (const item of items) {
    const key = `${item.priority}-${item.seriesTitle}`;
    if (!byFolder.has(key)) byFolder.set(key, []);
    byFolder.get(key).push(item);
  }
  const sortedKeys = [...byFolder.keys()].sort();
  const interleaved = [];
  let added = true;
  let round = 0;
  while (added) {
    added = false;
    for (const k of sortedKeys) {
      const arr = byFolder.get(k);
      if (round < arr.length) {
        interleaved.push(arr[round]);
        added = true;
      }
    }
    round++;
  }

  await fs.writeFile(DATA_OUT_FILE, JSON.stringify(interleaved, null, 2), 'utf8');
  console.log(`✅ Generated ${interleaved.length} optimized portfolio items -> src/data/generated-media.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
