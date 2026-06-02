import { serverConfig } from '@/lib/site';

/**
 * Map of Vercel deployment region codes to human-readable locations.
 * https://vercel.com/docs/edge-network/regions
 */
const VERCEL_REGIONS: Record<string, { city: string; country: string }> = {
  arn1: { city: 'Stockholm', country: 'Sweden' },
  bom1: { city: 'Mumbai', country: 'India' },
  cdg1: { city: 'Paris', country: 'France' },
  cle1: { city: 'Cleveland', country: 'USA' },
  cpt1: { city: 'Cape Town', country: 'South Africa' },
  dub1: { city: 'Dublin', country: 'Ireland' },
  fra1: { city: 'Frankfurt', country: 'Germany' },
  gru1: { city: 'São Paulo', country: 'Brazil' },
  hkg1: { city: 'Hong Kong', country: 'Hong Kong' },
  hnd1: { city: 'Tokyo', country: 'Japan' },
  iad1: { city: 'Washington, D.C.', country: 'USA' },
  icn1: { city: 'Seoul', country: 'South Korea' },
  kix1: { city: 'Osaka', country: 'Japan' },
  lhr1: { city: 'London', country: 'United Kingdom' },
  pdx1: { city: 'Portland', country: 'USA' },
  sfo1: { city: 'San Francisco', country: 'USA' },
  sin1: { city: 'Singapore', country: 'Singapore' },
  syd1: { city: 'Sydney', country: 'Australia' },
};

/**
 * The speed test runs against this app's own API routes, so the "server" is the
 * region this deployment actually executes in. On Vercel we read the live region
 * from `VERCEL_REGION`; otherwise we fall back to the configured values.
 */
export function getServerInfo() {
  const region = process.env.VERCEL_REGION; // e.g. "iad1", "fra1", or "dev1" locally
  const mapped = region ? VERCEL_REGIONS[region] : undefined;

  if (mapped) {
    return {
      name: region!.toUpperCase(),
      city: mapped.city,
      country: mapped.country,
    };
  }

  return {
    name: serverConfig.name,
    city: serverConfig.city,
    country: serverConfig.country,
  };
}
