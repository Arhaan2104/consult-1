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
import { ProcessArt, GuillocheRosette } from "@/components/ProcessArt";

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
 * 1–2–3 stepper advances while a single liquid-glass frame holds the step
 * copy (left) and a framed engraved illustration (right) that cross-fade in
 * place; then the section releases. Falls back to a rich static, alternating
 * layout on mobile (<768px) or under reduced motion. Content stays in the DOM.
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

/* ---------- Centred illustration on the guilloché rosette ---------- */
function ArtWell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto grid aspect-square w-full place-items-center ${className}`}>
      <GuillocheRosette className="pointer-events-none absolute inset-0 h-full w-full text-accent" />
      <div className="grid h-full w-full place-items-center">{children}</div>
    </div>
  );
}

/* ---------- Grounded spec rows under each step ---------- */
function StepDetail({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="display-md text-ink">{step.title}</h3>
      <p className="measure text-xl leading-relaxed text-ink-soft">{step.body}</p>
      <ul className="mt-1 flex flex-col gap-3.5">
        {step.details.map((d) => (
          <li key={d} className="flex items-start gap-3.5 text-[1.05rem] leading-snug text-ink-soft">
            <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden />
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
    <div className="relative mt-8 lg:mt-9">
      <div className="absolute left-[16.6%] right-[16.6%] top-[1.375rem] h-px -translate-y-1/2 bg-line-strong/50">
        <motion.div className="h-full w-full origin-left bg-accent" style={{ scaleX: fill }} />
      </div>
      <div className="relative flex">
        {steps.map((s, i) => (
          <StepNode key={s.step} step={s} index={i} total={steps.length} progress={progress} />
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
  const t = total > 1 ? (index / (total - 1)) * 0.85 : 0;
  const active = useTransform(progress, [Math.max(0, t - 0.05), t + 0.001], [0, 1]);
  return (
    <div className="flex flex-1 flex-col items-center gap-3 text-center">
      <div className="relative grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-canvas">
        <span className="absolute inset-[3px] rounded-full border border-line" aria-hidden />
        <motion.span className="absolute inset-[2px] rounded-full bg-accent" style={{ opacity: active }} aria-hidden />
        <span className="relative font-mono text-[0.7rem] leading-none text-ink-faint">{step.step}</span>
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
        <SectionHeader index={index} kicker={kicker} title={title} align="center" />
        <Stepper steps={steps} progress={scrollYProgress} />

        {/* One liquid-glass frame holding the cross-fading step */}
        <div className="mt-7 flex flex-1 items-center lg:mt-8">
          <div className="glass-frame w-full p-7 sm:p-9 lg:p-11">
            <div className="grid items-center gap-10 md:grid-cols-[1.06fr_0.94fr] md:gap-12 lg:gap-16">
              {/* Left — cross-fading copy (grid stack sizes to the tallest step) */}
              <div className="grid">
                {steps.map((s, i) => (
                  <CopyBlock key={s.step} step={s} index={i} total={steps.length} progress={scrollYProgress} />
                ))}
              </div>

              {/* Right — cross-fading art on a steady rosette */}
              <ArtWell className="max-w-[17rem]">
                {steps.map((s, i) => (
                  <ArtBlock key={s.step} index={i} total={steps.length} progress={scrollYProgress} />
                ))}
              </ArtWell>
            </div>
          </div>
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
      <ProcessArt index={index} className="w-[86%] text-accent" />
    </motion.div>
  );
}

/* ---------- Static fallback (mobile / reduced motion) ---------- */
function StaticProcess({ steps, index, kicker, title }: Props) {
  return (
    <>
      <SectionHeader index={index} kicker={kicker} title={title} align="center" />
      <div className="mt-14 flex flex-col gap-10 lg:gap-14">
        {steps.map((s, i) => (
          <Reveal key={s.step}>
            <div className="glass-frame p-6 sm:p-9 lg:p-11">
              <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-14">
                <ArtWell className={`max-w-[15rem] sm:max-w-[17rem] ${i % 2 === 1 ? "sm:order-2" : ""}`}>
                  <ProcessArt index={i} className="w-[86%] text-accent" />
                </ArtWell>
                <div>
                  <div className="mb-5 flex items-center gap-3.5">
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong bg-canvas">
                      <span className="absolute inset-[3px] rounded-full border border-line" aria-hidden />
                      <span className="font-mono text-[0.7rem] leading-none text-ink-faint">{s.step}</span>
                    </span>
                    <span className="eyebrow text-accent">{s.label}</span>
                  </div>
                  <StepDetail step={s} />
                </div>
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
    if (index === 0)
      return { in: [0.27, 0.39, 1], op: [1, 0, 0], rise: [0, -1, -1] };
    if (index === 1)
      return { in: [0.27, 0.42, 0.58, 0.7], op: [0, 1, 1, 0], rise: [1, 0, 0, -1] };
    // Explicit tail stop at 1 so the final step HOLDS full opacity through the
    // end of the pinned range. Without it, this motion build does not clamp a
    // 2-stop range past its last input — the step decays back to 0 and leaves
    // the glass frame empty as the scene releases.
    return { in: [0.64, 0.86, 1], op: [0, 1, 1], rise: [1, 0, 0] };
  }
  const c = (index + 0.5) / total;
  return {
    in: [Math.max(0, c - 0.18), c - 0.06, c + 0.06, Math.min(1, c + 0.18)],
    op: [0, 1, 1, 0],
    rise: [1, 0, 0, -1],
  };
}

function useStepOpacity(progress: MotionValue<number>, index: number, total: number) {
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
