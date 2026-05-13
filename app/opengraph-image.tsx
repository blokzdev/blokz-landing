import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blokz.dev — vibecoded apps, shipping web3 forward.";

export default function Image() {
  return renderOgImage({
    eyebrow: "// AI app studio",
    titleA: "Vibecoded apps.",
    titleB: "AI at the frontier.",
  });
}
