import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-graphite-950 py-24 sm:py-32">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/80 to-graphite-950/40"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Container className="relative">
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-graphite-300">
            <span className="h-0.5 w-10 bg-brand" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite-300">
            {description}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
