export type WorkflowPlatform = "web" | "android" | "windows" | "ios";

export const WORKFLOW_PLATFORMS: ReadonlyArray<WorkflowPlatform> = [
  "web",
  "android",
  "windows",
  "ios",
];

export type WorkflowProduct = "brief" | "forge" | "memo";

export const WORKFLOW_PRODUCTS: ReadonlyArray<WorkflowProduct> = ["brief", "forge", "memo"];

export type ArtifactType = "claude-md" | "prd" | "spec" | "prompt-library";

export const ARTIFACT_TYPES: ReadonlyArray<ArtifactType> = [
  "claude-md",
  "prd",
  "spec",
  "prompt-library",
];

export interface WorkflowProductMeta {
  id: WorkflowProduct;
  name: string;
  short: string;
  tagline: string;
  description: string;
  defaultPlatform: WorkflowPlatform;
  accentColor: string;
}

export interface PlatformNote {
  title: string;
  body: string;
}

export interface ChapterBeat {
  id: string;
  title: string;
  body: string;
}

export interface Phase {
  id: string;
  number: string;
  title: string;
  summary: string;
  beats: ReadonlyArray<ChapterBeat>;
  platformNotes: Record<WorkflowPlatform, PlatformNote>;
}
