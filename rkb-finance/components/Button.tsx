import Link from "next/link";
import type { ReactNode } from "react";
import MagneticButton from "./MagneticButton";

export type Variant = "primary" | "ghost" | "light";

// Exported so MagneticButton (and form submit buttons) reuse the exact same look.
export const buttonBase =
  "group relative inline-flex items-center gap-2.5 rounded-full text-sm font-medium tracking-tight will-change-transform transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[var(--ease-rkb)] hover:-translate-y-0.5 active:translate-y-px active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export const buttonSizes = "px-6 py-3";

export const buttonVariants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas hover:bg-deep-2 shadow-[0_1px_2px_rgba(11,36,71,0.10)] hover:shadow-[0_8px_24px_-8px_rgba(11,36,71,0.35)] focus-visible:ring-offset-canvas",
  ghost:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-canvas hover:shadow-[0_6px_20px_-8px_rgba(11,36,71,0.30)]",
  light:
    "bg-canvas text-ink hover:bg-accent hover:text-canvas shadow-[0_1px_2px_rgba(11,36,71,0.18)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] focus-visible:ring-offset-deep",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${buttonBase} ${buttonSizes} ${buttonVariants[variant]} ${className}`;
}

export function Button({
  children,
  href,
  variant = "primary",
  arrow = true,
  magnetic = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  arrow?: boolean;
  /** Subtle cursor-attraction on fine-pointer devices. Use sparingly (hero/CTA). */
  magnetic?: boolean;
  className?: string;
}) {
  const external = href.startsWith("http");
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </>
  );

  const cls = buttonClasses(variant, className);

  if (magnetic) {
    return (
      <MagneticButton href={href} external={external} className={cls}>
        {content}
      </MagneticButton>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
