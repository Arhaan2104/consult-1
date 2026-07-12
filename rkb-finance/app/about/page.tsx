import type { Metadata } from "next";
import { Button } from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import { EngraveRule } from "@/components/Kicker";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { InstitutionMark } from "@/components/SectionArt";
import { Section, SectionHeader } from "@/components/Section";
import { site, timeline } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "R.K. Bansal Finance Private Limited, an RBI-registered NBFC incorporated in 1984, building a simple, affordable and fully digital lending platform.",
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

/** Grounded institutional credentials — anchor the mission, balance the column. */
const missionFacts = [
  { value: "Since 1984", label: "Four decades" },
  { value: "RBI-registered", label: "NBFC" },
  { value: "Fully digital", label: "End-to-end" },
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
        intro="R.K. Bansal Finance has digitised the personal-loan process to remove extensive physical interactions and the long waiting periods traditionally associated with banking, while keeping the trust of a four-decade-old institution."
      />

      {/* Mission — warm ivory band */}
      <Section texture="ivory-loud">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="flex flex-col gap-10">
            <SectionHeader
              index="01"
              kicker="Our mission"
              title={<>Making access to credit simple.</>}
            />
            <Reveal delay={0.2} className="hidden lg:block">
              <InstitutionMark className="w-full max-w-md text-accent" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex flex-col gap-8">
            {/* Opening quote hangs in the margin (zero layout width) so the
                first line stays flush with the wrapped lines below it. */}
            <p className="relative font-display text-2xl leading-snug text-ink sm:text-3xl">
              <span aria-hidden className="absolute -translate-x-full select-none">
                &ldquo;
              </span>
              {site.mission}&rdquo;
            </p>
            <p className="measure-wide leading-relaxed text-ink-soft">
              We believe borrowing should be quick, transparent and
              hassle-free. Our fully digital application process, minimal
              documentation and streamlined verification help eligible customers
              apply with ease and receive quick lending decisions through a
              secure and seamless experience.
            </p>
            <dl className="mt-1 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {missionFacts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <dt className="font-display text-xl leading-none text-ink sm:text-2xl">
                    {f.value}
                  </dt>
                  <dd className="eyebrow text-ink-faint">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Values — warm gold band, crisp plates */}
      <Section texture="gold-loud">
        <SectionHeader
          index="02"
          kicker="What guides us"
          title={<>Four principles, applied consistently.</>}
        />
        <Stagger className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2">
          {values.map((v, i) => (
            <StaggerItem key={v.title} className="h-full">
              <FeatureCard
                index={String(i + 1).padStart(2, "0")}
                title={v.title}
                body={v.body}
                titleClassName="text-2xl"
                className="sm:p-9"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Timeline — warm ivory band, crisp chapters */}
      <Section texture="ivory-loud">
        <SectionHeader
          index="03"
          kicker="Our story"
          title={<>Forty years, in three chapters.</>}
        />
        <Stagger className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
          {timeline.map((t) => (
            <StaggerItem key={t.title} className="h-full">
              <FeatureCard index={t.year} title={t.title} body={t.body} />
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

      {/* CTA — warm gold band. Centered ceremonial close, same grammar as the
          home and products closers: kicker set between symmetric hairlines
          like a certificate ornament, heading on the centre axis, one CTA. */}
      <Section texture="gold-loud">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-3 text-gold">
              <EngraveRule origin="right" />
              Get in touch
              <EngraveRule origin="left" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-lg mx-auto mt-5 max-w-[20ch] text-balance text-ink">
              Have a question for our team?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex justify-center">
              <Button
                href="/contact"
                magnetic
                size="px-8 py-4"
                className="w-full justify-center sm:w-auto"
              >
                Contact us
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
