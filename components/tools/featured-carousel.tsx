import type { App } from "@/types/app";
import { ToolCard } from "./tool-card";

interface Props {
  apps: ReadonlyArray<App>;
}

export function FeaturedCarousel({ apps }: Readonly<Props>) {
  const featured = apps.filter((a) => a.featured);
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="mb-10">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 id="featured-heading" className="text-eyebrow text-[var(--color-accent)]">
          {"// Featured"}
          <span className="ml-2 text-[var(--color-ink-dim)]/70">· {featured.length} picks</span>
        </h2>
        <p
          aria-hidden
          className="hidden font-mono text-[10px] tracking-[0.08em] text-[var(--color-ink-dim)]/70 uppercase sm:block"
        >
          scroll →
        </p>
      </div>

      {/* py-3 / -my-3 keeps a 12px breathing zone on both axes so the card's
          hover-lift (-4px) and focus ring (2px outer) aren't clipped by the
          scroll container — setting overflow-x: auto forces overflow-y to
          behave the same way per CSS spec, so the lifted card would otherwise
          hit the top edge. */}
      <ul
        className="no-scrollbar -mx-6 -my-3 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 py-3"
        role="list"
      >
        {featured.map((app) => (
          <li key={app.slug} className="flex w-[320px] shrink-0 snap-start sm:w-[380px]">
            <ToolCard app={app} />
          </li>
        ))}
      </ul>
    </section>
  );
}
