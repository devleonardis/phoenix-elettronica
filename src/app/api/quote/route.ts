import { NextResponse } from "next/server";

import {
  quoteAttachmentConfig,
  quoteSchema,
  type QuoteEmailAttachment,
} from "@/lib/form-schemas";
import { sendQuoteEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      urgency: String(formData.get("urgency") ?? ""),
      area: String(formData.get("area") ?? ""),
      description: String(formData.get("description") ?? ""),
      privacy: formData.get("privacy") === "true",
    };
    const data = quoteSchema.parse(payload);
    const files = formData
      .getAll("photos")
      .filter((value): value is File => value instanceof File && value.size > 0);
    validateAttachments(files);
    const attachments = await Promise.all(files.map(toAttachment));

    await sendQuoteEmail({ ...data, attachments });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { ok: false, error: "Dati non validi." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Invio non riuscito. Riprova tra qualche minuto.",
      },
      { status: 500 },
    );
  }
}

function validateAttachments(files: File[]) {
  if (files.length > quoteAttachmentConfig.maxFiles) {
    throw new Error(`Puoi allegare fino a ${quoteAttachmentConfig.maxFiles} foto.`);
  }

  for (const file of files) {
    if (!quoteAttachmentConfig.acceptedMimeTypes.includes(file.type as never)) {
      throw new Error("Carica solo immagini JPG, PNG, WEBP o HEIC.");
    }

    if (file.size > quoteAttachmentConfig.maxFileSize) {
      throw new Error("Ogni foto deve essere al massimo di 20 MB.");
    }
  }
}

async function toAttachment(file: File): Promise<QuoteEmailAttachment> {
  return {
    filename: sanitizeFilename(file.name),
    content: Buffer.from(await file.arrayBuffer()),
    contentType: file.type || "application/octet-stream",
  };
}

function sanitizeFilename(filename: string) {
  const normalized = filename.trim().replace(/\s+/g, "-");
  const cleaned = normalized.replace(/[^a-zA-Z0-9._-]/g, "");

  return cleaned || "foto-allegata";
}
