import type { AppCategory } from "./app";

export interface SponsoredLink {
  url: string;
  label: string;
}

export interface SponsoredSlot {
  id: string;
  sponsored: true;
  name: string;
  tagline: string;
  description: string;
  promotedBy: string;
  category?: AppCategory;
  accentColor?: string;
  link: SponsoredLink;
  tracking?: {
    impressionPixel?: string;
    clickPixel?: string;
  };
}
