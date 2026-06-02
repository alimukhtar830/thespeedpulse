'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ResultCardProps {
  label: string;
  value: number | null;
  unit: string;
  icon: ReactNode;
  /** Highlight the card while its metric is the one being measured. */
  active?: boolean;
  accent?: string; // tailwind text color class for the icon
  delay?: number;
}

/** Compact glass card showing a single measured metric. */
export default function ResultCard({
  label,
  value,
  unit,
  icon,
  active = false,
  accent = 'text-cyan-400',
  delay = 0,
}: ResultCardProps) {
  const display =
    value === null ? '—' : value >= 100 ? value.toFixed(0) : value.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`glass glass-hover relative overflow-hidden p-5 ${
        active ? 'border-cyan-400/40 shadow-glow-cyan' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        <span className={accent} aria-hidden>
          {icon}
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold tabular-nums text-white">
          {display}
        </span>
        <span className="text-sm text-slate-400">{unit}</span>
      </div>
      {active && (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-0.5 bg-hero-gradient"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'left' }}
        />
      )}
    </motion.div>
  );
}
