import { z } from "zod";

export const CONTACT_SUBJECTS = [
  "Solicitud de presupuesto",
  "Consulta técnica",
  "Urgencia / equipo parado",
  "Mantenimiento de flota",
  "Otro",
] as const;

export const CV_AREAS = [
  "Mecánica de flota pesada y liviana",
  "Hidráulica y prensado de mangueras",
  "Mecanizado y soldadura",
  "Administración y ventas",
  "Otra área",
] as const;

export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const CV_ACCEPTED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const phone = z
  .string()
  .trim()
  .min(6, "Ingrese un teléfono válido")
  .max(30, "El teléfono es demasiado largo")
  .regex(/^[0-9+()\-\s]+$/, "Use solo números, espacios, + o guiones");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingrese su nombre").max(80),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Ingrese un correo válido").max(120),
  phone,
  subject: z.enum(CONTACT_SUBJECTS, {
    errorMap: () => ({ message: "Seleccione un motivo" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntenos un poco más (mínimo 10 caracteres)")
    .max(2000, "El mensaje es demasiado largo"),
  // Honeypot: los usuarios reales nunca lo completan.
  website: z.string().max(0).optional().or(z.literal("")),
});

export const cvSchema = z.object({
  fullName: z.string().trim().min(2, "Ingrese su nombre completo").max(80),
  email: z.string().trim().email("Ingrese un correo válido").max(120),
  phone,
  area: z.enum(CV_AREAS, {
    errorMap: () => ({ message: "Seleccione un área" }),
  }),
  message: z.string().trim().max(1500, "El mensaje es demasiado largo").optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type CVInput = z.infer<typeof cvSchema>;

export function validateCvFile(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return "Adjunte su currículum";
  const name = file.name.toLowerCase();
  const okExt = CV_ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
  if (!okExt) return "El archivo debe ser PDF, DOC o DOCX";
  if (file.size > CV_MAX_BYTES) return "El archivo supera los 5 MB";
  return null;
}
