import type { App } from "@/types/app";
import { ToolCard } from "./tool-card";

interface Props {
  apps: ReadonlyArray<App>;
}

export function FeaturedCarousel({ apps }: Readonly<Props>) {
  const featured = apps.filter((a) => a.featured);
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="mb-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow text-[var(--color-accent)]">{"// Featured"}</p>
          <h2 id="featured-heading" className="mt-2 text-2xl text-[var(--color-ink)] sm:text-3xl">
            <span className="text-display">Start here.</span>
          </h2>
        </div>
        <p className="hidden font-mono text-[10px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase sm:block">
          {featured.length} picks
        </p>
      </div>

      <ul
        className="-mx-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto px-6 pb-2 [&::-webkit-scrollbar]:hidden"
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
