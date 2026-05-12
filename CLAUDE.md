# CLAUDE.md

This file is the contract between you (Claude) and this codebase. Read it end-to-end before making non-trivial changes. It documents the v2 architecture, conventions, and agent guardrails for the Blokz.dev landing site. Reference the implementation plan at `/root/.claude/plans/this-repo-is-my-jazzy-spark.md` for the high-level vision.

---

## 1. Overview

**Blokz.dev** is the marketing site for **Blokz Development Company**, a vibecoding studio shipping production blockchain / web3 apps (nine published Android explorers and growing). The site is itself a demonstration of agentic engineering: it is built end-to-end with Claude Code, with the workflow it preaches visualized on `/workflow`.

Brand line: _Apps for a decentralized, transparent, sustainable future._

The repo currently still holds the legacy v1 Glitch template. **v2 will replace it wholesale** — only `.git/`, `LICENSE`, and the brand-asset URLs (captured in §13) are preserved.

---

## 2. Tech stack (pinned)

| Layer            | Choice                                                  | Why                                                              | Version |
| ---------------- | ------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| Framework        | Next.js (App Router, RSC, Turbopack dev)                | SSG-first, RSC for content, native MDX, Vercel                   | 15.3.x  |
| UI runtime       | React                                                   | RSC + React Compiler (stable in 19)                              | 19.1.x  |
| Language         | TypeScript, `strict: true`                              | Type safety end-to-end                                           | 5.6.x   |
| Styling          | Tailwind CSS v4 (CSS-first `@theme`)                    | No JS config file; tokens in `globals.css`                       | 4.1.x   |
| Component prims  | shadcn/ui (Radix + Tailwind, copied into `ui/`)         | Owned components, no runtime dep                                 | latest  |
| Motion (DOM)     | `motion` (formerly framer-motion)                       | Shared layout, scroll, gestures                                  | 12.x    |
| Motion (scroll)  | `gsap` + `@gsap/react` + ScrollTrigger                  | Pinned timelines, scrub-driven scenes                            | 3.13.x  |
| Smooth scroll    | `lenis`                                                 | Inertial scroll; integrates with ScrollTrigger                   | 1.1.x   |
| 3D / shaders     | `three` + `@react-three/fiber` + `drei`                 | Hero + workflow chapter 4 build-vis                              | 0.170+  |
| Postprocessing   | `@react-three/postprocessing`                           | Bloom on accents                                                 | 3.x     |
| Content          | `@next/mdx`, `rehype-pretty-code` (Shiki), `remark-gfm` | Manifesto/projects/workflow as MDX                               | latest  |
| URL state        | `nuqs`                                                  | `/apps` filter state in URL                                      | latest  |
| Forms            | Native form + server action + `resend`                  | Contact form → `team@blokz.dev`                                  | 4.x     |
| Icons            | `lucide-react` + custom SVGs                            | Tree-shaken icons + custom chain marks                           | latest  |
| Fonts            | `geist` npm pkg + `@fontsource/instrument-serif`        | Self-hosted Geist Sans/Mono via next/font, no Google Fonts fetch | latest  |
| Analytics        | `@vercel/analytics` + `@vercel/speed-insights`          | Zero-config, privacy-friendly                                    | latest  |
| Lint             | ESLint flat (`eslint-config-next`)                      |                                                                  | 9.x     |
| Format           | Prettier + `prettier-plugin-tailwindcss`                |                                                                  | 3.x     |
| Hooks            | `simple-git-hooks` + `lint-staged`                      | Lighter than husky                                               | latest  |
| Package manager  | `pnpm`                                                  | Mandatory (`engine-strict=true`, pinned via `packageManager`)    | 10.x    |
| Runtime          | Node                                                    | LTS                                                              | ≥20.11  |
| Deploy           | Vercel                                                  | SSG + Edge for `/api/contact`                                    | n/a     |
| Tests (optional) | Playwright                                              | Smoke tests on hero/workflow                                     | 1.48+   |

Don't add a dependency without confirming with the user (see §11). Don't change a pinned major version without confirmation.

---

## 3. Commands

