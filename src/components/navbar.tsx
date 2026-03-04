"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { company, navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const solid = !isHome || isScrolled || isOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5">
      <div className="mx-auto max-w-6xl">
        <div
          className={cn(
            "hidden items-center justify-between rounded-[2rem] border px-3 py-2.5 transition-all duration-300 sm:px-4 sm:py-3 lg:flex",
            solid
              ? "border-border/80 bg-white/92 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl"
              : "border-border/70 bg-white/88 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.22)] backdrop-blur-xl",
          )}
        >
          <div className="flex min-w-0 items-center">
            <Logo compact />
          </div>
          <nav className="items-center rounded-full border border-border/80 bg-secondary/65 p-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all duration-300",
                  pathname === link.href
                    ? "bg-phoenix-500 text-white shadow-glow"
                    : "text-foreground/72 hover:bg-white hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="items-center gap-2 lg:flex">
            <Button
              asChild
              variant="outline"
              className="border-border/80 bg-white text-foreground hover:border-phoenix-300 hover:text-phoenix-700"
            >
              <Link href={company.mobileHref}>
                <Phone className="size-4" />
                Chiama ora
              </Link>
            </Button>
            <Button asChild className="px-5">
              <Link href="/preventivo">Richiedi preventivo</Link>
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-2xl border border-border/80 bg-white text-foreground shadow-[0_14px_36px_-20px_rgba(15,23,42,0.42)] lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 w-[min(22rem,calc(100vw-2rem))] origin-top rounded-[2rem] border border-border/80 bg-white p-4 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.38)] lg:hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.045,
                    delayChildren: 0.04,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.03,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -8 },
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-sm transition-colors",
                      pathname === link.href
                        ? "bg-phoenix-500 text-white"
                        : "bg-white text-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
