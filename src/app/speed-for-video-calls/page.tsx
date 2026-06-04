import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Internet Speed for Video Calls (Zoom, Teams, Meet)',
  description:
    'How much internet speed you need for video calls on Zoom, Teams, Google Meet and WhatsApp — upload requirements, why jitter matters, and how to fix choppy calls.',
  path: '/speed-for-video-calls',
  type: 'article',
});

const rows = [
  ['1:1 HD call', '3–4 Mbps up & down'],
  ['Group HD call', '4–8 Mbps up & down'],
  ['1080p / large meeting', '8–10 Mbps up & down'],
  ['Screen sharing', '+2–3 Mbps'],
];

const faqs = [
  {
    question: 'Why are my video calls choppy on fast internet?',
    answer:
      'Choppy calls are usually caused by high jitter or weak upload, not download speed. Test your upload and jitter, and prefer a wired connection.',
  },
  {
    question: 'How much upload speed do I need for video calls?',
    answer:
      'A stable 3–5 Mbps upload handles HD one-to-one calls. Group calls and screen sharing benefit from 8–10 Mbps upload.',
  },
  {
    question: 'Does video calling use more download or upload?',
    answer:
      'Roughly equal — you send your video (upload) and receive others (download). Upload is often the weaker link on home plans, so it matters most.',
  },
];

export default function VideoCallsPage() {
  return (
    <PageShell
      eyebrow="Use case"
      title="Internet Speed for Video Calls"
      intro="Smooth Zoom/Teams/Meet calls depend on upload speed and low jitter — not just download."
      breadcrumbs={[{ name: 'Speed for Video Calls' }]}
    >
      <p>
        Video calls are two-way, so your{' '}
        <Link href="/what-is-upload-speed" className="text-cyan-400 hover:underline">
          upload speed
        </Link>{' '}
        matters as much as download — and it&apos;s usually the weaker side of a
        home connection. Stable, low{' '}
        <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
          jitter
        </Link>{' '}
        is what keeps audio and video from freezing.
      </p>

      <div className="not-prose overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Call type</th>
              <th className="px-4 py-3 font-semibold">Recommended</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([t, s], i) => (
              <tr key={t} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-3 text-slate-300">{t}</td>
                <td className="px-4 py-3 font-medium text-cyan-400">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white">Fix choppy calls</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Test your upload and jitter — <Link href="/" className="text-cyan-400 hover:underline">run a test</Link>.</li>
        <li>Use Ethernet or sit close to the router.</li>
        <li>Close uploads/backups running in the background.</li>
        <li>Turn off HD if your upload is limited.</li>
      </ul>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
