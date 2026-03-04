"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, MapPinned, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { company } from "@/data/site";

const googleEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&z=17&output=embed`;

export function AddressMapDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full rounded-3xl border border-border/70 bg-white p-6 text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft"
      >
        <p className="text-sm font-medium text-phoenix-600">Indirizzo</p>
        <p className="mt-2 text-lg font-semibold">{company.address}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-phoenix-600">
          Apri mappa
          <MapPinned className="size-4" />
        </p>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_32%),rgba(3,7,18,0.82)] backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <div
              className="fixed inset-0 z-[60] overflow-y-auto px-4 py-6 sm:px-6 sm:py-10"
              onClick={() => setIsOpen(false)}
            >
              <div className="mx-auto flex min-h-full max-w-6xl items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 34, scale: 0.94, rotateX: 8 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98, rotateX: 3 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                  style={{ transformPerspective: 1200 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Card className="overflow-hidden border-white/10 bg-[#f7f3ed] shadow-[0_40px_120px_-32px_rgba(15,23,42,0.6)]">
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-semibold sm:text-3xl">Sede Phoenix Elettronica</h2>
                          <p className="mt-2 max-w-2xl text-muted-foreground">{company.address}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="inline-flex size-11 items-center justify-center rounded-2xl border border-border/80 text-foreground transition-colors hover:bg-secondary"
                          aria-label="Chiudi mappa"
                        >
                          <X className="size-5" />
                        </button>
                      </div>
                      <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-white">
                        <iframe
                          src={googleEmbedUrl}
                          title="Mappa sede Phoenix Elettronica"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="h-[62vh] min-h-[460px] w-full"
                        />
                      </div>
                      <Link
                        href={company.mapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-phoenix-600"
                      >
                        Apri su Google Maps
                        <ExternalLink className="size-4" />
                      </Link>
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
