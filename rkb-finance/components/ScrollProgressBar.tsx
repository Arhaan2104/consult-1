"use client";

import { m, useScroll, useSpring, useReducedMotion } from "motion/react";
import { SPRING } from "./motion/tokens";

/**
 * Hairline scroll-progress indicator pinned to the very top edge.
 * Spring-smoothed against the window scroll (Lenis drives real scroll, so this
 * tracks it via the frame-synced provider). Static under reduced motion.
 */
export default function ScrollProgressBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, SPRING.bar);
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,#eac668,#d9a53f,#b88624)] pointer-events-none"
    />
  );
}
