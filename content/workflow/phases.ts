// TODO(user): refine narrative copy to your voice before launch. Tracked in
// BACKLOG.md. Three sample products are threaded through the workflow — Blokz
// Brief, Eval Forge, and Edge Memo — each explored across the same five phases.
// All three now carry full beats, platform notes, and fleshed-out artifacts
// (Sub-plans B-2 and B-3 shipped); what remains is voice/tone polish only.

import type { Phase, WorkflowProduct } from "@/types/workflow";

const briefPhases: ReadonlyArray<Phase> = [
  {
    id: "conceptualize",
    number: "01",
    title: "Conceptualize with Claude.",
    summary:
      "An arxiv link, a chat window, a back-and-forth that turns a paper into a product hypothesis worth shipping.",
    beats: [
      {
        id: "spark",
        title: "Spark",
        body: "What if any researcher could paste an arxiv URL and walk away with a printable, shareable digest in under a minute? One link, one structured brief, no jargon tax.",
      },
      {
        id: "interrogate",
        title: "Interrogate",
        body: "Claude pushes back: who actually needs this — academics, product managers, indie hackers? What do they do today, and what would unlock weekly use? The hunch sharpens into JTBD.",
      },
      {
        id: "hypothesis",
        title: "Hypothesis",
        body: "A web-first reader with a single input and an export-perfect output: claims, methods, baselines, limits, plus a 'why it matters' angle. Success metric: digests shared per active session.",
      },
    ],
    platformNotes: {
      web: {
        title: "Likely web stack",
        body: "Next.js + Tailwind on Vercel. Edge-cached arxiv fetches, server-rendered digests for SEO, instant share previews via dynamic OG.",
      },
      android: {
        title: "Likely Android stack",
        body: "Kotlin + Compose, share-target for arxiv URLs from the browser, offline-cached digests for plane reading.",
      },
      windows: {
        title: "Likely Windows stack",
        body: "Tauri (Rust core + WebView2) wrapping the web app. EV-signed installer; winget release for the CLI companion.",
      },
      ios: {
        title: "Likely iOS stack",
        body: "SwiftUI in Xcode 16, Safari share-extension that round-trips the arxiv URL to the digest, TestFlight cohort for first 100.",
      },
    },
  },
  {
    id: "spec",
    number: "02",
    title: "Generate the contract.",
    summary:
      "CLAUDE.md, a PRD, and a tech spec — three documents that exist before a single line of product code does.",
    beats: [
      {
        id: "claude-md",
        title: "CLAUDE.md",
        body: "The agent's working contract: stack table, folder map, naming conventions, agent guardrails, definition of done — tuned for a research-grade reader.",
      },
      {
        id: "prd",
        title: "PRD",
        body: "Problem in a paragraph, JTBD in a sentence, MVP scope as in/out, distribution per platform, success metric in numbers a researcher would buy.",
      },
      {
        id: "spec",
        title: "Tech spec",
        body: "Arxiv fetch pipeline, LLM extraction prompts, structured-claim schema, share-card generation, eval set for digest fidelity.",
      },
    ],
    platformNotes: {
      web: {
        title: "Distribution channel",
        body: "Vercel preview deploys per PR, production behind blokz.dev/brief with an Edge-side feature flag for staged rollout.",
      },
      android: {
        title: "Distribution channel",
        body: "Signed AAB → Play Console internal track → closed beta of 50 researchers → open beta → production. Crashlytics on from day one.",
      },
      windows: {
        title: "Distribution channel",
        body: "MSIX bundle hosted on GitHub Releases, winget manifest PR'd to the public index, auto-update via Tauri updater.",
      },
      ios: {
        title: "Distribution channel",
        body: "TestFlight invite cohort first, then App Store Connect submission. Phased release with a kill-switch flag in case the digest pipeline regresses.",
      },
    },
  },
  {
    id: "environment",
    number: "03",
    title: "Stand up the environment.",
    summary:
      "One command scaffolds the repo, one more wires the CI, one more pushes the first green build. The agent does the typing.",
    beats: [
      {
        id: "bootstrap",
        title: "Bootstrap",
        body: "Scaffold the framework, lock the dependency graph, write the ESLint + Prettier + git-hooks config. Faster than reading the docs.",
      },
      {
        id: "repo",
        title: "Repo & CI",
        body: "git init, GitHub repo, branch protection, secret store (Anthropic + arxiv keys). Claude drafts the CI workflow before the first feature lands.",
      },
      {
        id: "loop",
        title: "Local loop",
        body: "Hot reload, type check on save, lint-staged on commit, typecheck on push. Eval set runs in CI on every PR.",
      },
    ],
    platformNotes: {
      web: {
        title: "Bootstrap commands",
        body: "pnpm dlx create-next-app · pnpm add @anthropic-ai/sdk · pnpm add arxiv-api · gh repo create · vercel link · simple-git-hooks install.",
      },
      android: {
        title: "Bootstrap commands",
        body: "studio.sh · gradle wrapper · keystore via fastlane match-android · fastlane init · ktlint + detekt wired.",
      },
      windows: {
        title: "Bootstrap commands",
        body: "cargo create-tauri-app · sign with EV cert via signtool · winget validate · cargo test wired into CI.",
      },
      ios: {
        title: "Bootstrap commands",
        body: "xcodegen · SPM dependencies · fastlane match-ios · xcodebuild test · Xcode Cloud wired for nightly builds.",
      },
    },
  },
  {
    id: "develop",
    number: "04",
    title: "Methodical agent-led development.",
    summary:
      "Plan, implement, verify, refactor — one tight loop per feature, one diff per pull request, human ratifies every step.",
    beats: [
      {
        id: "plan",
        title: "Plan",
        body: "Claude reads CLAUDE.md, drafts a numbered task list with file paths, the human ratifies before any code is touched.",
      },
      {
        id: "implement",
        title: "Implement",
        body: "One task, one diff. Claude proposes the digest pipeline; the human reads the change before it's committed. Naming, structure, edges all reviewed.",
      },
      {
        id: "verify",
        title: "Verify",
        body: "Tests written alongside code. Eval set scores every digest against a hand-graded golden set. CI green is table stakes, not a milestone.",
      },
      {
        id: "refactor",
        title: "Refactor",
        body: "On the third repetition, not on prophecy. The agent suggests; the human owns the call.",
      },
    ],
    platformNotes: {
      web: {
        title: "Test toolchain",
        body: "Vitest unit · Playwright e2e · @next/bundle-analyzer on every PR · Lighthouse-CI threshold gates · eval-set scorer in CI.",
      },
      android: {
        title: "Test toolchain",
        body: "JUnit unit · Espresso UI · Detekt static analysis · Firebase Test Lab on critical flows.",
      },
      windows: {
        title: "Test toolchain",
        body: "xUnit unit · Appium for UI · Tauri's WebDriver integration · code coverage via dotCover.",
      },
      ios: {
        title: "Test toolchain",
        body: "XCTest unit + UI · Maestro for flows · xcresulttool diff reports · TestFlight crash analytics.",
      },
    },
  },
  {
    id: "ship",
    number: "05",
    title: "Review and ship.",
    summary:
      "PR opens with receipts, CI signs off, the deploy fires, release notes write themselves. The agent did the typing; the human signs the manifest.",
    beats: [
      {
        id: "pr",
        title: "Pull request",
        body: "Claude opens the PR with a clear summary, screenshots, checklist, and a link back to the spec section it implements.",
      },
      {
        id: "ci",
        title: "CI green",
        body: "Lint clean, types clean, build clean, tests passing, eval-set scores within budget. Anything red blocks the merge, no exceptions.",
      },
      {
        id: "deploy",
        title: "Deploy",
        body: "Merge to main triggers the production build. Platform-specific artifact is pushed to its distribution channel automatically.",
      },
      {
        id: "release",
        title: "Release notes",
        body: "Claude drafts release notes from the diff and the PR description. Human edits for voice and ships.",
      },
    ],
    platformNotes: {
      web: {
        title: "Deploy artifact",
        body: "Vercel auto-promotes main to blokz.dev/brief. Edge cache invalidates on deploy. Speed Insights catches regressions within minutes.",
      },
      android: {
        title: "Deploy artifact",
        body: "Signed AAB uploaded via fastlane supply to Play Console's internal track. Promoted to production after 24h of clean Crashlytics.",
      },
      windows: {
        title: "Deploy artifact",
        body: "MSIX signed by the EV cert, uploaded to GitHub Releases, winget index PR auto-opened. Tauri updater handles installed clients.",
      },
      ios: {
        title: "Deploy artifact",
        body: "TestFlight build number bumps, invites fire to the cohort. App Store Connect submission for phased release with a 14-day rollout.",
      },
    },
  },
];

