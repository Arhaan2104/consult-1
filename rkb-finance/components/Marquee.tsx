"use client";

import type { ReactNode } from "react";

/**
 * Slow, continuous marquee. Pauses on hover. CSS-driven (cheap),
 * and frozen entirely under prefers-reduced-motion via globals.css.
 */
export default function Marquee({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex shrink-0 animate-[marquee_42s_linear_infinite] gap-12 pr-12 group-hover:[animation-play-state:paused]">
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-[marquee_42s_linear_infinite] gap-12 pr-12 group-hover:[animation-play-state:paused]"
      >
        {children}
      </div>
    </div>
  );
}
