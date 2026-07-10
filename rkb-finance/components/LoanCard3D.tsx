"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import CountUp from "@/components/CountUp";
import { product, site } from "@/content/site";

/**
 * LoanCard3D — the Short Term Loan term sheet struck as a premium metal
 * card. Deep navy face, gold engraved detailing, the R.K. Bansal coin mark,
 * and a pointer-driven 3D tilt with a glare that tracks the light.
 * All figures come verbatim from content/site.ts.
 */
export default function LoanCard3D({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const px = useMotionValue(0); // −0.5 … 0.5
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, (v) => v * -11), spring);
  const rotateY = useSpring(useTransform(px, (v) => v * 13), spring);
  const glareX = useSpring(useTransform(px, (v) => 50 + v * 90), spring);
  const glareY = useSpring(useTransform(py, (v) => 40 + v * 70), spring);
  const glare = useMotionTemplate`radial-gradient(52% 44% at ${glareX}% ${glareY}%, rgba(255,244,214,0.16), transparent 70%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className={className}
      style={{ perspective: 1300 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[8/5] w-full overflow-hidden rounded-[1.4rem] bg-[radial-gradient(125%_135%_at_20%_-12%,#1e548f_0%,#123561_50%,#0c294c_100%)] shadow-[0_44px_90px_-38px_rgba(8,28,56,0.7),0_0_0_1px_rgba(217,165,63,0.55),0_0_0_5px_rgba(217,165,63,0.09),inset_0_1px_0_rgba(255,244,214,0.12)]"
      >
        {/* Engraved grid + inner gold hairline frame */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(221,231,245,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(221,231,245,0.35) 1px, transparent 1px)",
            backgroundSize: "1.9rem 1.9rem",
            maskImage: "radial-gradient(120% 100% at 50% 0%, #000 25%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 25%, transparent 90%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-[9px] rounded-[calc(1.4rem-9px)] border border-[rgba(217,165,63,0.38)]"
        />

        {/* Face */}
        <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
          {/* Masthead */}
          <div className="flex items-start justify-between gap-4">
            {/* The coin mark from the logo, engraved in gold */}
            <svg viewBox="0 0 44 44" className="h-10 w-10 shrink-0 text-gold-bright" fill="none" aria-hidden>
              <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
              <text
                x="22"
                y="23.5"
                fontSize="19"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Georgia, 'Times New Roman', serif"
                fill="currentColor"
              >
                &#8377;
              </text>
            </svg>
            <div className="text-right">
              <p className="eyebrow text-gold-bright">{site.name}</p>
            </div>
          </div>

          {/* Headline — the loan amount, with the interest type as a quiet reassurance */}
          <div>
            <p className="eyebrow text-on-dark-soft">{product.name}</p>
            <p className="mt-2.5 font-display text-[clamp(1.7rem,4.2vw,2.6rem)] leading-none tracking-tight whitespace-nowrap">
              <CountUp value={product.amount.min} className="gold-text tabular-nums" />
              <span className="px-2 text-on-dark-soft">–</span>
              <CountUp value={product.amount.max} className="gold-text tabular-nums" delay={0.2} />
            </p>
            <p className="mt-3 flex items-center gap-2 font-serif text-[0.98rem] italic text-on-dark-soft">
              <span className="h-1 w-1 shrink-0 rounded-full bg-gold-bright/70" aria-hidden />
              {product.rateNote}
            </p>
          </div>

          {/* The two key terms, given room to breathe */}
          <div className="grid grid-cols-2 gap-6 border-t border-[rgba(217,165,63,0.28)] pt-5">
            <div>
              <p className="text-[0.62rem] tracking-[0.18em] text-on-dark-soft uppercase">Interest rate</p>
              <p className="mt-1.5 font-serif text-[1.1rem] font-medium text-on-dark">{product.rate}</p>
            </div>
            <div>
              <p className="text-[0.62rem] tracking-[0.18em] text-on-dark-soft uppercase">Disbursal</p>
              <p className="mt-1.5 font-serif text-[1.1rem] font-medium leading-snug text-on-dark">{product.disbursal}</p>
            </div>
          </div>
        </div>

        {/* Pointer-tracked glare */}
        {!reduce && (
          <motion.div aria-hidden className="absolute inset-0" style={{ background: glare }} />
        )}
      </motion.div>
    </div>
  );
}
