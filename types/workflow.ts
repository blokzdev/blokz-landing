export type WorkflowPlatform = "web" | "android" | "windows" | "ios";

export const WORKFLOW_PLATFORMS: ReadonlyArray<WorkflowPlatform> = [
  "web",
  "android",
  "windows",
  "ios",
];

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
  artifactSlugs?: ReadonlyArray<string>;
}
