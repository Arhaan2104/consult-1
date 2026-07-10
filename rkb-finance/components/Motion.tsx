"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE, DUR } from "./motion/tokens";

/* Heritage motion: slow, weighted, precise. EASE/DUR live in motion/tokens. */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
};

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "span" | "li";
  id?: string;
  /** Add a soft focus-in (blur px at start). Default 0 (off). */
  blur?: number;
  /** Vertical travel in px. Default 18. */
  distance?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  id,
  blur = 0,
  distance = 18,
}: RevealProps) {
  const M = m[as];
  return (
    <M
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={{
        hidden: { opacity: 0, y: distance, ...(blur ? { filter: `blur(${blur}px)` } : {}) },
        show: {
          opacity: 1,
          y: 0,
          ...(blur ? { filter: "blur(0px)" } : {}),
          transition: { duration: DUR.base, ease: EASE, delay },
        },
      }}
    >
      {children}
    </M>
  );
}

export function Stagger({ children, className, as = "div" }: RevealProps) {
  const M = m[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={container}
    >
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: RevealProps) {
  const M = m[as];
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  );
}
