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
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

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
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-y-auto lg:overflow-hidden rounded-xl border shadow-2xl lg:flex-row"
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        {/* Top Mobile Bar */}
        <div
          className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 lg:hidden"
          style={{
            backgroundColor: 'var(--bg-canvas)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-[10px] uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              {getClientLabel(item.client)}
            </p>
            <p className="truncate text-sm font-medium leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              {item.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border cursor-pointer"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Left Stage: Uncropped High-Res Artwork OR Full Audio Video */}
        <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-black/95 p-3 sm:p-6 lg:min-h-[46dvh] lg:flex-1 lg:shrink">
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
              className="max-h-[48dvh] sm:max-h-[58dvh] lg:max-h-[75dvh] w-auto max-w-full object-contain rounded"
            />
          ) : (
            <img
              key={item.id}
              src={item.fullSrc}
              alt={item.title}
              className="max-h-[52dvh] sm:max-h-[62dvh] lg:max-h-[78dvh] w-auto max-w-full object-contain rounded"
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
          className="flex w-full flex-col justify-between p-5 sm:p-6 lg:w-[340px] lg:overflow-y-auto lg:border-l"
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

            <dl
              className="mt-5 grid grid-cols-2 gap-y-3 border-y py-3.5 text-xs"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div>
                <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>CLIENT</dt>
                <dd className="mt-0.5 font-medium">{getClientLabel(item.client)}</dd>
              </div>
              <div>
                <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {item.type === 'video' ? 'FORMAT' : 'DIMENSIONS'}
                </dt>
                <dd className="mt-0.5 font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                  {item.type === 'video'
                    ? `${item.width > item.height ? '16:9 Wide' : '9:16 Vertical'} · ${item.durationLabel || 'Motion'}`
                    : `${item.width} × ${item.height}`}
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
