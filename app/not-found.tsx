import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-graphite-950 py-24">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Container className="relative text-center">
        <p className="text-8xl font-extrabold tracking-tight text-white sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          Esta página no existe o fue movida
        </h1>
        <p className="mx-auto mt-4 max-w-md text-graphite-300">
          Verifique la dirección o vuelva al inicio para seguir explorando
          nuestros servicios.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Volver al inicio
          </Button>
          <Link
            href="/contacto"
            className="text-sm font-semibold text-white underline-offset-4 hover:underline"
          >
            Contactar al equipo
          </Link>
        </div>
      </Container>
    </section>
  );
}
