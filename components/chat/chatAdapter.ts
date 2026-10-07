import { COMPANY } from "@/lib/constants";

export type ChatRole = "user" | "bot";

export type ChatMessageData = {
  id: string;
  role: ChatRole;
  text: string;
};

/**
 * ============================================================
 *  PUNTO DE INTEGRACIÓN CON EL AGENTE DE IA (ODOO)
 * ============================================================
 * Para conectar el bot real:
 *  1. Defina NEXT_PUBLIC_CHAT_ENDPOINT en .env.local con la URL de su agente
 *     (idealmente un endpoint propio, p. ej. /api/chat, que hable con Odoo
 *     para no exponer credenciales en el navegador).
 *  2. El endpoint debe aceptar POST JSON:
 *       { message: string, sessionId: string, history: ChatMessageData[] }
 *     y responder JSON:
 *       { reply: string }
 *
 * Mientras no haya endpoint, se usan respuestas simuladas para demostrar la UI.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT;

export const QUICK_REPLIES = [
  "Quiero un presupuesto",
  "Reparan cilindros hidráulicos?",
  "Horarios y ubicación",
  "Quiero enviar mi CV",
] as const;

export const WELCOME_MESSAGE =
  "¡Hola! Soy el asistente virtual de Hidro Rex. Puedo orientarte sobre nuestros servicios, presupuestos y ubicación. ¿En qué te ayudo?";

export function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function simulatedReply(message: string): string {
  const text = message.toLowerCase();

  if (/(presupuesto|cotiz|precio|costo)/.test(text)) {
    return "Con gusto. Para cotizar necesitamos saber qué equipo o trabajo tenés en mente. Podés completar el formulario en la sección Contacto o llamarnos al " + COMPANY.phone + ".";
  }
  if (/(cilindro)/.test(text)) {
    return "Sí, fabricamos y reparamos cilindros hidráulicos de todo tipo: rectificado de vástagos, cambio de sellos y prueba en banco incluida.";
  }
  if (/(manguera|prensad)/.test(text)) {
    return "Hacemos mangueras hidráulicas a medida con prensado en el momento y terminales adecuadas a tu presión de trabajo.";
  }
  if (/(horario|hora|abierto|ubic|direcci|donde|dónde)/.test(text)) {
    return `Estamos en ${COMPANY.address}, ${COMPANY.city}. Atendemos ${COMPANY.hours.toLowerCase()}.`;
  }
  if (/(cv|curr|trabajo|empleo|postul)/.test(text)) {
    return "¡Genial! Podés dejar tu currículum en la sección “Trabaja con nosotros”. Revisamos todos los perfiles.";
  }
  if (/(flota|camion|camión|mecanic|mecánic)/.test(text)) {
    return "Brindamos mecánica especializada y mantenimiento preventivo y correctivo para flota pesada y liviana.";
  }
  if (/(hola|buenas|buen d)/.test(text)) {
    return "¡Hola! ¿Qué servicio estás buscando?";
  }
  return "Gracias por tu mensaje. Un asesor de nuestro equipo puede ayudarte mejor: escribinos desde la sección Contacto o llamanos al " + COMPANY.phone + ".";
}

export async function sendMessage(
  message: string,
  history: ChatMessageData[],
  sessionId: string
): Promise<string> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, sessionId }),
    });
    if (!res.ok) throw new Error("El asistente no está disponible");
    const data = (await res.json()) as { reply?: string };
    if (!data.reply) throw new Error("Respuesta vacía del asistente");
    return data.reply;
  }

  // Modo demostración: simula latencia de un agente real.
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 700));
  return simulatedReply(message);
}
