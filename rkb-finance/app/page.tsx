import BalanceScale from "@/components/BalanceScale";
import { Button } from "@/components/Button";
import Hero from "@/components/Hero";
import LineIcon from "@/components/LineIcon";
import LoanCard3D from "@/components/LoanCard3D";
import MoneyConveyor from "@/components/MoneyConveyor";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { Parallax, TextReveal } from "@/components/ScrollFX";
import ProcessScene from "@/components/ProcessScene";
import { Section, SectionHeader } from "@/components/Section";
import {
  advantages,
  process,
  product,
  trustSignals,
} from "@/content/site";

/**
 * Homepage — alternating cinematic bands:
 * vault (hero) → ivory (product) → blue (process) → vault (advantages)
 * → ivory (fair practice) → vault (closing).
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

        <Reveal delay={0.12} className="mt-14 lg:mt-20">
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

      {/* ─────────────────────── Advantages — 03 ─────────────────────── */}
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
        <Stagger className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <StaggerItem
              key={a.title}
              className="card-crisp group flex flex-col gap-4 rounded-2xl p-6 sm:p-8"
            >
              <span className="icon-plate transition-transform duration-300 ease-[var(--ease-rkb)] group-hover:-translate-y-0.5">
                <LineIcon name={a.icon} className="w-6 text-gold" />
              </span>
              <span className="font-display text-xl leading-tight text-ink">
                {a.title}
              </span>
              <p className="text-base leading-relaxed text-ink-soft">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ─────────────────────── Compliance / trust ─────────────────────── */}
      <Section texture="ivory-loud">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-10">
            <SectionHeader
              index="04"
              kicker="Fair practice"
              title={
                <>
                  Transparent by <span className="text-gold">policy,</span>{" "}
                  not just by promise.
                </>
              }
              intro="We treat every customer consistently and fairly. Loan terms, interest rates and penal charges are disclosed in writing, upfront. Grievances are resolved within 30 days."
            />
            <Reveal delay={0.16}>
              <BalanceScale />
            </Reveal>
          </div>
          <Stagger className="flex flex-col gap-3">
            {[
              [
                "coin-slash",
                "No upfront fees",
                "We never charge a fee before disbursing a loan. Anyone claiming otherwise is unauthorised.",
              ],
              [
                "document",
                "Written terms",
                "Rates, fees and the repayment schedule are shared in writing before you commit.",
              ],
              [
                "clock",
                "30-day grievance redressal",
                "A defined escalation matrix with a dedicated Grievance Redressal Officer.",
              ],
              [
                "shield",
                "RBI oversight",
                "A registered NBFC, covered by the Reserve Bank Integrated Ombudsman Scheme.",
              ],
            ].map(([icon, t, d]) => (
              <StaggerItem
                key={t}
                className="card-gloss group flex items-start gap-4 rounded-2xl p-6 sm:p-7"
              >
                <span className="icon-plate shrink-0 transition-transform duration-300 ease-[var(--ease-rkb)] group-hover:-translate-y-0.5">
                  <LineIcon name={icon} className="w-6 text-gold" />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-display text-lg text-ink">{t}</span>
                  <p className="text-base leading-relaxed text-ink-soft">{d}</p>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ─────────────── Closing — proof band + final CTA ─────────────── */}
      <Section texture="vault" className="overflow-hidden">
        <Reveal className="text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-gold-bright">
            <span className="h-px w-8 bg-current opacity-60" aria-hidden />
            A lender you can rely on
          </p>
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((s) => (
            <StaggerItem
              key={s.value}
              className="tile-inset flex flex-col items-center gap-3 rounded-2xl px-6 py-9 text-center"
            >
              <LineIcon name={s.icon} className="w-9 text-gold" />
              <span className="font-display text-2xl leading-none text-ink sm:text-3xl">
                {s.value}
              </span>
              <span className="eyebrow text-accent">{s.label}</span>
              <span className="measure text-sm leading-relaxed text-ink-soft">{s.sub}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="pt-24 pb-4 text-center lg:pt-32">
          <TextReveal
            text="Let’s find the right loan for your needs."
            className="display-lg mx-auto max-w-[20ch] text-balance text-on-dark"
          />
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" magnetic size="px-8 py-4">
                Apply now
              </Button>
              <Button
                href="/products"
                variant="ghost"
                arrow={false}
                size="px-8 py-4"
                className="border-[rgba(221,231,245,0.35)] text-on-dark hover:border-on-dark hover:bg-on-dark hover:text-deep"
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
