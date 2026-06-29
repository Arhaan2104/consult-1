"use client";

import {
  motion,
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
 * inner `.hero-seal` element (untouched). This OUTER motion.div applies the
 * scroll-exit transform (scale up, slight rotate, fade) — two separate
 * elements so the CSS transform and the motion transform never fight.
 *
 * `progress` is the hero section's scrollYProgress (0 at top → 1 scrolled past).
 */
export default function HeroSealMotion({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  const scaleRaw = useTransform(progress, [0, 1], [1, 1.18]);
  const scale = useSpring(scaleRaw, SPRING.soft);
  const rotate = useTransform(progress, [0, 1], [0, 8]);
  const opacity = useTransform(progress, [0, 0.7], [1, 0]);

  if (reduce) {
    return (
      <div className="absolute inset-0 z-0" aria-hidden>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-0 [will-change:transform]"
      style={{ scale, rotate, opacity }}
    >
      {children}
    </motion.div>
  );
}
