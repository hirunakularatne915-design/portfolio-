# Portfolio — H. A. Kularatne (`HAK`)

Official portfolio website codebase for **H. A. Kularatne (`HAK`)** — Illustrator, 2D Animator, and Campaign Designer.

Built with **Next.js (Static Export)**, **Tailwind CSS v4**, and a custom **Sharp + FFmpeg media optimization pipeline** to deliver a fast-loading, mobile-first, ultra-low-memory showcase with zero backend dependencies.

---

## Key Highlights

- **Ultra-Lean Runtime:** Zero third-party browser libraries beyond `next`, `react`, and `react-dom` (`~10.5 KB` page JS, `< 15 MB` JS heap).
- **Automated Media Pipeline (`npm run prepare-media`):** Reads raw `.png`, `.jpg`, and `.mp4` files from `assets/` without modifying originals and generates:
  - `~39 KB` WebP grid thumbnails & `~97 KB` high-res WebP lightbox views.
  - `~51 KB` WebP video posters, `~90 KB` 4-second muted hover micro-loops, and web-streamable `+faststart` H.264 MP4s.
- **Uncropped Masonry Grid:** `4` columns on desktop, `3` on tablet, `2` on mobile (`< 768px`), preserving native `1:1`, `3:4`, `1.41:1`, `9:16`, and `16:9` aspect ratios with dominant-color placeholders (`0` layout shift).
- **Dual-Axis URL-Synced Filtering:** Filter simultaneously by **Design Category** and **Client / Series** (uniting works for the same client across separate `assets/` folders), with shareable `?category=...&client=...&work=...` URLs.
- **Light & Dark Themes:** Warm paper (`#FAF8F5`) and deep charcoal (`#111116`) themes with touch-safe `@media (hover: hover)` guards and thumb-zone mobile filter controls.

---

## Prerequisites

1. **Node.js** `v20` or newer (includes `npm`) — https://nodejs.org
2. **Git** — https://git-scm.com
3. **FFmpeg** *(recommended for compressing `.mp4` videos and generating video poster frames & hover previews)*:
   - **Windows (PowerShell):**
     ```powershell
     winget install Gyan.FFmpeg
     ```
   - **macOS (Homebrew):**
     ```bash
     brew install ffmpeg
     ```
   - **Ubuntu / Debian:**
     ```bash
     sudo apt update && sudo apt install ffmpeg -y
     ```
   *(After installing FFmpeg, restart your terminal so `ffmpeg -version` works. If FFmpeg is omitted, the script still works and copies raw videos as a fallback.)*

---

## How to Clone and Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/hirunakularatne915-design/portfolio-.git
cd portfolio-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Optimized Media Assets

Before starting the dev server for the first time (or whenever you add new files to `assets/`), run:

```bash
npm run prepare-media
```

> The first run takes ~30–60 seconds to compress all images and videos into `public/media/` and build `src/data/generated-media.json`. Subsequent runs skip unchanged files and finish in `< 1s`.

### 4. Start the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### 5. Build & Preview the Static Production Site

To compile the full static export into the `out/` directory (`npm run build` automatically runs `prepare-media` first):

```bash
npm run build
npm run start
```

You can deploy the generated `out/` folder directly to **Vercel**, **Cloudflare Pages**, **Netlify**, or **GitHub Pages** with zero server costs.

---

## Project Structure

