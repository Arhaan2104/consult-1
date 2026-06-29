"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Stagger, StaggerItem } from "@/components/Motion";

type Step = { step: string; title: string; body: string };

/**
 * "How it works" — a pinned scrollytelling scene on desktop: the section
 * pins and the three steps cross-fade as you scroll, with a giant step
 * numeral and a filling ledger line. Falls back to the original static
 * 3-col grid on mobile (<768px) or under reduced motion — content is always
 * in the DOM (no scroll-gated content) so it stays accessible.
 */
export default function ProcessScene({ steps }: { steps: readonly Step[] }) {
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  // Decide pinning client-side: desktop + motion allowed.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPinned(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  if (!pinned) {
    return <StaticProcess steps={steps} />;
  }
  return <PinnedProcess steps={steps} />;
}

/* ---------- Static fallback (mobile / reduced motion) ---------- */
function StaticProcess({ steps }: { steps: readonly Step[] }) {
  return (
    <Stagger className="mt-16 grid gap-12 md:grid-cols-3">
      {steps.map((p) => (
        <StaggerItem key={p.step} className="relative flex flex-col gap-4">
          <span className="font-display text-5xl text-accent/40">{p.step}</span>
          <h3 className="font-display text-2xl text-ink">{p.title}</h3>
          <p className="measure text-base leading-relaxed text-ink-soft">{p.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------- Pinned scene (desktop) ---------- */
function PinnedProcess({ steps }: { steps: readonly Step[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    // Track height ≈ one viewport per step. svh avoids iOS address-bar jumps.
    <div ref={trackRef} className="relative mt-8 h-[300svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="grid w-full grid-cols-[auto_1fr] items-center gap-10 lg:gap-16">
          {/* Numeral + ledger line */}
          <div className="flex items-stretch gap-6 lg:gap-10">
            <div className="relative w-px self-stretch bg-line">
              <motion.div
                className="absolute inset-x-0 top-0 origin-top bg-accent"
                style={{ height: "100%", scaleY: scrollYProgress }}
              />
            </div>
            <div className="relative h-[clamp(5rem,12vw,11rem)] w-[clamp(4rem,11vw,10rem)]">
              {steps.map((p, i) => (
                <Numeral
                  key={p.step}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                >
                  {p.step}
                </Numeral>
              ))}
            </div>
          </div>

          {/* Step copy */}
          <div className="relative min-h-[14rem]">
            {steps.map((p, i) => (
              <StepCopy
                key={p.step}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
                title={p.title}
                body={p.body}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Opacity window for step `index` of `total`. Motion requires useTransform
 * input stops within [0,1] and strictly increasing, so the first step is full
 * from p=0 and the last stays full to p=1 (variable-length stop arrays).
 */
function useStepOpacity(
  progress: MotionValue<number>,
  index: number,
  total: number
) {
  const c = (index + 0.5) / total;
  // Uniform 4-point triangular window, clamped into [0,1] and nudged so the
  // stops stay strictly increasing (motion requires both).
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
  const a = clamp01(c - 0.22);
  let b = clamp01(c - 0.08);
  let d = clamp01(c + 0.08);
  let e = clamp01(c + 0.22);
  if (b <= a) b = a + 0.0001;
  if (d <= b) d = b + 0.0001;
  if (e <= d) e = d + 0.0001;
  return useTransform(progress, [a, b, d, e], [0, 1, 1, 0]);
}

/** Subtle rise/exit for a step, clamped to [0,1] input. */
function useStepRise(
  progress: MotionValue<number>,
  index: number,
  total: number,
  travel: number
) {
  const c = (index + 0.5) / total;
  const a = Math.max(0, c - 0.18);
  const b = Math.min(1, c + 0.18);
  return useTransform(progress, [a, c, b], [travel, 0, -travel]);
}

function Numeral({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const opacity = useStepOpacity(progress, index, total);
  const y = useStepRise(progress, index, total, 40);
  return (
    <motion.span
      style={{ opacity, y }}
      className="absolute inset-0 font-display leading-none text-accent/30 text-[clamp(5rem,12vw,11rem)] tabular-nums"
    >
      {children}
    </motion.span>
  );
}

function StepCopy({
  index,
  total,
  progress,
  title,
  body,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  body: string;
}) {
  const opacity = useStepOpacity(progress, index, total);
  const y = useStepRise(progress, index, total, 30);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col gap-5">
      <h3 className="display-md text-ink">{title}</h3>
      <p className="measure-wide text-xl leading-relaxed text-ink-soft">{body}</p>
    </motion.div>
  );
}
