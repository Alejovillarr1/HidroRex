import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className,
}: SectionTitleProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]",
              dark ? "text-graphite-300" : "text-graphite-500"
            )}
          >
            <span className="h-0.5 w-8 bg-brand" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
            dark ? "text-white" : "text-graphite-900"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              dark ? "text-graphite-300" : "text-graphite-500"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
