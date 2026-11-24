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
          {/* Axis 1: Design Category Pills */}
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
                  onClick={() => {
                    setViewMode('curated');
                    setVisibleCount(PAGE_SIZE);
                  }}
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
                  onClick={() => {
                    setViewMode('all');
                    setVisibleCount(PAGE_SIZE);
                  }}
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
              eager={idx < 6}
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

      {/* 4. Dedicated Motion Storytelling Cinema Strip */}
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

      {/* 5. About & Selected Clients Directory */}
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
        className="pt-12 pb-24 lg:pb-12 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
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

      {/* 7. Thumb-Zone Floating Mobile Filter Button */}
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
