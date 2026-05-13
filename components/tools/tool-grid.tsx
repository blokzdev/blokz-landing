import type { Tool } from "@/types/tool";
import { ToolCard } from "./tool-card";

interface Props {
  tools: ReadonlyArray<Tool>;
}

export function ToolGrid({ tools }: Readonly<Props>) {
  if (tools.length === 0) {
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
    <ul className="grid grid-flow-dense auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <li key={tool.slug} className="contents">
          <ToolCard tool={tool} />
        </li>
      ))}
    </ul>
  );
}
