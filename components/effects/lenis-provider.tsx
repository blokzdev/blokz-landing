"use client";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Smooth-scroll only benefits long, narrative-heavy routes where inertia
// reads as cinematic. On form pages, list pages, and artifact viewers,
// inertial scroll feels heavy and slightly disorienting. Listing the
// opt-in routes here keeps the lenis runtime out of every other route's
// chunk graph.
const SMOOTH_ROUTES: ReadonlySet<string> = new Set(["/", "/workflow"]);

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
}

export function LenisProvider({ children }: Readonly<{ children: ReactNode }>) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const enabled = !reduced && pathname !== null && SMOOTH_ROUTES.has(pathname);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let frameId = 0;
    let instance: LenisInstance | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      instance = new Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (time: number) => {
        if (cancelled || !instance) return;
        instance.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      instance?.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}
