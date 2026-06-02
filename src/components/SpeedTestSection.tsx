'use client';

import dynamic from 'next/dynamic';

// Lazy-load the interactive test engine (framer-motion + gauge) on the client
// only, with a lightweight placeholder, to keep the initial payload small.
const SpeedTest = dynamic(() => import('./SpeedTest'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="h-56 w-56 animate-pulse rounded-full border-8 border-white/5" />
      <div className="h-10 w-40 animate-pulse rounded-full bg-white/10" />
    </div>
  ),
});

export default function SpeedTestSection() {
  return <SpeedTest />;
}
