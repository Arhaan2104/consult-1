/**
 * Engraved line-art glyphs for the three "How it works" steps.
 * Stroke = currentColor (set to accent by the caller); faint accent fills add
 * depth. Cohesive with the guilloché seal's financial-engraving language.
 *   0 — Apply online        (form + submitted check)
 *   1 — Automated review    (instant decision dial)
 *   2 — Funds in account    (₹ disbursed to the bank)
 */
const COMMON = {
  viewBox: "0 0 112 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ApplyGlyph() {
  return (
    <svg {...COMMON}>
      <rect x="22" y="14" width="44" height="64" rx="5" />
      <path d="M32 33 H56" opacity="0.5" />
      <path d="M32 45 H56" opacity="0.5" />
      <path d="M32 57 H48" opacity="0.5" />
      <circle cx="80" cy="70" r="14" fill="currentColor" opacity="0.08" stroke="none" />
      <circle cx="80" cy="70" r="14" />
      <path d="M74 70 l4.5 4.5 l8 -9" />
    </svg>
  );
}

function ReviewGlyph() {
  return (
    <svg {...COMMON}>
      <circle cx="56" cy="56" r="26" fill="currentColor" opacity="0.06" stroke="none" />
      <circle cx="56" cy="56" r="26" />
      <path d="M44 56 l8 8 l16 -18" />
      <path d="M56 16 v7" opacity="0.5" />
      <path d="M85 31 l-5 5" opacity="0.5" />
      <path d="M27 31 l5 5" opacity="0.5" />
      <path d="M96 56 h-7" opacity="0.5" />
      <path d="M16 56 h7" opacity="0.5" />
    </svg>
  );
}

function FundsGlyph() {
  return (
    <svg {...COMMON}>
      <circle cx="56" cy="20" r="13" fill="currentColor" opacity="0.07" stroke="none" />
      <circle cx="56" cy="20" r="13" />
      <text
        x="56"
        y="21"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Georgia, serif"
        fontSize="16"
        stroke="none"
        fill="currentColor"
      >
        ₹
      </text>
      <path d="M56 37 v11" opacity="0.7" />
      <path d="M51 43 l5 5 l5 -5" opacity="0.7" />
      <path d="M30 60 L56 50 L82 60" />
      <path d="M30 60 H82" />
      <path d="M36 60 V80 M46 60 V80 M56 60 V80 M66 60 V80 M76 60 V80" opacity="0.7" />
      <path d="M28 84 H84" />
    </svg>
  );
}

const GLYPHS = [ApplyGlyph, ReviewGlyph, FundsGlyph];

export default function StepGraphic({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  const Glyph = GLYPHS[index] ?? null;
  if (!Glyph) return null;
  return (
    <span aria-hidden className={`block text-accent ${className}`}>
      <Glyph />
    </span>
  );
}
