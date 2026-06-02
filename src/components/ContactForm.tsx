'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Accessible contact form that posts to the acknowledge-only API route. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Please check your details and try again.');
      form.reset();
      setStatus('success');
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400/50 focus:bg-white/[0.06]';

  return (
    <form onSubmit={handleSubmit} className="not-prose space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-slate-300">
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-slate-300">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-slate-300">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} placeholder="How can we help?" />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium text-emerald-400"
            >
              Thanks! Your message has been received.
            </motion.span>
          )}
          {status === 'error' && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium text-rose-400"
            >
              {errorMsg}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-slate-500">
        We use your details only to reply to your enquiry. See our{' '}
        <a href="/privacy-policy" className="text-cyan-400 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
