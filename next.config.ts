import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: ["https://keiran.live/*"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
