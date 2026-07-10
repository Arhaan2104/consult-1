"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/components/motion/tokens";

/**
 * CountUp — animates the numeric part of a display value ("₹6.1 Crore",
 * "19,000") from zero when it scrolls into view. Renders the final value on
 * the server so SEO / no-JS / reduced-motion all see the real figure.
 */
export default function CountUp({
  value,
  className,
  duration = 1.7,
  delay = 0,
}: {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/[\d,]+(?:\.\d+)?/);
    if (!inView || reduce || !el || !match) return;

    const raw = match[0];
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const grouped = raw.includes(",");

    const controls = animate(0, target, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        const formatted = grouped
          ? Math.round(v).toLocaleString("en-IN")
          : v.toFixed(decimals);
        el.textContent = value.replace(raw, formatted);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
