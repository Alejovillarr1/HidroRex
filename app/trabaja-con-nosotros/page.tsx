import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, HardHat, TrendingUp, Users } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import CVForm from "@/components/forms/CVForm";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description:
    "Sumate al equipo de Hidro Rex. Dejá tu currículum y formá parte de una empresa líder en soluciones integrales en hidráulica en Neuquén.",
};

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Crecimiento real",
    text: "Una empresa en expansión que valora la iniciativa y promueve a quienes se destacan.",
  },
  {
    icon: GraduationCap,
    title: "Capacitación continua",
    text: "Aprendés con técnicos de oficio y trabajás con equipos y tecnología de primer nivel.",
  },
  {
    icon: HardHat,
    title: "Seguridad ante todo",
    text: "Cumplimos normas de seguridad e higiene exigentes del sector petrolero e industrial.",
  },
  {
    icon: Users,
    title: "Equipo comprometido",
    text: "Un ambiente de trabajo colaborativo, con respeto y objetivos compartidos.",
  },
];

export default function TrabajaConNosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recursos humanos"
        title="Construí tu carrera en la industria hidráulica"
        description="Buscamos personas responsables y con ganas de aprender y crecer. Dejanos tu currículum y te tenemos en cuenta para próximas búsquedas."
        image="/images/engineer.jpg"
        imageAlt="Ingeniera trabajando en un laboratorio industrial"
      />

      <section className="bg-graphite-50 py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight text-graphite-900 sm:text-3xl">
                ¿Por qué trabajar en Hidro Rex?
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-6">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal as="li" key={b.title} delay={i * 0.08} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-graphite-900 text-white">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-bold text-graphite-900">{b.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-graphite-500">
                        {b.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.2} className="mt-10">
              <div className="relative aspect-[4/3] overflow-hidden bg-graphite-900">
                <Image
                  src="/images/mechanic.jpg"
                  alt="Mecánico revisando el motor de un vehículo"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal direction="left">
              <div className="bg-white p-6 shadow-sm ring-1 ring-graphite-100 sm:p-10">
                <h2 className="text-2xl font-extrabold tracking-tight text-graphite-900">
                  Dejá tu currículum
                </h2>
                <p className="mb-8 mt-3 text-graphite-500">
                  Completá tus datos y adjuntá tu CV. Tu información se usa
                  únicamente para procesos de selección.
                </p>
                <CVForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
