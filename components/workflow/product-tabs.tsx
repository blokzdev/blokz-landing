"use client";
import { products } from "@/content/workflow/products";
import { WORKFLOW_PRODUCTS, type WorkflowProduct } from "@/types/workflow";
import { cn } from "@/lib/utils";

interface Props {
  product: WorkflowProduct;
  onChange: (next: WorkflowProduct) => void;
}

export function ProductTabs({ product, onChange }: Readonly<Props>) {
  return (
    <div
      role="tablist"
      aria-label="Sample product showcase"
      className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/[0.08] ring-inset"
    >
      {WORKFLOW_PRODUCTS.map((p) => {
        const meta = products[p];
        const active = p === product;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(p)}
            title={meta.tagline}
            className={cn(
              "inline-flex h-8 items-center gap-2 rounded-full px-4 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
              "focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none",
              active
                ? "bg-[var(--color-accent)]/[0.15] text-[var(--color-accent)]"
                : "text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]",
            )}
          >
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: meta.accentColor, opacity: active ? 1 : 0.55 }}
            />
            {meta.short}
          </button>
        );
      })}
    </div>
  );
}
