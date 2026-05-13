"use client";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollCue() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-ink-dim)]/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduced ? 0 : 1.7, duration: 0.6 }}
    >
      <span className="font-mono text-[10px] tracking-[0.24em] uppercase">Now · Next</span>
      <motion.span
        animate={reduced ? undefined : { y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </motion.span>
    </motion.div>
  );
}
