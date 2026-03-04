import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MouseEventHandler } from "react";

import { iconMap } from "@/components/icon-map";
import type { ServiceItem } from "@/data/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ServiceCardProps = {
  service: ServiceItem;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function ServiceCard({
  service,
  href = `/servizi#${service.slug}`,
  onClick,
}: ServiceCardProps) {
  const Icon = iconMap[service.icon];
  const cardContent = (
    <Card className="flex h-full flex-col border-border/70 bg-white text-left transition-all duration-300 group-hover:-translate-y-1 group-hover:border-phoenix-200 group-hover:shadow-[0_18px_45px_-24px_rgba(249,115,22,0.35)]">
      <CardHeader className="space-y-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-phoenix-50 text-phoenix-600 transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-6" />
        </div>
        <CardTitle className="text-xl leading-tight">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">{service.short}</p>
        <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-phoenix-600 transition-colors group-hover:text-phoenix-700">
          Scopri il servizio
          <ArrowUpRight className="size-4" />
        </div>
      </CardContent>
    </Card>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group block h-full rounded-3xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-phoenix-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Apri il servizio ${service.title}`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-phoenix-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Apri il servizio ${service.title}`}
    >
      {cardContent}
    </Link>
  );
}
