/**
 * Reserved ad placement container.
 *
 * Renders a labeled, fixed-height box so ads do NOT cause layout shift (CLS)
 * once enabled. To activate Google AdSense later:
 *   1. Add the AdSense <script> to src/app/layout.tsx (in <head> via next/script).
 *   2. Replace the placeholder below with an <ins className="adsbygoogle" ... />
 *      block and push it with (adsbygoogle = window.adsbygoogle || []).push({}).
 *
 * The component is intentionally framework-agnostic and renders nothing
 * intrusive — just reserved space — to keep UX clean.
 */

interface AdSlotProps {
  /** Tailwind height utility for the reserved area (defaults to a leaderboard). */
  className?: string;
  /** Accessible/visible label for the placeholder. */
  label?: string;
}

export default function AdSlot({
  className = 'min-h-[120px]',
  label = 'Advertisement',
}: AdSlotProps) {
  return (
    <aside
      aria-label="Advertisement placeholder"
      className={`flex w-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] ${className}`}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-slate-600">
        {label}
      </span>
      {/* AdSense <ins> goes here when enabled. */}
    </aside>
  );
}
