import type { MetadataRoute } from "next";
import { brand } from "@/data/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.legalName,
    short_name: brand.name,
    description: brand.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#070b14",
    theme_color: "#070b14",
    icons: [],
  };
}
