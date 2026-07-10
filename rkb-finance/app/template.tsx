"use client";

import { useEffect, type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { useLenis } from "@/components/LenisProvider";
import { EASE } from "@/components/motion/tokens";

/**
 * Route-change enter transition. `template.tsx` remounts on every navigation,
 * so this runs per page. Tiny y (≤8px) to avoid CLS / scroll fighting.
 *
 * Also resets Lenis to the top on navigation — without this, Lenis can keep
 * the previous page's scroll offset.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useLenis();

  useEffect(() => {
    lenisRef?.current?.scrollTo(0, { immediate: true });
  }, [lenisRef]);

  if (reduce) return <>{children}</>;

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
