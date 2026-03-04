"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { CallBar } from "@/components/call-bar";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isMinimalQuoteFlow = pathname.startsWith("/preventivo");

  if (isMinimalQuoteFlow) {
    return <main className="overflow-x-clip">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip pb-16 md:pb-0">{children}</main>
      <Footer />
      <CallBar />
    </>
  );
}
