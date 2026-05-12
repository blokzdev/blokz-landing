// TODO(user): rewrite copy to your voice before launch — tracked in BACKLOG.md.
// Keep `body` ≤ 2 short sentences; the magazine grid in
// components/manifesto/manifesto.tsx handles ≤ 7 principles automatically.

export interface Principle {
  id: string;
  number: string;
  title: string;
  body: string;
}

export const principles: ReadonlyArray<Principle> = [
  {
    id: "ship",
    number: "01",
    title: "Ship, then iterate.",
    body: "Working code beats perfect plans. We deploy daily, learn from production, refine in tight loops.",
  },
  {
    id: "decentralization-is-ux",
    number: "02",
    title: "Decentralization is a UX problem.",
    body: "Web3 won't win on principle. We bridge the gap between crypto's promise and software people actually want to use.",
  },
  {
    id: "agent-led",
    number: "03",
    title: "Prompt the architect, write the proof.",
    body: "Claude drafts; humans ratify. Every line touched gets reviewed, every behaviour verified, every assumption tested.",
  },
  {
    id: "open-by-default",
    number: "04",
    title: "Open by default.",
    body: "Source, specs, and prompts public whenever the law and the customer allow. The workflow only compounds when shared.",
  },
  {
    id: "multi-platform",
    number: "05",
    title: "Multi-platform, single voice.",
    body: "Same product on Android, web, Windows, iOS — same tone, same primitives, same opinionated defaults.",
  },
];
