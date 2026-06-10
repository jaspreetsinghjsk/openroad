/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb"
    }
  },
  output: "standalone",
  poweredByHeader: false
};

export default nextConfig;
