import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );
}

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
};

/** Envía un correo por SMTP y falla explícitamente si faltan credenciales. */
export async function sendMail({ to, subject, html, replyTo, attachments }: SendArgs) {
  if (!isMailConfigured()) {
    throw new Error("SMTP no configurado. Defina SMTP_HOST, SMTP_USER y SMTP_PASS.");
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to,
    subject,
    html,
    replyTo,
    attachments,
  });
}