const forgePhases: ReadonlyArray<Phase> = [
  {
    id: "conceptualize",
    number: "01",
    title: "Conceptualize with Claude.",
    summary:
      "A spec section, a chat window, a back-and-forth that turns 'add a feature' into 'add a feature with an eval gate behind it.'",
    beats: [
      {
        id: "spark",
        title: "Spark",
        body: "What if shipping a Claude feature came with its own grading rubric? Paste a spec section, get a synthetic eval suite, golden set, and CI harness back.",
      },
      {
        id: "interrogate",
        title: "Interrogate",
        body: "Claude pushes back: who runs the evals — the author, a reviewer, CI? What does 'pass' mean — exact match, rubric score, human rating? The fuzzy idea sharpens into a contract.",
      },
      {
        id: "hypothesis",
        title: "Hypothesis",
        body: "A developer tool that emits a Vitest suite + GitHub Action + dashboard for any Claude feature from a spec section. Success metric: features shipped behind a passing eval gate.",
      },
    ],
    platformNotes: {
      web: {
        title: "Likely web stack",
        body: "Next.js + Tailwind dashboard on Vercel. Server actions kick off async eval runs; results stream back over SSE.",
      },
      android: {
        title: "Likely Android stack",
        body: "Companion read-only dashboard in Compose — view runs and scores on-the-go. The authoring surface stays web/CLI.",
      },
      windows: {
        title: "Likely Windows stack",
        body: "First-class CLI via Rust; eval-suite generation runs locally before the dashboard ever sees it.",
      },
      ios: {
        title: "Likely iOS stack",
        body: "SwiftUI companion app for monitoring runs and triggering re-runs. Authoring stays on the desktop.",
      },
    },
  },
  {
    id: "spec",
    number: "02",
    title: "Generate the contract.",
    summary:
      "CLAUDE.md, a PRD, and a tech spec — three documents that pin down what 'good evals' means before any are generated.",
    beats: [
      {
        id: "claude-md",
        title: "CLAUDE.md",
        body: "The agent's working contract: stack table, folder map, naming conventions, agent guardrails specific to eval-gen prompts.",
      },
      {
        id: "prd",
        title: "PRD",
        body: "Problem, target user (the developer shipping a Claude feature), hypothesis with a measurable success metric, MVP scope, distribution.",
      },
      {
        id: "spec",
        title: "Tech spec",
        body: "Spec-section parser, eval-case generator prompts, rubric schema, Vitest harness template, GitHub Action wiring.",
      },
    ],
    platformNotes: {
      web: {
        title: "Distribution channel",
        body: "Vercel preview deploys per PR; production behind forge.blokz.dev with feature flags for staged rollout of new eval kinds.",
      },
      android: {
        title: "Distribution channel",
        body: "Play Console internal track → closed beta → production. Read-only companion only — no authoring on mobile.",
      },
      windows: {
        title: "Distribution channel",
        body: "CLI distributed via cargo + winget; dashboard available as a local Tauri shell or web.",
      },
      ios: {
        title: "Distribution channel",
        body: "TestFlight cohort, then App Store. Read-only monitoring app aligned with the Android companion.",
      },
    },
  },
  {
    id: "environment",
    number: "03",
    title: "Stand up the environment.",
    summary:
      "Scaffold the generator, wire CI, push the first green eval run — all before any product feature exists.",
    beats: [
      {
        id: "bootstrap",
        title: "Bootstrap",
        body: "Scaffold a TypeScript monorepo (generator + harness + dashboard), lock the dependency graph, write the lint + format config.",
      },
      {
        id: "repo",
        title: "Repo & CI",
        body: "git init, GitHub repo, branch protection, secret store (Anthropic key). Claude drafts the eval-run GitHub Action before the first feature.",
      },
      {
        id: "loop",
        title: "Local loop",
        body: "Hot reload, type check on save, lint-staged on commit, typecheck on push. Eval suite runs in CI on every PR.",
      },
    ],
    platformNotes: {
      web: {
        title: "Bootstrap commands",
        body: "pnpm dlx create-next-app · pnpm add @anthropic-ai/sdk vitest · gh repo create · vercel link · simple-git-hooks install.",
      },
      android: {
        title: "Bootstrap commands",
        body: "studio.sh · gradle wrapper · keystore via fastlane match-android · companion module bootstrapped from the dashboard API.",
      },
      windows: {
        title: "Bootstrap commands",
        body: "cargo new --bin · clap for CLI flags · cargo test wired into CI · winget manifest validated locally.",
      },
      ios: {
        title: "Bootstrap commands",
        body: "xcodegen · SPM dependencies · companion shares its API client with the Android module via OpenAPI.",
      },
    },
  },
  {
    id: "develop",
    number: "04",
    title: "Methodical agent-led development.",
    summary:
      "Plan, implement, verify, refactor — one tight loop per generator improvement, one diff per pull request.",
    beats: [
      {
        id: "plan",
        title: "Plan",
        body: "Claude reads CLAUDE.md, drafts a numbered task list, the human ratifies before code is touched.",
      },
      {
        id: "implement",
        title: "Implement",
        body: "One task, one diff. Claude proposes the generator prompts; the human reads them before they're committed.",
      },
      {
        id: "verify",
        title: "Verify",
        body: "Meta-evals: generated suites are themselves scored against a hand-built reference. CI green is table stakes.",
      },
      {
        id: "refactor",
        title: "Refactor",
        body: "On the third repetition, not on prophecy. The agent suggests; the human owns the call.",
      },
    ],
    platformNotes: {
      web: {
        title: "Test toolchain",
        body: "Vitest unit · Playwright e2e · meta-eval scorer on the generator output · bundle analyzer + Lighthouse-CI gates.",
      },
      android: {
        title: "Test toolchain",
        body: "JUnit unit · Espresso UI · Detekt static analysis on the companion. Authoring tests live in the web/CLI repo.",
      },
      windows: {
        title: "Test toolchain",
        body: "cargo test · cargo clippy · integration tests covering CLI flags · meta-eval scorer reused from the web repo.",
      },
      ios: {
        title: "Test toolchain",
        body: "XCTest unit + UI · Maestro for the companion flows · xcresulttool diff reports.",
      },
    },
  },
  {
    id: "ship",
    number: "05",
    title: "Review and ship.",
    summary:
      "PR opens with eval-run receipts, CI signs off, the deploy fires, release notes write themselves.",
    beats: [
      {
        id: "pr",
        title: "Pull request",
        body: "Claude opens the PR with a clear summary, screenshots of the dashboard, before/after eval scores.",
      },
      {
        id: "ci",
        title: "CI green",
        body: "Lint clean, types clean, build clean, meta-evals passing. Anything red blocks the merge.",
      },
      {
        id: "deploy",
        title: "Deploy",
        body: "Merge to main triggers the production build. Platform-specific artifact ships to its distribution channel.",
      },
      {
        id: "release",
        title: "Release notes",
        body: "Claude drafts release notes from the diff plus the meta-eval delta. Human edits for voice and ships.",
      },
    ],
    platformNotes: {
      web: {
        title: "Deploy artifact",
        body: "Vercel auto-promotes main to forge.blokz.dev. Speed Insights catches regressions within minutes.",
      },
      android: {
        title: "Deploy artifact",
        body: "Signed AAB uploaded via fastlane supply. Promoted to production after 24h of clean Crashlytics.",
      },
      windows: {
        title: "Deploy artifact",
        body: "Signed MSIX + cargo-published CLI uploaded to GitHub Releases; winget index PR auto-opened.",
      },
      ios: {
        title: "Deploy artifact",
        body: "TestFlight build bumps, invites fire to the cohort. App Store Connect submission for phased release.",
      },
    },
  },
];

