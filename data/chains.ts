import type { Chain } from "@/types/project";

export interface ChainMeta {
  id: Chain;
  label: string;
  short: string;
  color: string;
}

export const chains: Record<Chain, ChainMeta> = {
  bitcoin: { id: "bitcoin", label: "Bitcoin", short: "BTC", color: "#F7931A" },
  ethereum: { id: "ethereum", label: "Ethereum", short: "ETH", color: "#627EEA" },
  bsc: { id: "bsc", label: "BNB Chain", short: "BSC", color: "#F0B90B" },
  tron: { id: "tron", label: "TRON", short: "TRX", color: "#FF060A" },
  polygon: { id: "polygon", label: "Polygon", short: "POL", color: "#8247E5" },
  solana: { id: "solana", label: "Solana", short: "SOL", color: "#14F195" },
  "multi-chain": {
    id: "multi-chain",
    label: "Multi-chain",
    short: "MULTI",
    color: "#08D9D6",
  },
  "n-a": {
    id: "n-a",
    label: "Protocol",
    short: "N/A",
    color: "#A78BFA",
  },
};
