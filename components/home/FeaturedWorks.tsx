"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { WORKS } from "@/lib/works-data";
import { cn } from "@/lib/utils";

export default function FeaturedWorks() {
  const works = WORKS.filter((w) => w.featured);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="overflow-hidden bg-graphite-900 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            tone="dark"
            eyebrow="Trabajos realizados"
            title="Resultados que hablan por nosotros"
            subtitle="Una muestra de proyectos donde la precisión, la rapidez y el cumplimiento marcaron la diferencia para nuestros clientes."
          />
          <Reveal delay={0.2} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Proyecto anterior"
              className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-graphite-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Proyecto siguiente"
              className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-graphite-900"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </Reveal>
        </div>
      </Container>

      <Reveal delay={0.15} className="mt-14">
        <div ref={emblaRef} className="overflow-hidden pl-5 sm:pl-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <div className="flex gap-6">
            {works.map((work) => (
              <article
                key={work.slug}
                className="group relative min-w-0 flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_38%]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite-800">
                  <Image
                    src={work.image}
                    alt={work.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 640px) 55vw, 85vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-graphite-300">
                      {work.category}
                    </span>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl">
                      {work.title}
                    </h3>
                    <p className="mt-3 flex items-center gap-2 text-sm text-graphite-300">
                      <MapPin className="h-4 w-4" aria-hidden />
                      {work.location} · {work.year}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Container className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2" role="tablist" aria-label="Posición del slider">
          {works.map((work, i) => (
            <button
              key={work.slug}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`Ir al proyecto ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1 transition-all duration-500",
                selected === i ? "w-12 bg-brand" : "w-6 bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>
        <Button href="/trabajos" variant="outline">
          Ver todos los trabajos
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </Container>
    </section>
  );
}
