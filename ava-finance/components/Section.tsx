import type { ReactNode } from "react";
import { Reveal } from "./Motion";

type Texture = "plain" | "grid" | "dots" | "cross" | "hatch" | "panel" | "dark";

const textureClass: Record<Texture, string> = {
  plain: "bg-canvas",
  grid: "bg-canvas tx-grid",
  dots: "bg-canvas-2 tx-dots",
  cross: "bg-canvas tx-cross",
  hatch: "bg-canvas-2 tx-hatch",
  panel: "bg-canvas-2",
  dark: "panel-dark text-on-dark",
};

export function Section({
  children,
  id,
  texture = "plain",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  texture?: Texture;
  className?: string;
}) {
  return (
    <section id={id} className={`relative ${textureClass[texture]} ${className}`}>
      <div className="shell py-20 sm:py-28 lg:py-32">{children}</div>
    </section>
  );
}

/** Section header with pill kicker + geometric-sans title. */
export function SectionHeader({
  kicker,
  title,
  intro,
  dark = false,
  align = "left",
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
}) {
  const muted = dark ? "text-on-dark-soft" : "text-ink-soft";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : ""
      }`}
    >
      {kicker && (
        <span
          className={`inline-flex items-center gap-2 self-start rounded-none border px-3.5 py-1.5 ${
            align === "center" ? "self-center" : ""
          } ${
            dark
              ? "border-[var(--color-line-dark)] text-on-dark-soft"
              : "border-line text-ink-soft"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-none bg-accent" />
          <span className="eyebrow">{kicker}</span>
        </span>
      )}
      <h2 className="display-lg text-balance">{title}</h2>
      {intro && (
        <p className={`measure-wide text-lg leading-relaxed ${muted}`}>{intro}</p>
      )}
    </Reveal>
  );
}

/** Brand divider — gradient hairline with a centred accent node. */
export function SectionDivider({
  variant = "gradient",
  dark = false,
}: {
  variant?: "gradient" | "node";
  dark?: boolean;
}) {
  if (variant === "node") {
    return (
      <div className={dark ? "panel-dark" : "bg-canvas"}>
        <div className="shell">
          <div className="flex items-center gap-4 py-px">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-line-strong)]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-line-strong)]" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={dark ? "panel-dark" : "bg-canvas"}>
      <div className="shell">
        <hr className="rule-gradient" />
      </div>
    </div>
  );
}
