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
  // E-E-A-T: a named editorial entity for bylines + Article/author schema.
  author: 'SpeedPulse Editorial Team',
  founders: ['Ali Mukhtar', 'Mansoor Ahmad Samar'],
  // Visible freshness signal — bump when content is reviewed/updated.
  updated: 'June 4, 2026',
  publishedISO: '2026-06-01',
  updatedISO: '2026-06-04',
} as const;

/** Primary navigation links (also used to build the sitemap). */
export const navLinks = [
  { href: '/', label: 'Speed Test' },
  { href: '/performance', label: 'By Country' },
  { href: '/speed', label: 'By City' },
  { href: '/isp', label: 'ISPs' },
  { href: '/internet-speed-guide', label: 'Guide' },
  { href: '/about', label: 'About' },
] as const;

/** Footer link groups (also a key internal-linking surface for SEO). */
export const footerLinks = {
  measure: [
    { href: '/', label: 'Speed Test' },
    { href: '/performance', label: 'Speed by Country' },
    { href: '/speed', label: 'Speed by City' },
    { href: '/isp', label: 'ISP Speed Test' },
  ],
  learn: [
    { href: '/internet-speed-guide', label: 'Internet Speed Guide' },
    { href: '/how-much-speed-do-i-need', label: 'How Much Speed Do I Need?' },
    { href: '/what-is-download-speed', label: 'What is Download Speed?' },
    { href: '/what-is-upload-speed', label: 'What is Upload Speed?' },
    { href: '/what-is-ping', label: 'What is Ping?' },
    { href: '/what-is-jitter', label: 'What is Jitter?' },
    { href: '/what-is-bandwidth', label: 'What is Bandwidth?' },
    { href: '/how-accurate-are-speed-tests', label: 'How Accurate Are Speed Tests?' },
  ],
  guides: [
    { href: '/how-to-improve-internet-speed', label: 'Improve Internet Speed' },
    { href: '/why-is-my-internet-slow', label: 'Why Is My Internet Slow?' },
    { href: '/how-to-fix-high-ping', label: 'Fix High Ping' },
    { href: '/wifi-vs-ethernet', label: 'Wi-Fi vs Ethernet' },
    { href: '/best-dns-servers', label: 'Best DNS Servers' },
    { href: '/speed-for-streaming', label: 'Speed for Streaming' },
    { href: '/speed-for-gaming', label: 'Speed for Gaming' },
    { href: '/speed-for-video-calls', label: 'Speed for Video Calls' },
    { href: '/speed-for-working-from-home', label: 'Speed for Working From Home' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/how-speedpulse-works', label: 'How SpeedPulse Works' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ],
} as const;

/** All static indexable routes — consumed by app/sitemap.ts (dynamic ISP/city/country pages are added there). */
export const allRoutes = [
  '/',
  '/about',
  '/how-speedpulse-works',
  '/privacy-policy',
  '/contact',
  '/internet-speed-guide',
  '/how-much-speed-do-i-need',
  '/how-to-improve-internet-speed',
  '/why-is-my-internet-slow',
  '/how-to-fix-high-ping',
  '/wifi-vs-ethernet',
  '/best-dns-servers',
  '/what-is-download-speed',
  '/what-is-upload-speed',
  '/what-is-ping',
  '/what-is-jitter',
  '/what-is-bandwidth',
  '/how-accurate-are-speed-tests',
  '/speed-for-streaming',
  '/speed-for-gaming',
  '/speed-for-video-calls',
  '/speed-for-working-from-home',
  '/performance',
  '/speed',
  '/isp',
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
