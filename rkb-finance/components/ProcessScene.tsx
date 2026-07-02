"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Reveal } from "@/components/Motion";
import { SectionHeader } from "@/components/Section";
import { ProcessArt, PlateRing } from "@/components/ProcessArt";

type Step = {
  step: string;
  label: string;
  title: string;
  body: string;
  details: readonly string[];
};
type Props = {
  steps: readonly Step[];
  index: string;
  kicker: string;
  title: ReactNode;
};

/**
 * "How it works" — a pinned scrollytelling scene on desktop. A coin-edge
 * 1–2–3 stepper advances while the step copy (left) and a framed engraved
 * "certificate plate" (right) cross-fade in place; then the section releases.
 * Falls back to a rich static, alternating plate/copy layout on mobile
 * (<768px) or under reduced motion. All content stays in the DOM.
 */
export default function ProcessScene(props: Props) {
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPinned(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  return pinned ? <PinnedProcess {...props} /> : <StaticProcess {...props} />;
}

/* ---------- The engraved certificate plate ---------- */
function Plate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full rounded-2xl border border-line-strong bg-canvas tx-engrave ${className}`}
    >
      {/* Coin-edge double frame + slow guilloché ring */}
      <span
        className="pointer-events-none absolute inset-[6px] rounded-[0.9rem] border border-line"
        aria-hidden
      />
      <PlateRing className="pointer-events-none absolute inset-0 h-full w-full text-accent" />
      <div className="absolute inset-0 grid place-items-center p-[13%]">
        {children}
      </div>
    </div>
  );
}

/* ---------- Grounded spec rows under each step ---------- */
function StepDetail({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="display-md text-ink">{step.title}</h3>
      <p className="measure text-lg leading-relaxed text-ink-soft">{step.body}</p>
      <ul className="mt-1 flex flex-col gap-3">
        {step.details.map((d) => (
          <li key={d} className="flex items-start gap-3 text-[0.98rem] text-ink-soft">
            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Coin-edge stepper (1–2–3) ---------- */
function Stepper({
  steps,
  progress,
}: {
  steps: readonly Step[];
  progress: MotionValue<number>;
}) {
  const fill = useTransform(progress, [0, 0.85], [0, 1]);
  return (
    <div className="relative mt-8 lg:mt-10">
      {/* Connecting rail between node centres (columns are equal, so 1/6 → 5/6) */}
      <div className="absolute left-[16.6%] right-[16.6%] top-[1.375rem] h-px -translate-y-1/2 bg-line-strong/50">
        <motion.div
          className="h-full w-full origin-left bg-accent"
          style={{ scaleX: fill }}
        />
      </div>
      <div className="relative flex">
        {steps.map((s, i) => (
          <StepNode
            key={s.step}
            step={s}
            index={i}
            total={steps.length}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

function StepNode({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Node centre sits at index/(total-1) of the rail; the fill reaches it at
  // that fraction of 0.85 (the fill's end stop). Light it as the fill arrives.
  const t = total > 1 ? (index / (total - 1)) * 0.85 : 0;
  const active = useTransform(progress, [Math.max(0, t - 0.05), t + 0.001], [0, 1]);
  return (
    <div className="flex flex-1 flex-col items-center gap-3 text-center">
      <div className="relative grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-canvas">
        <span className="absolute inset-[3px] rounded-full border border-line" aria-hidden />
        <motion.span
          className="absolute inset-[2px] rounded-full bg-accent"
          style={{ opacity: active }}
          aria-hidden
        />
        <span className="relative font-mono text-[0.7rem] leading-none text-ink-faint">
          {step.step}
        </span>
        <motion.span
          className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[0.7rem] leading-none text-canvas"
          style={{ opacity: active }}
          aria-hidden
        >
          {step.step}
        </motion.span>
      </div>
      <span className="eyebrow text-ink-faint">{step.label}</span>
    </div>
  );
}

/* ---------- Pinned scene (desktop) ---------- */
function PinnedProcess({ steps, index, kicker, title }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={trackRef} className="relative h-[300svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-start overflow-hidden pt-28 lg:pt-32">
        <SectionHeader index={index} kicker={kicker} title={title} />
        <Stepper steps={steps} progress={scrollYProgress} />

        <div className="mt-8 grid flex-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:mt-4 lg:gap-16">
          {/* Left — cross-fading copy (grid stack sizes to the tallest step) */}
          <div className="grid">
            {steps.map((s, i) => (
              <CopyBlock
                key={s.step}
                step={s}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* Right — persistent plate, cross-fading art */}
          <Plate className="max-w-[19.5rem]">
            <div className="grid h-full w-full place-items-center">
              {steps.map((s, i) => (
                <ArtBlock
                  key={s.step}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </Plate>
        </div>
      </div>
    </div>
  );
}

function CopyBlock({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useStepOpacity(progress, index, total);
  const y = useStepRise(progress, index, total, 34);
  return (
    <motion.div style={{ opacity, y }} className="[grid-area:1/1]">
      <StepDetail step={step} />
    </motion.div>
  );
}

function ArtBlock({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useStepOpacity(progress, index, total);
  const scale = useTransform(opacity, [0, 1], [0.965, 1]);
  return (
    <motion.div
      style={{ opacity, scale }}
      className="[grid-area:1/1] grid h-full w-full place-items-center"
    >
      <ProcessArt index={index} className="w-full text-accent" />
    </motion.div>
  );
}

/* ---------- Static fallback (mobile / reduced motion) ---------- */
function StaticProcess({ steps, index, kicker, title }: Props) {
  return (
    <>
      <SectionHeader index={index} kicker={kicker} title={title} />
      <div className="mt-14 flex flex-col gap-16 lg:gap-20">
        {steps.map((s, i) => (
          <Reveal key={s.step}>
            <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12 lg:gap-16">
              <Plate
                className={`max-w-[16rem] sm:max-w-[19rem] ${i % 2 === 1 ? "sm:order-2" : ""}`}
              >
                <ProcessArt index={i} className="w-full text-accent" />
              </Plate>
              <div>
                <div className="mb-5 flex items-center gap-3.5">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong bg-canvas">
                    <span className="absolute inset-[3px] rounded-full border border-line" aria-hidden />
                    <span className="font-mono text-[0.7rem] leading-none text-ink-faint">
                      {s.step}
                    </span>
                  </span>
                  <span className="eyebrow text-accent">{s.label}</span>
                </div>
                <StepDetail step={s} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   Per-step scroll timing (3 steps). See note below on clamping.
   ============================================================ */
function stepSpec(index: number, total: number) {
  if (total === 3) {
    // Step 1 full from 0 (clamped), fades 0.27→0.39. The explicit [.,1]→[.,0]
    // tail forces 0 after — motion's useTransform does not clamp a
    // descending-from-1 output at the far end on its own.
    if (index === 0)
      return { in: [0.27, 0.39, 1], op: [1, 0, 0], rise: [0, -1, -1] };
    if (index === 1)
      return { in: [0.27, 0.42, 0.58, 0.7], op: [0, 1, 1, 0], rise: [1, 0, 0, -1] };
    // Step 3 fades in 0.64→0.86, holds to the end (ascending clamp works).
    return { in: [0.64, 0.86], op: [0, 1], rise: [1, 0] };
  }
  const c = (index + 0.5) / total;
  return {
    in: [Math.max(0, c - 0.18), c - 0.06, c + 0.06, Math.min(1, c + 0.18)],
    op: [0, 1, 1, 0],
    rise: [1, 0, 0, -1],
  };
}

function useStepOpacity(
  progress: MotionValue<number>,
  index: number,
  total: number
) {
  const s = stepSpec(index, total);
  return useTransform(progress, s.in, s.op);
}

function useStepRise(
  progress: MotionValue<number>,
  index: number,
  total: number,
  travel: number
) {
  const s = stepSpec(index, total);
  return useTransform(
    progress,
    s.in,
    s.rise.map((r) => r * travel)
  );
}
