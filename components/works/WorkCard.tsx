"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Work } from "@/lib/works-data";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden bg-white shadow-sm ring-1 ring-graphite-100 transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite-900">
        <Image
          src={work.image}
          alt={work.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 bg-graphite-900/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
          {work.category}
        </span>
        <span
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden
        />
      </div>
      <div className="p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite-500">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {work.location} · {work.year}
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug text-graphite-900">
          {work.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-graphite-500">
          {work.summary}
        </p>
        <p className="mt-4 border-t border-graphite-100 pt-4 text-sm font-semibold text-graphite-900">
          {work.result}
        </p>
      </div>
    </motion.article>
  );
}
