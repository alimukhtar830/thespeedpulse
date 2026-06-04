import type { Metadata } from 'next';
import { siteConfig } from './site';

interface PageMetaInput {
  title: string;
  description: string;
  /** Absolute path beginning with "/" (e.g. "/what-is-ping"). */
  path: string;
  /** Optional comma/array keywords specific to the page. */
  keywords?: string[];
  /** OpenGraph type — "website" (default) or "article". */
  type?: 'website' | 'article';
}

/**
 * Builds a complete, per-page Metadata object with a correct canonical and
 * UNIQUE OpenGraph + Twitter tags. Centralising this fixes the audit findings
 * that og:title/og:description/og:url were identical (and localhost) across
 * every page. Canonical is a relative path resolved against metadataBase
 * (siteConfig.url) set in the root layout.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  type = 'website',
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.twitter,
    },
  };
}
