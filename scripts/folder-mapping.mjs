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
