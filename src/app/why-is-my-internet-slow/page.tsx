import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Why Is My Internet So Slow? (12 Causes & Fixes)',
  description:
    'The most common reasons your internet is slow — Wi-Fi, router, congestion, devices, ISP throttling — and exactly how to diagnose and fix each one.',
  path: '/why-is-my-internet-slow',
  type: 'article',
});

const causes = [
  ['Wi-Fi distance / interference', 'Move closer or relocate the router; use 5 GHz.'],
  ['Old or overloaded router', 'Restart it; update firmware; replace if 5+ years old.'],
  ['Too many devices', 'Disconnect idle devices; use QoS to prioritise.'],
  ['Background downloads/updates', 'Pause cloud backups, game/OS updates.'],
  ['Peak-time congestion', 'Test at different hours; common 7–11pm.'],
  ['Wrong plan for your usage', 'Compare your result to what you pay for.'],
  ['ISP throttling or an outage', 'Test wired; contact your ISP with results.'],
  ['Device limitations / VPN', 'Test another device; toggle the VPN off.'],
];

const faqs = [
  {
    question: 'How do I find out why my internet is slow?',
    answer:
      'Start with a wired speed test next to the router. If wired is fast but Wi-Fi is slow, it is a Wi-Fi issue. If wired is also slow, it is your plan, line, or ISP.',
  },
  {
    question: 'Does restarting the router actually help?',
    answer:
      'Often yes — it clears memory and re-establishes the connection, fixing many temporary slowdowns. It is the first thing to try.',
  },
  {
    question: 'Can my ISP slow down my internet?',
    answer:
      'Yes — through throttling, congestion, or an outage. A wired test well below your plan speed, especially at certain times, can indicate an ISP issue worth reporting.',
  },
];

export default function SlowPage() {
  return (
    <PageShell
      eyebrow="Fix"
      title="Why Is My Internet So Slow?"
      intro="Work through the most common causes — most are fixable in minutes, and the rest point to your plan or ISP."
      breadcrumbs={[{ name: 'Why Is My Internet Slow?' }]}
    >
      <p>
        First, get a baseline:{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          run a speed test
        </Link>{' '}
        wired (next to the router) and again on Wi-Fi. Comparing the two
        instantly tells you whether the problem is your Wi-Fi or the connection
        itself.
      </p>

      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Likely cause</th>
              <th className="px-4 py-3 font-semibold">Fix</th>
            </tr>
          </thead>
          <tbody>
            {causes.map(([c, f], i) => (
              <tr key={c} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-3 text-slate-300">{c}</td>
                <td className="px-4 py-3 text-slate-400">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        For step-by-step fixes, see{' '}
        <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
          how to improve your internet speed
        </Link>{' '}
        and{' '}
        <Link href="/wifi-vs-ethernet" className="text-cyan-400 hover:underline">
          Wi-Fi vs Ethernet
        </Link>
        .
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
