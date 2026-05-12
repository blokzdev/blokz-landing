import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 } as const;
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #070b14 0%, #0e1424 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(8, 217, 214, 0.5) 0%, rgba(8, 217, 214, 0) 70%)",
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: "110px",
          fontWeight: 700,
          color: "#08D9D6",
          letterSpacing: "-0.05em",
        }}
      >
        B
      </p>
    </div>,
    { ...size },
  );
}
