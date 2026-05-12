# Blokz.dev

Marketing site for **Blokz Development Co.** — a vibecoding studio shipping production web3 apps.

The site is itself a demonstration: it's built end-to-end with Claude Code, and the workflow it preaches is visualized on `/workflow`.

🌐 **Live:** [blokz.dev](https://blokz.dev)
📒 **Contract:** see [`CLAUDE.md`](./CLAUDE.md) for stack, conventions, and agent guardrails
📋 **Open items:** see [`BACKLOG.md`](./BACKLOG.md) for tracked deferrals
🗺️ **Plan of record:** `/root/.claude/plans/this-repo-is-my-jazzy-spark.md` (local to the dev environment)

---

## Stack

Next.js 15 (App Router · RSC · Turbopack) · React 19 · TypeScript · Tailwind v4 · shadcn/ui primitives · `motion` + Lenis · React Three Fiber · MDX + Shiki via `rehype-pretty-code` · Resend · Vercel.

## Quick start

```bash
pnpm install
cp .env.example .env.local      # then fill in RESEND_API_KEY for the contact form
pnpm dev                        # http://localhost:3000
```

## Common commands

| Command          | What it does                                      |
| ---------------- | ------------------------------------------------- |
| `pnpm dev`       | Dev server (Turbopack, hot reload)                |
| `pnpm build`     | Production build (SSG + Edge route compilation)   |
| `pnpm start`     | Serve the production build locally                |
| `pnpm lint`      | ESLint                                            |
| `pnpm lint:fix`  | ESLint with autofix                               |
| `pnpm typecheck` | `tsc --noEmit`                                    |
| `pnpm format`    | Prettier on the whole tree                        |
| `pnpm analyze`   | `next build` with `@next/bundle-analyzer` enabled |

Pre-commit auto-runs `lint-staged` (ESLint --fix + Prettier on staged files).
Pre-push auto-runs `pnpm typecheck`.

## What's in the box

- **`/`** — R3F hero (cursor-reactive flow-field shader) → manifesto → featured-apps preview
- **`/apps`** — bento grid of every project with platform/chain filters (`nuqs` URL state)
- **`/apps/[slug]`** — per-project detail with `SoftwareApplication` JSON-LD; 10 slugs SSG'd
- **`/workflow`** — five scrolly chapters narrating Idea → Spec → Environment → Develop → Ship, threaded through a fictional sample product (Blokz Receipt). Each chapter has a bespoke scene; the develop chapter ships a wireframe R3F build-pipeline tunnel.
- **`/workflow/artifacts/[slug]`** — 4 sample MDX artifacts (`CLAUDE.md`, PRD, tech spec, prompt library) rendered with Shiki-highlighted code blocks
- **`/contact`** — Resend-powered form with IP rate-limiting and an honest "offline" fallback when `RESEND_API_KEY` is unset

Single source of truth for the apps showcase: [`data/projects.ts`](./data/projects.ts) (schema in [`types/project.ts`](./types/project.ts)).

## Adding a new project

1. Append a `Project` entry to `data/projects.ts` (required fields: `slug`, `name`, `tagline`, `description`, `type`, `status`, `platforms`, `chains`, `media.icon`, `stats`, `links` with at least one `primary: true`).
2. Drop an icon at `public/projects/<slug>/icon.png` (512×512 source). Until then, cards render a generated 2-letter monogram tinted by chain accent.
3. (Optional) Long-form page: create `content/projects/<slug>.mdx` and set `hasLongForm: true`.

Full recipes for new card types, new workflow phases, brand-color changes, etc. live in `CLAUDE.md` §12.

## Deploy

Production is wired to Vercel. `main` deploys automatically to [blokz.dev](https://blokz.dev); every branch + PR gets its own preview URL. Required Vercel env vars (Production + Preview):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (default `team@blokz.dev`)
- `CONTACT_FROM_EMAIL` (optional — must be on a verified Resend domain)
- `NEXT_PUBLIC_SITE_URL=https://blokz.dev`

## License

See [`LICENSE`](./LICENSE).
