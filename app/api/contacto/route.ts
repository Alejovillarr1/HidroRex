import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { escapeHtml, sendMail } from "@/lib/mailer";
import { COMPANY } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revise los datos del formulario" },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot completado: respondemos OK sin enviar nada.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Empresa", data.company || "—"],
    ["Correo", data.email],
    ["Teléfono", data.phone],
    ["Motivo", data.subject],
  ];

  const html = `
    <h2>Nueva consulta comercial desde la web</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
    <h3>Mensaje</h3>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  try {
    await sendMail({
      to: process.env.CONTACT_TO ?? COMPANY.emailSales,
      subject: `[Web] ${data.subject} - ${data.name}`,
      html,
      replyTo: data.email,
    });
    // TODO(Odoo): crear lead en CRM (crm.lead) desde aquí.
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contacto]", error);
    return NextResponse.json(
      { error: "No pudimos enviar su consulta. Intente nuevamente o llámenos." },
      { status: 500 }
    );
  }
}
