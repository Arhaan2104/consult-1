/**
 * Engraved plate illustrations for the three "How it works" stages —
 * bank-note line-art in the same guilloché vocabulary as the hero seal and
 * the lender-network diagram, cut for the DARK vault pane (gold strokes,
 * deep-navy solids — never ivory fills that would glow on navy).
 *
 *   0 — Application : the online form mid-fill — secure browser window,
 *                     amount field, KYC fingerprint, consent tick, submit.
 *   1 — Underwriting: the decision engine — data streams feed a precision
 *                     gauge ringed by machine teeth; the needle rests in the
 *                     approved arc and a sealed verdict leaves on the right.
 *   2 — Disbursal   : funds crossing to the bank — a coin arcs from the
 *                     stack into an engraved bank portico; a 24-hour dial
 *                     and a credited seal ground the promise.
 *
 * Pure SVG (no hooks) so it renders on the server. Sized by the caller.
 * Compositions are centred in a 300×300 field over the caller's rosette.
 */

const P = {
  viewBox: "0 0 300 300",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const RUPEE = {
  dominantBaseline: "central" as const,
  fontFamily: "Georgia, 'Times New Roman', serif",
  stroke: "none",
  fill: "currentColor",
};

/** Solid panel fill — deep navy by default (dark panes); overridable via
    --art-panel so the same plates re-ink for paper grounds. */
const PANEL = "var(--art-panel, rgba(10, 32, 62, 0.9))";

const TAU = Math.PI * 2;

/** Arc path of radius r around (cx,cy) from angle a1 to a2 (radians). */
function arc(cx: number, cy: number, r: number, a1: number, a2: number) {
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2);
  const y2 = cy + r * Math.sin(a2);
  const large = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/* ────────────────────────── 0 · Application ────────────────────────── */

function ApplicationArt() {
  // KYC fingerprint — nested arcs, organically clipped like a real print.
  const FX = 208;
  const FY = 176;
  const prints = [
    { r: 8, a1: -2.6, a2: 0.5 },
    { r: 14, a1: -2.9, a2: 0.9 },
    { r: 20, a1: -2.5, a2: 1.15 },
    { r: 26, a1: -2.8, a2: 0.7 },
    { r: 32, a1: -2.35, a2: 0.35 },
  ];

  return (
    <svg {...P} aria-hidden>
      {/* Browser window */}
      <rect x="34" y="46" width="232" height="208" rx="16" fill={PANEL} stroke="none" />
      <rect x="34" y="46" width="232" height="208" rx="16" fill="currentColor" opacity="0.04" stroke="none" />
      <rect x="34" y="46" width="232" height="208" rx="16" />
      {/* Hatch shadow under the sill */}
      <path d="M48 262 H240 M62 269 H222" opacity="0.16" />

      {/* Chrome bar: dots + secure address pill */}
      <path d="M34 76 H266" opacity="0.35" />
      <circle cx="52" cy="61" r="3" opacity="0.55" />
      <circle cx="64" cy="61" r="3" opacity="0.38" />
      <circle cx="76" cy="61" r="3" opacity="0.25" />
      <rect x="94" y="52.5" width="150" height="17" rx="8.5" opacity="0.5" />
      {/* padlock */}
      <rect x="103" y="59" width="7.6" height="6" rx="1.4" opacity="0.85" />
      <path d="M104.6 59 v-2.2 a2.2 2.2 0 0 1 4.4 0 V59" opacity="0.85" />
      <path d="M118 61 H196" opacity="0.4" />

      {/* Form rows */}
      <path d="M52 98 H120" opacity="0.38" />
      <rect x="52" y="106" width="144" height="17" rx="5" opacity="0.55" />
      <path d="M60 114.5 H128" opacity="0.3" />
      <path d="M52 138 H104" opacity="0.38" />
      <rect x="52" y="146" width="144" height="17" rx="5" opacity="0.55" />
      <path d="M60 154.5 H112" opacity="0.3" />

      {/* Amount field — the one that matters, drawn brightest */}
      <path d="M52 178 H96" opacity="0.38" />
      <rect x="52" y="186" width="144" height="20" rx="5" strokeWidth="1.9" opacity="0.95" />
      <text x="64" y="196.5" fontSize="12.5" textAnchor="middle" {...RUPEE}>&#8377;</text>
      <path d="M74 196.5 H150" strokeWidth="2.2" opacity="0.85" />
      <path d="M156 191 v11" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.6s" repeatCount="indefinite" />
      </path>

      {/* Consent tick */}
      <rect x="52" y="218" width="13" height="13" rx="3" />
      <path d="M55.2 224.4 l3 3 l5.6 -6.2" />
      <path d="M73 224.5 H150" opacity="0.4" />

      {/* KYC fingerprint — nested engraved whorl */}
      {prints.map((p, i) => (
        <path key={i} d={arc(FX, FY, p.r, p.a1, p.a2)} opacity={0.75 - i * 0.09} />
      ))}
      <circle cx={FX} cy={FY} r="2" fill="currentColor" stroke="none" opacity="0.8" />
      <path d={arc(FX, FY, 40, -2.15, 0.15)} opacity="0.22" />
      <path d="M182 128 H234" opacity="0.35" />

      {/* Submit pill + cursor */}
      <rect x="176" y="216" width="66" height="24" rx="12" fill="currentColor" opacity="0.13" stroke="none" />
      <rect x="176" y="216" width="66" height="24" rx="12" strokeWidth="1.9" />
      <path d="M192 228 H216 M212 223 l6 5 l-6 5" opacity="0.9" />
      <path d="M236 240 l4.5 13 l3.2 -5 l5.8 1.6 Z" fill="currentColor" stroke="none" opacity="0.9" />
    </svg>
  );
}

/* ───────────────────────── 1 · Underwriting ───────────────────────── */

function UnderwritingArt() {
  const CX = 158;
  const CY = 158;
  const R = 62; // dial radius

  // Machine ring — radial teeth around the whole engine.
  const teeth = Array.from({ length: 30 }, (_, k) => {
    const a = (k / 30) * TAU;
    const r0 = 84;
    const r1 = k % 5 === 0 ? 94 : 90;
    return {
      x1: (CX + r0 * Math.cos(a)).toFixed(1),
      y1: (CY + r0 * Math.sin(a)).toFixed(1),
      x2: (CX + r1 * Math.cos(a)).toFixed(1),
      y2: (CY + r1 * Math.sin(a)).toFixed(1),
      deep: k % 5 === 0,
    };
  });

  // Dial ticks across the top 180°.
  const ticks = Array.from({ length: 13 }, (_, k) => {
    const a = Math.PI + (k / 12) * Math.PI;
    const inner = k % 3 === 0 ? R - 13 : R - 7;
    return {
      x1: (CX + R * Math.cos(a)).toFixed(1),
      y1: (CY + R * Math.sin(a)).toFixed(1),
      x2: (CX + inner * Math.cos(a)).toFixed(1),
      y2: (CY + inner * Math.sin(a)).toFixed(1),
      major: k % 3 === 0,
    };
  });

  const na = -0.62; // needle angle — inside the approved arc
  const nx = CX + (R - 16) * Math.cos(na);
  const ny = CY + (R - 16) * Math.sin(na);

  return (
    <svg {...P} aria-hidden>
      {/* Machine housing */}
      <circle cx={CX} cy={CY} r="84" fill={PANEL} stroke="none" />
      <circle cx={CX} cy={CY} r="84" opacity="0.7" />
      <circle cx={CX} cy={CY} r="76" opacity="0.25" />
      {teeth.map((t, i) => (
        <path
          key={i}
          d={`M${t.x1} ${t.y1} L${t.x2} ${t.y2}`}
          opacity={t.deep ? 0.7 : 0.32}
          strokeWidth={t.deep ? 1.6 : 1.1}
        />
      ))}

      {/* Data streams in (the application's fields feeding the engine) */}
      <path d="M18 120 H64" strokeDasharray="3 7" opacity="0.55" />
      <path d="M10 158 H60" strokeDasharray="3 7" opacity="0.7" />
      <path d="M18 196 H64" strokeDasharray="3 7" opacity="0.55" />
      <rect x="30" y="113.5" width="13" height="13" rx="3" opacity="0.8" />
      <path d="M33 118 h7 M33 121.5 h4.5" opacity="0.5" />
      <rect x="24" y="151.5" width="13" height="13" rx="3" opacity="0.9" />
      <path d="M27 156 h7 M27 159.5 h4.5" opacity="0.55" />
      <rect x="30" y="189.5" width="13" height="13" rx="3" opacity="0.8" />
      <path d="M33 194 h7 M33 197.5 h4.5" opacity="0.5" />

      {/* Dial */}
      <path d={arc(CX, CY, R, Math.PI, TAU)} strokeWidth="1.8" />
      <path d={`M${CX - R + 6} ${CY} H${CX + R - 6}`} opacity="0.4" />
      {/* Approved arc — brightest stretch of the dial */}
      <path d={arc(CX, CY, R, -0.86, -0.18)} strokeWidth="3.4" opacity="0.95" />
      {ticks.map((t, i) => (
        <path key={i} d={`M${t.x1} ${t.y1} L${t.x2} ${t.y2}`} opacity={t.major ? 0.8 : 0.38} />
      ))}

      {/* Needle + hub */}
      <path d={`M${CX} ${CY} L${nx.toFixed(1)} ${ny.toFixed(1)}`} strokeWidth="2.6" />
      <circle cx={CX} cy={CY} r="8" fill={PANEL} />
      <circle cx={CX} cy={CY} r="8" />
      <circle cx={CX} cy={CY} r="2.2" fill="currentColor" stroke="none" />

      {/* Instant rays above the engine */}
      <path d={`M${CX} 52 v11`} opacity="0.5" />
      <path d={`M${CX - 34} 62 l6 9`} opacity="0.4" />
      <path d={`M${CX + 34} 62 l-6 9`} opacity="0.4" />

      {/* Sealed verdict leaving on the right */}
      <path d="M246 158 H272" strokeDasharray="3 7" opacity="0.6" />
      <circle cx="257" cy="158" r="17" fill={PANEL} stroke="none" />
      <circle cx="257" cy="158" r="17" strokeWidth="1.9" />
      <circle cx="257" cy="158" r="12.5" opacity="0.4" />
      <path d="M250.5 158 l4.4 4.4 l8 -8.8" strokeWidth="2" />
      {/* ribbon tails */}
      <path d="M251 173 l-4 10 l7 -3.5 M263 173 l4 10 l-7 -3.5" opacity="0.7" />
    </svg>
  );
}

/* ────────────────────────── 2 · Disbursal ────────────────────────── */

function DisbursalArt() {
  return (
    <svg {...P} aria-hidden>
      {/* Coin stack (the sanctioned amount) */}
      <ellipse cx="74" cy="206" rx="30" ry="10.5" fill={PANEL} stroke="none" />
      <ellipse cx="74" cy="206" rx="30" ry="10.5" opacity="0.55" />
      <ellipse cx="74" cy="194" rx="30" ry="10.5" fill={PANEL} stroke="none" />
      <ellipse cx="74" cy="194" rx="30" ry="10.5" opacity="0.75" />
      <ellipse cx="74" cy="182" rx="30" ry="10.5" fill={PANEL} stroke="none" />
      <ellipse cx="74" cy="182" rx="30" ry="10.5" />
      <ellipse cx="74" cy="182" rx="21" ry="7" opacity="0.35" />
      <text x="74" y="182.5" fontSize="12.5" textAnchor="middle" {...RUPEE}>&#8377;</text>
      {/* base hatch */}
      <path d="M48 222 H100 M56 228 H92" opacity="0.18" />

      {/* Transfer arc with a coin mid-flight */}
      <path d="M92 168 C 122 108, 176 96, 216 118" strokeDasharray="4 9" opacity="0.7" />
      <path d="M216 118 l-12.5 -1.5 M216 118 l-4 -12" opacity="0.85" />
      <circle cx="152" cy="110" r="10.5" fill={PANEL} stroke="none" />
      <circle cx="152" cy="110" r="10.5" />
      <circle cx="152" cy="110" r="7" opacity="0.4" />
      <text x="152" y="110.5" fontSize="9.5" textAnchor="middle" {...RUPEE}>&#8377;</text>

      {/* Bank portico — pediment, columns, plinth */}
      <path d="M162 138 L222 112 L282 138 Z" fill={PANEL} stroke="none" />
      <path d="M162 138 L222 112 L282 138 Z" />
      <path d="M174 133 L222 122 L270 133" opacity="0.3" />
      <circle cx="222" cy="130" r="4.5" opacity="0.7" />
      <path d="M168 138 H276 V146 H168 Z" fill={PANEL} stroke="none" />
      <path d="M168 138 H276 V146 H168 Z" />
      {/* columns with capitals */}
      {[180, 208, 236, 264].map((x) => (
        <g key={x}>
          <path d={`M${x - 5} 146 h10 M${x - 5} 150 h10`} opacity="0.6" />
          <path d={`M${x - 3.5} 150 V196`} opacity="0.85" />
          <path d={`M${x + 3.5} 150 V196`} opacity="0.85" />
          <path d={`M${x - 5} 196 h10 M${x - 5} 200 h10`} opacity="0.6" />
        </g>
      ))}
      <path d="M164 204 H280" strokeWidth="1.9" />
      <path d="M158 212 H286" opacity="0.7" />
      <path d="M170 220 H274" opacity="0.35" />

      {/* 24-hour promise — a small clock chip beside the bank */}
      <circle cx="126" cy="222" r="17" fill={PANEL} stroke="none" />
      <circle cx="126" cy="222" r="17" strokeWidth="1.8" />
      {Array.from({ length: 8 }, (_, k) => {
        const a = (k / 8) * TAU;
        return (
          <path
            key={k}
            d={`M${(126 + 13.4 * Math.cos(a)).toFixed(1)} ${(222 + 13.4 * Math.sin(a)).toFixed(1)} L${(126 + 15.6 * Math.cos(a)).toFixed(1)} ${(222 + 15.6 * Math.sin(a)).toFixed(1)}`}
            opacity="0.5"
          />
        );
      })}
      <path d="M126 222 V212.5 M126 222 l6.5 3.8" strokeWidth="1.9" />
      <circle cx="126" cy="222" r="1.8" fill="currentColor" stroke="none" />

      {/* Credited seal at the bank's base */}
      <circle cx="256" cy="236" r="13.5" fill={PANEL} stroke="none" />
      <circle cx="256" cy="236" r="13.5" strokeWidth="1.9" />
      <circle cx="256" cy="236" r="9.5" opacity="0.4" />
      <path d="M250.5 236 l3.8 3.8 l7 -7.6" strokeWidth="2" />
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
      <circle cx={CX} cy={CY} r="137" stroke="currentColor" opacity="0.14" strokeWidth="1" />
      <path className="net-spin" d={path(rings[0])} stroke="currentColor" strokeWidth="1" opacity={rings[0].opacity} />
      <path d={path(rings[1])} stroke="currentColor" strokeWidth="1" opacity={rings[1].opacity} />
    </svg>
  );
}
