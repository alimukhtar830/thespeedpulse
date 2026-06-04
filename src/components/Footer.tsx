import Link from 'next/link';
import { footerLinks, siteConfig } from '@/lib/site';

/** Site footer with link groups and legal line. */
export default function Footer() {
  const year = 2026; // build-time constant; update as needed

  return (
    <footer className="mt-24 border-t border-white/10 bg-navy-950/60">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-lg font-bold">
            <span
              className="grid h-8 w-8 place-items-center rounded-xl bg-hero-gradient"
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2v4M12 18v4M2 12h4M18 12h4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-gradient">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            A fast, modern and privacy-friendly tool to measure your real
            internet connection speed.
          </p>
        </div>

        {(
          [
            ['Measure', footerLinks.measure],
            ['Learn', footerLinks.learn],
            ['Guides', footerLinks.guides],
            ['Company', footerLinks.company],
          ] as const
        ).map(([heading, links]) => (
          <nav key={heading} aria-label={heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              {heading}
            </h3>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
