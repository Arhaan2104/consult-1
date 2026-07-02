import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import { site, timeline } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "R.K. Bansal Finance Private Limited — an RBI-registered NBFC incorporated in 1984, building a simple, affordable and fully digital lending platform.",
};

const values = [
  {
    title: "Innovation",
    body: "Incorporating modern solutions into every step of credit procurement.",
  },
  {
    title: "Digitisation",
    body: "Full-stack digital solutions for the entire personal-loan process, removing traditional delays.",
  },
  {
    title: "Accessibility",
    body: "Loans made available without unnecessary financial burden from excessive interest charges.",
  },
  {
    title: "Customer focus",
    body: "Quick access to funds, in a straightforward and transparent manner.",
  },
];

const registration = [
  ["Legal name", site.legalName],
  ["Registered as", "Non-Banking Financial Company (NBFC)"],
  ["RBI registration", site.rbiReg],
  ["CIN", site.cin],
  ["Incorporated", "21 November 1984, under the Companies Act, 1956"],
  ["Headquarters", "Karol Bagh, New Delhi"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title={<>A lending institution, modernised.</>}
        intro="R.K. Bansal Finance has digitised the personal-loan process to remove extensive physical interactions and the long waiting periods traditionally associated with banking — while keeping the trust of a four-decade-old institution."
      />

      <SectionDivider />

      {/* Mission */}
      <Section texture="weave">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader index="01" kicker="Our mission" title={<>Why we exist.</>} />
          <Reveal delay={0.1}>
            <p
              className="font-display text-2xl leading-snug text-ink sm:text-3xl"
              style={{ hangingPunctuation: "first last", textIndent: "-0.45em" }}
            >
              &ldquo;{site.mission}&rdquo;
            </p>
            <p className="mt-8 measure-wide leading-relaxed text-ink-soft">
              We specialise in personal credit products for salaried
              professionals, with affordable interest rates supported by a
              minimal-risk profile. Streamlining access to funds through digital
              innovation is at the heart of everything we do.
            </p>
          </Reveal>
        </div>
      </Section>

      <SectionDivider variant="accent" />

      {/* Values */}
      <Section texture="engrave">
        <SectionHeader
          index="02"
          kicker="What guides us"
          title={<>Four principles, applied consistently.</>}
        />
        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--color-line)] sm:mt-16 sm:grid-cols-2">
          {values.map((v) => (
            <StaggerItem key={v.title} className="card-cell flex flex-col gap-3 bg-canvas p-6 sm:p-10">
              <span className="font-display text-2xl text-ink">{v.title}</span>
              <span className="h-px w-8 bg-accent/50" />
              <p className="text-base leading-relaxed text-ink-soft">{v.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* Timeline */}
      <Section texture="ledger">
        <SectionHeader
          index="03"
          kicker="Our story"
          title={<>Forty years, in three chapters.</>}
        />
        <Stagger className="mt-12 grid gap-12 sm:mt-16 md:grid-cols-3">
          {timeline.map((t) => (
            <StaggerItem key={t.title} className="flex flex-col gap-4 border-t border-line-strong pt-6">
              <span className="font-display text-3xl text-accent">{t.year}</span>
              <h3 className="font-display text-xl text-ink">{t.title}</h3>
              <p className="text-base leading-relaxed text-ink-soft">{t.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Registration (dark) */}
      <Section texture="dark">
        <SectionHeader
          index="04"
          kicker="On the record"
          title={<>Registration & corporate details.</>}
          dark
        />
        <Reveal className="mt-14">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line-dark)] bg-[var(--color-line-dark)] sm:grid-cols-2">
            {registration.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1.5 bg-deep p-7">
                <dt className="eyebrow text-on-dark-soft">{k}</dt>
                <dd className="text-lg text-on-dark">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section texture="laid">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="display-md max-w-[18ch] text-balance text-ink">
            Have a question for our team?
          </h2>
          <Button href="/contact">Contact us</Button>
        </Reveal>
      </Section>
    </>
  );
}
