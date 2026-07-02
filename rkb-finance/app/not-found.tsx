import type { Metadata } from "next";
import { Button } from "@/components/Button";
import HeroSeal from "@/components/HeroSeal";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative hero-rkb overflow-hidden">
      <HeroSeal />
      <div className="relative z-10 shell flex min-h-[80svh] flex-col items-center justify-center text-center">
        <Reveal>
          <p className="eyebrow text-accent">Error 404</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-xl mt-6 max-w-[16ch] text-balance text-ink">
            This page isn&rsquo;t on the ledger.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 measure mx-auto text-lg leading-relaxed text-ink-soft">
            The page you were looking for may have moved or never existed. Let&rsquo;s
            get you back to familiar ground.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href="/" className="w-full justify-center sm:w-auto">
              Back to home
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              arrow={false}
              className="w-full justify-center sm:w-auto"
            >
              Contact us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
