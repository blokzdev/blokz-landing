"use client";

import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { useState } from "react";

// Defer the Radix-Dialog-backed sheet body until the menu button is first
// pressed. Saves ~30 KB First Load JS on every route while keeping the
// trigger interactive from initial paint.
const MobileSheetPortal = dynamic(
  () => import("./mobile-sheet-portal").then((m) => m.MobileSheetPortal),
  { ssr: false },
);

export function MobileSheet() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleOpen = () => {
    setMounted(true);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="rounded-full p-2 text-[var(--color-ink-dim)] transition-colors hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)] focus-visible:outline-none md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      {mounted && <MobileSheetPortal open={open} onOpenChange={setOpen} />}
    </>
  );
}
