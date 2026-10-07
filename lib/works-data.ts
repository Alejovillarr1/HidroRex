// EJEMPLO: proyectos ilustrativos con textos genéricos.
// Reemplazar por trabajos reales (con permiso del cliente) cuando estén disponibles.

export type WorkCategory =
  | "Circuitos hidráulicos"
  | "Cilindros"
  | "Flota"
  | "Industria petrolera";

export type Work = {
  slug: string;
  title: string;
  category: WorkCategory;
  location: string;
  year: string;
  summary: string;
  result: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const WORK_CATEGORIES: WorkCategory[] = [
  "Circuitos hidráulicos",
  "Cilindros",
  "Flota",
  "Industria petrolera",
];

export const WORKS: Work[] = [
  {
    slug: "circuito-alta-presion-planta",
    title: "Circuito hidráulico de alta presión para planta industrial",
    category: "Circuitos hidráulicos",
    location: "Neuquén",
    year: "2025",
    summary:
      "Diseño y montaje completo de un circuito de alta presión con cañería, bloques de válvulas y unidad de potencia.",
    result:
      "Puesta en marcha sin fugas y con pruebas de presión documentadas.",
    image: "/images/pipes.jpg",
    imageAlt: "Cañerías industriales de una planta de proceso",
    featured: true,
  },
  {
    slug: "reparacion-cilindros-equipos-pesados",
    title: "Reparación integral de cilindros de equipos pesados",
    category: "Cilindros",
    location: "Parque Industrial Neuquén",
    year: "2025",
    summary:
      "Rectificado de vástagos, cambio de sellos y guías, y prueba en banco de cilindros de maquinaria de movimiento de suelo.",
    result:
      "Equipos de vuelta a operación en tiempos mínimos de parada.",
    image: "/images/cylinder.jpg",
    imageAlt: "Técnico trabajando sobre un componente cilíndrico",
    featured: true,
  },
  {
    slug: "mantenimiento-flota-pesada",
    title: "Plan de mantenimiento para flota de transporte pesado",
    category: "Flota",
    location: "Ruta Nacional 22",
    year: "2024",
    summary:
      "Programa preventivo y correctivo para una flota de camiones, con historial de servicio por unidad.",
    result:
      "Menos paradas imprevistas y control claro de costos por unidad.",
    image: "/images/truck-scania.jpg",
    imageAlt: "Camión de carga pesada en ruta",
    featured: true,
  },
  {
    slug: "soporte-equipos-yacimiento",
    title: "Soporte hidráulico para equipos de yacimiento",
    category: "Industria petrolera",
    location: "Cuenca Neuquina",
    year: "2025",
    summary:
      "Asistencia en campo con mangueras prensadas a medida, reparación de bombas y válvulas para equipos de operación petrolera.",
    result:
      "Respuesta ágil para sostener la continuidad de la operación.",
    image: "/images/mining.jpg",
    imageAlt: "Maquinaria pesada trabajando en una explotación a cielo abierto",
    featured: true,
  },
  {
    slug: "reparacion-bombas-valvulas",
    title: "Reparación y calibración de bombas y válvulas",
    category: "Circuitos hidráulicos",
    location: "Taller Hidro Rex",
    year: "2024",
    summary:
      "Diagnóstico de causa raíz, reparación y ajuste en banco de bombas hidráulicas y válvulas de control.",
    result:
      "Componentes devueltos probados y calibrados a su presión de trabajo.",
    image: "/images/valves.jpg",
    imageAlt: "Bloque de válvulas y mangueras hidráulicas",
  },
  {
    slug: "mecanizado-precision-taller",
    title: "Mecanizado de precisión para componentes hidráulicos",
    category: "Cilindros",
    location: "Taller Hidro Rex",
    year: "2024",
    summary:
      "Fabricación y mecanizado de piezas de cilindros a medida según plano o muestra.",
    result:
      "Piezas con tolerancias ajustadas y acabado listo para montaje.",
    image: "/images/lathe.jpg",
    imageAlt: "Operario frente a un torno de mecanizado",
  },
  {
    slug: "soldadura-estructural-equipos",
    title: "Soldadura y reparación estructural de equipos",
    category: "Industria petrolera",
    location: "Neuquén",
    year: "2025",
    summary:
      "Reparación estructural y soldadura especializada en componentes de equipos industriales.",
    result:
      "Uniones resistentes y trabajos entregados en el plazo acordado.",
    image: "/images/weld.jpg",
    imageAlt: "Soldador trabajando con chispas y máscara de protección",
  },
  {
    slug: "diagnostico-mecanico-liviana",
    title: "Diagnóstico y reparación de unidades livianas",
    category: "Flota",
    location: "Taller Hidro Rex",
    year: "2024",
    summary:
      "Diagnóstico mecánico y reparación de camionetas y utilitarios de equipos de servicio.",
    result:
      "Unidades disponibles y seguras para el trabajo diario.",
    image: "/images/mechanic.jpg",
    imageAlt: "Mecánico revisando el motor de un vehículo",
  },
];
