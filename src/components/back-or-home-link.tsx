"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackOrHomeLinkProps = {
  fallbackHref?: string;
  label?: string;
};

export function BackOrHomeLink({
  fallbackHref = "/",
  label = "Torna indietro",
}: BackOrHomeLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" />
      {label}
    </button>
  );
}
