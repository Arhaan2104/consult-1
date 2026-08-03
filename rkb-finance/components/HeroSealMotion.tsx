"use client";

import {
  m,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { ReactNode } from "react";
import { SPRING } from "./motion/tokens";

/**
 * Scroll-linked wrapper around the (server-rendered) HeroSeal.
 *
 * The seal's own positioning + emerge keyframe + infinite spin live on the
 * inner `.hero-seal` element (untouched). This wrapper adds the scroll exit
 * (scale up, slight rotate, fade) driven by `progress`.
 *
 * `progress` is the hero's scrollYProgress (0 at top → 1 scrolled past).
 * `active` gates the choreography — the exit is written for the PINNED hero
 * (lg+), where the vault holds still while the sheet rises. Below lg the hero
 * scrolls normally, so scaling/fading the seal against that scroll reads as
 * glitch, not craft — the caller passes false and the seal stays put.
 */
export default function HeroSealMotion({
  progress,
  active = true,
  children,
}: {
  progress: MotionValue<number>;
  active?: boolean;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  const scaleRaw = useTransform(progress, [0, 1], [1, 1.18]);
  const scale = useSpring(scaleRaw, SPRING.soft);
  const rotate = useTransform(progress, [0, 1], [0, 8]);
  const opacity = useTransform(progress, [0, 0.7], [1, 0]);

  if (reduce || !active) {
    return (
      <div className="hero-seal-stage absolute inset-0 z-0 overflow-visible" aria-hidden>
        {children}
      </div>
    );
  }

  return (
    <m.div
      aria-hidden
      className="hero-seal-stage absolute inset-0 z-0 overflow-visible [will-change:transform]"
      style={{ scale, rotate, opacity }}
    >
      {children}
    </m.div>
  );
}
