import type { Metadata } from "next";
import { AppsPreview } from "@/components/apps/apps-preview";
import { Hero } from "@/components/hero/hero";
import { NowNextBand } from "@/components/home/now-next-band";
import { Manifesto } from "@/components/manifesto/manifesto";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

export default function HomePage() {
  return (
    <>
      <Hero />
      <NowNextBand />
      <Manifesto />
      <AppsPreview />
    </>
  );
}
