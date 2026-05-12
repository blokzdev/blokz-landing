import type { Metadata } from "next";
import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppsBrowser } from "@/components/apps/apps-browser";
import { ProjectGrid } from "@/components/apps/project-grid";
import { GlowOrb } from "@/components/effects/glow-orb";
import { JsonLd } from "@/components/seo/json-ld";
import { listProjects } from "@/lib/projects";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { brand } from "@/data/brand";

export const metadata: Metadata = buildMetadata({
  title: "Apps",
  description:
    "Production blockchain explorers, web3 utilities, and open-source tooling shipped by Blokz Development Co.",
  path: "/apps",
});

export default function AppsPage() {
  const all = listProjects();
  const total = all.length;
  const live = all.filter((p) => p.status === "live").length;

  return (
    <div className="relative overflow-hidden px-6 pt-32 pb-32 sm:pt-40">
      <GlowOrb
        className="-top-32 left-1/2 -translate-x-1/2"
        size={720}
        color="var(--color-accent)"
        opacity={0.08}
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl">
          <p className="text-eyebrow text-[var(--color-accent)]">Apps · Repos · Tools</p>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl">
            <span className="text-display text-[var(--color-ink)]">
              Everything we&apos;ve shipped.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[var(--color-ink-dim)] sm:text-lg">
            {live} live, {total - live} on the way. Blockchain explorers, web3 utilities, and the
            open-source tooling we use to ship them — all built end-to-end with Claude Code.
          </p>
        </header>

        <Suspense fallback={<ProjectGrid projects={all} />}>
          <NuqsAdapter>
            <AppsBrowser projects={all} />
          </NuqsAdapter>
        </Suspense>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${brand.name} — Apps`,
          url: `${siteUrl}/apps`,
          description: metadata.description ?? undefined,
          hasPart: all.map((p) => ({
            "@type": "SoftwareApplication",
            name: p.name,
            url: `${siteUrl}/apps/${p.slug}`,
          })),
        }}
      />
    </div>
  );
}
