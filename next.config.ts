import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Skip TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Skip static page generation errors
  output: 'standalone', // or remove this line for default

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },

  // Webpack configuration for Firebase and Three.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    // For Three.js and 3D models
    config.module.rules.push({
      test: /\.(glb|gltf|obj|mtl)$/,
      type: 'asset/resource',
    });

    return config;
  },

  // Transpile packages if needed
  transpilePackages: ['three', '@thatopen/components', '@thatopen/fragments'],

  // Silence Turbopack warning
  turbopack: {},
};

export default nextConfig;
