'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Speedometer from './Speedometer';
import StartButton from './StartButton';
import ResultCard from './ResultCard';
import NetworkInfoCard, { type NetworkInfo } from './NetworkInfoCard';
import { measurePing } from '@/lib/speedtest/ping';
import { measureDownload } from '@/lib/speedtest/download';
import { measureUpload } from '@/lib/speedtest/upload';
import { PHASE_LABELS, type TestPhase } from '@/lib/speedtest/types';

const DownloadIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UploadIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 21V9m0 0l-4 4m4-4l4 4M5 3h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PingIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h4l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const JitterIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h3l2-5 4 10 2-5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Results {
  download: number | null;
  upload: number | null;
  ping: number | null;
  jitter: number | null;
}

const EMPTY: Results = { download: null, upload: null, ping: null, jitter: null };

/**
 * Client orchestrator for the full speed-test flow:
 * finding-server → ping → download → upload → done. Drives the live gauge and
 * result cards, fetches network info, and handles errors gracefully.
 */
export default function SpeedTest() {
  const [phase, setPhase] = useState<TestPhase>('idle');
  const [gauge, setGauge] = useState(0);
  const [gaugeUnit, setGaugeUnit] = useState<'Mbps' | 'ms'>('Mbps');
  const [results, setResults] = useState<Results>(EMPTY);
  const [netInfo, setNetInfo] = useState<NetworkInfo | null>(null);
  const [netLoading, setNetLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const running = !['idle', 'done', 'error'].includes(phase);

  const fetchNetworkInfo = useCallback(async (signal: AbortSignal) => {
    setNetLoading(true);
    try {
      const res = await fetch('/api/network-info', { cache: 'no-store', signal });
      if (res.ok) setNetInfo((await res.json()) as NetworkInfo);
    } catch {
      // Network info is non-critical; the test still runs without it.
    } finally {
      setNetLoading(false);
    }
  }, []);

  const start = useCallback(async () => {
    if (running) return;
    const controller = new AbortController();
    abortRef.current = controller;
    const { signal } = controller;

    setError(null);
    setResults(EMPTY);
    setGauge(0);

    try {
      // 1) Finding best server + fetch network info in parallel.
      setPhase('finding-server');
      setGaugeUnit('Mbps');
      const netPromise = fetchNetworkInfo(signal);
      await new Promise((r) => setTimeout(r, 800)); // brief, intentional UX beat

      // 2) Ping + jitter.
      setPhase('ping');
      setGaugeUnit('ms');
      const ping = await measurePing({
        signal,
        onSample: (ms) => setGauge(ms),
      });
      setResults((r) => ({ ...r, ping: ping.ping, jitter: ping.jitter }));
      setGauge(ping.ping);

      // Exponential moving average smooths the inherently noisy instantaneous
      // samples so the gauge glides instead of jumping on every reading.
      const smoother = () => {
        let s = 0;
        return (mbps: number) => {
          s = s === 0 ? mbps : s + 0.3 * (mbps - s);
          setGauge(s);
        };
      };

      // 3) Download.
      setPhase('download');
      setGaugeUnit('Mbps');
      setGauge(0);
      const download = await measureDownload({
        signal,
        onProgress: smoother(),
      });
      setResults((r) => ({ ...r, download }));
      setGauge(download);

      // 4) Upload.
      setPhase('upload');
      setGauge(0);
      const upload = await measureUpload({
        signal,
        onProgress: smoother(),
      });
      setResults((r) => ({ ...r, upload }));
      setGauge(upload);

      await netPromise; // ensure network info finished before "done"
      setPhase('done');
    } catch (err) {
      if (signal.aborted) return; // user cancelled — silent
      setError(
        err instanceof Error
          ? `${err.message} Please check your connection and try again.`
          : 'The test failed. Please try again.',
      );
      setPhase('error');
    } finally {
      abortRef.current = null;
    }
  }, [running, fetchNetworkInfo]);

  const statusText =
    phase === 'error' ? (error ?? PHASE_LABELS.error) : PHASE_LABELS[phase];

  const gaugeCaption =
    phase === 'download'
      ? 'Download'
      : phase === 'upload'
        ? 'Upload'
        : phase === 'ping'
          ? 'Latency'
          : phase === 'done'
            ? 'Download'
            : phase === 'finding-server'
              ? 'Connecting'
              : 'Ready';

  // On completion show the download figure on the dial as the headline metric.
  const gaugeValue = phase === 'done' ? (results.download ?? 0) : gauge;
  const gaugeUnitDisplay = phase === 'done' ? 'Mbps' : gaugeUnit;

  return (
    <div className="flex flex-col items-center gap-8">
      <Speedometer
        value={gaugeValue}
        unit={gaugeUnitDisplay}
        caption={gaugeCaption}
        active={running}
      />

      {/* Status text */}
      <div className="flex min-h-[28px] items-center" role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={statusText}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={`text-center text-sm font-medium ${
              phase === 'error' ? 'text-rose-400' : 'text-slate-300'
            }`}
          >
            {statusText}
          </motion.p>
        </AnimatePresence>
      </div>

      <StartButton
        onClick={start}
        running={running}
        label={phase === 'done' || phase === 'error' ? 'Test Again' : 'Start Test'}
      />

      {/* Result cards */}
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <ResultCard
          label="Download"
          value={results.download}
          unit="Mbps"
          icon={DownloadIcon}
          accent="text-cyan-400"
          active={phase === 'download'}
          delay={0}
        />
        <ResultCard
          label="Upload"
          value={results.upload}
          unit="Mbps"
          icon={UploadIcon}
          accent="text-violet"
          active={phase === 'upload'}
          delay={0.05}
        />
        <ResultCard
          label="Ping"
          value={results.ping}
          unit="ms"
          icon={PingIcon}
          accent="text-emerald-400"
          active={phase === 'ping'}
          delay={0.1}
        />
        <ResultCard
          label="Jitter"
          value={results.jitter}
          unit="ms"
          icon={JitterIcon}
          accent="text-amber-400"
          active={phase === 'ping'}
          delay={0.15}
        />
      </div>

      {/* Network information */}
      <div className="w-full">
        <NetworkInfoCard info={netInfo} loading={netLoading} />
      </div>
    </div>
  );
}
