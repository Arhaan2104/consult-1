import type { ReactNode } from "react";
import { Reveal } from "./Motion";
import { Parallax } from "./ScrollFX";

/** Consistent inner-page header — a compact cut of the homepage vault:
    deep navy, engraved grid, gold kicker, expanded display type. */
export default function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative section-vault overflow-hidden">
      <Parallax
        speed={0.08}
        className="relative z-10 shell pt-36 pb-16 sm:pt-44 lg:pt-48 lg:pb-20"
      >
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-gold-bright">
            <span className="h-px w-8 bg-current opacity-60" aria-hidden />
            {kicker}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-xl mt-6 max-w-[18ch] text-balance text-on-dark">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p className="mt-7 measure-wide text-lg leading-relaxed text-on-dark-soft">
              {intro}
            </p>
          </Reveal>
        )}
      </Parallax>
    </section>
  );
}
