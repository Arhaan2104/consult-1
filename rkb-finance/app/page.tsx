import { Button } from "@/components/Button";
import Hero from "@/components/Hero";
import LenderNetwork from "@/components/LenderNetwork";
import LineIcon from "@/components/LineIcon";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { Parallax, TextReveal } from "@/components/ScrollFX";
import ProcessScene from "@/components/ProcessScene";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import {
  advantages,
  process,
  product,
  site,
  sourcingPartnerCount,
  trustSignals,
} from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <Hero />

      <SectionDivider />

      {/* ─────────────────────── Product — 01 ─────────────────────── */}
      <Section texture="weave">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            index="01"
            kicker="The Product"
            title={<>A short-term loan, when you need it most.</>}
            intro={product.blurb}
          />
          <Parallax speed={0.06}>
            <Reveal delay={0.1}>
              {/* Term-sheet card — engraved heading, hero figure, ledger rows */}
              <div className="card-raised rounded-2xl border border-line-strong bg-canvas p-8 shadow-[0_1px_0_rgba(17,47,91,0.04)] sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden />
                  <span className="eyebrow text-ink-faint">{product.name}</span>
                </div>

                <div className="mt-8 flex flex-col gap-2">
                  <span className="eyebrow text-accent">Loan amount</span>
                  <span className="font-display text-[2.5rem] leading-[0.95] text-ink tabular-nums sm:text-5xl">
                    {product.amount.min}
                    <span className="px-1.5 font-normal text-ink-faint">–</span>
                    {product.amount.max}
                  </span>
                </div>

                <dl className="mt-9 border-y border-line">
                  {[
                    ["Interest rate", product.rate],
                    ["Disbursal", product.disbursal],
                    ["Interest type", product.rateNote],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      className={`flex items-baseline justify-between gap-6 py-4 ${
                        i > 0 ? "border-t border-line" : ""
                      }`}
                    >
                      <dt className="text-sm text-ink-soft">{k}</dt>
                      <dd className="text-right text-sm font-medium text-ink tabular-nums">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Button href="/products" className="mt-9 w-full justify-center">
                  View full details
                </Button>
              </div>
            </Reveal>
          </Parallax>
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
              className="card-cell group flex flex-col gap-4 bg-canvas p-8"
            >
              <LineIcon
                name={a.icon}
                className="w-7 text-accent transition-transform duration-300 ease-[var(--ease-rkb)] group-hover:-translate-y-0.5"
              />
              <span className="font-display text-xl text-ink">{a.title}</span>
              <p className="text-base leading-relaxed text-ink-soft">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* ─────────────────────── Process — 03 ─────────────────────── */}
      <Section texture="laid">
        <ProcessScene
          steps={process}
          index="03"
          kicker="How it works"
          title={<>Three steps from application to funds.</>}
        />
      </Section>

      <SectionDivider variant="accent" />

      {/* ───────── Why R.K. Bansal — the lender behind the network ───────── */}
      <Section texture="grain">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-accent">Why R.K. Bansal</p>
          <h2 className="display-lg mt-6 text-balance text-ink">
            Other apps <span className="text-ink-faint">arrange</span> your loan.{" "}
            We&rsquo;re the NBFC that <span className="text-accent">funds</span> it.
          </h2>
          <p className="mx-auto mt-7 measure-wide text-lg leading-relaxed text-ink-soft">
            R.K. Bansal Finance has lent in its own name since {site.since} — a
            Non-Banking Financial Company registered with the Reserve Bank of India
            (B-14.00700). Behind a network of digital apps, we&rsquo;re the institution
            that actually underwrites and funds the loan: fixed rates in writing, no
            upfront fees, and answerable to you directly.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 sm:mt-16">
          <LenderNetwork />
        </Reveal>

        <Reveal className="mt-12 text-center">
          <p className="measure-wide mx-auto text-base leading-relaxed text-ink-soft">
            You apply through a partner app. R.K. Bansal underwrites and funds the loan —
            directly, in its own name.{" "}
            <span className="text-ink-faint">
              Showing 8 of {sourcingPartnerCount} sourcing partners.
            </span>
          </p>
        </Reveal>
      </Section>

      <SectionDivider />

      {/* ─────────────────────── Compliance / trust ─────────────────────── */}
      <Section texture="weave">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            index="04"
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
              <StaggerItem key={t} className="card-cell flex flex-col gap-2 bg-canvas p-8">
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
        <Stagger className="mt-16 grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
          {trustSignals.map((s) => (
            <StaggerItem
              key={s.value}
              className="flex flex-col items-center gap-3 px-6 py-10 text-center sm:py-6"
            >
              <LineIcon name={s.icon} className="w-9 text-accent" />
              <span className="font-display text-2xl leading-none text-ink sm:text-3xl">
                {s.value}
              </span>
              <span className="eyebrow text-accent">{s.label}</span>
              <span className="measure text-sm leading-relaxed text-ink-soft">{s.sub}</span>
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
