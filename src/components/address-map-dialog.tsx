"use client";

import { AnimatePresence, motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import Link from "next/link";
import { ExternalLink, MapPinned, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { company } from "@/data/site";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export function AddressMapDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

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

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current || !mapboxToken || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [company.coordinates.lng, company.coordinates.lat],
      zoom: 14.2,
      pitch: 18,
      bearing: 12,
      antialias: true,
      config: {
        basemap: {
          theme: "faded",
          lightPreset: "dusk",
        },
      },
    });

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

    const markerElement = document.createElement("div");
    markerElement.className = "map-pin-marker";
    markerElement.innerHTML = '<span class="map-pin-pulse"></span><span class="map-pin-core"></span>';

    new mapboxgl.Marker({ element: markerElement, anchor: "bottom" })
      .setLngLat([company.coordinates.lng, company.coordinates.lat])
      .addTo(map);

    map.on("load", () => {
      map.easeTo({
        center: [company.coordinates.lng, company.coordinates.lat],
        zoom: 17.15,
        pitch: 68,
        bearing: -34,
        duration: 3200,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
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
          Apri mappa 3D
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
                          <div className="inline-flex items-center gap-2 rounded-full border border-phoenix-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-700">
                            <Sparkles className="size-3.5" />
                            Vista 3D
                          </div>
                          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Sede Phoenix Elettronica</h2>
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

                      {mapboxToken ? (
                        <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-charcoal">
                          <div className="pointer-events-none absolute hidden" />
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#f7f3ed]/18 to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#020617]/55 to-transparent" />
                            <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-2xl border border-white/12 bg-charcoal/70 px-4 py-3 text-white backdrop-blur">
                              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Bari</p>
                              <p className="mt-1 text-sm font-semibold">Via Papa Innocenzo XII, 19</p>
                            </div>
                            <div ref={mapContainerRef} className="h-[62vh] min-h-[460px] w-full" />
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-[1.75rem] border border-border/70 bg-secondary/60 p-8">
                          <p className="text-lg font-semibold">Mappa 3D non configurata</p>
                          <p className="mt-3 text-muted-foreground">
                            Per attivarla serve impostare `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`.
                          </p>
                          <Link
                            href={company.mapsHref}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-phoenix-600"
                          >
                            Apri comunque su Google Maps
                            <ExternalLink className="size-4" />
                          </Link>
                        </div>
                      )}
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
