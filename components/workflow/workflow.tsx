"use client";
import { motion } from "motion/react";
import { phases } from "@/content/workflow/phases";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useWorkflowPlatform } from "@/hooks/use-workflow-platform";
import { PhaseChapter } from "./phase-chapter";
import { PlatformTabs } from "./platform-tabs";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function Workflow() {
  const [platform, setPlatform] = useWorkflowPlatform("web");
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      {/* Sticky platform-tab bar under the global nav. */}
      <div className="sticky top-[64px] z-30 -mx-6 border-y border-white/[0.06] bg-[var(--color-canvas)]/85 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
            Building for
          </p>
          <PlatformTabs platform={platform} onChange={setPlatform} />
        </div>
      </div>

      {/* Screen-reader summary mirroring the visual chapters. */}
      <ol className="sr-only">
        {phases.map((p) => (
          <li key={p.id}>
            <strong>
              Phase {p.number}: {p.title}
            </strong>{" "}
            {p.summary}
          </li>
        ))}
      </ol>

      <motion.section
        className="px-6 py-32 sm:py-40"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-eyebrow text-[var(--color-accent)]">{"// How we ship"}</p>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl">
            <span className="text-display text-[var(--color-ink)]">Idea</span>
            <span className="text-[var(--color-ink-dim)]"> → </span>
            <span className="text-display text-[var(--color-ink)]">spec</span>
            <span className="text-[var(--color-ink-dim)]"> → </span>
            <span className="text-display text-[var(--color-accent)]">shipped.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[var(--color-ink-dim)] sm:text-lg">
            Five phases of our vibecoding workflow, threaded through one fictional product —{" "}
            <span className="text-[var(--color-ink)]">Blokz Receipt</span>, a receipt-style
            transaction explorer. Toggle the platform tab to see how each phase shifts when we build
            for the web, Android, Windows, or iOS.
          </p>
        </div>
      </motion.section>

      {phases.map((phase, i) => (
        <PhaseChapter key={phase.id} phase={phase} platform={platform} index={i} />
      ))}
    </div>
  );
}
