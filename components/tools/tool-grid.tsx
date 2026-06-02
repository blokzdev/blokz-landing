import type { App } from "@/types/app";
import type { SponsoredSlot } from "@/types/sponsored";
import { ToolCard } from "./tool-card";
import { SponsoredCard } from "./sponsored-card";

type Item = App | SponsoredSlot;
const isSponsored = (item: Item): item is SponsoredSlot => "sponsored" in item;

interface Props {
  items: ReadonlyArray<Item>;
}

export function ToolGrid({ items }: Readonly<Props>) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
          No matches
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-dim)]">
          Try clearing a filter or searching for something else.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, i) => (
        <li key={isSponsored(item) ? `sp:${item.id}:${i}` : item.slug} className="contents">
          {isSponsored(item) ? <SponsoredCard slot={item} /> : <ToolCard app={item} />}
        </li>
      ))}
    </ul>
  );
}
