import type { MetadataRoute } from 'next';
import { allRoutes, siteConfig } from '@/lib/site';
import { countries } from '@/content/performance';
import { isps } from '@/content/isps';
import { cities } from '@/content/cities';

/** Generates /sitemap.xml from canonical routes + programmatic country/ISP/city pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-06-03');

  const staticRoutes: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));

  const programmatic = (prefix: string, slugs: string[]): MetadataRoute.Sitemap =>
    slugs.map((slug) => ({
      url: `${siteConfig.url}${prefix}/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [
    ...staticRoutes,
    ...programmatic('/performance', countries.map((c) => c.slug)),
    ...programmatic('/isp', isps.map((i) => i.slug)),
    ...programmatic('/speed', cities.map((c) => c.slug)),
  ];
}
