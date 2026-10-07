// IMPORTANTE: los datos marcados como PROVISORIO deben reemplazarse por los reales.

export const COMPANY = {
  name: "Hidro Rex",
  tagline: "Soluciones integrales en hidráulica",
  description:
    "Hidro Rex brinda soluciones integrales en hidráulica para la industria petrolera, industrial y el transporte pesado.",
  url: "https://www.hidrorex.com", // PROVISORIO: confirmar dominio final
  address: "Enrique Mosconi 2895, Parque Industrial",
  city: "Neuquén Capital, Neuquén (Q8300), Argentina",
  phone: "+54 299 571-6410",
  phoneRaw: "+542995716410",
  whatsapp: "5492995716410", // PROVISORIO: confirmar que el número tenga WhatsApp
  emailSales: "administracion@hidrorex.com",
  emailHR: "administracion@hidrorex.com", // PROVISORIO: único correo informado
  hours: "Lunes a viernes de 8:00 a 17:00 hs", // PROVISORIO
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Trabajos", href: "/trabajos" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;
