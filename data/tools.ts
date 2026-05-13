import type { Tool } from "@/types/tool";

// Curated picks — what the Blokz studio uses, recommends, or is tracking.
// Read as taste, not SEO. Edit freely; commit improvements back.

export const tools: ReadonlyArray<Tool> = [
  // ── IDE / Agent surfaces ───────────────────────────────────────────────
  {
    slug: "claude-code",
    name: "Claude Code",
    tagline: "Anthropic's official CLI/IDE/web agent. Primary author at Blokz.",
    description:
      "Claude Code is our lead architect. It reads the spec, drafts the diff, runs the tests, and opens the PR — across CLI, IDE extensions, the desktop app, and the web. Everything on blokz.dev was built with it.",
    category: "ide",
    pricing: "freemium",
    stance: "we-use",
    vendor: "Anthropic",
    accentColor: "#08D9D6",
    featured: true,
    tags: ["agentic", "cli", "ide", "mcp", "subagents"],
    links: [
      { kind: "website", url: "https://claude.com/claude-code", primary: true },
      { kind: "docs", url: "https://docs.anthropic.com/claude/docs/claude-code" },
      { kind: "github", url: "https://github.com/anthropics/claude-code" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: "AI-first code editor. Multi-model, tab-completion native.",
    description:
      "Fork of VS Code with deep model integration — multi-line tab completion, agent mode, chat with codebase context. Strong for fast iteration on existing repos.",
    category: "ide",
    pricing: "freemium",
    stance: "we-recommend",
    vendor: "Anysphere",
    accentColor: "#37F3FF",
    tags: ["ide", "multi-model", "vscode-fork"],
    links: [
      { kind: "website", url: "https://cursor.com", primary: true },
      { kind: "pricing", url: "https://cursor.com/pricing" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    tagline: "Cascade agent + IDE. Codeium's developer surface.",
    description:
      "Agent-first IDE that pairs autocomplete with Cascade, a planning-then-acting agent. Strong terminal integration; good when the diff spans many files.",
    category: "ide",
    pricing: "freemium",
    stance: "watching",
    vendor: "Codeium",
    accentColor: "#A78BFA",
    tags: ["ide", "agentic", "cascade"],
    links: [
      { kind: "website", url: "https://windsurf.com", primary: true },
      { kind: "pricing", url: "https://windsurf.com/pricing" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "aider",
    name: "Aider",
    tagline: "Terminal-native pair programmer. BYO key, BYO model.",
    description:
      "Open-source CLI for AI pair-programming directly against your git repo. Brings any model (Claude, Gemini, GPT, local) into a tight commit-per-task loop.",
    category: "ide",
    pricing: "open-source",
    stance: "we-recommend",
    vendor: "Paul Gauthier",
    accentColor: "#5EEAD4",
    tags: ["cli", "open-source", "self-hosted", "multi-model"],
    links: [
      { kind: "website", url: "https://aider.chat", primary: true },
      { kind: "github", url: "https://github.com/Aider-AI/aider" },
      { kind: "docs", url: "https://aider.chat/docs/" },
    ],
    addedAt: "2025-02-01",
  },

  // ── Models ─────────────────────────────────────────────────────────────
  {
    slug: "claude",
    name: "Claude",
    tagline: "Anthropic's frontier model family. Opus / Sonnet / Haiku.",
    description:
      "Our primary model. Opus for hard reasoning and long-form architecture; Sonnet for the bulk of coding work; Haiku for fast, cheap pipeline steps. Long context, strong tool use, careful refusal posture.",
    category: "model",
    pricing: "byo-key",
    stance: "we-use",
    vendor: "Anthropic",
    accentColor: "#D97757",
    featured: true,
    tags: ["frontier", "long-context", "tool-use", "vision"],
    links: [
      { kind: "website", url: "https://claude.com", primary: true },
      { kind: "docs", url: "https://docs.anthropic.com" },
      { kind: "pricing", url: "https://www.anthropic.com/pricing" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "gemini",
    name: "Gemini",
    tagline: "Google's frontier model family. Strong multimodal + long context.",
    description:
      "Used at Blokz for tasks that benefit from a million-token context (whole-repo grep, video reasoning) and as a second opinion in multi-model harnesses. Gemini CLI ships an agentic surface.",
    category: "model",
    pricing: "byo-key",
    stance: "we-use",
    vendor: "Google DeepMind",
    accentColor: "#627EEA",
    featured: true,
    tags: ["frontier", "multimodal", "long-context", "video"],
    links: [
      { kind: "website", url: "https://deepmind.google/technologies/gemini/", primary: true },
      { kind: "docs", url: "https://ai.google.dev/gemini-api/docs" },
      { kind: "pricing", url: "https://ai.google.dev/pricing" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "llama",
    name: "Llama",
    tagline: "Meta's open-weights model family. Self-host or BYO.",
    description:
      "Open weights at multiple sizes (1B–405B+). Strong when you need on-device inference, full control, or are running into rate-limit walls on hosted frontier models.",
    category: "model",
    pricing: "open-source",
    stance: "we-recommend",
    vendor: "Meta",
    accentColor: "#A78BFA",
    tags: ["open-weights", "self-hosted", "on-device"],
    links: [
      { kind: "website", url: "https://www.llama.com", primary: true },
      { kind: "docs", url: "https://huggingface.co/meta-llama" },
    ],
    addedAt: "2025-02-01",
  },

  // ── MCP servers ────────────────────────────────────────────────────────
  {
    slug: "mcp-github",
    name: "GitHub MCP",
    tagline: "Reads + writes GitHub from any MCP-aware agent.",
    description:
      "Official GitHub MCP server. Wired into Claude Code and most agentic surfaces to read PRs, post comments, create branches, and run secret-scanning. Used daily at Blokz.",
    category: "mcp",
    pricing: "open-source",
    stance: "we-use",
    vendor: "GitHub",
    accentColor: "#8FA3BA",
    tags: ["mcp", "git", "code-review", "open-source"],
    links: [
      { kind: "github", url: "https://github.com/github/github-mcp-server", primary: true },
      {
        kind: "docs",
        url: "https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-skillsets",
      },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "mcp-supabase",
    name: "Supabase MCP",
    tagline: "Postgres + auth + edge functions from inside the agent.",
    description:
      "MCP server that exposes Supabase project ops — list tables, apply migrations, deploy edge functions, fetch advisors. Removes a context-switch cliff between code and database.",
    category: "mcp",
    pricing: "open-source",
    stance: "we-use",
    vendor: "Supabase",
    accentColor: "#3ECF8E",
    tags: ["mcp", "database", "postgres", "open-source"],
    links: [
      { kind: "github", url: "https://github.com/supabase-community/supabase-mcp", primary: true },
      { kind: "docs", url: "https://supabase.com/docs/guides/getting-started/mcp" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "mcp-vercel",
    name: "Vercel MCP",
    tagline: "Deploys + build logs + runtime logs in agent context.",
    description:
      "Vercel-native MCP server for deploying directly from chat, inspecting build/runtime logs, and reading deployment metadata. Pairs naturally with the Vercel CLI.",
    category: "mcp",
    pricing: "open-source",
    stance: "we-use",
    vendor: "Vercel",
    accentColor: "#E8F1F8",
    tags: ["mcp", "deploy", "logs", "open-source"],
    links: [
      { kind: "github", url: "https://github.com/vercel/mcp", primary: true },
      { kind: "docs", url: "https://vercel.com/docs/mcp" },
    ],
    addedAt: "2025-02-01",
  },

  // ── Eval / observability ───────────────────────────────────────────────
  {
    slug: "promptfoo",
    name: "Promptfoo",
    tagline: "Open-source LLM eval CLI. Rubric scoring + golden sets.",
    description:
      "YAML-driven eval harness. Pair a prompt with a goldset, define rubrics, run across multiple models in CI. Strong for catching prompt regressions before they hit production.",
    category: "eval",
    pricing: "open-source",
    stance: "we-recommend",
    vendor: "Promptfoo",
    accentColor: "#5EEAD4",
    tags: ["eval", "ci", "rubric", "open-source"],
    links: [
      { kind: "website", url: "https://promptfoo.dev", primary: true },
      { kind: "github", url: "https://github.com/promptfoo/promptfoo" },
      { kind: "docs", url: "https://promptfoo.dev/docs/getting-started" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "braintrust",
    name: "Braintrust",
    tagline: "Hosted eval + tracing platform for LLM apps.",
    description:
      "Production-grade eval orchestration with a dashboard, dataset versioning, and OpenTelemetry tracing. Useful once eval volume outgrows a CI YAML file.",
    category: "eval",
    pricing: "freemium",
    stance: "watching",
    vendor: "Braintrust",
    accentColor: "#FBBF24",
    tags: ["eval", "tracing", "datasets", "production"],
    links: [
      { kind: "website", url: "https://www.braintrust.dev", primary: true },
      { kind: "docs", url: "https://www.braintrust.dev/docs" },
      { kind: "pricing", url: "https://www.braintrust.dev/pricing" },
    ],
    addedAt: "2025-02-01",
  },

  // ── Infra ──────────────────────────────────────────────────────────────
  {
    slug: "vercel",
    name: "Vercel",
    tagline: "Where blokz.dev lives. Edge functions + image opt + analytics.",
    description:
      "Hosts blokz.dev. Next.js-native, fast deploys, edge functions for the contact API, free Speed Insights tier. Strong default for the React/Next ecosystem.",
    category: "infra",
    pricing: "freemium",
    stance: "we-use",
    vendor: "Vercel",
    accentColor: "#E8F1F8",
    featured: true,
    tags: ["hosting", "edge", "nextjs", "ci"],
    links: [
      { kind: "website", url: "https://vercel.com", primary: true },
      { kind: "docs", url: "https://vercel.com/docs" },
      { kind: "pricing", url: "https://vercel.com/pricing" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "supabase",
    name: "Supabase",
    tagline: "Postgres + auth + storage + edge functions, open source.",
    description:
      "Default backend layer at Blokz when an app needs persistence + auth + realtime. Open-source, self-hostable, very low friction to local dev with the CLI.",
    category: "infra",
    pricing: "freemium",
    stance: "we-use",
    vendor: "Supabase",
    accentColor: "#3ECF8E",
    tags: ["postgres", "auth", "realtime", "open-source"],
    links: [
      { kind: "website", url: "https://supabase.com", primary: true },
      { kind: "docs", url: "https://supabase.com/docs" },
      { kind: "github", url: "https://github.com/supabase/supabase" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    tagline: "Workers + R2 + D1 + Durable Objects. Global edge runtime.",
    description:
      "When the app needs to run close to users globally, or when an isolate-per-request model fits the workload better than Node functions. R2 for storage, D1 for SQLite-at-the-edge.",
    category: "infra",
    pricing: "freemium",
    stance: "we-recommend",
    vendor: "Cloudflare",
    accentColor: "#F38020",
    tags: ["edge", "workers", "storage", "global"],
    links: [
      { kind: "website", url: "https://www.cloudflare.com/developer-platform/", primary: true },
      { kind: "docs", url: "https://developers.cloudflare.com" },
      { kind: "pricing", url: "https://www.cloudflare.com/plans/" },
    ],
    addedAt: "2025-02-01",
  },

  // ── Memory / context ───────────────────────────────────────────────────
  {
    slug: "mem0",
    name: "mem0",
    tagline: "Long-term memory layer for AI agents. Self-hostable.",
    description:
      "Persistent memory store + retrieval pipeline for agent applications. Handles per-user/per-session/per-agent scope cleanly; pairs with OpenAI, Anthropic, and local models.",
    category: "memory",
    pricing: "freemium",
    stance: "watching",
    vendor: "Mem0",
    accentColor: "#A78BFA",
    tags: ["memory", "agents", "rag", "self-hosted"],
    links: [
      { kind: "website", url: "https://mem0.ai", primary: true },
      { kind: "github", url: "https://github.com/mem0ai/mem0" },
      { kind: "docs", url: "https://docs.mem0.ai" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "letta",
    name: "Letta",
    tagline: "Stateful agents with structured memory. Successor to MemGPT.",
    description:
      "Open-source framework for building stateful agents — memory blocks, context-window management, tool-use primitives baked in. Useful as a reference architecture for long-running agents.",
    category: "memory",
    pricing: "open-source",
    stance: "watching",
    vendor: "Letta",
    accentColor: "#37F3FF",
    tags: ["memory", "stateful", "agents", "open-source"],
    links: [
      { kind: "website", url: "https://letta.com", primary: true },
      { kind: "github", url: "https://github.com/letta-ai/letta" },
      { kind: "docs", url: "https://docs.letta.com" },
    ],
    addedAt: "2025-02-01",
  },

  // ── Research platforms ─────────────────────────────────────────────────
  {
    slug: "huggingface",
    name: "Hugging Face",
    tagline: "Models, datasets, papers, spaces. The AI research commons.",
    description:
      "Source-of-truth for open-weights models and datasets. Daily-paper feed for tracking research; Spaces for trying ideas without setting up infra. Heavy use at Blokz for any model we don't pay an API for.",
    category: "research-platform",
    pricing: "freemium",
    stance: "we-use",
    vendor: "Hugging Face",
    accentColor: "#FBBF24",
    tags: ["models", "datasets", "papers", "open-source"],
    links: [
      { kind: "website", url: "https://huggingface.co", primary: true },
      { kind: "docs", url: "https://huggingface.co/docs" },
    ],
    addedAt: "2025-02-01",
  },
  {
    slug: "arxiv-sanity",
    name: "arxiv-sanity-lite",
    tagline: "Personalized arxiv reader by Andrej Karpathy.",
    description:
      "Tag-and-track arxiv papers without drowning in the firehose. We track papers across edge inference, multi-agent harnesses, and memory architectures here — the spine of the Blokz Brief sample product.",
    category: "research-platform",
    pricing: "free",
    stance: "we-use",
    vendor: "Andrej Karpathy",
    accentColor: "#5EEAD4",
    tags: ["arxiv", "papers", "research", "open-source"],
    links: [
      { kind: "website", url: "https://arxiv-sanity-lite.com", primary: true },
      { kind: "github", url: "https://github.com/karpathy/arxiv-sanity-lite" },
    ],
    addedAt: "2025-02-01",
  },
];
