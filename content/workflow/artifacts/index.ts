import type { ComponentType } from "react";

export interface ArtifactMeta {
  slug: string;
  title: string;
  description: string;
  kind: "claude" | "prd" | "spec" | "prompts";
}

export const artifacts: ReadonlyArray<ArtifactMeta> = [
  {
    slug: "claude-md-example",
    title: "CLAUDE.md — Blokz Receipt",
    description:
      "Working contract between the agent and the codebase: stack table, folder map, conventions, agent guardrails, definition of done.",
    kind: "claude",
  },
  {
    slug: "prd-example",
    title: "PRD — Blokz Receipt",
    description:
      "Problem, target user, hypothesis with a measurable success metric, MVP scope, per-platform distribution plan, risks.",
    kind: "prd",
  },
  {
    slug: "spec-example",
    title: "Tech spec — Blokz Receipt",
    description:
      "Architecture diagram, data shapes, API surface, error-state matrix, security and privacy notes, test strategy, rollout plan.",
    kind: "spec",
  },
  {
    slug: "prompt-library",
    title: "Prompt library",
    description:
      "Reusable prompts that thread through the workflow — plan a feature, audit a file, write a PR description, generate test cases.",
    kind: "prompts",
  },
];

export function getArtifact(slug: string): ArtifactMeta | undefined {
  return artifacts.find((a) => a.slug === slug);
}

type ArtifactLoader = () => Promise<{ default: ComponentType }>;

const loaders: Record<string, ArtifactLoader> = {
  "claude-md-example": () => import("./claude-md-example.mdx"),
  "prd-example": () => import("./prd-example.mdx"),
  "spec-example": () => import("./spec-example.mdx"),
  "prompt-library": () => import("./prompt-library.mdx"),
};

export async function loadArtifact(slug: string): Promise<ComponentType | null> {
  const loader = loaders[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
