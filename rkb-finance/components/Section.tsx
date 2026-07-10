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
  | "panel"
  | "vault"
  | "ivory-loud"
  | "blue-loud"
  | "gold-loud";

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
  vault: "section-vault text-on-dark",
  "ivory-loud": "section-ivory-loud",
  "blue-loud": "section-blue-loud",
  "gold-loud": "section-gold-loud",
};

export function Section({
  children,
  id,
  texture = "plain",
  className = "",
  flush = false,
}: {
  children: ReactNode;
  id?: string;
  texture?: Texture;
  className?: string;
  /** Drop the vertical rhythm — for scenes (e.g. the pinned process stage)
      that manage their own height and would otherwise double-pad. */
  flush?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative ${textureClass[texture]} ${className}`}
    >
      <div className={`shell ${flush ? "" : "py-16 sm:py-24 lg:py-32"}`}>
        {children}
      </div>
    </section>
  );
}

/** Section header with engraved index + serif title. */
export function SectionHeader({
  kicker,
  title,
  intro,
  dark = false,
  align = "left",
  titleClassName = "display-lg text-balance",
}: {
  /** Accepted for call-site compatibility; no longer rendered (the numbered
      eyebrow was a template tell). Kept optional so existing `index=".."` pass. */
  index?: string;
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  /** Override the title type for special cases (e.g. a long one-line heading
      that would wrap at the default display-lg). Defaults to the display cut. */
  titleClassName?: string;
}) {
  const accent = dark ? "text-gold-bright" : "text-accent";
  const muted = dark ? "text-on-dark-soft" : "text-ink-soft";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center mx-auto" : ""
      } ${align === "center" ? "max-w-2xl" : "max-w-3xl"}`}
    >
      {kicker && (
        <div
          className={`eyebrow flex items-center gap-3 ${accent} ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-current opacity-50" aria-hidden />
          <span>{kicker}</span>
        </div>
      )}
      <h2 className={titleClassName}>{title}</h2>
      {intro && (
        <p className={`measure-wide text-lg leading-relaxed sm:text-xl ${muted}`}>
          {intro}
        </p>
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
          <hr className="rule-accent" />
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
