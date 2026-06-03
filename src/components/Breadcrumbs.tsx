import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export interface Crumb {
  name: string;
  /** Absolute path (e.g. "/performance"). Omit for the current page. */
  href?: string;
}

/**
 * Accessible breadcrumb trail + BreadcrumbList structured data (SEO).
 * "Home" is prepended automatically.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: 'Home', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${siteConfig.url}${c.href === '/' ? '' : c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="not-prose mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link href={c.href} className="transition-colors hover:text-cyan-400">
                  {c.name}
                </Link>
              ) : (
                <span className={last ? 'text-slate-200' : ''} aria-current={last ? 'page' : undefined}>
                  {c.name}
                </span>
              )}
              {!last && <span className="text-slate-600">/</span>}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
