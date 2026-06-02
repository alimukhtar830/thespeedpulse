import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/** Generates /robots.txt — allow everything, point crawlers to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // API routes are for the app itself, not for indexing.
      disallow: '/api/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
