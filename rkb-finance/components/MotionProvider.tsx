"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Honour the user's reduced-motion preference across all Motion animations,
 * and load the slim `domAnimation` feature bundle via LazyMotion — every
 * animated component uses `m.*` (not `motion.*`), which drops ~25KB of
 * unused motion features from every page. `strict` turns any accidental
 * `motion.*` usage into a loud dev error instead of a silent bundle bloat.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
