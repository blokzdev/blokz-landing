"use client";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { WorkflowProduct } from "@/types/workflow";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface Message {
  speaker: "you" | "claude";
  body: string;
}

const MESSAGES: Record<WorkflowProduct, ReadonlyArray<Message>> = {
  brief: [
    {
      speaker: "you",
      body: "What if you could paste an arxiv link and walk away with a printable digest?",
    },
    { speaker: "claude", body: "Interesting. Who reads it — researchers, PMs, indie builders?" },
    { speaker: "you", body: "All three. Builders tracking AI capability shifts, mostly." },
    {
      speaker: "claude",
      body: "Got it. Web-first then? Five-section structure — claims, methods, baselines, limits, takeaway?",
    },
    { speaker: "you", body: "Yes. Plus a 'why it matters' angle from a user-supplied focus area." },
    { speaker: "claude", body: "Done. Want me to draft the PRD and the CLAUDE.md?" },
  ],
  forge: [
    { speaker: "you", body: "What if every Claude feature shipped behind a generated eval gate?" },
    {
      speaker: "claude",
      body: "From the spec section directly? What's the output — a Vitest suite, or something custom?",
    },
    { speaker: "you", body: "Vitest + a golden set + a GitHub Action. Runnable end-to-end." },
    { speaker: "claude", body: "Three eval kinds: exact-match, rubric-score, human-review?" },
    { speaker: "you", body: "Yes. Authors pick the kind per case. CLI first, dashboard second." },
    { speaker: "claude", body: "Done. Want me to draft the PRD and the CLAUDE.md?" },
  ],
  memo: [
    {
      speaker: "you",
      body: "What if meeting capture ran entirely on the device — three small models cooperating?",
    },
    {
      speaker: "claude",
      body: "Transcribe, summarise, extract action items — all local? What's the latency budget?",
    },
    {
      speaker: "you",
      body: "Sub-5s after meeting end, on a 30-minute clip. iPhone 14 Pro target.",
    },
    { speaker: "claude", body: "Sync? Optional, self-hosted, end-to-end encrypted?" },
    {
      speaker: "you",
      body: "Exactly. Nothing leaves the device unless the user explicitly enrolls a relay.",
    },
    { speaker: "claude", body: "Done. Want me to draft the PRD and the CLAUDE.md?" },
  ],
};

interface Props {
  product: WorkflowProduct;
}

export function ChapterConceptualize({ product }: Readonly<Props>) {
  const reduced = useReducedMotion();
  const messages = MESSAGES[product];

  return (
    <div className="overflow-hidden rounded-2xl bg-[var(--color-surface)]/70 ring-1 ring-white/[0.08] backdrop-blur-xl ring-inset">
      <header className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <p className="ml-2 font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
          claude.ai/code · session
        </p>
      </header>

      <ol className="flex flex-col gap-3 p-4 sm:p-5">
        {messages.map((m, i) => (
          <motion.li
            key={`${product}-${i}`}
            className={cn("flex", m.speaker === "you" ? "justify-end" : "justify-start")}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: reduced ? 0 : i * 0.12 }}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[78%]",
                m.speaker === "you"
                  ? "bg-[var(--color-accent)]/[0.14] text-[var(--color-ink)] ring-1 ring-[var(--color-accent)]/30 ring-inset"
                  : "bg-white/[0.04] text-[var(--color-ink)] ring-1 ring-white/[0.08] ring-inset",
              )}
            >
              <p className="mb-0.5 font-mono text-[9px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
                {m.speaker === "you" ? "you" : "claude"}
              </p>
              {m.body}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
