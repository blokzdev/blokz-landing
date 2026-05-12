import { ImageResponse } from "next/og";
import type { ReactElement } from "react";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

export interface OgConfig {
  /** Small mono uppercase tag above the title. */
  eyebrow: string;
  /** Ink-coloured first line. */
  titleA: string;
  /** Accent-coloured second line. */
  titleB: string;
}

export async function renderOgImage(config: OgConfig) {
  return new ImageResponse(<OgTemplate {...config} />, { ...OG_SIZE });
}

function OgTemplate({ eyebrow, titleA, titleB }: OgConfig): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #070b14 0%, #0e1424 55%, #070b14 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Accent bloom in the corner */}
      <div
        style={{
          position: "absolute",
          top: "-220px",
          right: "-220px",
          width: "640px",
          height: "640px",
          background:
            "radial-gradient(circle, rgba(8, 217, 214, 0.28) 0%, rgba(8, 217, 214, 0) 70%)",
        }}
      />
      {/* Violet glow on the opposite side */}
      <div
        style={{
          position: "absolute",
          bottom: "-160px",
          left: "-160px",
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, rgba(167, 139, 250, 0) 70%)",
        }}
      />

      {/* Brand mark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          color: "#E8F1F8",
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#08D9D6",
            boxShadow: "0 0 24px #08D9D6",
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: "20px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Blokz.dev
        </p>
      </div>

      {/* Middle slab */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
          marginBottom: "auto",
          paddingTop: "32px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#08D9D6",
            fontSize: "22px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: "32px",
          }}
        >
          {eyebrow}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "108px",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "#E8F1F8",
            fontWeight: 600,
          }}
        >
          {titleA}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "108px",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "#08D9D6",
            fontWeight: 600,
          }}
        >
          {titleB}
        </p>
      </div>

      {/* Bottom footer line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          color: "#8FA3BA",
          fontSize: "18px",
          fontFamily: "monospace",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(8, 217, 214, 0), rgba(8, 217, 214, 0.5), rgba(8, 217, 214, 0))",
          }}
        />
        <span>blokz.dev</span>
      </div>
    </div>
  );
}
