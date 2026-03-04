import type { Metadata } from "next";
import Link from "next/link";

import { AddressMapDialog } from "@/components/address-map-dialog";
import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/forms/contact-form";
import { iconMap } from "@/components/icon-map";
import { JsonLd } from "@/components/json-ld";
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { company, contactOptions } from "@/data/site";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contatti elettricista a Bari",
  description:
    "Contatta Phoenix Elettronica a Bari per impianti elettrici, videosorveglianza, citofonia, automazioni e richieste di preventivo.",
  path: "/contatti",
});

export default function ContactsPage() {
  const quickContacts = contactOptions.filter((item) => item.title !== "Sede");

  return (
    <div className="pb-20">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contatti", path: "/contatti" },
        ])}
      />
      <AnimatedSection className="container py-32 sm:py-36">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <Card className="border-border/70 bg-secondary/60">
            <CardContent className="space-y-8 p-8">
              <div className="space-y-5">
                {quickContacts.map((item) => {
                  const Icon = iconMap[item.icon];

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-start gap-4 rounded-3xl border border-border/70 bg-white p-5 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-phoenix-50 text-phoenix-600">
                        <Icon className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-phoenix-600">{item.title}</p>
                        <p className="text-lg font-semibold text-foreground">{item.value}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <AddressMapDialog />

              <div className="rounded-3xl border border-border/70 bg-white p-6">
                <p className="text-sm font-medium text-phoenix-600">Orari</p>
                <p className="mt-2 text-base text-muted-foreground">Lun-Ven 08:30-13:00 / 15:30-19:00</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-white">
            <CardContent className="p-8">
              <SectionTitle
                title="Invia la richiesta"
                description="Compila il form e raccontaci brevemente la richiesta."
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>
    </div>
  );
}
