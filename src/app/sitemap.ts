import type { MetadataRoute } from 'next';
import { allRoutes, siteConfig } from '@/lib/site';
import { countries } from '@/content/performance';

/** Generates /sitemap.xml from the canonical routes + programmatic country pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time constant; bump on significant content updates.
  const lastModified = new Date('2026-06-02');

  const staticRoutes: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));

  const countryRoutes: MetadataRoute.Sitemap = countries.map((c) => ({
    url: `${siteConfig.url}/performance/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes];
}
