import Link from 'next/link';
import { siteConfig } from '@/lib/site';

/**
 * Transparent methodology + freshness note for the data (country/ISP/city) pages.
 * Addresses the SEO audit's "no source attribution / methodology" thin-content
 * flag, and is honest that the figures are representative, not live measurements.
 */
export default function DataNote({ extra }: { extra?: string }) {
  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs leading-relaxed text-slate-500">
      <p className="font-semibold text-slate-400">Methodology &amp; data source</p>
      <p className="mt-2">
        These are <strong>representative typical speeds</strong> for general
        comparison, informed by publicly reported broadband performance data and
        industry benchmarks. They are <strong>not live measurements</strong> and
        vary by provider, plan, technology, time of day and location. Last
        reviewed: {siteConfig.dataReviewed}.{extra ? ` ${extra}` : ''} For your
        actual connection, run a{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          free speed test
        </Link>
        .
      </p>
    </div>
  );
}
