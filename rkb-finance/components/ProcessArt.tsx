/**
 * Large engraved plate illustrations for the three "How it works" stages —
 * bank-note line-art in the same guilloché vocabulary as the hero seal and the
 * lender-network diagram (currentColor stroke, faint accent fills, round joins).
 *   0 — Application : a filled loan form + fountain pen
 *   1 — Underwriting: a precision decision gauge, needle swung to APPROVED
 *   2 — Disbursal   : funds arcing into a bank account, credited
 *
 * Pure SVG (no hooks) so it can render on the server. Sized by the caller.
 */

const P = {
  viewBox: "0 0 320 320",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const RUPEE = {
  textAnchor: "middle" as const,
  dominantBaseline: "central" as const,
  fontFamily: "Georgia, 'Times New Roman', serif",
  stroke: "none",
  fill: "currentColor",
};

function ApplicationArt() {
  return (
    <svg {...P} aria-hidden>
      {/* Sheet */}
      <rect x="78" y="42" width="140" height="236" rx="12" fill="currentColor" opacity="0.04" stroke="none" />
      <rect x="78" y="42" width="140" height="236" rx="12" />

      {/* Header band with ₹ seal + title lines */}
      <path d="M78 88 H218" opacity="0.5" />
      <circle cx="103" cy="66" r="11" fill="currentColor" opacity="0.09" stroke="none" />
      <circle cx="103" cy="66" r="11" />
      <text x="103" y="67" fontSize="13" {...RUPEE}>&#8377;</text>
      <path d="M124 61 H198" opacity="0.55" />
      <path d="M124 72 H176" opacity="0.32" />

      {/* Field 1 */}
      <path d="M96 110 H132" opacity="0.4" />
      <path d="M96 120 H200" opacity="0.7" />
      {/* Field 2 */}
      <path d="M96 142 H140" opacity="0.4" />
      <path d="M96 152 H184" opacity="0.7" />
      {/* Amount field */}
      <path d="M96 174 H150" opacity="0.4" />
      <text x="100" y="191" fontSize="14" {...RUPEE} textAnchor="start">&#8377;</text>
      <path d="M116 191 H182" opacity="0.85" strokeWidth="2.2" />

      {/* Consent checkbox */}
      <rect x="96" y="206" width="15" height="15" rx="3" />
      <path d="M99.5 213.5 l3 3 l6 -6.5" />
      <path d="M120 214 H196" opacity="0.5" />

      {/* Signature line + flourish */}
      <path d="M96 252 H200" opacity="0.45" />
      <path d="M104 248 c 9 -12, 17 10, 27 -1 c 7 -8, 13 6, 21 1" opacity="0.9" />

      {/* Fountain pen, nib toward the signature */}
      <g transform="rotate(58 214 150)">
        <rect x="206" y="60" width="16" height="132" rx="8" fill="currentColor" opacity="0.05" />
        <rect x="206" y="60" width="16" height="132" rx="8" />
        <path d="M206 70 H222" opacity="0.4" />
        <path d="M206 168 H222" opacity="0.5" />
        <path d="M206 192 L214 224 L222 192 Z" fill="currentColor" opacity="0.1" stroke="none" />
        <path d="M206 192 L214 224 L222 192 Z" />
        <path d="M214 200 V216" opacity="0.7" />
        <circle cx="214" cy="197" r="1.7" />
      </g>
    </svg>
  );
}

function UnderwritingArt() {
  const CX = 160;
  const CY = 182;
  const R = 96;
  const ticks = Array.from({ length: 11 }, (_, k) => {
    const a = Math.PI - (k / 10) * Math.PI; // 180° → 0° across the top
    const inner = k % 5 === 0 ? R - 17 : R - 9;
    return {
      x1: (CX + R * Math.cos(a)).toFixed(1),
      y1: (CY - R * Math.sin(a)).toFixed(1),
      x2: (CX + inner * Math.cos(a)).toFixed(1),
      y2: (CY - inner * Math.sin(a)).toFixed(1),
      major: k % 5 === 0,
    };
  });
  const na = (52 * Math.PI) / 180; // needle → upper-right (approved)
  const nx = CX + (R - 26) * Math.cos(na);
  const ny = CY - (R - 26) * Math.sin(na);

  return (
    <svg {...P} aria-hidden>
      {/* Guilloché rings */}
      <circle cx={CX} cy={CY} r={R + 16} fill="currentColor" opacity="0.03" stroke="none" />
      <circle cx={CX} cy={CY} r={R + 16} opacity="0.4" />

      {/* Dial arc + baseline */}
      <path d={`M${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`} />
      <path d={`M${CX - R + 4} ${CY} H ${CX + R - 4}`} opacity="0.45" />

      {/* Ticks */}
      {ticks.map((t, i) => (
        <path key={i} d={`M${t.x1} ${t.y1} L${t.x2} ${t.y2}`} opacity={t.major ? 0.85 : 0.4} />
      ))}

      {/* Instant rays */}
      <path d={`M${CX} ${CY - R - 30} v11`} opacity="0.4" />
      <path d={`M${CX - 40} ${CY - R - 20} l7 9`} opacity="0.4" />
      <path d={`M${CX + 40} ${CY - R - 20} l-7 9`} opacity="0.4" />

      {/* Needle + hub */}
      <path d={`M${CX} ${CY} L${nx.toFixed(1)} ${ny.toFixed(1)}`} strokeWidth="2.6" />
      <circle cx={CX} cy={CY} r="8.5" fill="var(--color-canvas)" />
      <circle cx={CX} cy={CY} r="8.5" />
      <circle cx={CX} cy={CY} r="2.4" fill="currentColor" stroke="none" />

      {/* Approved badge at the needle tip */}
      <circle cx={nx.toFixed(1)} cy={ny.toFixed(1)} r="16" fill="currentColor" opacity="0.1" stroke="none" />
      <circle cx={nx.toFixed(1)} cy={ny.toFixed(1)} r="16" />
      <path d={`M${(nx - 6.5).toFixed(1)} ${ny.toFixed(1)} l4.8 4.8 l8.5 -9.5`} />
    </svg>
  );
}

function DisbursalArt() {
  return (
    <svg {...P} aria-hidden>
      {/* Account card */}
      <rect x="52" y="150" width="216" height="122" rx="16" fill="currentColor" opacity="0.04" stroke="none" />
      <rect x="52" y="150" width="216" height="122" rx="16" />
      <path d="M52 180 H268" opacity="0.28" />

      {/* Chip */}
      <rect x="74" y="198" width="30" height="23" rx="4" fill="currentColor" opacity="0.07" stroke="none" />
      <rect x="74" y="198" width="30" height="23" rx="4" />
      <path d="M74 209.5 H104 M89 198 V221" opacity="0.5" />

      {/* Amount */}
      <text x="122" y="214" fontSize="21" {...RUPEE} textAnchor="start">&#8377;</text>
      <path d="M142 210 H216" opacity="0.85" strokeWidth="2.3" />
      {/* Ledger line */}
      <path d="M74 244 H182" opacity="0.4" />

      {/* Credited check */}
      <circle cx="228" cy="244" r="13" fill="currentColor" opacity="0.1" stroke="none" />
      <circle cx="228" cy="244" r="13" />
      <path d="M221.5 244 l4.2 4.2 l7.3 -8" />

      {/* Inbound transfer arc from the coins into the card */}
      <path d="M150 78 C 240 92, 252 120, 214 150" opacity="0.85" />
      <path d="M214 150 l-1 -13 M214 150 l12 -5" opacity="0.85" />

      {/* Coin stack at the origin */}
      <ellipse cx="120" cy="80" rx="34" ry="12.5" fill="currentColor" opacity="0.05" stroke="none" />
      <ellipse cx="120" cy="80" rx="34" ry="12.5" />
      <ellipse cx="120" cy="66" rx="34" ry="12.5" fill="var(--color-canvas)" />
      <ellipse cx="120" cy="66" rx="34" ry="12.5" />
      <text x="120" y="67" fontSize="15" {...RUPEE}>&#8377;</text>
    </svg>
  );
}

const ART = [ApplicationArt, UnderwritingArt, DisbursalArt];

export function ProcessArt({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  const Art = ART[index] ?? null;
  if (!Art) return null;
  return (
    <span className={`block ${className}`}>
      <Art />
    </span>
  );
}

/** Slowly-rotating lobed guilloché ring for the plate frame. */
export function PlateRing({ className = "" }: { className?: string }) {
  const CX = 160;
  const CY = 160;
  const R = 138;
  const amp = 4.5;
  const lobes = 48;
  const steps = 360;
  let d = "";
  for (let k = 0; k <= steps; k++) {
    const t = (k / steps) * Math.PI * 2;
    const rr = R + amp * Math.cos(lobes * t);
    d += `${k ? "L" : "M"}${(CX + rr * Math.cos(t)).toFixed(1)} ${(CY + rr * Math.sin(t)).toFixed(1)} `;
  }
  d += "Z";
  return (
    <svg viewBox="0 0 320 320" className={className} fill="none" aria-hidden>
      <circle cx={CX} cy={CY} r={R + 8} stroke="var(--color-line)" strokeWidth="1" />
      <path className="net-spin" d={d} stroke="var(--color-accent)" strokeWidth="1" opacity="0.13" />
    </svg>
  );
}
