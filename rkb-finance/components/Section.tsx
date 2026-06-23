import type { ReactNode } from "react";
import { Reveal } from "./Motion";

type Texture =
  | "plain"
  | "grain"
  | "weave"
  | "ledger"
  | "laid"
  | "engrave"
  | "vignette"
  | "dark"
  | "panel";

const textureClass: Record<Texture, string> = {
  plain: "bg-canvas",
  grain: "bg-canvas tx-grain",
  weave: "bg-canvas-2 tx-weave",
  ledger: "bg-canvas tx-ledger",
  laid: "bg-canvas-2 tx-laid",
  engrave: "bg-canvas tx-engrave",
  vignette: "tx-vignette",
  panel: "bg-canvas-3",
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
    <section
      id={id}
      className={`relative ${textureClass[texture]} ${className}`}
    >
      <div className="shell py-20 sm:py-28 lg:py-32">{children}</div>
    </section>
  );
}

/** Section header with engraved index + serif title. */
export function SectionHeader({
  index,
  kicker,
  title,
  intro,
  dark = false,
  align = "left",
}: {
  index?: string;
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
}) {
  const accent = dark ? "text-accent-2" : "text-accent";
  const muted = dark ? "text-on-dark-soft" : "text-ink-soft";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center mx-auto" : ""
      } ${align === "center" ? "max-w-2xl" : "max-w-3xl"}`}
    >
      {(index || kicker) && (
        <div className={`eyebrow flex items-center gap-3 ${accent}`}>
          {index && <span>{index}</span>}
          {index && kicker && (
            <span className={dark ? "text-on-dark-soft" : "text-ink-faint"}>—</span>
          )}
          {kicker && (
            <span className={dark ? "text-on-dark-soft" : "text-ink-faint"}>
              {kicker}
            </span>
          )}
        </div>
      )}
      <h2 className="display-lg text-balance">{title}</h2>
      {intro && (
        <p className={`measure-wide text-lg leading-relaxed ${muted}`}>{intro}</p>
      )}
    </Reveal>
  );
}

/** Brand divider between sections — bronze hairline / engraved rule. */
export function SectionDivider({
  variant = "rule",
  dark = false,
}: {
  variant?: "rule" | "engraved" | "accent";
  dark?: boolean;
}) {
  if (variant === "accent") {
    return (
      <div className={dark ? "panel-dark" : "bg-canvas"}>
        <div className="shell">
          <div className="flex items-center gap-4 py-px">
            <span className="h-px flex-1 bg-[var(--color-line)]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
            <span className="h-px flex-1 bg-[var(--color-line)]" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={dark ? "panel-dark" : "bg-canvas"}>
      <div className="shell">
        <hr className={variant === "engraved" ? "rule-engraved" : "rule"} />
      </div>
    </div>
  );
}
