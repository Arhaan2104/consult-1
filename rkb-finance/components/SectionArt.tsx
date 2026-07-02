/**
 * Engraved "plate" illustrations that sit beneath the section text on the left
 * column of the Product (01) and Fair practice (04) sections. Same bank-note
 * line-art vocabulary as the hero seal, lender network and ProcessArt — fine
 * strokes in brand blue (currentColor), faint guilloché, coin-edge microtype —
 * but deliberately low-contrast and airy so they read as a luxurious detail,
 * never a busy infographic.
 *
 * Pure SVG (no hooks) so they render on the server. Sized by the caller; set
 * the colour with `text-accent` on the element.
 *
 * ProductInstrument — a growth plate: the straight, simple-interest line over a
 *   faint ledger grid, staying below the compounding curve it never uses.
 * FairBalance      — a level balance scale (capital ⇋ written terms) resting on
 *   a faint guilloché rosette. Fairness, in equilibrium.
 */

const SVG = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SERIF = {
  stroke: "none",
  fill: "currentColor",
  fontFamily: "Georgia, 'Times New Roman', serif",
  dominantBaseline: "central" as const,
};

/** One strand of a guilloché rosette — a sinusoidally lobed ring. */
function lobed(cx: number, cy: number, R: number, amp: number, lobes: number, steps = 240) {
  let d = "";
  for (let k = 0; k <= steps; k++) {
    const t = (k / steps) * Math.PI * 2;
    const rr = R + amp * Math.cos(lobes * t);
    d += `${k ? "L" : "M"}${(cx + rr * Math.cos(t)).toFixed(1)} ${(cy + rr * Math.sin(t)).toFixed(1)} `;
  }
  return d + "Z";
}

/** Shared coin-edge double frame — ties the two plates into a matched set. */
function Cartouche() {
  return (
    <>
      <rect x="6" y="6" width="328" height="228" rx="16" strokeWidth="1" opacity="0.3" />
      <rect x="11" y="11" width="318" height="218" rx="11" strokeWidth="1" opacity="0.1" />
    </>
  );
}

/* ─────────────────── Product — simple-interest growth plate ─────────────────── */
export function ProductInstrument({ className = "" }: { className?: string }) {
  const x0 = 46;
  const x1 = 298;
  const yb = 184; // baseline
  const yt = 46; // top of plot
  const simEnd = { x: x1, y: 108 }; // straight line end (total repayable)

  const vGrid = [88, 130, 172, 214, 256];
  const hGrid = [150, 116, 82];

  return (
    <svg
      viewBox="0 0 340 240"
      className={`block ${className}`}
      {...SVG}
      aria-hidden
    >
      <Cartouche />

      {/* Faint ledger grid inside the plot */}
      <g strokeWidth="1" opacity="0.08">
        {vGrid.map((x) => (
          <line key={`v${x}`} x1={x} y1={yt} x2={x} y2={yb} />
        ))}
        {hGrid.map((y) => (
          <line key={`h${y}`} x1={x0} y1={y} x2={x1} y2={y} />
        ))}
      </g>

      {/* Axes */}
      <path d={`M${x0} ${yt} V${yb} H${x1}`} strokeWidth="1.2" opacity="0.3" />

      {/* ₹ on the value axis */}
      <text x="28" y={yb} fontSize="12.5" textAnchor="middle" opacity="0.7" {...SERIF}>
        &#8377;
      </text>

      {/* Compounding curve — the growth we deliberately never charge (ghost) */}
      <path
        d={`M${x0} ${yb} C 150 168, 236 96, ${x1} 56`}
        strokeWidth="1.4"
        strokeDasharray="2 5"
        opacity="0.24"
      />

      {/* Simple-interest area + straight line */}
      <path
        d={`M${x0} ${yb} L${simEnd.x} ${simEnd.y} L${x1} ${yb} Z`}
        fill="currentColor"
        stroke="none"
        opacity="0.05"
      />
      <path d={`M${x0} ${yb} L${simEnd.x} ${simEnd.y}`} strokeWidth="2.2" opacity="0.9" />

      {/* Nodes: principal (origin) and repayable (end, haloed) */}
      <circle cx={x0} cy={yb} r="3.2" fill="currentColor" stroke="none" />
      <circle cx={simEnd.x} cy={simEnd.y} r="14" fill="currentColor" stroke="none" opacity="0.08" />
      <circle cx={simEnd.x} cy={simEnd.y} r="4.4" fill="var(--color-canvas)" strokeWidth="1.5" />
      <circle cx={simEnd.x} cy={simEnd.y} r="1.7" fill="currentColor" stroke="none" />

      {/* Coin-edge caption */}
      <text
        x="170"
        y="220"
        textAnchor="middle"
        className="font-mono"
        fontSize="8"
        letterSpacing="2.4"
        fill="var(--color-ink-faint)"
        stroke="none"
      >
        FIXED RATE · NO COMPOUNDING
      </text>
    </svg>
  );
}

