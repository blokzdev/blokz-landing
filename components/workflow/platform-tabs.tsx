"use client";
import { WORKFLOW_PLATFORMS, type WorkflowPlatform } from "@/types/workflow";
import { cn } from "@/lib/utils";

const LABELS: Record<WorkflowPlatform, string> = {
  web: "Web",
  android: "Android",
  windows: "Windows",
  ios: "iOS",
};

interface Props {
  platform: WorkflowPlatform;
  onChange: (next: WorkflowPlatform) => void;
}

export function PlatformTabs({ platform, onChange }: Readonly<Props>) {
  return (
    <div
      role="tablist"
      aria-label="Build target platform"
      className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/[0.08] ring-inset"
    >
      {WORKFLOW_PLATFORMS.map((p) => {
        const active = p === platform;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(p)}
            className={cn(
              "inline-flex h-8 items-center rounded-full px-4 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
              "focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none",
              active
                ? "bg-[var(--color-accent)]/[0.15] text-[var(--color-accent)]"
                : "text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]",
            )}
          >
            {LABELS[p]}
          </button>
        );
      })}
    </div>
  );
}
