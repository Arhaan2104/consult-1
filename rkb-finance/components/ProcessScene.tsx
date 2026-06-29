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
import StepGraphic from "@/components/StepGraphic";

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
      {steps.map((p, i) => (
        <StaggerItem key={p.step} className="relative flex flex-col gap-4">
          <span className="font-display text-5xl text-accent/40">{p.step}</span>
          <h3 className="font-display text-2xl text-ink">{p.title}</h3>
          <p className="measure text-base leading-relaxed text-ink-soft">{p.body}</p>
          <StepGraphic index={i} className="mt-3 w-[clamp(5.5rem,22vw,7.5rem)]" />
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
    // ~0.7 viewport of scroll per step — brisk but readable. svh avoids
    // iOS address-bar jumps. Step 1 is full at progress 0 (no entry gap).
    <div ref={trackRef} className="relative mt-4 h-[210svh]">
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
          <div className="relative min-h-[22rem]">
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
 * Opacity window for step `index` of `total`. All stops stay within [0,1]
 * and strictly increasing (motion requires both). The FIRST step is full at
 * progress 0 (no entry gap) and the LAST stays full to progress 1.
 */
function useStepOpacity(
  progress: MotionValue<number>,
  index: number,
  total: number
) {
  const w = 1 / total;
  const fade = Math.min(0.06, w * 0.35);
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const segStart = index * w;
  const segEnd = (index + 1) * w;
  // 4-point window: hold the outer edges for the first / last steps.
  const a = isFirst ? 0 : segStart - fade;
  const b = isFirst ? 0.0001 : segStart + fade;
  const d = isLast ? 0.9999 : segEnd - fade;
  const e = isLast ? 1 : segEnd + fade;
  return useTransform(
    progress,
    [a, b, d, e],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
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
      <StepGraphic index={index} className="mt-2 w-[clamp(6.5rem,9vw,9rem)]" />
    </motion.div>
  );
}
