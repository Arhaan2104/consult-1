/**
 * MoneyConveyor — the loan's journey as a live wire: application in, funds
 * out, R.K. Bansal underwriting at the centre. Gold rupee tokens ride the
 * line (CSS offset-path; frozen invisible under reduced motion, where the
 * engraved diagram still reads complete).
 *
 * Server-rendered SVG, animation is pure CSS (.flow-token / .flow-dash).
 */

const STOPS = [
  { x: 110, label: "Your application", note: "100% ONLINE" },
  { x: 450, label: "R.K. Bansal funds it", note: "RBI-REGISTERED LENDER" },
  { x: 790, label: "Your bank account", note: "WITHIN X HOURS" },
] as const;

const WIRE = "M110 74 C 220 30, 340 30, 450 74 S 680 118, 790 74";

function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#eac668" />
        <stop offset="0.5" stopColor="#d9a53f" />
        <stop offset="1" stopColor="#b88624" />
      </linearGradient>
    </defs>
  );
}

/**
 * The scene is stacked as four svg layers in the original paint order (wire
 * bed → animated dash stream → stops + labels → riding tokens). The two
 * animated layers are promoted to their own compositor layers (.anim-layer),
 * so the per-frame dash/offset repaints never re-rasterise the engraved
 * stops, labels and microtype beneath them.
 */
export default function MoneyConveyor({ className = "" }: { className?: string }) {
  return (
    <div className={`money-scene-frame ${className}`}>
      <div className="relative">
        {/* Layer 1 — the wire bed (in flow: sizes the box) */}
        <svg
          viewBox="0 0 900 190"
          className="h-auto w-full text-accent"
          fill="none"
          role="img"
          aria-label="Money flows from your application, through R.K. Bansal Finance as the funding lender, into your bank account."
        >
          <path d={WIRE} stroke="currentColor" strokeWidth="1" opacity="0.18" />
        </svg>

        {/* Layer 2 — the animated dashed stream */}
        <svg
          viewBox="0 0 900 190"
          className="anim-layer pointer-events-none absolute inset-0 h-full w-full text-accent"
          fill="none"
          aria-hidden
        >
          <path
            d={WIRE}
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="7 13"
            opacity="0.55"
            className="flow-dash"
          />
        </svg>

        {/* Layer 3 — stops + labels */}
        <svg
          viewBox="0 0 900 190"
          className="pointer-events-none absolute inset-0 h-full w-full text-accent"
          fill="none"
          aria-hidden
        >
          <GoldDefs id="conveyor-gold" />

          {/* Stops */}
        {STOPS.map((s, i) => (
          <g key={s.label}>
            <circle cx={s.x} cy="74" r={i === 1 ? 30 : 22} fill="var(--color-canvas)" stroke="currentColor" strokeWidth={i === 1 ? 2 : 1.3} />
            <circle cx={s.x} cy="74" r={i === 1 ? 23 : 16.5} stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
            {i === 0 && (
              <g stroke="currentColor" opacity="0.85">
                <rect x={s.x - 8} y={64} width="16" height="20" rx="2.5" strokeWidth="1.4" />
                <path d={`M${s.x - 4} 70 H${s.x + 4} M${s.x - 4} 74.5 H${s.x + 4} M${s.x - 4} 79 H${s.x}`} strokeWidth="1" opacity="0.7" />
              </g>
            )}
            {i === 1 && (
              <text
                x={s.x}
                y="75.5"
                fontSize="26"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Georgia, 'Times New Roman', serif"
                fill="url(#conveyor-gold)"
                stroke="none"
              >
                &#8377;
              </text>
            )}
            {i === 2 && (
              <g stroke="currentColor" opacity="0.85" strokeWidth="1.3">
                <path d={`M${s.x - 11} 71 L${s.x} 62 L${s.x + 11} 71 Z`} />
                <path d={`M${s.x - 8} 71 V84 M${s.x} 71 V84 M${s.x + 8} 71 V84 M${s.x - 12} 84 H${s.x + 12}`} />
              </g>
            )}
            <text x={s.x} y="136" textAnchor="middle" fontSize="17" className="font-display" fill="var(--color-ink)" stroke="none">
              {s.label}
            </text>
            <text x={s.x} y="158" textAnchor="middle" fontSize="9" letterSpacing="2" className="font-mono" fill="var(--color-ink-faint)" stroke="none">
              {s.note}
            </text>
          </g>
        ))}
        </svg>

        {/* Layer 4 — gold tokens riding the wire */}
        <svg
          viewBox="0 0 900 190"
          className="anim-layer pointer-events-none absolute inset-0 h-full w-full text-accent"
          fill="none"
          aria-hidden
        >
          <GoldDefs id="conveyor-gold-t" />
          {["0s", "1.2s", "2.4s"].map((delay) => (
            <g key={delay} className="flow-token" style={{ offsetPath: `path("${WIRE}")`, animationDelay: delay }}>
              <circle r="12" fill="url(#conveyor-gold-t)" />
              <circle r="12" stroke="#8a6118" strokeWidth="0.9" />
              <circle r="8.6" stroke="#8a6118" strokeWidth="0.6" opacity="0.6" />
              <text
                y="0.5"
                fontSize="12"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Georgia, 'Times New Roman', serif"
                fill="#6f4e13"
                stroke="none"
              >
                &#8377;
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
