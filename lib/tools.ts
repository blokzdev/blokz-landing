import { tools } from "@/data/tools";
import type { Tool, ToolCategory, ToolPricing, ToolStance } from "@/types/tool";

export interface ListToolsOptions {
  category?: ToolCategory;
  pricing?: ToolPricing;
  stance?: ToolStance;
  text?: string;
}

const stanceOrder: Record<ToolStance, number> = {
  "we-use": 0,
  contributing: 1,
  "we-recommend": 2,
  watching: 3,
};

export function listTools(opts: ListToolsOptions = {}): ReadonlyArray<Tool> {
  const query = opts.text?.trim().toLowerCase() ?? "";
  const filtered = tools.filter((t) => {
    if (opts.category && t.category !== opts.category) return false;
    if (opts.pricing && t.pricing !== opts.pricing) return false;
    if (opts.stance && t.stance !== opts.stance) return false;
    if (query && !matchTool(t, query)) return false;
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
    if (stanceOrder[a.stance] !== stanceOrder[b.stance]) {
      return stanceOrder[a.stance] - stanceOrder[b.stance];
    }
    if (a.addedAt && b.addedAt && a.addedAt !== b.addedAt) {
      return a.addedAt > b.addedAt ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function featuredTools(limit = 4): ReadonlyArray<Tool> {
  return listTools()
    .filter((t) => t.featured)
    .slice(0, limit);
}

function matchTool(t: Tool, query: string): boolean {
  const haystack = [t.name, t.tagline, t.description, t.vendor ?? "", t.category, ...(t.tags ?? [])]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}
