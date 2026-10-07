"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileText, Loader2, Send, UploadCloud, X } from "lucide-react";
import FormField, { inputClass } from "@/components/forms/FormField";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CV_AREAS,
  CV_ACCEPTED_EXTENSIONS,
  cvSchema,
  validateCvFile,
  type CVInput,
} from "@/lib/validations";

type Status = "idle" | "loading" | "success" | "error";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CVForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CVInput>({
    resolver: zodResolver(cvSchema),
    defaultValues: { website: "" },
  });

  const pickFile = (candidate: File | null | undefined) => {
    if (!candidate) return;
    const err = validateCvFile(candidate);
    if (err) {
      setFile(null);
      setFileError(err);
      return;
    }
    setFileError("");
    setFile(candidate);
  };

  const clearFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onSubmit = async (values: CVInput) => {
    const err = validateCvFile(file);
    if (err || !file) {
      setFileError(err ?? "Adjunte su currículum");
      return;
    }

    setStatus("loading");
    setServerError("");

    const body = new FormData();
    body.append("fullName", values.fullName);
    body.append("email", values.email);
    body.append("phone", values.phone);
    body.append("area", values.area);
    body.append("message", values.message ?? "");
    body.append("website", values.website ?? "");
    body.append("cv", file);

    try {
      const res = await fetch("/api/rrhh", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error al enviar");
      }
      setStatus("success");
      reset();
      clearFile();
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "No pudimos enviar su postulación.");
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
              ¡Postulación recibida!
            </h3>
            <p className="mt-3 max-w-sm text-graphite-500">
              Gracias por querer ser parte de Hidro Rex. Revisaremos su perfil y,
              si coincide con una búsqueda, nos comunicaremos con usted.
            </p>
            <Button variant="outlineDark" className="mt-8" onClick={() => setStatus("idle")}>
              Enviar otra postulación
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
            <FormField id="fullName" label="Nombre y apellido" required error={errors.fullName?.message}>
              <input
                id="fullName"
                autoComplete="name"
                placeholder="Nombre completo"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={inputClass}
                {...register("fullName")}
              />
            </FormField>

            <FormField id="cv-email" label="Correo electrónico" required error={errors.email?.message}>
              <input
                id="cv-email"
                type="email"
                autoComplete="email"
                placeholder="usted@correo.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "cv-email-error" : undefined}
                className={inputClass}
                {...register("email")}
              />
            </FormField>

            <FormField id="cv-phone" label="Teléfono" required error={errors.phone?.message}>
              <input
                id="cv-phone"
                type="tel"
                autoComplete="tel"
                placeholder="299 123-4567"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "cv-phone-error" : undefined}
                className={inputClass}
                {...register("phone")}
              />
            </FormField>

            <FormField id="area" label="Área de interés" required error={errors.area?.message}>
              <select
                id="area"
                defaultValue=""
                aria-invalid={!!errors.area}
                aria-describedby={errors.area ? "area-error" : undefined}
                className={inputClass}
                {...register("area")}
              >
                <option value="" disabled>
                  Seleccione un área
                </option>
                {CV_AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id="cv-file"
              label="Currículum"
              required
              error={fileError}
              hint={`Formatos ${CV_ACCEPTED_EXTENSIONS.join(", ")} · máximo 5 MB`}
              className="sm:col-span-2"
            >
              <input
                ref={inputRef}
                id="cv-file"
                type="file"
                accept={CV_ACCEPTED_EXTENSIONS.join(",")}
                className="sr-only"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
              {file ? (
                <div className="flex items-center gap-4 border border-graphite-900 bg-graphite-50 p-4">
                  <FileText className="h-8 w-8 shrink-0 text-graphite-900" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-graphite-900">{file.name}</p>
                    <p className="text-xs text-graphite-500">{formatSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    aria-label="Quitar archivo"
                    className="flex h-9 w-9 items-center justify-center text-graphite-500 transition-colors hover:bg-graphite-100 hover:text-graphite-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="cv-file"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    pickFile(e.dataTransfer.files?.[0]);
                  }}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition-colors",
                    dragging
                      ? "border-graphite-900 bg-graphite-50"
                      : "border-graphite-100 hover:border-graphite-300 hover:bg-graphite-50",
                    fileError && "border-brand"
                  )}
                >
                  <UploadCloud className="h-10 w-10 text-graphite-500" aria-hidden />
                  <span className="text-sm font-semibold text-graphite-900">
                    Arrastre su CV aquí o haga clic para seleccionarlo
                  </span>
                </label>
              )}
            </FormField>

            <FormField
              id="cv-message"
              label="Cuéntenos sobre usted"
              error={errors.message?.message}
              hint="Opcional: experiencia, certificaciones, disponibilidad."
              className="sm:col-span-2"
            >
              <textarea
                id="cv-message"
                rows={5}
                placeholder="Breve presentación"
                className={inputClass}
                {...register("message")}
              />
            </FormField>

            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="cv-website">No completar</label>
              <input id="cv-website" tabIndex={-1} autoComplete="off" {...register("website")} />
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
                    Enviar postulación
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
