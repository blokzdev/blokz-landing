# Backlog

Open items surfaced during v2 development. Triage at the end of each Phase and again before v2 launch. This list is the single source of truth for "not yet done but tracked" — distinct from the implementation plan and from the `CLAUDE.md` contract.

## Conventions

Tag every item with a category in brackets so it can be batch-filtered:

- **[user]** — needs your input, decision, or asset before it can be unblocked
- **[polish]** — deferred refinement; pick up in Phase 5/6 before launch
- **[debt]** — technical debt; pay down when adjacent code is next touched
- **[verify]** — sanity check / external confirmation before launch
- **[future]** — explicitly post-v2; safe to ship without

Mark done with `- [x]` and move to the **Resolved** section at the bottom. Inline `// TODO(category): <message>` comments in code should mirror an entry here when the action isn't purely code-local.

---

## Carried from Phase 1

- [ ] **[user]** Provide vector SVG of the Blokz logo (ideally a wordmark + monogram pair). `data/brand.ts` `logo.src` still points at the legacy `cdn.glitch.global` PNG — switch to `/public/brand/logo.svg` once supplied. Affects nav mark, footer mark, favicon (`app/icon.tsx`), and OG images.
- [ ] **[user]** Decide on a real scheduling URL (Cal.com or alternative) for the `/contact` success state. Phase 5 will scaffold the success panel with a placeholder link.
- [ ] **[user]** Rewrite manifesto principles to your voice. Placeholder copy is in the hero headline block in `data/brand.ts`; the principle array (`content/manifesto/principles.ts`) lands in Phase 2 with similar placeholders.
- [ ] **[user]** Confirm `team@blokz.dev` is actively monitored. Optionally mirror form submissions to a Telegram or Discord webhook on submit (Phase 5 wires this).
- [ ] **[verify]** Confirm `public/app-ads.txt` is still required by Play Store ad SDKs. It was preserved verbatim from the legacy template.
- [ ] **[debt]** `README.md` is still the Next.js scaffold default. Rewrite in Phase 6 with project intro, commands, contribution notes, and a link to `CLAUDE.md`.
- [ ] **[polish]** `app/icon.tsx` not yet authored — currently shipping the scaffold's `app/favicon.ico`. Generate a dynamic icon from the brand monogram in Phase 5.
- [ ] **[polish]** Service worker / full PWA installability skipped for v1 per plan. Revisit if mobile install rate becomes a stated goal.
- [ ] **[polish]** ESLint flat config doesn't enforce import order. Add `eslint-plugin-import` with `import/order` if import churn becomes painful in PR reviews.
- [ ] **[polish]** Seed one `oss-repo` placeholder card in `data/projects.ts` with `status: "coming-soon"` so the OSS card variant ships exercised at launch. (Phase 3 will create the card variant; this seeds it.)

## Phase 2 (R3F hero + manifesto)

- [ ] **[debt]** Hero shaders currently live as template literals in `components/hero/shaders.ts` (inline GLSL). Plan target is `shaders/*.glsl` files imported as raw strings. Verify Turbopack's `?raw` import path or add a webpack loader, then split into `shaders/flow-field.{vert,frag}.glsl` + `shaders/noise.glsl` for syntax-highlighting + shareability. Marker: `TODO(debt)` in `components/hero/shaders.ts`.
- [ ] **[polish]** Add the "packet particle" overlay described in the plan — ~200 instanced luminous dots drifting along the flow-field gradient. Held back from chunk 1 to keep first-pass shader simple.
- [ ] **[polish]** Add a faint hex-lattice overlay to the hero shader (procedural SDF) to evoke block structure. Plan called for it; deferred so chunk 1 ships clean.

## Phase 3 (apps showcase)

