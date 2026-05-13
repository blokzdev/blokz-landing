import type { ComponentType } from "react";
import {
  ARTIFACT_TYPES,
  WORKFLOW_PRODUCTS,
  type ArtifactType,
  type WorkflowProduct,
} from "@/types/workflow";
import { products } from "@/content/workflow/products";

export interface ArtifactMeta {
  product: WorkflowProduct;
  type: ArtifactType;
  title: string;
  description: string;
}

const TYPE_LABEL: Record<ArtifactType, string> = {
  "claude-md": "CLAUDE.md",
  prd: "PRD",
  spec: "Tech spec",
  "prompt-library": "Prompt library",
};

const TYPE_DESCRIPTION: Record<ArtifactType, string> = {
  "claude-md":
    "Working contract between the agent and the codebase: stack table, folder map, conventions, agent guardrails, definition of done.",
  prd: "Problem, target user, hypothesis with a measurable success metric, MVP scope, per-platform distribution plan, risks.",
  spec: "Architecture, data shapes, API surface, error-state matrix, security and privacy notes, test strategy, rollout plan.",
  "prompt-library":
    "Reusable prompts that thread through the workflow — plan a feature, audit a file, write a PR description, generate test cases.",
};

export const ARTIFACT_TYPE_LABELS = TYPE_LABEL;

export const artifacts: ReadonlyArray<ArtifactMeta> = WORKFLOW_PRODUCTS.flatMap((product) =>
  ARTIFACT_TYPES.map<ArtifactMeta>((type) => ({
    product,
    type,
    title: `${TYPE_LABEL[type]} — ${products[product].name}`,
    description: TYPE_DESCRIPTION[type],
  })),
);

export function getArtifact(
  product: WorkflowProduct,
  type: ArtifactType,
): ArtifactMeta | undefined {
  return artifacts.find((a) => a.product === product && a.type === type);
}

type ArtifactLoader = () => Promise<{ default: ComponentType }>;

const loaders: Record<WorkflowProduct, Record<ArtifactType, ArtifactLoader>> = {
  brief: {
    "claude-md": () => import("./brief/claude-md.mdx"),
    prd: () => import("./brief/prd.mdx"),
    spec: () => import("./brief/spec.mdx"),
    "prompt-library": () => import("./brief/prompt-library.mdx"),
  },
  forge: {
    "claude-md": () => import("./forge/claude-md.mdx"),
    prd: () => import("./forge/prd.mdx"),
    spec: () => import("./forge/spec.mdx"),
    "prompt-library": () => import("./forge/prompt-library.mdx"),
  },
  memo: {
    "claude-md": () => import("./memo/claude-md.mdx"),
    prd: () => import("./memo/prd.mdx"),
    spec: () => import("./memo/spec.mdx"),
    "prompt-library": () => import("./memo/prompt-library.mdx"),
  },
};

export async function loadArtifact(
  product: WorkflowProduct,
  type: ArtifactType,
): Promise<ComponentType | null> {
  const loader = loaders[product]?.[type];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
