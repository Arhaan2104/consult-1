"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honour the user's reduced-motion preference across all Motion animations. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
