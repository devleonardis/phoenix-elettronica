import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, MapPinned, Phone } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { localSeoPageMap, localSeoPages } from "@/data/local-seo";
import { company } from "@/data/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";

export const dynamicParams = false;

type LocalLandingPageProps = {
  params: Promise<{
    localSlug: string;
  }>;
};

export function generateStaticParams() {
  return localSeoPages.map((page) => ({ localSlug: page.slug }));
}

export async function generateMetadata({
  params,
}: LocalLandingPageProps): Promise<Metadata> {
  const { localSlug } = await params;
  const page = localSeoPageMap[localSlug];

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
  });
}

export default async function LocalLandingPage({ params }: LocalLandingPageProps) {
  const { localSlug } = await params;
  const page = localSeoPageMap[localSlug];

  if (!page) {
    notFound();
  }

  return (
    <div className="pb-20">
      <JsonLd
        data={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Servizi", path: "/servizi" },
            { name: page.title, path: `/${page.slug}` },
          ]),
          createServiceSchema({
            name: page.serviceType,
            description: page.metaDescription,
            path: `/${page.slug}`,
          }),
          createFaqSchema(page.faq),
        ]}
      />

      <section className="bg-charcoal text-white">
        <div className="container pb-16 pt-32 sm:pb-20 sm:pt-36">
          <Badge variant="dark" className="mb-6">
            {page.heroBadge}
          </Badge>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-balance text-4xl font-semibold sm:text-5xl">{page.h1}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{page.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={company.mobileHref}>
                    <Phone className="size-4" />
                    Chiama ora
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link
                    href={{
                      pathname: "/preventivo",
                      query: { servizio: page.serviceType },
                    }}
                  >
                    Richiedi preventivo
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-white/10 bg-white/5 text-white">
                <CardContent className="space-y-3 p-5">
                  <MapPinned className="size-6 text-phoenix-300" />
                  <p className="text-sm font-semibold">Zona</p>
                  <p className="text-sm text-white/70">Bari e provincia</p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/5 text-white">
                <CardContent className="space-y-3 p-5">
                  <Clock3 className="size-6 text-phoenix-300" />
                  <p className="text-sm font-semibold">Risposta</p>
                  <p className="text-sm text-white/70">Tempi definiti in base alla richiesta</p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/5 text-white">
                <CardContent className="space-y-3 p-5">
                  <CheckCircle2 className="size-6 text-phoenix-300" />
                  <p className="text-sm font-semibold">Preventivo</p>
                  <p className="text-sm text-white/70">Chiaro e senza passaggi inutili</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/70 bg-white">
            <CardContent className="space-y-5 p-8">
              <h2 className="text-3xl font-semibold">Cosa facciamo</h2>
              <p className="text-base leading-7 text-muted-foreground">{page.metaDescription}</p>
              <ul className="space-y-4">
                {page.workItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6">
                    <CheckCircle2 className="mt-0.5 size-4 text-phoenix-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-white">
            <CardContent className="space-y-5 p-8">
              <h2 className="text-3xl font-semibold">Per chi</h2>
              <p className="text-base leading-7 text-muted-foreground">
                Interventi pensati per contesti reali e richieste operative locali, con attenzione
                a tempistiche, continuita' del servizio e chiarezza nel rapporto.
              </p>
              <div className="flex flex-wrap gap-3">
                {page.target.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-4 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/70 bg-white">
            <CardContent className="space-y-5 p-8">
              <h2 className="text-3xl font-semibold">Come lavoriamo</h2>
              <ol className="space-y-4">
                <li className="rounded-3xl border border-border bg-secondary/60 p-5 text-sm leading-6">
                  1. Ascoltiamo l'esigenza, analizziamo il contesto e definiamo il sopralluogo.
                </li>
                <li className="rounded-3xl border border-border bg-secondary/60 p-5 text-sm leading-6">
                  2. Proponiamo una soluzione chiara, proporzionata e realmente utile.
                </li>
                <li className="rounded-3xl border border-border bg-secondary/60 p-5 text-sm leading-6">
                  3. Eseguiamo l'intervento con ordine, precisione e attenzione ai dettagli.
                </li>
              </ol>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-white">
            <CardContent className="space-y-5 p-8">
              <h2 className="text-3xl font-semibold">Tempi</h2>
              <ul className="space-y-4">
                {page.timing.map((item) => (
                  <li key={item} className="rounded-3xl border border-border bg-secondary/60 p-5 text-sm leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <Card className="border-border/70 bg-charcoal text-white">
          <CardContent className="space-y-6 p-8 sm:p-10">
            <h2 className="text-3xl font-semibold">Preventivo</h2>
            <p className="max-w-3xl text-lg leading-8 text-white/72">
              Se stai cercando {page.title.toLowerCase()} con un referente tecnico serio e rapido,
              puoi chiamare subito oppure inviare una richiesta dettagliata dal form.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={company.mobileHref}>Chiama ora</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link
                  href={{
                    pathname: "/preventivo",
                    query: { servizio: page.serviceType },
                  }}
                >
                  Richiedi preventivo
                </Link>
              </Button>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-white/72">
              Sede: {company.address}. Tel/Fax {company.phone}. Cell {company.mobile}. Email{" "}
              {company.email}.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container py-4 sm:py-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Domande frequenti</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {page.faq.map((item) => (
              <Card key={item.question} className="border-border/70 bg-white">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-xl font-semibold">{item.question}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
