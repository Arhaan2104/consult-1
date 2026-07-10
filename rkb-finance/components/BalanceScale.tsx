"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * BalanceScale — fair practice, physically enacted. Gold capital drops onto
 * the left pan, the beam dips under its weight, and the written terms on the
 * right bring it level again. Loops forever; sits level and complete under
 * reduced motion.
 */
const CX = 340;
const PIVOT_Y = 118;
const BEAM_HALF = 148;
const LX = CX - BEAM_HALF;
const RX = CX + BEAM_HALF;
const PAN_Y = 216;

const CYCLE = 5.4;

function pan(px: number) {
  return `M${px - 34} ${PAN_Y} H${px + 34} M${px - 34} ${PAN_Y} Q${px} ${PAN_Y + 26} ${px + 34} ${PAN_Y}`;
}
function strings(px: number) {
  return `M${px} ${PIVOT_Y} L${px - 26} ${PAN_Y} M${px} ${PIVOT_Y} L${px + 26} ${PAN_Y}`;
}

function GoldCoin({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="url(#scale-gold)" opacity="0.92" />
      <circle cx={x} cy={y} r={r} stroke="#8a6118" strokeWidth="0.9" fill="none" />
      <circle cx={x} cy={y} r={r - 3.2} stroke="#8a6118" strokeWidth="0.6" fill="none" opacity="0.6" />
      <text
        x={x}
        y={y + 0.5}
        fontSize={r + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Georgia, 'Times New Roman', serif"
        fill="#6f4e13"
        stroke="none"
      >
        &#8377;
      </text>
    </g>
  );
}

export default function BalanceScale({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  // Beam dips as each coin lands (t≈0.22 of the cycle), then written terms
  // bring it back level. Pans hang inside the beam group; the tilt is kept
  // shallow so the stylised rig reads true.
  const beamAnim = reduce
    ? undefined
    : {
        rotate: [0, 0, -3.4, -3.4, 0, 0],
        transition: {
          duration: CYCLE,
          times: [0, 0.2, 0.3, 0.55, 0.75, 1],
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const coinAnim = (delayFrac: number) =>
    reduce
      ? undefined
      : {
          y: [-110, 0, 0, 0],
          opacity: [0, 1, 1, 0],
          transition: {
            duration: CYCLE,
            times: [0.02 + delayFrac, 0.2 + delayFrac, 0.6, 0.72],
            repeat: Infinity,
            ease: "easeIn" as const,
          },
        };

  return (
    <div className={`money-scene-frame ${className}`}>
      <svg
        viewBox="0 0 680 330"
        className="h-auto w-full text-accent"
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="A balance scale: capital on one side, written terms on the other, held level."
      >
        <defs>
          <linearGradient id="scale-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eac668" />
            <stop offset="0.5" stopColor="#d9a53f" />
            <stop offset="1" stopColor="#b88624" />
          </linearGradient>
        </defs>

        {/* Guilloché backdrop */}
        <circle cx={CX} cy="168" r="128" strokeWidth="1" opacity="0.1" />
        <circle cx={CX} cy="168" r="98" strokeWidth="0.75" opacity="0.07" strokeDasharray="2 8" />

        {/* Plinth + post + fulcrum */}
        <path d={`M${CX - 46} 292 H${CX + 46}`} strokeWidth="2.4" opacity="0.8" />
        <path d={`M${CX - 32} 292 L${CX - 20} 268 H${CX + 20} L${CX + 32} 292`} opacity="0.65" />
        <path d={`M${CX} 268 V${PIVOT_Y - 8}`} strokeWidth="2.2" opacity="0.9" />
        <path d={`M${CX - 11} ${PIVOT_Y + 6} L${CX} ${PIVOT_Y - 8} L${CX + 11} ${PIVOT_Y + 6}`} opacity="0.7" />
        <circle cx={CX} cy={PIVOT_Y - 12} r="4.2" fill="currentColor" stroke="none" />

        {/* Beam + pans — one rigid group tipping about the fulcrum */}
        <motion.g
          style={{ transformOrigin: `${CX}px ${PIVOT_Y}px` }}
          animate={beamAnim}
        >
          <path d={`M${LX} ${PIVOT_Y} H${RX}`} strokeWidth="2.6" opacity="0.9" />
          <circle cx={LX} cy={PIVOT_Y} r="3.4" fill="currentColor" stroke="none" />
          <circle cx={RX} cy={PIVOT_Y} r="3.4" fill="currentColor" stroke="none" />

          {/* Left pan — capital: a settled stack of struck gold */}
          <path d={strings(LX)} strokeWidth="1.1" opacity="0.4" />
          <path d={pan(LX)} strokeWidth="2" opacity="0.9" />
          <GoldCoin x={LX - 10} y={PAN_Y - 7} />
          <GoldCoin x={LX + 11} y={PAN_Y - 7} />
          <GoldCoin x={LX + 1} y={PAN_Y - 21} />

          {/* Right pan — the written terms */}
          <path d={strings(RX)} strokeWidth="1.1" opacity="0.4" />
          <path d={pan(RX)} strokeWidth="2" opacity="0.9" />
          <g opacity="0.9">
            <rect x={RX - 15} y={PAN_Y - 44} width="30" height="38" rx="3.5" strokeWidth="1.8" fill="var(--color-canvas)" />
            <path
              d={`M${RX - 8} ${PAN_Y - 33} H${RX + 8} M${RX - 8} ${PAN_Y - 26} H${RX + 8} M${RX - 8} ${PAN_Y - 19} H${RX + 2}`}
              strokeWidth="1.2"
              opacity="0.7"
            />
          </g>
        </motion.g>

        {/* Falling capital — lands on the left pan, tips the beam */}
        {!reduce && (
          <>
            <motion.g animate={coinAnim(0)} style={{ opacity: 0 }}>
              <GoldCoin x={LX} y={PAN_Y - 34} r={10} />
            </motion.g>
            <motion.g animate={coinAnim(0.05)} style={{ opacity: 0 }}>
              <GoldCoin x={LX + 14} y={PAN_Y - 30} r={8} />
            </motion.g>
          </>
        )}

        {/* Labels */}
        <text x={LX} y="312" textAnchor="middle" className="font-display" fontSize="19" fill="var(--color-ink)" stroke="none">
          Capital
        </text>
        <text x={RX} y="312" textAnchor="middle" className="font-display" fontSize="19" fill="var(--color-ink)" stroke="none">
          Written terms
        </text>
        <text x={CX} y="42" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="3" fill="var(--color-ink-faint)" stroke="none">
          FAIR PRACTICE IN BALANCE
        </text>
      </svg>
    </div>
  );
}
