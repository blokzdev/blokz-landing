// TODO(user): refine narrative copy to your voice before launch. Tracked in
// BACKLOG.md. The fictional sample product threaded through every chapter is
// "Blokz Receipt" — a hypothetical mobile-first explorer that turns any
// transaction hash into a printable, shareable receipt.

import type { Phase } from "@/types/workflow";

export const phases: ReadonlyArray<Phase> = [
  {
    id: "conceptualize",
    number: "01",
    title: "Conceptualize with Claude.",
    summary:
      "An idea, a chat window, and a back-and-forth that turns a hunch into a hypothesis worth building.",
    beats: [
      {
        id: "spark",
        title: "Spark",
        body: "What if reading a transaction felt like reading a receipt? One hash, one printable summary, no jargon. We start the conversation.",
      },
      {
        id: "interrogate",
        title: "Interrogate",
        body: "Claude pushes back: who is this for, what do they do today, what would unlock daily use? The fuzzy idea sharpens into JTBD.",
      },
      {
        id: "hypothesis",
        title: "Hypothesis",
        body: "Out the other side: a mobile-first explorer with a single input and a screenshot-perfect output. Success metric: shares per session.",
      },
    ],
    platformNotes: {
      web: {
        title: "Likely web stack",
        body: "Next.js + Tailwind on Vercel. Edge-cached tx lookups, SEO via SSR, instant share previews.",
      },
      android: {
        title: "Likely Android stack",
        body: "Kotlin + Jetpack Compose, Play Console internal track for the first 20 testers, in-app shareSheet for the receipt image.",
      },
      windows: {
        title: "Likely Windows stack",
        body: "Tauri (Rust core + WebView2) for native feel without a fresh UI; EV-signed installer and winget release.",
      },
      ios: {
        title: "Likely iOS stack",
        body: "SwiftUI in Xcode 16, TestFlight invites to a closed cohort, ShareLink for native iOS sharing.",
      },
    },
    artifactSlugs: ["prd-example"],
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
        body: "The agent's working contract: stack table, folder map, naming conventions, agent guardrails, definition of done.",
      },
      {
        id: "prd",
        title: "PRD",
        body: "Problem in a paragraph, JTBD in a sentence, MVP scope as in/out, distribution per platform, success metric in numbers.",
      },
      {
        id: "spec",
        title: "Tech spec",
        body: "Data shapes, API surface, error states, security boundaries, test strategy. Everything that becomes a unit test later.",
      },
    ],
    platformNotes: {
      web: {
        title: "Distribution channel",
        body: "Vercel preview deploys per PR, production behind blokz.dev with an Edge-side feature flag for staged rollout.",
      },
      android: {
        title: "Distribution channel",
        body: "Signed AAB → Play Console internal track → closed beta of 20 → open beta → production. Crashlytics on from day one.",
      },
      windows: {
        title: "Distribution channel",
        body: "MSIX bundle hosted on GitHub Releases, winget manifest PR'd to the public index, auto-update via Tauri updater.",
      },
      ios: {
        title: "Distribution channel",
        body: "TestFlight invite-only cohort first, then App Store Connect submission. Phased release with kill-switch flag.",
      },
    },
    artifactSlugs: ["claude-md-example", "prd-example", "spec-example"],
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
        body: "git init, GitHub repo, branch protection, secret store. Claude drafts the CI workflow before the first feature lands.",
      },
      {
        id: "loop",
        title: "Local loop",
        body: "Hot reload, type check on save, lint-staged on commit, typecheck on push. Friction-free dev cycle from minute one.",
      },
    ],
    platformNotes: {
      web: {
        title: "Bootstrap commands",
        body: "pnpm dlx create-next-app · pnpm add @supabase/* · gh repo create · vercel link · simple-git-hooks install.",
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
        body: "xcodegen · SPM dependencies · fastlane match-ios · xcodebuild test · Bitrise or Xcode Cloud wired.",
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
        body: "One task, one diff. Claude proposes; the human reads the change before it's committed. Naming, structure, edges all reviewed.",
      },
      {
        id: "verify",
        title: "Verify",
        body: "Tests written alongside code, not after. Lint + typecheck on every change. CI green is table stakes, not a milestone.",
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
        body: "Vitest unit · Playwright e2e · @next/bundle-analyzer on every PR · Lighthouse-CI threshold gates.",
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
        body: "Lint clean, types clean, build clean, tests passing, bundle within budget. Anything red blocks the merge, no exceptions.",
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
        body: "Vercel auto-promotes main to blokz.dev. Edge cache invalidates on deploy. Speed Insights catches regressions within minutes.",
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
