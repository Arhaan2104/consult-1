import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import { Button } from "@/components/Button";
import LoanCalculator from "@/components/LoanCalculator";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import {
  documents,
  eligibility,
  faqGroups,
  kfs,
  process,
  product,
  productCharges,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The R.K. Bansal Finance Short Term Loan — ₹4,000 to ₹1,00,000, instant approval, funds within 24 hours, transparent fixed rates and no service fees.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="Products"
        title={<>The Short Term Loan.</>}
        intro={product.blurb}
      />

      <SectionDivider />

      {/* Headline facts */}
      <Section texture="weave">
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Loan amount", `${product.amount.min} – ${product.amount.max}`],
            ["Tenure", `${product.tenure.min} – ${product.tenure.max}`],
            ["Interest rate", product.rate],
            ["Disbursal", product.disbursal],
          ].map(([k, v]) => (
            <StaggerItem key={k} className="flex flex-col gap-2 bg-canvas p-8">
              <span className="eyebrow text-ink-faint">{k}</span>
              <span className="font-display text-2xl leading-tight text-ink">{v}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider variant="accent" />

      {/* Features */}
      <Section texture="engrave">
        <SectionHeader
          index="01"
          kicker="What you get"
          title={<>Built around speed, flexibility and clarity.</>}
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((f) => (
            <StaggerItem
              key={f.title}
              className="group flex flex-col gap-3 bg-canvas p-8 transition-colors duration-300 hover:bg-canvas-3"
            >
              <span className="font-display text-xl text-ink">{f.title}</span>
              <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-14" />
              <p className="text-sm leading-relaxed text-ink-soft">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* Calculator */}
      <Section texture="grain">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            index="02"
            kicker="Estimate your loan"
            title={<>See what you&rsquo;ll repay, before you apply.</>}
            intro="Move the sliders to estimate the interest and total repayment on a Short Term Loan. Interest is simple daily interest on the principal — never compounded."
          />
          <Reveal delay={0.1}>
            <LoanCalculator />
          </Reveal>
        </div>
      </Section>

      <SectionDivider variant="accent" />

      {/* Eligibility */}
      <Section texture="laid">
        <SectionHeader
          index="03"
          kicker="Eligibility"
          title={<>Open to more borrowers, by design.</>}
          intro="No minimum income, and limited or poor credit history is welcome. A few basic criteria apply."
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {eligibility.map((e) => (
            <StaggerItem key={e.label} className="flex flex-col gap-2 bg-canvas p-8">
              <span className="eyebrow text-ink-faint">{e.label}</span>
              <span className="font-display text-xl leading-snug text-ink">
                {e.value}
              </span>
              {e.placeholder && (
                <span className="text-xs italic text-ink-faint">
                  Indicative — to be confirmed
                </span>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* Documents */}
      <Section texture="weave">
        <SectionHeader
          index="04"
          kicker="What you&rsquo;ll need"
          title={<>A short, paperless document checklist.</>}
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] sm:grid-cols-2">
          {documents.map((d, i) => (
            <StaggerItem
              key={d.title}
              className="flex items-start gap-5 bg-canvas p-8"
            >
              <span className="font-display text-2xl text-accent/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="font-display text-lg text-ink">{d.title}</span>
                <span className="text-sm leading-relaxed text-ink-soft">{d.body}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <p className="mt-6 text-xs italic text-ink-faint">
            Exact documents are confirmed during application and may vary by applicant.
          </p>
        </Reveal>
      </Section>

      <SectionDivider variant="accent" />

      {/* Process */}
      <Section texture="engrave">
        <SectionHeader
          index="05"
          kicker="Applying"
          title={<>From application to funds in three steps.</>}
        />
        <Stagger className="mt-16 grid gap-12 md:grid-cols-3">
          {process.map((p) => (
            <StaggerItem key={p.step} className="flex flex-col gap-4">
              <span className="font-display text-5xl text-accent/40">{p.step}</span>
              <h3 className="font-display text-2xl text-ink">{p.title}</h3>
              <p className="measure text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Key facts & charges (dark) */}
      <Section texture="dark">
        <SectionHeader
          index="06"
          kicker="The fine print"
          title={<>Key facts &amp; charges, disclosed in full.</>}
          intro="A Key Fact Statement summarises the loan's terms in the RBI-standardised format, alongside every charge that may apply. Nothing hidden, nothing in the footnotes."
          dark
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="eyebrow mb-5 text-accent-2">Key Fact Statement</p>
            <dl className="overflow-hidden rounded-2xl border border-[var(--color-line-dark)]">
              {kfs.map((row, i) => (
                <div
                  key={row.k}
                  className={`flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
                    i % 2 ? "bg-deep" : "bg-deep-2"
                  }`}
                >
                  <dt className="text-sm text-on-dark">{row.k}</dt>
                  <dd className="text-sm font-medium text-on-dark-soft sm:max-w-[60%] sm:text-right">
                    {row.v}
                    {"placeholder" in row && row.placeholder && (
                      <span className="ml-2 align-middle text-xs italic text-accent-2">
                        to confirm
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5 text-accent-2">Charges that may apply</p>
            <dl className="overflow-hidden rounded-2xl border border-[var(--color-line-dark)]">
              {productCharges.map((c, i) => (
                <div
                  key={c.item}
                  className={`flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
                    i % 2 ? "bg-deep" : "bg-deep-2"
                  }`}
                >
                  <dt className="text-sm text-on-dark">{c.item}</dt>
                  <dd className="text-sm font-medium text-on-dark-soft sm:text-right">
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-on-dark-soft">
              Rates vary by borrower based on credit scores, risk profiles and loan
              tenor. A 3-day cooling-off period allows exit with only principal and
              proportionate APR. All fees and charges are subject to applicable GST and
              government levies. The full interest-rate policy across products is
              published under{" "}
              <a
                href="/legal/interest-rate-policy"
                className="text-on-dark underline decoration-accent-2/50 underline-offset-2 hover:decoration-accent-2"
              >
                Interest Rate &amp; Charges Policy
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <SectionDivider />

      {/* FAQ */}
      <Section texture="ledger">
        <SectionHeader index="07" kicker="Questions" title={<>Good to know.</>} />
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {faqGroups.map((group) => (
            <Reveal key={group.heading}>
              <p className="eyebrow mb-5 text-ink-faint">{group.heading}</p>
              <Accordion items={[...group.items]} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="panel-dark">
        <div className="shell py-24 text-center lg:py-28">
          <Reveal>
            <h2 className="display-lg mx-auto max-w-[20ch] text-balance text-on-dark">
              Ready to apply? We&rsquo;re here to help.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex justify-center">
              <Button href="/contact" variant="light">
                Speak with our team
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
