"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services, serviceOptions, urgencyOptions } from "@/data/site";
import { quoteSchema, type QuoteFormValues } from "@/lib/form-schemas";

function resolveServiceValue(rawValue: string | null) {
  if (!rawValue) {
    return "";
  }

  const resolvedService = services.find(
    (service) => service.slug === rawValue || service.title === rawValue,
  );

  return resolvedService?.title ?? "";
}

export function QuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedService = resolveServiceValue(searchParams.get("servizio"));
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: selectedService,
      urgency: "",
      area: "",
      description: "",
      privacy: false,
    },
  });

  useEffect(() => {
    if (
      selectedService &&
      serviceOptions.some((option) => option.value === selectedService)
    ) {
      setValue("service", selectedService, {
        shouldValidate: true,
        shouldDirty: false,
      });
    }
  }, [selectedService, setValue]);

  const onSubmit = async (values: QuoteFormValues) => {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = (await response.json()) as { ok: boolean; error?: string };

    if (!response.ok || !result.ok) {
      toast.error("Invio non riuscito", {
        description: result.error ?? "Riprova tra qualche minuto.",
      });
      return;
    }

    toast.success("Preventivo inviato", {
      description: "Ti portiamo alla conferma della richiesta.",
    });

    const params = new URLSearchParams({
      servizio: values.service,
      urgenza: values.urgency,
      zona: values.area,
      nome: values.name,
    });

    router.push(`/preventivo/grazie?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="quote-name">Nome e cognome</Label>
          <Input id="quote-name" placeholder="Il tuo nome" {...register("name")} />
          {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quote-phone">Telefono</Label>
          <Input id="quote-phone" placeholder="Numero di contatto" {...register("phone")} />
          {errors.phone ? <p className="text-sm text-red-600">{errors.phone.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="quote-email">Email</Label>
          <Input id="quote-email" type="email" placeholder="nome@email.it" {...register("email")} />
          {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quote-area">Zona</Label>
          <Input id="quote-area" placeholder="Bari, Modugno, Bitonto..." {...register("area")} />
          {errors.area ? <p className="text-sm text-red-600">{errors.area.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Tipo di servizio</Label>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger aria-label="Seleziona il tipo di servizio">
                  <SelectValue placeholder="Scegli il servizio" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.service ? <p className="text-sm text-red-600">{errors.service.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Urgenza</Label>
          <Controller
            control={control}
            name="urgency"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger aria-label="Seleziona l'urgenza">
                  <SelectValue placeholder="Livello di urgenza" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.urgency ? <p className="text-sm text-red-600">{errors.urgency.message}</p> : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="quote-description">Descrizione richiesta</Label>
        <Textarea
          id="quote-description"
          placeholder="Spiega il problema o l'intervento richiesto. Se utile, aggiungi dettagli su accessi, impianto esistente o tempistiche."
          {...register("description")}
        />
        {errors.description ? (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 size-4 rounded border-border text-phoenix-500 focus:ring-phoenix-400"
            {...register("privacy")}
          />
          <span>
            Dichiaro di aver letto la{" "}
            <Link href="/privacy-policy" className="font-medium text-phoenix-600 hover:text-phoenix-700">
              privacy policy
            </Link>{" "}
            e acconsento al trattamento dei dati per essere ricontattato in merito alla richiesta.
          </span>
        </label>
        {errors.privacy ? <p className="text-sm text-red-600">{errors.privacy.message}</p> : null}
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Invio in corso..." : "Richiedi preventivo"}
      </Button>
    </form>
  );
}
