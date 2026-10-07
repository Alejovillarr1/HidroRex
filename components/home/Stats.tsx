import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// EJEMPLO: cifras ilustrativas. Reemplazar por los números reales de la empresa.
const STATS = [
  { value: 15, prefix: "+", suffix: "", label: "Años de experiencia" },
  { value: 1200, prefix: "+", suffix: "", label: "Equipos intervenidos" },
  { value: 80, prefix: "+", suffix: "", label: "Clientes industriales" },
  { value: 24, prefix: "", suffix: " hs", label: "Respuesta ante urgencias" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-graphite-900">
      <Container className="grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.1}
            className="px-4 text-center lg:border-r lg:border-white/10 lg:last:border-r-0"
          >
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="block text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            />
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-graphite-300">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
