"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ["Soluciones", "integrales", "en hidráulica."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-graphite-950"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Trabajo industrial con chispas de amoladora"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/85 to-graphite-950/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-graphite-950/40"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />

      <motion.div
        aria-hidden
        className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10 py-24">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.span
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-graphite-300"
          >
            <span className="h-0.5 w-10 bg-brand" aria-hidden />
            Industria petrolera e industrial
          </motion.span>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {HEADLINE.map((word, i) => (
              <span key={word} className="mr-4 inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45 + i * 0.12, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite-300 sm:text-xl"
          >
            Circuitos de alta presión, cilindros, mangueras, válvulas, bombas y
            mecánica de flota. Soluciones integrales con respuesta rápida para
            que su operación nunca pierda un día de producción.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/contacto" size="lg">
              Solicitar presupuesto
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <Button href="/servicios" size="lg" variant="outline">
              Ver servicios
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.a
        href="#servicios"
        aria-label="Bajar a servicios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 transition-colors hover:text-white sm:block"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.span>
      </motion.a>
    </section>
  );
}
