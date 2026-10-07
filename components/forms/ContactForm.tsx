"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import FormField, { inputClass } from "@/components/forms/FormField";
import Button from "@/components/ui/Button";
import {
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactInput,
} from "@/lib/validations";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error al enviar");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "No pudimos enviar su consulta."
      );
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[28rem] flex-col items-center justify-center bg-graphite-50 p-10 text-center"
            role="status"
          >
            <CheckCircle2 className="h-16 w-16 text-graphite-900" aria-hidden />
            <h3 className="mt-6 text-2xl font-extrabold text-graphite-900">
              ¡Consulta enviada!
            </h3>
            <p className="mt-3 max-w-sm text-graphite-500">
              Gracias por escribirnos. Nuestro equipo comercial se pondrá en
              contacto con usted a la brevedad.
            </p>
            <Button
              variant="outlineDark"
              className="mt-8"
              onClick={() => setStatus("idle")}
            >
              Enviar otra consulta
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <FormField id="name" label="Nombre y apellido" required error={errors.name?.message}>
              <input
                id="name"
                autoComplete="name"
                placeholder="Juan Pérez"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
                {...register("name")}
              />
            </FormField>

            <FormField id="company" label="Empresa" error={errors.company?.message}>
              <input
                id="company"
                autoComplete="organization"
                placeholder="Nombre de su empresa"
                className={inputClass}
                {...register("company")}
              />
            </FormField>

            <FormField id="email" label="Correo electrónico" required error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="usted@empresa.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
                {...register("email")}
              />
            </FormField>

            <FormField id="phone" label="Teléfono" required error={errors.phone?.message}>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="299 123-4567"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass}
                {...register("phone")}
              />
            </FormField>

            <FormField
              id="subject"
              label="Motivo de la consulta"
              required
              error={errors.subject?.message}
              className="sm:col-span-2"
            >
              <select
                id="subject"
                defaultValue=""
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={inputClass}
                {...register("subject")}
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                {CONTACT_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id="message"
              label="¿En qué podemos ayudarlo?"
              required
              error={errors.message?.message}
              className="sm:col-span-2"
            >
              <textarea
                id="message"
                rows={6}
                placeholder="Describa el equipo, la falla o el trabajo que necesita cotizar."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={inputClass}
                {...register("message")}
              />
            </FormField>

            {/* Honeypot anti-spam */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="website">No completar</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <div className="sm:col-span-2">
              {status === "error" && (
                <p role="alert" className="mb-4 border-l-4 border-brand bg-brand/5 p-4 text-sm font-medium text-brand">
                  {serverError}
                </p>
              )}
              <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar consulta
                    <Send className="h-4 w-4" aria-hidden />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
