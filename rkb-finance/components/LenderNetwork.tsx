import { sourcingPartners, sourcingPartnerCount } from "@/content/site";

/**
 * The lender behind the network — a radial constellation. R.K. Bansal Finance
 * sits at the core as an engraved medallion (the regulated balance sheet); the
 * digital sourcing apps orbit it, each wired by a flow line that streams inward
 * (applications → the lender). Echoes the hero seal's guilloché language.
 *
 * Server-rendered SVG; motion is CSS-only (frozen under reduced motion).
 * Desktop shows the constellation; small screens get a vertical funnel.
 */

const VB = 720;
const CX = VB / 2;
const CY = 300;
const R = 182; // orbit radius
const HUB = 70; // hub circle radius

function polar(i: number, n: number, radius: number) {
  const a = (-90 + (i * 360) / n) * (Math.PI / 180);
  return {
    x: CX + radius * Math.cos(a),
    y: CY + radius * Math.sin(a),
    cos: Math.cos(a),
    sin: Math.sin(a),
  };
}

/** Sinusoidally lobed ring — one strand of a guilloché rosette. */
function lobed(radius: number, amp: number, lobes: number, steps = 240) {
  let d = "";
  for (let k = 0; k <= steps; k++) {
    const t = (k / steps) * Math.PI * 2;
    const rr = radius + amp * Math.cos(lobes * t);
    d += `${k ? "L" : "M"}${(CX + rr * Math.cos(t)).toFixed(1)} ${(CY + rr * Math.sin(t)).toFixed(1)} `;
  }
  return d + "Z";
}

// Coin-edge label arc, just outside the bezel, sweeping left→right over the top.
const EDGE_R = R + 48;
const EDGE_PATH = `M${CX - EDGE_R} ${CY} A${EDGE_R} ${EDGE_R} 0 0 1 ${CX + EDGE_R} ${CY}`;

