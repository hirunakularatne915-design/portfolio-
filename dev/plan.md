# Official Portfolio Design & Engineering Blueprint — H. A. Kularatne (`HAK`)

> **Document Purpose:** This is a complete, end-to-end product, UI/UX, media optimization, and Next.js engineering blueprint designed so **anyone—even a first-time Next.js beginner—can follow every step from zero to a deployed, blazing-fast portfolio website**.
>
> **Core Engineering Targets:**
> - **Low Memory Footprint:** `< 15 MB` JavaScript heap, `< 500` active DOM nodes, `0` WebGL/Three.js canvases, `0` heavy animation engines.
> - **Fast Initial Load:** `< 1.0s` First Contentful Paint (FCP), `< 350 KB` initial page payload, static HTML/CSS generation (`output: 'export'`), no backend required.
> - **Strict Lazy Loading & Video Guardrails:** Zero background video streaming until requested or visible; pre-compressed WebP thumbnails + FFmpeg-optimized MP4 previews + `IntersectionObserver` auto-pause/unload when offscreen.
> - **Mobile-First & Touch-Safe:** True 2-column responsive gallery on phones (`390px+`), thumb-zone navigation, `@media (hover: hover)` guards so hover states never get stuck on touchscreens, and visible mobile labels.

---

## Table of Contents

