"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { brand } from "@/data/brand";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";

export function MobileSheet() {
  return (
    <Sheet>
      <SheetTrigger
        className="md:hidden rounded-full p-2 text-[var(--color-ink-dim)] transition-colors hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hot)]"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right">
        <nav aria-label="Mobile">
          <ul className="mt-12 flex flex-col gap-2">
            {brand.nav.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="block rounded-md px-4 py-3 font-mono text-sm uppercase tracking-[0.08em] text-[var(--color-ink-dim)] transition-colors hover:bg-white/[0.04] hover:text-[var(--color-ink)]"
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