```bash
pnpm install         # install deps (pnpm only — npm/yarn rejected by engine-strict)
pnpm dev             # next dev (Turbopack)
pnpm build           # next build (SSG + Edge route compilation)
pnpm start           # serve production build locally
pnpm lint            # eslint
pnpm lint:fix        # eslint --fix
pnpm format          # prettier --write .
pnpm typecheck       # tsc --noEmit
pnpm analyze         # ANALYZE=true pnpm build (next-bundle-analyzer)
pnpm test            # playwright test (optional, present after Phase 6)
pnpm test:smoke      # playwright test --grep @smoke
```

Pre-commit (auto): `lint-staged` → eslint --fix + prettier --write on staged files.
Pre-push (auto): `pnpm typecheck`.

---

## 4. Folder map

```
app/                              # Next App Router
  (marketing)/                    # route group sharing nav + footer
    layout.tsx                    #   sets <SiteNav/> + <SiteFooter/>
    page.tsx                      #   home (hero, manifesto, apps preview, workflow teaser, contact)
    apps/
      page.tsx                    #   /apps — full showcase + filter
      [slug]/page.tsx             #   /apps/<slug> — per-project detail
    workflow/
      page.tsx                    #   /workflow — 5-chapter scrolly
      artifacts/[slug]/page.tsx   #   /workflow/artifacts/<slug> — full MDX viewer
    contact/page.tsx              #   /contact — dedicated contact page
  api/
    contact/route.ts              # Edge runtime, Resend email send
  manifest.ts                     # PWA manifest (typed)
  robots.ts                       # robots.txt
  sitemap.ts                      # sitemap.xml
  opengraph-image.tsx             # root OG image (per-route can override)
  icon.tsx                        # dynamic favicon
  globals.css                     # Tailwind v4 @theme block + base/utility layers
  layout.tsx                      # root layout: fonts, providers, analytics

components/
  ui/                             # shadcn primitives (button, badge, tabs, sheet, dialog, tooltip, separator)
  nav/{site-nav, mobile-sheet}.tsx
  footer/site-footer.tsx
  hero/
    r3f-hero.tsx                  # client; R3F canvas wrapper, dynamic-imported with ssr:false
    flow-field-plane.tsx          # the shader mesh
    hero-copy.tsx                 # HTML overlay (eyebrow, headline, CTAs)
    scroll-cue.tsx
  manifesto/{manifesto, principle-card}.tsx
  apps/
    project-grid.tsx              # bento masonry container
    project-card.tsx              # dispatcher by type
    project-card-android.tsx
    project-card-oss.tsx
    project-card-web.tsx
    project-filter-bar.tsx        # filter chips + nuqs URL state
    project-detail.tsx            # /apps/[slug] body
  workflow/
    workflow-scrolly.tsx          # GSAP ScrollTrigger orchestrator
    phase-chapter.tsx
    platform-tabs.tsx             # Web/Android/Windows/iOS segmented control
    artifact-frame.tsx            # styled MDX viewer with "open full" CTA
    build-visualization.tsx       # chapter-4 R3F scene (dynamic-imported)
    code-reveal.tsx               # Shiki + typing motion
  contact/{contact-form, contact-success}.tsx
  effects/
    lenis-provider.tsx
    reduced-motion-provider.tsx
    noise-overlay.tsx
    glow-orb.tsx
    magnetic-button.tsx
  seo/json-ld.tsx                 # JSON-LD blob renderer

content/                          # all MDX + typed content lives here
  projects/<slug>.mdx             # long-form per project (optional; gate via hasLongForm)
  manifesto/principles.ts         # typed array — no MDX needed
  workflow/
    phases.ts                     # phase metadata
    phase-1-conceptualize.mdx
    phase-2-spec.mdx
    phase-3-environment.mdx
    phase-4-development.mdx
    phase-5-review-ship.mdx
    artifacts/
      claude-md-example.mdx
      prd-example.mdx
      spec-example.mdx
      prompt-library.mdx

data/                             # source-of-truth, typed
  projects.ts                     # all projects (Project[])
  brand.ts                        # logos, social handles, contact addresses
  chains.ts                       # chain metadata (icon, color, label)

lib/
  utils.ts                        # cn() + small formatters
  projects.ts                     # query helpers (listProjects, getProject, etc.)
  mdx.ts                          # MDX compile config (server)
  rate-limit.ts                   # contact rate-limit (in-memory; upgrade path: Upstash)
  analytics.ts                    # Vercel Analytics wrapper
  seo.ts                          # buildMetadata() helper

shaders/                          # raw GLSL
  flow-field.vert.glsl
  flow-field.frag.glsl
  noise.glsl                      # shared simplex/curl noise

hooks/
  use-reduced-motion.ts
  use-mouse.ts
  use-scroll-progress.ts
  use-media-query.ts

types/
  project.ts                      # ProjectType, ProjectStatus, Project, ProjectLink, ProjectStat, ProjectMedia, Chain, Platform, LinkKind
  workflow.ts                     # Phase, ChapterBeat, PlatformVariant

public/
  brand/                          # rehosted Blokz logo + favicons
  projects/<slug>/                # icon, screenshots (1x + 2x)
  og/                             # static OG fallbacks
  app-ads.txt                     # ported from v1 (Play Store ad SDK requirement)

CLAUDE.md                         # this file
README.md
LICENSE
.nvmrc                            # 20.11.x
.npmrc                            # engine-strict=true, package-manager-strict=true
next.config.ts
tsconfig.json
eslint.config.mjs
prettier.config.mjs
package.json
pnpm-lock.yaml
```

