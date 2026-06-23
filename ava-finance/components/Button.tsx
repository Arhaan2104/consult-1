import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const base =
  "group inline-flex items-center gap-2 rounded-none text-sm font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const sizes = "px-6 py-3";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-[#1842c2]",
  ghost: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-canvas-3 focus-visible:ring-offset-deep",
};

export function Button({
  children,
  href,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const external = href.startsWith("http");
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  const cls = `${base} ${sizes} ${variants[variant]} ${className}`;

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
