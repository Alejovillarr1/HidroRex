import { cn } from "@/lib/utils";

export const inputClass =
  "w-full border border-graphite-100 bg-white px-4 py-3.5 text-sm text-graphite-900 placeholder:text-graphite-300 transition-all duration-200 focus:border-graphite-900 focus:outline-none focus:ring-2 focus:ring-graphite-900/10 aria-[invalid=true]:border-brand aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-brand/10";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
};

export default function FormField({
  id,
  label,
  error,
  required,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-graphite-900">
        {label}
        {required && (
          <span className="ml-1 text-brand" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-graphite-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
