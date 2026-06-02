"use client";
import { useEffect, useState } from "react";

/**
 * Returns true once the window has scrolled past `threshold` pixels.
 * Generalizes the inline `window.scrollY > 8` check used by the site nav so
 * other chrome (sticky bars, scroll-aware headers) can share one listener shape.
 */
export function useScrollThreshold(threshold = 8): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => setPassed(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return passed;
}
