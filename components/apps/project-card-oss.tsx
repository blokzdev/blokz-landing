import type { CSSProperties } from "react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import {
  LinkIcon,
  Monogram,
  SecondaryIconLink,
  StatLine,
  StatusPill,
  linkLabel,
} from "./card-bits";

interface Props {
  project: Project;
}

export function ProjectCardOss({ project }: Readonly<Props>) {
  const primary = project.links.find((l) => l.primary) ?? project.links[0];
  const secondaries = project.links.filter((l) => l !== primary);
  const accent = project.media.accentColor ?? "var(--color-violet)";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/[0.08] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ring-inset",
        "hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/[0.14]",
        project.featured && "lg:col-span-2",
      )}
      style={{ "--card-accent": accent } as CSSProperties}
    >
      {/* Top accent stripe to differentiate OSS variant at a glance. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 48px -8px ${accent}33` }}
      />

      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
          Open source
        </span>
        <StatusPill status={project.status} />
      </div>

      <div className="flex items-start gap-4">
        <Monogram name={project.name} accentColor={accent} />
        <div className="min-w-0 pt-1">
          <h3 className="text-lg leading-tight font-medium text-[var(--color-ink)]">
            {project.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-ink-dim)]">
            {project.tagline}
          </p>
        </div>
      </div>

      {project.stats.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {project.stats.map((s, i) => (
            <li key={`${s.kind}-${i}`}>
              <StatLine stat={s} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center gap-2 pt-2">
        {primary && (
          <a
            href={primary.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.06] px-5 font-mono text-xs tracking-[0.08em] text-[var(--color-ink)] uppercase ring-1 ring-white/[0.12] transition-colors ring-inset hover:bg-white/[0.10]"
          >
            <LinkIcon kind={primary.kind} className="h-3.5 w-3.5" />
            {linkLabel(primary)}
          </a>
        )}
        {secondaries.map((l) => (
          <SecondaryIconLink key={`${l.kind}-${l.url}`} link={l} />
        ))}
      </div>
    </article>
  );
}
