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
 * Scroll- and cursor-linked wrapper around the (server-rendered) HeroSeal.
 *
 * The seal's own positioning + emerge keyframe + infinite spin live on the
 * inner `.hero-seal` element (untouched). This wrapper adds two composed
 * transform layers, kept on separate elements so they never fight each other
 * or the CSS transform:
 *   · OUTER — scroll exit (scale up, slight rotate, fade) driven by `progress`.
 *   · INNER — a subtle cursor parallax (translate + a hair of rotation), so the
 *     medallion leans toward the pointer like a struck coin catching light.
 *
 * `progress` is the hero's scrollYProgress (0 at top → 1 scrolled past).
 * `pointer` is the hero's normalised cursor position (−0.5…0.5 on each axis);
 * omitted / on touch it simply stays centred.
 */
export default function HeroSealMotion({
  progress,
  pointer,
  children,
}: {
  progress: MotionValue<number>;
  pointer?: { x: MotionValue<number>; y: MotionValue<number> };
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  const scaleRaw = useTransform(progress, [0, 1], [1, 1.18]);
  const scale = useSpring(scaleRaw, SPRING.soft);
  const rotate = useTransform(progress, [0, 1], [0, 8]);
  const opacity = useTransform(progress, [0, 0.7], [1, 0]);

  // Cursor parallax (falls back to a steady 0 when no pointer is supplied).
  const zero = useSpring(0, SPRING.soft);
  const pxSrc = pointer?.x ?? zero;
  const pySrc = pointer?.y ?? zero;
  const x = useTransform(pxSrc, (v) => v * 30);
  const y = useTransform(pySrc, (v) => v * 24);
  const tilt = useTransform(pxSrc, (v) => v * 2.6);

  if (reduce) {
    return (
      <div className="absolute inset-0 z-0" aria-hidden>
        {children}
      </div>
    );
  }

  return (
    <m.div
      aria-hidden
      className="absolute inset-0 z-0 [will-change:transform]"
      style={{ scale, rotate, opacity }}
    >
      <m.div
        className="h-full w-full [will-change:transform]"
        style={{ x, y, rotate: tilt }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
