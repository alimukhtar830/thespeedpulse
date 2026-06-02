'use client';

import { motion } from 'framer-motion';

/** Home hero — heading, subheading and quick feature chips. */
export default function Hero() {
  const chips = [
    'Download',
    'Upload',
    'Ping',
    'Jitter',
    'IP & ISP',
    'Server location',
  ];

  return (
    <section className="container-page pt-12 text-center sm:pt-16">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-cyan-400"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
        No app needed · Free · Privacy-friendly
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
      >
        Test Your Internet Speed{' '}
        <span className="text-gradient">Instantly</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300"
      >
        Check your download speed, upload speed, ping, and jitter in seconds —
        plus your public IP, ISP, approximate location, and test server. Accurate,
        fast, and right in your browser.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        {chips.map((c) => (
          <li
            key={c}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400"
          >
            {c}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
