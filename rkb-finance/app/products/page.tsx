import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import LineIcon from "@/components/LineIcon";
import { Button } from "@/components/Button";
import LoanCalculator from "@/components/LoanCalculator";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/Section";
import {
  documents,
  eligibility,
  faqGroups,
  process,
  product,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The R.K. Bansal Finance Short Term Loan: ₹4,000 to ₹1,00,000, instant approval, funds within 24 hours, transparent fixed rates and no service fees.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="Products"
        title={<>The Short Term Loan.</>}
        intro={product.blurb}
      />

      {/* Headline facts — warm ivory band, the key numbers on crisp plates */}
      <Section texture="ivory-loud">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Loan amount", `${product.amount.min} – ${product.amount.max}`],
            ["Tenure", `${product.tenure.min} – ${product.tenure.max}`],
            ["Interest rate", product.rate],
            ["Disbursal", product.disbursal],
          ].map(([k, v]) => (
            <StaggerItem
              key={k}
              className="card-crisp flex flex-col gap-2 rounded-2xl p-6 sm:p-8"
            >
              <span className="eyebrow text-ink-faint">{k}</span>
              <span className="font-display text-2xl leading-tight text-ink">{v}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Features — warm gold band; minted icon seats on crisp plates */}
      <Section texture="gold-loud">
        <SectionHeader
          index="01"
          kicker="What you get"
          title={<>Built around clarity and flexibility.</>}
        />
        <Stagger className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((f) => (
            <StaggerItem
              key={f.title}
              className="card-crisp group flex flex-col gap-4 rounded-2xl p-6 sm:p-8"
            >
              <span className="icon-plate transition-transform duration-300 ease-[var(--ease-rkb)] group-hover:-translate-y-0.5">
                <LineIcon name={f.icon} className="w-6 text-gold" />
              </span>
              <span className="font-display text-xl text-ink">{f.title}</span>
              <p className="text-base leading-relaxed text-ink-soft">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Calculator — calm ivory band */}
      <Section texture="ivory-loud">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            index="02"
            kicker="Estimate your loan"
            title={<>See what you&rsquo;ll repay, before you apply.</>}
            intro="Move the sliders to estimate the interest and total repayment on a Short Term Loan. Interest is simple daily interest on the principal, never compounded."
          />
          <Reveal delay={0.1}>
            <LoanCalculator />
          </Reveal>
        </div>
      </Section>

      {/* Eligibility — warm gold band */}
      <Section id="eligibility" texture="gold-loud">
        <SectionHeader
          index="03"
          kicker="Eligibility"
          title={<>Open to more borrowers, by design.</>}
          intro="No minimum income, and limited or poor credit history is welcome. A few basic criteria apply."
        />
        <Stagger className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {eligibility.map((e) => (
            <StaggerItem
              key={e.label}
              className="card-crisp flex flex-col gap-2 rounded-2xl p-6 sm:p-8"
            >
              <span className="eyebrow text-ink-faint">{e.label}</span>
              <span className="font-display text-xl leading-snug text-ink">
                {e.value}
              </span>
              {e.placeholder && (
                <span className="text-xs italic text-ink-faint">
                  Indicative, to be confirmed
                </span>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Documents — warm ivory band */}
      <Section texture="ivory-loud">
        <SectionHeader
          index="04"
          kicker="What you&rsquo;ll need"
          title={<>A short, paperless document checklist.</>}
        />
        <Stagger className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2">
          {documents.map((d, i) => (
            <StaggerItem
              key={d.title}
              className="card-crisp flex items-start gap-5 rounded-2xl p-6 sm:p-8"
            >
              <span className="font-display text-2xl text-gold">
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

      {/* Process — gold numerals on the same cream paper as the rest of the page */}
      <Section texture="ivory-loud">
        <SectionHeader
          index="05"
          kicker="Applying"
          title={<>From application to funds in three steps.</>}
        />
        <Stagger className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3">
          {process.map((p) => (
            <StaggerItem key={p.step} className="flex flex-col gap-4">
              <span className="font-display text-5xl text-gold">{p.step}</span>
              <span className="h-px w-10 bg-[rgba(184,134,36,0.45)]" aria-hidden />
              <h3 className="font-display text-2xl text-ink">{p.title}</h3>
              <p className="measure text-base leading-relaxed text-ink-soft">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FAQ — warm ivory band */}
      <Section texture="ivory-loud">
        <SectionHeader index="06" kicker="FAQs" title={<>Frequently asked questions.</>} />
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
        <div className="shell py-24 text-center lg:py-32">
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
