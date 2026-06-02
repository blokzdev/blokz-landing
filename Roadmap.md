# Roadmap

The forward-looking companion to `BACKLOG.md`. `BACKLOG.md` tracks discrete deferred items;
this file tracks **iterations and their chunks** — the larger arcs of work, each chunk a
single PR. Use it to see where we are and what's next.

**Workflow**: each chunk below is planned in detail with the plan tool _just before_ it's
executed, then shipped as its own PR on its own branch, pausing for review between chunks.
When a chunk ships, tick it here and fold any spillover into `BACKLOG.md`.

Status legend: ⬜ planned · 🟦 in progress · ✅ shipped

---

## Shipped iterations (summary)

- **Iteration 1 — Brand pivot to the AI frontier** (Sub-plan A). Positioning, manifesto, SEO,
  OG. ✅
- **Iteration 2 — Home refinement + apps lifecycle.** Hero, Now/Next band, status lifecycle. ✅
- **Iteration 3 — Workflow build-out.** Five-phase scrolly, cinematic chapters, MDX artifacts. ✅
- **Iteration 4 — Apps directory revamp** (chunks A0–E). Schema sweep, data fill, route
  restructure (`/tools`→`/`), per-app detail pages, UX polish (carousel, multi-select, sort,
  infinite scroll), sponsored slots. ✅
- **Workflow narrative migration** (Sub-plan B): B-1 showcase, B-2 Eval Forge artifacts, B-3
  Edge Memo artifacts — all three sample products fleshed to full depth. ✅

### Chunk ledger (continuous letter sequence)

Chunks use one global A→Z sequence across iterations. Iteration 4 ran A0–E; Iteration 5 picks
up at **F**. (There was no roadmap file before this one — A0–E were tracked in commit messages
and `BACKLOG.md`'s Resolved archive, which is why "chunk F" didn't appear to exist yet.)

| Chunk | What                                                                          | PR        | Status |
| ----- | ----------------------------------------------------------------------------- | --------- | ------ |
| A0    | Schema sweep + migrate 16 entries to the `App` shape                          | #12       | ✅     |
| A1    | +18 entries — agent / orchestration / vector-db                               | #13       | ✅     |
| A2    | +18 entries — voice / vision / image-gen / video / audio                      | #14       | ✅     |
| A3    | +18 entries — search / observability / fine-tuning / browser-ext / automation | #15       | ✅     |
| A4    | Freshness audit + status filter + platform contract                           | #16       | ✅     |
| B     | Route restructure (`/tools`→`/`, home→`/about`, consolidate portfolio)        | #17       | ✅     |
| C     | Per-app detail pages + SEO                                                    | #18       | ✅     |
| D     | UX polish — featured carousel, multi-select, sort, infinite scroll            | #19       | ✅     |
| E     | Sponsored slots scaffold + 1 self-promo                                       | #21       | ✅     |
| —     | Featured-carousel polish · legacy `/apps` redirect hotfix                     | #22 · #20 | ✅     |
| F–L   | **Iteration 5 — Directory-grade UI/UX** (below)                               | —         | ⬜     |

---

## Iteration 5 — Directory-grade UI/UX refinement (Chunks F → L)

**Goal**: make blokz.dev look and feel like a polished directory product on every screen
size — fixed/pinned search & filter, mobile layouts with no zoom/overflow, larger tap
targets, and the affordances of a real directory app (command palette, filter drawer, sticky
action bars, carousel navigation).

**Why now**: content and IA are done; the gap is fit-and-finish. Exploration found the design
system is thin (only color + radius tokens; container/section/spacing/z-index scales are
copy-pasted ad-hoc), and the directory has localized mobile gaps (small tap targets, no text
truncation, sort hidden on mobile, an invisible "load more", no loading/empty/end states).

**Dependency posture** (user-approved): add the standard libraries, lazy-loaded / code-split
so the static `/` First Load stays under the 200KB ceiling (CLAUDE.md §10):

- `cmdk` — ⌘K command palette
- `sonner` — toast notifications
- `@radix-ui/react-popover`, `-dropdown-menu`, `-select`, `-scroll-area` — shadcn primitives
  (`@radix-ui/react-dialog` already present; reuse for `sheet`)

**Features locked in** (user-selected): ⌘K command palette · mobile filter drawer + active
filter pills · sticky mobile action bar on detail pages · carousel arrows + dots · plus
opportunistic quick wins uncovered along the way.

**Conventions (every chunk)**: reuse `cn()` + existing `card-bits` glyphs + the `nuqs`
filter store + `useReducedMotion()`; every motion-bearing addition ships a reduced-motion
fallback; RSC-default with small client islands; tokens only in `globals.css`; no barrel
files. Each PR carries the §9 a11y checklist and §15 definition-of-done, and ticks the
relevant `BACKLOG.md` items.

