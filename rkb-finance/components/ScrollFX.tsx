"use client";

import { useRef, type ReactNode } from "react";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { EASE, SPRING } from "./motion/tokens";

type El = "div" | "section" | "span";

/**
 * Parallax — depth translation as the element passes through the viewport.
 * speed: fraction of travel (+0.12 drifts slower than scroll). Subtle by default.
 * Reduced motion → plain element, no transform.
 */
export function Parallax({
  children,
  speed = 0.12,
  axis = "y",
  spring = true,
  as = "div",
  className,
}: {
  children: ReactNode;
  speed?: number;
  axis?: "y" | "x";
  spring?: boolean;
  as?: El;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = 100 * speed;
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smooth = useSpring(raw, SPRING.soft);
  const value = spring ? smooth : raw;

  const M = m[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <M
      ref={ref}
      className={className}
      style={axis === "y" ? { y: value } : { x: value }}
    >
      {children}
    </M>
  );
}

/**
 * TextReveal — splits a string into words and staggers a mask-up reveal.
 * The loud typographic moment. aria-label carries the full text; spans hidden.
 * Reduced motion → plain string.
 */
export function TextReveal({
  text,
  className,
  stagger = 0.045,
  as = "h2",
}: {
  text: string;
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");
  const MotionTag = m[as];

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="mr-[0.26em] inline-block overflow-hidden align-bottom"
          // Head/foot room so the tight display line-height + overflow mask
          // never shaves ascenders or descenders (e.g. the g in "right", the y
          // in "your"). Negative margins cancel the padding so layout and word
          // spacing are unchanged; the reveal fades in as it rises, so the extra
          // foot room never lets a masked word peek.
          style={{
            paddingTop: "0.18em",
            paddingBottom: "0.36em",
            marginTop: "-0.18em",
            marginBottom: "-0.36em",
          }}
        >
          <m.span
            className="inline-block"
            variants={{
              hidden: { y: "120%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </MotionTag>
  );
}
