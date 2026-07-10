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
import { useLenis } from "@/components/LenisProvider";
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
 * "How it works" — a pinned scrollytelling scene on the dark vault band.
 * Left: a clickable vertical index of the three stages beside a gold
 * progress rail — the active stage rests in a gold-struck glass plate, and
 * clicking any stage scrolls the pin to it. Right: ONE navy-glass pane
 * holding both the engraved illustration and the stage copy, cross-fading
 * in place. Falls back to calm stacked panes on mobile (<768px) or under
 * reduced motion. All content stays in the DOM.
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

/* ---------- Illustration on the rosette — no extra frame, it lives
   directly inside the shared pane ---------- */
function StageArt({ index }: { index: number }) {
  return (
    <div className="relative mx-auto grid aspect-[6/5] w-full max-w-[13rem] place-items-center sm:max-w-none">
      <GuillocheRosette className="pointer-events-none absolute inset-0 m-auto h-[112%] w-[112%] text-gold-bright/70" />
      <ProcessArt index={index} className="relative w-[56%] text-gold-bright" />
    </div>
  );
}

/* ---------- One stage as a single aligned block ----------
   Title anchored top-left; the engraved illustration beneath it on the
   left; body + grounded specs to its right. One block, one grid. */
function StepPanel({
  step,
  index,
  withLabel = false,
}: {
  step: Step;
  index: number;
  /** Show the "02 —— UNDERWRITING" micro-label (static cards only — in the
      pinned scene the left index already carries it). */
  withLabel?: boolean;
}) {
  return (
    <div>
      {withLabel && (
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[0.7rem] leading-none tracking-widest text-gold-bright">
            {step.step}
          </span>
          <span className="h-px w-6 bg-[rgba(217,165,63,0.4)]" aria-hidden />
          <span className="eyebrow text-gold-bright">{step.label}</span>
        </div>
      )}
      <h3 className="display-md text-on-dark">{step.title}</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-[0.4fr_0.6fr] sm:items-center sm:gap-8">
        <StageArt index={index} />
        <div className="flex flex-col gap-3.5">
          <p className="text-[1.02rem] leading-relaxed text-on-dark-soft">{step.body}</p>
          <ul className="flex flex-col gap-2.5">
            {step.details.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 text-[0.98rem] leading-snug text-on-dark-soft"
              >
                <span className="mint-mark mt-[0.45rem] h-1.5 w-1.5 shrink-0" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Vertical index — one clickable row per stage ---------- */
function StepRow({
  step,
  index,
  total,
  progress,
  onJump,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onJump: (i: number) => void;
}) {
  const on = useStepActive(progress, index, total);
  // Single text node per label (no stacked copies), tinted by activation —
  // keeps selection/copy clean and the DOM honest.
  const numColor = useTransform(on, [0, 1], ["rgba(159, 178, 205, 0.55)", "#d9a53f"]);
  const labelColor = useTransform(on, [0, 1], ["rgba(159, 178, 205, 0.5)", "#e8eef7"]);
  return (
    <button
      type="button"
      onClick={() => onJump(index)}
      className="step-btn"
      aria-label={`Go to step ${step.step} — ${step.label}`}
    >
      <motion.span
        aria-hidden
        style={{ opacity: on }}
        className="step-plate absolute inset-0 rounded-[1.25rem]"
      />
      <span className="relative flex items-baseline gap-4 px-5 py-4 sm:gap-5 sm:px-6 sm:py-[1.05rem]">
        <motion.span
          style={{ color: numColor }}
          className="shrink-0 font-mono text-[0.72rem] leading-none tracking-widest"
        >
          {step.step}
        </motion.span>
        <motion.span style={{ color: labelColor }} className="display-md">
          {step.label}
        </motion.span>
      </span>
    </button>
  );
}

/* ---------- Pinned scene (desktop) ---------- */

/** Scroll-progress targets — the centre of each stage's plateau in
    stepStops' timing, kept inside the pin so a jump never releases it. */
const JUMP_TARGETS = [0.1, 0.5, 0.85];

function PinnedProcess({ steps, index, kicker, title }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenis();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const railFill = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const scrollable = el.offsetHeight - window.innerHeight;
    const y = top + JUMP_TARGETS[i] * scrollable;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(y, { duration: 1.1 });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div ref={trackRef} className="relative h-[240svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-20 pb-8 lg:pt-24">
        <SectionHeader index={index} kicker={kicker} title={title} align="center" dark />

        <div className="mt-9 grid items-center gap-8 lg:mt-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-12">
          {/* Left — clickable index beside the gold progress rail */}
          <div className="relative pl-5">
            <span
              aria-hidden
              className="absolute inset-y-3 left-0 w-px bg-[rgba(232,238,247,0.14)]"
            >
              <motion.span
                className="absolute inset-0 origin-top bg-[linear-gradient(180deg,#dfb763,#b88624)]"
                style={{ scaleY: railFill }}
              />
            </span>
            <div className="flex flex-col gap-1.5">
              {steps.map((s, i) => (
                <StepRow
                  key={s.step}
                  step={s}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                  onJump={jumpTo}
                />
              ))}
            </div>
          </div>

          {/* Right — ONE pane: the whole stage block cross-fades as a unit */}
          <div className="pane-vault p-6 sm:p-7 lg:px-9 lg:py-8">
            <div className="grid">
              {steps.map((s, i) => (
                <FadeBlock key={s.step} index={i} total={steps.length} progress={scrollYProgress} rise>
                  <StepPanel step={s} index={i} />
                </FadeBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FadeBlock({
  index,
  total,
  progress,
  rise = false,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  rise?: boolean;
  children: ReactNode;
}) {
  const opacity = useStepActive(progress, index, total);
  const y = useTransform(opacity, [0, 1], [rise ? 20 : 0, 0]);
  const scale = useTransform(opacity, [0, 1], [rise ? 1 : 0.975, 1]);
  return (
    <motion.div style={{ opacity, y, scale }} className="[grid-area:1/1]">
      {children}
    </motion.div>
  );
}

/* ---------- Static fallback (mobile / reduced motion) ---------- */
function StaticProcess({ steps, index, kicker, title }: Props) {
  return (
    <div className="py-16 sm:py-20">
      <SectionHeader index={index} kicker={kicker} title={title} align="center" dark />
      <div className="mt-10 flex flex-col gap-5 sm:mt-12">
        {steps.map((s, i) => (
          <Reveal key={s.step}>
            <div className="pane-vault p-6 sm:p-7">
              <StepPanel step={s} index={i} withLabel />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Per-step scroll timing (default 3 steps). Each stage owns a
   plateau of the pinned range; the last stage HOLDS to 1 so the
   panel never empties as the scene releases.
   ============================================================ */
function stepStops(index: number, total: number) {
  // Ranges explicitly span the full [0, 1] with FLAT tails at both ends. This
  // motion build does not clamp a keyframe range past its last input, so a
  // stage whose range ends early (e.g. [0, 0.3, 0.37]) drifts back up rather
  // than holding 0 — the terminal 0/1 stops below pin it in place.
  if (total === 3) {
    if (index === 0) return { in: [0, 0.3, 0.37, 1], op: [1, 1, 0, 0] };
    if (index === 1)
      return { in: [0, 0.3, 0.37, 0.63, 0.7, 1], op: [0, 0, 1, 1, 0, 0] };
    return { in: [0, 0.63, 0.7, 1], op: [0, 0, 1, 1] };
  }
  const c = (index + 0.5) / total;
  const w = 0.5 / total;
  const a = Math.max(0, c - 3 * w);
  const b = Math.min(1, c + 3 * w);
  return {
    in: [0, a, c - w, c + w, b, 1],
    op: [0, 0, 1, 1, 0, 0],
  };
}

function useStepActive(progress: MotionValue<number>, index: number, total: number) {
  const s = stepStops(index, total);
  return useTransform(progress, s.in, s.op);
}
