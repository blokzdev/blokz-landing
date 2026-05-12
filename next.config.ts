import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "github-dark-default",
          keepBackground: false,
          defaultLang: { block: "txt", inline: "txt" },
        },
      ],
    ],
  },
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

export default withBundleAnalyzer(withMDX(nextConfig));
