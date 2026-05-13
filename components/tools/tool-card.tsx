import Link from "next/link";
import { ArrowUpRight, BookOpen, ExternalLink, Play, Tag } from "lucide-react";
import type { ComponentType } from "react";
import type { Tool, ToolLinkKind } from "@/types/tool";
import { cn } from "@/lib/utils";

// Branded GitHub icon was dropped in lucide-react 1.x — ship our own glyph
// (same shape used in components/apps/card-bits.tsx).
function GithubGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.42c.58.1.79-.25.79-.55v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.02 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.3-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.75.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

const CATEGORY_LABEL: Record<Tool["category"], string> = {
  ide: "IDE / Agent",
  model: "Model",
  mcp: "MCP",
  eval: "Eval",
  infra: "Infra",
  memory: "Memory",
  "research-platform": "Research",
};

const PRICING_LABEL: Record<Tool["pricing"], string> = {
  free: "FREE",
  freemium: "FREEMIUM",
  paid: "PAID",
  "open-source": "OPEN SOURCE",
  "byo-key": "BYO KEY",
};

const STANCE_LABEL: Record<Tool["stance"], string> = {
  "we-use": "Deployed",
  "we-recommend": "Recommended",
  watching: "Tracked",
  contributing: "Contributing",
};

const STANCE_RING: Record<Tool["stance"], string> = {
  "we-use": "ring-[var(--color-accent)]/45",
  contributing: "ring-[var(--color-success)]/45",
  "we-recommend": "ring-white/[0.10]",
  watching: "ring-[var(--color-violet)]/40",
};

const STANCE_DOT: Record<Tool["stance"], string> = {
  "we-use": "bg-[var(--color-accent)]",
  contributing: "bg-[var(--color-success)]",
  "we-recommend": "bg-[var(--color-ink-dim)]",
  watching: "bg-[var(--color-violet)]",
};

const LINK_ICON: Record<ToolLinkKind, ComponentType<{ className?: string }>> = {
  website: ExternalLink,
  docs: BookOpen,
  github: GithubGlyph,
  pricing: Tag,
  demo: Play,
  video: Play,
  twitter: ExternalLink,
};

interface Props {
  tool: Tool;
}

export function ToolCard({ tool }: Readonly<Props>) {
  const primary = tool.links.find((l) => l.primary) ?? tool.links[0];
  const secondaries = tool.links.filter((l) => l !== primary);
  const monogram = tool.name
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl bg-[var(--color-surface)]/70 p-5 ring-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ring-inset hover:-translate-y-1 hover:bg-[var(--color-surface)]/90",
        STANCE_RING[tool.stance],
        tool.featured && "sm:col-span-2",
      )}
    >
      {/* Top row: category + pricing + stance pill */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase">
        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[var(--color-ink-dim)] ring-1 ring-white/[0.08] ring-inset">
          {CATEGORY_LABEL[tool.category]}
        </span>
        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[var(--color-ink-dim)] ring-1 ring-white/[0.08] ring-inset">
          {PRICING_LABEL[tool.pricing]}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[var(--color-ink-dim)]">
          <span
            aria-hidden
            className={cn("block h-1.5 w-1.5 rounded-full", STANCE_DOT[tool.stance])}
          />
          {STANCE_LABEL[tool.stance]}
        </span>
      </div>

      {/* Monogram + name + vendor */}
      <div className="flex items-start gap-3">
        <div
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs tracking-[0.08em] uppercase ring-1 ring-white/[0.08] ring-inset"
          style={{
            background: `linear-gradient(135deg, ${tool.accentColor ?? "#08D9D6"}1f, transparent)`,
            color: tool.accentColor ?? "var(--color-accent)",
          }}
        >
          {monogram}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-[var(--color-ink)]">{tool.name}</h3>
          {tool.vendor && <p className="text-xs text-[var(--color-ink-dim)]">{tool.vendor}</p>}
        </div>
      </div>

      {/* Tagline + description */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-[var(--color-ink)]">{tool.tagline}</p>
        <p className="text-sm leading-relaxed text-[var(--color-ink-dim)]">{tool.description}</p>
      </div>

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] tracking-[0.04em] text-[var(--color-ink-dim)]/80"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Links */}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {primary && (
          <Link
            href={primary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[var(--color-accent)]/[0.12] px-4 font-mono text-[11px] tracking-[0.08em] text-[var(--color-accent)] uppercase ring-1 ring-[var(--color-accent)]/30 transition-colors ring-inset hover:bg-[var(--color-accent)]/[0.2] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none"
          >
            Open
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        )}
        {secondaries.map((link) => {
          const Icon = LINK_ICON[link.kind];
          return (
            <Link
              key={`${link.kind}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label ?? link.kind}
              title={link.label ?? link.kind}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[var(--color-ink-dim)] ring-1 ring-white/[0.08] transition-colors ring-inset hover:bg-white/[0.08] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none"
            >
              <Icon className="h-3.5 w-3.5" />
            </Link>
          );
        })}
      </div>
    </article>
  );
}
