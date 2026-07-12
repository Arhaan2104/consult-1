"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE } from "./motion/tokens";

/**
 * EngraveRule — the short kicker hairline, but it inks itself in.
 *
 * The old kicker rule was a static `<span className="h-px w-8 …">`. This draws
 * that same hairline from one edge (scaleX 0 → 1) as the header scrolls into
 * view, echoing the engraving language of the hero seal and the banknote
 * textures — a small, precise, Stripe-grade tell that the page is *built*, not
 * generated. Colour is inherited (`bg-current`); width + opacity default to the
 * exact resting look of the rule it replaces, so nothing shifts at rest.
 *
 * scaleX is a pure transform — the flex item keeps its layout width, so the
 * kicker text never moves while the line draws. Reduced motion → drawn, still.
 */
export function EngraveRule({
  width = "w-8",
  opacity = "opacity-50",
  origin = "left",
  delay = 0.12,
  className = "",
}: {
  width?: string;
  opacity?: string;
  origin?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = `block h-px ${width} shrink-0 bg-current ${opacity} ${
    origin === "right" ? "origin-right" : "origin-left"
  } ${className}`;

  if (reduce) return <span aria-hidden className={base} />;

  return (
    <m.span
      aria-hidden
      className={base}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    />
  );
}
