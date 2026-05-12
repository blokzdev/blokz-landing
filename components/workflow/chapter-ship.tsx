"use client";
import { motion } from "motion/react";
import {
  CheckCircle2,
  GitMerge,
  GitPullRequest,
  Rocket,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import type { ComponentType } from "react";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface Station {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const STATIONS: ReadonlyArray<Station> = [
  { id: "pr", label: "PR open", icon: GitPullRequest },
  { id: "review", label: "Review", icon: ShieldCheck },
  { id: "ci", label: "CI green", icon: CheckCircle2 },
  { id: "merge", label: "Merge", icon: GitMerge },
  { id: "deploy", label: "Deploy", icon: ServerCog },
  { id: "ship", label: "Shipped", icon: Rocket },
];

export function ChapterShip() {
  const reduced = useReducedMotion();
  const fired = useRef(false);
  const [stamped, setStamped] = useState(false);

  const handleStampEnter = async () => {
    if (reduced || fired.current) return;
    fired.current = true;
    setStamped(true);
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 90,
        spread: 72,
        startVelocity: 38,
        origin: { y: 0.55 },
        colors: ["#08D9D6", "#37F3FF", "#A78BFA", "#E8F1F8"],
        scalar: 0.9,
      });
    } catch {
      /* ignore — confetti is decorative */
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)]/70 p-6 ring-1 ring-white/[0.08] backdrop-blur-xl ring-inset">
        {/* Connecting line behind stations */}
        <div
          aria-hidden
          className="absolute top-1/2 right-6 left-6 h-px -translate-y-[18px] bg-gradient-to-r from-[var(--color-accent)]/0 via-[var(--color-accent)]/40 to-[var(--color-accent)]/0"
        />

        <ol className="relative grid grid-cols-6 items-start gap-2">
          {STATIONS.map((station, i) => {
            const Icon = station.icon;
            const isShip = station.id === "ship";
            return (
              <motion.li
                key={station.id}
                className="flex flex-col items-center gap-2 text-center"
                initial={reduced ? false : { opacity: 0, y: 8, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_OUT_EXPO,
                  delay: reduced ? 0 : i * 0.12,
                }}
                onViewportEnter={isShip ? handleStampEnter : undefined}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full ring-1 transition-colors ring-inset",
                    isShip
                      ? "bg-[var(--color-accent)] text-[var(--color-canvas)] ring-[var(--color-accent)]"
                      : "bg-[var(--color-canvas)]/60 text-[var(--color-accent)] ring-[var(--color-accent)]/40",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="font-mono text-[9px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase">
                  {station.label}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <motion.div
        className={cn(
          "flex items-center justify-between rounded-2xl bg-[var(--color-canvas)]/60 px-5 py-4 ring-1 transition-colors ring-inset",
          stamped ? "ring-[var(--color-accent)]/40" : "ring-white/[0.08]",
        )}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      >
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
            Status
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink)]">
            <span className="text-[var(--color-accent)]">{"●"}</span> Build hash{" "}
            <span className="font-mono text-[var(--color-ink-dim)]">a1b7df2</span> live in
            production.
          </p>
        </div>
        <motion.span
          aria-hidden
          className="rounded-md border border-[var(--color-accent)]/60 px-3 py-1 font-mono text-[11px] tracking-[0.24em] text-[var(--color-accent)] uppercase"
          animate={
            stamped && !reduced
              ? { rotate: [-8, 4, -2, 0], scale: [0.85, 1.08, 0.98, 1] }
              : undefined
          }
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          Shipped
        </motion.span>
      </motion.div>
    </div>
  );
}
