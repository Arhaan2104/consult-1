"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Stagger, StaggerItem } from "@/components/Motion";
import { SectionHeader } from "@/components/Section";
import StepGraphic from "@/components/StepGraphic";

type Step = { step: string; title: string; body: string };
type Props = {
  steps: readonly Step[];
  index: string;
  kicker: string;
  title: ReactNode;
};

/**
 * "How it works" — a pinned scrollytelling scene on desktop. The section
 * header pins together with the steps, so within one viewport you see the
 * header and the current step; scrolling advances 1 → 2 → 3 in place, then
 * the section releases to the next. Falls back to a static header + 3-col
 * grid on mobile (<768px) or under reduced motion. Content is always in the
 * DOM (no scroll-gated content) so it stays accessible.
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

/* ---------- Static fallback (mobile / reduced motion) ---------- */
function StaticProcess({ steps, index, kicker, title }: Props) {
  return (
    <>
      <SectionHeader index={index} kicker={kicker} title={title} />
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
    </>
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
    // Tall track = more scroll per step (slower). svh avoids iOS jumps.
    <div ref={trackRef} className="relative h-[280svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* Header pins with the steps — both live in one viewport. */}
        <SectionHeader index={index} kicker={kicker} title={title} />

        {/* Persistent ledger line beside cross-faded step blocks. Each block
            holds its numeral + copy together, so they stay aligned. */}
        <div className="mt-10 flex items-stretch gap-7 lg:mt-12 lg:gap-10">
          <div className="relative w-px shrink-0 self-stretch bg-line">
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-accent"
              style={{ height: "100%", scaleY: scrollYProgress }}
            />
          </div>
          <div className="relative min-h-[15rem] flex-1">
            {steps.map((p, i) => (
              <StepBlock
                key={p.step}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
                step={p.step}
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
 * Per-step scroll spec (3 steps). `in` = progress stops; `op` = opacity;
 * `rise` = y multipliers (×travel).
 *
 * Important: the first/last steps use 2-point transforms so the held edge is
 * a clamped endpoint. A 4-point opacity array whose output *starts* at 1
 * (e.g. [1,1,1,0]) makes motion's useTransform mis-clamp at the far end, so
 * step 1 must NOT use that shape. Step 1 is full from progress 0 (clamped),
 * step 3 holds full to progress 1 (clamped) — minimal dead scroll either end.
 */
function stepSpec(index: number, total: number) {
  if (total === 3) {
    // Step 1: full from progress 0 (clamped), fades out 0.27→0.39. The
    // explicit [.,1]→[.,0] tail forces 0 afterwards — motion's useTransform
    // does NOT clamp a descending-from-1 output at the far end on its own.
    if (index === 0)
      return { in: [0.27, 0.39, 1], op: [1, 0, 0], rise: [0, -1, -1] };
    if (index === 1)
      return { in: [0.27, 0.42, 0.58, 0.7], op: [0, 1, 1, 0], rise: [1, 0, 0, -1] };
    // Step 3: fades in 0.64→0.9, holds full to the end (ascending clamp works).
    return { in: [0.64, 0.9], op: [0, 1], rise: [1, 0] };
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

/** Subtle rise; y holds at 0 during the step's full window (no dwell drift). */
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

/**
 * One step = big ghosted numeral + copy, top-aligned as a single unit so the
 * numeral and the title read as a pair. All three blocks stack absolutely and
 * cross-fade with scroll.
 */
function StepBlock({
  index,
  total,
  progress,
  step,
  title,
  body,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  step: string;
  title: string;
  body: string;
}) {
  const opacity = useStepOpacity(progress, index, total);
  const y = useStepRise(progress, index, total, 36);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 grid grid-cols-[auto_1fr] items-start gap-7 lg:gap-12"
    >
      <span className="font-display leading-[0.78] text-accent/25 text-[clamp(3.5rem,8vw,7rem)] tabular-nums">
        {step}
      </span>
      <div className="flex flex-col gap-5">
        <h3 className="display-md text-ink">{title}</h3>
        <p className="measure-wide text-xl leading-relaxed text-ink-soft">{body}</p>
        <StepGraphic index={index} className="mt-1 w-[clamp(5rem,6vw,6.5rem)]" />
      </div>
    </motion.div>
  );
}
