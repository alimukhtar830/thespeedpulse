'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Speedometer from './Speedometer';
import StartButton from './StartButton';
import ResultCard from './ResultCard';
import NetworkInfoCard, { type NetworkInfo } from './NetworkInfoCard';
import { PHASE_LABELS, type TestPhase } from '@/lib/speedtest/types';
import { encodeResult } from '@/lib/speedtest/share';

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

// Common consumer plan tiers (Mbps). ISPs usually provision slightly above the
// real-world speed, so we map a measured speed to the nearest standard tier at
// or above ~90% of it. This is an ESTIMATE, clearly labelled in the UI.
const PLAN_TIERS = [2, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 300, 500, 750, 1000];
function estimatePlan(downloadMbps: number): number {
  const target = downloadMbps * 0.9;
  return PLAN_TIERS.find((t) => t >= target) ?? PLAN_TIERS[PLAN_TIERS.length - 1];
}

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
  const [shared, setShared] = useState(false);
  const [dataUsedMB, setDataUsedMB] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const running = !['idle', 'done', 'error'].includes(phase);

  const complete =
    results.download != null &&
    results.upload != null &&
    results.ping != null &&
    results.jitter != null;

  const shareResult = useCallback(async () => {
    if (
      results.download == null ||
      results.upload == null ||
      results.ping == null ||
      results.jitter == null
    )
      return;
    const token = encodeResult({
      d: results.download,
      u: results.upload,
      p: results.ping,
      j: results.jitter,
    });
    const url = `${window.location.origin}/result/${token}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My internet speed',
          text: `Download ${results.download} Mbps · Upload ${results.upload} Mbps`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user cancelled share or clipboard blocked — ignore */
    }
  }, [results]);

  const fetchNetworkInfo = useCallback(async () => {
    setNetLoading(true);
    try {
      const res = await fetch('/api/network-info', { cache: 'no-store' });
      if (res.ok) setNetInfo((await res.json()) as NetworkInfo);
    } catch {
      // Network info is non-critical; the test still runs without it.
    } finally {
      setNetLoading(false);
    }
  }, []);

  const start = useCallback(() => {
    if (running) return;

    setError(null);
    setResults(EMPTY);
    setGauge(0);
    setDataUsedMB(null);
    setPhase('finding-server');
    setGaugeUnit('Mbps');

    // Network info on the main thread (light); measurement runs in the worker.
    fetchNetworkInfo();

    // Run the measurement OFF the main thread so gauge animation/re-renders
    // can't starve the network read-loops (which would under-measure speed).
    const worker = new Worker(
      new URL('../lib/speedtest/worker.ts', import.meta.url),
    );
    workerRef.current = worker;

    // EMA to smooth the gauge during throughput phases.
    let smooth = 0;

    worker.onmessage = (e: MessageEvent) => {
      const m = e.data;
      switch (m.type) {
        case 'phase':
          setPhase(m.phase);
          if (m.phase === 'ping') {
            setGaugeUnit('ms');
            setGauge(0);
          } else {
            setGaugeUnit('Mbps');
            setGauge(0);
            smooth = 0;
          }
          break;
        case 'progress':
          if (m.metric === 'ping') {
            setGauge(m.value);
          } else {
            smooth = smooth === 0 ? m.value : smooth + 0.3 * (m.value - smooth);
            setGauge(smooth);
          }
          break;
        case 'result':
          setResults((r) => ({ ...r, [m.key]: m.value }));
          setGauge(m.value);
          break;
        case 'data':
          setDataUsedMB(m.bytes / (1024 * 1024));
          break;
        case 'done':
          setPhase('done');
          worker.terminate();
          workerRef.current = null;
          break;
        case 'error':
          setError(`${m.message} Please check your connection and try again.`);
          setPhase('error');
          worker.terminate();
          workerRef.current = null;
          break;
      }
    };

    worker.onerror = () => {
      setError('The test failed to start. Please try again.');
      setPhase('error');
      worker.terminate();
      workerRef.current = null;
    };

    // Brief, intentional UX beat on "Finding best server…" before measuring.
    setTimeout(() => worker.postMessage({ type: 'start' }), 600);
  }, [running, fetchNetworkInfo]);

  // Clean up the worker if the component unmounts mid-test.
  useEffect(() => {
    return () => workerRef.current?.terminate();
  }, []);

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
            ? 'Complete'
            : phase === 'finding-server'
              ? 'Connecting'
              : 'Ready';

  // When the test finishes, the dial resets to zero — the final figures are
  // shown in the result cards below.
  const gaugeValue = phase === 'done' ? 0 : gauge;
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

      <div className="flex flex-wrap items-center justify-center gap-3">
        <StartButton
          onClick={start}
          running={running}
          label={phase === 'done' || phase === 'error' ? 'Test Again' : 'Start Test'}
        />
        {phase === 'done' && complete && (
          <button
            type="button"
            onClick={shareResult}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:border-cyan-400/40 hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 12v8h16v-8M12 3v13m0-13l-4 4m4-4l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {shared ? 'Link copied!' : 'Share result'}
          </button>
        )}
      </div>

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

      {/* Test summary: data used + estimated plan (shown on completion) */}
      {phase === 'done' && (dataUsedMB !== null || results.download !== null) && (
        <div className="flex w-full flex-wrap justify-center gap-3 text-sm">
          {dataUsedMB !== null && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-slate-300">
              <span className="text-cyan-400">Data used</span>
              <span className="font-semibold text-white">
                {dataUsedMB >= 1024
                  ? `${(dataUsedMB / 1024).toFixed(2)} GB`
                  : `${dataUsedMB.toFixed(0)} MB`}
              </span>
            </span>
          )}
          {results.download !== null && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-slate-300">
              <span className="text-violet">Estimated plan</span>
              <span className="font-semibold text-white">
                ~{estimatePlan(results.download)} Mbps
              </span>
            </span>
          )}
        </div>
      )}

      {/* Network information */}
      <div className="w-full">
        <NetworkInfoCard info={netInfo} loading={netLoading} />
      </div>
    </div>
  );
}
