/**
 * Speed-test Web Worker. Runs ping/download/upload OFF the main thread so the
 * gauge animation and React re-renders can't starve the network read-loops
 * (which would under-measure throughput). Posts phase changes, live progress,
 * per-metric results, and a final done/error message back to the UI.
 */
import { measurePing } from './ping';
import { measureDownload } from './download';
import { measureUpload } from './upload';

type InMsg = { type: 'start' };

const post = (msg: unknown) => (self as unknown as Worker).postMessage(msg);

self.onmessage = async (e: MessageEvent<InMsg>) => {
  if (e.data?.type !== 'start') return;

  try {
    // Ping + jitter
    post({ type: 'phase', phase: 'ping' });
    const ping = await measurePing({
      onSample: (ms) => post({ type: 'progress', metric: 'ping', value: ms }),
    });
    post({ type: 'result', key: 'ping', value: ping.ping });
    post({ type: 'result', key: 'jitter', value: ping.jitter });

    // Download
    post({ type: 'phase', phase: 'download' });
    const download = await measureDownload({
      onProgress: (m) => post({ type: 'progress', metric: 'download', value: m }),
    });
    post({ type: 'result', key: 'download', value: download.mbps });

    // Upload
    post({ type: 'phase', phase: 'upload' });
    const upload = await measureUpload({
      onProgress: (m) => post({ type: 'progress', metric: 'upload', value: m }),
    });
    post({ type: 'result', key: 'upload', value: upload.mbps });

    // Total data the test consumed (download + upload bytes on the wire).
    post({ type: 'data', bytes: download.bytes + upload.bytes });

    post({ type: 'done' });
  } catch (err) {
    post({
      type: 'error',
      message: err instanceof Error ? err.message : 'The test failed.',
    });
  }
};
