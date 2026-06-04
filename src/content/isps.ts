/**
 * Seed dataset for programmatic /isp/[isp] pages.
 *
 * Figures are APPROXIMATE, representative typical speeds (clearly labelled as
 * such in the UI) — a starting framework to capture "[ISP] speed test" search
 * demand. Replace with real aggregated data from your own tests over time.
 * Pakistan ISPs are prioritised per the SEO audit (high relevance, lower
 * competition), followed by major global providers.
 */

export interface Isp {
  slug: string;
  name: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2 for the flag
  type: 'Fiber' | 'Cable' | 'DSL' | 'Mobile / 5G';
  download: number; // typical Mbps
  upload: number;
  ping: number; // typical ms
}

export const ispList: Isp[] = [
  // --- Pakistan (priority market) ---
  { slug: 'ptcl', name: 'PTCL', country: 'Pakistan', countryCode: 'PK', type: 'DSL', download: 20, upload: 6, ping: 28 },
  { slug: 'stormfiber', name: 'StormFiber', country: 'Pakistan', countryCode: 'PK', type: 'Fiber', download: 60, upload: 50, ping: 14 },
  { slug: 'nayatel', name: 'Nayatel', country: 'Pakistan', countryCode: 'PK', type: 'Fiber', download: 55, upload: 50, ping: 14 },
  { slug: 'transworld', name: 'Transworld Home', country: 'Pakistan', countryCode: 'PK', type: 'Fiber', download: 50, upload: 45, ping: 16 },
  { slug: 'jazz', name: 'Jazz', country: 'Pakistan', countryCode: 'PK', type: 'Mobile / 5G', download: 28, upload: 12, ping: 30 },
  { slug: 'zong', name: 'Zong', country: 'Pakistan', countryCode: 'PK', type: 'Mobile / 5G', download: 26, upload: 12, ping: 32 },
  { slug: 'telenor', name: 'Telenor', country: 'Pakistan', countryCode: 'PK', type: 'Mobile / 5G', download: 22, upload: 10, ping: 34 },
  { slug: 'wateen', name: 'Wateen', country: 'Pakistan', countryCode: 'PK', type: 'Fiber', download: 35, upload: 25, ping: 20 },
  // --- United States ---
  { slug: 'xfinity', name: 'Xfinity (Comcast)', country: 'United States', countryCode: 'US', type: 'Cable', download: 200, upload: 20, ping: 16 },
  { slug: 'att', name: 'AT&T Internet', country: 'United States', countryCode: 'US', type: 'Fiber', download: 250, upload: 230, ping: 12 },
  { slug: 'verizon-fios', name: 'Verizon Fios', country: 'United States', countryCode: 'US', type: 'Fiber', download: 300, upload: 290, ping: 11 },
  { slug: 'spectrum', name: 'Spectrum', country: 'United States', countryCode: 'US', type: 'Cable', download: 200, upload: 20, ping: 18 },
  { slug: 't-mobile-home', name: 'T-Mobile Home Internet', country: 'United States', countryCode: 'US', type: 'Mobile / 5G', download: 130, upload: 25, ping: 30 },
  { slug: 'cox', name: 'Cox Communications', country: 'United States', countryCode: 'US', type: 'Cable', download: 150, upload: 15, ping: 18 },
  { slug: 'google-fiber', name: 'Google Fiber', country: 'United States', countryCode: 'US', type: 'Fiber', download: 700, upload: 700, ping: 9 },
  // --- United Kingdom ---
  { slug: 'bt', name: 'BT', country: 'United Kingdom', countryCode: 'GB', type: 'Fiber', download: 70, upload: 20, ping: 14 },
  { slug: 'virgin-media', name: 'Virgin Media', country: 'United Kingdom', countryCode: 'GB', type: 'Cable', download: 150, upload: 25, ping: 14 },
  { slug: 'sky', name: 'Sky Broadband', country: 'United Kingdom', countryCode: 'GB', type: 'Fiber', download: 60, upload: 18, ping: 15 },
  // --- India ---
  { slug: 'jio-fiber', name: 'JioFiber', country: 'India', countryCode: 'IN', type: 'Fiber', download: 90, upload: 90, ping: 14 },
  { slug: 'airtel-xstream', name: 'Airtel Xstream', country: 'India', countryCode: 'IN', type: 'Fiber', download: 100, upload: 100, ping: 14 },
  // --- UAE ---
  { slug: 'etisalat', name: 'Etisalat (e&)', country: 'United Arab Emirates', countryCode: 'AE', type: 'Fiber', download: 250, upload: 60, ping: 13 },
  { slug: 'du', name: 'du', country: 'United Arab Emirates', countryCode: 'AE', type: 'Fiber', download: 200, upload: 50, ping: 14 },
];

export const isps: Isp[] = [...ispList].sort((a, b) => a.name.localeCompare(b.name));

export function getIsp(slug: string): Isp | undefined {
  return ispList.find((i) => i.slug === slug);
}

/** Group ISPs by country for the hub page. */
export function ispsByCountry(): Record<string, Isp[]> {
  const map: Record<string, Isp[]> = {};
  for (const i of ispList) (map[i.country] ??= []).push(i);
  return map;
}
