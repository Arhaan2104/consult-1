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

/** Shared coin-edge double frame — ties the plates into a matched set. */
function Cartouche() {
  return (
    <>
      <rect x="6" y="6" width="328" height="228" rx="16" strokeWidth="1" opacity="0.3" />
      <rect x="11" y="11" width="318" height="218" rx="11" strokeWidth="1" opacity="0.1" />
    </>
  );
}

/**
 * Faint guilloché rosette centred on the plate (viewBox centre 170,120), turning
 * imperceptibly slowly — the "whisper of motion" shared across every plate. Uses
 * the site-wide .net-spin (220s, frozen under reduced motion).
 */
function SpinRosette({ r = 88, amp = 4, lobes = 44, opacity = 0.06 }) {
  return (
    <path
      className="net-spin"
      d={lobed(170, 120, r, amp, lobes)}
      strokeWidth="1"
      opacity={opacity}
    />
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
      <SpinRosette r={92} opacity={0.05} />

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
export function FairBalance({
  className = "",
  frame = true,
}: {
  className?: string;
  /** Draw the coin-edge cartouche border. Off when the plate sits beside an
      already-bordered card/stack, so it reads as airy line-art, not a box. */
  frame?: boolean;
}) {
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
      {frame && <Cartouche />}

      {/* Faint guilloché rosette behind the scale — slowly turning */}
      <SpinRosette r={78} opacity={0.1} />
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

/* ───────────── Products calculator — repayment composition ring ───────────── */
export function RepaymentRing({ className = "" }: { className?: string }) {
  const cx = 170;
  const cy = 112;
  const R = 56;
  const ticks = Array.from({ length: 24 }, (_, k) => {
    const a = (k / 24) * Math.PI * 2 - Math.PI / 2;
    const major = k % 6 === 0;
    const ro = 64;
    const ri = major ? 58 : 60.5;
    return {
      x1: (cx + ro * Math.cos(a)).toFixed(1),
      y1: (cy + ro * Math.sin(a)).toFixed(1),
      x2: (cx + ri * Math.cos(a)).toFixed(1),
      y2: (cy + ri * Math.sin(a)).toFixed(1),
      major,
    };
  });

  return (
    <svg viewBox="0 0 340 240" className={`block ${className}`} {...SVG} aria-hidden>
      <Cartouche />
      <SpinRosette r={94} opacity={0.05} />

      {/* Tick ring */}
      {ticks.map((t, i) => (
        <path key={i} d={`M${t.x1} ${t.y1} L${t.x2} ${t.y2}`} strokeWidth="1" opacity={t.major ? 0.4 : 0.2} />
      ))}

      {/* Donut: full track = total repayable, accent arc = the interest share */}
      <circle cx={cx} cy={cy} r={R} strokeWidth="5.5" opacity="0.2" />
      <circle
        cx={cx}
        cy={cy}
        r={R}
        strokeWidth="5.5"
        pathLength={100}
        strokeDasharray="27 73"
        transform={`rotate(-90 ${cx} ${cy})`}
        opacity="0.9"
      />
      <circle cx={cx} cy={cy} r="42" strokeWidth="1" opacity="0.12" />

      {/* Centre — total repayable */}
      <text x={cx} y={cy - 3} fontSize="26" textAnchor="middle" {...SERIF}>
        &#8377;
      </text>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        className="font-mono"
        fontSize="6.5"
        letterSpacing="2.2"
        fill="var(--color-ink-faint)"
        stroke="none"
      >
        REPAYABLE
      </text>

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
        PRINCIPAL + SIMPLE DAILY INTEREST
      </text>
    </svg>
  );
}

/* ─────────────── About mission — engraved institution facade ─────────────── */
export function InstitutionMark({ className = "" }: { className?: string }) {
  const cols = [108, 139, 170, 201, 232];

  return (
    <svg viewBox="0 0 340 240" className={`block ${className}`} {...SVG} aria-hidden>
      <Cartouche />
      <SpinRosette r={96} opacity={0.045} />

      {/* Pediment */}
      <path d="M170 52 L96 90 H244 Z" strokeWidth="1.6" opacity="0.85" />
      <path d="M170 62 L112 90 H228 Z" strokeWidth="1" opacity="0.28" />
      <text x="170" y="80" fontSize="12.5" textAnchor="middle" opacity="0.75" {...SERIF}>
        &#8377;
      </text>

      {/* Entablature */}
      <path d="M90 90 H250" strokeWidth="1.6" opacity="0.8" />
      <path d="M96 98 H244" strokeWidth="1.2" opacity="0.5" />

      {/* Colonnade */}
      {cols.map((x) => (
        <g key={x} opacity="0.85">
          <path d={`M${x - 6} 104 H${x + 6}`} strokeWidth="1.3" />
          <path d={`M${x} 106 V176`} strokeWidth="2.1" />
          <path d={`M${x} 106 V176`} strokeWidth="1" opacity="0.3" transform="translate(2.4 0)" />
          <path d={`M${x - 6.5} 178 H${x + 6.5}`} strokeWidth="1.3" />
        </g>
      ))}

      {/* Steps */}
      <path d="M92 180 H248" strokeWidth="1.4" opacity="0.7" />
      <path d="M82 188 H258" strokeWidth="1.6" opacity="0.6" />
      <path d="M73 196 H267" strokeWidth="2" opacity="0.5" />

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
        A LENDING INSTITUTION · EST. 1984
      </text>
    </svg>
  );
}
