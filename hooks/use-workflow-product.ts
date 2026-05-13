"use client";
import { useCallback, useSyncExternalStore } from "react";
import { WORKFLOW_PRODUCTS, type WorkflowProduct } from "@/types/workflow";

const STORAGE_KEY = "blokz:workflow-product";
const HASH_PARAM = "product";
const CHANGE_EVENT = "blokz:workflow-product-change";

function isProduct(value: string | null): value is WorkflowProduct {
  return value !== null && (WORKFLOW_PRODUCTS as ReadonlyArray<string>).includes(value);
}

function readFromHash(): WorkflowProduct | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const v = params.get(HASH_PARAM);
  return isProduct(v) ? v : null;
}

function readFromStorage(): WorkflowProduct | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return isProduct(v) ? v : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("hashchange", callback);
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): WorkflowProduct | null {
  return readFromHash() ?? readFromStorage();
}

function getServerSnapshot(): WorkflowProduct | null {
  return null;
}

export function useWorkflowProduct(
  defaultProduct: WorkflowProduct = "brief",
): readonly [WorkflowProduct, (next: WorkflowProduct) => void] {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const product = stored ?? defaultProduct;

  const setProduct = useCallback((next: WorkflowProduct) => {
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

  return [product, setProduct] as const;
}
