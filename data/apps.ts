import type { App } from "@/types/app";

// AI apps directory. Comprehensive third-party listings; the Blokz studio
// adds an optional editorial badge (blokzMark) to entries we use, contribute
// to, or have personally vetted. Most listings carry no badge.
//
// Migrated from the curated `tools` data in Iteration 3 chunk C. The 3 model
// entries (Claude, Gemini, Llama) were dropped — models are foundations,
// not browsable apps. Per-app `modelSupport` now describes which models each
// listing uses / supports.
//
// Edit freely; further entries land via batched data PRs (chunks A1, A2, A3...).

export const apps: ReadonlyArray<App> = [
  // ── IDE / Agent surfaces ───────────────────────────────────────────────
  {
    slug: "claude-code",
    name: "Claude Code",
    tagline: "Anthropic's official CLI / IDE / web agent. Primary author at Blokz.",
    description:
      "Claude Code is our lead architect. It reads the spec, drafts the diff, runs the tests, and opens the PR — across CLI, IDE extensions, the desktop app, and the web. Everything on blokz.dev was built with it.",
    category: "ide",
    pricing: "freemium",
    blokzMark: "deployed",
    vendor: "Anthropic",
    platforms: ["macos", "windows", "linux", "cli", "vscode-extension", "web"],
    modelSupport: {
      kind: "single-model",
      models: ["Claude Opus", "Claude Sonnet", "Claude Haiku"],
      notes: "Anthropic-only; runs against your API key or a Claude Pro/Max plan.",
    },
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
    blokzMark: "vetted",
    vendor: "Anysphere",
    platforms: ["macos", "windows", "linux"],
    modelSupport: {
      kind: "multi-model",
      models: ["Claude", "GPT-5", "Gemini", "DeepSeek"],
      notes: "Bundled plan covers all providers; BYO key also supported.",
    },
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
    vendor: "Codeium",
    platforms: ["macos", "windows", "linux"],
    modelSupport: {
      kind: "multi-model",
      models: ["Claude", "GPT", "Gemini"],
      notes: "Bundled subscription includes the model spend.",
    },
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
    blokzMark: "vetted",
    vendor: "Paul Gauthier",
    platforms: ["macos", "windows", "linux", "cli"],
    modelSupport: {
      kind: "byo-key",
      models: ["Claude", "Gemini", "GPT", "Local (Ollama, llama.cpp)"],
    },
    accentColor: "#5EEAD4",
    tags: ["cli", "open-source", "self-hosted", "multi-model"],
    links: [
      { kind: "website", url: "https://aider.chat", primary: true },
      { kind: "github", url: "https://github.com/Aider-AI/aider" },
      { kind: "docs", url: "https://aider.chat/docs/" },
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
    blokzMark: "deployed",
    vendor: "GitHub",
    platforms: ["api", "cli"],
    modelSupport: { kind: "model-agnostic" },
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
    blokzMark: "deployed",
    vendor: "Supabase",
    platforms: ["api", "cli"],
    modelSupport: { kind: "model-agnostic" },
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
    blokzMark: "deployed",
    vendor: "Vercel",
    platforms: ["api", "cli"],
    modelSupport: { kind: "model-agnostic" },
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
    blokzMark: "vetted",
    vendor: "Promptfoo",
    platforms: ["cli", "macos", "windows", "linux"],
    modelSupport: {
      kind: "byo-key",
      models: ["Claude", "GPT", "Gemini", "Local"],
    },
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
    vendor: "Braintrust",
    platforms: ["web", "api"],
    modelSupport: {
      kind: "byo-key",
      models: ["Claude", "GPT", "Gemini", "Custom"],
    },
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
    blokzMark: "deployed",
    vendor: "Vercel",
    platforms: ["web", "api", "cli"],
    modelSupport: { kind: "model-agnostic" },
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
    blokzMark: "deployed",
    vendor: "Supabase",
    platforms: ["web", "api", "cli"],
    modelSupport: { kind: "model-agnostic" },
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
    blokzMark: "vetted",
    vendor: "Cloudflare",
    platforms: ["web", "api", "cli"],
    modelSupport: { kind: "model-agnostic" },
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
    vendor: "Mem0",
    platforms: ["api", "cli"],
    modelSupport: {
      kind: "byo-key",
      models: ["Claude", "GPT", "Gemini", "Local"],
    },
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
    vendor: "Letta",
    platforms: ["api", "cli", "macos", "windows", "linux"],
    modelSupport: {
      kind: "byo-key",
      models: ["Claude", "GPT", "Local"],
    },
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
    blokzMark: "deployed",
    vendor: "Hugging Face",
    platforms: ["web", "api", "cli"],
    modelSupport: {
      kind: "model-agnostic",
      notes: "Hosts the models; you pick which.",
    },
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
    blokzMark: "deployed",
    vendor: "Andrej Karpathy",
    platforms: ["web"],
    modelSupport: { kind: "model-agnostic" },
    accentColor: "#5EEAD4",
    tags: ["arxiv", "papers", "research", "open-source"],
    links: [
      { kind: "website", url: "https://arxiv-sanity-lite.com", primary: true },
      { kind: "github", url: "https://github.com/karpathy/arxiv-sanity-lite" },
    ],
    addedAt: "2025-02-01",
  },
];