1. [Audit of Your Real `assets/` Folder (Categories, Clients & Media Specs)](#1-audit-of-your-real-assets-folder-categories-clients--media-specs)
2. [Deep-Dive Audit of All 12 Reference Websites (What We Keep vs. What We Reject)](#2-deep-dive-audit-of-all-12-reference-websites-what-we-keep-vs-what-we-reject)
3. [The Cohesive Design System & "Bridge" UI Features](#3-the-cohesive-design-system--bridge-ui-features)
4. [Tech Stack & Ultra-Minimal Dependency Policy](#4-tech-stack--ultra-minimal-dependency-policy)
5. [Information Architecture & Page-by-Page Wireframe Blueprint](#5-information-architecture--page-by-page-wireframe-blueprint)
6. [Beginner's Step-by-Step Build Guide (From Empty Repo to Finished Site)](#6-beginners-step-by-step-build-guide-from-empty-repo-to-finished-site)
   - [Phase 0: Prerequisites & Installing Tools](#phase-0-prerequisites--installing-tools)
   - [Phase 1: Initializing Next.js in This Repository](#phase-1-initializing-nextjs-in-this-repository)
   - [Phase 2: Automated Media Compression & Manifest Script (Images + Videos)](#phase-2-automated-media-compression--manifest-script-images--videos)
   - [Phase 3: Data Schema — Connecting Categories AND Shared Clients](#phase-3-data-schema--connecting-categories-and-shared-clients)
   - [Phase 4: Global Styling, Theme Tokens & Fonts](#phase-4-global-styling-theme-tokens--fonts)
   - [Phase 5: Building Every Component (Copy-Paste Ready Architecture)](#phase-5-building-every-component-copy-paste-ready-architecture)
   - [Phase 6: Assembling the Pages & URL-Synced Filtering](#phase-6-assembling-the-pages--url-synced-filtering)
   - [Phase 7: Testing Performance, Memory & Mobile Responsiveness](#phase-7-testing-performance-memory--mobile-responsiveness)
   - [Phase 8: Zero-Cost Static Deployment](#phase-8-zero-cost-static-deployment)
7. [Final Quality & Performance Checklist](#7-final-quality--performance-checklist)

---

## 1. Audit of Your Real `assets/` Folder (Categories, Clients & Media Specs)

Before choosing UI patterns, every subfolder in `assets/` was inspected for visual style, dimensions, file sizes, and client relationships. Your portfolio spans **136 total media files** (`132` images + `4` motion/animated storytelling videos) across **16 locations**.

### 1.1 Subfolder-by-Subfolder Breakdown

| Current Folder in `assets/` | File Count | Dimensions & Aspect Ratio | Raw Size Range | Design Category (Suggested Clean Slug) | Client / Project Identified |
| :--- | :---: | :---: | :---: | :--- | :--- |
| `assets/photo_2026-11-24_20-16-53.jpg` (root) | 1 JPG | `720×720` (`1:1` Square) | `141 KB` | **Personal / Cover Art** (`cover-art`) | H. A. Kularatne (`HAK` monogram signature artwork — *"Natan Ayek Suramathin"*) |
| `New folder` | 15 JPGs | `900×900` (`1:1` Square) | `30–58 KB` | **Spot & Character Illustrations** (`spot-illustration`) | **NSBM Green University** — *"Ma Nodath Mal Petha (Flower Path I Never Knew)"* |
| `New folder (2)` | 3 JPGs | `905×1280` (`~3:4` Portrait) | `156–182 KB` | **Commercial Flyers & Posters** (`commercial-posters`) | **March IQ** (Tech & Software Agency promotional illustrated flyers) |
| `New folder (3)` | 6 JPGs | `1080×1080` (`1:1` Square) | `108–156 KB` | **Educational Social Posts — Language** (`edu-social`) | **Samath Institute / Shashi Sensei** (Japanese Language class campaigns) |
| `New folder (4)` | 7 JPGs | `904×1280` (`~3:4` Portrait) | `63–365 KB` | **Event Countdown & Teaser Series** (`event-countdown`) | **NSBM Green University** — *"Ma Nodath Mal Petha"* floral numeral countdown |
| `New folder (5)` | 12 JPGs | `904×1280` (`~3:4` Portrait) | `106–266 KB` | **Storybook & Narrative Posters** (`narrative-posters`) | **NSBM Green University** — *"Ma Nodath Mal Petha"* folklore scenes |
| `New folder (6)` | 6 JPGs | `904×1280` (`~3:4` Portrait) | `82–147 KB` | **Cultural & Event Key Visuals** (`cultural-key-visuals`) | **NSBM Green University** — *"Ma Nodath Mal Petha"* cultural tributes & oil lamps |
| `New folder (7)` | 3 JPGs | `1080×1080` (`1:1` Square) | `155–183 KB` | **Book Fair & Literary Promos** (`literary-promos`) | **Vinuka Walawage / Colombo International Book Fair** (*"Guru Pata Vihagun"*) |
| `New folder (8)` | 6 JPGs | `1080×1080` (`1:1` Square) | `130–182 KB` | **Educational Subject Campaigns** (`subject-campaigns`) | **Samath Institute & Educators** (Asanka Ranasinghe Biology, Randika Vishwanath Combined Maths) |
| `New folder (9)` | 3 JPGs | `904×1280` (`~3:4` Portrait) | `68–76 KB` | **Minimalist Editorial & Poetry** (`editorial-typographic`) | **Personal / Poetic Photography & Typography Series** |
| `New folder (10)` | **4 MP4s** | `3× 9:16` Vertical Reels + `1× 16:9` Wide | **`9.1 MB – 27.2 MB`** (`67.5 MB` total!) | **2D Animation & Motion Storytelling** (`motion-animation`) | **Split across 2 clients:** `video_...57.mp4` & `...39.mp4` = **Roshan Perera (Media)**; `video_...04.mp4` & `...49.mp4` = **NSBM ("Ma Nodath Mal Petha")** |
| `New folder (11)` | 11 PNGs | `1080×1080` (`1:1` Square) | `350–569 KB` | **Illustrated Concept & Quote Cards** (`illustrated-quotes`) | **Roshan Perera** (*Media — Api Wenas Madhyayak*) |
| `New folder (12)` | 2 PNGs | `1080×1080` (`1:1` Square) | `668–922 KB` | **Digital Watercolor Portraits** (`watercolor-portraits`) | **Roshan Perera** (Tribute portraits of Sri Lankan cultural icons w/ calligraphy) |
| `New folder (13)` | 1 JPG | `1280×904` (`~1.41:1` Landscape) | `142 KB` | **Stage & Backdrop Design** (`stage-backdrop`) | **NSBM Green University** — *"Ma Nodath Mal Petha"* wide stage illustration |
| `Roshan Sir - Portfolio` | 31 PNGs | `1080×1080` (`1:1` Square) | **`492 KB – 1.47 MB`** (`~29 MB` total) | **Social Media Campaign Art** (`campaign-series-roshan`) | **Roshan Perera** (*Media A/L* illustrated campaign series) |
| `Samath - Portfolio` | 36 PNGs | `1080×1080` (`1:1` Square) | **`204 KB – 1.60 MB`** (`~33 MB` total) | **Institutional Brand Campaign** (`campaign-series-samath`) | **Samath Institute (Horana)** (Illustrated literary/cinema quote & brand series) |

### 1.2 Critical Insights From Your Assets That Shape Our Architecture
1. **Cross-Folder Shared Clients (Exactly as You Mentioned!):**
   - **NSBM — *"Ma Nodath Mal Petha"* (`31` pieces)** is split across **5 folders**: Spot Illustrations (`New folder`), Countdown Posters (`New folder (4)`), Narrative Posters (`New folder (5)`), Cultural Visuals (`New folder (6)`), Stage Backdrop (`New folder (13)`), plus **2 Animated Videos** inside `New folder (10)`!
   - **Roshan Perera — *Media* (`46` pieces)** is split across **4 folders**: Illustrated Quotes (`New folder (11)`), Watercolor Portraits (`New folder (12)`), Campaign Art (`Roshan Sir - Portfolio`), plus **2 Animated Storytelling Reels** inside `New folder (10)`!
   - **Samath Institute (`48` pieces)** is split across **3 folders**: Japanese Language (`New folder (3)`), Science/Maths (`New folder (8)`), and Institutional Brand Series (`Samath - Portfolio`).
   - *Design Solution:* We need **Dual-Axis Filtering** (`Filter by Design Category` **AND** `Filter by Client / Project`) plus a **"More for this Client" strip** inside the artwork viewer so visitors can either browse all *Watercolor Portraits* OR view the entire *NSBM* or *Roshan Perera* campaign across images and videos in one click!
2. **File Size Danger Zones:**
   - The PNGs in `Roshan Sir - Portfolio` and `Samath - Portfolio` are `0.8 MB – 1.6 MB` *each* (`~62 MB` combined). Serving raw PNGs in a grid would destroy mobile load speed and RAM. Converting grid thumbnails to `600px` WebP drops each file from `~1,200 KB` to **`~35–55 KB` (a 95% size reduction!)**.
   - The 4 MP4 videos in `New folder (10)` total **`67.5 MB`** (with rich Sinhala voiceover, music, and English subtitles). Auto-loading these on page load would freeze mobile data connections. They must use **static WebP poster frames + tiny `<1.2 MB` muted 4-second hover/viewport preview clips**, loading the full audio-enabled MP4 **only when the user clicks to watch**.
3. **Mixed Aspect Ratios (`1:1`, `3:4`, `1.41:1`, `9:16`, `16:9`):**
   - Uniform `1:1` or `4:5` `object-fit: cover` grids would chop off the typography, client logos, and Sinhala calligraphy at the top/bottom of your `3:4` posters and `9:16` / `16:9` videos. Our grid **must preserve native aspect ratios without cropping**.

---

## 2. Deep-Dive Audit of All 12 Reference Websites (What We Keep vs. What We Reject)

Every website in `dev/reference-websites.md` was visited and profiled for DOM count, JS heap memory, network transfer, mobile `390×844` layout, and UI/UX quality.

### 2.1 Master Comparison Matrix

| # | Website | Live JS Heap | Initial Network | Mobile `390px` UX | Core Strength | Why We Don't Copy It Blindly |
| :-: | :--- | :---: | :---: | :---: | :--- | :--- |
| 1 | **Gina Kirlew** (`ginakirlew.com`) | `14.7–30.2 MB` | `482 KB` (**`115 MB`** w/ grid video!) | Good (1-col + visible captions) | Approachable white canvas; mixing video + images inline; permanent mobile captions | **115 MB background video spike!** Extra click needed to reach work; huge `270px` header |
| 2 | **Susann Hoffmann** (`susannhoffmann.com`) | **`2.68–6.07 MB`** | **`300 KB`** (15/50 lazy) | Okay (1-col, textless tiles) | **Ultra-low RAM**; lands straight on work; top-level category filters; modular case studies | Hover-only titles vanish on mobile; `1:1` crop cuts off `3:4`/`9:16` art; non-sticky sidebar |
| 3 | **Adam Halls** (`adamhalls.co.uk`) | `5.36–6.15 MB` | `~350 KB` | **Broken** (tiny `83px` 3-col stamps) | Quiet museum white-cube feel; clean deep-linked white lightbox; low JS memory | Zero category filters; 141-item infinite scroll bloats DOM; broken 3-column mobile grid |
| 4 | **Essi Kimpimäki** (`essillustration.com`) | **`5.35 MB`** | **`65.6 KB`** | **Best** (2-col uncropped masonry) | **True-aspect-ratio 4-col desktop / 2-col mobile masonry**; warm cream hover veil; bottom index | `/Work` route mistakenly dumps a `103,748px` stream above the grid; zero category filters; no video |
| 5 | **Nathalie Lété** (`nathalie-lete.com`) | **`~0 MB`** (`0` JS) | `~2.5 MB` | Good (custom mobile art swap) | Warm `#FAF6F1` antique paper mood; zero-JS speed; structured client/collaborator directory | No gallery or filters; bakes text into giant JPEGs; downloads both desktop & mobile JPEGs |
| 6 | **Jennifer Xiao** (`jenniferxiao.com`) | `21–23 MB` | `1.39 MB` (140 reqs) | **Broken** (fixed `980px` desktop zoom) | Playful hand-drawn identity; uncropped row proportions; AVIF image compression | Legacy fixed `width=980` mobile viewport; Wix 140-request bloat; broken comic lightbox |
| 7 | **Rina Maimon** (`rinamaimon.com`) | **`4–6 MB`** | `2.33 MB` (286 reqs) | **Great** (2-col clean gallery) | Refined editorial serif + sans pairing; 2-col mobile grid; smooth hover transition; inquiry CTA | Forced `4:5` crop ruins wide work; 286 Shopify e-commerce requests |
| 8 | **1:09 Ichiki** (`109ichiki.com`) | `10–16 MB` | `1.53 MB` (30 reqs) | **Great** (2-col + bottom-right menu) | **Dual-axis URL-synced radio filters + live item count**; URL-routed modal detail view; Dark/Light toggle; `@media (hover: hover)` guards; thumb-zone mobile button | **9 WebGL2 canvases** tax low-end mobile GPUs; `10,174px` long home scroll |
| 9 | **Olha Lazarieva** (`olhalazarieva.com`) | `24–30 MB` | `5.37 MB` | Good drawer, heavy GPU | Crisp hairline discipline/service columns; sharp `[ BRACKETED ]` monospace metadata | Three.js 3D room hides work behind a `1/9` slider; scroll-hijacking; zero lazy `<img>` tags |
| 10 | **Miłosz Chudy** (`bychudy.com`) | `18–19 MB` | `4.27 MB` (`18 MB` modal) | **Broken** (overlapping icons/titles) | Fast modal inspection without losing scroll position | Scattered desktop icons collide on `390px` screens; `Ae/Ps/Ai` buttons are gag popups, not filters |
| 11 | **Sarah Oh** (`sarahoh.info`) | `15 MB` | Heavy (`13` autoplay videos + GIFs) | **Great** (sticky pill + clean stack) | **2-second scannable hero intro + discipline pill tags**; clean separation of video reels & zoomable illustrations | `13` simultaneous autoplay videos + `700px` GIFs delay `window.onload` past `10s` |
| 12 | **Mat Voyce** (`matvoyce.tv`) | `20–34 MB` | **`65.37 MB`!** | **Great** (explicit `View →` touch pill) | **Explicit touch `View →` badge**; tactile pill buttons; mixed `9:16`/`4:5` + `16:9` Bento video layout | **65 MB homepage HLS prefetching**; blocking `0–100` preloader; Three.js + GSAP overhead |

---

### 2.2 Selected Inspirations Matrix (Only Features That Pass Low-Memory, Fast-Load & Great UX)

1. **From `nathalie-lete.com` -> Warm Paper Canvas & Client Directory:**
   - *Selected:* Warm off-white atelier paper background (`#FAF8F5`) instead of sterile `#FFFFFF`, so both white-bordered Samath/Roshan posts and dark night-sky illustrations have subtle separation from the page background! Plus a clean, lightweight text-based **Clients & Collaborators Index** in the About/Footer section.
   - *Rejected:* Giant flat image-maps and hidden duplicate `<img>` tags.
2. **From `sarahoh.info` -> Immediate 2-Second Scannable Hero + Discipline Pill Tags:**
   - *Selected:* Compact, zero-fluff hero strip (`H. A. Kularatne — Illustrator, Visual Storyteller & Campaign Designer based in Sri Lanka`) paired with crisp `1px`-bordered discipline tags (`2D Animation`, `Editorial Illustration`, `Campaign Design`, `Portraiture`) so art directors understand your range in 2 seconds before seeing the work grid right above the fold.
   - *Rejected:* Unoptimized animated GIFs and 13 simultaneous auto-playing videos.
3. **From `109ichiki.com` -> Dual-Axis URL-Synced Filtering + Live Counter + Modal Routing + Touch-Safe Hovers + Dark Mode + Thumb Menu:**
   - *Selected:*
     1. **Dual-Axis Filter Bar** with live work count (`Showing 31 of 136 works`): **Axis 1 = Design Category** (`All`, `Motion & Animation`, `Storybook & Folklore`, `Portraits`, `Social Campaigns`, `Posters & Flyers`, `Editorial`) × **Axis 2 = Client / Series** (`All Clients`, `NSBM — Flower Path`, `Roshan Perera`, `Samath Institute`, `March IQ`, `Book Fair`, `Personal`).
     2. **URL Query Sync (`?category=motion-animation&client=roshan-perera`)** so you can send a specific filtered link directly to a prospective client!
     3. **URL-Backed Modal Detail Overlay**: Clicking any artwork or video opens a crisp modal window over the gallery (preserving exact scroll position and active filters!).
     4. **`@media (hover: hover) and (pointer: fine)` CSS Guards** so hover effects never stick on mobile phones.
     5. **Zero-Cost CSS Variable Light / Dark Mode Toggle** (`#FAF8F5` Warm Paper <-> `#121216` Deep Charcoal Ink) in the header.
     6. **Floating Bottom-Right Mobile Filter/Menu Trigger** in the natural thumb zone on phones.
   - *Rejected:* All 9 Three.js / WebGL2 canvases and duplicated DOM window layers.
4. **From `essillustration.com` -> True-Aspect-Ratio 4-Col Desktop / 2-Col Mobile Masonry + Warm Cream Hover Veil:**
   - *Selected:* Multi-column layout (`4` columns on desktop `>=1280px`, `3` on tablet `>=768px`, **`2` columns on mobile `<768px`**) that displays every `1:1` post, `3:4` poster, `1.41:1` stage backdrop, and `9:16` / `16:9` video in its **exact native aspect ratio with zero cropping**. On desktop hover, a soft translucent warm-paper/ink veil (`0.18s` opacity transition, zero GPU blur) reveals the title, category, and client.
   - *Rejected:* The accidental `103,748px` full-project dump on `/Work`.
5. **From `susannhoffmann.com` -> Ultra-Low `<5 MB` Memory Discipline & Strict Above-the-Fold Batching:**
   - *Selected:* Landing straight on the work without extra splash clicks; rendering only the first `16–20` thumbnails initially with progressive "Load More" / `IntersectionObserver` pagination so the live DOM stays under `<400` nodes even as your portfolio grows to 300+ pieces; keeping full video streams strictly inside the detail modal.
   - *Rejected:* Hover-only textless mobile tiles and forced `1:1` cropping.
6. **From `ginakirlew.com` & `matvoyce.tv` -> Mobile Micro-Captions & Explicit Touch Action Badges:**
   - *Selected:* On touch devices (where hover doesn't exist), display a clean, compact 1-line micro-caption + client badge underneath each card (inspired by Gina Kirlew) and a crisp **`▶ Watch` / `↗` badge** on video/series cards (inspired by Mat Voyce's mobile `View →` pill)—eliminating "mystery-meat" navigation on mobile.
   - *Rejected:* Gina's `115 MB` grid video streaming and Mat Voyce's `65 MB` HLS prefetching + blocking `0–100` preloader.
7. **From `rinamaimon.com` & `olhalazarieva.com` -> Editorial Typography Pairing & Hairline Metadata Grid:**
   - *Selected:* Pairing a warm, literary serif for headings/artwork titles (`Newsreader` or `Fraunces` via `next/font`, zero layout shift) with a crisp geometric sans (`Plus Jakarta Sans` or `Inter`) and technical monospace metadata (`JetBrains Mono` for item counts, dimensions, and `[ CLIENT / CATEGORY / YEAR ]` hairline strips inspired by Olha Lazarieva's clean 4-column metadata bar).

---

## 3. The Cohesive Design System & "Bridge" UI Features

When combining inspirations from multiple artists, raw mashups can feel disjointed. Below are the **custom "Bridge" UI features** engineered specifically to make all selected inspirations flow together seamlessly and solve the unique structure of H. A. Kularatne's `assets/` folder:

### Bridge Feature 1: "Series Deck / Smart Stack" Toggle (`Curated View` vs. `All 136 Works`)
- **The UX Problem It Solves:** `Roshan Sir - Portfolio` has `31` similar square campaign posts, and `Samath - Portfolio` has `36` square campaign posts. If all `67` square posts appear ungrouped right next to smaller 3-item series (`March IQ`, `Book Fair`), they can visually overwhelm the browsing rhythm.
- **How It Works:**
  - By default (`Curated View`), cohesive multi-part series (or batches of 6–8 posts from a large campaign) can either show their strongest "Hero" pieces first with a subtle **"Stacked Card" edge + `12 items` badge**, OR the visitor can toggle `[ Curated Highlights (42) | All Archive (136) ]` right next to the filter bar!
  - Even better: when a user clicks a specific category or client filter (e.g., `Client: Samath Institute` or `Category: Social Campaigns`), it automatically expands to show every single piece in that collection cleanly.

### Bridge Feature 2: Cross-Folder "Client Story Drawer" Inside the Lightbox Modal
- **The UX Problem It Solves:** Remember that *NSBM ("Ma Nodath Mal Petha")* spans **5 image folders + 2 videos**, and *Roshan Perera* spans **3 image folders + 2 videos**.
- **How It Works:** When a visitor clicks *any* artwork (for example, one of the *NSBM* floral countdown posters from `New folder (4)`), the clean detail modal shows:
  1. The crisp full-resolution artwork (or full audio-enabled HTML5 `<video>` player with captions/sound).
  2. A clean 3-cell hairline metadata bar: `CATEGORY: Event Countdown` | `CLIENT: NSBM Green University` | `FORMAT: 3:4 Illustration`.
  3. **The Bridge Strip at the Bottom of the Modal:** *"More from NSBM — Flower Path I Never Knew (31 works across 6 mediums)"* showing clickable mini-thumbnails of the **animated videos, stage backdrop, and storybook posters** for that exact same client! Clicking one swaps the modal content smoothly without ever losing the background gallery state.

### Bridge Feature 3: Zero-Byte-Waste Video Card (`Poster + Hover/In-View Micro-Loop -> Click for Full Audio Reel`)
- **The UX Problem It Solves:** Your 4 videos in `New folder (10)` are narrative masterpieces with **Sinhala voiceover, music, and English subtitles** (`9 MB – 27 MB`). Playing them muted in a tiny grid loses the voiceover story and wastes 67 MB of bandwidth; showing only a static image hides the fact that you do motion animation!
- **How It Works:**
  - In the gallery grid, each video card loads a **`~35 KB` WebP poster frame** first (`0 KB` video data transferred on load!) marked with a tactile pill badge: `▶ 01:29 · Motion + Audio`.
  - Only when hovered on desktop (`@media (hover: hover)`)—or tapped once to preview—it streams a **tiny `< 800 KB` 4-second muted preview loop** (`preload="none"`).
  - Clicking the card opens the Detail Modal and mounts the **full-resolution compressed MP4 (`~3–6 MB` Web-optimized H.264) with full audio, scrubber controls, and native fullscreen**. The moment the modal closes, the `<video>` `src` is cleared (`video.pause(); video.removeAttribute('src'); video.load()`) so **browser RAM drops right back down immediately!**

### Bridge Feature 4: Instant Color-Placeholder Shimmer (Zero Layout Shift)
- Every image in our build script gets its exact `width`, `height`, and dominant average hex color (e.g., `#1d2b24` or `#f4efe6`) pre-calculated into a static JSON file at build time.
- As the user scrolls fast on mobile, every card reserves its **exact aspect-ratio box** (`aspect-ratio: 904 / 1280` or `1080 / 1080`) tinted with that artwork's soft dominant color before the lazy-loaded WebP fades in over `180ms`. **Cumulative Layout Shift (CLS) = `0.000`!**

---

## 4. Tech Stack & Ultra-Minimal Dependency Policy

Per your requirements (**Next.js, no backend, minimum essential external dependencies, low memory, fast load**), we deliberately reject bloated UI kits (`MUI`, `Chakra`, `AntD`), heavy animation libraries (`GSAP`, `Three.js`, `Framer Motion`), and heavy carousel/lightbox libraries (`Swiper`, `lightGallery`).

### 4.1 Complete `package.json` Dependency List

#### Runtime Dependencies (Sent to the Browser): **ONLY Next.js & React!**
1. **`next`** (v15+ App Router with `output: 'export'` static HTML export)
2. **`react` & `react-dom`** (Core Next.js runtime — zero third-party runtime packages!)

> **Wait—Zero Extra Runtime NPM Packages?!**
> Yes! Here is why this makes your site dramatically faster and easier to maintain:
> - **Icons:** Instead of installing `lucide-react` (`~500 KB` dev / tree-shaking overhead), we put the **8 tiny SVG icons** we need (Play, Close `×`, Arrow Left/Right, Sun/Moon, Filter, External Arrow `↗`, Volume) in a single 90-line `src/components/Icons.tsx` file (`< 2 KB` total!).
> - **Lightbox / Modal:** Built natively with the HTML5 `<dialog>` element + 40 lines of React (`Escape` key, backdrop click, focus trap, scroll lock, and zero external JS bundle cost!).
> - **Masonry Grid:** Built with **Zero-JS CSS Multi-Column / Balanced Column Flex** (~35 lines of code) — `0 KB` layout library!
> - **Animations:** Pure hardware-accelerated CSS transitions (`opacity` and `transform` only — the only two CSS properties that never trigger CPU layout recalculation!).

#### Build-Time Only DevDependencies (Run ONLY on Your Computer During Asset Prep, **`0 KB` in Browser**):
1. **`tailwindcss` (`@tailwindcss/postcss`, `postcss`)** — Compiles down to a tiny `~12 KB` static CSS file containing only the classes you actually use.
2. **`typescript` (`@types/react`, `@types/node`)** — Catches typos before you build so beginners don't hit mystery runtime crashes.
3. **`sharp`** *(Dev-only script tool)* — Automatically converts all `132` heavy PNGs/JPGs in `assets/` into crisp, tiny `.webp` thumbnails + full-size `.webp` views and extracts exact `width`, `height`, and dominant placeholder colors!

*(Plus a free standalone **FFmpeg** command-line step we provide below to generate lightweight web MP4s and video poster images from `New folder (10)`.)*

---

## 5. Information Architecture & Page-by-Page Wireframe Blueprint

Because visitors (clients, agencies, publishers, educators) want to see work immediately without clicking through slow page transitions, the website uses a **Single-Page Studio Architecture with Deep-Linkable URL States** plus a lightweight `/about` section anchor:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│  [HAK] H. A. Kularatne          Work   Motion   Clients   About    [☀/☾]    │ <- Sticky 64px Glass Header
├──────────────────────────────────────────────────────────────────────────────┤
│  ILLUSTRATOR · VISUAL STORYTELLER · CAMPAIGN DESIGNER                        │
│  Crafting narrative illustrations, 2D animated stories, and cultural         │
│  campaigns that connect brands and audiences across Sri Lanka & beyond.      │
│  (2D Animation) (Storybook & Folklore) (Portraiture) (Campaign Design)       │ <- Compact 2-Second Hero
├──────────────────────────────────────────────────────────────────────────────┤
│  CATEGORY: [All 136] [Motion 4] [Storybook 25] [Portraits 2] [Campaigns 82]… │ <- Sticky Filter Bar
│  CLIENT:   [All Clients ▾] [NSBM (31)] [Roshan Perera (46)] [Samath (48)]…   │    (URL-synced + Live Count)
│  VIEW:     [✦ Curated Highlights]  [☷ All Works]       Showing 42 works     │
├──────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │  ▶ 01:29     │  │              │  │              │      │
│  │  1:1 Square  │  │              │  │  3:4 Poster  │  │  1:1 Square  │      │ <- 4-Col Desktop /
│  │  Illustration│  │  9:16 Motion │  │  (Uncropped!)│  │  Watercolor  │         3-Col Tablet /
│  │              │  │  Story Reel  │  │              │  │  Portrait    │         2-Col Mobile
│  └──────────────┘  │              │  │              │  └──────────────┘         Uncropped Masonry!
│  ┌──────────────┐  │              │  └──────────────┘  ┌──────────────┐      │
│  │  3:4 Poster  │  └──────────────┘  ┌──────────────┐  │  1.41:1 Wide │      │
│  │  (March IQ)  │  ┌──────────────┐  │  1:1 Book    │  │  Stage Art   │      │
│  │              │  │  1:1 Samath  │  │  Fair Promo  │  └──────────────┘      │
│  └──────────────┘  └──────────────┘  └──────────────┘                        │
│                                                                              │
│                       [ Load 24 More Works (42 / 136) ]                      │ <- DOM Memory Guard
├──────────────────────────────────────────────────────────────────────────────┤
│  FEATURED MOTION REELS (Dedicated 4-Card Cinema Strip for New folder (10))   │
│  [ 9:16 Doctor Dream ] [ 9:16 Flower Path ] [ 9:16 Bath Kata ] [ 16:9 Song ] │
├──────────────────────────────────────────────────────────────────────────────┤
│  ABOUT & SELECTED CLIENTS / COLLABORATORS                                    │
│  Bio + Discipline Hairline Columns + Client Directory (NSBM, Samath, etc.)   │
├──────────────────────────────────────────────────────────────────────────────┤
│  LET'S CREATE SOMETHING MEMORABLE  ->  [Email] [WhatsApp] [Instagram] [↑ Top]│
└──────────────────────────────────────────────────────────────────────────────┘
```

### Detail Modal Wireframe (Opens Instantly Over the Grid at `?work=nsbm-countdown-1`)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│  [← Prev]                 NSBM — Flower Path Countdown              [✕ Close]│
├───────────────────────────────────────────────┬──────────────────────────────┤
│                                               │  EVENT COUNTDOWN SERIES      │
│                                               │  Flower Path I Never Knew #1 │
│         ┌───────────────────────────┐         │  ──────────────────────────  │
│         │                           │         │  CLIENT   NSBM Green Univ.   │
│         │    Crisp Uncropped WebP   │         │  MEDIUM   Digital Illustr.   │
│         │            OR             │         │  RATIO    904 × 1280 (3:4)   │
│         │   Full Audio HTML5 Video  │         │  ──────────────────────────  │
│         │    (Unmounts on Close!)   │         │  [ Filter All NSBM Works → ] │
│         │                           │         │                              │
│         └───────────────────────────┘         │  MORE FOR THIS CLIENT (31):  │
│                                               │  [🎬] [🎬] [🖼] [🖼] [🖼] [🖼] │ <- Cross-Folder Client
│                                               │  (Jumps across folders!)     │    Story Strip!
└───────────────────────────────────────────────┴──────────────────────────────┘
```

---

## 6. Beginner's Step-by-Step Build Guide (From Empty Repo to Finished Site)

Follow these phases **in exact order**. Every command, folder name, and file is explained clearly so you never have to guess what to do next.

---

### Phase 0: Prerequisites & Installing Tools

Before writing any code, verify that you have **Node.js** and **FFmpeg** installed on Windows.

1. **Open PowerShell or VS Code Terminal** inside your repository (`d:\github\hiruna portfolio\portfolio-`).
2. **Check Node.js (v20 or newer required):**
   ```powershell
   node -v
   npm -v
   ```
   - *If it says "not recognized":* Download and install the **LTS** version from https://nodejs.org, then close and reopen your terminal.
3. **Check FFmpeg (used once to optimize your 4 large MP4 videos):**
   ```powershell
   ffmpeg -version
   ```
   - *If it says "not recognized":* Run this single built-in Windows command in PowerShell to install FFmpeg automatically:
     ```powershell
     winget install Gyan.FFmpeg
     ```
     Then close and reopen your terminal so `ffmpeg` is available.

---

### Phase 1: Initializing Next.js in This Repository

Because your folder (`portfolio-`) already contains `.git`, `assets/`, `dev/`, and `Readme.md`, we want to initialize Next.js cleanly right inside the root (or move files cleanly) without overwriting your `assets/` or `dev/` folders.

#### Step 1.1: Create `package.json`, `tsconfig.json`, and `next.config.mjs`

Create a file named **`package.json`** in the root folder (`d:\github\hiruna portfolio\portfolio-\package.json`):

```json
{
  "name": "hak-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "prepare-media": "node scripts/prepare-media.mjs",
    "dev": "next dev",
    "build": "npm run prepare-media && next build",
    "start": "npx serve@latest out"
  },
  "dependencies": {
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.5.0",
    "sharp": "^0.33.5",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0"
  }
}
```

 Now install those packages by running:

```powershell
npm install
```

#### Step 1.2: Configure Next.js for Pure Static Export (No Backend Required)

Create **`next.config.mjs`** in the project root:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generates a pure static HTML/CSS/JS website inside the /out folder (zero backend needed!)
  output: 'export',
  // Since we pre-optimize every image into exact WebP sizes with `sharp`,
  // we disable Next's server-only image endpoint so static hosting works everywhere for free.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

#### Step 1.3: Create `postcss.config.mjs` and `tsconfig.json`

Create **`postcss.config.mjs`** in the project root:

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;
```

Create **`tsconfig.json`** in the project root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

#### Step 1.4: Update `.gitignore` So Generated Build Files Stay Clean

Create **`.gitignore`** in the project root:

```gitignore
node_modules/
.next/
out/
public/media/
.DS_Store
*.tsbuildinfo
next-env.d.ts
```

> **Why is `public/media/` in `.gitignore`?**
> Your original high-res files stay safe and untouched inside `assets/`. Our automated build script (`scripts/prepare-media.mjs`) reads `assets/` and generates super-fast compressed `.webp` thumbnails and optimized `.mp4` files into `public/media/` automatically whenever you build!

---

### Phase 2: Automated Media Compression & Manifest Script (Images + Videos)

This is the **secret weapon** that guarantees **low memory footprint** and **instant load speed** without you having to manually resize 136 files in Photoshop!

#### What This Script Does Automatically:
1. Reads your raw `assets/` folder (without modifying a single original file!).
2. Maps each `New folder (...)` to its real **Design Category** AND its real **Client** (even splitting `New folder (10)`'s 4 videos across *Roshan Perera* and *NSBM*!).
3. Uses `sharp` to generate two WebP versions of every image:
   - **`thumb/*.webp`** (`600px` wide, `quality: 78` — averages **`28 KB–48 KB`** instead of `1.5 MB` PNGs!) for the gallery grid.
   - **`full/*.webp`** (`1400px` max dimension, `quality: 86` — crisp on Retina screens, **`~110–220 KB`**) for the lightbox modal.
4. Extracts every image's **exact `width`, `height`, and dominant background color hex** (so cards never jump around while loading).
5. Uses `ffmpeg` (if installed, with a graceful fallback copy if not) to generate for each of the 4 MP4 videos:
   - **`poster/*.webp`**: Crisp first-frame / key-frame WebP poster (`~35 KB`).
   - **`preview/*.mp4`**: Muted 4-second `480p` micro-loop (`~400–700 KB`) for desktop hover previews.
   - **`video/*.mp4`**: Web-streamable `faststart` H.264 MP4 (`CRF 26`, cuts `27 MB` down to `~4–6 MB` with full audio intact!) for the modal player.
6. Writes a clean, typed catalog file at **`src/data/generated-media.json`**.

#### Step 2.1: Create `scripts/folder-mapping.mjs`

First, create a `scripts` folder and add **`scripts/folder-mapping.mjs`**. If you ever add a `New folder (14)` in the future, you just add 1 entry here!

```javascript
// scripts/folder-mapping.mjs
// Maps every folder in /assets to clean human-readable Categories & Clients.

export const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'motion-animation', label: 'Motion & Animation' },
  { id: 'storybook-folklore', label: 'Storybook & Folklore' },
  { id: 'watercolor-portraits', label: 'Portraits' },
  { id: 'social-campaigns', label: 'Social Campaigns' },
  { id: 'posters-flyers', label: 'Posters & Events' },
  { id: 'editorial-literary', label: 'Editorial & Book Art' },
];

export const CLIENTS = [
  { id: 'all', label: 'All Clients' },
  { id: 'nsbm-flower-path', label: 'NSBM — Flower Path I Never Knew' },
  { id: 'roshan-perera', label: 'Roshan Perera (Media)' },
  { id: 'samath-institute', label: 'Samath Institute' },
  { id: 'book-fair-vinuka', label: 'Colombo Book Fair / Vinuka Walawage' },
  { id: 'march-iq', label: 'March IQ' },
  { id: 'personal-hak', label: 'Personal & Editorial (HAK)' },
];

// Default mapping per subfolder inside /assets
export const FOLDER_RULES = {
  '__root__': {
    category: 'editorial-literary',
    client: 'personal-hak',
    seriesTitle: 'Natan Ayek Suramathin — Cover Illustration',
    featuredPriority: 1,
  },
  'New folder': {
    category: 'storybook-folklore',
    client: 'nsbm-flower-path',
    seriesTitle: 'Character & Fable Spot Illustrations',
    featuredPriority: 2,
  },
  'New folder (2)': {
    category: 'posters-flyers',
    client: 'march-iq',
    seriesTitle: 'March IQ — Tech Campaign Posters',
    featuredPriority: 2,
  },
  'New folder (3)': {
    category: 'social-campaigns',
    client: 'samath-institute',
    seriesTitle: 'Japanese Language — Shashi Sensei Series',
    featuredPriority: 3,
  },
  'New folder (4)': {
    category: 'posters-flyers',
    client: 'nsbm-flower-path',
    seriesTitle: 'Floral Numeral Countdown Posters',
    featuredPriority: 2,
  },
  'New folder (5)': {
    category: 'storybook-folklore',
    client: 'nsbm-flower-path',
    seriesTitle: 'Folklore & Storybook Scene Posters',
    featuredPriority: 1,
  },
  'New folder (6)': {
    category: 'posters-flyers',
    client: 'nsbm-flower-path',
    seriesTitle: 'Cultural Tribute & Event Key Visuals',
    featuredPriority: 2,
  },
  'New folder (7)': {
    category: 'editorial-literary',
    client: 'book-fair-vinuka',
    seriesTitle: 'Guru Pata Vihagun — Literary Campaign',
    featuredPriority: 1,
  },
  'New folder (8)': {
    category: 'social-campaigns',
    client: 'samath-institute',
    seriesTitle: 'A/L Science & Mathematics Campaign Art',
    featuredPriority: 3,
  },
  'New folder (9)': {
    category: 'editorial-literary',
    client: 'personal-hak',
    seriesTitle: 'Poetic Typography & Minimalist Visuals',
    featuredPriority: 2,
  },
  'New folder (10)': {
    category: 'motion-animation',
    client: 'roshan-perera', // Overridden per-file below for NSBM videos!
    seriesTitle: '2D Animated Visual Storytelling',
    featuredPriority: 1,
  },
  'New folder (11)': {
    category: 'social-campaigns',
    client: 'roshan-perera',
    seriesTitle: 'Media Philosophy & Quote Illustrations',
    featuredPriority: 2,
  },
  'New folder (12)': {
    category: 'watercolor-portraits',
    client: 'roshan-perera',
    seriesTitle: 'Cultural Icons — Digital Watercolor Portraits',
    featuredPriority: 1,
  },
  'New folder (13)': {
    category: 'posters-flyers',
    client: 'nsbm-flower-path',
    seriesTitle: 'Stage & Auditorium Backdrop Illustration',
    featuredPriority: 1,
  },
  'Roshan Sir - Portfolio': {
    category: 'social-campaigns',
    client: 'roshan-perera',
    seriesTitle: 'Roshan Perera — Conceptual Campaign Archive',
    featuredPriority: 3,
  },
  'Samath - Portfolio': {
    category: 'social-campaigns',
    client: 'samath-institute',
    seriesTitle: 'Samath Institute — Literary & Cinema Quote Series',
    featuredPriority: 3,
  },
};

// Exact per-file overrides (for shared folders like New folder (10) where 2 videos are Roshan Perera & 2 are NSBM!)
export const FILE_OVERRIDES = {
  'New folder (10)/video_2026-11-24_20-12-57.mp4': {
    title: 'A New Dream (Doctor to Filmmaker) — Animated Short',
    client: 'roshan-perera',
    aspectWidth: 720,
    aspectHeight: 1280,
    durationLabel: '01:29',
    posterTimestamp: '00:00:05',
  },
  'New folder (10)/video_2026-11-24_20-13-04.mp4': {
    title: 'Flower Path I Never Knew — Animated Event Trailer',
    client: 'nsbm-flower-path',
    aspectWidth: 720,
    aspectHeight: 1280,
    durationLabel: '00:43',
    posterTimestamp: '00:00:14',
  },
  'New folder (10)/video_2026-11-24_20-13-39.mp4': {
    title: 'Bath Kata (1986–2026 Evolution of Media) — Animated Story',
    client: 'roshan-perera',
    aspectWidth: 720,
    aspectHeight: 1280,
    durationLabel: '00:58',
    posterTimestamp: '00:00:25',
  },
  'New folder (10)/video_2026-11-24_20-13-49.mp4': {
    title: 'The Language Cafe — Musical Stage Animation',
    client: 'nsbm-flower-path',
    aspectWidth: 1280,
    aspectHeight: 720,
    durationLabel: '00:31',
    posterTimestamp: '00:00:06',
  },
};
```

#### Step 2.2: Create `scripts/prepare-media.mjs`

Create **`scripts/prepare-media.mjs`**:

```javascript
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
  // Track how many items we've seen per folder so Curated Highlights picks a balanced mix!
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

    // Curated view logic: include all priority 1-2 series (up to 4 per folder) + first 4 from large 30+ archives
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

      items.push({
        id,
        type: 'image',
        title: override.title || `${rule.seriesTitle} #${indexInFolder}`,
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

      if (ffmpegReady) {
        if (!existsSync(posterOut)) {
          const tempPng = `${posterOut}.png`;
          execFileSync('ffmpeg', ['-y', '-ss', timestamp, '-i', file.fullPath, '-frames:v', '1', tempPng], { stdio: 'ignore' });
          await sharp(tempPng).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 82 }).toFile(posterOut);
          await fs.unlink(tempPng);
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
        width: override.aspectWidth || 720,
        height: override.aspectHeight || 1280,
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

  // Sort so Priority 1 works & varied aspect ratios interleave nicely instead of clumping 36 identical squares in a row
  items.sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));

  await fs.writeFile(DATA_OUT_FILE, JSON.stringify(items, null, 2), 'utf8');
  console.log(`✅ Generated ${items.length} optimized portfolio items -> src/data/generated-media.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Run it once right now to test:
```powershell
npm run prepare-media
```
*(Note: The first run takes ~30–60 seconds while `sharp` and `ffmpeg` compress all 136 files. Future runs skip already-generated files and finish in `< 1 second`!)*

---

### Phase 3: Data Schema — Connecting Categories AND Shared Clients

Create **`src/data/portfolio.ts`** so your React components have clean TypeScript types, artist bio metadata, and helper functions:

```typescript
// src/data/portfolio.ts
import rawItems from './generated-media.json';

export type MediaType = 'image' | 'video';

export interface PortfolioItem {
  id: string;
  type: MediaType;
  title: string;
  seriesTitle: string;
  category: string;
  client: string;
  width: number;
  height: number;
  dominantColor: string;
  thumbSrc: string;
  fullSrc: string;
  previewVideoSrc?: string;
  durationLabel?: string;
  isCurated: boolean;
  priority: number;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = rawItems as PortfolioItem[];

export const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'motion-animation', label: 'Motion & Animation' },
  { id: 'storybook-folklore', label: 'Storybook & Folklore' },
  { id: 'watercolor-portraits', label: 'Portraits' },
  { id: 'posters-flyers', label: 'Posters & Events' },
  { id: 'editorial-literary', label: 'Editorial & Book Art' },
  { id: 'social-campaigns', label: 'Social Campaigns' },
] as const;

export const CLIENTS = [
  { id: 'all', label: 'All Clients' },
  { id: 'nsbm-flower-path', label: 'NSBM — Flower Path', shortLabel: 'NSBM' },
  { id: 'roshan-perera', label: 'Roshan Perera (Media)', shortLabel: 'Roshan Perera' },
  { id: 'samath-institute', label: 'Samath Institute', shortLabel: 'Samath' },
  { id: 'book-fair-vinuka', label: 'Colombo Book Fair', shortLabel: 'Book Fair' },
  { id: 'march-iq', label: 'March IQ', shortLabel: 'March IQ' },
  { id: 'personal-hak', label: 'Personal & Editorial', shortLabel: 'HAK Personal' },
] as const;

export const ARTIST_INFO = {
  name: 'H. A. Kularatne',
  monogram: 'HAK',
  role: 'Illustrator · 2D Animator · Campaign Designer',
  location: 'Sri Lanka',
  bio: 'Visual storyteller crafting character-driven illustrations, 2D animated narrative reels, watercolor tributes, and cohesive visual campaigns for cultural events, authors, and educational brands.',
  disciplines: [
    '2D Narrative Animation',
    'Storybook & Cultural Illustration',
    'Digital Watercolor Portraiture',
    'Brand & Campaign Visual Systems',
  ],
  email: 'hello@hakularatne.com', // Replace with H. A. Kularatne's real email
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Behance', href: 'https://behance.net/' },
    { label: 'WhatsApp', href: 'https://wa.me/' },
  ],
};

export function getCategoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getClientLabel(id: string): string {
  return CLIENTS.find((c) => c.id === id)?.label ?? id;
}

export function getClientShortLabel(id: string): string {
  const found = CLIENTS.find((c) => c.id === id);
  return found && 'shortLabel' in found ? found.shortLabel : found?.label ?? id;
}
```

---

### Phase 4: Global Styling, Theme Tokens & Fonts

Inspired by **Nathalie Lété's** warm antique paper (`#FAF8F5`), **Essi Kimpimäki's** warm cream hover veil (`rgba(250, 246, 238, 0.88)`), **109ichiki's** Deep Charcoal Dark Mode (`#111116`) + `@media (hover: hover)` guards, and **Rina Maimon's** editorial serif + humanist sans pairing:

#### Step 4.1: Create `src/app/globals.css`

```css
@import "tailwindcss";

:root {
  --bg-canvas: #faf8f5;
  --bg-surface: #f2eee8;
  --bg-elevated: rgba(250, 248, 245, 0.88);
  --text-primary: #181715;
  --text-secondary: #5c5852;
  --text-muted: #8a847b;
  --border-hairline: rgba(24, 23, 21, 0.12);
  --accent-pill-bg: #181715;
  --accent-pill-text: #faf8f5;
  --hover-veil: rgba(250, 245, 235, 0.88);
  --hover-veil-text: #181715;
}

html.dark {
  --bg-canvas: #111116;
  --bg-surface: #1b1b22;
  --bg-elevated: rgba(17, 17, 22, 0.88);
  --text-primary: #f4f3ef;
  --text-secondary: #b0ada6;
  --text-muted: #78756f;
  --border-hairline: rgba(244, 243, 239, 0.14);
  --accent-pill-bg: #e4ff66; /* Subtle tactile lime nod to Sarah Oh / Mat Voyce in dark mode */
  --accent-pill-text: #111116;
  --hover-veil: rgba(17, 17, 22, 0.84);
  --hover-veil-text: #f4f3ef;
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
}

body {
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

/* True-Aspect-Ratio Masonry without JS Layout Thrashing */
.masonry-grid {
  column-count: 2;
  column-gap: 14px;
}
@media (min-width: 768px) {
  .masonry-grid {
    column-count: 3;
    column-gap: 20px;
  }
}
@media (min-width: 1200px) {
  .masonry-grid {
    column-count: 4;
    column-gap: 22px;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 14px;
  /* Keeps offscreen GPU/paint cost low on long galleries */
  content-visibility: auto;
  contain-intrinsic-size: auto 320px;
}
@media (min-width: 768px) {
  .masonry-item {
    margin-bottom: 20px;
  }
}

/* Hardware-safe hover states ONLY on real mouse/trackpad devices (109ichiki best practice!) */
@media (hover: hover) and (pointer: fine) {
  .artwork-card:hover .artwork-hover-veil {
    opacity: 1;
  }
  .artwork-card:hover .artwork-img {
    transform: scale(1.018);
  }
}

/* Respect Reduced Motion Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Step 4.2: Create `src/app/layout.tsx` (Zero-CLS Local/Google Variable Fonts)

Next.js automatically downloads Google Fonts **at build time** and hosts them locally inside your static export—meaning **zero runtime requests to Google servers** and **zero font flicker**!

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ARTIST_INFO } from '@/data/portfolio';

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${ARTIST_INFO.name} (${ARTIST_INFO.monogram}) — Portfolio`,
  description: ARTIST_INFO.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Tiny inline theme restorer to prevent white flash when Dark Mode is preferred */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('hak-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-sans), sans-serif' }}>{children}</body>
    </html>
  );
}
```

---

### Phase 5: Building Every Component (Copy-Paste Ready Architecture)

Here are the **5 clean, lightweight components** to create inside `src/components/`. Together they replace dozens of megabytes of third-party libraries!

#### Component 1: `src/components/Icons.tsx` (Zero-Dependency Inline SVGs)

```tsx
// src/components/Icons.tsx
export function PlayIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

export function CloseIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronIcon({ direction = 'left', className = 'w-5 h-5' }: { direction?: 'left' | 'right'; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export function SunMoonIcon({ isDark }: { isDark: boolean }) {
  return isDark ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function FilterSlidersIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" d="M4 6h16M4 12h10M4 18h6" />
    </svg>
  );
}
```

#### Component 2: `src/components/Header.tsx` (Sticky Minimal Header + Theme Toggle)

```tsx
// src/components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { ARTIST_INFO } from '@/data/portfolio';
import { SunMoonIcon } from './Icons';

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('hak-theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3 group">
          <span
            className="inline-flex h-8 px-2.5 items-center justify-center rounded text-xs font-bold tracking-widest border"
            style={{
              fontFamily: 'var(--font-mono)',
              borderColor: 'var(--text-primary)',
            }}
          >
            {ARTIST_INFO.monogram}
          </span>
          <span className="text-base sm:text-lg font-medium tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            {ARTIST_INFO.name}
          </span>
        </a>

        <nav className="flex items-center gap-4 sm:gap-7 text-sm">
          <a href="#works" className="hidden sm:inline hover:opacity-70 transition-opacity">
            Works
          </a>
          <a href="#motion" className="hidden sm:inline hover:opacity-70 transition-opacity">
            Motion Reels
          </a>
          <a href="#about" className="hover:opacity-70 transition-opacity">
            About & Clients
          </a>
          <a href="#contact" className="hidden md:inline hover:opacity-70 transition-opacity">
            Contact
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer transition-opacity hover:opacity-75"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <SunMoonIcon isDark={isDark} />
          </button>
        </nav>
      </div>
    </header>
  );
}
```

#### Component 3: `src/components/ArtworkCard.tsx` (Lazy-Loaded, Zero-CLS, Hover Micro-Video, Touch Caption)

```tsx
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
              onLoad={() => setLoaded(true)}
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
```

#### Component 4: `src/components/WorkModal.tsx` (Memory-Safe Video Unmount + Cross-Folder "More for This Client" Strip)

```tsx
// src/components/WorkModal.tsx
'use client';

import { useEffect, useRef } from 'react';
import {
  PortfolioItem,
  PORTFOLIO_ITEMS,
  getCategoryLabel,
  getClientLabel,
} from '@/data/portfolio';
import { ChevronIcon, CloseIcon, PlayIcon } from './Icons';

interface Props {
  item: PortfolioItem | null;
  onClose: () => void;
  onSelect: (item: PortfolioItem) => void;
  onFilterClient: (clientId: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function WorkModal({ item, onClose, onSelect, onFilterClient, onPrev, onNext }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Keyboard navigation (Escape, Left Arrow, Right Arrow) + body scroll lock
  useEffect(() => {
    if (!item) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      // Explicit memory cleanup when closing or switching a video!
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  // Cross-folder client relationship: finds works across ALL subfolders done for this same client!
  const relatedClientWorks = PORTFOLIO_ITEMS.filter(
    (w) => w.client === item.client && w.id !== item.id
  ).slice(0, 8);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border shadow-2xl lg:flex-row"
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        {/* Top Mobile Bar */}
        <div
          className="flex items-center justify-between border-b px-4 py-3 lg:hidden"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <span className="truncate text-xs font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
            {getClientLabel(item.client)}
          </span>
          <button type="button" onClick={onClose} aria-label="Close viewer" className="p-1 cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        {/* Left Stage: Uncropped High-Res Artwork OR Full Audio Video */}
        <div className="relative flex min-h-[46dvh] flex-1 items-center justify-center bg-black/95 p-3 sm:p-6">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous work"
            className="absolute left-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 cursor-pointer"
          >
            <ChevronIcon direction="left" />
          </button>

          {item.type === 'video' ? (
            <video
              key={item.id}
              ref={videoRef}
              src={item.fullSrc}
              poster={item.thumbSrc || undefined}
              controls
              autoPlay
              playsInline
              className="max-h-[75dvh] w-auto max-w-full rounded"
            />
          ) : (
            <img
              key={item.id}
              src={item.fullSrc}
              alt={item.title}
              className="max-h-[78dvh] w-auto max-w-full object-contain rounded"
            />
          )}

          <button
            type="button"
            onClick={onNext}
            aria-label="Next work"
            className="absolute right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 cursor-pointer"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        {/* Right Editorial Metadata & Cross-Folder Client Drawer */}
        <div
          className="flex w-full flex-col justify-between overflow-y-auto p-5 sm:p-6 lg:w-[340px] lg:border-l"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <div>
            <div className="hidden lg:flex items-center justify-end mb-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs cursor-pointer hover:opacity-75"
                style={{ fontFamily: 'var(--font-mono)', borderColor: 'var(--border-hairline)' }}
              >
                ESC <CloseIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <p
              className="text-[11px] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              {getCategoryLabel(item.category)}
            </p>
            <h2 className="mt-1.5 text-xl font-medium leading-snug" style={{ fontFamily: 'var(--font-serif)' }}>
              {item.title}
            </h2>

            {/* Hairline Metadata Strip (inspired by Olha Lazarieva) */}
            <dl
              className="mt-5 grid grid-cols-2 gap-y-3 border-y py-3.5 text-xs"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div>
                <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>CLIENT</dt>
                <dd className="mt-0.5 font-medium">{getClientLabel(item.client)}</dd>
              </div>
              <div>
                <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>DIMENSIONS</dt>
                <dd className="mt-0.5 font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                  {item.width} × {item.height}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => {
                onFilterClient(item.client);
                onClose();
              }}
              className="mt-4 w-full rounded-full border px-4 py-2 text-xs font-medium cursor-pointer transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--accent-pill-bg)',
                color: 'var(--accent-pill-text)',
                borderColor: 'transparent',
              }}
            >
              View Full {getClientLabel(item.client)} Collection →
            </button>
          </div>

          {/* Bridge Feature: Cross-Folder Related Client Works */}
          {relatedClientWorks.length > 0 && (
            <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
              <p
                className="mb-2.5 text-[11px] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              >
                More for this client (across categories)
              </p>
              <div className="grid grid-cols-4 gap-2">
                {relatedClientWorks.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelect(rel)}
                    className="relative aspect-square overflow-hidden rounded border cursor-pointer hover:opacity-85"
                    style={{
                      backgroundColor: rel.dominantColor,
                      borderColor: 'var(--border-hairline)',
                    }}
                    title={rel.title}
                  >
                    {rel.thumbSrc && (
                      <img src={rel.thumbSrc} alt={rel.title} loading="lazy" className="h-full w-full object-cover" />
                    )}
                    {rel.type === 'video' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                        <PlayIcon className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

#### Component 5: `src/components/PortfolioExperience.tsx` (Dual-Axis URL-Synced Filter + Progressive Pagination + Cinema Strip)

```tsx
// src/components/PortfolioExperience.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ARTIST_INFO,
  CATEGORIES,
  CLIENTS,
  PORTFOLIO_ITEMS,
  PortfolioItem,
  getClientShortLabel,
} from '@/data/portfolio';
import { ArtworkCard } from './ArtworkCard';
import { WorkModal } from './WorkModal';
import { FilterSlidersIcon, PlayIcon } from './Icons';

const PAGE_SIZE = 24;

export function PortfolioExperience() {
  const [category, setCategory] = useState<string>('all');
  const [client, setClient] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'curated' | 'all'>('curated');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initial state from URL query params (?category=...&client=...&work=...) — 109ichiki inspiration!
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const cli = params.get('client');
    const workId = params.get('work');
    if (cat) {
      setCategory(cat);
      setViewMode('all');
    }
    if (cli) {
      setClient(cli);
      setViewMode('all');
    }
    if (workId) {
      const found = PORTFOLIO_ITEMS.find((i) => i.id === workId);
      if (found) setActiveItem(found);
    }
  }, []);

  // Keep URL shareable without triggering network reloads
  const syncUrl = (nextCat: string, nextCli: string, nextWork: PortfolioItem | null) => {
    const params = new URLSearchParams();
    if (nextCat !== 'all') params.set('category', nextCat);
    if (nextCli !== 'all') params.set('client', nextCli);
    if (nextWork) params.set('work', nextWork.id);
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  };

  const filteredItems = useMemo(() => {
    const isFiltering = category !== 'all' || client !== 'all' || viewMode === 'all';
    return PORTFOLIO_ITEMS.filter((item) => {
      if (!isFiltering && !item.isCurated) return false;
      if (category !== 'all' && item.category !== category) return false;
      if (client !== 'all' && item.client !== client) return false;
      return true;
    });
  }, [category, client, viewMode]);

  const displayedItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const motionVideos = useMemo(
    () => PORTFOLIO_ITEMS.filter((i) => i.type === 'video'),
    []
  );

  const selectCategory = (nextCat: string) => {
    setCategory(nextCat);
    if (nextCat !== 'all') setViewMode('all');
    setVisibleCount(PAGE_SIZE);
    syncUrl(nextCat, client, activeItem);
  };

  const selectClient = (nextCli: string) => {
    setClient(nextCli);
    if (nextCli !== 'all') setViewMode('all');
    setVisibleCount(PAGE_SIZE);
    syncUrl(category, nextCli, activeItem);
  };

  const openModal = (item: PortfolioItem) => {
    setActiveItem(item);
    syncUrl(category, client, item);
  };

  const closeModal = () => {
    setActiveItem(null);
    syncUrl(category, client, null);
  };

  const stepModal = (delta: number) => {
    if (!activeItem || filteredItems.length === 0) return;
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    const baseIdx = idx === -1 ? 0 : idx;
    const nextIdx = (baseIdx + delta + filteredItems.length) % filteredItems.length;
    openModal(filteredItems[nextIdx]);
  };

  return (
    <main id="top" className="mx-auto max-w-[1440px] px-4 sm:px-8">
      {/* 1. Compact 2-Second Scannable Hero (Sarah Oh + Rina Maimon Editorial Pairing) */}
      <section className="py-10 sm:py-14 border-b" style={{ borderColor: 'var(--border-hairline)' }}>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          {ARTIST_INFO.role} · {ARTIST_INFO.location}
        </p>
        <h1
          className="mt-3 max-w-4xl text-2xl sm:text-4xl lg:text-[44px] font-normal leading-[1.18] tracking-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {ARTIST_INFO.bio}
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {ARTIST_INFO.disciplines.map((d) => (
            <span
              key={d}
              className="rounded-full border px-3 py-1 text-xs"
              style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-secondary)' }}
            >
              {d}
            </span>
          ))}
        </div>
      </section>

      {/* 2. Dual-Axis Filter Bar (109ichiki inspiration: Category Pills + Shared Client Selector + Live Counter) */}
      <section id="works" className="pt-8 pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Axis 1: Design Category Pills (Horizontally scrollable on mobile so it never wraps into 5 tall rows!) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  className="shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-colors"
                  style={{
                    backgroundColor: active ? 'var(--accent-pill-bg)' : 'transparent',
                    color: active ? 'var(--accent-pill-text)' : 'var(--text-primary)',
                    borderColor: active ? 'transparent' : 'var(--border-hairline)',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Axis 2: Client Filter + Curated/All Archive Switch + Live Work Count */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-xs">
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>CLIENT:</span>
              <select
                value={client}
                onChange={(e) => selectClient(e.target.value)}
                className="rounded-full border px-3 py-1.5 text-xs cursor-pointer focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                {CLIENTS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            {category === 'all' && client === 'all' && (
              <div
                className="inline-flex rounded-full border p-0.5 text-xs"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('curated')}
                  className="rounded-full px-3 py-1 cursor-pointer"
                  style={{
                    backgroundColor: viewMode === 'curated' ? 'var(--bg-surface)' : 'transparent',
                    fontWeight: viewMode === 'curated' ? 600 : 400,
                  }}
                >
                  Highlights
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className="rounded-full px-3 py-1 cursor-pointer"
                  style={{
                    backgroundColor: viewMode === 'all' ? 'var(--bg-surface)' : 'transparent',
                    fontWeight: viewMode === 'all' ? 600 : 400,
                  }}
                >
                  Full Archive ({PORTFOLIO_ITEMS.length})
                </button>
              </div>
            )}

            <span
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              ({filteredItems.length} WORKS)
            </span>
          </div>
        </div>

        {/* 3. Uncropped True-Aspect-Ratio Masonry Gallery (4-col desktop / 3-col tablet / 2-col mobile) */}
        <div className="masonry-grid mt-6">
          {displayedItems.map((item, idx) => (
            <ArtworkCard
              key={item.id}
              item={item}
              eager={idx < 6} // First 6 above-the-fold images load immediately; all others lazy-load!
              onSelect={openModal}
            />
          ))}
        </div>

        {/* DOM Memory Guard: Load in crisp batches of 24 */}
        {visibleCount < filteredItems.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="rounded-full border px-6 py-2.5 text-xs font-medium cursor-pointer hover:opacity-80"
              style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
              }}
            >
              LOAD MORE WORKS ({displayedItems.length} / {filteredItems.length})
            </button>
          </div>
        )}
      </section>

      {/* 4. Dedicated Motion Storytelling Cinema Strip (Showcases New folder (10) Reels Prominently) */}
      {motionVideos.length > 0 && (
        <section
          id="motion"
          className="my-14 rounded-2xl border p-6 sm:p-10"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                2D ANIMATION & AUDIO STORYTELLING
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                Featured Motion Reels
              </h2>
            </div>
            <p className="text-xs max-w-md" style={{ color: 'var(--text-secondary)' }}>
              Click any reel to watch with full voiceover & original score. Hover on desktop for a quick visual preview.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {motionVideos.map((vid) => (
              <button
                key={vid.id}
                type="button"
                onClick={() => openModal(vid)}
                className="group text-left cursor-pointer rounded-xl overflow-hidden border transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                  {vid.thumbSrc && (
                    <img
                      src={vid.thumbSrc}
                      alt={vid.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 text-xs text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                    <PlayIcon className="w-3.5 h-3.5" /> Watch · {vid.durationLabel}
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="text-[11px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {getClientShortLabel(vid.client)}
                  </p>
                  <p className="mt-1 text-sm font-medium line-clamp-2" style={{ fontFamily: 'var(--font-serif)' }}>
                    {vid.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 5. About & Selected Clients Directory (Nathalie Lété + Olha Lazarieva Hairline Structure) */}
      <section
        id="about"
        className="py-14 border-t grid grid-cols-1 lg:grid-cols-12 gap-10"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            [ ABOUT THE ARTIST ]
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
            {ARTIST_INFO.name}
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Working across editorial illustration, Sinhala & English typographic posters, digital watercolor portraits, and 2D animated short stories, {ARTIST_INFO.name} builds memorable visual worlds that feel handcrafted and culturally resonant.
          </p>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            [ SELECTED CLIENTS & SERIES — CLICK TO EXPLORE ]
          </p>
          <div className="divide-y border-y" style={{ borderColor: 'var(--border-hairline)' }}>
            {CLIENTS.filter((c) => c.id !== 'all').map((c) => {
              const count = PORTFOLIO_ITEMS.filter((i) => i.client === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    selectClient(c.id);
                    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex w-full items-center justify-between py-3.5 text-left cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <span className="text-base font-medium" style={{ fontFamily: 'var(--font-serif)' }}>
                    {c.label}
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {count} works ↗
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Minimal Contact Footer */}
      <footer
        id="contact"
        className="py-12 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div>
          <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            AVAILABLE FOR COMMISSIONS & CAMPAIGNS
          </p>
          <a
            href={`mailto:${ARTIST_INFO.email}`}
            className="mt-1 inline-block text-xl sm:text-2xl underline underline-offset-4 hover:opacity-75"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {ARTIST_INFO.email}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {ARTIST_INFO.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-75">
              {s.label} ↗
            </a>
          ))}
          <a
            href="#top"
            className="rounded-full border px-3.5 py-1.5 text-xs"
            style={{ fontFamily: 'var(--font-mono)', borderColor: 'var(--border-hairline)' }}
          >
            ↑ Top
          </a>
        </div>
      </footer>

      {/* 7. Thumb-Zone Floating Mobile Filter Button (109ichiki mobile ergonomics lesson!) */}
      <button
        type="button"
        onClick={() => setMobileFilterOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-medium shadow-lg lg:hidden cursor-pointer"
        style={{
          backgroundColor: 'var(--accent-pill-bg)',
          color: 'var(--accent-pill-text)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <FilterSlidersIcon /> Filter
      </button>

      {mobileFilterOpen && (
        <div
          onClick={() => setMobileFilterOpen(false)}
          className="fixed inset-0 z-40 flex items-end bg-black/60 lg:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-2xl p-5 space-y-4"
            style={{ backgroundColor: 'var(--bg-canvas)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                Filter Portfolio ({filteredItems.length})
              </span>
              <button type="button" onClick={() => setMobileFilterOpen(false)} className="text-xs underline">
                Done
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  className="rounded-full border px-3 py-1.5 text-xs"
                  style={{
                    backgroundColor: category === cat.id ? 'var(--accent-pill-bg)' : 'transparent',
                    color: category === cat.id ? 'var(--accent-pill-text)' : 'var(--text-primary)',
                    borderColor: 'var(--border-hairline)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
              <p className="text-[11px] mb-2 uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                By Client
              </p>
              <div className="flex flex-wrap gap-2">
                {CLIENTS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectClient(c.id)}
                    className="rounded-full border px-3 py-1.5 text-xs"
                    style={{
                      backgroundColor: client === c.id ? 'var(--accent-pill-bg)' : 'transparent',
                      color: client === c.id ? 'var(--accent-pill-text)' : 'var(--text-primary)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Lightbox & Video Modal */}
      <WorkModal
        item={activeItem}
        onClose={closeModal}
        onSelect={openModal}
        onFilterClient={selectClient}
        onPrev={() => stepModal(-1)}
        onNext={() => stepModal(1)}
      />
    </main>
  );
}
```

---

### Phase 6: Assembling the Pages & URL-Synced Filtering

Create **`src/app/page.tsx`** — the Server Component entry page that renders static HTML immediately with zero client-blocking spinner:

```tsx
// src/app/page.tsx
import { Header } from '@/components/Header';
import { PortfolioExperience } from '@/components/PortfolioExperience';

export default function HomePage() {
  return (
    <>
      <Header />
      <PortfolioExperience />
    </>
  );
}
```

#### Your Complete Final Project Directory Tree

Check that your repository matches this clean layout:

```text
portfolio-/
├── assets/                          # Your original untouched images & videos
├── dev/
│   ├── original-prompt.md
│   ├── reference-websites.md
│   └── plan.md                      # This blueprint!
├── public/
│   └── media/                       # Auto-generated by `npm run prepare-media`
│       ├── thumb/                   # ~35 KB WebP grid thumbnails
│       ├── full/                    # ~150 KB WebP modal high-res views
│       ├── poster/                  # ~35 KB WebP video posters
│       ├── preview/                 # ~500 KB 4s muted hover clips
│       └── video/                   # Streamable H.264 MP4s with audio
├── scripts/
│   ├── folder-mapping.mjs           # Maps subfolders & shared clients
│   └── prepare-media.mjs            # Automated Sharp + FFmpeg pipeline
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ArtworkCard.tsx
│   │   ├── Header.tsx
│   │   ├── Icons.tsx
│   │   ├── PortfolioExperience.tsx
│   │   └── WorkModal.tsx
│   └── data/
│       ├── generated-media.json     # Auto-generated catalog
│       └── portfolio.ts
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

#### Run Your Local Development Server!

```powershell
npm run dev
```

Open **`http://localhost:3000`** in Chrome or Edge!

---

### Phase 7: Testing Performance, Memory & Mobile Responsiveness

Here is how even a beginner can verify that every single requirement in your prompt is met:

1. **Test Production Build & Static Export:**
   ```powershell
   npm run build
   npm run start
   ```
   Open the local URL printed by `serve` (usually `http://localhost:3000`).
2. **Verify Mobile `390×844` Responsiveness in Chrome DevTools:**
   - Press **`F12`** -> click the **Phone/Tablet icon** (`Toggle device toolbar`, `Ctrl+Shift+M`) -> select **iPhone 12 Pro (`390 × 844`)**.
   - Check that:
     - The masonry grid shows **2 crisp uncropped columns** (not tiny 3-column stamps like Adam Halls, and not zoomed-out desktop like Jennifer Xiao).
     - Every card shows a subtle 1-line label underneath (solving Susann Hoffmann's textless mobile issue).
     - The floating **`Filter`** pill sits comfortably in the bottom-right thumb corner.
3. **Verify Low Memory Footprint (`< 15 MB` JS Heap):**
   - In Chrome DevTools, open the **Memory** tab -> look at **`Select JavaScript VM instance`**. You will see `~5–12 MB` (beating Wix's `23 MB`, Squarespace's `30 MB`, and Three.js sites' `35 MB+`).
   - Open a video in the modal, watch a few seconds, then close it — the `<video>` unmounts cleanly without leaking memory.
4. **Verify Lazy Loading & Low Network Transfer:**
   - Open the **Network** tab -> refresh the page -> check the bottom bar:
     - Only the first `~6–12` WebP thumbnails (`~350–500 KB` total!) download initially.
     - **`0` `.mp4` files** download on initial page load! Scroll down slowly and watch `.webp` thumbnails load on-demand just before entering the screen.

---

### Phase 8: Zero-Cost Static Deployment

Because `next.config.mjs` uses `output: 'export'`, your entire website compiles into a static `out/` folder with **zero server or database costs**:

- **Option A — Vercel (Simplest, Free CDN):**
  1. Push your repo to GitHub.
  2. Sign into https://vercel.com -> **Add New Project** -> select your `portfolio-` repository.
  3. Vercel automatically runs `npm run build` (`prepare-media` + `next build`) and deploys your static site on a global edge CDN with automatic HTTPS!
  *(Note: Since Vercel's default build container doesn't include `ffmpeg`, either run `npm run prepare-media` locally once and remove `public/media/video`, `public/media/preview`, and `public/media/poster` from `.gitignore` so pre-compressed videos are committed, OR install `ffmpeg-static` as a devDependency if you want cloud video transcoding.)*
- **Option B — Cloudflare Pages / Netlify / GitHub Pages:**
  - Upload or point your CI build command to `npm run build` and set the **Publish Directory** to **`out`**.

---

## 7. Final Quality & Performance Checklist

- [ ] **Contact Details Updated:** Replaced placeholder email and Instagram/Behance/WhatsApp URLs in `src/data/portfolio.ts` with H. A. Kularatne's real links.
- [ ] **Media Script Executed:** Ran `npm run prepare-media` with FFmpeg installed so `public/media/` has `.webp` thumbnails, posters, hover previews, and streamable `.mp4` videos.
- [ ] **Uncropped Aspect Ratios:** Verified `1:1` squares, `3:4` vertical posters, `1.41:1` stage art, `9:16` vertical reels, and `16:9` wide animation all show uncropped.
- [ ] **Cross-Folder Client Filtering:** Verified selecting `NSBM — Flower Path` or `Roshan Perera` pulls together both images AND videos from all their separate `assets/` folders.
- [ ] **Lighthouse Score Check:** Run Chrome DevTools -> **Lighthouse** (Mobile) -> verify Performance, Accessibility, and Best Practices all score **`95–100`**.
