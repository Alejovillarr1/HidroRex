import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetail from "@/components/services/ServiceDetail";
import ProcessSteps from "@/components/services/ProcessSteps";
import CTABanner from "@/components/home/CTABanner";
import { SERVICES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Servicios: soluciones integrales en hidráulica",
  description:
    "Circuitos hidráulicos de alta presión, cilindros, prensado de mangueras, mecánica de flota y soluciones en válvulas y bombas hidráulicas en Neuquén.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Soluciones integrales en hidráulica"
        description="Cinco especialidades, un solo equipo técnico. Desde el diseño de un circuito hasta la reparación urgente de una flota, trabajamos para que su operación no se detenga."
        image="/images/factory.jpg"
        imageAlt="Planta industrial con brazos robóticos"
      />
      {SERVICES.map((service, i) => (
        <ServiceDetail key={service.slug} service={service} index={i} />
      ))}
      <ProcessSteps />
      <CTABanner />
    </>
  );
}