---

## 5. Content authoring

### Add a new project

1. Append a `Project` entry to `data/projects.ts`. Required: `slug`, `name`, `tagline`, `description`, `type`, `status`, `platforms`, `chains`, `media.icon`, `stats`, `links` (with at least one `primary: true`).
2. Drop assets in `public/projects/<slug>/`: `icon.png` (512×512 source), screenshots if any.
3. Optional long-form: create `content/projects/<slug>.mdx` and set `hasLongForm: true`. The detail page renders the MDX after the project header.
4. Pick the right `type` so the correct card variant renders:
   - `android-app` / `ios-app` → mobile card (Play/App Store badge, rating, downloads)
   - `web-app` → web card (cover image, live-URL chip, uptime/version)
   - `oss-repo` → OSS card (GitHub badge, stars/forks, language chip, violet accent)
   - `library` / `service` → defaults to OSS card unless added later
   - `desktop-app` → defaults to mobile card layout; add a `-desktop` variant if it diverges
5. Set `featured: true` for projects that should span 2 columns in the bento grid (use sparingly — max 3 at a time).
6. Run `pnpm dev` and verify it appears on `/apps` and that all filter chips include it correctly.

### Add a new workflow phase

1. Add a phase entry to `content/workflow/phases.ts` with id, title, summary, beat list, and per-platform overrides.
2. Create `content/workflow/phase-<n>-<slug>.mdx` with the chapter narrative (used by the reduced-motion fallback and SEO).
3. Add visual treatment in `components/workflow/` if the chapter needs a bespoke scene; otherwise the default `phase-chapter.tsx` shell handles it.
4. The platform tabs and ScrollTrigger orchestration in `workflow-scrolly.tsx` pick up new phases automatically as long as the `phases.ts` order is correct.

### Add a workflow artifact

1. Create `content/workflow/artifacts/<slug>.mdx`.
2. Link from a phase MDX via standard markdown link to `/workflow/artifacts/<slug>`.
3. Register the slug in `content/workflow/phases.ts` if the artifact should appear in the chapter-2 "desk" stack.

### Add / edit a manifesto principle

`content/manifesto/principles.ts` is a typed array of `{ id, number, title, body }`. Keep body to ≤ 2 short sentences. The grid auto-handles offset/rhythm for up to 7 principles.

### Update brand colors

Edit the `@theme` block at the top of `app/globals.css`. Tailwind v4 picks up the change on save. Avoid hardcoding hex values anywhere outside `globals.css`; reach for the CSS var (`var(--accent)` or the Tailwind utility `bg-accent`).

