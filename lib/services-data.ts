import {
  Droplets,
  Cog,
  Gauge,
  Link2,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    slug: "circuitos-hidraulicos",
    title: "Circuitos hidráulicos de alta presión",
    short:
      "Diseño, montaje y puesta en marcha de circuitos que soportan las condiciones más exigentes de campo y planta.",
    description:
      "Diseñamos, calculamos y montamos circuitos hidráulicos de alta presión a medida de cada equipo y de cada operación. Trabajamos con cañería, mangueras, bloques de válvulas y unidades de potencia seleccionados según caudal, presión de trabajo y ambiente de uso, para que el sistema rinda desde el primer día y siga rindiendo con el paso de los años. Cada circuito se prueba bajo carga antes de la entrega y se documenta para facilitar el mantenimiento futuro.",
    features: [
      "Relevamiento técnico y cálculo de presión y caudal",
      "Montaje de cañería, bloques y unidades de potencia",
      "Pruebas de presión y puesta en marcha en sitio",
      "Planos y documentación para mantenimiento",
    ],
    image: "/images/pipes.jpg",
    imageAlt: "Red de cañerías industriales de acero inoxidable en una planta",
    icon: Gauge,
  },
  {
    slug: "cilindros-hidraulicos",
    title: "Fabricación y reparación de cilindros de todo tipo",
    short:
      "Cilindros nuevos y reparaciones integrales con mecanizado propio, para que su equipo vuelva a trabajar rápido.",
    description:
      "Fabricamos cilindros hidráulicos a medida y reparamos los de todas las marcas y tamaños: simple y doble efecto, telescópicos y de maquinaria vial, minera, petrolera y agrícola. Desarmamos, diagnosticamos y mecanizamos vástagos, camisas y pistones, reemplazamos sellos y guías, y probamos cada unidad en banco antes de devolverla. Menos tiempo parado y una reparación que realmente dura.",
    features: [
      "Fabricación a medida según plano o muestra",
      "Reparación integral: vástagos, camisas, pistones y sellos",
      "Rectificado, cromado y mecanizado de precisión",
      "Prueba en banco con informe de resultados",
    ],
    image: "/images/cylinder.jpg",
    imageAlt: "Técnico trabajando una pieza cilíndrica metálica en el taller",
    icon: Cog,
  },
  {
    slug: "prensado-de-mangueras",
    title: "Prensado de mangueras",
    short:
      "Mangueras hidráulicas a medida, prensadas al instante, con la terminal y la presión correctas para su equipo.",
    description:
      "Fabricamos mangueras hidráulicas a medida en el momento, con prensado controlado y terminales adecuadas a cada presión de trabajo y fluido. Contamos con stock de mangueras de alta presión, conexiones y accesorios para resolver urgencias de flota, planta y campo. Cada manguera sale probada, identificada y con la longitud exacta que su equipo necesita, sin improvisar ni arriesgar fugas.",
    features: [
      "Prensado a medida con terminales certificadas",
      "Stock de mangueras, conexiones y accesorios",
      "Atención de urgencias para flota y planta",
      "Asesoramiento para elegir la manguera correcta",
    ],
    image: "/images/tools.jpg",
    imageAlt: "Herramientas de taller ordenadas en un tablero",
    icon: Link2,
  },
  {
    slug: "mecanica-flota",
    title: "Mecánica especializada en flota pesada y liviana",
    short:
      "Mantenimiento preventivo y correctivo para camiones, maquinaria y vehículos, con foco en disponibilidad y seguridad.",
    description:
      "Cuidamos su flota para que siempre esté lista para trabajar. Realizamos diagnóstico, mantenimiento preventivo y reparaciones correctivas en camiones, equipos viales y unidades livianas, con especial atención a sistemas hidráulicos, frenos, transmisión y motor. Planificamos intervenciones para reducir paradas imprevistas, y registramos cada servicio para que usted controle costos y vida útil de cada unidad.",
    features: [
      "Diagnóstico completo de motor, transmisión y frenos",
      "Planes de mantenimiento preventivo para flotas",
      "Reparaciones correctivas con repuestos de calidad",
      "Historial de servicio por unidad",
    ],
    image: "/images/truck-scania.jpg",
    imageAlt: "Camión de carga pesada circulando por una ruta",
    icon: Truck,
  },
  {
    slug: "valvulas-y-bombas",
    title: "Soluciones integrales en válvulas y bombas hidráulicas",
    short:
      "Provisión, reparación y calibración de válvulas y bombas para que su sistema entregue el rendimiento que necesita.",
    description:
      "Proveemos, reparamos y calibramos válvulas direccionales, de alivio, de control de caudal y bombas hidráulicas de engranajes, paletas y pistones. Diagnosticamos la causa real de la falla, no solo el síntoma, y devolvemos el componente probado y ajustado a su presión de trabajo. Si conviene reemplazar, lo asesoramos con alternativas confiables y plazos claros.",
    features: [
      "Reparación y calibración de válvulas y bombas",
      "Diagnóstico de la causa raíz de la falla",
      "Provisión de componentes nuevos y equivalencias",
      "Prueba en banco y ajuste a presión de trabajo",
    ],
    image: "/images/valves.jpg",
    imageAlt: "Bloque de válvulas y mangueras hidráulicas en un motor",
    icon: Droplets,
  },
];
