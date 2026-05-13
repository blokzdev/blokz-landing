import type { Metadata } from "next";
import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { GlowOrb } from "@/components/effects/glow-orb";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolGrid } from "@/components/tools/tool-grid";
import { ToolsBrowser } from "@/components/tools/tools-browser";
import { brand } from "@/data/brand";
import { tools as allTools } from "@/data/tools";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tools",
  description:
    "A curated list of AI models, IDEs, agent surfaces, MCP servers, and infra that the Blokz studio uses, recommends, or is tracking.",
  path: "/tools",
});

export default function ToolsPage() {
  const total = allTools.length;
  const inUse = allTools.filter((t) => t.stance === "we-use").length;

  return (
    <div className="relative overflow-hidden px-6 pt-32 pb-32 sm:pt-40">
      <GlowOrb
        className="-top-32 left-1/2 -translate-x-1/2"
        size={720}
        color="var(--color-accent)"
        opacity={0.07}
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl">
          <p className="text-eyebrow text-[var(--color-accent)]">Tools we use</p>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl">
            <span className="text-display text-[var(--color-ink)]">Our AI stack,</span>{" "}
            <span className="text-display text-[var(--color-accent)]">curated.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[var(--color-ink-dim)] sm:text-lg">
            {inUse} live in our daily workflow, {total - inUse} we recommend or are tracking. A
            running list of AI models, IDEs, agent surfaces, MCP servers, and infra the Blokz studio
            reaches for — with a note on what we actually do with each.
          </p>
        </header>

        <Suspense fallback={<ToolGrid tools={allTools} />}>
          <NuqsAdapter>
            <ToolsBrowser tools={allTools} />
          </NuqsAdapter>
        </Suspense>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${brand.name} — Tools`,
          url: `${siteUrl}/tools`,
          description: metadata.description ?? undefined,
          hasPart: allTools.map((t) => ({
            "@type": "SoftwareApplication",
            name: t.name,
            url: t.links.find((l) => l.primary)?.url ?? t.links[0]?.url,
          })),
        }}
      />
    </div>
  );
}