```text
portfolio-/
├── assets/                          # Raw original artwork images & MP4 videos (untouched)
├── dev/
│   ├── plan.md                      # Complete UI/UX & engineering architecture blueprint
│   └── reference-websites.md        # Reference portfolio inspirations
├── public/
│   └── media/                       # Auto-generated WebP thumbnails, posters & optimized MP4s
├── scripts/
│   ├── folder-mapping.mjs           # Maps /assets subfolders to Categories & Clients
│   └── prepare-media.mjs            # Automated Sharp + FFmpeg media builder
├── src/
│   ├── app/
│   │   ├── globals.css              # Theme tokens, uncropped masonry CSS & hover guards
│   │   ├── icon.svg                 # HAK monogram favicon
│   │   ├── layout.tsx               # Root layout, fonts & dark-mode restorer
│   │   └── page.tsx                 # Static entry page
│   ├── components/
│   │   ├── ArtworkCard.tsx          # Lazy-loaded card + hover micro-video + mobile caption
│   │   ├── Header.tsx               # Sticky header & Light/Dark theme toggle
│   │   ├── Icons.tsx                # Lightweight inline SVG icons
│   │   ├── PortfolioExperience.tsx  # Dual-axis filter bar, gallery, motion strip & footer
│   │   └── WorkModal.tsx            # Memory-safe image/video viewer + related client strip
│   └── data/
│       ├── generated-media.json     # Auto-generated catalog manifest
│       └── portfolio.ts             # Artist profile, contact links, categories & helpers
└── next.config.mjs                  # Next.js static export configuration (`output: 'export'`)
```

---

## Content Updates & Maintenance

- **Update Bio, Email & Social Links:** Edit `ARTIST_INFO` in `src/data/portfolio.ts`.
- **Add New Artworks or Videos:**
  1. Drop new `.png`, `.jpg`, or `.mp4` files into an existing subfolder in `assets/` (or create a new subfolder).
  2. If you added a new subfolder or video, add its category/client rule in `scripts/folder-mapping.mjs` (and `src/data/portfolio.ts` if introducing a brand-new category or client ID).
  3. Run `npm run prepare-media` (or `npm run build`).

---

## Roadmap: How to Further Improve the Site

Here are high-impact improvements that keep the site fast, lightweight, and backend-free:

1. **Dedicated Client Case-Study Stories (`/projects/[client]`):**
   - Add short creative briefs, sketches/wireframes, and campaign outcomes for major multi-medium projects (such as *NSBM — Flower Path I Never Knew* and *Roshan Perera — Media*) so agencies and art directors can read the story behind the art.
2. **Touch Swipe & Pinch-to-Zoom in the Lightbox (`WorkModal.tsx`):**
   - Add lightweight pointer/touch event handlers (`onPointerDown` / `onPointerUp`) so mobile visitors can swipe left/right between artworks and double-tap to zoom in on fine illustration brushwork and Sinhala calligraphy.
3. **Bilingual English / Sinhala (`සිංහල`) Toggle:**
   - Because many posters, book covers, and animated stories feature rich Sinhala typography and voiceover, adding a lightweight `EN | සිං` dictionary toggle for titles and project descriptions will resonate strongly with both local and international clients.
4. **Edge Video Streaming / R2 Hosting as Motion Archive Grows:**
   - Four compressed MP4s (`~24.5 MB`) work great in static hosting, but once the portfolio grows to `15+` animated reels, hosting full-length videos on **Cloudflare R2** or **Mux / Bunny Stream** (while keeping WebP posters local) will keep git clones and CI builds instant.
5. **SEO, OpenGraph Social Preview Cards & Sitemap:**
   - Add an `opengraph-image.jpg` (e.g., using the `HAK` cover illustration), `robots.txt`, and `src/app/sitemap.ts` with a custom domain in `metadataBase` so links shared on WhatsApp, LinkedIn, Instagram, and X render rich visual preview cards.
6. **Zero-Backend Commission Inquiry Form:**
   - Add a compact `"Start a Project"` drawer in the Contact section connected to a free static form endpoint (**Formspree** or **Web3Forms**) with fields for *Project Type (Illustration / 2D Animation / Campaign)*, *Timeline*, and *Budget*, while keeping direct Email and WhatsApp buttons for instant outreach.
7. **AVIF + Responsive `srcSet` Tiers:**
   - Extend `scripts/prepare-media.mjs` to emit `400w` and `800w` `.avif` variants alongside `.webp` so low-bandwidth mobile connections download even smaller (`~18–25 KB`) grid thumbnails.
