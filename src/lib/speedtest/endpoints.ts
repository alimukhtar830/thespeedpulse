/**
 * Resolves the speed-test endpoint URLs.
 *
 * When NEXT_PUBLIC_SPEEDTEST_ORIGIN is set (a Cloudflare Worker on the global
 * edge), all measurement traffic goes there — each visitor is served from their
 * nearest Cloudflare PoP, with no egress fees. Otherwise it falls back to the
 * same-origin Vercel API routes (used for local dev / previews).
 *
 * The value is inlined at build time by Next.js, so it works inside the Web
 * Worker bundle too.
 */
const ORIGIN = process.env.NEXT_PUBLIC_SPEEDTEST_ORIGIN;

export function endpoints() {
  if (ORIGIN) {
    return {
      ping: `${ORIGIN}/ping`,
      download: `${ORIGIN}/download`,
      upload: `${ORIGIN}/upload`,
    };
  }
  // Same-origin fallback (Vercel API routes + static ping target).
  return {
    ping: '/ping.txt',
    download: '/api/download',
    upload: '/api/upload',
  };
}
