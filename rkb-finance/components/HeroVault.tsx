"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

/**
 * HeroVault — the cinematic backdrop layers of the vault hero:
 * volumetric light rays, drifting gold motes, and an optional video slot.
 *
 * Video: generate an ~8s seamless loop (see the Runway prompts in the
 * project plan), drop it at public/hero-loop.mp4 and set HERO_VIDEO_SRC.
 * It renders desktop-only, dimmed under a navy scrim, with the code-built
 * scene continuing to carry mobile and reduced-data contexts.
 */
const HERO_VIDEO_SRC: string | null = null;

type Mote = {
  left: string;
  top: string;
  size: number;
  dur: number;
  delay: number;
  sway: string;
  op: number;
  /** Render on mobile too (cheapest few only). */
  mobile?: boolean;
};

const MOTES: Mote[] = [
  { left: "8%", top: "64%", size: 5, dur: 18, delay: 0, sway: "1.8rem", op: 0.5, mobile: true },
  { left: "16%", top: "42%", size: 3, dur: 14, delay: 2.2, sway: "-1.2rem", op: 0.4 },
  { left: "23%", top: "74%", size: 4, dur: 21, delay: 4.6, sway: "2.4rem", op: 0.45 },
  { left: "31%", top: "55%", size: 3, dur: 16, delay: 1.4, sway: "-1.6rem", op: 0.35 },
  { left: "39%", top: "82%", size: 5, dur: 19, delay: 6.8, sway: "1.4rem", op: 0.5, mobile: true },
  { left: "47%", top: "68%", size: 3, dur: 15, delay: 3.5, sway: "-2rem", op: 0.4 },
  { left: "55%", top: "78%", size: 4, dur: 22, delay: 8.2, sway: "1.9rem", op: 0.45 },
  { left: "63%", top: "50%", size: 3, dur: 14.5, delay: 5.1, sway: "-1.4rem", op: 0.35 },
  { left: "71%", top: "70%", size: 5, dur: 20, delay: 2.9, sway: "2.2rem", op: 0.5, mobile: true },
  { left: "79%", top: "46%", size: 3, dur: 16.5, delay: 7.3, sway: "-1.8rem", op: 0.4 },
  { left: "86%", top: "66%", size: 4, dur: 18.5, delay: 0.9, sway: "1.5rem", op: 0.45 },
  { left: "93%", top: "58%", size: 3, dur: 15.5, delay: 4.1, sway: "-1.3rem", op: 0.35 },
];

export default function HeroVault() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {HERO_VIDEO_SRC && !reduce && (
        <div className="hero-video hidden lg:block">
          <video src={HERO_VIDEO_SRC} autoPlay muted loop playsInline />
        </div>
      )}

      {/* Volumetric shafts falling from above the headline */}
      <div className="vault-ray left-[14%]" />
      <div className="vault-ray vault-ray-2 right-[12%]" />

      {/* Minted-gold motes rising through the vault */}
      {!reduce &&
        MOTES.map((m, i) => (
          <span
            key={i}
            className={`vault-mote ${m.mobile ? "" : "hidden sm:block"}`}
            style={
              {
                left: m.left,
                top: m.top,
                width: m.size,
                height: m.size,
                "--mote-dur": `${m.dur}s`,
                "--mote-delay": `${m.delay}s`,
                "--mote-sway": m.sway,
                "--mote-op": m.op,
              } as CSSProperties
            }
          />
        ))}
    </div>
  );
}
