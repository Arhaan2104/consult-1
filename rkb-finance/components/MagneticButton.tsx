"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { SPRING } from "./motion/tokens";

/**
 * A button that gently pulls toward the cursor (±6px) on fine-pointer devices.
 * Reserved for one or two loud CTAs. No-ops on touch / reduced-motion: the
 * pointer listeners only act when (pointer: fine) AND motion is allowed, so
 * phones and reduced-motion users get a plain button.
 *
 * Structure: an outer motion.span carries the magnetic transform + pointer
 * handlers; the inner Link/anchor carries the full button styling (so hover,
 * lift, focus, and SPA navigation all work normally).
 */
const MAX = 6;

export default function MagneticButton({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external: boolean;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.snap);
  const sy = useSpring(y, SPRING.snap);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-MAX, Math.min(MAX, (dx / r.width) * 2 * MAX)));
    y.set(Math.max(-MAX, Math.min(MAX, (dy / r.height) * 2 * MAX)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex w-full sm:w-auto [will-change:transform]"
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </m.span>
  );
}