const memoPhases: ReadonlyArray<Phase> = [
  {
    id: "conceptualize",
    number: "01",
    title: "Conceptualize with Claude.",
    summary:
      "A meeting recorder, a chat window, a back-and-forth that turns 'capture this' into 'capture this without sending it to the cloud.'",
    beats: [
      {
        id: "spark",
        title: "Spark",
        body: "What if meeting capture ran entirely on the device, with three small models cooperating — transcribe, summarise, extract action items — and nothing left the phone?",
      },
      {
        id: "interrogate",
        title: "Interrogate",
        body: "Claude pushes back: which models fit on-device? What's the latency budget? When does the user actually want to read the summary vs. just trust the action-items list?",
      },
      {
        id: "hypothesis",
        title: "Hypothesis",
        body: "A privacy-first iOS-native first capture app: three quantized models cooperate locally; optional self-hosted sync. Success metric: meetings captured per active user per week.",
      },
    ],
    platformNotes: {
      web: {
        title: "Likely web stack",
        body: "WebGPU-backed in-browser pipeline for laptops; transformers.js for transcription, plus a thin Next.js dashboard for self-hosted sync.",
      },
      android: {
        title: "Likely Android stack",
        body: "Kotlin + Compose, GGUF models via llama.cpp's android bindings, foreground service for long meetings.",
      },
      windows: {
        title: "Likely Windows stack",
        body: "Tauri + Rust core; DirectML or CPU fallback for inference. Designed to run on a 2-year-old laptop without a GPU.",
      },
      ios: {
        title: "Likely iOS stack",
        body: "SwiftUI in Xcode 16, Core ML models for transcription and summarisation, Background Modes for active recording.",
      },
    },
  },
  {
    id: "spec",
    number: "02",
    title: "Generate the contract.",
    summary:
      "CLAUDE.md, a PRD, and a tech spec — three documents that pin down the privacy story before any audio is captured.",
    beats: [
      {
        id: "claude-md",
        title: "CLAUDE.md",
        body: "Stack table, folder map, conventions, plus an explicit guardrail: nothing leaves the device by default. Sync is opt-in and self-hosted.",
      },
      {
        id: "prd",
        title: "PRD",
        body: "Problem (privacy + battery cost of cloud capture), target user (consultants, founders, journalists), JTBD, MVP scope, distribution per platform.",
      },
      {
        id: "spec",
        title: "Tech spec",
        body: "Multi-agent harness, model selection (quantization + size budgets), transcript schema, action-item extractor prompts, sync protocol.",
      },
    ],
    platformNotes: {
      web: {
        title: "Distribution channel",
        body: "Vercel preview deploys per PR; production at memo.blokz.dev. Service Worker caches models so subsequent loads are offline.",
      },
      android: {
        title: "Distribution channel",
        body: "Signed AAB → Play Console internal track → closed beta of 50 → open beta → production.",
      },
      windows: {
        title: "Distribution channel",
        body: "MSIX bundle on GitHub Releases, winget manifest, Tauri updater for installed clients.",
      },
      ios: {
        title: "Distribution channel",
        body: "TestFlight cohort first, then App Store Connect submission. Phased release.",
      },
    },
  },
  {
    id: "environment",
    number: "03",
    title: "Stand up the environment.",
    summary:
      "Scaffold the on-device pipeline, wire CI, push the first build that captures, transcribes, and summarises a 5-minute clip end-to-end.",
    beats: [
      {
        id: "bootstrap",
        title: "Bootstrap",
        body: "Scaffold the iOS target, vendor the quantized models, write the SwiftLint + format config.",
      },
      {
        id: "repo",
        title: "Repo & CI",
        body: "git init, GitHub repo, branch protection, secret store. Claude drafts the CI workflow before the first agent harness exists.",
      },
      {
        id: "loop",
        title: "Local loop",
        body: "Hot reload (where possible), incremental compile, lint-staged on commit, typecheck on push.",
      },
    ],
    platformNotes: {
      web: {
        title: "Bootstrap commands",
        body: "pnpm dlx create-next-app · pnpm add @huggingface/transformers · gh repo create · vercel link · simple-git-hooks install.",
      },
      android: {
        title: "Bootstrap commands",
        body: "studio.sh · gradle wrapper · ndk for llama.cpp bindings · fastlane match-android · ktlint + detekt wired.",
      },
      windows: {
        title: "Bootstrap commands",
        body: "cargo create-tauri-app · vendor GGUF models · sign with EV cert · cargo test wired into CI.",
      },
      ios: {
        title: "Bootstrap commands",
        body: "xcodegen · SPM dependencies · Core ML models vendored under Resources/ · fastlane match-ios · xcodebuild test.",
      },
    },
  },
  {
    id: "develop",
    number: "04",
    title: "Methodical agent-led development.",
    summary:
      "Plan, implement, verify, refactor — one tight loop per harness improvement, one diff per pull request.",
    beats: [
      {
        id: "plan",
        title: "Plan",
        body: "Claude reads CLAUDE.md, drafts a numbered task list, the human ratifies before code is touched.",
      },
      {
        id: "implement",
        title: "Implement",
        body: "One task, one diff. Claude proposes the harness orchestration; the human reads it before commit.",
      },
      {
        id: "verify",
        title: "Verify",
        body: "Hand-graded golden set of recordings scored on transcription WER and action-item recall. CI green is table stakes.",
      },
      {
        id: "refactor",
        title: "Refactor",
        body: "On the third repetition, not on prophecy. The agent suggests; the human owns the call.",
      },
    ],
    platformNotes: {
      web: {
        title: "Test toolchain",
        body: "Vitest unit · Playwright e2e · WER + recall scorer · bundle analyzer with a strict on-device model budget.",
      },
      android: {
        title: "Test toolchain",
        body: "JUnit unit · Espresso UI · Detekt · Firebase Test Lab covering capture across device classes.",
      },
      windows: {
        title: "Test toolchain",
        body: "cargo test · cargo clippy · Appium for UI · WER + recall scorer reused via the shared eval crate.",
      },
      ios: {
        title: "Test toolchain",
        body: "XCTest unit + UI · Maestro for capture flows · xcresulttool diff reports · TestFlight crash analytics.",
      },
    },
  },
  {
    id: "ship",
    number: "05",
    title: "Review and ship.",
    summary:
      "PR opens with eval receipts, CI signs off, the deploy fires, release notes write themselves.",
    beats: [
      {
        id: "pr",
        title: "Pull request",
        body: "Claude opens the PR with a clear summary, screenshots, and the eval-set delta versus the previous tag.",
      },
      {
        id: "ci",
        title: "CI green",
        body: "Lint clean, types clean, build clean, eval-set within budget. Anything red blocks the merge.",
      },
      {
        id: "deploy",
        title: "Deploy",
        body: "Merge to main triggers the platform build. Artifact pushed to its distribution channel.",
      },
      {
        id: "release",
        title: "Release notes",
        body: "Claude drafts release notes from the diff plus the eval delta. Human edits for voice and ships.",
      },
    ],
    platformNotes: {
      web: {
        title: "Deploy artifact",
        body: "Vercel auto-promotes main to memo.blokz.dev. Service Worker pre-caches the new model bundle.",
      },
      android: {
        title: "Deploy artifact",
        body: "Signed AAB via fastlane supply. Promoted to production after 24h of clean Crashlytics.",
      },
      windows: {
        title: "Deploy artifact",
        body: "Signed MSIX on GitHub Releases. winget index PR auto-opened. Tauri updater handles installed clients.",
      },
      ios: {
        title: "Deploy artifact",
        body: "TestFlight build bumps, invites fire to the cohort. App Store Connect submission for phased release.",
      },
    },
  },
];

export const phases: Record<WorkflowProduct, ReadonlyArray<Phase>> = {
  brief: briefPhases,
  forge: forgePhases,
  memo: memoPhases,
};
