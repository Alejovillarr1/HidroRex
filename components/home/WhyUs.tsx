import Image from "next/image";
import { Clock, ShieldCheck, Wrench, Zap } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  {
    icon: Zap,
    title: "Respuesta ágil",
    text: "Sabemos que una máquina parada cuesta dinero. Priorizamos urgencias y trabajamos con tiempos claros desde el primer contacto.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad comprobada",
    text: "Cada componente se prueba en banco antes de la entrega y sale con respaldo técnico. Sin sorpresas una vez en operación.",
  },
  {
    icon: Wrench,
    title: "Taller completo",
    text: "Mecanizado, prensado, armado y pruebas en un mismo lugar. Menos traslados, menos demoras y control total del proceso.",
  },
  {
    icon: Clock,
    title: "Compromiso con los plazos",
    text: "Acordamos fechas realistas y las cumplimos. Le informamos el avance para que pueda planificar su operación con certeza.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal direction="right" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-graphite-900">
            <Image
              src="/images/worker.jpg"
              alt="Técnico con casco de seguridad trabajando en una instalación"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden bg-graphite-900 p-6 text-white shadow-2xl sm:block lg:-right-8">
            <p className="text-sm font-bold uppercase tracking-widest text-graphite-300">
              Seguridad primero
            </p>
            <p className="mt-2 max-w-[14rem] text-sm leading-relaxed">
              Trabajamos bajo normas de seguridad e higiene exigidas por el
              sector petrolero e industrial.
            </p>
          </div>
        </Reveal>

        <div>
          <SectionTitle
            eyebrow="Por qué Hidro Rex"
            title="Un socio técnico en el que puede confiar"
            subtitle="Nuestra misión es que su operación no se detenga. Por eso combinamos experiencia en campo, infraestructura propia y atención directa."
          />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <Reveal as="li" key={reason.title} delay={0.1 * i}>
                  <span className="mb-4 flex h-12 w-12 items-center justify-center bg-graphite-900 text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold text-graphite-900">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-500">
                    {reason.text}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
