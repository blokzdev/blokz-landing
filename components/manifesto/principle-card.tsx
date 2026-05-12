"use client";
import { motion } from "motion/react";
import type { Principle } from "@/content/manifesto/principles";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface PrincipleCardProps {
  principle: Principle;
  index: number;
}

export function PrincipleCard({ principle, index }: Readonly<PrincipleCardProps>) {
  const reduced = useReducedMotion();
  // Even-indexed cards sit at the natural baseline; odd ones drop ~6rem to
  // create the magazine rhythm. Collapses on mobile (single column).
  const offset = index % 2 === 1 ? "md:mt-24" : "md:mt-0";

  return (
    <motion.article
      className={cn("grid grid-cols-[auto_1fr] items-start gap-6 md:gap-10", offset)}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE_OUT_EXPO },
        },
      }}
    >
      <span
        aria-hidden
        className="text-display text-6xl text-[var(--color-accent)]/35 sm:text-7xl md:text-8xl lg:text-[8rem]"
      >
        {principle.number}
      </span>
      <div className="pt-2 md:pt-5">
        <h3 className="text-2xl text-[var(--color-ink)] sm:text-3xl">{principle.title}</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--color-ink-dim)]">
          {principle.body}
        </p>
      </div>
    </motion.article>
  );
}
