import { NextResponse } from "next/server";
import { CV_MAX_BYTES, cvSchema, validateCvFile } from "@/lib/validations";
import { escapeHtml, sendMail } from "@/lib/mailer";
import { COMPANY } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = cvSchema.safeParse({
    fullName: form.get("fullName"),
    email: form.get("email"),
    phone: form.get("phone"),
    area: form.get("area"),
    message: form.get("message") ?? "",
    website: form.get("website") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revise los datos del formulario" },
      { status: 422 }
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const file = form.get("cv");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Adjunte su currículum" }, { status: 422 });
  }
  const fileError = validateCvFile(file);
  if (fileError) {
    return NextResponse.json({ error: fileError }, { status: 422 });
  }
  if (file.size > CV_MAX_BYTES) {
    return NextResponse.json({ error: "El archivo supera los 5 MB" }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^\w.\-() ]+/g, "_");

  const rows: [string, string][] = [
    ["Nombre", data.fullName],
    ["Correo", data.email],
    ["Teléfono", data.phone],
    ["Área de interés", data.area],
  ];

  const html = `
    <h2>Nuevo currículum recibido desde la web</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
    <h3>Mensaje del postulante</h3>
    <p style="white-space:pre-wrap">${escapeHtml(data.message || "—")}</p>
    <p>El CV va adjunto: <strong>${escapeHtml(safeName)}</strong></p>
  `;

  try {
    await sendMail({
      to: process.env.HR_TO ?? COMPANY.emailHR,
      subject: `[Web RRHH] ${data.area} - ${data.fullName}`,
      html,
      replyTo: data.email,
      attachments: [{ filename: safeName, content: buffer }],
    });
    // TODO(Odoo): crear postulante en el módulo Reclutamiento (hr.applicant).
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/rrhh]", error);
    return NextResponse.json(
      { error: "No pudimos enviar su postulación. Intente nuevamente." },
      { status: 500 }
    );
  }
}
