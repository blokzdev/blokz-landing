"use client";

import Link from "next/link";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { brand } from "@/data/brand";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Lazy-loaded mobile-sheet body. Imported on first menu click so the
 * Radix Dialog chunk (~30 KB) stays out of every route's First Load JS.
 * See components/nav/mobile-sheet.tsx for the trigger.
 */
export function MobileSheetPortal({ open, onOpenChange }: Readonly<Props>) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <nav aria-label="Mobile">
          <ul className="mt-12 flex flex-col gap-2">
            {brand.nav.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="block rounded-md px-4 py-3 font-mono text-sm tracking-[0.08em] text-[var(--color-ink-dim)] uppercase transition-colors hover:bg-white/[0.04] hover:text-[var(--color-ink)]"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
