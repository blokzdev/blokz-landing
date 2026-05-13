"use client";
import { motion, useAnimationControls } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollCue() {
  const reduced = useReducedMotion();
  const arrowControls = useAnimationControls();

  const scrollToNext = () => {
    const target = document.getElementById("now-next");
    if (target) {
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: reduced ? "auto" : "smooth" });
    }
  };

  const handleClick = () => {
    if (!reduced) {
      // Emphasis: the arrow ticks downward — visually previews the swipe
      // that's about to happen. The button's whileTap handles press feedback.
      void arrowControls.start({
        y: [0, 12, 0],
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      });
    }
    scrollToNext();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to the next section"
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-3 rounded-full p-2 text-[var(--color-ink-dim)]/70 transition-colors hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduced ? 0 : 1.7, duration: 0.6 }}
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.92 }}
    >
      <span className="rotate-[-90deg] font-mono text-[10px] tracking-[0.4em] uppercase">
        scroll
      </span>

      <motion.span
        aria-hidden
        className="mt-1 block h-12 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent"
        style={{ transformOrigin: "top" }}
        animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3], opacity: [0.45, 1, 0.45] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      />

      <motion.span
        aria-hidden
        className="block h-2 w-2 -translate-y-1 rotate-45 border-r border-b border-[var(--color-accent)]"
        animate={arrowControls}
      />
    </motion.button>
  );
}
