import type { App } from "@/types/app";
import { ToolCard } from "./tool-card";

interface Props {
  apps: ReadonlyArray<App>;
}

export function ToolGrid({ apps }: Readonly<Props>) {
  if (apps.length === 0) {
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
      {apps.map((app) => (
        <li key={app.slug} className="contents">
          <ToolCard app={app} />
        </li>
      ))}
    </ul>
  );
}
