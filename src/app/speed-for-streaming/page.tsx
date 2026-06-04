import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Internet Speed for Streaming (Netflix, YouTube, 4K)',
  description:
    'How much internet speed you need for streaming: SD, HD and 4K requirements per service, how many streams your plan supports, and how to stop buffering.',
  path: '/speed-for-streaming',
  type: 'article',
});

const rows = [
  ['SD (480p)', '3 Mbps'],
  ['HD (720p–1080p)', '5–8 Mbps'],
  ['4K Ultra HD', '25 Mbps'],
  ['Netflix 4K (recommended)', '15–25 Mbps'],
  ['YouTube 4K', '20 Mbps'],
];

const faqs = [
  {
    question: 'How much speed do I need for 4K streaming?',
    answer:
      'About 25 Mbps per 4K stream. For two simultaneous 4K streams plus other usage, a 100 Mbps plan is comfortable.',
  },
  {
    question: 'Why does my stream keep buffering on fast internet?',
    answer:
      'Buffering is often Wi-Fi, not raw speed — distance, interference, or too many devices. Test wired, and check ping/jitter, not just download.',
  },
  {
    question: 'Does streaming use upload speed?',
    answer:
      'Watching uses download. Only broadcasting/streaming out (e.g. Twitch) uses meaningful upload — typically 5–10 Mbps for HD.',
  },
];

export default function StreamingPage() {
  return (
    <PageShell
      eyebrow="Use case"
      title="Internet Speed for Streaming"
      intro="What you actually need for smooth Netflix, YouTube and 4K — per quality level and per stream."
      breadcrumbs={[{ name: 'Speed for Streaming' }]}
    >
      <p>
        Streaming is the most common reason people test their connection. The
        good news: even 4K needs less than most plans provide — buffering is
        usually a Wi-Fi or congestion problem, not a speed one.
      </p>

      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Quality</th>
              <th className="px-4 py-3 font-semibold">Recommended speed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([q, s], i) => (
              <tr key={q} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-3 text-slate-300">{q}</td>
                <td className="px-4 py-3 font-medium text-cyan-400">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Multiply by the number of simultaneous streams in your home. Three 4K TVs
        at once want ~75 Mbps just for video. Not sure what you have?{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          Run a speed test
        </Link>{' '}
        or read{' '}
        <Link href="/how-much-speed-do-i-need" className="text-cyan-400 hover:underline">
          how much speed do I need
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-white">Stop buffering</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Connect the TV/streaming box by Ethernet where possible.</li>
        <li>Lower playback quality during peak hours if needed.</li>
        <li>
          Fix the underlying connection with our{' '}
          <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
            speed improvement guide
          </Link>
          .
        </li>
      </ul>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
