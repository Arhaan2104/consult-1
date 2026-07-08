/**
 * HeroBanknote — the engraved security-note corners around the hero.
 *
 * Four guilloché corner marks aligned to the page rails, so the rails (the
 * note's vertical sides) close into engraved corners top and bottom — the hero
 * reads as the title cell of a security certificate. Deliberately quiet: the
 * authentic microtype lives on the medallion's coin edge, so the frame stays a
 * whisper, never a wall of text.
 *
 * Pure markup + SVG (no hooks, no client JS). Decorative → aria-hidden and
 * pointer-transparent. Hidden on the narrowest screens.
 */

/** One strand of a guilloché rosette — a sinusoidally lobed ring. */
function lobed(cx: number, cy: number, R: number, amp: number, lobes: number, steps = 140) {
  let d = "";
  for (let k = 0; k <= steps; k++) {
    const t = (k / steps) * Math.PI * 2;
    const rr = R + amp * Math.cos(lobes * t);
    d += `${k ? "L" : "M"}${(cx + rr * Math.cos(t)).toFixed(2)} ${(cy + rr * Math.sin(t)).toFixed(2)} `;
  }
  return d + "Z";
}

/** Engraved corner: a double right-angle bracket with a small guilloché seal. */
function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`h-8 w-8 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden
    >
      {/* right-angle brackets hugging the corner */}
      <path d="M0 0 H21" strokeWidth="1.1" />
      <path d="M0 0 V21" strokeWidth="1.1" />
      <path d="M0 4 H15" strokeWidth="0.7" opacity="0.55" />
      <path d="M4 0 V15" strokeWidth="0.7" opacity="0.55" />
      {/* guilloché seal at the elbow */}
      <path d={lobed(15, 15, 5.4, 1.5, 12)} strokeWidth="0.7" opacity="0.8" />
      <circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  );
}

export default function HeroBanknote() {
  // Match the .page-rails width exactly so the corners land on the vertical
  // rails (the note's sides), not inside the shell's gutter padding.
  const railWidth = "min(100% - 2 * var(--gutter) + 2px, var(--shell))";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] hidden text-accent/40 sm:block"
    >
      <div
        className="absolute left-1/2 top-[5.25rem] flex -translate-x-1/2 justify-between"
        style={{ width: railWidth }}
      >
        <CornerMark />
        <CornerMark className="-scale-x-100" />
      </div>
      <div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-end justify-between"
        style={{ width: railWidth }}
      >
        <CornerMark className="-scale-y-100" />
        <CornerMark className="-scale-100" />
      </div>
    </div>
  );
}
