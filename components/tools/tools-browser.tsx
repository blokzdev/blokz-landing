"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { APP_CATEGORIES, APP_PRICING, APP_STATUSES, BLOKZ_MARKS } from "@/types/app";
import type { App, BlokzMark } from "@/types/app";
import { sponsored as sponsoredPool } from "@/data/sponsored";
import { interleave } from "@/lib/interleave";
import { SORT_MODES, ToolFilterBar } from "./tool-filter-bar";
import { ToolGrid } from "./tool-grid";
import { FeaturedCarousel } from "./featured-carousel";

interface Props {
  apps: ReadonlyArray<App>;
}

const STATUS_FILTERS = [...APP_STATUSES, "all"] as const;
const BATCH_SIZE = 24;
// One sponsored slot every N organic positions in the default browse. Tuned
// light-touch — with one self-promo card the page shows the Blokz pitch ~twice
// per default browse. Dial down by raising the constant.
const SPONSORED_INTERVAL = 12;

// Same priority used in lib/apps.ts — keeps the two sort paths aligned.
const markOrder: Record<BlokzMark, number> = {
  deployed: 0,
  contributing: 1,
  vetted: 2,
};
const UNMARKED = 3;

export function ToolsBrowser({ apps }: Readonly<Props>) {
  const [filter] = useQueryStates(
    {
      category: parseAsArrayOf(parseAsStringLiteral(APP_CATEGORIES)).withDefault([]),
      pricing: parseAsArrayOf(parseAsStringLiteral(APP_PRICING)).withDefault([]),
      blokzMark: parseAsArrayOf(parseAsStringLiteral(BLOKZ_MARKS)).withDefault([]),
      status: parseAsStringLiteral(STATUS_FILTERS),
      sort: parseAsStringLiteral(SORT_MODES),
      q: parseAsString,
    },
    { shallow: true, history: "replace" },
  );

  const filtered = useMemo(() => {
    const query = filter.q?.trim().toLowerCase() ?? "";
    const statusMode = filter.status ?? "active";
    const result = apps.filter((a) => {
      if (filter.category.length > 0 && !filter.category.includes(a.category)) return false;
      if (filter.pricing.length > 0 && !filter.pricing.includes(a.pricing)) return false;
      if (filter.blokzMark.length > 0) {
        if (!a.blokzMark || !filter.blokzMark.includes(a.blokzMark)) return false;
      }
      if (!query) {
        const appStatus = a.status ?? "active";
        if (statusMode === "active" && appStatus !== "active") return false;
        if (statusMode === "archived" && appStatus !== "archived") return false;
      }
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

    const sortMode = filter.sort ?? "featured";
    return [...result].sort((a, b) => {
      if (sortMode === "alpha") return a.name.localeCompare(b.name);
      if (sortMode === "recent") {
        if (a.addedAt && b.addedAt && a.addedAt !== b.addedAt) {
          return a.addedAt > b.addedAt ? -1 : 1;
        }
        if (a.addedAt && !b.addedAt) return -1;
        if (!a.addedAt && b.addedAt) return 1;
        return a.name.localeCompare(b.name);
      }
      // featured (default)
      if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
      const aMark = a.blokzMark ? markOrder[a.blokzMark] : UNMARKED;
      const bMark = b.blokzMark ? markOrder[b.blokzMark] : UNMARKED;
      if (aMark !== bMark) return aMark - bMark;
      if (a.addedAt && b.addedAt && a.addedAt !== b.addedAt) {
        return a.addedAt > b.addedAt ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }, [
    apps,
    filter.category,
    filter.pricing,
    filter.blokzMark,
    filter.status,
    filter.sort,
    filter.q,
  ]);

  const filtersApplied =
    filter.category.length > 0 ||
    filter.pricing.length > 0 ||
    filter.blokzMark.length > 0 ||
    (filter.status ?? "active") !== "active" ||
    (filter.q?.length ?? 0) > 0;

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  // Reset pagination whenever the filtered list identity changes — using the
  // "store previous render" pattern so visitors see the first batch of new
  // results instead of stale offsets.
  const [prevFiltered, setPrevFiltered] = useState(filtered);
  if (prevFiltered !== filtered) {
    setPrevFiltered(filtered);
    setVisibleCount(BATCH_SIZE);
  }

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (visibleCount >= filtered.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleCount((n) => Math.min(n + BATCH_SIZE, filtered.length));
          }
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [visibleCount, filtered.length]);

  const visible = filtered.slice(0, visibleCount);
  // Sponsored slots only appear in the unfiltered default browse — narrow
  // searches stay clean. Pagination math holds: visibleCount counts organic
  // entries; ads are layered on top of each batch.
  const items = !filtersApplied ? interleave(visible, sponsoredPool, SPONSORED_INTERVAL) : visible;
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      {!filtersApplied && <FeaturedCarousel apps={apps} />}
      <ToolFilterBar total={apps.length} filtered={filtered.length} />
      <ToolGrid items={items} />
      {hasMore && (
        <>
          <div ref={sentinelRef} aria-hidden className="h-8" />
          <button
            type="button"
            onClick={() => setVisibleCount((n) => Math.min(n + BATCH_SIZE, filtered.length))}
            className="sr-only focus:not-sr-only focus:mx-auto focus:mt-6 focus:inline-flex focus:h-9 focus:items-center focus:rounded-full focus:bg-white/[0.04] focus:px-4 focus:font-mono focus:text-[11px] focus:tracking-[0.08em] focus:text-[var(--color-ink)] focus:uppercase focus:ring-1 focus:ring-white/[0.08]"
          >
            Load more apps
          </button>
        </>
      )}
    </>
  );
}
