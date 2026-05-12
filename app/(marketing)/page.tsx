import type { Metadata } from "next";
import { AppsPreview } from "@/components/apps/apps-preview";
import { Hero } from "@/components/hero/hero";
import { Manifesto } from "@/components/manifesto/manifesto";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <AppsPreview />
    </>
  );
}
