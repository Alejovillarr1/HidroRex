import { ClipboardCheck, MessageSquare, Search, Wrench } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Consulta",
    text: "Nos cuenta el problema o la necesidad. Respondemos rápido y con las preguntas técnicas correctas.",
  },
  {
    icon: Search,
    title: "Diagnóstico",
    text: "Evaluamos el equipo o el sistema, identificamos la causa real y le enviamos un presupuesto claro.",
  },
  {
    icon: Wrench,
    title: "Ejecución",
    text: "Fabricamos, reparamos o montamos con personal capacitado y control de calidad en cada etapa.",
  },
  {
    icon: ClipboardCheck,
    title: "Prueba y entrega",
    text: "Probamos bajo condiciones de trabajo y entregamos con respaldo técnico y documentación.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-graphite-950 py-24 sm:py-32">
      <Container>
        <SectionTitle
          tone="dark"
          align="center"
          eyebrow="Cómo trabajamos"
          title="Un proceso simple, claro y sin sorpresas"
          subtitle="De la primera consulta a la entrega, usted sabe en todo momento qué se hace y cuándo estará listo."
        />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-white/15 lg:block"
            aria-hidden
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.title} delay={i * 0.12} className="relative">
                <span className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center border border-white/20 bg-graphite-900 text-white">
                  <Icon className="h-7 w-7" aria-hidden />
                  <span className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center bg-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-300">
                  {step.text}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
