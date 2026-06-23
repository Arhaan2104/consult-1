"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/* Modern fintech motion: quick, fluid, lightly springy. */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "span" | "li";
  id?: string;
};

export function Reveal({ children, className, delay = 0, as = "div", id }: RevealProps) {
  const M = motion[as];
  return (
    <M
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE, delay } },
      }}
    >
      {children}
    </M>
  );
}

export function Stagger({ children, className, as = "div" }: RevealProps) {
  const M = motion[as];
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
  const M = motion[as];
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  );
}