---

## 6. Component conventions

- **File naming**: `kebab-case.tsx` (e.g., `project-card-android.tsx`). Export the component as `PascalCase` (`ProjectCardAndroid`). One component per file unless a tiny sibling component is exclusively used by it.
- **Default to RSC**. Add `"use client"` only when the component uses hooks, browser APIs, event handlers, or motion libraries. Keep client islands small — pass server-rendered children down rather than promoting whole subtrees.
- **R3F + GSAP components are always client + dynamic-imported**: `const R3FHero = dynamic(() => import('./r3f-hero'), { ssr: false })`.
- **Props**: prefer named props over positional. Use `Readonly<{}>` for component props. No default-export for utility components; reserve default-exports for Next route files (`page.tsx`, `layout.tsx`).
- **Composition over conditional bloat**: e.g., `ProjectCard` dispatches to `ProjectCardAndroid` / `ProjectCardOss` / `ProjectCardWeb` via a small switch; do NOT add a giant `if/else` inside one card component.
- **`cn()` utility**: import from `lib/utils.ts`. Always use it when conditionally composing classNames. Never string-concatenate Tailwind classes by hand.
- **No barrel files** (`index.ts` re-exports) — they hurt tree-shaking and IDE jump-to-definition.

### Project schema (frozen at v2 launch — extend, don't rewrite)

```ts
// types/project.ts
type ProjectType =
  | "android-app"
  | "ios-app"
  | "web-app"
  | "desktop-app"
  | "oss-repo"
  | "library"
  | "service";
type ProjectStatus = "live" | "beta" | "coming-soon" | "archived";
type Chain = "bitcoin" | "ethereum" | "bsc" | "tron" | "polygon" | "solana" | "multi-chain" | "n-a";
type Platform = "android" | "ios" | "web" | "windows" | "macos" | "linux" | "cross-platform";
type LinkKind =
  | "play-store"
  | "app-store"
  | "github"
  | "gitlab"
  | "website"
  | "docs"
  | "demo"
  | "download"
  | "npm"
  | "discord"
  | "telegram"
  | "video";

interface ProjectLink {
  kind: LinkKind;
  url: string;
  label?: string;
  primary?: boolean;
}
interface ProjectStat {
  kind:
    | "downloads"
    | "rating"
    | "reviews"
    | "stars"
    | "forks"
    | "users"
    | "tvl"
    | "version"
    | "custom";
  value: string;
  raw?: number;
  label?: string;
}
interface ProjectMedia {
  icon: string;
  cover?: string;
  screenshots?: { src: string; alt: string; device?: "phone" | "tablet" | "desktop" }[];
  video?: string;
  accentColor?: string;
}
interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  platforms: Platform[];
  chains: Chain[];
  category?: "explorer" | "wallet" | "messaging" | "tool" | "infra" | "experiment";
  tags?: string[];
  media: ProjectMedia;
  stats: ProjectStat[];
  links: ProjectLink[];
  launchedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  hasLongForm?: boolean;
}
```

**To add a new project type or LinkKind**: extend the union, add a renderer (or rendering branch) where the type/kind is consumed, and never widen the type to `string` to skip the work.

---

## 7. Styling rules

