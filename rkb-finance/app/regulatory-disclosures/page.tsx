import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionDivider } from "@/components/Section";
import { disclosureGroups, disclosuresOnRequest } from "@/content/legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Regulatory Disclosures",
  description:
    "Statutory codes, policies and grievance-redressal disclosures published by R.K. Bansal Finance Private Limited, an RBI-registered NBFC.",
};

export default function RegulatoryDisclosuresPage() {
  return (
    <>
      <PageHero
        kicker="Compliance"
        title="Regulatory Disclosures"
        intro="The codes, policies and grievance-redressal disclosures we maintain as a Non-Banking Financial Company registered with the Reserve Bank of India."
      />

      <SectionDivider />

      <Section texture="weave">
        <div className="flex flex-col gap-16">
          {disclosureGroups.map((group, gi) => (
            <Reveal key={group.heading} delay={gi * 0.04}>
              <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
                <h2 className="font-display text-2xl text-ink sm:text-3xl">
                  {group.heading}
                </h2>
                <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-[var(--color-line)] sm:grid-cols-2">
                  {group.items.map((item) => (
                    <StaggerItem key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-full items-center justify-between gap-4 bg-canvas px-6 py-5 transition-colors hover:bg-canvas-2"
                        >
                          <span className="leading-snug text-ink">{item.label}</span>
                          <span className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="group flex h-full items-center justify-between gap-4 bg-canvas px-6 py-5 transition-colors hover:bg-canvas-2"
                        >
                          <span className="leading-snug text-ink">{item.label}</span>
                          <span className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5">
                            →
                          </span>
                        </Link>
                      )}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}

          {/* Disclosures available on request — listed honestly, not fabricated */}
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Available on request
              </h2>
              <div className="flex flex-col gap-5">
                <p className="measure-wide leading-relaxed text-ink-soft">
                  The following statutory disclosures are not currently published
                  online. They may be obtained from our Grievance Redressal Officer,{" "}
                  {site.grievance.officer}, at{" "}
                  <a
                    href={`mailto:${site.grievance.email}`}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {site.grievance.email}
                  </a>
                  {" "}or {site.grievance.phone}.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {disclosuresOnRequest.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 measure-wide leading-relaxed text-ink-soft"
                    >
                      <span className="mint-mark mt-2 h-1.5 w-1.5 shrink-0" aria-hidden />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <p className="border-t border-line pt-6 text-xs leading-relaxed text-ink-faint">
            This page consolidates regulatory disclosures published by{" "}
            {site.legalName} (RBI Registration {site.rbiReg} · CIN {site.cin}).
            Each linked policy reproduces information published at rkbfinance.in.
          </p>
        </div>
      </Section>
    </>
  );
}
