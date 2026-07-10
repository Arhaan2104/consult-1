"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { Button } from "@/components/Button";
import CountUp from "@/components/CountUp";
import HeroSeal from "@/components/HeroSeal";
import HeroSealMotion from "@/components/HeroSealMotion";
import HeroBanknote from "@/components/HeroBanknote";
import HeroVault from "@/components/HeroVault";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SPRING } from "@/components/motion/tokens";
import { heroTrust, site } from "@/content/site";

/**
 * Homepage hero — the vault, split-stage. Copy sits left; the gold-lit
 * engraved medallion holds the right half. On desktop the hero pins
 * (sticky) and the ivory page rises over it as a rounded paper sheet
 * (see .hero-curtain) while a navy veil melts the vault back.
 *
 * Scroll progress is measured in window pixels against the hero's height —
 * a sticky target's own bounding rect never moves, so the usual
 * target-based useScroll would sit at 0 forever once pinned.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const [range, setRange] = useState(900);
  useEffect(() => {
    const measure = () =>
      setRange(Math.max(1, heroRef.current?.offsetHeight ?? window.innerHeight));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const scrollYProgress = useTransform(scrollY, [0, range], [0, 1]);

  const contentYRaw = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useSpring(contentYRaw, SPRING.soft);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const veil = useTransform(scrollYProgress, [0.12, 0.9], [0, 0.6]);

  const contentStyle = reduce ? undefined : { y: contentY, opacity: contentOpacity };

  // Cursor parallax for the medallion — normalised −0.5…0.5, spring-smoothed.
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const pointerX = useSpring(mvx, { stiffness: 90, damping: 20, mass: 0.6 });
  const pointerY = useSpring(mvy, { stiffness: 90, damping: 20, mass: 0.6 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mvx.set((e.clientX - r.left) / r.width - 0.5);
    mvy.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetPointer = () => {
    mvx.set(0);
    mvy.set(0);
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative hero-vault overflow-hidden lg:sticky lg:top-0 lg:h-svh lg:min-h-[620px]"
    >
      <HeroVault />
      <HeroSealMotion progress={scrollYProgress} pointer={{ x: pointerX, y: pointerY }}>
        <HeroSeal />
      </HeroSealMotion>
      <div className="hero-scrim" aria-hidden />
      <HeroBanknote />

      <motion.div
        style={contentStyle}
        className="relative z-10 shell flex flex-col pt-32 pb-24 sm:pt-36 lg:h-full lg:pt-20 lg:pb-32"
      >
        {/* Copy column — left stage */}
        <div className="max-w-[38rem] lg:my-auto lg:max-w-[48%]">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-bright">
              <span className="h-px w-8 bg-current opacity-60" aria-hidden />
              RBI-Registered NBFC · Direct lender since {site.since}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl display-hero mt-7 text-pretty text-on-dark">
              Empowering borrowers to meet{" "}
              <span className="gold-text">all their financial needs.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href="/contact"
                variant="gold"
                magnetic
                size="px-8 py-4"
                className="w-full justify-center text-[0.95rem] sm:w-auto"
              >
                Apply now
              </Button>
              <Button
                href="/products#eligibility"
                variant="ghost"
                arrow={false}
                size="px-8 py-4"
                className="w-full justify-center border-[rgba(221,231,245,0.35)] text-[0.95rem] text-on-dark hover:border-on-dark hover:bg-on-dark hover:text-deep sm:w-auto"
              >
                Check eligibility
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Trust strip — boxless proof figures along the hero base */}
        <div className="mt-14 w-full lg:mt-0">
          <hr className="h-px border-0 bg-[rgba(217,165,63,0.35)]" />
          <Stagger className="grid grid-cols-1 divide-y divide-[rgba(217,165,63,0.25)] pt-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {heroTrust.map((s, i) => (
              <StaggerItem
                key={s.label}
                className="flex flex-col items-start gap-2 px-1 py-5 sm:px-8 sm:py-2 sm:first:pl-1"
              >
                <span className="eyebrow text-gold-bright">{s.prefix}</span>
                <CountUp
                  value={s.value}
                  delay={0.15 * i}
                  className="font-display leading-[0.95] text-on-dark tabular-nums whitespace-nowrap text-4xl md:text-5xl"
                />
                <span className="text-[0.95rem] font-medium tracking-wide text-on-dark-soft">
                  {s.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </motion.div>

      {/* Melt veil — the vault dims as the paper sheet rises over it. */}
      {!reduce && (
        <motion.div
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 z-30 bg-vault"
          aria-hidden
        />
      )}
    </section>
  );
}
