/**
 * Motion tokens — single source of truth for easing, durations, and springs.
 * Mirrors the CSS tokens in app/globals.css (--ease-rkb, --ease-out-rkb, --dur-*).
 *
 * Rule of thumb:
 *  - `EASE` curves for discrete entrance animations (Reveal, StatCounter, route).
 *  - `SPRING` for anything bound to a continuously-changing scroll value
 *    (parallax, progress bar, hero) so velocity changes feel physical.
 */

// Heritage institutional easing — slow, weighted start. Matches --ease-rkb.
export const EASE = [0.22, 1, 0.36, 1] as const;
// Longer settle for large moves. Matches --ease-out-rkb.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.45,
  base: 0.85,
  slow: 1.4,
} as const;

export const SPRING = {
  /** Parallax / hero — soft, weighty. */
  soft: { stiffness: 80, damping: 20, mass: 0.6 },
  /** Scroll-progress bar — snappy but smooth. */
  bar: { stiffness: 120, damping: 30, mass: 0.5 },
  /** Interactive (magnetic buttons) — quick, lightly springy. */
  snap: { stiffness: 200, damping: 26 },
} as const;
