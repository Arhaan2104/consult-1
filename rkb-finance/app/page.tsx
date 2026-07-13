import BalanceScale from "@/components/BalanceScale";
import { Button } from "@/components/Button";
import FaqColumns from "@/components/FaqColumns";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import { EngraveRule } from "@/components/Kicker";
import LineIcon from "@/components/LineIcon";
import LoanCard3D from "@/components/LoanCard3D";
import MoneyConveyor from "@/components/MoneyConveyor";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { Parallax, TextReveal } from "@/components/ScrollFX";
import ProcessScene from "@/components/ProcessScene";
import { Section, SectionHeader } from "@/components/Section";
import {
  faqGroups,
  process,
  product,
  trustSignals,
  whyChooseUs,
} from "@/content/site";

/**
 * Homepage — alternating cinematic bands:
 * vault (hero) → ivory (product) → vault (process, with a lit paper pane)
 * → gold (why borrowers choose us, with the balance in motion)
 * → ivory (closing) → the dark footer as epilogue.
 * The colour change IS the section divider.
 */
export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero — the vault ───────────────────────── */}
      <Hero />

      {/* Everything below rides the curtain: it overlaps the hero's base and
          slides over the pinned vault on scroll — the melt. */}
      <div className="hero-curtain">

      {/* ─────────────────────── Product — metal card ─────────────────────── */}
      <Section texture="ivory-loud">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-10">
            <SectionHeader
              index="01"
              kicker="The Product"
              title={
                <>
                  A short-term loan, when you need it{" "}
                  <span className="text-gold">most.</span>
                </>
              }
              intro={product.blurb}
            />
            <Reveal delay={0.14}>
              <Button href="/products" magnetic>
                View full details
              </Button>
            </Reveal>
          </div>

          <Parallax speed={0.06}>
            <Reveal delay={0.1}>
              <LoanCard3D />
            </Reveal>
          </Parallax>
        </div>

        {/* The conveyor is an illegibly small 3-stop wire at phone width and the
            dedicated "How it works" scene already carries this story — so it's
            shown from sm up, hidden on phones to keep mobile clean. */}
        <Reveal delay={0.12} className="mt-14 hidden sm:block lg:mt-20">
          <MoneyConveyor />
        </Reveal>
      </Section>

      {/* ─────────────────────── Process — 02 ─────────────────────── */}
      <Section texture="vault" flush>
        <ProcessScene
          steps={process}
          index="02"
          kicker="How it works"
          title={<>Three steps from application to funds.</>}
        />
      </Section>

      {/* ────────────── Why borrowers choose us — 03 ────────────── */}
      <Section texture="gold-loud">
        <SectionHeader
          index="03"
          kicker="Why borrowers choose us"
          title={
            <>
              The terms are simple, and they{" "}
              <span className="text-gold">stay that way.</span>
            </>
          }
        />
        <div className="mt-12 grid items-center gap-10 sm:mt-14 xl:grid-cols-[1.16fr_0.84fr] xl:gap-12">
          {/* Four benefits — a 2×2 of crisp porcelain cards. Top-anchored so
              icon → title → rule share a start line across each row; surplus
              height from unequal body copy falls to the card base. */}
          <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {whyChooseUs.map((a) => (
              <StaggerItem key={a.title} className="h-full">
                <FeatureCard
                  icon={a.icon}
                  title={a.title}
                  body={a.body}
                  titleClassName="text-lg"
                />
              </StaggerItem>
            ))}
          </Stagger>

          {/* The balance in motion — a dark, glossy vault plate, no captions:
              capital lands, the beam dips, written terms level it. Gold on navy
              so the motion is the whole focus. */}
          <Reveal delay={0.1} className="w-full max-w-xl mx-auto xl:max-w-none">
            <BalanceScale className="scene-vault" dark />
          </Reveal>
        </div>
      </Section>

      {/* ─────────────── Proof band — a lender you can rely on ─────────────── */}
      <Section texture="vault" className="overflow-hidden">
        <Reveal className="text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-gold-bright">
            <EngraveRule opacity="opacity-60" />
            A lender you can rely on
          </p>
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {trustSignals.map((s) => (
            <StaggerItem
              key={s.value}
              className="card-crisp flex flex-col items-center gap-3 rounded-2xl px-4 py-7 text-center sm:px-6 sm:py-9"
            >
              <LineIcon name={s.icon} className="w-8 text-gold sm:w-9" />
              <span className="font-display text-xl leading-none text-ink sm:text-3xl">
                {s.value}
              </span>
              <span className="eyebrow text-accent">{s.label}</span>
              <span className="measure text-sm leading-relaxed text-ink-soft">{s.sub}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ─────────────── FAQ — good to know (woven-paper band) ─────────────── */}
      <Section texture="weave">
        <SectionHeader
          title={<>Frequently Asked Questions</>}
          titleClassName="display-faq"
        />
        <FaqColumns groups={faqGroups} className="mt-12 sm:mt-14" />
      </Section>

      {/* ─────────────── Final CTA ─────────────── */}
      <Section texture="ivory-loud" className="overflow-hidden">
        <div className="text-center">
          <TextReveal
            text="Let’s find the right loan for your needs."
            className="display-lg mx-auto max-w-[20ch] text-balance text-ink"
          />
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                variant="gold"
                magnetic
                size="px-8 py-4"
                className="w-full justify-center sm:w-auto"
              >
                Apply now
              </Button>
              <Button
                href="/products"
                variant="ghost"
                arrow={false}
                size="px-8 py-4"
                className="w-full justify-center sm:w-auto"
              >
                See the product
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      </div>
    </>
  );
}
