import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { guideFaqs } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'Internet Speed Guide — How Much Speed Do You Need?',
  description:
    'Understand internet speeds: what download, upload, ping and jitter mean, how many Mbps you need for streaming, gaming and work, and how to get accurate results.',
  alternates: { canonical: '/internet-speed-guide' },
};

const tiers = [
  ['1–10 Mbps', 'Basic browsing, email, SD video on one device.'],
  ['10–50 Mbps', 'HD streaming, video calls, a few connected devices.'],
  ['50–200 Mbps', '4K streaming, gaming, busy households, remote work.'],
  ['200 Mbps+', 'Heavy 4K/8K streaming, large downloads, many users at once.'],
];

export default function GuidePage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="The Internet Speed Guide"
      intro="Everything you need to understand your connection — and how much speed you actually need."
    >
      <h2 className="text-2xl font-bold text-white">
        The four key measurements
      </h2>
      <p>
        Every speed test reports four numbers. <strong>Download</strong> and{' '}
        <strong>upload</strong> speeds (in Mbps) describe how fast data moves to
        and from your device. <strong>Ping</strong> (in ms) is how responsive
        your connection is, and <strong>jitter</strong> (in ms) measures how
        stable that responsiveness is over time.
      </p>

      <h2 className="text-2xl font-bold text-white">How much speed do I need?</h2>
      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Speed</th>
              <th className="px-4 py-3 font-semibold">Good for</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map(([speed, use], i) => (
              <tr
                key={speed}
                className={i % 2 ? 'bg-white/[0.02]' : ''}
              >
                <td className="px-4 py-3 font-medium text-cyan-400">{speed}</td>
                <td className="px-4 py-3 text-slate-300">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white">
        Tips for accurate results
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Test over a wired Ethernet connection where possible to remove Wi-Fi
          variability.
        </li>
        <li>Close background apps and downloads before testing.</li>
        <li>Run the test a few times and take the average.</li>
        <li>
          Test at different times of day — networks are often slower at peak
          evening hours.
        </li>
      </ul>

      <FaqSection items={guideFaqs} />
    </PageShell>
  );
}
