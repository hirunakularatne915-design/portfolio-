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
  email: 'hello@hakularatne.com',
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
