import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-0.5",
  {
    variants: {
      variant: {
        default:
          "bg-white/[0.05] text-[var(--color-ink-dim)] ring-1 ring-inset ring-white/[0.08]",
        accent:
          "bg-[var(--color-accent)]/[0.12] text-[var(--color-accent)] ring-1 ring-inset ring-[var(--color-accent)]/[0.25]",
        success:
          "bg-[var(--color-success)]/[0.12] text-[var(--color-success)] ring-1 ring-inset ring-[var(--color-success)]/[0.25]",
        warn:
          "bg-[var(--color-warn)]/[0.12] text-[var(--color-warn)] ring-1 ring-inset ring-[var(--color-warn)]/[0.25]",
        violet:
          "bg-[var(--color-violet)]/[0.12] text-[var(--color-violet)] ring-1 ring-inset ring-[var(--color-violet)]/[0.25]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
