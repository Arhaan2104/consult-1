"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "motion/react";

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

export default function BalanceScale({
  className = "",
  dark = false,
}: {
  className?: string;
  /** Render as gold line-art with light labels, for placement on the deep
      navy (vault) surfaces — matching the ProcessArt engravings. */
  dark?: boolean;
}) {
  const reduce = useReducedMotion();

  // The loop is JS-driven (per-frame style writes on SVG, which cost layout
  // in Blink), so it runs only while the scene can be seen. The margin keeps
  // the start/stop fully offscreen, so a cycle restart is never visible —
  // motion is identical whenever the rig is actually in view.
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { margin: "25% 0px 25% 0px" });
  const idle = reduce || !inView;

  const strokeCls = dark ? "text-gold-bright" : "text-accent";

  // Beam dips as each coin lands (t≈0.22 of the cycle), then written terms
  // bring it back level. Pans hang inside the beam group; the tilt is kept
  // shallow so the stylised rig reads true.
  const beamAnim = idle
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
    idle
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
    <div ref={sceneRef} className={`money-scene-frame ${className}`}>
      {/* viewBox cropped to the rig itself (no label margins), so the scale
          renders large in its column — the motion IS the message. */}
      <svg
        viewBox="146 52 388 254"
        className={`h-auto w-full ${strokeCls}`}
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="A balance scale in motion: capital lands on one pan, the written terms hold it level."
      >
        <defs>
          <linearGradient id="scale-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eac668" />
            <stop offset="0.5" stopColor="#d9a53f" />
            <stop offset="1" stopColor="#b88624" />
          </linearGradient>
        </defs>

        {/* Guilloché backdrop */}
        <circle cx={CX} cy="168" r="126" strokeWidth="1" opacity="0.16" />
        <circle cx={CX} cy="168" r="96" strokeWidth="0.75" opacity="0.11" strokeDasharray="2 8" />

        {/* Plinth + post + fulcrum */}
        <path d={`M${CX - 48} 292 H${CX + 48}`} strokeWidth="2.8" opacity="0.85" />
        <path d={`M${CX - 34} 292 L${CX - 21} 268 H${CX + 21} L${CX + 34} 292`} opacity="0.7" />
        <path d={`M${CX} 268 V${PIVOT_Y - 8}`} strokeWidth="2.6" opacity="0.95" />
        <path d={`M${CX - 11} ${PIVOT_Y + 6} L${CX} ${PIVOT_Y - 8} L${CX + 11} ${PIVOT_Y + 6}`} opacity="0.75" />
        <circle cx={CX} cy={PIVOT_Y - 12} r="4.6" fill="currentColor" stroke="none" />

        {/* Beam + pans — one rigid group tipping about the fulcrum */}
        <m.g
          style={{ transformOrigin: `${CX}px ${PIVOT_Y}px` }}
          animate={beamAnim}
        >
          <path d={`M${LX} ${PIVOT_Y} H${RX}`} strokeWidth="3" opacity="0.95" />
          <circle cx={LX} cy={PIVOT_Y} r="3.8" fill="currentColor" stroke="none" />
          <circle cx={RX} cy={PIVOT_Y} r="3.8" fill="currentColor" stroke="none" />

          {/* Left pan — capital: a settled stack of struck gold */}
          <path d={strings(LX)} strokeWidth="1.2" opacity="0.45" />
          <path d={pan(LX)} strokeWidth="2.4" opacity="0.95" />
          <GoldCoin x={LX - 11} y={PAN_Y - 8} r={12} />
          <GoldCoin x={LX + 12} y={PAN_Y - 8} r={12} />
          <GoldCoin x={LX + 1} y={PAN_Y - 23} r={12} />

          {/* Right pan — the written terms */}
          <path d={strings(RX)} strokeWidth="1.2" opacity="0.45" />
          <path d={pan(RX)} strokeWidth="2.4" opacity="0.95" />
          <g opacity="0.95">
            <rect x={RX - 16} y={PAN_Y - 46} width="32" height="40" rx="3.5" strokeWidth="2" fill="var(--color-canvas)" />
            <path
              d={`M${RX - 8.5} ${PAN_Y - 34} H${RX + 8.5} M${RX - 8.5} ${PAN_Y - 26.5} H${RX + 8.5} M${RX - 8.5} ${PAN_Y - 19} H${RX + 2}`}
              strokeWidth="1.3"
              opacity="0.7"
            />
          </g>
        </m.g>

        {/* Falling capital — lands on the left pan, tips the beam */}
        {!reduce && (
          <>
            <m.g animate={coinAnim(0)} style={{ opacity: 0 }}>
              <GoldCoin x={LX} y={PAN_Y - 36} r={11} />
            </m.g>
            <m.g animate={coinAnim(0.05)} style={{ opacity: 0 }}>
              <GoldCoin x={LX + 15} y={PAN_Y - 31} r={9} />
            </m.g>
          </>
        )}
      </svg>
    </div>
  );
}