**Per-chunk verification gate**: `pnpm lint` / `typecheck` / `build` clean · `pnpm analyze`
(no stray dep in non-`/`/`/workflow` chunks) · manual responsive pass at
360 / 390 / 768 / 1024 / 1440 / 1920 · keyboard + reduced-motion · Lighthouse mobile ≥90,
a11y ≥98.

Branches: `claude/iter5-chunk-<letter>-<slug>`.

---

### ⬜ Chunk F — Design-system foundation

The shared layer every later chunk builds on; mostly non-visual.

- `app/globals.css`: add z-index / duration / shadow token scales; add `@layer utilities` —
  `.container-site`, `.section-y`, `.h-dvh` / `.min-h-dvh`, `.safe-px`, `.no-scrollbar`
  (consolidate the repeated hidden-scrollbar pattern), `.scroll-fade-x` (edge-fade mask), and
  a styled `::-webkit-scrollbar`.
- `components/ui/`: copy in `input`, `skeleton`, `scroll-area`, `popover`, `dropdown-menu`,
  `select`, `sheet` (Dialog-based), `command`; wire `sonner` `<Toaster/>` in `app/layout.tsx`.
- `hooks/use-scroll-threshold.ts` (generalize nav's inline scrollY>8); `use-media-query` if absent.
- Low-risk sweep: adopt `.container-site` in nav/footer/page shells (mechanical, no visual change).

---

### ⬜ Chunk G — Mobile directory hardening (highest impact)

No overflow/zoom, real controls, real states.

- `tool-card.tsx`: `line-clamp-2` tagline/description, `truncate` vendor, `min-w-0` tag list,
  tags → first N + "+N"; ≥40px secondary links; `@media (hover:hover)` guard on the hover-lift.
- `tool-grid.tsx`: add the missing `md:grid-cols-3` step (1 → sm:2 → md:3 → lg:3 → xl:4).
- `tool-filter-bar.tsx`: chips `h-7→h-9`; `.scroll-fade-x` on filter rows; always show count;
  surface sort on mobile (dropdown-menu). Keep `sticky top-16`.
- `tools-browser.tsx`: replace `sr-only` load-more with a visible ≥44px button on mobile
  (keep IO auto-load on larger screens); skeleton cards on batch append; end-of-results
  marker; richer empty state with a "clear filters" action.

---

### ⬜ Chunk H — Filter UX + ⌘K command palette

- `command-palette.tsx` (`cmdk`): global ⌘K / `/`; fuzzy-search ~70 apps by name/vendor/tag,
  grouped by category → `/apps/[slug]`; quick-actions to category filters, `/workflow`,
  `/contact`. Lazy-loaded; reduced-motion safe.
- Mobile **filter drawer** (`sheet`): all filters + sort, active-filter count badge, apply/clear.
- **Active-filter pills**: removable chip row reflecting `nuqs` state; "clear all" + `sonner` toast.

---

### ⬜ Chunk I — Featured carousel + discovery polish

- `featured-carousel.tsx`: `.scroll-fade-x` mask, desktop prev/next arrows (scroll-by-card),
  scroll-snap position dots, keyboard nav; keep PR #22 `-my-3 py-3` clearance. Optional:
  category quick-jump chip rail that deep-links filter state.

---

### ⬜ Chunk J — Detail pages + sticky mobile action bar

- Extract shared `components/detail/detail-shell.tsx`; adopt in `tools/app-detail.tsx` +
  `apps/project-detail.tsx`.
- **Sticky mobile action bar**: pinned bottom CTA ("Open {app}"), safe-area aware, hidden ≥sm.
- Quick wins: breadcrumb, "copy link" + toast, related rail to shared grid, overflow-proof
  long URLs/tags. SSG must stay intact.

---

### ⬜ Chunk K — Workflow + about responsive polish

- `components/workflow/*`: `.scroll-fade-x` on product/platform tab scrollers; verify
  alternating phase collapse; tighten sticky control bar + mobile spacing via `.section-y`;
  `artifact-frame.tsx` — constrain MDX reading width, code blocks scroll (not the page),
  bump mobile type.
- `/about`: standardize section rhythm; confirm hero CTAs make sense on-route; responsive
  sweep of manifesto + portfolio grid.

---

### ⬜ Chunk L — Global chrome + motion polish

- `site-nav.tsx`: active-route highlighting (`usePathname()`); ⌘K trigger; optional
  scroll-direction hide/show via `use-scroll-threshold`; mobile-sheet parity.
- `site-footer.tsx`: rhythm via `.container-site` / `.section-y`; tidy mobile meta-row.
- Global: subtle route-change scroll-to-top / page transition (reduced-motion safe); skip-link
  first-focusable audit; final scrollbar / `dvh` / safe-area sweep.

---

## After Iteration 5

Remaining `BACKLOG.md` items are mostly `[user]` launch blockers (Vercel env, Resend domain,
vector logo, real copy, Play Store deep links) and post-launch ops (Playwright smoke suite,
Lighthouse-CI, Geist-in-OG, hero particles). Revisit and sequence once Iteration 5 lands.