export default function LenderNetwork() {
  const n = sourcingPartners.length;

  return (
    <div className="text-accent">
      {/* ─────────── Desktop / tablet: radial constellation ─────────── */}
      <svg
        viewBox={`0 0 ${VB} 600`}
        className="mx-auto hidden h-auto w-full max-w-[47rem] sm:block"
        fill="none"
        role="img"
        aria-label={`R.K. Bansal Finance is the regulated lender behind ${sourcingPartnerCount} digital sourcing partners, including ${sourcingPartners.join(", ")}.`}
      >
        <defs>
          <path id="net-edge" d={EDGE_PATH} />
        </defs>

        {/* Guilloché texture — faint concentric rings + a slowly turning strand */}
        <g stroke="var(--color-line)" opacity="0.8">
          <circle cx={CX} cy={CY} r={R + 40} strokeWidth="1" />
          <circle cx={CX} cy={CY} r={R + 36} strokeWidth="0.75" opacity="0.6" />
          <circle cx={CX} cy={CY} r={R} strokeDasharray="1.5 7" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={HUB + 30} strokeWidth="0.75" />
        </g>
        <path
          className="net-spin"
          d={lobed(R + 18, 6, n * 3)}
          stroke="var(--color-accent)"
          strokeWidth="1"
          opacity="0.16"
        />

        {/* Coin-edge label — echoes the hero seal */}
        <text
          className="font-mono"
          fill="var(--color-ink-faint)"
          fontSize="10"
          letterSpacing="3.5"
        >
          <textPath href="#net-edge" startOffset="50%" textAnchor="middle">
            A FULLY DIGITAL SOURCING NETWORK
          </textPath>
        </text>

        {/* Connectors — a faint wire + a brighter flow streaming inward */}
        {sourcingPartners.map((p, i) => {
          const node = polar(i, n, R - 9);
          const edge = polar(i, n, HUB + 4);
          return (
            <g key={`c-${p}`}>
              <line
                x1={node.x}
                y1={node.y}
                x2={edge.x}
                y2={edge.y}
                stroke="var(--color-line-strong)"
                strokeWidth="1"
                opacity="0.5"
              />
              <line
                x1={node.x}
                y1={node.y}
                x2={edge.x}
                y2={edge.y}
                stroke="var(--color-accent)"
                strokeWidth="1.25"
                className="net-connector net-flow"
              />
            </g>
          );
        })}

        {/* Capital tokens — engraved coins streaming inward to the lender */}
        {sourcingPartners.map((p, i) => {
          const node = polar(i, n, R - 9);
          const edge = polar(i, n, HUB + 4);
          return (
            <circle
              key={`t-${p}`}
              r="3.4"
              cx="0"
              cy="0"
              fill="var(--color-gold)"
              className="net-token"
              style={{
                offsetPath: `path("M ${node.x.toFixed(1)} ${node.y.toFixed(1)} L ${edge.x.toFixed(1)} ${edge.y.toFixed(1)}")`,
                animationDelay: `${((i * 3.4) / n).toFixed(2)}s`,
              }}
            />
          );
        })}

        {/* Partner nodes + labels */}
        {sourcingPartners.map((p, i) => {
          const node = polar(i, n, R);
          const label = polar(i, n, R + 15);
          const anchor = label.cos > 0.25 ? "start" : label.cos < -0.25 ? "end" : "middle";
          const dy = label.sin > 0.5 ? "0.92em" : label.sin < -0.5 ? "-0.4em" : "0.32em";
          return (
            <g key={`n-${p}`}>
              <circle cx={node.x} cy={node.y} r="9" fill="var(--color-canvas)" />
              <circle
                cx={node.x}
                cy={node.y}
                r="6.5"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.55"
              />
              <circle cx={node.x} cy={node.y} r="3" fill="var(--color-accent)" />
              <text
                x={label.x}
                y={label.y}
                textAnchor={anchor}
                dy={dy}
                className="font-display"
                fontSize="15.5"
                fill="var(--color-ink-soft)"
              >
                {p}
              </text>
            </g>
          );
        })}

        {/* Core medallion — the regulated lender */}
        <g>
          {/* Pulse ring — capital received / disbursed */}
          <circle
            cx={CX}
            cy={CY}
            r={HUB}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.25"
            className="net-pulse"
          />
          <circle cx={CX} cy={CY} r={HUB} fill="var(--color-canvas)" />
          <circle cx={CX} cy={CY} r={HUB} fill="var(--color-accent)" opacity="0.05" />
          <circle cx={CX} cy={CY} r={HUB} stroke="var(--color-line-strong)" strokeWidth="1" />
          <path d={lobed(HUB - 9, 2.4, 28)} stroke="var(--color-accent)" strokeWidth="0.75" opacity="0.4" />
          <circle cx={CX} cy={CY} r={HUB - 17} stroke="var(--color-accent)" strokeWidth="0.75" opacity="0.25" />
          <text
            x={CX}
            y={CY - 7}
            textAnchor="middle"
            className="font-display"
            fontSize="36"
            fill="var(--color-gold)"
          >
            &#8377;
          </text>
          <text
            x={CX}
            y={CY + 23}
            textAnchor="middle"
            className="font-mono"
            fontSize="8"
            letterSpacing="2.5"
            fill="var(--color-ink-faint)"
          >
            THE LENDER
          </text>
        </g>
      </svg>

      {/* ─────────────── Mobile: vertical funnel ─────────────── */}
      <div className="sm:hidden">
        <p className="eyebrow mb-4 text-center text-ink-faint">
          A fully digital sourcing network
        </p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)]">
          {sourcingPartners.map((p) => (
            <div key={p} className="flex items-center gap-2.5 bg-canvas px-4 py-3.5">
              <span className="mint-mark h-1.5 w-1.5 shrink-0" aria-hidden />
              <span className="font-display text-base leading-tight text-ink-soft">{p}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center py-5" aria-hidden>
          <span className="h-8 w-px bg-line-strong" />
          <span className="eyebrow text-accent">all funded by</span>
          <span className="mt-2 h-4 w-px bg-line-strong" />
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-line-strong bg-canvas p-8 text-center">
          <span className="font-display text-4xl leading-none text-accent">&#8377;</span>
          <span className="mt-1 font-display text-xl text-ink">R.K. Bansal Finance</span>
          <span className="eyebrow text-ink-faint">RBI-Registered NBFC · The lender since 1984</span>
        </div>
      </div>
    </div>
  );
}
