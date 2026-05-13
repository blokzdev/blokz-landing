"use client";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TOOL_CATEGORIES, TOOL_PRICING, TOOL_STANCES } from "@/types/tool";
import type { ToolCategory, ToolPricing, ToolStance } from "@/types/tool";
import { cn } from "@/lib/utils";

const CATEGORY_LABEL: Record<ToolCategory, string> = {
  ide: "IDE",
  model: "Model",
  mcp: "MCP",
  eval: "Eval",
  infra: "Infra",
  memory: "Memory",
  "research-platform": "Research",
};

const PRICING_LABEL: Record<ToolPricing, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "open-source": "OSS",
  "byo-key": "BYO key",
};

const STANCE_LABEL: Record<ToolStance, string> = {
  "we-use": "Deployed",
  "we-recommend": "Recommended",
  watching: "Tracked",
  contributing: "Contributing",
};

interface Props {
  total: number;
  filtered: number;
}

export function ToolFilterBar({ total, filtered }: Readonly<Props>) {
  const [filter, setFilter] = useQueryStates(
    {
      category: parseAsStringLiteral(TOOL_CATEGORIES),
      pricing: parseAsStringLiteral(TOOL_PRICING),
      stance: parseAsStringLiteral(TOOL_STANCES),
      q: parseAsString,
    },
    { shallow: true, history: "replace" },
  );

  // Debounced text input so we don't spam URL writes on every keystroke.
  // Local state initializes from URL once; "Clear all" resets both in sync.
  const [text, setText] = useState(filter.q ?? "");
  useEffect(() => {
    const handle = setTimeout(() => {
      const next = text.trim();
      void setFilter({ q: next.length > 0 ? next : null });
    }, 220);
    return () => clearTimeout(handle);
  }, [text, setFilter]);

  const setCategory = (value: ToolCategory | null) => void setFilter({ category: value });
  const setPricing = (value: ToolPricing | null) => void setFilter({ pricing: value });
  const setStance = (value: ToolStance | null) => void setFilter({ stance: value });

  const clearAll = () => {
    setText("");
    void setFilter({ category: null, pricing: null, stance: null, q: null });
  };

  const hasFilter =
    filter.category !== null ||
    filter.pricing !== null ||
    filter.stance !== null ||
    (filter.q?.length ?? 0) > 0;

  return (
    <div className="sticky top-16 z-30 -mx-6 mb-10 border-y border-white/[0.06] bg-[var(--color-canvas)]/85 px-6 py-4 backdrop-blur-xl sm:top-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-ink-dim)]"
            />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search tools, vendors, tags…"
              aria-label="Search tools"
              className="h-9 w-full rounded-full bg-white/[0.04] pr-10 pl-9 font-mono text-[11px] tracking-[0.04em] text-[var(--color-ink)] ring-1 ring-white/[0.08] transition-colors ring-inset placeholder:text-[var(--color-ink-dim)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none"
            />
            {text.length > 0 && (
              <button
                type="button"
                onClick={() => setText("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--color-ink-dim)] transition-colors hover:text-[var(--color-ink)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <p
            className="hidden font-mono text-[10px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase sm:block"
            aria-live="polite"
          >
            {hasFilter ? `${filtered} of ${total}` : `${total} tools`}
          </p>
        </div>

        <div className="-mx-2 flex [scrollbar-width:none] flex-col gap-3 overflow-x-auto px-2 [&::-webkit-scrollbar]:hidden">
          <FilterRow label="Category">
            <Chip active={filter.category === null} onClick={() => setCategory(null)}>
              All
            </Chip>
            {TOOL_CATEGORIES.map((c) => (
              <Chip
                key={c}
                active={filter.category === c}
                onClick={() => setCategory(filter.category === c ? null : c)}
              >
                {CATEGORY_LABEL[c]}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Pricing">
            <Chip active={filter.pricing === null} onClick={() => setPricing(null)}>
              All
            </Chip>
            {TOOL_PRICING.map((p) => (
              <Chip
                key={p}
                active={filter.pricing === p}
                onClick={() => setPricing(filter.pricing === p ? null : p)}
              >
                {PRICING_LABEL[p]}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Stance">
            <Chip active={filter.stance === null} onClick={() => setStance(null)}>
              All
            </Chip>
            {TOOL_STANCES.map((s) => (
              <Chip
                key={s}
                active={filter.stance === s}
                onClick={() => setStance(filter.stance === s ? null : s)}
              >
                {STANCE_LABEL[s]}
              </Chip>
            ))}
          </FilterRow>
        </div>

        {hasFilter && (
          <div className="flex items-center gap-3 sm:hidden">
            <p
              className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase"
              aria-live="polite"
            >
              {filtered} of {total}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-accent)] uppercase transition-opacity hover:opacity-75"
            >
              Clear all
            </button>
          </div>
        )}

        {hasFilter && (
          <div className="hidden items-center justify-end gap-3 sm:flex">
            <button
              type="button"
              onClick={clearAll}
              className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-accent)] uppercase transition-opacity hover:opacity-75"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-nowrap items-center gap-1.5">
      <span className="mr-2 shrink-0 font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)]/70 uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

interface ChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Chip({ active, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap uppercase transition-colors",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none",
        active
          ? "bg-[var(--color-accent)] text-[var(--color-canvas)]"
          : "bg-white/[0.04] text-[var(--color-ink-dim)] ring-1 ring-white/[0.08] ring-inset hover:bg-white/[0.08] hover:text-[var(--color-ink)]",
      )}
    >
      {children}
    </button>
  );
}
