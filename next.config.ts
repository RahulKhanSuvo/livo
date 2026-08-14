import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Set your desired limit (e.g., '10mb', '20mb', '50mb')
    },
  },
};

export default nextConfig;
