import nodemailer from "nodemailer";

import { siteConfig } from "@/lib/site";
import type { ContactFormValues, QuoteEmailPayload } from "@/lib/form-schemas";

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
  return process.env.MAIL_TO ?? "info@phoenixelettronica.net";
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

export async function sendQuoteEmail(data: QuoteEmailPayload) {
  const transporter = createTransporter();
  const from = sender();
  const to = recipient();
  const attachments = data.attachments ?? [];

  await Promise.all([
    transporter.sendMail({
      from,
      to,
      replyTo: data.email,
      attachments,
      subject: `[Preventivo] Nuovo preventivo - ${data.service} - ${data.name}`,
      text: [
        "Nuovo preventivo ricevuto dal sito",
        "",
        `Nome: ${data.name}`,
        `Telefono: ${data.phone}`,
        `Email: ${data.email}`,
        `Servizio: ${data.service}`,
        `Urgenza: ${data.urgency}`,
        `Zona: ${data.area}`,
        `Foto allegate: ${attachments.length}`,
        "",
        "Descrizione:",
        data.description,
      ].join("\n"),
      html: `
        <h2>Nuovo preventivo ricevuto dal sito</h2>
        <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Servizio:</strong> ${escapeHtml(data.service)}</p>
        <p><strong>Urgenza:</strong> ${escapeHtml(data.urgency)}</p>
        <p><strong>Zona:</strong> ${escapeHtml(data.area)}</p>
        <p><strong>Foto allegate:</strong> ${attachments.length}</p>
        <p><strong>Descrizione:</strong></p>
        <p>${escapeHtml(data.description).replace(/\n/g, "<br />")}</p>
      `,
    }),
    transporter.sendMail({
      from,
      to: data.email,
      subject: "Conferma richiesta preventivo - Phoenix Elettronica",
      text: [
        `Ciao ${data.name},`,
        "",
        "questa e' una mail autogenerata per confermare che la tua richiesta di preventivo e' stata inviata correttamente.",
        "",
        "Riepilogo richiesta:",
        `Servizio: ${data.service}`,
        `Urgenza: ${data.urgency}`,
        `Zona: ${data.area}`,
        "",
        "Ti ricontatteremo il prima possibile.",
        "",
        "Phoenix Elettronica",
      ].join("\n"),
      html: `
        <h2>Richiesta di preventivo ricevuta</h2>
        <p>Ciao ${escapeHtml(data.name)},</p>
        <p>
          Questa e' una mail autogenerata per confermare che la tua richiesta di preventivo e'
          stata inviata correttamente.
        </p>
        <p><strong>Riepilogo richiesta:</strong></p>
        <p><strong>Servizio:</strong> ${escapeHtml(data.service)}</p>
        <p><strong>Urgenza:</strong> ${escapeHtml(data.urgency)}</p>
        <p><strong>Zona:</strong> ${escapeHtml(data.area)}</p>
        <p>Ti ricontatteremo il prima possibile.</p>
        <p>Phoenix Elettronica</p>
      `,
    }),
  ]);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