- **Tailwind v4** is the default. Use utility classes for layout, spacing, color, typography, state variants.
- **Design tokens** live in `app/globals.css` inside `@theme { … }`. Token names follow the `--color-*` Tailwind-v4 convention: `--color-canvas` (page bg), `--color-surface` (elevated bg), `--color-ink`, `--color-ink-dim`, `--color-accent`, `--color-accent-hot`, `--color-accent-deep`, `--color-violet`, `--color-success`, `--color-warn`, `--color-danger`. Reference via Tailwind utilities (`bg-canvas`, `text-ink`, `text-accent`, `ring-accent-hot`) or CSS vars in arbitrary values (`bg-[var(--color-canvas)]`). Custom utilities `.glass`, `.text-display`, `.text-eyebrow`, `.ease-out-expo` are also defined here.
- **Don't use arbitrary value escape hatches** (`bg-[#08D9D6]`) — add a token first, use the named class. Exception: one-off layout numbers (e.g., `mt-[18vh]`) and `bg-[var(--color-*)]` refs are fine.
- **Component-scoped CSS**: if a component needs styling that utility classes can't express (e.g., GLSL shader textures, complex `mask-image`), put it inline via `style={{}}` or, for repeated cases, add a small CSS file colocated next to the component (`r3f-hero.module.css`).
- **No CSS-in-JS libs** (no styled-components, no emotion).
- **Dark by default**. No light theme in v1.
- **Glass card recipe**: `rounded-2xl bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/[0.08]`. Don't reinvent.
- **Typography scale**: `text-xs` (12px mono labels) → `text-sm` (14 body) → `text-base` (16 body) → `text-lg/xl/2xl` (UI emphasis) → `text-3xl/4xl/5xl/6xl/7xl` (display via Instrument Serif).
- **Tracking**: `tracking-[-0.02em]` on display headings; `uppercase tracking-[0.08em]` on mono eyebrows.

---

## 8. Motion & 3D

**Mandatory rule**: every motion-bearing component ships with a `prefers-reduced-motion` fallback. No exceptions.

- **Reduced-motion source-of-truth**: `useReducedMotion()` from `hooks/use-reduced-motion.ts`. The `ReducedMotionProvider` toggles `data-motion="reduce"` on `<html>` so CSS-only fallbacks work via `[data-motion="reduce"] *`.
- **R3F components**: always client + `next/dynamic({ ssr: false })`. Wrap in a `<Suspense>` with a fast SVG/CSS-gradient placeholder so LCP is text-driven, not canvas-driven. Hydrate after `requestIdleCallback` for the hero; via `IntersectionObserver` for the workflow scene (only when chapter 4 is approaching the viewport).
- **GSAP plugin registration**: once, at module scope inside a client provider. Never inside a component body (causes duplicate registrations on hot-reload).
- **ScrollTrigger + Lenis**: register Lenis once in `LenisProvider`; in the workflow page mount, call `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`. Always clean up in `useEffect` return.
- **`motion` library**: use `whileInView` with `viewport={{ once: true, amount: 0.35 }}` for entrance animations so they don't re-fire on scroll-back. Use shared `layoutId` sparingly — they're powerful but easy to mis-pair.
- **Three.js asset budget**: chapter 4 build-visualization total triangles ≤ 5k. No expensive postprocessing chains; bloom only.
- **Confetti**: `canvas-confetti` one-shot only, on the chapter-5 ship beat. Guard with `useReducedMotion()`.

---

## 9. Accessibility checklist (mandatory per PR)

