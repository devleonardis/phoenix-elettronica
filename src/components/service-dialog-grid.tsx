"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { company, services, type ServiceItem } from "@/data/site";

export function ServiceDialogGrid() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (!activeService) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeService]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            onClick={() => setActiveService(service)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeService ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-charcoal/72 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
            />
            <div
              className="fixed inset-0 z-[60] overflow-y-auto px-4 py-6 sm:px-6 sm:py-10"
              onClick={() => setActiveService(null)}
            >
              <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Card className="overflow-hidden border-white/10 bg-white shadow-[0_32px_90px_-28px_rgba(15,23,42,0.45)]">
                    <CardContent className="p-6 sm:p-8">
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setActiveService(null)}
                          className="inline-flex size-11 items-center justify-center rounded-2xl border border-border/80 text-foreground transition-colors hover:bg-secondary"
                          aria-label="Chiudi dettaglio servizio"
                        >
                          <X className="size-5" />
                        </button>
                      </div>

                      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
                        <div className="space-y-4">
                          <h2 className="text-3xl font-semibold sm:text-4xl">
                            {activeService.title}
                          </h2>
                          <p className="text-base leading-7 text-muted-foreground">
                            {activeService.detail}
                          </p>
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Button asChild>
                              <Link
                                href={{
                                  pathname: "/preventivo",
                                  query: { servizio: activeService.slug },
                                }}
                              >
                                Richiedi preventivo
                                <ArrowRight className="size-4" />
                              </Link>
                            </Button>
                            <Button asChild variant="outline">
                              <Link href={company.mobileHref}>Chiama ora</Link>
                            </Button>
                          </div>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                          <div className="rounded-[1.75rem] border border-border bg-secondary/60 p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-phoenix-600">
                              Cosa include
                            </p>
                            <ul className="mt-5 space-y-4">
                              {activeService.includes.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm leading-6">
                                  <CheckCircle2 className="mt-0.5 size-4 text-phoenix-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-5">
                            <div className="rounded-[1.75rem] border border-border bg-secondary/60 p-6">
                              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-phoenix-600">
                                Per chi e'
                              </p>
                              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {activeService.audience}
                              </p>
                            </div>
                            <div className="rounded-[1.75rem] border border-border bg-secondary/60 p-6">
                              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-phoenix-600">
                                Tempi indicativi
                              </p>
                              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {activeService.timing}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
