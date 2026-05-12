"use client";
import { motion } from "motion/react";
import { FileText, ListChecks, Workflow as WorkflowIcon } from "lucide-react";
import type { ComponentType } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface DocTile {
  slug: string;
  title: string;
  kind: "claude" | "prd" | "spec";
  sections: ReadonlyArray<string>;
}

const TILES: ReadonlyArray<DocTile> = [
  {
    slug: "claude-md-example",
    title: "CLAUDE.md",
    kind: "claude",
    sections: ["Overview", "Stack table", "Folder map", "Conventions", "Agent guardrails"],
  },
  {
    slug: "prd-example",
    title: "PRD",
    kind: "prd",
    sections: [
      "Problem statement",
      "Target user",
      "Hypothesis + metric",
      "MVP scope",
      "Distribution",
    ],
  },
  {
    slug: "spec-example",
    title: "Tech spec",
    kind: "spec",
    sections: ["Data shapes", "API surface", "State", "Errors", "Tests", "Rollout"],
  },
];

const ICONS: Record<DocTile["kind"], ComponentType<{ className?: string }>> = {
  claude: FileText,
  prd: ListChecks,
  spec: WorkflowIcon,
};

export function ChapterSpec() {
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {TILES.map((tile, i) => {
        const Icon = ICONS[tile.kind];
        return (
          <motion.div
            key={tile.slug}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: reduced ? 0 : i * 0.1 }}
          >
            <Link
              href={`/workflow/artifacts/${tile.slug}`}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl bg-[var(--color-surface)]/70 p-5 ring-1 ring-white/[0.08] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ring-inset hover:-translate-y-1 hover:bg-[var(--color-surface)]/90 hover:ring-[var(--color-accent)]/30 focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none"
            >
              <div className="flex items-start justify-between">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                <span className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
                  Artifact
                </span>
              </div>
              <h4 className="font-mono text-sm tracking-[0.04em] text-[var(--color-ink)] uppercase">
                {tile.title}
              </h4>
              <ul className="flex flex-col gap-1.5 text-xs text-[var(--color-ink-dim)]">
                {tile.sections.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span aria-hidden className="block h-px w-3 bg-[var(--color-ink-dim)]/40" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-auto font-mono text-[10px] tracking-[0.08em] text-[var(--color-accent)]/0 uppercase transition-colors group-hover:text-[var(--color-accent)]">
                Open artifact →
              </p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
