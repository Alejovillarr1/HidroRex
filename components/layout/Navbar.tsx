"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]" : "shadow-none"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-all duration-300",
          scrolled ? "h-20" : "h-24"
        )}
      >
        <Link
          href="/"
          aria-label={`${COMPANY.name} - Inicio`}
          className="flex shrink-0 items-center"
        >
          <Image
            src="/HidroRexLetras.svg"
            alt={`Logo de ${COMPANY.name}`}
            width={600}
            height={108}
            priority
            className={cn(
              "w-auto transition-all duration-300",
              scrolled ? "h-[4.75rem]" : "h-[5.5rem]"
            )}
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-graphite-900"
                        : "text-graphite-500 hover:text-graphite-900"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-graphite-900 transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {COMPANY.phone}
          </a>
          <Button href="/contacto" size="sm">
            Solicitar presupuesto
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-md text-graphite-900 transition-colors hover:bg-graphite-100 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-graphite-100 bg-graphite-900 lg:hidden"
          >
            <Container className="py-6">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between border-b border-white/10 py-4 text-lg font-medium transition-colors",
                          active ? "text-white" : "text-graphite-300 hover:text-white"
                        )}
                      >
                        {link.label}
                        {active && (
                          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contacto" size="lg" className="w-full">
                  Solicitar presupuesto
                </Button>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {COMPANY.phone}
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
