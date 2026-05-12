import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.glitch.global" },
      { protocol: "https", hostname: "cdn.glitch.me" },
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
