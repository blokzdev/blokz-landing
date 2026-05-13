export type ToolCategory =
  | "ide"
  | "model"
  | "mcp"
  | "eval"
  | "infra"
  | "memory"
  | "research-platform";

export const TOOL_CATEGORIES: ReadonlyArray<ToolCategory> = [
  "ide",
  "model",
  "mcp",
  "eval",
  "infra",
  "memory",
  "research-platform",
];

export type ToolPricing = "free" | "freemium" | "paid" | "open-source" | "byo-key";

export const TOOL_PRICING: ReadonlyArray<ToolPricing> = [
  "free",
  "freemium",
  "paid",
  "open-source",
  "byo-key",
];

export type ToolStance = "we-use" | "we-recommend" | "watching" | "contributing";

export const TOOL_STANCES: ReadonlyArray<ToolStance> = [
  "we-use",
  "we-recommend",
  "watching",
  "contributing",
];

export type ToolLinkKind = "website" | "docs" | "github" | "pricing" | "demo" | "video" | "twitter";

export interface ToolLink {
  kind: ToolLinkKind;
  url: string;
  label?: string;
  primary?: boolean;
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  pricing: ToolPricing;
  stance: ToolStance;
  vendor?: string;
  tags?: ReadonlyArray<string>;
  accentColor?: string;
  featured?: boolean;
  links: ReadonlyArray<ToolLink>;
  addedAt?: string;
}
