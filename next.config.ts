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
  // Permanent redirects from the pre-pivot IA. The directory used to live at
  // /tools (now /) and the Blokz portfolio used to live at /apps + /apps/[slug]
  // (now consolidated into /about + /portfolio/[slug]). Permanent so the old
  // URLs preserve SEO authority across the rename.
  async redirects() {
    return [
      { source: "/tools", destination: "/", permanent: true },
      { source: "/apps", destination: "/about", permanent: true },
      { source: "/apps/:slug", destination: "/portfolio/:slug", permanent: true },
      // /portfolio namespace root has no listing of its own (the portfolio
      // section lives inside /about). Non-permanent so we can restore a
      // dedicated listing later without an SEO penalty.
      { source: "/portfolio", destination: "/about", permanent: false },
    ];
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
