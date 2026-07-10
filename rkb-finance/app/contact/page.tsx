import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { Section, SectionDivider } from "@/components/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach R.K. Bansal Finance in Karol Bagh, New Delhi. Phone, email, business hours, social channels and our Grievance Redressal Officer.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact Us"
        title={<>We&rsquo;d be glad to help.</>}
        intro="Reach our team during business hours, or send a message and we'll get back to you."
      />

      <SectionDivider />

      <Section texture="weave">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow text-accent">Office</span>
              <p className="font-display text-xl leading-snug text-ink">
                {site.contact.address}
              </p>
              <p className="text-sm text-ink-soft">{site.contact.hours}</p>
            </Reveal>

            <Reveal delay={0.06} className="flex flex-col gap-3">
              <span className="eyebrow text-accent">Phone</span>
              <div className="flex flex-col gap-1.5">
                {site.contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="text-lg text-ink transition-colors hover:text-accent"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="flex flex-col gap-3">
              <span className="eyebrow text-accent">Email</span>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-lg text-ink transition-colors hover:text-accent"
              >
                {site.contact.email}
              </a>
            </Reveal>

            <Reveal delay={0.18} className="flex flex-col gap-3">
              <span className="eyebrow text-accent">Follow</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line-strong bg-canvas p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <SectionDivider variant="accent" />

      {/* Grievance */}
      <Section texture="engrave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow text-accent">Grievance redressal</span>
            <h2 className="display-md text-ink">A clear path to resolution.</h2>
            <p className="measure leading-relaxed text-ink-soft">
              If something isn&rsquo;t right, our Grievance Redressal Officer is
              here to help. Unresolved complaints after one month may be escalated
              to the RBI&rsquo;s Department of Non-Banking Supervision.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-canvas-3 p-6 sm:p-8">
              <p className="eyebrow text-ink-faint">{site.grievance.title}</p>
              <p className="mt-3 font-display text-2xl text-ink">
                {site.grievance.officer}
              </p>
              <dl className="mt-6 flex flex-col gap-4 text-sm">
                <div className="flex flex-col gap-1 border-t border-line pt-4 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-ink-soft">Phone</dt>
                  <dd className="text-ink">{site.grievance.phone}</dd>
                </div>
                <div className="flex flex-col gap-1 border-t border-line pt-4 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-ink-soft">Email</dt>
                  <dd className="break-words text-ink sm:text-right">
                    {site.grievance.email}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-t border-line pt-4 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-ink-soft">Address</dt>
                  <dd className="text-ink sm:max-w-[18ch] sm:text-right">
                    {site.grievance.address}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
