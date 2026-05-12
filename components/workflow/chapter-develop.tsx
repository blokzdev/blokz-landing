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
        className="grid grid-cols-5 gap-1 font-mono text-[10px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase"
        aria-label="Build pipeline stages"
      >
        {NODE_LABELS.map((label) => (
          <li key={label} className="text-center">
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