- [ ] Skip link is the first focusable element on every page.
- [ ] All interactive elements have visible focus rings (`outline: 2px solid var(--accent-hot); outline-offset: 4px`).
- [ ] Body text contrast ≥ 4.5:1 against its background; large text ≥ 3:1. Check both `--bg` and `--bg-elev` surfaces.
- [ ] No information conveyed by color alone (status dots are paired with labels).
- [ ] All images have `alt` (or `alt=""` for decorative).
- [ ] Form fields have real `<label>`s, `aria-describedby` for help/error text, sensible `inputmode`.
- [ ] Scroll-driven content has a non-scroll fallback for reduced-motion users.
- [ ] Keyboard nav reaches every interactive element in logical order. Workflow page advances beat-by-beat with `Tab` / `Space` / `Enter`; `?` opens shortcut help.
- [ ] Screen-reader summary is provided for any visual narrative (sr-only `<ol>` mirroring workflow chapters).
- [ ] Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>` each appear exactly once on a page. Section headings descend predictably (`h1` → `h2` → `h3`).

---

## 10. Performance budget

| Metric                          | Target                        |
| ------------------------------- | ----------------------------- |
| Lighthouse Performance (mobile) | ≥ 90                          |
| Lighthouse Accessibility        | ≥ 98                          |
| Lighthouse Best Practices       | 100                           |
| Lighthouse SEO                  | 100                           |
| LCP                             | < 2.5s                        |
| CLS                             | < 0.05                        |
| INP                             | < 200ms                       |
| Bundle ceiling (route `/`)      | ≤ 250KB gz (incl. R3F)        |
| Bundle ceiling (`/apps`)        | ≤ 120KB gz                    |
| Bundle ceiling (`/workflow`)    | ≤ 280KB gz (incl. R3F + GSAP) |
| Bundle ceiling (other routes)   | ≤ 90KB gz                     |

Verify with `pnpm analyze`. `three` and `gsap` MUST NOT appear in chunks for routes other than `/` and `/workflow`.

**Image rules**:

- All `<img>` go through `next/image` with explicit `width` + `height` (or `fill` + parent aspect-ratio container).
- AVIF first, WebP fallback, raster last.
- `priority` flag is reserved for the hero brand mark and one above-the-fold project icon — never more.
- Project screenshots: ship at 1x + 2x in `public/projects/<slug>/`, let `next/image` srcset.

**Font rules**:

- Geist Sans + Geist Mono come from the `geist` npm package (`geist/font/sans`, `geist/font/mono`) — self-hosted, next/font-optimized. Their CSS variables (`--font-geist-sans`, `--font-geist-mono`) are wired to Tailwind's `--font-sans` / `--font-mono` via `@theme inline` in `globals.css`.
- Instrument Serif comes from `@fontsource/instrument-serif/400-italic.css` imported once in `app/globals.css` — italic display accent only, no other weights.
- No external font CDN. No raw `<link rel="stylesheet">` to fonts.googleapis.com.

---

## 11. Agent guardrails

You (Claude) have freedom in these areas — proceed without asking:

- ✅ Create, edit, or delete files under `app/`, `components/`, `content/`, `data/`, `lib/`, `shaders/`, `hooks/`, `types/`, `public/`.
- ✅ Refactor utility code in `lib/`.
- ✅ Add or refine MDX content under `content/`.
- ✅ Tweak styles in `app/globals.css` (within existing tokens) and Tailwind class usage anywhere.
- ✅ Add new shadcn components by copying them from upstream into `components/ui/`.
- ✅ Add reasonable unit/Playwright tests.

You MUST confirm with the user before:

- 🛑 Adding a new npm dependency (or removing one). State why, what it costs in bundle size, and what alternatives you considered.
- 🛑 Upgrading any pinned major version in §2.
- 🛑 Changing `next.config.ts`, `tsconfig.json`, ESLint or Prettier configs.
- 🛑 Editing `.env*`, `vercel.json`, `package.json` `engines`/`scripts`, GitHub Actions workflows.
- 🛑 Changing the `Project` / workflow content schemas (extending unions is fine; restructuring isn't).
- 🛑 Deploying, force-pushing, or any destructive git operation (`reset --hard`, `clean -f`, branch deletion).
- 🛑 Editing or removing `LICENSE`.
- 🛑 Committing files with secrets (`.env*`, keys, tokens).

**Git workflow**:

- Development branch is **`claude/revamp-blokz-landing-zkhIT`**. All commits land there.
- Commit messages: imperative mood, ≤ 72 char subject, optional body. Conventional Commit prefixes welcome but not required (`feat:`, `fix:`, `chore:`).
- Group related changes in one commit; don't make 10 micro-commits for one feature.
- Never `--no-verify` or `--no-gpg-sign` unless the user explicitly asks.

---

## 12. Common tasks playbook

### Add a new app card type (e.g., `chrome-extension`)

1. Extend `ProjectType` union in `types/project.ts`.
2. Create `components/apps/project-card-extension.tsx` rendering the variant.
3. Add a `case "chrome-extension":` branch to the dispatcher in `components/apps/project-card.tsx`.
4. Update `lib/projects.ts` filter helpers if the new type unlocks a new filter chip.
5. Add an example entry to `data/projects.ts` (status `"coming-soon"` if not real yet) so the variant ships exercised.

### Add a new workflow chapter

1. Append to `content/workflow/phases.ts`.
2. Create the MDX file under `content/workflow/`.
3. If the chapter needs a bespoke visual, create a component under `components/workflow/`; otherwise the default `phase-chapter.tsx` is sufficient.
4. Update the workflow page's reduced-motion fallback section (`workflow-scrolly.tsx` exposes a `<WorkflowStatic/>` companion — keep it in sync).

### Change brand colors

1. Edit the `@theme` block in `app/globals.css`. That's it — every utility class derives from there.
2. If the change is dramatic, regenerate OG images by rebuilding (`app/opengraph-image.tsx` reads tokens).

### Re-host a logo

1. Drop the SVG (preferred) or 2x PNG in `public/brand/`.
2. Update `data/brand.ts` `logo.src` to the local path.
3. Run `pnpm dev`, verify nav + footer + manifest icon.

### Add an OSS repo to the showcase

1. New entry in `data/projects.ts` with `type: "oss-repo"`, `status: "live"`, `platforms: ["cross-platform"]`, stats `{ kind: "stars" }` + `{ kind: "forks" }` + `{ kind: "version" }`, links `{ kind: "github", primary: true }` + `{ kind: "npm" }` if published.
2. Drop a 512×512 icon in `public/projects/<slug>/icon.png`.

---

## 13. Domain glossary & brand asset registry

**Vocabulary**:

- **Vibecoding** — agentic engineering: conceptualizing, prompting, and shipping software end-to-end with an AI agent as primary author and human as architect/reviewer.
- **Blokz Receipt** — fictional sample product narrated across the workflow page artifacts. Not a real product; the name is reserved as a placeholder.
- **Bento masonry** — the apps grid layout: CSS Grid + manual `span` annotations on `featured` entries; not a JS masonry lib.
- **Glass card** — the standard surface treatment (recipe in §7).
- **Chain mark** — small monogram badge for a blockchain (BTC, ETH, BSC, TRON, MULTI).

**Brand asset registry**: see `data/brand.ts` for the live source-of-truth (extracted from legacy v1 `settings.json` before cleanup). Shape includes `name`, `legalName`, `domain`, `tagline`, `positioning`, `headline` (eyebrow/title/titleAccent/sub for the hero), `logo` (PNG src/alt/width/height — swap to `/public/brand/logo.svg` once a vector is supplied), `social` (telegram/github/linkedin/twitter/gdev/email/playStore/flowPage), and `nav` (top-level routes). Add new brand-level constants here rather than hardcoding.

---

## 14. Environment & secrets

`.env.local` (gitignored — never commit):

```
RESEND_API_KEY=             # required for /api/contact in dev/prod
CONTACT_TO_EMAIL=team@blokz.dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # prod: https://blokz.dev
```

Vercel project env (production + preview):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `NEXT_PUBLIC_SITE_URL` = `https://blokz.dev`

