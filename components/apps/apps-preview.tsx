import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/apps/project-card";
import { featuredProjects } from "@/lib/projects";

export function AppsPreview() {
  const items = featuredProjects(3);
  if (items.length === 0) return null;

  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-eyebrow text-[var(--color-accent)]">{"// In production"}</p>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl">
              <span className="text-display text-[var(--color-ink)]">What we&apos;ve shipped.</span>
            </h2>
          </div>
          <Link
            href="/apps"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-[var(--color-accent)] uppercase transition-opacity hover:opacity-80"
          >
            See all projects
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </header>

        <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
