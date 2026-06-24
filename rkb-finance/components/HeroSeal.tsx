/**
 * HeroSeal — an engraved guilloché medallion.
 *
 * Every line is generated from parametric curves (superposed rosettes + a
 * sinusoidal guilloché braid), the same line-art family used on banknotes,
 * share certificates and minted coins — the native visual grammar of a
 * regulated financial house. Not stock art, not a gradient.
 *
 * Rendered server-side as static SVG. Coordinates are deterministic, so it
 * is hydration-safe. Motion (slow counter-rotation + a one-time engrave
 * reveal) lives in CSS and collapses to a static state under
 * prefers-reduced-motion.
 */

const TAU = Math.PI * 2;

/** Superposed rosette: x = R1·cosθ + R2·cos(kθ), y = R1·sinθ + R2·sin(kθ). */
function rosette(k: number, R1: number, R2: number, phase = 0, steps = 900) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const x = R1 * Math.cos(t) + R2 * Math.cos(k * t + phase);
    const y = R1 * Math.sin(t) + R2 * Math.sin(k * t + phase);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d + "Z";
}

/** Sinusoidally modulated ring — one strand of a guilloché braid. */
function braid(R: number, amp: number, lobes: number, phase = 0, steps = 900) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const rr = R + amp * Math.cos(lobes * t + phase);
    d += `${i ? "L" : "M"}${(rr * Math.cos(t)).toFixed(1)} ${(rr * Math.sin(t)).toFixed(1)} `;
  }
  return d + "Z";
}

// Coin-edge lettering circle (starts at 12 o'clock, sweeps clockwise).
const EDGE_R = 187;
const EDGE_C = TAU * EDGE_R;
const EDGE_PATH = `M0 ${-EDGE_R} A${EDGE_R} ${EDGE_R} 0 1 1 0 ${EDGE_R} A${EDGE_R} ${EDGE_R} 0 1 1 0 ${-EDGE_R}Z`;
const EDGE_TEXT =
  "R.K. BANSAL FINANCE · EST. 1984 · RBI-REGISTERED NBFC · R.K. BANSAL FINANCE · EST. 1984 · RBI-REGISTERED NBFC · ";

export default function HeroSeal() {
  return (
    <div className="hero-seal" aria-hidden>
      <svg viewBox="-210 -210 420 420" fill="none" stroke="currentColor">
        {/* Fixed bezel — outer rings */}
        <g opacity="0.6">
          <circle r="201" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
          <circle r="197" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle r="178" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle r="156" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
        </g>

        {/* Coin-edge lettering — fixed */}
        <defs>
          <path id="seal-edge" d={EDGE_PATH} />
        </defs>
        <text
          className="font-display seal-edge-text"
          fill="currentColor"
          stroke="none"
          opacity="0.85"
        >
          <textPath
            href="#seal-edge"
            startOffset="0"
            textLength={EDGE_C}
            lengthAdjust="spacing"
          >
            {EDGE_TEXT}
          </textPath>
        </text>

        {/* Guilloché braid — slow turn one way */}
        <g className="seal-spin-rev" opacity="0.7">
          <path
            className="seal-draw"
            d={braid(167, 8, 48, 0)}
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: "0.25s" }}
          />
          <path
            className="seal-draw"
            d={braid(167, 8, 48, Math.PI)}
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: "0.45s" }}
          />
        </g>

        {/* Rosette cluster — slow turn the other way */}
        <g className="seal-spin">
          <path
            className="seal-draw"
            d={rosette(7, 106, 44, 0)}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity="0.9"
            style={{ animationDelay: "0.35s" }}
          />
          <path
            className="seal-draw"
            d={rosette(7, 106, 44, Math.PI / 7)}
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
            opacity="0.65"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            className="seal-draw"
            d={rosette(13, 60, 20, 0)}
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
            opacity="0.8"
            style={{ animationDelay: "0.85s" }}
          />
        </g>

        {/* Center fleuron */}
        <g opacity="0.8">
          <path
            d={rosette(8, 9, 6, 0, 360)}
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
          />
          <circle r="2.2" fill="currentColor" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