- [ ] **[user]** Replace blanket Play-Store developer-page URL with per-app deep links (`details?id=<packageId>`) in `data/projects.ts`. Only `blockscan` has a verified package id (`com.bdc.blockscan.app`); the other eight rows currently link to the dev page.
- [ ] **[user]** Provide per-app download counts + review counts beyond Blockchair's confirmed 10K+. `data/projects.ts` only carries rating for the other eight today.
- [ ] **[polish]** Seed real 512×512 app icons under `public/projects/<slug>/icon.png`. Cards currently fall back to a generated 2-letter monogram tinted by chain accent — works at launch, but real icons are more credible.
- [ ] **[polish]** Shared First Load JS now 136 KB → every marketing route is over its plan ceiling: `/apps` 161 KB (vs 120 KB), `/apps/[slug]` 154 KB (vs 90 KB), `_not-found` 128 KB (vs 90 KB). `/` is still fine at 202 KB (vs 250 KB). Phase 5 polish: run `pnpm analyze`, then (a) lazy-load `MobileSheet` so `@radix-ui/react-dialog` ships only on first click, (b) move `<NuqsAdapter>` from the root layout into a route-scoped client component on `/apps` only, and (c) consider gating `LenisProvider` to routes that need it (hero/workflow).
- [ ] **[debt]** `lucide-react@1.x` dropped branded icons (Github, Discord, etc.) for trademark reasons (confirmed canonical package, not a typo-squat). We ship custom inline SVG glyphs for GitHub + GitLab in `components/apps/card-bits.tsx`; Discord and Telegram fall back to `MessageCircle` / `Send`. Acceptable; can swap to dedicated brand-icon SVGs later if precision matters.

## Phase 4 (workflow page)

- [ ] **[user]** Refine phase narrative copy and beat bodies to your voice before launch. The fictional "Blokz Receipt" product threads through all five phases; rename or rewrite if you'd rather narrate a different sample story. `content/workflow/phases.ts`.
- [ ] **[polish]** MDX pipeline + `/workflow/artifacts/[slug]` route. Chunk 3 — add `@next/mdx`, `@types/mdx`, `remark-gfm`, `rehype-pretty-code`, `shiki`. Author 4 sample artifacts (CLAUDE.md, PRD, spec, prompt library) narrating "Blokz Receipt". The chapter-2 doc tiles already link to `/workflow/artifacts/<slug>` — those will 404 until the route lands.
- [ ] **[polish]** Code-reveal component (Shiki + typing motion) for inline code blocks in chapter beats. Phase 5 polish — current chapters use static styled text. The MDX pipeline (chunk 3) already gets Shiki via rehype-pretty-code; this would extend it to typing-animation reveals on scroll.
- [ ] **[polish]** Keyboard navigation between beats + `?` shortcut help dialog. Phase 5 polish.
- [ ] **[polish]** Optional GSAP pinning for the chapters. Current sticky-column layout reads well; revisit if the cinematic pinning genuinely adds something. Phase 5 evaluation.

## Phase 5 (contact + polish)

_(empty)_

## Phase 6 (deploy)

- [ ] **[user]** Provide Vercel project / team for cutover.
- [ ] **[user]** DNS cutover for `blokz.dev` to Vercel.
- [ ] **[user]** Provide / generate `RESEND_API_KEY` for the contact form in Vercel prod + preview env.
- [ ] **[user]** Set `NEXT_PUBLIC_SITE_URL=https://blokz.dev` in Vercel env.

## Future enhancements (post-v2)

- [ ] **[future]** Add per-page OG image generators (`app/(marketing)/apps/[slug]/opengraph-image.tsx`, etc.) once Phase 5 lands the root one.
- [ ] **[future]** iOS app catalog is empty at v2 launch; workflow page surfaces iOS as an aspirational platform tab. Add the first iOS title to `data/projects.ts` and remove the aspirational caveat in workflow chapter 3 once it ships.
- [ ] **[future]** Consider a public "build log" page that timestamps each commit to the revamp with a short rationale — meta proof of the vibecoding workflow.

---

## Resolved (rolling archive)

_(none yet)_
