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
- [ ] **[debt]** `lucide-react@1.14.0` resolved during install; the canonical stable range is `0.x`. Build/typecheck pass and our usage (`Menu`, `X`) compiles, but verify we're on the canonical package and not a fork before launch. Pin to a known-good version if so.
- [ ] **[debt]** `README.md` is still the Next.js scaffold default. Rewrite in Phase 6 with project intro, commands, contribution notes, and a link to `CLAUDE.md`.
- [ ] **[polish]** `app/icon.tsx` not yet authored — currently shipping the scaffold's `app/favicon.ico`. Generate a dynamic icon from the brand monogram in Phase 5.
- [ ] **[polish]** Service worker / full PWA installability skipped for v1 per plan. Revisit if mobile install rate becomes a stated goal.
- [ ] **[polish]** ESLint flat config doesn't enforce import order. Add `eslint-plugin-import` with `import/order` if import churn becomes painful in PR reviews.
- [ ] **[polish]** Seed one `oss-repo` placeholder card in `data/projects.ts` with `status: "coming-soon"` so the OSS card variant ships exercised at launch. (Phase 3 will create the card variant; this seeds it.)

## Phase 2 (R3F hero + manifesto)

_(empty — will fill as items surface)_

## Phase 3 (apps showcase)

_(empty)_

## Phase 4 (workflow page)

_(empty)_

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
