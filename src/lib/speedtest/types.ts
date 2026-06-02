/** Shared types for the speed-test engine and UI. */

export type TestPhase =
  | 'idle'
  | 'finding-server'
  | 'ping'
  | 'download'
  | 'upload'
  | 'done'
  | 'error';

export interface PingResult {
  /** Representative latency in milliseconds (median of samples). */
  ping: number;
  /** Variation between consecutive samples in milliseconds. */
  jitter: number;
  /** All raw RTT samples (ms), warm-up excluded. */
  samples: number[];
}

export interface SpeedResult {
  /** Final measured throughput in megabits per second. */
  mbps: number;
}

export interface SpeedTestResults {
  download: number | null; // Mbps
  upload: number | null; // Mbps
  ping: number | null; // ms
  jitter: number | null; // ms
}

/** Callback fired continuously during a test to drive the live gauge. */
export type ProgressCallback = (currentMbps: number) => void;

/** Human-readable status text per phase. */
export const PHASE_LABELS: Record<TestPhase, string> = {
  idle: 'Ready to test',
  'finding-server': 'Finding best server…',
  ping: 'Measuring latency…',
  download: 'Measuring download…',
  upload: 'Measuring upload…',
  done: 'Test complete',
  error: 'Something went wrong',
};
