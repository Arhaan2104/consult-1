/**
 * Cohesive engraved line-art icon set — same vocabulary as the step graphics
 * (1.6 stroke, round joins, currentColor, faint accent fills). Used on the
 * Advantages / Features cards and the trust-credentials band so one visual
 * language runs across the whole site.
 */
import type { ReactElement } from "react";

const S = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GLYPHS: Record<string, ReactElement> = {
  // ── benefits ──────────────────────────────────────────────
  "coin-slash": (
    <svg {...S}>
      <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.07" stroke="none" />
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 9h4M10.5 9c2 0 2 3 0 3M9.5 12h3.2M10.2 12l3 3.5" opacity="0.85" />
      <path d="M5.5 18.5 18.5 5.5" />
    </svg>
  ),
  "trend-down": (
    <svg {...S}>
      <path d="M3 7l5.5 5.5 3.5-3.5 5 5" />
      <path d="M21 9v5h-5" />
    </svg>
  ),
  tag: (
    <svg {...S}>
      <path d="M3.5 12.5l8-8H20v8.5l-8 8z" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M3.5 12.5l8-8H20v8.5l-8 8z" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </svg>
  ),
  unlock: (
    <svg {...S}>
      <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" opacity="0.06" stroke="none" />
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7.5A4 4 0 0 1 15.5 6" />
      <path d="M12 14.5v2" />
    </svg>
  ),
  people: (
    <svg {...S}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5" />
      <path d="M15.5 19a5.5 5.5 0 0 0-2-4.3" />
    </svg>
  ),
  bolt: (
    <svg {...S}>
      <path d="M13 2 4 13.5h6l-1 8.5L19 10.5h-6z" fill="currentColor" opacity="0.08" stroke="none" />
      <path d="M13 2 4 13.5h6l-1 8.5L19 10.5h-6z" />
    </svg>
  ),
  // ── product features ─────────────────────────────────────
  "check-circle": (
    <svg {...S}>
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.06" stroke="none" />
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.2l2.6 2.6L16 9.5" />
    </svg>
  ),
  clock: (
    <svg {...S}>
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.06" stroke="none" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  ),
  refresh: (
    <svg {...S}>
      <path d="M4 9a8 8 0 0 1 13.5-2.8L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 15a8 8 0 0 1-13.5 2.8L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  ),
  calendar: (
    <svg {...S}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" fill="currentColor" opacity="0.06" stroke="none" />
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
      <path d="M8 14h5M8 17h3" opacity="0.85" />
    </svg>
  ),
  document: (
    <svg {...S}>
      <path d="M6 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 20V5A1.5 1.5 0 0 1 6 3.5z" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M13 3.5l5 5M13 3.5V8.5h5" />
      <path d="M6 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 20V5A1.5 1.5 0 0 1 6 3.5z" />
      <path d="M8.5 13h7M8.5 16.5h5" opacity="0.85" />
    </svg>
  ),
  // ── trust emblems ────────────────────────────────────────
  shield: (
    <svg {...S}>
      <path d="M12 3l7 2.6v5.2c0 4.8-3 7.6-7 9.2-4-1.6-7-4.4-7-9.2V5.6z" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M12 3l7 2.6v5.2c0 4.8-3 7.6-7 9.2-4-1.6-7-4.4-7-9.2V5.6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </svg>
  ),
  heritage: (
    <svg {...S}>
      <path d="M12 3.5l8 4.5H4z" fill="currentColor" opacity="0.07" stroke="none" />
      <path d="M12 3.5l8 4.5H4z" />
      <path d="M5.5 8v9M9 8v9M15 8v9M18.5 8v9" />
      <path d="M3.5 20.5h17" />
    </svg>
  ),
  network: (
    <svg {...S}>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.5 6.8 6.3 16.1M13.5 6.8l4.2 9.3M7 18h10" opacity="0.85" />
    </svg>
  ),
  ledger: (
    <svg {...S}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" fill="currentColor" opacity="0.06" stroke="none" />
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" opacity="0.85" />
    </svg>
  ),
};

export default function LineIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const glyph = GLYPHS[name];
  if (!glyph) return null;
  return (
    <span aria-hidden className={`block ${className}`}>
      {glyph}
    </span>
  );
}
