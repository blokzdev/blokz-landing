import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blokz.dev — Apps, repos, tools.";

export default function Image() {
  return renderOgImage({
    eyebrow: "Apps · Repos · Tools",
    titleA: "Everything",
    titleB: "we've shipped.",
  });
}
