import type { ReactNode } from 'react';
import Link from 'next/link';
import AdSlot from './AdSlot';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import JsonLd from './JsonLd';
import { siteConfig } from '@/lib/site';

interface PageShellProps {
  title: string;
  /** Short lead paragraph shown under the title. */
  intro?: string;
  /** Small eyebrow label above the title. */
  eyebrow?: string;
  children: ReactNode;
  /** Show the reserved sidebar ad column on large screens. */
  withSidebarAd?: boolean;
  /** Last-updated date string (defaults to the site-wide review date). */
  updated?: string;
  /** Breadcrumb trail (Home is prepended automatically). */
  breadcrumbs?: Crumb[];
  /** Show the author byline + emit Article schema (on by default for content). */
  article?: boolean;
}

/**
 * Shared layout for content/legal/educational pages. Provides a semantic
 * <article>, a consistent header, an author byline + last-updated date
 * (E-E-A-T / freshness signals), TechArticle structured data, an optional
 * reserved ad sidebar, and a "back to test" call to action.
 */
export default function PageShell({
  title,
  intro,
  eyebrow,
  children,
  withSidebarAd = true,
  updated = siteConfig.updated,
  breadcrumbs,
  article = true,
}: PageShellProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: intro,
    datePublished: siteConfig.publishedISO,
    dateModified: siteConfig.updatedISO,
    author: { '@type': 'Organization', name: siteConfig.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main className="container-page py-12 sm:py-16">
      {article && <JsonLd data={articleSchema} />}
      {breadcrumbs && (
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{intro}</p>
        )}
        {article && (
          <p className="mt-4 text-sm text-slate-500">
            By {siteConfig.author} · Last updated {updated}
          </p>
        )}
      </div>

      <div
        className={
          withSidebarAd ? 'mt-12 grid gap-8 lg:grid-cols-[1fr_300px]' : 'mt-12'
        }
      >
        <article className="prose-invert mx-auto w-full max-w-3xl space-y-8 text-slate-300">
          {children}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="text-lg font-semibold text-white">
              Ready to check your connection?
            </p>
            <Link href="/" className="btn-primary mt-4">
              Run a free speed test
            </Link>
          </div>
        </article>

        {withSidebarAd && (
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot className="min-h-[600px]" label="Ad" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
