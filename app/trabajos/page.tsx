import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import WorksGallery from "@/components/works/WorksGallery";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Trabajos realizados",
  description:
    "Proyectos de circuitos hidráulicos, cilindros, mantenimiento de flota y soporte a la industria petrolera realizados por Hidro Rex.",
};

export default function TrabajosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trabajos"
        title="Proyectos que demuestran nuestra forma de trabajar"
        description="Filtre por especialidad y conozca cómo resolvemos los desafíos de la industria petrolera, industrial y de transporte."
        image="/images/mining.jpg"
        imageAlt="Maquinaria pesada en una explotación"
      />
      <WorksGallery />
      <CTABanner />
    </>
  );
}
