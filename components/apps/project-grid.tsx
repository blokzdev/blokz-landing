import { listProjects, type ListOptions } from "@/lib/projects";
import { ProjectCard } from "./project-card";

interface Props {
  filter?: ListOptions;
}

export function ProjectGrid({ filter }: Readonly<Props>) {
  const items = listProjects(filter);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.03] p-12 text-center ring-1 ring-white/[0.06] ring-inset">
        <p className="text-eyebrow text-[var(--color-ink-dim)]">No projects yet</p>
        <p className="mt-3 text-base text-[var(--color-ink-dim)]">
          But stay tuned — we&apos;re building.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-dense auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
