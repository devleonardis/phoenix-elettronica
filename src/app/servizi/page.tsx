import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { JsonLd } from "@/components/json-ld";
import { ServiceDialogGrid } from "@/components/service-dialog-grid";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Servizi elettrici ed elettronici a Bari",
  description:
    "Scopri i servizi Phoenix Elettronica a Bari: manutenzione condomini, videosorveglianza, citofonia, automazioni, reti LAN e impianti elettrici.",
  path: "/servizi",
});

export default function ServicesPage() {
  return (
    <div className="bg-charcoal pb-28 pt-32 text-white md:pb-20 sm:pt-36">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Servizi", path: "/servizi" },
        ])}
      />
      <AnimatedSection className="py-8 sm:py-10">
        <div className="container">
          <ServiceDialogGrid />
        </div>
      </AnimatedSection>
    </div>
  );
}
