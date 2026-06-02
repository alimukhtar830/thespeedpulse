import type { MetadataRoute } from 'next';
import { allRoutes, siteConfig } from '@/lib/site';

/** Generates /sitemap.xml from the canonical route list. */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time constant; bump on significant content updates.
  const lastModified = new Date('2026-06-01');

  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
