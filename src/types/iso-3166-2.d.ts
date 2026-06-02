declare module 'iso-3166-2' {
  interface Subdivision {
    name: string;
    type?: string;
    countryName?: string;
    code?: string;
    regionCode?: string;
  }
  const iso: {
    /** Look up a subdivision by country + region code, or a combined "US-CA". */
    subdivision(countryOrCombined: string, region?: string): Subdivision | null;
    country(code: string): unknown;
    data: Record<string, unknown>;
  };
  export default iso;
}
