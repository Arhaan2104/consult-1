/**
 * Engraved plate illustrations for the three "How it works" stages —
 * bank-note line-art in the same guilloché vocabulary as the hero seal and the
 * lender-network diagram. Each composition is centred in a 300×300 field and
 * sits over a faint guilloché rosette (rendered by the caller) for depth.
 *   0 — Application : a filled loan form (stacked pages) + fountain pen
 *   1 — Underwriting: a precision decision gauge, needle swung to APPROVED
 *   2 — Disbursal   : funds arcing into a bank account, credited
 *
 * Pure SVG (no hooks) so it can render on the server. Sized by the caller.
 */

const P = {
  viewBox: "0 0 300 300",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const RUPEE = {
  dominantBaseline: "central" as const,
  fontFamily: "Georgia, 'Times New Roman', serif",
  stroke: "none",
  fill: "currentColor",
};

function ApplicationArt() {
  return (
    <svg {...P} aria-hidden>
      {/* Back page (depth) */}
      <rect x="101" y="46" width="112" height="196" rx="11" fill="var(--color-canvas)" stroke="none" />
      <rect x="101" y="46" width="112" height="196" rx="11" opacity="0.38" />

      {/* Front page */}
      <rect x="88" y="54" width="118" height="196" rx="12" fill="var(--color-canvas)" stroke="none" />
      <rect x="88" y="54" width="118" height="196" rx="12" fill="currentColor" opacity="0.04" stroke="none" />
      <rect x="88" y="54" width="118" height="196" rx="12" />

      {/* Header: ₹ seal + title lines */}
      <circle cx="111" cy="76" r="10.5" fill="currentColor" opacity="0.09" stroke="none" />
      <circle cx="111" cy="76" r="10.5" />
      <text x="111" y="77" fontSize="12.5" textAnchor="middle" {...RUPEE}>&#8377;</text>
      <path d="M130 71 H190" opacity="0.55" />
      <path d="M130 81 H172" opacity="0.32" />
      <path d="M100 98 H194" opacity="0.4" />

      {/* Field rows */}
      <path d="M104 116 H136" opacity="0.4" />
      <path d="M104 126 H190" opacity="0.7" />
      <path d="M104 148 H146" opacity="0.4" />
      <path d="M104 158 H180" opacity="0.7" />

      {/* Amount field */}
      <path d="M104 180 H148" opacity="0.4" />
      <text x="104" y="197" fontSize="13.5" textAnchor="start" {...RUPEE}>&#8377;</text>
      <path d="M120 197 H182" opacity="0.85" strokeWidth="2.2" />

      {/* Consent checkbox */}
      <rect x="104" y="212" width="14" height="14" rx="3" />
      <path d="M107.5 219 l3 3 l6 -6.5" />
      <path d="M126 219 H190" opacity="0.5" />

      {/* Signature line + flourish */}
      <path d="M104 242 H190" opacity="0.45" />
      <path d="M110 238 c 9 -12, 17 10, 27 -1 c 7 -8, 13 6, 21 1" opacity="0.9" />

      {/* Fountain pen, nib toward the signature */}
      <g transform="rotate(52 196 156)">
        <rect x="188" y="66" width="15" height="128" rx="7.5" fill="currentColor" opacity="0.05" stroke="none" />
        <rect x="188" y="66" width="15" height="128" rx="7.5" />
        <path d="M188 76 H203" opacity="0.4" />
        <path d="M188 170 H203" opacity="0.5" />
        <path d="M188 194 L195.5 222 L203 194 Z" fill="currentColor" opacity="0.1" stroke="none" />
        <path d="M188 194 L195.5 222 L203 194 Z" />
        <path d="M195.5 201 V215" opacity="0.7" />
        <circle cx="195.5" cy="199" r="1.6" />
      </g>
    </svg>
  );
}

function UnderwritingArt() {
  const CX = 150;
  const CY = 162;
  const R = 84;
  const ticks = Array.from({ length: 11 }, (_, k) => {
    const a = Math.PI - (k / 10) * Math.PI; // 180° → 0° across the top
    const inner = k % 5 === 0 ? R - 16 : R - 9;
    return {
      x1: (CX + R * Math.cos(a)).toFixed(1),
      y1: (CY - R * Math.sin(a)).toFixed(1),
      x2: (CX + inner * Math.cos(a)).toFixed(1),
      y2: (CY - inner * Math.sin(a)).toFixed(1),
      major: k % 5 === 0,
    };
  });
  const na = (54 * Math.PI) / 180; // needle → upper-right (approved)
  const nx = CX + (R - 24) * Math.cos(na);
  const ny = CY - (R - 24) * Math.sin(na);

  return (
    <svg {...P} aria-hidden>
      {/* Guilloché rings, centred */}
      <circle cx={CX} cy="150" r="96" fill="currentColor" opacity="0.03" stroke="none" />
      <circle cx={CX} cy="150" r="96" opacity="0.4" />
      <circle cx={CX} cy="150" r="82" opacity="0.22" />

      {/* Approved zone — a brighter arc on the right of the dial */}
      <path
        d={`M${CX} ${CY} m0 0 A ${R} ${R} 0 0 0 ${CX + R} ${CY}`}
        opacity="0"
      />
      <path
        d={`M${(CX + R * Math.cos(Math.PI / 4)).toFixed(1)} ${(CY - R * Math.sin(Math.PI / 4)).toFixed(1)} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
        strokeWidth="3"
        opacity="0.9"
      />

      {/* Dial arc + baseline */}
      <path d={`M${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`} />
      <path d={`M${CX - R + 4} ${CY} H ${CX + R - 4}`} opacity="0.45" />

      {/* Ticks */}
      {ticks.map((t, i) => (
        <path key={i} d={`M${t.x1} ${t.y1} L${t.x2} ${t.y2}`} opacity={t.major ? 0.85 : 0.4} />
      ))}

      {/* Instant rays */}
      <path d={`M${CX} ${CY - R - 28} v10`} opacity="0.4" />
      <path d={`M${CX - 36} ${CY - R - 18} l6.5 8.5`} opacity="0.4" />
      <path d={`M${CX + 36} ${CY - R - 18} l-6.5 8.5`} opacity="0.4" />

      {/* Needle + hub */}
      <path d={`M${CX} ${CY} L${nx.toFixed(1)} ${ny.toFixed(1)}`} strokeWidth="2.6" />
      <circle cx={CX} cy={CY} r="8.5" fill="var(--color-canvas)" />
      <circle cx={CX} cy={CY} r="8.5" />
      <circle cx={CX} cy={CY} r="2.4" fill="currentColor" stroke="none" />

      {/* Approved badge at the needle tip */}
      <circle cx={nx.toFixed(1)} cy={ny.toFixed(1)} r="15.5" fill="currentColor" opacity="0.1" stroke="none" />
      <circle cx={nx.toFixed(1)} cy={ny.toFixed(1)} r="15.5" />
      <path d={`M${(nx - 6.4).toFixed(1)} ${ny.toFixed(1)} l4.7 4.7 l8.4 -9.3`} />
    </svg>
  );
}

function DisbursalArt() {
  return (
    <svg {...P} aria-hidden>
      {/* Coin stack, top-centre */}
      <ellipse cx="150" cy="86" rx="33" ry="12" fill="currentColor" opacity="0.05" stroke="none" />
      <ellipse cx="150" cy="86" rx="33" ry="12" />
      <ellipse cx="150" cy="72" rx="33" ry="12" fill="var(--color-canvas)" stroke="none" />
      <ellipse cx="150" cy="72" rx="33" ry="12" />
      <text x="150" y="72" fontSize="14.5" textAnchor="middle" {...RUPEE}>&#8377;</text>

      {/* Transfer arc from the coins into the account card */}
      <path d="M180 72 C 236 88, 240 116, 208 142" opacity="0.85" />
      <path d="M208 142 l-1 -13 M208 142 l12 -5" opacity="0.85" />

      {/* Account card, centred */}
      <rect x="66" y="140" width="168" height="106" rx="15" fill="currentColor" opacity="0.05" stroke="none" />
      <rect x="66" y="140" width="168" height="106" rx="15" />
      <path d="M66 168 H234" opacity="0.28" />

      {/* Chip */}
      <rect x="84" y="182" width="28" height="21" rx="4" fill="currentColor" opacity="0.07" stroke="none" />
      <rect x="84" y="182" width="28" height="21" rx="4" />
      <path d="M84 192.5 H112 M98 182 V203" opacity="0.5" />

      {/* Amount */}
      <text x="128" y="196" fontSize="19" textAnchor="start" {...RUPEE}>&#8377;</text>
      <path d="M146 192 H214" opacity="0.85" strokeWidth="2.2" />

      {/* Ledger line */}
      <path d="M84 224 H178" opacity="0.4" />

      {/* Credited check */}
      <circle cx="212" cy="224" r="12.5" fill="currentColor" opacity="0.1" stroke="none" />
      <circle cx="212" cy="224" r="12.5" />
      <path d="M205.8 224 l4.1 4.1 l7.1 -7.8" />
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

/** Faint, slowly-turning guilloché rosette — a centred backdrop for the art. */
export function GuillocheRosette({ className = "" }: { className?: string }) {
  const CX = 150;
  const CY = 150;
  const rings = [
    { R: 130, amp: 4, lobes: 60, opacity: 0.13 },
    { R: 112, amp: 3, lobes: 40, opacity: 0.08 },
  ];
  const path = ({ R, amp, lobes }: { R: number; amp: number; lobes: number }) => {
    const steps = 360;
    let d = "";
    for (let k = 0; k <= steps; k++) {
      const t = (k / steps) * Math.PI * 2;
      const rr = R + amp * Math.cos(lobes * t);
      d += `${k ? "L" : "M"}${(CX + rr * Math.cos(t)).toFixed(1)} ${(CY + rr * Math.sin(t)).toFixed(1)} `;
    }
    return d + "Z";
  };
  return (
    <svg viewBox="0 0 300 300" className={className} fill="none" aria-hidden>
      <circle cx={CX} cy={CY} r="137" stroke="var(--color-line)" strokeWidth="1" />
      <path className="net-spin" d={path(rings[0])} stroke="var(--color-accent)" strokeWidth="1" opacity={rings[0].opacity} />
      <path d={path(rings[1])} stroke="var(--color-accent)" strokeWidth="1" opacity={rings[1].opacity} />
    </svg>
  );
}
