'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion';

// Non-linear scale: equal angular spacing between these marks so both slow
// (single-digit) and gigabit connections are readable on the same dial.
const MARKS = [0, 1, 5, 10, 25, 50, 100, 250, 500, 1000] as const;
const SWEEP = 270; // total arc degrees
const START_ANGLE = -135; // min at lower-left, max at lower-right

// Geometry (viewBox coordinate space).
const SIZE = 320;
const CX = 160;
const CY = 160;
const R = 128;

/** Map a Mbps value to a 0..1 fraction along the non-linear scale. */
function valueToFraction(v: number): number {
  if (v <= 0) return 0;
  const last = MARKS[MARKS.length - 1];
  if (v >= last) return 1;
  for (let i = 0; i < MARKS.length - 1; i++) {
    if (v <= MARKS[i + 1]) {
      const seg = (v - MARKS[i]) / (MARKS[i + 1] - MARKS[i]);
      return (i + seg) / (MARKS.length - 1);
    }
  }
  return 1;
}

/** Angle 0 = top, increasing clockwise. */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/**
 * Build an arc path drawn from `startAngle` to `endAngle` in the clockwise
 * (increasing-angle) direction, so a stroke-dash fills from the minimum end.
 */
function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polar(cx, cy, r, startAngle);
  const end = polar(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

interface SpeedometerProps {
  /** Current value to point at (Mbps). */
  value: number;
  /** Unit label shown under the number. */
  unit?: string;
  /** Small caption above the number (e.g. the active phase). */
  caption?: string;
  /** Whether a test is actively running (drives the pulsing glow). */
  active?: boolean;
}

export default function Speedometer({
  value,
  unit = 'Mbps',
  caption = 'Ready',
  active = false,
}: SpeedometerProps) {
  const trackPath = describeArc(CX, CY, R, START_ANGLE, START_ANGLE + SWEEP);

  // Spring tuned for smooth, low-overshoot motion (avoids needle wobble).
  const springCfg = { stiffness: 70, damping: 20, mass: 0.7 };

  // --- Needle rotation (spring-eased) ---
  const targetAngle = START_ANGLE + valueToFraction(value) * SWEEP;
  const angle = useSpring(START_ANGLE, springCfg);
  useEffect(() => {
    angle.set(targetAngle);
  }, [targetAngle, angle]);

  // --- Progress arc length (fraction of the track) ---
  const fraction = useSpring(0, springCfg);
  useEffect(() => {
    fraction.set(valueToFraction(value));
  }, [value, fraction]);
  // Stroke-dashoffset drives the visible portion of the gradient arc.
  const ARC_LEN = (SWEEP / 360) * 2 * Math.PI * R;
  const dashOffset = useTransform(fraction, (f) => ARC_LEN * (1 - f));

  // --- Animated count-up number ---
  const display = useMotionValue(0);
  const text = useTransform(display, (v) =>
    v >= 100 ? v.toFixed(0) : v.toFixed(1),
  );
  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.35,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [value, display]);

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE - 40}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`Speedometer showing ${value.toFixed(1)} ${unit}`}
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={18}
          strokeLinecap="round"
        />

        {/* Animated progress arc (glow via cheap GPU drop-shadow) */}
        <motion.path
          d={trackPath}
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={ARC_LEN}
          style={{
            strokeDashoffset: dashOffset,
            filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.55))',
          }}
        />

        {/* Tick marks + labels */}
        {MARKS.map((mark, i) => {
          const tickAngle = START_ANGLE + (i / (MARKS.length - 1)) * SWEEP;
          const outer = polar(CX, CY, R - 20, tickAngle);
          const inner = polar(CX, CY, R - 28, tickAngle);
          const labelPos = polar(CX, CY, R - 42, tickAngle);
          return (
            <g key={mark}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                fill="rgba(255,255,255,0.75)"
                fontSize={11}
                fontWeight={600}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {mark}
              </text>
            </g>
          );
        })}

        {/* Needle — a slim tapered polygon whose bbox bottom-center sits on the
            hub. Rotating about originX:0.5/originY:1 (bbox-relative) is robust
            when the SVG is responsively scaled, unlike a pixel transform-origin. */}
        <motion.polygon
          points={`${CX},${CY - R + 24} ${CX - 4},${CY} ${CX + 4},${CY}`}
          fill="url(#needleGradient)"
          style={{
            rotate: angle,
            originX: 0.5,
            originY: 1,
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))',
          }}
        />
        {/* Hub */}
        <circle cx={CX} cy={CY} r={12} fill="#0a0e1f" stroke="#22d3ee" strokeWidth={2.5} />
        <circle cx={CX} cy={CY} r={5} fill="#22d3ee" style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.8))' }} />
      </svg>

      {/* Center readout (HTML overlay for crisp typography). Stacked + sized to
          sit in the dial's open lower wedge, clear of the side tick labels. */}
      <div className="pointer-events-none absolute inset-x-0 top-[57%] flex flex-col items-center">
        <span
          className={`text-[10px] uppercase tracking-[0.2em] sm:text-xs ${
            active ? 'text-cyan-400 animate-pulse-glow' : 'text-slate-400'
          }`}
        >
          {caption}
        </span>
        <motion.span className="text-4xl font-bold leading-none tabular-nums text-white sm:text-5xl">
          {text}
        </motion.span>
        <span className="mt-0.5 text-xs font-medium text-slate-400 sm:text-sm">
          {unit}
        </span>
      </div>
    </div>
  );
}
