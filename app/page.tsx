import type { Metadata } from "next";
import { GlowOrb } from "@/components/effects/glow-orb";
import { brand } from "@/data/brand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 pt-32 pb-24">
      <GlowOrb
        className="left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
        size={720}
        opacity={0.18}
      />
      <GlowOrb
        className="bottom-0 right-0 translate-x-1/3 translate-y-1/3"
        size={520}
        color="var(--color-violet)"
        opacity={0.12}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-eyebrow text-[var(--color-accent)]">{brand.headline.eyebrow}</p>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl">
          <span className="text-display text-[var(--color-ink)]">{brand.headline.title}</span>{" "}
          <span className="text-display text-[var(--color-accent)]">
            {brand.headline.titleAccent}
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base text-[var(--color-ink-dim)] sm:text-lg">
          {brand.headline.sub}
        </p>

        <p className="mt-16 inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-dim)] ring-1 ring-inset ring-white/[0.08]">
          <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
          v2 scaffold landed — hero, manifesto, apps showcase, workflow scrolly inbound
        </p>
      </div>
    </div>
  );
}
