import type { Project } from "@/types/project";
import { ProjectCard } from "./project-card";

interface Props {
  projects: ReadonlyArray<Project>;
}

export function ProjectGrid({ projects }: Readonly<Props>) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.03] p-12 text-center ring-1 ring-white/[0.06] ring-inset">
        <p className="text-eyebrow text-[var(--color-ink-dim)]">No projects match</p>
        <p className="mt-3 text-base text-[var(--color-ink-dim)]">
          Try clearing a filter — or stay tuned, we&apos;re building.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-dense auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
