import type { Project } from "@/types/project";

// TODO(user): replace blanket developer-page URL with per-app Play Store deep
// links (`details?id=<packageId>`). Tracked in BACKLOG.md. Only Blockscan has
// a verified package id (`com.bdc.blockscan.app`).
const DEV_PAGE = "https://play.google.com/store/apps/dev?id=8878695474933625157";
const BLOCKSCAN_DEEP = "https://play.google.com/store/apps/details?id=com.bdc.blockscan.app";

export const projects: ReadonlyArray<Project> = [
  {
    slug: "blockchair",
    name: "Blockchair",
    tagline: "Multi-chain explorer powered by Blockchair.",
    description:
      "Search blocks, transactions, contracts, and tokens across 17+ chains from your pocket.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["multi-chain"],
    category: "explorer",
    featured: true,
    media: { icon: "/projects/blockchair/icon.png", accentColor: "#08D9D6" },
    stats: [
      { kind: "rating", value: "4.5", raw: 4.5 },
      { kind: "downloads", value: "10K+", raw: 10000 },
    ],
    links: [
      { kind: "play-store", url: DEV_PAGE, primary: true },
      { kind: "website", url: "https://blockchair.com" },
    ],
  },
  {
    slug: "bitcoin-explorer",
    name: "Bitcoin Explorer",
    tagline: "The mempool.space explorer, native on Android.",
    description:
      "Real-time mempool view, fee suggestions, and full block + transaction history for the Bitcoin network.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["bitcoin"],
    category: "explorer",
    media: { icon: "/projects/bitcoin-explorer/icon.png", accentColor: "#F7931A" },
    stats: [{ kind: "rating", value: "4.6", raw: 4.6 }],
    links: [
      { kind: "play-store", url: DEV_PAGE, primary: true },
      { kind: "website", url: "https://mempool.space" },
    ],
  },
  {
    slug: "blockexplorer",
    name: "BlockExplorer",
    tagline: "The classic Bitcoin explorer, reimagined for mobile.",
    description:
      "Browse blocks and transactions on the Bitcoin network with a fast, no-nonsense interface.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["bitcoin"],
    category: "explorer",
    media: { icon: "/projects/blockexplorer/icon.png", accentColor: "#F7931A" },
    stats: [{ kind: "rating", value: "4.2", raw: 4.2 }],
    links: [{ kind: "play-store", url: DEV_PAGE, primary: true }],
  },
  {
    slug: "bsctrace",
    name: "BSCTrace",
    tagline: "BNB Chain explorer in your pocket.",
    description: "Track addresses, validators, and BEP-20 tokens on BNB Smart Chain via BscScan.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["bsc"],
    category: "explorer",
    media: { icon: "/projects/bsctrace/icon.png", accentColor: "#F0B90B" },
    stats: [{ kind: "rating", value: "4.5", raw: 4.5 }],
    links: [
      { kind: "play-store", url: DEV_PAGE, primary: true },
      { kind: "website", url: "https://bscscan.com" },
    ],
  },
  {
    slug: "viewblock",
    name: "ViewBlock",
    tagline: "Cross-chain explorer powered by ViewBlock.",
    description: "Browse Ethereum, Zilliqa, Hedera, and more from a single mobile-first interface.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["multi-chain"],
    category: "explorer",
    media: { icon: "/projects/viewblock/icon.png", accentColor: "#08D9D6" },
    stats: [{ kind: "rating", value: "4.6", raw: 4.6 }],
    links: [
      { kind: "play-store", url: DEV_PAGE, primary: true },
      { kind: "website", url: "https://viewblock.io" },
    ],
  },
  {
    slug: "blockscan",
    name: "Blockscan",
    tagline: "Universal block explorer for Etherscan-family chains.",
    description:
      "One app, every Etherscan-family explorer — Ethereum, BNB, Polygon, Optimism, Arbitrum, Base, and more.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["multi-chain"],
    category: "explorer",
    featured: true,
    media: { icon: "/projects/blockscan/icon.png", accentColor: "#08D9D6" },
    stats: [{ kind: "rating", value: "4.5", raw: 4.5 }],
    links: [
      { kind: "play-store", url: BLOCKSCAN_DEEP, primary: true },
      { kind: "website", url: "https://blockscan.com" },
    ],
  },
  {
    slug: "etherscan",
    name: "Etherscan",
    tagline: "The flagship Ethereum explorer, mobile-native.",
    description:
      "Wallets, contracts, NFTs, tokens, and gas prices on Ethereum mainnet — straight from Etherscan.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["ethereum"],
    category: "explorer",
    media: { icon: "/projects/etherscan/icon.png", accentColor: "#627EEA" },
    stats: [{ kind: "rating", value: "4.2", raw: 4.2 }],
    links: [
      { kind: "play-store", url: DEV_PAGE, primary: true },
      { kind: "website", url: "https://etherscan.io" },
    ],
  },
  {
    slug: "tron-explorer",
    name: "TRON Explorer",
    tagline: "Tronscan in your hand.",
    description:
      "Real-time TRON network activity — blocks, witnesses, TRC-20 tokens, and account history.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["tron"],
    category: "explorer",
    media: { icon: "/projects/tron-explorer/icon.png", accentColor: "#FF060A" },
    stats: [{ kind: "rating", value: "4.5", raw: 4.5 }],
    links: [
      { kind: "play-store", url: DEV_PAGE, primary: true },
      { kind: "website", url: "https://tronscan.org" },
    ],
  },
  {
    slug: "slyfox",
    name: "SlyFox",
    tagline: "Encrypted, on-chain messaging.",
    description:
      "Blockchain-anchored mailboxes — send and receive end-to-end encrypted messages using only a wallet address.",
    type: "android-app",
    status: "live",
    platforms: ["android"],
    chains: ["n-a"],
    category: "messaging",
    featured: true,
    media: { icon: "/projects/slyfox/icon.png", accentColor: "#A78BFA" },
    stats: [{ kind: "rating", value: "4.5", raw: 4.5 }],
    links: [{ kind: "play-store", url: DEV_PAGE, primary: true }],
  },
  // OSS placeholder so the OSS card variant ships exercised at launch.
  // TODO(user): replace with the first real OSS repo once published.
  {
    slug: "blokz-oss",
    name: "Open source incoming",
    tagline: "The first Blokz OSS repo drops soon.",
    description:
      "We're publishing the tooling we build for ourselves — explorer kits, prompt libraries, and shaped pieces of the agent workflow. Stay tuned.",
    type: "oss-repo",
    status: "coming-soon",
    platforms: ["cross-platform"],
    chains: ["n-a"],
    category: "tool",
    media: { icon: "/projects/blokz-oss/icon.png", accentColor: "#A78BFA" },
    stats: [{ kind: "custom", value: "soon", label: "ETA" }],
    links: [{ kind: "github", url: "https://github.com/blokzdev", primary: true }],
  },
  // Web-app placeholder so the Web card variant ships exercised. First Blokz
  // AI app for B2B/B2C — research-rooted, edge-aware, agentic.
  // TODO(user): replace with the first real AI product once announced.
  {
    slug: "blokz-ai-incoming",
    name: "AI app in motion",
    tagline: "First Blokz AI app — research-rooted, agentic, in production.",
    description:
      "We're building production-grade AI apps for B2B and B2C — grounded in current research on edge models, multi-agent systems, memory, and retrieval. First reveal coming soon.",
    type: "web-app",
    status: "coming-soon",
    platforms: ["web", "cross-platform"],
    chains: ["n-a"],
    category: "experiment",
    media: { icon: "/projects/blokz-ai-incoming/icon.png", accentColor: "#A78BFA" },
    stats: [{ kind: "custom", value: "soon", label: "ETA" }],
    links: [{ kind: "website", url: "https://blokz.dev/contact", primary: true }],
  },
];
