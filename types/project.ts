export type ProjectType =
  | "android-app"
  | "ios-app"
  | "web-app"
  | "desktop-app"
  | "oss-repo"
  | "library"
  | "service";

export type ProjectStatus = "live" | "beta" | "coming-soon" | "deprecated" | "archived";

export type Chain =
  | "bitcoin"
  | "ethereum"
  | "bsc"
  | "tron"
  | "polygon"
  | "solana"
  | "multi-chain"
  | "n-a";

export type Platform = "android" | "ios" | "web" | "windows" | "macos" | "linux" | "cross-platform";

export type LinkKind =
  | "play-store"
  | "app-store"
  | "github"
  | "gitlab"
  | "website"
  | "docs"
  | "demo"
  | "download"
  | "npm"
  | "discord"
  | "telegram"
  | "video";

export type ProjectCategory = "explorer" | "wallet" | "messaging" | "tool" | "infra" | "experiment";

export type StatKind =
  | "downloads"
  | "rating"
  | "reviews"
  | "stars"
  | "forks"
  | "users"
  | "tvl"
  | "version"
  | "custom";

export interface ProjectLink {
  kind: LinkKind;
  url: string;
  label?: string;
  primary?: boolean;
}

export interface ProjectStat {
  kind: StatKind;
  value: string;
  raw?: number;
  label?: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  device?: "phone" | "tablet" | "desktop";
}

export interface ProjectMedia {
  icon: string;
  cover?: string;
  screenshots?: ReadonlyArray<ProjectScreenshot>;
  video?: string;
  accentColor?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  platforms: ReadonlyArray<Platform>;
  chains: ReadonlyArray<Chain>;
  category?: ProjectCategory;
  tags?: ReadonlyArray<string>;
  media: ProjectMedia;
  stats: ReadonlyArray<ProjectStat>;
  links: ReadonlyArray<ProjectLink>;
  launchedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  hasLongForm?: boolean;
}
