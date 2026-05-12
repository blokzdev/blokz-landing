"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { brand } from "@/data/brand";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// TODO(user): replace with a real Cal.com / scheduling URL. Tracked in BACKLOG.
const SCHEDULE_URL: string | null = null;

export function ContactSuccess() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="flex flex-col gap-6 rounded-3xl bg-[var(--color-surface)]/70 p-8 ring-1 ring-white/[0.08] backdrop-blur-xl ring-inset sm:p-10"
      initial={reduced ? false : { opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      <span
        aria-hidden
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]/[0.15] text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/40 ring-inset"
      >
        <Check className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-2xl sm:text-3xl">
          <span className="text-display text-[var(--color-ink)]">Talk soon.</span>
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--color-ink-dim)]">
          Your message landed in our inbox. Expect a reply from {brand.social.email} within 48 hours
          — usually faster.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {SCHEDULE_URL && (
          <a
            href={SCHEDULE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 font-mono text-xs tracking-[0.08em] text-[var(--color-canvas)] uppercase transition-colors hover:bg-[var(--color-accent-hot)]"
          >
            Book a call
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        <a
          href={`mailto:${brand.social.email}`}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.04] px-5 font-mono text-xs tracking-[0.08em] text-[var(--color-ink)] uppercase ring-1 ring-white/[0.08] transition-colors ring-inset hover:bg-white/[0.08]"
        >
          Email us directly
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
