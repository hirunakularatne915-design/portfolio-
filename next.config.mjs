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
