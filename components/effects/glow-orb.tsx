import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}

export function GlowOrb({
  className,
  color = "var(--color-accent)",
  size = 480,
  opacity = 0.25,
}: Readonly<GlowOrbProps>) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        opacity,
        background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
      }}
    />
  );
}
