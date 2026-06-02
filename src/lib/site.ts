/**
 * Central site configuration — used by metadata, navigation, sitemap, robots,
 * and the network-info layer. Keep all site-wide constants here.
 */

export const siteConfig = {
  name: 'SpeedPulse',
  shortName: 'SpeedPulse',
  description:
    'Test your internet speed instantly. Measure download, upload, ping, jitter, your public IP, ISP, and approximate location with a fast, modern, privacy-friendly speed test.',
  // Read from env in production; falls back to localhost for local dev.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'en_US',
  twitter: '@speedpulse',
} as const;

/** Primary navigation links (also used to build the sitemap). */
export const navLinks = [
  { href: '/', label: 'Speed Test' },
  { href: '/internet-speed-guide', label: 'Speed Guide' },
  { href: '/what-is-download-speed', label: 'Download' },
  { href: '/what-is-upload-speed', label: 'Upload' },
  { href: '/what-is-ping', label: 'Ping' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Footer link groups. */
export const footerLinks = {
  learn: [
    { href: '/internet-speed-guide', label: 'Internet Speed Guide' },
    { href: '/what-is-download-speed', label: 'What is Download Speed?' },
    { href: '/what-is-upload-speed', label: 'What is Upload Speed?' },
    { href: '/what-is-ping', label: 'What is Ping?' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ],
} as const;

/** All indexable routes — consumed by app/sitemap.ts. */
export const allRoutes = [
  '/',
  '/about',
  '/privacy-policy',
  '/internet-speed-guide',
  '/what-is-download-speed',
  '/what-is-upload-speed',
  '/what-is-ping',
  '/contact',
] as const;

/**
 * Test-server metadata shown in the Network Info card. The speed test runs
 * against this app's own API routes, so "server" describes this deployment.
 * Override via env per region.
 */
export const serverConfig = {
  name: process.env.NEXT_PUBLIC_SERVER_NAME ?? 'Primary Test Server',
  city: process.env.NEXT_PUBLIC_SERVER_CITY ?? 'Frankfurt',
  country: process.env.NEXT_PUBLIC_SERVER_COUNTRY ?? 'Germany',
} as const;
