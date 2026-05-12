"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";
import { MobileSheet } from "./mobile-sheet";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "ease-out-expo fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-[var(--color-canvas)]/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${brand.name} home`}
        >
          <span className="block h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)] transition-transform group-hover:scale-125" />
          <span className="font-mono text-sm tracking-[0.16em] text-[var(--color-ink)] uppercase">
            {brand.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {brand.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.08em] text-[var(--color-ink-dim)] uppercase transition-colors hover:text-[var(--color-ink)] focus-visible:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <MobileSheet />
      </nav>
    </header>
  );
}