/* ─────────────────────── Fair practice — balance scale ─────────────────────── */
export function FairBalance({ className = "" }: { className?: string }) {
  const cx = 170;
  const beamY = 84;
  const beamHalf = 84; // beam reaches cx ± beamHalf
  const lx = cx - beamHalf;
  const rx = cx + beamHalf;
  const panY = 150;

  const pan = (px: number) =>
    `M${px - 20} ${panY} H${px + 20} M${px - 20} ${panY} Q${px} ${panY + 16} ${px + 20} ${panY}`;
  const strings = (px: number) => `M${px} ${beamY} L${px - 15} ${panY} M${px} ${beamY} L${px + 15} ${panY}`;

  return (
    <svg
      viewBox="0 0 340 240"
      className={`block ${className}`}
      {...SVG}
      aria-hidden
    >
      <Cartouche />

      {/* Faint guilloché rosette behind the scale */}
      <path d={lobed(cx, 120, 78, 4, 44)} strokeWidth="1" opacity="0.1" />
      <circle cx={cx} cy="120" r="90" strokeWidth="1" opacity="0.06" />

      {/* Base plinth + ground */}
      <path d="M148 198 H192" strokeWidth="2" opacity="0.7" />
      <path d="M155 198 L161 184 H179 L185 198" opacity="0.6" />

      {/* Central post + finial */}
      <path d={`M${cx} 184 V78`} strokeWidth="1.6" opacity="0.85" />
      <circle cx={cx} cy="72" r="3.2" fill="currentColor" stroke="none" />

      {/* Fulcrum */}
      <path d={`M${cx - 8} 90 L${cx} 80 L${cx + 8} 90`} opacity="0.7" />

      {/* Level beam */}
      <path d={`M${lx} ${beamY} H${rx}`} strokeWidth="1.8" opacity="0.9" />
      <circle cx={lx} cy={beamY} r="2.4" fill="currentColor" stroke="none" />
      <circle cx={rx} cy={beamY} r="2.4" fill="currentColor" stroke="none" />

      {/* Left pan — capital (₹) */}
      <path d={strings(lx)} strokeWidth="1" opacity="0.4" />
      <path d={pan(lx)} strokeWidth="1.5" opacity="0.85" />
      <text x={lx} y={panY - 12} fontSize="15" textAnchor="middle" opacity="0.8" {...SERIF}>
        &#8377;
      </text>

      {/* Right pan — written terms (a document) */}
      <path d={strings(rx)} strokeWidth="1" opacity="0.4" />
      <path d={pan(rx)} strokeWidth="1.5" opacity="0.85" />
      <g opacity="0.8">
        <rect x={rx - 8} y={panY - 26} width="16" height="20" rx="2.5" strokeWidth="1.4" />
        <path
          d={`M${rx - 4} ${panY - 20} H${rx + 4} M${rx - 4} ${panY - 16} H${rx + 4} M${rx - 4} ${panY - 12} H${rx + 1}`}
          strokeWidth="1"
          opacity="0.7"
        />
      </g>

      {/* Coin-edge caption */}
      <text
        x={cx}
        y="220"
        textAnchor="middle"
        className="font-mono"
        fontSize="8"
        letterSpacing="2.4"
        fill="var(--color-ink-faint)"
        stroke="none"
      >
        FAIR PRACTICE CODE · RBI OVERSIGHT
      </text>
    </svg>
  );
}
