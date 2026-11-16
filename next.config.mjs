/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
  trailingSlash: true,
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  async redirects() {
    return [
      { source: "/pro", destination: "/pricing/", permanent: true },
      { source: "/partnership", destination: "/", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.focusmode.app" }],
        destination: "https://focusmode.app/:path*",
        permanent: true,
      },
    ];
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

export default nextConfig;
