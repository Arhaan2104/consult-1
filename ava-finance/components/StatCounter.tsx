"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/**
 * Animates the single digit-run inside a value string on scroll-in.
 * "157k+" -> counts the 157; "₹200cr+" -> counts the 200.
 * Values with multiple digit-runs (codes) stay static.
 */
export default function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const runs = value.match(/[\d,]+/g);
  const match = runs && runs.length === 1 ? value.match(/[\d,]+/) : null;
  const target = match ? parseInt(match[0].replace(/,/g, ""), 10) : null;
  const [display, setDisplay] = useState(target ? "0" : value);

  useEffect(() => {
    if (!inView || target === null || !match) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(0, target, {
      duration: reduced ? 0 : 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString("en-IN")),
    });
    return () => controls.stop();
  }, [inView, target, match]);

  if (target === null || !match) {
    return <span ref={ref}>{value}</span>;
  }

  const [prefix, suffix] = value.split(match[0]);
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
