/**
 * Seed dataset for the programmatic /performance/ country pages.
 *
 * NOTE: These are APPROXIMATE, representative reference figures for typical
 * fixed-broadband performance — a starting framework, not live measurements.
 * Replace with real aggregated data from your own tests over time (that's what
 * turns this section into a genuine organic-search moat). Values are labelled
 * as "typical/approximate" in the UI so they are never presented as precise.
 */

export interface CountrySpeed {
  slug: string; // URL slug, e.g. "united-states"
  name: string;
  code: string; // ISO 3166-1 alpha-2 (for the flag emoji)
  download: number; // typical Mbps
  upload: number; // typical Mbps
  ping: number; // typical ms
}

export const countrySpeeds: CountrySpeed[] = [
  { slug: 'united-states', name: 'United States', code: 'US', download: 240, upload: 35, ping: 14 },
  { slug: 'united-kingdom', name: 'United Kingdom', code: 'GB', download: 130, upload: 28, ping: 14 },
  { slug: 'canada', name: 'Canada', code: 'CA', download: 210, upload: 90, ping: 12 },
  { slug: 'germany', name: 'Germany', code: 'DE', download: 110, upload: 30, ping: 16 },
  { slug: 'france', name: 'France', code: 'FR', download: 230, upload: 180, ping: 12 },
  { slug: 'spain', name: 'Spain', code: 'ES', download: 200, upload: 160, ping: 13 },
  { slug: 'italy', name: 'Italy', code: 'IT', download: 95, upload: 45, ping: 18 },
  { slug: 'netherlands', name: 'Netherlands', code: 'NL', download: 180, upload: 80, ping: 10 },
  { slug: 'sweden', name: 'Sweden', code: 'SE', download: 200, upload: 130, ping: 11 },
  { slug: 'switzerland', name: 'Switzerland', code: 'CH', download: 250, upload: 150, ping: 10 },
  { slug: 'australia', name: 'Australia', code: 'AU', download: 90, upload: 20, ping: 16 },
  { slug: 'japan', name: 'Japan', code: 'JP', download: 160, upload: 130, ping: 12 },
  { slug: 'south-korea', name: 'South Korea', code: 'KR', download: 170, upload: 130, ping: 9 },
  { slug: 'singapore', name: 'Singapore', code: 'SG', download: 300, upload: 280, ping: 7 },
  { slug: 'united-arab-emirates', name: 'United Arab Emirates', code: 'AE', download: 310, upload: 60, ping: 13 },
  { slug: 'saudi-arabia', name: 'Saudi Arabia', code: 'SA', download: 180, upload: 50, ping: 20 },
  { slug: 'india', name: 'India', code: 'IN', download: 63, upload: 58, ping: 18 },
  { slug: 'pakistan', name: 'Pakistan', code: 'PK', download: 25, upload: 15, ping: 24 },
  { slug: 'bangladesh', name: 'Bangladesh', code: 'BD', download: 40, upload: 38, ping: 22 },
  { slug: 'china', name: 'China', code: 'CN', download: 240, upload: 120, ping: 20 },
  { slug: 'indonesia', name: 'Indonesia', code: 'ID', download: 30, upload: 18, ping: 20 },
  { slug: 'philippines', name: 'Philippines', code: 'PH', download: 95, upload: 95, ping: 16 },
  { slug: 'malaysia', name: 'Malaysia', code: 'MY', download: 140, upload: 100, ping: 14 },
  { slug: 'thailand', name: 'Thailand', code: 'TH', download: 230, upload: 200, ping: 12 },
  { slug: 'vietnam', name: 'Vietnam', code: 'VN', download: 150, upload: 130, ping: 14 },
  { slug: 'brazil', name: 'Brazil', code: 'BR', download: 150, upload: 80, ping: 15 },
  { slug: 'mexico', name: 'Mexico', code: 'MX', download: 90, upload: 50, ping: 20 },
  { slug: 'turkey', name: 'Turkey', code: 'TR', download: 50, upload: 15, ping: 22 },
  { slug: 'south-africa', name: 'South Africa', code: 'ZA', download: 45, upload: 25, ping: 18 },
  { slug: 'nigeria', name: 'Nigeria', code: 'NG', download: 25, upload: 12, ping: 30 },
  { slug: 'egypt', name: 'Egypt', code: 'EG', download: 75, upload: 12, ping: 24 },
];

/** De-duplicated, alphabetically sorted list (guards against accidental dupes). */
export const countries: CountrySpeed[] = Array.from(
  new Map(countrySpeeds.map((c) => [c.slug, c])).values(),
).sort((a, b) => a.name.localeCompare(b.name));

export function getCountry(slug: string): CountrySpeed | undefined {
  return countries.find((c) => c.slug === slug);
}

/** ISO 3166-1 alpha-2 code → flag emoji. */
export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}
