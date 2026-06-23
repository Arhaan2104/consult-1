"use client";

import type { ReactNode } from "react";

/** Slow, continuous marquee. Pauses on hover. Frozen under reduced motion. */
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
      <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-4 pr-4 group-hover:[animation-play-state:paused]">
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-4 pr-4 group-hover:[animation-play-state:paused]"
      >
        {children}
      </div>
    </div>
  );
}
