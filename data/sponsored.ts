import type { SponsoredSlot } from "@/types/sponsored";

export const sponsored: ReadonlyArray<SponsoredSlot> = [
  {
    id: "blokz-hire-2026",
    sponsored: true,
    name: "Building an AI app?",
    tagline: "Hire Blokz to ship it end-to-end.",
    description:
      "Vibecoding studio building production AI apps for B2B + B2C. Research-rooted, multi-model, end-to-end with Claude Code. We pitch, scope, build, and ship.",
    promotedBy: "Blokz",
    accentColor: "#08D9D6",
    link: {
      url: "/contact?subject=Hire+Blokz",
      label: "Pitch us",
    },
  },
];
