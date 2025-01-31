import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for Amplify deployment
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tapfiliate.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  optimizeFonts: true,
  output: "standalone",
  trailingSlash: true, // Recommended for Amplify routing
  experimental: {
    esmExternals: "loose", // Required for Lambda compatibility
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, stripe-signature',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/webhook',
          destination: '/api/webhook',
          has: [
            {
              type: 'header',
              key: 'stripe-signature',
            },
          ],
        },
      ],
    };
  },
};

export default withNextVideo(nextConfig);
