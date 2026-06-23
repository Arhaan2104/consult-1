import type { Metadata } from "next";
import Accordion, { type QA } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import { documents, interestTable, process, product } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The AVA Finance Short Term Loan — ₹4,000 to ₹1,00,000, instant approval, 30-minute processing, transparent rates and flexible repayment.",
};

const uses = [
  "Marriage",
  "Home renovation",
  "Travel",
  "Education",
  "Medical expenses",
  "Relocating",
  "Electronics & appliances",
];

const faqs: QA[] = [
  {
    q: "How much can I borrow?",
    a: "The Short Term Loan ranges from ₹4,000 to ₹1,00,000, with the amount based on your individual requirements and approval.",
  },
  {
    q: "How fast is it?",
    a: "Applications are approved right away and loan processing happens within 30 minutes, with funds disbursed directly to your bank account.",
  },
  {
    q: "What do I need to apply?",
    a: "Just your Aadhaar card, PAN card and a bank statement. KYC is completed digitally using your PAN and Aadhaar.",
  },
  {
    q: "Are there hidden charges?",
    a: "No. We don't charge service fees, and there are no pre-approval or closure fees. Interest, fees and your repayment schedule are shared upfront.",
  },
  {
    q: "Can I repay in parts?",
    a: "Yes. You can make partial payments — these cover interest first, then principal, then any additional charges.",
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
      <Section texture="dots">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Loan amount", `${product.amount.min} – ${product.amount.max}`],
            ["Interest rate", product.rate],
            ["Processing", "Within 30 minutes"],
            ["Disbursal", "Direct to bank, 24 hrs"],
          ].map(([k, v]) => (
            <StaggerItem
              key={k}
              className="flex flex-col gap-2 rounded-2xl border border-line bg-canvas p-7"
            >
              <span className="eyebrow text-ink-faint">{k}</span>
              <span className="font-display text-2xl leading-tight text-ink">{v}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider variant="node" />

      {/* Features */}
      <Section texture="panel">
        <SectionHeader
          kicker="What you get"
          title={<>Designed for speed, flexibility and clarity.</>}
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((f) => (
            <StaggerItem
              key={f.title}
              className="flex flex-col gap-3 border border-line bg-canvas p-7 transition-colors duration-300 hover:border-ink/25 hover:bg-canvas-3"
            >
              <span className="font-display text-lg text-ink">{f.title}</span>
              <p className="text-sm leading-relaxed text-ink-soft">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* Process + documents */}
      <Section texture="plain">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            kicker="Applying"
            title={<>From phone to funds in three steps.</>}
            intro="All you need to begin:"
          />
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-wrap gap-3">
              {documents.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-2 rounded-none border border-line bg-canvas-2 px-4 py-2 text-sm font-medium text-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-none bg-accent" />
                  {d}
                </span>
              ))}
            </Reveal>
            <Stagger className="flex flex-col gap-4">
              {process.map((p) => (
                <StaggerItem
                  key={p.step}
                  className="flex items-start gap-5 rounded-2xl border border-line bg-canvas-2 p-6"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent font-display text-sm font-semibold text-white">
                    {p.step}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-lg text-ink">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <SectionDivider variant="node" />

      {/* Uses */}
      <Section texture="dots">
        <SectionHeader
          kicker="What it's for"
          title={<>Funds for life&rsquo;s moments.</>}
        />
        <Stagger className="mt-12 flex flex-wrap gap-3">
          {uses.map((u) => (
            <StaggerItem
              key={u}
              className="rounded-none border border-line bg-canvas px-5 py-2.5 font-display text-base text-ink"
            >
              {u}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Rates (dark) */}
      <Section texture="dark">
        <SectionHeader
          kicker="Rates & charges"
          title={<>Disclosed in full, upfront.</>}
          intro="Interest rates across our products, aligned with the RBI's Scale-Based Regulation. Rates vary by borrower profile."
          dark
        />
        <Reveal className="mt-12">
          <dl className="overflow-hidden rounded-3xl border border-[var(--color-line-dark)]">
            {interestTable.map((r, i) => (
              <div
                key={r.product}
                className={`flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:justify-between ${
                  i % 2 ? "bg-deep" : "bg-deep-2/60"
                }`}
              >
                <dt className="text-base text-on-dark">{r.product}</dt>
                <dd className="font-display text-base text-accent-2">{r.rate}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-on-dark-soft">
            All rates and the APR are disclosed via the Key Fact Statement (KFS)
            and the loan agreement. Charges may include processing, documentation,
            prepayment/foreclosure and penal charges, subject to applicable taxes.
          </p>
        </Reveal>
      </Section>

      <SectionDivider />

      {/* FAQ */}
      <Section texture="plain">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader kicker="Questions" title={<>Good to know.</>} />
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
              Ready when you are.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex justify-center">
              <Button href="/contact" variant="light">
                Apply now
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
