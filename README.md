# Blokz.dev

Marketing site for **Blokz Development Co.** — a vibecoding studio building AI apps (with a heritage of shipped blockchain explorers).

The site is itself a demonstration: it's built end-to-end with Claude Code, and the workflow it preaches is visualized on `/workflow`.

🌐 **Live:** [blokz.dev](https://blokz.dev)
📒 **Contract:** see [`CLAUDE.md`](./CLAUDE.md) for stack, conventions, and agent guardrails
📋 **Open items:** see [`BACKLOG.md`](./BACKLOG.md) for tracked deferrals
🗺️ **Plan of record:** see [`Roadmap.md`](./Roadmap.md) for iterations + chunks

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
| `pnpm build`     | Production build (SSG)                            |
| `pnpm start`     | Serve the production build locally                |
| `pnpm lint`      | ESLint                                            |
| `pnpm lint:fix`  | ESLint with autofix                               |
| `pnpm typecheck` | `tsc --noEmit`                                    |
| `pnpm format`    | Prettier on the whole tree                        |
| `pnpm analyze`   | `next build` with `@next/bundle-analyzer` enabled |

Pre-commit auto-runs `lint-staged` (ESLint --fix + Prettier on staged files).
Pre-push auto-runs `pnpm typecheck`.

## What's in the box

- **`/`** — the **AI-apps directory**: ~70 curated tools with category / pricing / Blokz-mark / status filters + search + sort (`nuqs` URL state), a featured carousel, infinite scroll, and light-touch sponsored slots
- **`/apps/[slug]`** — per-app detail with `SoftwareApplication` JSON-LD (one SSG page per directory app)
- **`/about`** — studio identity: R3F hero (cursor-reactive flow-field shader) → Now/Next band → manifesto → portfolio of Blokz's own shipped apps
- **`/portfolio/[slug]`** — per-project detail for Blokz's shipped apps
- **`/workflow`** — a five-phase build narrative (Conceptualize → Spec → Environment → Develop → Ship) threaded through three sample products (Blokz Brief, Eval Forge, Edge Memo). Each phase has a bespoke scene; the Develop phase ships a wireframe R3F build tunnel.
- **`/workflow/artifacts/[product]/[type]`** — 12 MDX artifacts (`CLAUDE.md`, PRD, tech spec, prompt library × 3 products), Shiki-highlighted
- **`/contact`** — a Resend-powered server action with IP rate-limiting and an honest "offline" fallback when `RESEND_API_KEY` is unset

**Two content tracks** (don't conflate them):

- **Directory** (the `/` homepage): [`data/apps.ts`](./data/apps.ts) · schema [`types/app.ts`](./types/app.ts) · UI `components/tools/*`
- **Portfolio** (`/about` + `/portfolio`): [`data/projects.ts`](./data/projects.ts) · schema [`types/project.ts`](./types/project.ts) · UI `components/apps/*`

## Adding an entry

- **Directory app** → append an `App` to `data/apps.ts` (`slug`, `name`, `tagline`, `description`, `category`, `pricing`, `platforms`, `links` with ≥1 `primary: true`).
- **Portfolio project** → append a `Project` to `data/projects.ts`, and drop an icon at `public/projects/<slug>/icon.png` (512×512). Until then, cards render a generated 2-letter monogram.

Full recipes (both tracks, new workflow phases, brand-color changes, etc.) live in `CLAUDE.md` §5 + §12.

## Deploy

Production is wired to Vercel. `main` deploys automatically to [blokz.dev](https://blokz.dev); every branch + PR gets its own preview URL. Required Vercel env vars (Production + Preview):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (default `team@blokz.dev`)
- `CONTACT_FROM_EMAIL` (optional — must be on a verified Resend domain)
- `NEXT_PUBLIC_SITE_URL=https://blokz.dev`

## License

See [`LICENSE`](./LICENSE).
