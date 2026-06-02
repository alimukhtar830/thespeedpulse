'use client';

import { motion } from 'framer-motion';

interface StartButtonProps {
  onClick: () => void;
  running: boolean;
  label?: string;
}

/** Primary call-to-action button with hover/tap micro-animations. */
export default function StartButton({
  onClick,
  running,
  label,
}: StartButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: running ? 1 : 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="btn-primary text-base"
      aria-live="polite"
    >
      {running ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Testing…
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
          {label ?? 'Start Test'}
        </>
      )}
    </motion.button>
  );
}
