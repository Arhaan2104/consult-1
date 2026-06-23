"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/**
 * Animates the first numeric run inside a value string on scroll-in.
 * "61" -> counts up; "B-14.00700" -> static (multiple digit-runs).
 * Respects prefers-reduced-motion.
 */
export default function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  // Derived once per value — stable across renders (no animation restart loop).
  const { target, prefix, suffix } = useMemo(() => {
    const runs = value.match(/[\d,]+/g);
    const m = runs && runs.length === 1 ? value.match(/[\d,]+/) : null;
    if (!m) return { target: null as number | null, prefix: "", suffix: "" };
    const [p, s] = value.split(m[0]);
    return { target: parseInt(m[0].replace(/,/g, ""), 10), prefix: p, suffix: s };
  }, [value]);

  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (!inView || target === null) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(0, target, {
      duration: reduced ? 0 : 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString("en-IN")),
    });
    return () => controls.stop();
  }, [inView, target]);

  if (target === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
