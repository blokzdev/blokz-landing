"use client";
import dynamic from "next/dynamic";
import { useScroll } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { BuildTunnelFallback } from "./build-tunnel-fallback";

const BuildTunnel = dynamic(() => import("./build-tunnel").then((m) => m.BuildTunnel), {
  ssr: false,
  loading: () => <BuildTunnelFallback />,
});

const NODE_LABELS = ["Plan", "Implement", "Test", "Review", "Refactor"] as const;

export function ChapterDevelop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div
        aria-hidden
        className="relative aspect-[5/3] overflow-hidden rounded-2xl bg-[var(--color-surface)]/40 ring-1 ring-white/[0.08] ring-inset"
      >
        {reduced ? <BuildTunnelFallback /> : <BuildTunnel progress={scrollYProgress} />}
      </div>
      <ul
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase sm:grid sm:grid-cols-5 sm:gap-1"
        aria-label="Build pipeline stages"
      >
        {NODE_LABELS.map((label, i) => (
          <li key={label} className="flex items-center gap-3 sm:justify-center sm:gap-0">
            {i > 0 && (
              <span aria-hidden className="text-[var(--color-ink-dim)]/40 sm:hidden">
                ·
              </span>
            )}
            <span className="text-center">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
