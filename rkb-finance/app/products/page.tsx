import type { Metadata } from "next";
import Accordion, { type QA } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import { charges, interestTable, process, product } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The R.K. Bansal Finance Short Term Loan — ₹4,000 to ₹1,00,000, instant approval, funds within 24 hours, transparent fixed rates and no service fees.",
};

const faqs: QA[] = [
  {
    q: "How much can I borrow?",
    a: "The Short Term Loan ranges from ₹4,000 to ₹1,00,000, determined by your individual needs and approval.",
  },
  {
    q: "How quickly are funds disbursed?",
    a: "Once your application is approved by our automated system, funds are disbursed directly to your bank account within 24 hours.",
  },
  {
    q: "Are there any upfront or service fees?",
    a: "No. We do not charge service fees, and there are no pre-approval or closure penalties. We never charge any upfront fee before disbursing a loan.",
  },
  {
    q: "Can I repay in parts?",
    a: "Yes. You can make partial payments through the app or website. Partial payments settle outstanding interest first, then principal, then any applicable charges.",
  },
  {
    q: "Can I apply with a limited credit history?",
    a: "Yes. The Short Term Loan has no income threshold and is accessible to applicants with limited or poor credit history.",
  },
];

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
            ["Interest rate", product.rate],
            ["Disbursal", product.disbursal],
            ["Interest type", "Fixed · no compounding"],
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

      {/* Process */}
      <Section texture="laid">
        <SectionHeader
          index="02"
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

      {/* Rates & charges (dark) */}
      <Section texture="dark">
        <SectionHeader
          index="03"
          kicker="Rates & charges"
          title={<>Disclosed in full, upfront.</>}
          intro="Interest rates across our products, and the charges that may apply. All loans currently carry fixed interest rates."
          dark
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5 text-accent-2">Interest rates by product</p>
            <dl className="overflow-hidden rounded-2xl border border-[var(--color-line-dark)]">
              {interestTable.map((r, i) => (
                <div
                  key={r.product}
                  className={`flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
                    i % 2 ? "bg-deep" : "bg-deep-2"
                  }`}
                >
                  <dt className="text-sm text-on-dark">{r.product}</dt>
                  <dd className="text-sm font-medium text-on-dark-soft sm:text-right">
                    {r.rate}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5 text-accent-2">Fees & penal charges</p>
            <dl className="overflow-hidden rounded-2xl border border-[var(--color-line-dark)]">
              {charges.map((c, i) => (
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
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-on-dark-soft">
            Rates vary by borrower based on credit scores, risk profiles and loan
            tenor. A 3-day cooling-off period allows exit with only principal and
            proportionate APR. All fees and charges are subject to applicable GST
            and government levies.
          </p>
        </Reveal>
      </Section>

      <SectionDivider />

      {/* FAQ */}
      <Section texture="ledger">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader index="04" kicker="Questions" title={<>Good to know.</>} />
          <Reveal delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
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
