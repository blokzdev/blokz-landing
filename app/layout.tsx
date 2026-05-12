import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LenisProvider } from "@/components/effects/lenis-provider";
import { ReducedMotionProvider } from "@/components/effects/reduced-motion-provider";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { SiteNav } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#070b14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-motion="full"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[999] focus:rounded-md focus:bg-[var(--color-accent)] focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.08em] focus:text-[var(--color-canvas)]"
        >
          Skip to content
        </a>
        <ReducedMotionProvider>
          <LenisProvider>
            <SiteNav />
            <main id="main">{children}</main>
            <SiteFooter />
            <NoiseOverlay />
          </LenisProvider>
        </ReducedMotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
