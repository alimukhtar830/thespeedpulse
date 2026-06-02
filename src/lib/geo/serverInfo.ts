import { serverConfig } from '@/lib/site';

/**
 * The speed test runs against this app's own API routes, so the "test server"
 * is this deployment. Its location is configured (per region) rather than
 * detected. Override via NEXT_PUBLIC_SERVER_* env vars.
 */
export function getServerInfo() {
  return {
    name: serverConfig.name,
    city: serverConfig.city,
    country: serverConfig.country,
  };
}
