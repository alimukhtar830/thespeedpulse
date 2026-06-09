import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { guideFaqs } from '@/content/faqs';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Internet Speed Guide — How Much Speed Do You Need?',
  description:
    'What download, upload, ping and jitter mean, how many Mbps you need for streaming, gaming and work, and how to read your speed-test results.',
  path: '/internet-speed-guide',
  type: 'article',
});

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
      breadcrumbs={[{ name: 'Internet Speed Guide' }]}
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

      <h2 className="text-2xl font-bold text-white">Speed you need by activity</h2>
      <p>
        Bandwidth requirements add up when activities happen at the same time.
        Here&apos;s what common tasks need — see the dedicated guides for detail:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <Link href="/speed-for-streaming" className="text-cyan-400 hover:underline">
            Streaming
          </Link>{' '}
          — 5–8 Mbps for HD, ~25 Mbps per 4K stream.
        </li>
        <li>
          <Link href="/speed-for-gaming" className="text-cyan-400 hover:underline">
            Gaming
          </Link>{' '}
          — only 10–25 Mbps, but low{' '}
          <Link href="/what-is-ping" className="text-cyan-400 hover:underline">
            ping
          </Link>{' '}
          matters most.
        </li>
        <li>
          <Link href="/speed-for-video-calls" className="text-cyan-400 hover:underline">
            Video calls
          </Link>{' '}
          — 3–5 Mbps upload per HD call; stable{' '}
          <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
            jitter
          </Link>{' '}
          is key.
        </li>
        <li>
          <Link href="/speed-for-working-from-home" className="text-cyan-400 hover:underline">
            Working from home
          </Link>{' '}
          — ~25 Mbps down / 5–10 Mbps up per person.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white">
        What affects your real-world speed
      </h2>
      <p>
        Your measured speed is often lower than your plan — that&apos;s normal.
        The biggest factors are{' '}
        <Link href="/wifi-vs-ethernet" className="text-cyan-400 hover:underline">
          Wi-Fi vs wired
        </Link>{' '}
        (distance and interference), the age of your router, the number of
        devices sharing the line, peak-time congestion, and how far you are from
        the test server. If your speed is well below your plan, work through{' '}
        <Link href="/why-is-my-internet-slow" className="text-cyan-400 hover:underline">
          why your internet is slow
        </Link>{' '}
        and{' '}
        <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
          how to improve it
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-white">Download vs upload vs latency</h2>
      <p>
        <Link href="/what-is-download-speed" className="text-cyan-400 hover:underline">
          Download
        </Link>{' '}
        affects how fast things load and stream;{' '}
        <Link href="/what-is-upload-speed" className="text-cyan-400 hover:underline">
          upload
        </Link>{' '}
        affects calls, backups and posting; and{' '}
        <Link href="/what-is-ping" className="text-cyan-400 hover:underline">
          ping
        </Link>{' '}
        /{' '}
        <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
          jitter
        </Link>{' '}
        determine responsiveness. A great connection is balanced across all four,
        not just high on download. Curious how yours compares to others? See{' '}
        <Link href="/performance" className="text-cyan-400 hover:underline">
          average speeds by country
        </Link>{' '}
        and{' '}
        <Link href="/isp" className="text-cyan-400 hover:underline">
          by ISP
        </Link>
        .
      </p>

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
        <li>
          Learn more about{' '}
          <Link href="/how-accurate-are-speed-tests" className="text-cyan-400 hover:underline">
            how accurate speed tests are
          </Link>
          .
        </li>
      </ul>

      <FaqSection items={guideFaqs} />
    </PageShell>
  );
}
