import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { needSpeedFaqs } from '@/content/faqs';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How Much Internet Speed Do I Need?',
  description:
    'A simple guide to how many Mbps you need for streaming, gaming, video calls, and working from home — by household size and activity.',
  path: '/how-much-speed-do-i-need',
  type: 'article',
});

const rows = [
  ['Browsing, email, music', '5–10 Mbps'],
  ['HD video streaming (per stream)', '5–10 Mbps'],
  ['4K video streaming (per stream)', '25 Mbps'],
  ['Video calls / working from home', '10–25 Mbps'],
  ['Online gaming', '10–25 Mbps + low ping'],
  ['Busy household (4+ devices, 4K)', '200–500 Mbps'],
];

export default function HowMuchSpeedPage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="How Much Internet Speed Do I Need?"
      intro="Match your plan to how you actually use the internet — without overpaying for speed you'll never use."
      breadcrumbs={[{ name: 'How Much Speed Do I Need?' }]}
    >
      <p>
        The right speed depends on two things: how many people and devices share
        your connection, and what you do online. Use the table below as a quick
        reference, then{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          run a speed test
        </Link>{' '}
        to see what you currently get.
      </p>

      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Activity</th>
              <th className="px-4 py-3 font-semibold">Recommended</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([activity, rec], i) => (
              <tr key={activity} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-3 text-slate-300">{activity}</td>
                <td className="px-4 py-3 font-medium text-cyan-400">{rec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white">A simple rule of thumb</h2>
      <p>
        Add up the activities likely to happen at the same time in your home. One
        4K stream (25 Mbps) plus a video call (10 Mbps) plus general browsing
        comfortably fits within a 100 Mbps plan. Bigger households with
        simultaneous 4K and gaming benefit from 200–500 Mbps.
      </p>

      <h2 className="text-2xl font-bold text-white">Don't forget upload and ping</h2>
      <p>
        Download isn't everything. <Link href="/what-is-upload-speed" className="text-cyan-400 hover:underline">Upload speed</Link>{' '}
        matters for video calls and backups, and{' '}
        <Link href="/what-is-ping" className="text-cyan-400 hover:underline">ping</Link>{' '}
        (latency) matters most for gaming and calls. Curious how your country
        compares? See <Link href="/performance" className="text-cyan-400 hover:underline">internet speed by country</Link>.
      </p>

      <FaqSection items={needSpeedFaqs} />
    </PageShell>
  );
}
