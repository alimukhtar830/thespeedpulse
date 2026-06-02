/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // `maxmind` reads a local .mmdb file from disk at runtime — keep it external to the
    // server bundle so file/native access works on the Node.js runtime (Next 14 key).
    serverComponentsExternalPackages: ['maxmind'],
    // Bundle the local geo databases into the network-info serverless function so
    // ISP/location resolution works after deploy (only matters if you add a .mmdb).
    outputFileTracingIncludes: {
      '/api/network-info': ['./data/**/*.mmdb'],
    },
  },
  eslint: {
    // Lint manually with `npm run lint`; don't fail production builds on lint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
