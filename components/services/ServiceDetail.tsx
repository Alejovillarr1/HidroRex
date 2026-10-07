import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services-data";

type ServiceDetailProps = {
  service: Service;
  index: number;
};

export default function ServiceDetail({ service, index }: ServiceDetailProps) {
  const reverse = index % 2 === 1;
  const dark = index % 2 === 1;
  const Icon = service.icon;

  return (
    <section
      id={service.slug}
      className={cn(
        "scroll-mt-20 py-20 sm:py-28",
        dark ? "bg-graphite-900" : "bg-white"
      )}
    >
      <Container
        className={cn(
          "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
          reverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        <Reveal direction={reverse ? "left" : "right"}>
          <div className="relative aspect-[4/3] overflow-hidden bg-graphite-800">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center bg-brand text-white">
              <Icon className="h-7 w-7" aria-hidden />
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span
              className={cn(
                "text-sm font-bold uppercase tracking-[0.2em]",
                dark ? "text-graphite-300" : "text-graphite-500"
              )}
            >
              Servicio {String(index + 1).padStart(2, "0")}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className={cn(
                "mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl",
                dark ? "text-white" : "text-graphite-900"
              )}
            >
              {service.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className={cn(
                "mt-6 text-base leading-relaxed",
                dark ? "text-graphite-300" : "text-graphite-500"
              )}
            >
              {service.description}
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {service.features.map((feature, i) => (
              <Reveal as="li" key={feature} delay={0.2 + i * 0.07} className="flex gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center",
                    dark ? "bg-white/10 text-white" : "bg-graphite-900 text-white"
                  )}
                >
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    dark ? "text-white" : "text-graphite-900"
                  )}
                >
                  {feature}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.5} className="mt-10">
            <Button href="/contacto">Consultar por este servicio</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
