import { Button } from "@/components/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import Marquee from "@/components/Marquee";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import StatCounter from "@/components/StatCounter";
import {
  advantages,
  credibility,
  process,
  product,
  site,
  stats,
  timeline,
} from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative hero-rkb overflow-hidden">
        <div className="rails" aria-hidden />
        <div className="relative z-10 shell pt-32 pb-20 sm:pt-44 lg:pt-52 lg:pb-28">
          <Reveal>
            <p className="eyebrow text-accent">
              Est. {site.since} · RBI-Registered NBFC
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl mt-7 max-w-[16ch] text-balance text-ink">
              Empowering borrowers to meet all their financial needs.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 measure-wide text-lg leading-relaxed text-ink-soft">
              A unique lending platform that makes it simple to access funds —
              transparent terms, competitive rates, and a fully digital process
              built on more than four decades of trust.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/products" className="w-full justify-center sm:w-auto">
                Explore the loan
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                arrow={false}
                className="w-full justify-center sm:w-auto"
              >
                Speak with our team
              </Button>
            </div>
          </Reveal>

          {/* Credibility strip woven into hero base */}
          <div className="mt-20 lg:mt-28">
            <hr className="rule" />
            <Stagger className="grid grid-cols-2 gap-y-8 pt-8 lg:grid-cols-4">
              {credibility.map((c) => (
                <StaggerItem key={c.k} className="flex flex-col gap-1.5">
                  <span className="eyebrow text-ink-faint">{c.k}</span>
                  <span className="font-display text-lg text-ink">{c.v}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─────────────────────── Product ─────────────────────── */}
      <Section texture="weave">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            index="01"
            kicker="The Product"
            title={<>A short-term loan, when you need it most.</>}
            intro={product.blurb}
          />
          <Reveal delay={0.1} className="lg:pb-2">
            <div className="rounded-2xl border border-line-strong bg-canvas p-8 shadow-[0_1px_0_rgba(14,42,59,0.04)] sm:p-10">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-6">
                <span className="eyebrow text-ink-faint">Loan amount</span>
                <span className="font-display text-2xl text-ink sm:text-3xl">
                  {product.amount.min} – {product.amount.max}
                </span>
              </div>
              <dl>
                {[
                  ["Interest rate", product.rate],
                  ["Disbursal", product.disbursal],
                  ["Interest type", product.rateNote],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-6 border-b border-line py-4"
                  >
                    <dt className="text-sm text-ink-soft">{k}</dt>
                    <dd className="text-right text-sm font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="pt-6">
                <Button href="/products" className="w-full justify-center">
                  View full details
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <SectionDivider variant="accent" />

      {/* ─────────────────────── Advantages ─────────────────────── */}
      <Section texture="engrave">
        <SectionHeader
          index="02"
          kicker="Why borrowers choose us"
          title={<>The terms are simple, and they stay that way.</>}
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <StaggerItem
              key={a.title}
              className="group flex flex-col gap-3 bg-canvas p-8 transition-colors duration-300 hover:bg-canvas-3"
            >
              <span className="font-display text-xl text-ink">{a.title}</span>
              <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-14" />
              <p className="text-sm leading-relaxed text-ink-soft">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* ─────────────────────── Process ─────────────────────── */}
      <Section texture="laid">
        <SectionHeader
          index="03"
          kicker="How it works"
          title={<>Three steps from application to funds.</>}
        />
        <Stagger className="mt-16 grid gap-12 md:grid-cols-3">
          {process.map((p) => (
            <StaggerItem key={p.step} className="relative flex flex-col gap-4">
              <span className="font-display text-5xl text-accent/40">{p.step}</span>
              <h3 className="font-display text-2xl text-ink">{p.title}</h3>
              <p className="measure text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ─────────────────────── Stats (dark) ─────────────────────── */}
      <Section texture="dark">
        <SectionHeader
          index="04"
          kicker="A foundation of trust"
          title={<>Four decades of regulated, responsible lending.</>}
          dark
        />
        <Stagger className="mt-16 grid gap-12 sm:grid-cols-3">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="flex flex-col gap-3">
              <span className="font-display text-4xl text-on-dark sm:text-5xl">
                {s.animate ? <StatCounter value={s.value} /> : s.value}
              </span>
              <span className="eyebrow text-accent-2">{s.label}</span>
              <p className="measure text-sm leading-relaxed text-on-dark-soft">
                {s.sub}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* ─────────────────────── Heritage timeline ─────────────────────── */}
      <Section texture="ledger">
        <SectionHeader
          index="05"
          kicker="Our story"
          title={<>From a 1984 incorporation to a modern lending platform.</>}
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] md:grid-cols-3">
          {timeline.map((t) => (
            <StaggerItem
              key={t.title}
              className="flex flex-col gap-4 bg-canvas p-8 sm:p-10"
            >
              <span className="font-display text-3xl text-accent">{t.year}</span>
              <h3 className="font-display text-xl text-ink">{t.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{t.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14">
          <p className="eyebrow mb-6 text-ink-faint">
            A fully digital sourcing network
          </p>
          <Marquee>
            {[
              "Ramfincorp",
              "Anq Digital Finserv",
              "CredMantra",
              "DigitMoney",
              "CASHe",
              "GroMo",
              "GoCredit",
              "Buddy Loan",
              "MobiKwik",
              "Bajaj Finserv",
            ].map((n) => (
              <span key={n} className="font-display text-2xl text-ink/40 sm:text-3xl">
                {n}
              </span>
            ))}
          </Marquee>
        </Reveal>
      </Section>

      <SectionDivider variant="accent" />

      {/* ─────────────────────── Compliance / trust ─────────────────────── */}
      <Section texture="weave">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            index="06"
            kicker="Fair practice"
            title={<>Transparent by policy, not just by promise.</>}
            intro="We treat every customer consistently and fairly. Loan terms, interest rates and penal charges are disclosed in writing, upfront — and grievances are resolved within 30 days."
          />
          <Stagger className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)]">
            {[
              [
                "No upfront fees",
                "We never charge a fee before disbursing a loan. Anyone claiming otherwise is unauthorised.",
              ],
              [
                "Written terms",
                "Rates, fees and the repayment schedule are shared in writing before you commit.",
              ],
              [
                "30-day grievance redressal",
                "A defined escalation matrix with a dedicated Grievance Redressal Officer.",
              ],
              [
                "RBI oversight",
                "A registered NBFC, covered by the Reserve Bank Integrated Ombudsman Scheme.",
              ],
            ].map(([t, d]) => (
              <StaggerItem key={t} className="flex flex-col gap-2 bg-canvas p-7">
                <span className="font-display text-lg text-ink">{t}</span>
                <p className="text-sm leading-relaxed text-ink-soft">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ─────────────────────── Final CTA ─────────────────────── */}
      <section className="panel-dark">
        <div className="shell py-24 text-center lg:py-32">
          <Reveal>
            <p className="eyebrow text-accent-2">Ready when you are</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-lg mx-auto mt-6 max-w-[20ch] text-balance text-on-dark">
              Let&rsquo;s find the right loan for your needs.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="light">
                Speak with our team
              </Button>
              <Button
                href="/products"
                variant="ghost"
                arrow={false}
                className="border-line-dark text-on-dark hover:bg-on-dark hover:text-deep"
              >
                See the product
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
