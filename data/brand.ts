export const brand = {
  name: "Blokz",
  legalName: "Blokz Development Co.",
  domain: "blokz.dev",
  tagline: "Apps for a decentralized, transparent, sustainable future.",
  positioning:
    "We design, prompt, and ship production-grade blockchain tools — built end-to-end with Claude Code.",
  headline: {
    eyebrow: "BLOKZ.DEV // VIBECODING STUDIO",
    title: "Vibecoded apps.",
    titleAccent: "Shipping web3 forward.",
    sub: "We design, prompt, and ship production-grade blockchain tools — built end-to-end with Claude Code.",
  },
  logo: {
    src: "https://cdn.glitch.global/d470e077-214b-4bf9-ac27-4933bce2a4c9/blokz-logo-circle-blue-640px.png?v=1676232520196",
    alt: "Blokz logo",
    width: 640,
    height: 640,
  },
  social: {
    telegram: "https://t.me/blokzdev",
    github: "https://github.com/blokzdev",
    linkedin: "https://www.linkedin.com/company/blokz/",
    twitter: "https://twitter.com/blokzdev/",
    gdev: "https://g.dev/blokz",
    email: "team@blokz.dev",
    playStore: "https://play.google.com/store/apps/dev?id=8878695474933625157",
    flowPage: "https://flow.page/blokz",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/apps", label: "Apps" },
    { href: "/workflow", label: "Workflow" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type Brand = typeof brand;
