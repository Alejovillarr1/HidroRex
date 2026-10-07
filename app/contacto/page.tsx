import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto y presupuestos",
  description:
    "Solicite su presupuesto a Hidro Rex. Estamos en el Parque Industrial de Neuquén. Respuesta rápida a consultas comerciales y urgencias.",
};

const mapQuery = encodeURIComponent(
  `${COMPANY.address}, Neuquén, Argentina`
);

export default function ContactoPage() {
  const info = [
    {
      icon: MapPin,
      label: "Dirección",
      value: `${COMPANY.address}, ${COMPANY.city}`,
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: COMPANY.phone,
      href: `tel:${COMPANY.phoneRaw}`,
    },
    {
      icon: Mail,
      label: "Correo",
      value: COMPANY.emailSales,
      href: `mailto:${COMPANY.emailSales}`,
    },
    { icon: Clock, label: "Horario", value: COMPANY.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de lo que su operación necesita"
        description="Cuéntenos su consulta o urgencia. Le respondemos con un presupuesto claro y un plazo realista."
        image="/images/blueprint.jpg"
        imageAlt="Planos técnicos sobre una mesa de trabajo"
      />

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight text-graphite-900 sm:text-3xl">
                Solicite su presupuesto
              </h2>
              <p className="mb-8 mt-3 text-graphite-500">
                Complete el formulario y nuestro equipo comercial lo contactará.
                Los campos con asterisco son obligatorios.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-2">
            <Reveal direction="left">
              <div className="bg-graphite-900 p-8 text-white">
                <h2 className="text-xl font-bold">Datos de contacto</h2>
                <ul className="mt-6 space-y-6">
                  {info.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <span className="text-sm leading-relaxed text-graphite-300">
                        {item.value}
                      </span>
                    );
                    return (
                      <li key={item.label} className="flex gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white/10">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-widest text-white">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="break-all transition-colors hover:text-white [&>span]:hover:text-white"
                            >
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.15} className="mt-6">
              <div className="aspect-[4/3] overflow-hidden bg-graphite-100">
                <iframe
                  title="Ubicación de Hidro Rex en el Parque Industrial de Neuquén"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>
    </>
  );
}
