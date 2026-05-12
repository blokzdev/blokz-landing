"use client";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface Message {
  speaker: "you" | "claude";
  body: string;
}

const MESSAGES: ReadonlyArray<Message> = [
  { speaker: "you", body: "What if a transaction receipt looked like a receipt?" },
  { speaker: "claude", body: "Interesting. Who would print one — and when?" },
  {
    speaker: "you",
    body: "Accountants reconciling crypto invoices. Founders defending grant spends.",
  },
  { speaker: "claude", body: "Got it. Mobile-first, then? Camera-friendly output?" },
  { speaker: "you", body: "Yes. One hash in, one printable receipt out." },
  { speaker: "claude", body: "Done. Want me to draft the PRD and the CLAUDE.md?" },
];

export function ChapterConceptualize() {
  const reduced = useReducedMotion();

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

      <ol className="flex flex-col gap-3 p-5">
        {MESSAGES.map((m, i) => (
          <motion.li
            key={i}
            className={cn("flex", m.speaker === "you" ? "justify-end" : "justify-start")}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: reduced ? 0 : i * 0.12 }}
          >
            <div
              className={cn(
                "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
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
