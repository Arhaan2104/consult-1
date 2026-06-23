import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import { site, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AVA Finance Private Limited — an RBI-registered NBFC building a simple, reliable, technology-driven lending platform for individuals and businesses.",
};

const services = [
  {
    title: "Personal & business loans",
    body: "Offered at competitive interest rates, for individuals and businesses alike.",
  },
  {
    title: "Streamlined application",
    body: "Online applications with expedited approvals and reduced documentation.",
  },
  {
    title: "Transparent disclosure",
    body: "Upfront communication regarding all loan terms and conditions.",
  },
];

const registration = [
  ["Legal name", site.legalName],
  ["Consumer brand", site.consumerBrand],
  ["Registered as", "Non-Banking Financial Company (NBFC)"],
  ["RBI registration", site.rbiReg],
  ["CIN", site.cin],
  ["Incorporated", "3 March 2000, under the Companies Act, 1956"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title={<>A simpler, more reliable way to borrow.</>}
        intro="AVA Finance operates as a Non-Banking Financial Company registered with India's Reserve Bank, dedicated to making credit accessible, fast and clear."
      />

      <SectionDivider />

      {/* Mission */}
      <Section texture="dots">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader kicker="Our mission" title={<>Why we exist.</>} />
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
              &ldquo;{site.mission}&rdquo;
            </p>
            <p className="mt-8 measure-wide leading-relaxed text-ink-soft">
              We focus on accessibility through easy loan products, speed in the
              approval process, clarity in the financial terms we present, and a
              genuine dedication to customer satisfaction throughout your
              financial journey.
            </p>
          </Reveal>
        </div>
      </Section>

      <SectionDivider variant="node" />

      {/* Stats */}
      <Section texture="grid">
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="flex flex-col gap-2 rounded-3xl border border-line bg-canvas-2 p-8"
            >
              <span className="font-display text-4xl text-ink">{s.value}</span>
              <span className="eyebrow text-accent">{s.label}</span>
              <p className="text-sm text-ink-soft">{s.sub}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* Services */}
      <Section texture="hatch">
        <SectionHeader
          kicker="What we do"
          title={<>Built around three core services.</>}
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <StaggerItem
              key={s.title}
              className="flex flex-col gap-3 border border-line bg-canvas p-8 transition-colors duration-300 hover:border-ink/25 hover:bg-canvas-3"
            >
              <span className="h-1 w-10 rounded-none bg-accent" />
              <h3 className="font-display text-xl text-ink">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Registration (dark) */}
      <Section texture="dark">
        <SectionHeader
          kicker="On the record"
          title={<>Registration & corporate details.</>}
          dark
        />
        <Reveal className="mt-14">
          <dl className="grid gap-6 sm:grid-cols-2">
            {registration.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1.5 rounded-2xl border border-[var(--color-line-dark)] bg-deep-2/60 p-7"
              >
                <dt className="eyebrow text-on-dark-soft">{k}</dt>
                <dd className="text-lg text-on-dark">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section texture="grid">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="display-md max-w-[18ch] text-balance text-ink">
            Questions about borrowing with AVA?
          </h2>
          <Button href="/contact">Contact us</Button>
        </Reveal>
      </Section>
    </>
  );
}
