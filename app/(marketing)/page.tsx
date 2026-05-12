import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

export default function HomePage() {
  return <Hero />;
}
