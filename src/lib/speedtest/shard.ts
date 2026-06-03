/**
 * Connection sharding helper.
 *
 * Browsers use a single HTTP/2 connection per origin, which is flow-control
 * limited over high-latency links (we measured ~3 Mbps for one connection vs
 * ~15+ for six). To get real parallelism we spread streams across subdomains
 * (s0., s1., …) — each a separate origin, hence a separate TCP/HTTP2 connection.
 * A wildcard domain (*.thespeedpulse.com) routes them all to this same app.
 *
 * Only shards when running on the production domain; otherwise returns ''
 * (same-origin) so previews/localhost still work.
 */
export function shardHost(i: number): string {
  try {
    const loc = (self as unknown as { location?: Location }).location;
    if (loc && loc.hostname.endsWith('thespeedpulse.com')) {
      return `${loc.protocol}//s${i}.thespeedpulse.com`;
    }
  } catch {
    /* no location (non-browser) */
  }
  return '';
}

/** Whether sharding is even possible in this environment. */
export function shardingAvailable(): boolean {
  return shardHost(0) !== '';
}
