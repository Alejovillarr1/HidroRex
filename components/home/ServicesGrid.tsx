"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export default function ServicesGrid() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            eyebrow="Nuestros servicios"
            title="Todo lo que su equipo necesita para trabajar a presión"
            subtitle="Un solo proveedor para el ciclo completo: diseño, fabricación, reparación y mantenimiento. Menos intermediarios, tiempos más cortos y responsabilidad total sobre el resultado."
          />
          <Reveal delay={0.2}>
            <Link
              href="/servicios"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-graphite-900"
            >
              Ver todos los servicios
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const wide = i < 2;
            return (
              <Reveal
                key={service.slug}
                delay={(i % 3) * 0.1}
                className={cn(wide ? "lg:col-span-3" : "lg:col-span-2")}
              >
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="h-full">
                  <Link
                    href={`/servicios#${service.slug}`}
                    className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden bg-graphite-900 p-7"
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-35"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/70 to-transparent"
                      aria-hidden
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                      aria-hidden
                    />

                    <div className="relative">
                      <span className="mb-5 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white backdrop-blur transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-graphite-300">
                        {service.short}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        Conocer más
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
