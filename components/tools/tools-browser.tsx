"use client";
import { useMemo } from "react";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { APP_CATEGORIES, APP_PRICING, BLOKZ_MARKS } from "@/types/app";
import type { App } from "@/types/app";
import { ToolFilterBar } from "./tool-filter-bar";
import { ToolGrid } from "./tool-grid";

interface Props {
  apps: ReadonlyArray<App>;
}

export function ToolsBrowser({ apps }: Readonly<Props>) {
  const [filter] = useQueryStates(
    {
      category: parseAsStringLiteral(APP_CATEGORIES),
      pricing: parseAsStringLiteral(APP_PRICING),
      blokzMark: parseAsStringLiteral(BLOKZ_MARKS),
      q: parseAsString,
    },
    { shallow: true, history: "replace" },
  );

  const filtered = useMemo(() => {
    const query = filter.q?.trim().toLowerCase() ?? "";
    return apps.filter((a) => {
      if (filter.category && a.category !== filter.category) return false;
      if (filter.pricing && a.pricing !== filter.pricing) return false;
      if (filter.blokzMark && a.blokzMark !== filter.blokzMark) return false;
      if (query) {
        const haystack = [
          a.name,
          a.tagline,
          a.description,
          a.vendor ?? "",
          a.category,
          ...(a.tags ?? []),
          ...(a.modelSupport?.models ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [apps, filter.category, filter.pricing, filter.blokzMark, filter.q]);

  return (
    <>
      <ToolFilterBar total={apps.length} filtered={filtered.length} />
      <ToolGrid apps={filtered} />
    </>
  );
}
