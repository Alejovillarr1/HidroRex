import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-graphite-900 py-24 sm:py-28">
      <Image
        src="/images/weld.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            ¿Su equipo está parado? Lo ponemos a trabajar.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-graphite-300">
            Cuéntenos qué necesita y le respondemos con un presupuesto claro y
            un plazo realista. Sin vueltas.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contacto" size="lg">
            Pedir presupuesto
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
          <Button href={`tel:${COMPANY.phoneRaw}`} size="lg" variant="outline">
            <Phone className="h-5 w-5" aria-hidden />
            {COMPANY.phone}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
