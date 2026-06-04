import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wi-Fi vs Ethernet: Which Is Faster?',
  description:
    'Wi-Fi vs Ethernet compared for speed, latency, stability and convenience — when wired wins, when Wi-Fi is fine, and how much difference it really makes.',
  path: '/wifi-vs-ethernet',
  type: 'article',
});

const rows = [
  ['Max speed', 'Up to ~1–2.5 Gbps (cable)', 'Varies; often 30–70% of wired'],
  ['Latency (ping)', 'Lowest, very stable', 'Higher, more variable'],
  ['Jitter', 'Very low', 'Higher (interference)'],
  ['Stability', 'Excellent', 'Affected by distance/walls'],
  ['Convenience', 'Needs a cable', 'Wireless, flexible'],
];

const faqs = [
  {
    question: 'Is Ethernet really faster than Wi-Fi?',
    answer:
      'For latency and stability, almost always yes. For raw download, a strong Wi-Fi 6 signal can rival wired, but Ethernet is more consistent and has lower ping and jitter.',
  },
  {
    question: 'Should I use Ethernet for gaming and calls?',
    answer:
      'Yes — wired gives lower, steadier ping and jitter, which matters more than bandwidth for gaming and video calls.',
  },
  {
    question: 'Why is my Wi-Fi so much slower than my plan?',
    answer:
      'Distance, walls, interference, the 2.4 GHz band, and older devices all cut Wi-Fi speed. Test wired next to the router to see your true line speed.',
  },
];

export default function WifiVsEthernetPage() {
  return (
    <PageShell
      eyebrow="Fix"
      title="Wi-Fi vs Ethernet: Which Is Faster?"
      intro="Wired wins on latency and stability; Wi-Fi wins on convenience. Here's how big the gap really is."
      breadcrumbs={[{ name: 'Wi-Fi vs Ethernet' }]}
    >
      <p>
        The fastest way to learn your true connection speed is to test wired —
        Wi-Fi adds overhead, latency and variability. Here&apos;s how they
        compare:
      </p>

      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold"></th>
              <th className="px-4 py-3 font-semibold">Ethernet</th>
              <th className="px-4 py-3 font-semibold">Wi-Fi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([m, e, w], i) => (
              <tr key={m} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-3 font-medium text-slate-300">{m}</td>
                <td className="px-4 py-3 text-cyan-400">{e}</td>
                <td className="px-4 py-3 text-slate-400">{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white">Which should you use?</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Wired Ethernet</strong> — gaming, video calls, large transfers,
          and your main work/desktop machine.
        </li>
        <li>
          <strong>Wi-Fi</strong> — phones, tablets, and casual browsing where
          convenience wins and the signal is strong.
        </li>
      </ul>

      <p>
        Try it yourself:{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          test wired vs Wi-Fi
        </Link>{' '}
        and compare. More tips in the{' '}
        <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
          improvement guide
        </Link>
        .
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
