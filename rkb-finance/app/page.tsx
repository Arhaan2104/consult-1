import { Button } from "@/components/Button";
import Hero from "@/components/Hero";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { Parallax, TextReveal } from "@/components/ScrollFX";
import ProcessScene from "@/components/ProcessScene";
import Marquee from "@/components/Marquee";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import {
  advantages,
  process,
  product,
  site,
  timeline,
  trustSignals,
} from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <Hero />

      <SectionDivider />

      {/* ─────────────────── Our Story (heritage) — leads the page ─────────────────── */}
      <Section texture="ledger">
        <SectionHeader
          index="01"
          kicker="Our story"
          title={<>From a 1984 incorporation to a modern lending platform.</>}
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] md:grid-cols-3">
          {timeline.map((t) => (
            <StaggerItem
              key={t.title}
              className="card-cell flex flex-col gap-4 bg-canvas p-8 sm:p-10"
            >
              <span className="font-display text-3xl text-accent">{t.year}</span>
              <h3 className="font-display text-xl text-ink">{t.title}</h3>
              <p className="text-base leading-relaxed text-ink-soft">{t.body}</p>
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

      <SectionDivider />

      {/* ───────────────────── Positioning statement ───────────────────── */}
      <Section texture="grain">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-accent">Why R.K. Bansal</p>
          <h2 className="display-lg mt-6 text-balance text-ink">
            Other apps <span className="text-ink-faint">arrange</span> your loan.{" "}
            We&rsquo;re the NBFC that <span className="text-accent">funds</span> it.
          </h2>
          <p className="mx-auto mt-7 measure-wide text-lg leading-relaxed text-ink-soft">
            R.K. Bansal Finance is the RBI-registered lender behind the loan — not a
            broker, not a lead generator. You borrow from the institution itself:
            regulated by the Reserve Bank of India, lending in our own name since{" "}
            {site.since}, and answerable to you directly.
          </p>
        </Reveal>
      </Section>

      <SectionDivider />

      {/* ─────────────────────── Product ─────────────────────── */}
      <Section texture="weave">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            index="02"
            kicker="The Product"
            title={<>A short-term loan, when you need it most.</>}
            intro={product.blurb}
          />
          <Parallax speed={0.06} className="lg:pb-2">
            <Reveal delay={0.1}>
            <div className="card-raised rounded-2xl border border-line-strong bg-canvas p-8 shadow-[0_1px_0_rgba(17,47,91,0.04)] sm:p-10">
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
                    <dt className="text-base text-ink-soft">{k}</dt>
                    <dd className="text-right text-base font-medium text-ink">{v}</dd>
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
          </Parallax>
        </div>
      </Section>

      <SectionDivider variant="accent" />

      {/* ─────────────────────── Advantages ─────────────────────── */}
      <Section texture="engrave">
        <SectionHeader
          index="03"
          kicker="Why borrowers choose us"
          title={<>The terms are simple, and they stay that way.</>}
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <StaggerItem
              key={a.title}
              className="card-cell group flex flex-col gap-3 bg-canvas p-8"
            >
              <span className="font-display text-xl text-ink">{a.title}</span>
              <span className="h-px w-8 bg-accent/50" />
              <p className="text-base leading-relaxed text-ink-soft">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* ─────────────── Direct NBFC vs loan app comparison ─────────────── */}
      <Section texture="weave">
        <SectionHeader
          kicker="The difference"
          title={<>Borrow from the lender — not through a middleman.</>}
          intro="Most loan apps are lead generators that hand you to whichever lender bids for you. With R.K. Bansal, the company you apply to is the company that lends."
        />
        <Reveal className="mt-16">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-[var(--color-line)] md:grid-cols-2">
            {/* Direct from the NBFC */}
            <div className="flex flex-col gap-7 bg-deep p-8 text-on-dark sm:p-10">
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow text-accent-2">R.K. Bansal Finance</span>
                <span className="font-display text-3xl">Direct from the NBFC</span>
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "The RBI-registered NBFC lends to you directly",
                  "Fixed rates, disclosed in writing before you commit",
                  "No upfront fees — ever",
                  "Grievances answered directly, under the RBI Ombudsman Scheme",
                  "Lending in its own name since 1984",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-lg leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-2" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Through a middleman */}
            <div className="flex flex-col gap-7 bg-canvas p-8 sm:p-10">
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow text-ink-faint">A typical loan app</span>
                <span className="font-display text-3xl text-ink-soft">
                  Through a middleman
                </span>
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "A service provider forwards you to a third-party lender",
                  "“Low rates” advertised; the actual rate shown late",
                  "Processing or convenience fees, sometimes upfront",
                  "Accountability depends on the partner lender",
                  "Often only a few years in the market",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-lg leading-relaxed text-ink-soft"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-line-strong" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <SectionDivider />

      {/* ─────────────────────── Process ─────────────────────── */}
      <Section texture="laid">
        <SectionHeader
          index="04"
          kicker="How it works"
          title={<>Three steps from application to funds.</>}
        />
        <ProcessScene steps={process} />
      </Section>

      <SectionDivider />

      {/* ─────────────────────── Compliance / trust ─────────────────────── */}
      <Section texture="weave">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            index="05"
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
              <StaggerItem key={t} className="card-cell flex flex-col gap-2 bg-canvas p-7">
                <span className="font-display text-lg text-ink">{t}</span>
                <p className="text-base leading-relaxed text-ink-soft">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <SectionDivider />

      {/* ─────────────────── Trust-signal proof band ─────────────────── */}
      <Section texture="vignette">
        <Reveal className="text-center">
          <p className="eyebrow text-accent">A lender you can rely on</p>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
          {trustSignals.map((s) => (
            <StaggerItem
              key={s.value}
              className="flex flex-col items-center gap-2 px-6 py-8 text-center sm:py-4"
            >
              <span className="font-display text-3xl leading-none text-ink sm:text-4xl">
                {s.value}
              </span>
              <span className="eyebrow text-accent">{s.label}</span>
              <span className="text-base leading-relaxed text-ink-soft">{s.sub}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ─────────────────────── Final CTA ─────────────────────── */}
      <section className="panel-dark">
        <div className="shell py-24 text-center lg:py-32">
          <Reveal>
            <p className="eyebrow text-accent-2">Ready when you are</p>
          </Reveal>
          <TextReveal
            text="Let’s find the right loan for your needs."
            className="display-lg mx-auto mt-6 max-w-[20ch] text-balance text-on-dark"
          />
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
