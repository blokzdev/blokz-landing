"use client";
import { useCallback, useSyncExternalStore } from "react";
import { WORKFLOW_PLATFORMS, type WorkflowPlatform } from "@/types/workflow";

const STORAGE_KEY = "blokz:workflow-platform";
const HASH_PARAM = "platform";
const CHANGE_EVENT = "blokz:workflow-platform-change";

function isPlatform(value: string | null): value is WorkflowPlatform {
  return value !== null && (WORKFLOW_PLATFORMS as ReadonlyArray<string>).includes(value);
}

function readFromHash(): WorkflowPlatform | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const v = params.get(HASH_PARAM);
  return isPlatform(v) ? v : null;
}

function readFromStorage(): WorkflowPlatform | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return isPlatform(v) ? v : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("hashchange", callback);
  window.addEventListener("storage", callback);
  // `history.replaceState` doesn't fire hashchange, so we emit our own
  // event from `setPlatform` to keep subscribers in sync.
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): WorkflowPlatform | null {
  return readFromHash() ?? readFromStorage();
}

function getServerSnapshot(): WorkflowPlatform | null {
  return null;
}

export function useWorkflowPlatform(
  defaultPlatform: WorkflowPlatform = "web",
): readonly [WorkflowPlatform, (next: WorkflowPlatform) => void] {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const platform = stored ?? defaultPlatform;

  const setPlatform = useCallback((next: WorkflowPlatform) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage errors (private mode / quota) */
    }
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    params.set(HASH_PARAM, next);
    const nextHash = `#${params.toString()}`;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${nextHash}`,
    );
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return [platform, setPlatform] as const;
}
