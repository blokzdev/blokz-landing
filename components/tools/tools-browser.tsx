"use client";
import { useMemo } from "react";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { TOOL_CATEGORIES, TOOL_PRICING, TOOL_STANCES } from "@/types/tool";
import type { Tool } from "@/types/tool";
import { ToolFilterBar } from "./tool-filter-bar";
import { ToolGrid } from "./tool-grid";

interface Props {
  tools: ReadonlyArray<Tool>;
}

export function ToolsBrowser({ tools }: Readonly<Props>) {
  const [filter] = useQueryStates(
    {
      category: parseAsStringLiteral(TOOL_CATEGORIES),
      pricing: parseAsStringLiteral(TOOL_PRICING),
      stance: parseAsStringLiteral(TOOL_STANCES),
      q: parseAsString,
    },
    { shallow: true, history: "replace" },
  );

  const filtered = useMemo(() => {
    const query = filter.q?.trim().toLowerCase() ?? "";
    return tools.filter((t) => {
      if (filter.category && t.category !== filter.category) return false;
      if (filter.pricing && t.pricing !== filter.pricing) return false;
      if (filter.stance && t.stance !== filter.stance) return false;
      if (query) {
        const haystack = [
          t.name,
          t.tagline,
          t.description,
          t.vendor ?? "",
          t.category,
          ...(t.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [tools, filter.category, filter.pricing, filter.stance, filter.q]);

  return (
    <>
      <ToolFilterBar total={tools.length} filtered={filtered.length} />
      <ToolGrid tools={filtered} />
    </>
  );
}
