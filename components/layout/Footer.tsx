import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { SERVICES } from "@/lib/services-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite-950 text-graphite-300">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div>
  {/* Le quité el bg-white a esta línea para que no tenga fondo blanco */}
  <div className="inline-block p-3">
    <Image
      src="/HidroRexNumContacto.svg"
      alt={`Logo de ${COMPANY.name}`}
      width={616}
      height={264}
      className="h-12 w-auto"
    />
  </div>
  <p className="mt-6 max-w-xs text-sm leading-relaxed">
    {COMPANY.tagline}. Respuesta rápida y trabajo de precisión para la industria petrolera, industrial y de transporte.
  </p>
</div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            {COMPANY.tagline}. Respuesta rápida y trabajo de precisión para la
            industria petrolera, industrial y de transporte.
          </p>
        </div>

        <nav aria-label="Enlaces rápidos">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            Enlaces rápidos
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Servicios">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            Servicios
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/servicios#${service.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            Contacto
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
              <address className="not-italic">
                {COMPANY.address}
                <br />
                {COMPANY.city}
              </address>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
              <a href={`tel:${COMPANY.phoneRaw}`} className="transition-colors hover:text-white">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
              <a
                href={`mailto:${COMPANY.emailSales}`}
                className="break-all transition-colors hover:text-white"
              >
                {COMPANY.emailSales}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
              {COMPANY.hours}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>
            © {year} {COMPANY.name}. Todos los derechos reservados.
          </p>
          <p>Desarrollado por Patagonia Host</p>
        </Container>
      </div>
    </footer>
  );
}
