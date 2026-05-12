"use client";
import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const media = window.matchMedia(QUERY);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
