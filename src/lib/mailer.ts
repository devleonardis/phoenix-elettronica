import nodemailer from "nodemailer";

import { siteConfig } from "@/lib/site";
import type { ContactFormValues, QuoteFormValues } from "@/lib/form-schemas";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
const smtpSecure = process.env.SMTP_SECURE !== "false";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

function requireMailEnv() {
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error(
      "SMTP non configurato. Imposta SMTP_HOST, SMTP_USER e SMTP_PASS in .env.local.",
    );
  }
}

function createTransporter() {
  requireMailEnv();

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

function recipient() {
  return process.env.MAIL_TO ?? "simonedele03@gmail.com";
}

function sender() {
  return process.env.MAIL_FROM ?? `${siteConfig.siteName} <${smtpUser}>`;
}

export async function sendContactEmail(data: ContactFormValues) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: sender(),
    to: recipient(),
    subject: `[Contatti] ${data.service} - ${data.name}`,
    text: [
      "Nuova richiesta dal form contatti",
      "",
      `Nome: ${data.name}`,
      `Telefono: ${data.phone}`,
      `Email: ${data.email}`,
      `Servizio: ${data.service}`,
      "",
      "Messaggio:",
      data.message,
    ].join("\n"),
    html: `
      <h2>Nuova richiesta dal form contatti</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Servizio:</strong> ${escapeHtml(data.service)}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
    `,
  });
}

export async function sendQuoteEmail(data: QuoteFormValues) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: sender(),
    to: recipient(),
    subject: `[Preventivo] ${data.service} - ${data.name}`,
    text: [
      "Nuova richiesta di preventivo",
      "",
      `Nome: ${data.name}`,
      `Telefono: ${data.phone}`,
      `Email: ${data.email}`,
      `Servizio: ${data.service}`,
      `Urgenza: ${data.urgency}`,
      `Zona: ${data.area}`,
      "",
      "Descrizione:",
      data.description,
    ].join("\n"),
    html: `
      <h2>Nuova richiesta di preventivo</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Servizio:</strong> ${escapeHtml(data.service)}</p>
      <p><strong>Urgenza:</strong> ${escapeHtml(data.urgency)}</p>
      <p><strong>Zona:</strong> ${escapeHtml(data.area)}</p>
      <p><strong>Descrizione:</strong></p>
      <p>${escapeHtml(data.description).replace(/\n/g, "<br />")}</p>
    `,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
