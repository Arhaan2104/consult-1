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
// The lettering band lives in the ring channel between r=197 and r=178.
//
// We deliberately do NOT use `dominant-baseline: central` to centre the text:
// browsers (notably Safari) disagree on how the central baseline maps onto a
// textPath, which slides the caps toward one ring. Instead we use the default
// *alphabetic* baseline — positioned identically everywhere — and place the
// PATH so the caps centre by geometry. Glyphs sit on the baseline and grow
// OUTWARD (toward r=197); with negligible descent for all-caps, dropping the
// baseline half a cap-ascent below the channel midline centres the ink.
// CAP_ASCENT is the tight-ink cap height of the seal font (Plus Jakarta Sans
// 500) at 12.5px, measured via canvas + pixel-scanned on the rendered seal;
// re-measure if the seal font or size changes.
const RING_OUTER = 197;
const RING_INNER = 178;
const CHANNEL_MID = (RING_OUTER + RING_INNER) / 2; // 187.5
const CAP_ASCENT = 9.3;
const EDGE_R = CHANNEL_MID - CAP_ASCENT / 2; // ≈ 182.85
const EDGE_C = TAU * EDGE_R;
const EDGE_PATH = `M0 ${-EDGE_R} A${EDGE_R} ${EDGE_R} 0 1 1 0 ${EDGE_R} A${EDGE_R} ${EDGE_R} 0 1 1 0 ${-EDGE_R}Z`;
const EDGE_TEXT =
  "R.K. BANSAL FINANCE · EST. 1984 · RBI-REGISTERED NBFC · R.K. BANSAL FINANCE · EST. 1984 · RBI-REGISTERED NBFC · ";

// Machined minute-track — evenly spaced radial ticks in the outer bezel
// groove (between r=197 and r=201), every 12th cut slightly deeper.
const TICKS = Array.from({ length: 96 }, (_, i) => {
  const a = (i / 96) * TAU;
  const deep = i % 12 === 0;
  const r0 = deep ? 197.6 : 198.4;
  const r1 = deep ? 200.4 : 199.9;
  return {
    x1: r0 * Math.sin(a),
    y1: -r0 * Math.cos(a),
    x2: r1 * Math.sin(a),
    y2: -r1 * Math.cos(a),
    deep,
  };
});

export default function HeroSeal() {
  return (
    <div className="hero-seal" aria-hidden>
      <svg viewBox="-210 -210 420 420" fill="none" stroke="currentColor">
        <defs>
          {/* Minted-gold light — top-left catches the light, lower-right
              falls into shadow, so the line-art reads as struck metal. */}
          <linearGradient
            id="seal-gold"
            x1="-180"
            y1="-180"
            x2="180"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#dfb763" />
            <stop offset="0.45" stopColor="#c99e46" />
            <stop offset="1" stopColor="#97711f" />
          </linearGradient>
          <path id="seal-edge" d={EDGE_PATH} />
        </defs>

        {/* Fixed bezel — outer rings */}
        <g opacity="0.75" stroke="url(#seal-gold)">
          <circle r="201" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
          <circle r="197" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          <circle r="178" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          <circle r="156" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
        </g>

        {/* Machined minute-track in the outer groove (197 → 201) */}
        <g stroke="url(#seal-gold)">
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1.toFixed(2)}
              y1={t.y1.toFixed(2)}
              x2={t.x2.toFixed(2)}
              y2={t.y2.toFixed(2)}
              strokeWidth={t.deep ? 1.1 : 0.6}
              opacity={t.deep ? 0.85 : 0.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Coin-edge lettering — alphabetic baseline dropped below the channel
            midline (see EDGE_R) so the caps sit centred between the rings in
            every browser. */}
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
        <g className="seal-spin-rev" opacity="0.75" stroke="url(#seal-gold)">
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
        <g className="seal-spin" stroke="url(#seal-gold)">
          <path
            className="seal-draw"
            d={rosette(7, 106, 44, 0)}
            strokeWidth="1.1"
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

        {/* Center — the R.K. Bansal coin mark, re-struck in engraved gold:
            the rupee glyph inside a double ring, straight from the logo. */}
        <g opacity="0.9" stroke="url(#seal-gold)">
          <circle r="36" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          <circle r="30" strokeWidth="0.75" opacity="0.75" vectorEffect="non-scaling-stroke" />
          <text
            y="1.5"
            fontSize="38"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Georgia, 'Times New Roman', serif"
            fill="url(#seal-gold)"
            stroke="none"
          >
            &#8377;
          </text>
        </g>
      </svg>
    </div>
  );
}
