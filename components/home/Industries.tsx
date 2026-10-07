import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

const INDUSTRIES = [
  {
    title: "Petróleo y gas",
    text: "Soporte hidráulico y mecánico para equipos de yacimiento, con respuesta en campo y repuestos disponibles.",
    image: "/images/mining.jpg",
  },
  {
    title: "Industria y plantas",
    text: "Circuitos, bombas y válvulas para líneas de producción.",
    image: "/images/factory.jpg",
  },
  {
    title: "Transporte y flotas",
    text: "Mantenimiento de camiones y unidades livianas.",
    image: "/images/truck-road.jpg",
  },
];

export default function Industries() {
  return (
    <section className="bg-graphite-950 py-24 sm:py-32">
      <Container>
        <SectionTitle
          tone="dark"
          align="center"
          eyebrow="Sectores que atendemos"
          title="Soluciones a la medida en la industria"
          subtitle="Entendemos los ritmos y los riesgos. Adaptamos nuestro servicio a lo que su operación realmente necesita."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {INDUSTRIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="group relative aspect-[3/4] overflow-hidden bg-graphite-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/50 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-6 p-7 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
