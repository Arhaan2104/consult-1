"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { Button } from "@/components/Button";
import HeroSeal from "@/components/HeroSeal";
import HeroSealMotion from "@/components/HeroSealMotion";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SPRING } from "@/components/motion/tokens";
import { heroTrust, site } from "@/content/site";

/**
 * Homepage hero. Client component so it can drive scroll-linked motion:
 * the seal scales/rotates/fades and the content column lifts + fades as the
 * hero scrolls out. Initial load-in still uses the Reveal/Stagger family.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentYRaw = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useSpring(contentYRaw, SPRING.soft);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const contentStyle = reduce ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <section ref={heroRef} className="relative hero-rkb overflow-hidden">
      <div className="rails" aria-hidden />
      <HeroSealMotion progress={scrollYProgress}>
        <HeroSeal />
      </HeroSealMotion>
      <motion.div
        style={contentStyle}
        className="relative z-10 shell flex flex-col items-center text-center pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
      >
        <Reveal>
          <p className="eyebrow text-accent">
            RBI-Registered NBFC · Direct lender since {site.since}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-xl mt-6 max-w-[26ch] text-pretty text-ink">
            Empowering
            <br /> borrowers to meet{" "}
            <span className="block text-balance text-accent">
              all their financial needs.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Button
              href="/products"
              magnetic
              size="px-7 py-3.5"
              className="w-full justify-center text-[0.95rem] sm:w-auto"
            >
              Explore Products
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              arrow={false}
              size="px-7 py-3.5"
              className="w-full justify-center text-[0.95rem] sm:w-auto"
            >
              Speak with our team
            </Button>
          </div>
        </Reveal>

        {/* Trust band — prominent proof woven into the hero base */}
        <div className="w-full mt-12 lg:mt-14">
          <hr className="rule" />
          <Stagger className="grid grid-cols-1 divide-y divide-line pt-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {heroTrust.map((s) => (
              <StaggerItem
                key={s.label}
                className="flex flex-col items-center gap-2.5 px-4 py-7 text-center sm:py-3"
              >
                <span className="eyebrow text-accent">{s.prefix}</span>
                {/* Ramp sized so the longest value ("₹6.1 Crore") stays on one
                    line inside its column at every 3-col width — keeps the three
                    labels on a common baseline. Full size returns at xl. */}
                <span className="font-display leading-[0.95] text-ink tabular-nums whitespace-nowrap text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  {s.value}
                </span>
                <span className="text-base font-medium tracking-wide text-ink-soft">
                  {s.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </motion.div>
    </section>
  );
}
