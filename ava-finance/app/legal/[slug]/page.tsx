import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/Motion";
import { SectionDivider } from "@/components/Section";
import { getLegalDoc, legalDocs } from "@/content/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Not found" };
  return { title: doc.title, description: doc.summary };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      {/* Header */}
      <section className="relative hero-ava">
        <div className="rails" aria-hidden />
        <div className="relative z-10 shell pt-40 pb-14 sm:pt-44 lg:pt-48">
          <Reveal>
            <Link
              href="/"
              className="eyebrow text-ink-faint transition-colors hover:text-accent"
            >
              ← Home
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-lg mt-6 max-w-[20ch] text-balance text-ink">
              {doc.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 measure-wide leading-relaxed text-ink-soft">
              {doc.summary}
            </p>
            {doc.updated && (
              <p className="eyebrow mt-5 text-ink-faint">Last updated · {doc.updated}</p>
            )}
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* Body */}
      <section className="bg-canvas-2">
        <div className="shell grid gap-14 py-20 lg:grid-cols-[0.32fr_0.68fr] lg:py-28">
          {/* TOC */}
          <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4 text-ink-faint">On this page</p>
            <nav className="flex flex-col gap-2.5 border-l border-line pl-4">
              {doc.sections.map((s, i) =>
                s.heading ? (
                  <a
                    key={i}
                    href={`#s-${i}`}
                    className="text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.heading}
                  </a>
                ) : null
              )}
            </nav>
          </aside>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {doc.sections.map((s, i) => (
              <Reveal key={i} id={`s-${i}`} className="scroll-mt-28">
                {s.heading && (
                  <h2 className="font-display text-2xl text-ink sm:text-3xl">
                    {s.heading}
                  </h2>
                )}
                <div className="mt-4 flex flex-col gap-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="measure-wide leading-relaxed text-ink-soft">
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-1 flex flex-col gap-2.5">
                      {s.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-3 measure-wide leading-relaxed text-ink-soft"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-none bg-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}

            <p className="mt-4 border-t border-line pt-6 text-xs leading-relaxed text-ink-faint">
              This page reproduces policy information published by AVA Finance
              Private Limited. For the most current version, please contact us at{" "}
              <a href="mailto:info@kamakshimoney.com" className="text-accent">
                info@kamakshimoney.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
