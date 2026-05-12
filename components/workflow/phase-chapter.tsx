"use client";
import { AnimatePresence, motion } from "motion/react";
import type { Phase, WorkflowPlatform } from "@/types/workflow";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface Props {
  phase: Phase;
  platform: WorkflowPlatform;
  index: number;
}

export function PhaseChapter({ phase, platform, index }: Readonly<Props>) {
  const reduced = useReducedMotion();
  const note = phase.platformNotes[platform];
  const isEven = index % 2 === 0;

  return (
    <section
      id={`phase-${phase.id}`}
      aria-labelledby={`phase-${phase.id}-title`}
      className="relative border-t border-white/[0.06] px-6 py-32 sm:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <motion.header
          className={cn(
            "relative flex flex-col lg:sticky lg:top-32 lg:self-start",
            !isEven && "lg:order-2",
          )}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <span
            aria-hidden
            className="text-display text-7xl text-[var(--color-accent)]/30 sm:text-8xl lg:text-[10rem]"
          >
            {phase.number}
          </span>
          <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
            Phase {phase.number}
          </p>
          <h2 id={`phase-${phase.id}-title`} className="mt-3 text-3xl sm:text-4xl md:text-5xl">
            <span className="text-display text-[var(--color-ink)]">{phase.title}</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-ink-dim)]">
            {phase.summary}
          </p>
        </motion.header>

        <div className={cn("flex flex-col gap-5", !isEven && "lg:order-1")}>
          <ol className="grid gap-4">
            {phase.beats.map((beat, i) => (
              <motion.li
                key={beat.id}
                className="glass rounded-2xl p-6"
                initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.6,
                  ease: EASE_OUT_EXPO,
                  delay: reduced ? 0 : i * 0.08,
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-accent)] uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-[var(--color-ink)]">{beat.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-dim)]">
                  {beat.body}
                </p>
              </motion.li>
            ))}
          </ol>

          <motion.div
            className="mt-2 rounded-2xl bg-[var(--color-surface)]/60 p-6 ring-1 ring-white/[0.08] backdrop-blur-xl ring-inset"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.2 }}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
              Platform note
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={platform}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              >
                <h4 className="mt-3 text-base font-medium text-[var(--color-ink)]">{note.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-dim)]">
                  {note.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