Never log secret values. Never check secrets into the repo. If you find a leaked secret in history, alert the user and recommend rotation.

---

## 15. Definition of done

A change is "done" only when ALL of these hold:

- [ ] `pnpm lint` clean.
- [ ] `pnpm typecheck` clean.
- [ ] `pnpm build` succeeds.
- [ ] Bundle analyzer shows no unexpected dep crept into a non-`/` non-`/workflow` chunk.
- [ ] Manual a11y pass on touched pages (focus ring visible, keyboard nav works, reduced-motion fallback renders).
- [ ] Lighthouse mobile run on touched routes meets §10 thresholds (or regression is explained).
- [ ] Visual confirmation in a real browser (Chrome + Firefox) — UI work isn't done until you've seen it move. Take a screenshot if you can't run a browser.
- [ ] For UI work: tested at viewport widths 360 (mobile), 768 (tablet), 1440 (desktop), 1920 (wide).
- [ ] Commit message describes the _why_, not just the _what_.

---

## Quick references

- Plan: `/root/.claude/plans/this-repo-is-my-jazzy-spark.md`
- Branch: `claude/revamp-blokz-landing-zkhIT`
- Contact destination: `team@blokz.dev`
- Production domain (TBD cutover): `blokz.dev`
- Play Store dev: `https://play.google.com/store/apps/dev?id=8878695474933625157`
