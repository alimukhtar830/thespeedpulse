import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { improveFaqs } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'How to Improve Your Internet Speed (Fix Slow Wi-Fi)',
  description:
    'Practical, proven steps to fix slow internet and get faster Wi-Fi — from router placement and bands to wired connections and when to call your ISP.',
  alternates: { canonical: '/how-to-improve-internet-speed' },
};

const tips = [
  ['Test wired vs Wi-Fi', 'Plug a device into the router with Ethernet and test. If wired is much faster, the bottleneck is your Wi-Fi, not your plan.'],
  ['Reposition your router', 'Place it central, elevated, and out in the open — away from walls, metal, and microwaves. Distance and obstacles kill Wi-Fi.'],
  ['Use the 5 GHz band', '5 GHz is faster over short ranges; 2.4 GHz reaches further but is slower and more congested. Connect close devices to 5 GHz.'],
  ['Restart and update', 'Reboot the router, and keep its firmware updated. This alone resolves many slowdowns.'],
  ['Cut the clutter', 'Pause big background downloads and disconnect idle devices that quietly consume bandwidth.'],
  ['Consider mesh / extenders', 'For larger homes, a mesh system removes dead zones far better than a single router.'],
];

export default function ImproveSpeedPage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="How to Improve Your Internet Speed"
      intro="Simple, proven fixes for slow internet and weak Wi-Fi — most take just a few minutes."
      breadcrumbs={[{ name: 'How to Improve Internet Speed' }]}
    >
      <p>
        Before changing anything,{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          run a speed test
        </Link>{' '}
        to get a baseline. Then work through these steps and re-test to see what
        helped.
      </p>

      <div className="not-prose space-y-3">
        {tips.map(([title, body], i) => (
          <div
            key={title}
            className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-hero-gradient text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-300">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white">When it's not your Wi-Fi</h2>
      <p>
        If a wired test still falls well short of your plan, the issue is likely
        the line or provider. Compare your result against the{' '}
        <Link href="/performance" className="text-cyan-400 hover:underline">
          typical speed for your country
        </Link>
        , confirm what you're paying for, and contact your ISP with your test
        results in hand. Not sure how much you need?{' '}
        <Link href="/how-much-speed-do-i-need" className="text-cyan-400 hover:underline">
          See our speed requirements guide
        </Link>
        .
      </p>

      <FaqSection items={improveFaqs} />
    </PageShell>
  );
}
