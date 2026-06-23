import type { ReactNode } from "react";
import { Reveal } from "./Motion";

/** Consistent inner-page header that clears the fixed nav. */
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
    <section className="relative hero-ava">
      <div className="rails" aria-hidden />
      <div className="relative z-10 shell pt-32 pb-16 sm:pt-44 lg:pt-48 lg:pb-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-none border border-line px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-none bg-accent" />
            <span className="eyebrow text-ink-soft">{kicker}</span>
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-xl mt-6 max-w-[18ch] text-balance text-ink">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p className="mt-7 measure-wide text-lg leading-relaxed text-ink-soft">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
