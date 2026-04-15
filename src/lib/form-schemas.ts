import { z } from "zod";

import { serviceOptions, urgencyOptions } from "@/data/site";

const serviceValues = serviceOptions.map((option) => option.value);
const urgencyValues = urgencyOptions.map((option) => option.value);

export const quoteAttachmentConfig = {
  maxFiles: 5,
  maxFileSize: 20 * 1024 * 1024,
  acceptedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
  ],
  acceptedFileExtensions: [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"],
} as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Inserisci il nome"),
  phone: z.string().min(6, "Inserisci un numero valido"),
  email: z.email("Inserisci una email valida"),
  service: z.string().refine((value) => serviceValues.includes(value), {
    message: "Seleziona un servizio",
  }),
  message: z.string().min(10, "Aggiungi qualche dettaglio in piu'"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  name: z.string().min(2, "Inserisci il nome"),
  phone: z.string().min(6, "Inserisci un numero valido"),
  email: z.email("Inserisci una email valida"),
  service: z.string().refine((value) => serviceValues.includes(value), {
    message: "Seleziona il servizio",
  }),
  urgency: z.string().refine((value) => urgencyValues.includes(value), {
    message: "Seleziona l'urgenza",
  }),
  area: z.string().min(2, "Indica la zona"),
  description: z.string().min(12, "Aggiungi un minimo di dettagli"),
  privacy: z.boolean().refine((value) => value, {
    message: "Devi accettare il consenso privacy",
  }),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export type QuoteEmailAttachment = {
  content: Buffer;
  contentType: string;
  filename: string;
};

export type QuoteEmailPayload = QuoteFormValues & {
  attachments?: QuoteEmailAttachment[];
};
