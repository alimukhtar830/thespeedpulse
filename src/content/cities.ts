/**
 * Seed dataset for programmatic /speed/[city] pages.
 *
 * Figures are APPROXIMATE, representative typical fixed-broadband speeds
 * (clearly labelled in the UI) — a framework to capture "[city] internet speed"
 * search demand. Pakistan cities are prioritised per the SEO audit. Replace with
 * real aggregated data over time.
 */

export interface City {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  download: number;
  upload: number;
  ping: number;
}

export const cityList: City[] = [
  // Pakistan (priority)
  { slug: 'karachi', name: 'Karachi', country: 'Pakistan', countryCode: 'PK', download: 35, upload: 25, ping: 18 },
  { slug: 'lahore', name: 'Lahore', country: 'Pakistan', countryCode: 'PK', download: 38, upload: 28, ping: 16 },
  { slug: 'islamabad', name: 'Islamabad', country: 'Pakistan', countryCode: 'PK', download: 45, upload: 35, ping: 15 },
  { slug: 'rawalpindi', name: 'Rawalpindi', country: 'Pakistan', countryCode: 'PK', download: 40, upload: 30, ping: 16 },
  { slug: 'faisalabad', name: 'Faisalabad', country: 'Pakistan', countryCode: 'PK', download: 28, upload: 18, ping: 20 },
  { slug: 'multan', name: 'Multan', country: 'Pakistan', countryCode: 'PK', download: 25, upload: 16, ping: 22 },
  { slug: 'peshawar', name: 'Peshawar', country: 'Pakistan', countryCode: 'PK', download: 24, upload: 15, ping: 22 },
  // Global hubs
  { slug: 'new-york', name: 'New York', country: 'United States', countryCode: 'US', download: 240, upload: 30, ping: 12 },
  { slug: 'los-angeles', name: 'Los Angeles', country: 'United States', countryCode: 'US', download: 220, upload: 28, ping: 14 },
  { slug: 'chicago', name: 'Chicago', country: 'United States', countryCode: 'US', download: 210, upload: 25, ping: 13 },
  { slug: 'london', name: 'London', country: 'United Kingdom', countryCode: 'GB', download: 140, upload: 30, ping: 12 },
  { slug: 'toronto', name: 'Toronto', country: 'Canada', countryCode: 'CA', download: 200, upload: 90, ping: 12 },
  { slug: 'dubai', name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', download: 290, upload: 60, ping: 13 },
  { slug: 'singapore', name: 'Singapore', country: 'Singapore', countryCode: 'SG', download: 300, upload: 280, ping: 7 },
  { slug: 'tokyo', name: 'Tokyo', country: 'Japan', countryCode: 'JP', download: 200, upload: 180, ping: 10 },
  { slug: 'sydney', name: 'Sydney', country: 'Australia', countryCode: 'AU', download: 95, upload: 22, ping: 14 },
  { slug: 'mumbai', name: 'Mumbai', country: 'India', countryCode: 'IN', download: 75, upload: 70, ping: 14 },
  { slug: 'delhi', name: 'Delhi', country: 'India', countryCode: 'IN', download: 70, upload: 65, ping: 16 },
  { slug: 'dhaka', name: 'Dhaka', country: 'Bangladesh', countryCode: 'BD', download: 42, upload: 38, ping: 20 },
  { slug: 'istanbul', name: 'Istanbul', country: 'Turkey', countryCode: 'TR', download: 55, upload: 18, ping: 20 },
];

export const cities: City[] = [...cityList].sort((a, b) => a.name.localeCompare(b.name));

export function getCity(slug: string): City | undefined {
  return cityList.find((c) => c.slug === slug);
}

export function citiesByCountry(): Record<string, City[]> {
  const map: Record<string, City[]> = {};
  for (const c of cityList) (map[c.country] ??= []).push(c);
  return map;
}
