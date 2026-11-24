// src/components/ArtworkCard.tsx
'use client';

import { useRef, useState } from 'react';
import { PortfolioItem, getCategoryLabel, getClientShortLabel } from '@/data/portfolio';
import { PlayIcon } from './Icons';

interface Props {
  item: PortfolioItem;
  eager?: boolean;
  onSelect: (item: PortfolioItem) => void;
}

export function ArtworkCard({ item, eager = false, onSelect }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [hoveringVideo, setHoveringVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (item.type === 'video' && item.previewVideoSrc) {
      setHoveringVideo(true);
      requestAnimationFrame(() => {
        videoRef.current?.play().catch(() => {});
      });
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setHoveringVideo(false);
    }
  };

  return (
    <article className="masonry-item">
      <button
        type="button"
        onClick={() => onSelect(item)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="artwork-card group block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 rounded-lg overflow-hidden"
      >
        {/* Exact Aspect-Ratio Wrapper prevents ANY layout jump while lazy loading */}
        <div
          className="relative w-full overflow-hidden rounded-lg border"
          style={{
            aspectRatio: `${item.width} / ${item.height}`,
            backgroundColor: item.dominantColor,
            borderColor: 'var(--border-hairline)',
          }}
        >
          {item.thumbSrc && (
            <img
              src={item.thumbSrc}
              alt={item.title}
              width={item.width}
              height={item.height}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={(e) => {
                if (e.currentTarget.complete) setLoaded(true);
              }}
              ref={(el) => {
                if (el?.complete && !loaded) setLoaded(true);
              }}
              className={`artwork-img h-full w-full object-contain transition-all duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Lightweight 4-second muted hover preview ONLY mounted when hovered on desktop! */}
          {item.type === 'video' && hoveringVideo && item.previewVideoSrc && (
            <video
              ref={videoRef}
              src={item.previewVideoSrc}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Persistent Video Pill Badge (inspired by Mat Voyce's explicit action cue) */}
          {item.type === 'video' && (
            <span
              className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm"
              style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(17, 17, 22, 0.85)',
                color: '#faf8f5',
              }}
            >
              <PlayIcon className="w-3.5 h-3.5" />
              {item.durationLabel || 'Motion'}
            </span>
          )}

          {/* Desktop Soft Warm-Paper / Ink Hover Veil (Essi Kimpimäki + 109ichiki @media hover guard) */}
          <div
            className="artwork-hover-veil pointer-events-none absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-200"
            style={{
              backgroundColor: 'var(--hover-veil)',
              color: 'var(--hover-veil-text)',
            }}
          >
            <span className="text-[11px] uppercase tracking-wider opacity-75" style={{ fontFamily: 'var(--font-mono)' }}>
              {getClientShortLabel(item.client)} · {getCategoryLabel(item.category)}
            </span>
            <span className="mt-1 text-sm font-medium leading-snug" style={{ fontFamily: 'var(--font-serif)' }}>
              {item.title}
            </span>
          </div>
        </div>

        {/* Mobile & Tablet Visible Micro-Caption (Gina Kirlew lesson: hover doesn't exist on touchscreens!) */}
        <div className="mt-1.5 flex items-center justify-between gap-2 px-0.5 lg:hidden">
          <span className="truncate text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
            {item.seriesTitle}
          </span>
          <span
            className="shrink-0 text-[10px] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            {getClientShortLabel(item.client)}
          </span>
        </div>
      </button>
    </article>
  );
}
