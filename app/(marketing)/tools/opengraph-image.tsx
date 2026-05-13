import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blokz.dev — Tools we use.";

export default function Image() {
  return renderOgImage({
    eyebrow: "Tools we use",
    titleA: "Our AI stack,",
    titleB: "curated.",
  });
}
