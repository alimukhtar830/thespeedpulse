import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pingFaqs } from '@/content/faqs';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'What is Ping? (Latency & Jitter Explained)',
  description:
    'Ping explained: what latency means, how it differs from jitter, what counts as a good ping for gaming and calls, and how to lower it.',
  path: '/what-is-ping',
  type: 'article',
});

export default function PingPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="What is Ping?"
      intro="Ping is how long it takes a small request to travel to a server and back — your connection's responsiveness."
      breadcrumbs={[{ name: 'What is Ping?' }]}
    >
      <p>
        <strong>Ping</strong>, also called latency, is the round-trip time for a
        small packet of data to reach a server and return, measured in
        milliseconds (ms). Unlike download and upload, where higher is better,{' '}
        <strong>lower ping is better</strong> — it means your connection reacts
        more quickly.
      </p>

      <h2 className="text-2xl font-bold text-white">Ping vs. jitter</h2>
      <p>
        <strong>Jitter</strong> is the variation between consecutive ping
        measurements. You can have a low average ping but high jitter, which
        causes stutter in calls and games. A great connection has both low ping
        and low, stable jitter.
      </p>

      <h2 className="text-2xl font-bold text-white">How it's measured</h2>
      <p>
        Our test sends several lightweight requests to the server and times each
        round trip. The representative ping is the median of those samples, and
        jitter is the average difference between consecutive samples. The first
        sample is discarded to exclude connection warm-up.
      </p>

      <h2 className="text-2xl font-bold text-white">What's a good ping?</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <span className="font-medium text-emerald-400">Under 20 ms</span> —
          excellent, ideal for competitive gaming
        </li>
        <li>
          <span className="font-medium text-cyan-400">20–50 ms</span> — good for
          gaming and video calls
        </li>
        <li>
          <span className="font-medium text-amber-400">50–100 ms</span> —
          acceptable for most activities
        </li>
        <li>
          <span className="font-medium text-rose-400">Over 150 ms</span> —
          noticeable lag in real-time applications
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white">Good ping by use case</h2>
      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Use case</th>
              <th className="px-4 py-3 font-semibold">Target ping</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Competitive gaming', 'Under 20 ms'],
              ['Casual online gaming', '20–50 ms'],
              ['Video calls (Zoom/Teams)', 'Under 50 ms'],
              ['Browsing & streaming', 'Under 100 ms'],
              ['Noticeable lag begins', 'Over 150 ms'],
            ].map(([u, p], i) => (
              <tr key={u} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-3 text-slate-300">{u}</td>
                <td className="px-4 py-3 font-medium text-cyan-400">{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white">How to lower your ping</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use a wired Ethernet connection instead of Wi-Fi.</li>
        <li>Connect to servers geographically close to you.</li>
        <li>Close background apps using bandwidth.</li>
        <li>Restart your router and keep its firmware updated.</li>
      </ul>
      <p>
        For a complete walkthrough, see our dedicated guide on{' '}
        <Link href="/how-to-fix-high-ping" className="text-cyan-400 hover:underline">
          how to fix high ping
        </Link>
        . High ping often comes with high{' '}
        <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
          jitter
        </Link>{' '}
        — and it matters most for{' '}
        <Link href="/speed-for-gaming" className="text-cyan-400 hover:underline">
          gaming
        </Link>
        . Check yours now with a{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          free speed test
        </Link>
        .
      </p>

      <FaqSection items={pingFaqs} />
    </PageShell>
  );
}
