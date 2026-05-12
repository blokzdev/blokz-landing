import { SiteFooter } from "@/components/footer/site-footer";
import { SiteNav } from "@/components/nav/site-nav";

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
