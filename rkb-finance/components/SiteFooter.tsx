import Link from "next/link";
import { legalNav } from "@/content/legal";
import { nav, site } from "@/content/site";

export default function SiteFooter() {
  const year = 2026;
  const half = Math.ceil(legalNav.length / 2);
  const legalCols = [legalNav.slice(0, half), legalNav.slice(half)];

  return (
    <footer className="panel-dark text-on-dark">
      <div className="shell pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="font-display text-2xl text-on-dark">
              R.K. Bansal<span className="text-accent-2">.</span>
            </Link>
            <p className="measure text-sm leading-relaxed text-on-dark-soft">
              {site.tagline}. A Non-Banking Financial Company registered with the
              Reserve Bank of India since {site.since}.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-on-dark-soft transition-colors hover:text-accent-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-on-dark-soft">Explore</p>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/" className="text-on-dark transition-colors hover:text-accent-2">
                Home
              </Link>
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-on-dark transition-colors hover:text-accent-2"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal — two columns merged on small screens */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <p className="eyebrow text-on-dark-soft">Policies</p>
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {legalCols[0].map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="text-on-dark transition-colors hover:text-accent-2"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-on-dark-soft">Contact</p>
            <address className="flex flex-col gap-3 text-sm not-italic text-on-dark">
              <span className="text-on-dark-soft">{site.contact.address}</span>
              {site.contact.phones.slice(0, 2).map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-accent-2">
                  {p}
                </a>
              ))}
              <a href={`mailto:${site.contact.email}`} className="hover:text-accent-2">
                {site.contact.email}
              </a>
            </address>
            <div className="mt-2 flex flex-col gap-3 text-sm">
              {legalCols[1].map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="text-on-dark-soft transition-colors hover:text-accent-2"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-10 h-px border-0 bg-[var(--color-line-dark)]" />

        <div className="flex flex-col gap-6 text-xs leading-relaxed text-on-dark-soft lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl">
            {site.legalName} · RBI Registration {site.rbiReg} · CIN {site.cin}.
            {" "}We do not charge any upfront fees against our loans. Beware of
            impersonators — only legitimate correspondence comes through{" "}
            {site.contact.email}.
          </p>
          <p className="shrink-0">© {year} {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
