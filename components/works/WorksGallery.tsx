"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import WorkCard from "@/components/works/WorkCard";
import { WORKS, WORK_CATEGORIES } from "@/lib/works-data";
import { cn } from "@/lib/utils";

type Filter = "Todos" | (typeof WORK_CATEGORIES)[number];

export default function WorksGallery() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const filters: Filter[] = ["Todos", ...WORK_CATEGORIES];

  const visible = useMemo(
    () => (filter === "Todos" ? WORKS : WORKS.filter((w) => w.category === filter)),
    [filter]
  );

  return (
    <section className="bg-graphite-50 py-20 sm:py-28">
      <Container>
        <div
          className="flex flex-wrap gap-3"
          role="tablist"
          aria-label="Filtrar trabajos por categoría"
        >
          {filters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item)}
                className={cn(
                  "relative px-5 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "text-white"
                    : "bg-white text-graphite-500 ring-1 ring-graphite-100 hover:text-graphite-900"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="works-filter"
                    className="absolute inset-0 bg-graphite-900"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((work) => (
              <WorkCard key={work.slug} work={work} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
