import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Best DNS Servers for Speed (Free & Fast, 2026)',
  description:
    'The best free public DNS servers for faster, more reliable browsing — Cloudflare, Google, Quad9 — what DNS does, and how to change it on any device.',
  path: '/best-dns-servers',
  type: 'article',
});

const rows = [
  ['Cloudflare', '1.1.1.1 / 1.0.0.1', 'Fastest for most; privacy-focused'],
  ['Google', '8.8.8.8 / 8.8.4.4', 'Reliable, widely peered'],
  ['Quad9', '9.9.9.9', 'Security/malware blocking'],
  ['OpenDNS', '208.67.222.222', 'Optional content filtering'],
];

const faqs = [
  {
    question: 'Does changing DNS increase internet speed?',
    answer:
      'It won’t raise your download/upload Mbps, but a faster DNS resolver can make websites start loading quicker (lower lookup time) and improve reliability.',
  },
  {
    question: 'What is the fastest DNS server?',
    answer:
      'For most users Cloudflare (1.1.1.1) is among the fastest and most private, but the best one depends on your location — test a couple and compare page-load feel.',
  },
  {
    question: 'Is it safe to change my DNS?',
    answer:
      'Yes. Public resolvers like Cloudflare, Google and Quad9 are reputable and free. You can revert to your ISP’s DNS anytime.',
  },
];

export default function DnsPage() {
  return (
    <PageShell
      eyebrow="Fix"
      title="Best DNS Servers for Speed"
      intro="Changing your DNS won't raise your Mbps, but a fast resolver makes pages start loading quicker and more reliably."
      breadcrumbs={[{ name: 'Best DNS Servers' }]}
    >
      <p>
        DNS is the internet&apos;s address book — it turns a domain like{' '}
        <em>thespeedpulse.com</em> into the server&apos;s IP address. A faster,
        closer DNS resolver shortens that lookup, so sites feel snappier even
        though your raw{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          speed-test
        </Link>{' '}
        numbers stay the same.
      </p>

      <h2 className="text-2xl font-bold text-white">Top free public DNS</h2>
      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Provider</th>
              <th className="px-4 py-3 font-semibold">Addresses</th>
              <th className="px-4 py-3 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([p, a, b], i) => (
              <tr key={p} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-3 font-medium text-cyan-400">{p}</td>
                <td className="px-4 py-3 text-slate-300">{a}</td>
                <td className="px-4 py-3 text-slate-400">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white">How to change your DNS</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Windows:</strong> Settings → Network → Adapter → Edit DNS →
          Manual → enter the addresses.
        </li>
        <li>
          <strong>macOS:</strong> System Settings → Network → Details → DNS.
        </li>
        <li>
          <strong>Router (best):</strong> set it once in your router so every
          device benefits.
        </li>
        <li>
          <strong>Phone:</strong> Wi-Fi settings → configure DNS (or use the
          1.1.1.1 app).
        </li>
      </ul>

      <p>
        Pair this with the wider fixes in{' '}
        <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
          how to improve internet speed
        </Link>
        .
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
