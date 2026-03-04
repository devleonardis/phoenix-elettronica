import Link from "next/link";
import { FileText, Phone } from "lucide-react";

import { company } from "@/data/site";

export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-2 z-40 px-3 md:hidden">
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-1.5 rounded-[1.75rem] border border-white/15 bg-charcoal/95 p-1.5 shadow-soft backdrop-blur">
        <Link
          href={company.mobileHref}
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-phoenix-500 px-3 text-sm font-semibold text-white"
          aria-label="Chiama Phoenix Elettronica"
        >
          <Phone className="size-3.5" />
          Chiama
        </Link>
        <Link
          href="/preventivo"
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-white px-3 text-sm font-semibold text-charcoal"
          aria-label="Richiedi un preventivo a Phoenix Elettronica"
        >
          <FileText className="size-3.5" />
          Preventivo
        </Link>
      </div>
    </div>
  );
}
