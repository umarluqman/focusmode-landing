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
};

export default withNextVideo(nextConfig);
