import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // AVIF encoder can emit a 0-byte buffer on Next 16/Turbopack, which makes
    // the image LRU cache throw "calculateSize returned 0". Restrict to WebP
    // so optimization still runs but the failing path is avoided.
    formats: ['image/webp'],
    // remotePatterns is the recommended modern approach for Next.js
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Set your desired limit (e.g., '10mb', '20mb', '50mb')
    },
  },
};

export default nextConfig;
