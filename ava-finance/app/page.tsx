import { Button } from "@/components/Button";
import Icon from "@/components/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import Marquee from "@/components/Marquee";
import { Section, SectionDivider, SectionHeader } from "@/components/Section";
import {
  advantages,
  cities,
  documents,
  pillars,
  process,
  product,
  site,
  stats,
  testimonials,
} from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative hero-ava overflow-hidden">
        <div className="rails" aria-hidden />
        <div className="relative z-10 shell pt-32 pb-16 sm:pt-44 lg:pt-52 lg:pb-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-none border border-line bg-canvas/60 px-3.5 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-none bg-accent" />
              <span className="eyebrow text-ink-soft">
                RBI-Registered NBFC · Since {site.since}
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl mt-7 max-w-[18ch] text-balance text-ink">
              Achieve your goals with{" "}
              <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-[0.16em]">
                tailored
              </span>
              ,{" "}
              <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-[0.16em]">
                smart
              </span>
              ,{" "}
              <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-[0.16em]">
                fast
              </span>{" "}
              financing.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 measure-wide text-lg leading-relaxed text-ink-soft">
              A technology-driven platform dedicated to simplifying the lending
              process — instant access to funds, transparent terms, and a
              genuinely seamless experience.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/contact" className="w-full justify-center sm:w-auto">
                Apply now
              </Button>
              <Button
                href="/products"
                variant="ghost"
                arrow={false}
                className="w-full justify-center sm:w-auto"
              >
                How it works
              </Button>
            </div>
          </Reveal>

          {/* Stat ribbon */}
          <Reveal delay={0.3} className="mt-16 lg:mt-20">
            <div className="grid overflow-hidden border border-line bg-canvas sm:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-1.5 p-7 ${
                    i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""
                  }`}
                >
                  <span className="font-display text-3xl text-ink sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="eyebrow text-accent">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* ───────────────────────── Pillars ───────────────────────── */}
      <Section texture="cross">
        <SectionHeader
          kicker="Why AVA"
          title={<>Three things we never compromise on.</>}
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <StaggerItem
              key={p.title}
              className="group flex flex-col gap-4 border border-line bg-canvas-2 p-8 transition-colors duration-300 hover:border-ink/25 hover:bg-canvas-3"
            >
              <span className="grid h-11 w-11 place-items-center bg-accent/10 text-accent">
                <Icon name={p.icon} />
              </span>
              <h3 className="font-display text-xl text-ink">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider variant="node" />

      {/* ───────────────────────── Product ───────────────────────── */}
      <Section texture="dots">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeader
            kicker="The Product"
            title={<>One loan, built for speed.</>}
            intro={product.blurb}
          />
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-canvas p-8 shadow-[0_30px_60px_-40px_rgba(11,16,32,0.4)] sm:p-10">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-ink-faint">{product.name}</span>
                <span className="rounded-none bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  30-min processing
                </span>
              </div>
              <p className="mt-6 font-display text-4xl text-ink sm:text-5xl">
                {product.amount.min}
                <span className="text-ink-faint"> – </span>
                {product.amount.max}
              </p>
              <p className="mt-1 text-sm text-ink-soft">Loan amount range</p>
              <dl className="mt-8 flex flex-col gap-4">
                {[
                  ["Interest rate", product.rate],
                  ["Disbursal", product.disbursal],
                  ["Interest", "No compounding"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-6 border-t border-line pt-4"
                  >
                    <dt className="text-sm text-ink-soft">{k}</dt>
                    <dd className="text-right text-sm font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Button href="/products" className="w-full justify-center">
                  See full details
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <SectionDivider />

      {/* ───────────────────────── Advantages ───────────────────────── */}
      <Section texture="hatch">
        <SectionHeader
          kicker="What you get"
          title={<>The benefits, with none of the friction.</>}
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <StaggerItem
              key={a.title}
              className="flex flex-col gap-4 border border-line bg-canvas p-7 transition-colors duration-300 hover:border-ink/25 hover:bg-canvas-3"
            >
              <span className="grid h-10 w-10 place-items-center bg-accent/10 text-accent">
                <Icon name={a.icon} />
              </span>
              <span className="font-display text-lg text-ink">{a.title}</span>
              <p className="text-sm leading-relaxed text-ink-soft">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider variant="node" />

      {/* ───────────────────────── Process ───────────────────────── */}
      <Section texture="grid">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            kicker="How it works"
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

      {/* ───────────────────────── Testimonials (dark) ───────────────────────── */}
      <Section texture="dark">
        <SectionHeader
          kicker="In their words"
          title={<>Loved by borrowers across India.</>}
          dark
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem
              key={t.name}
              className="flex flex-col gap-6 border border-[var(--color-line-dark)] bg-deep-2 p-8"
            >
              <p className="text-base leading-relaxed text-on-dark">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-none bg-accent/20 text-sm font-semibold text-accent-2">
                  {t.name[0]}
                </span>
                <span className="text-sm text-on-dark-soft">
                  {t.name} · {t.place}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <SectionDivider />

      {/* ───────────────────────── Cities + compliance ───────────────────────── */}
      <Section texture="grid">
        <Reveal>
          <p className="eyebrow mb-6 text-ink-faint">Available across India</p>
          <Marquee>
            {cities.map((c) => (
              <span
                key={c}
                className="rounded-none border border-line bg-canvas px-5 py-2.5 font-display text-base text-ink"
              >
                {c}
              </span>
            ))}
          </Marquee>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            ["RBI-registered NBFC", `Registration ${site.rbiReg}, covered by the RBI Integrated Ombudsman Scheme.`],
            ["No upfront fees", "We never ask for prepayment before disbursement. Stay alert to impersonators."],
            ["Transparent terms", "Rates, fees and your schedule shared upfront, via a Key Fact Statement."],
          ].map(([t, d]) => (
            <Reveal key={t} className="flex flex-col gap-2 rounded-2xl border border-line bg-canvas p-7">
              <span className="font-display text-lg text-ink">{t}</span>
              <p className="text-sm leading-relaxed text-ink-soft">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────────────────── Final CTA ───────────────────────── */}
      <section className="panel-dark">
        <div className="shell py-24 text-center lg:py-32">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-none border border-[var(--color-line-dark)] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-none bg-accent-2" />
              <span className="eyebrow text-on-dark-soft">Ready in minutes</span>
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-lg mx-auto mt-6 max-w-[20ch] text-balance text-on-dark">
              Your next goal is one application away.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="light">
                Apply now
              </Button>
              <Button
                href="/products"
                variant="ghost"
                arrow={false}
                className="border-[var(--color-line-dark)] text-on-dark hover:border-accent-2 hover:text-accent-2"
              >
                Explore the product
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
