"use client";
import { useMemo } from "react";
import { parseAsStringLiteral, useQueryStates } from "nuqs";
import type { Project } from "@/types/project";
import { ProjectFilterBar } from "./project-filter-bar";
import { ProjectGrid } from "./project-grid";

const PLATFORMS = ["android", "web", "oss"] as const;
const CHAINS = ["bitcoin", "ethereum", "bsc", "tron", "multi-chain", "n-a"] as const;

interface Props {
  projects: ReadonlyArray<Project>;
}

export function AppsBrowser({ projects }: Readonly<Props>) {
  const [filter] = useQueryStates(
    {
      platform: parseAsStringLiteral(PLATFORMS),
      chain: parseAsStringLiteral(CHAINS),
    },
    { shallow: true, history: "replace" },
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filter.platform) {
        if (filter.platform === "android" && !p.platforms.includes("android")) return false;
        if (filter.platform === "web" && !p.platforms.includes("web")) return false;
        if (filter.platform === "oss" && p.type !== "oss-repo" && p.type !== "library") {
          return false;
        }
      }
      if (filter.chain && !p.chains.includes(filter.chain)) return false;
      return true;
    });
  }, [projects, filter.platform, filter.chain]);

  return (
    <>
      <ProjectFilterBar total={projects.length} filtered={filtered.length} />
      <ProjectGrid projects={filtered} />
    </>
  );
}
