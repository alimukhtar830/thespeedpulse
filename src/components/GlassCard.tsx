'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Enable the scroll-reveal animation (on by default). */
  reveal?: boolean;
  /** Stagger delay for reveal, in seconds. */
  delay?: number;
}

/**
 * Reusable glassmorphism card with an optional scroll-reveal micro-animation.
 * Wraps content in the shared `.glass` utility defined in globals.css.
 */
export default function GlassCard({
  children,
  className = '',
  reveal = true,
  delay = 0,
}: GlassCardProps) {
  if (!reveal) {
    return <div className={`glass ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`glass ${className}`}
    >
      {children}
    </motion.div>
  );
}
