import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/apps`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/workflow`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
