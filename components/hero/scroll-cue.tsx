"use client";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollCue() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduced ? 0 : 1.7, duration: 0.6 }}
    >
      <span className="rotate-[-90deg] font-mono text-[10px] tracking-[0.4em] text-[var(--color-ink-dim)] uppercase">
        scroll
      </span>
      <motion.span
        className="block h-12 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent"
        animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3] }}
        style={{ transformOrigin: "top" }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
