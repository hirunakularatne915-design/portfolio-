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
