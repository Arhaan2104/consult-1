import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/content/site";

/** Key policies surfaced in the footer — full set lives on /regulatory-disclosures.
    Includes the official RBI complaint channels (external links open in a new tab). */
const footerPolicies = [
  { title: "Regulatory Disclosures", href: "/regulatory-disclosures" },
  { title: "Privacy Policy", href: "/legal/privacy-policy" },
  { title: "Terms & Conditions", href: "/legal/terms-conditions" },
  { title: "Fair Practice Code", href: "/legal/fair-practice-code" },
  { title: "Interest Rate & Charges Policy", href: "/legal/interest-rate-policy" },
  { title: "Grievance Redressal", href: "/legal/grievance-redressal" },
  { title: "Grievance Escalation Matrix", href: "/legal/grievance-escalation-matrix" },
  { title: "RBI Integrated Ombudsman Scheme", href: "/legal/rbi-ombudsman-scheme" },
  { title: "Sachet Portal (RBI)", href: "https://sachet.rbi.org.in/" },
  { title: "RBI CMS Portal", href: "https://cms.rbi.org.in/" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="panel-dark cv-auto text-on-dark">
      <div className="shell pt-20 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-14">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="R.K. Bansal Finance, home" className="w-fit">
              {/* Pre-struck ivory logo — see SiteHeader: the CSS-filter version
                  exposed JPEG-artifact smudges from the source PNG's alpha. */}
              <Image
                src="/logo-ivory.png"
                alt="R.K. Bansal Finance Pvt. Ltd."
                width={190}
                height={45}
                style={{ width: "auto" }}
                className="h-10 opacity-95 transition-opacity duration-300 hover:opacity-75"
              />
            </Link>
            <p className="measure text-base leading-relaxed text-on-dark-soft">
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
                  className="py-1 text-sm uppercase tracking-widest text-on-dark-soft transition-colors hover:text-gold-bright"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-on-dark-soft">Explore</p>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/" className="link-underline w-fit py-1 text-on-dark transition-colors hover:text-gold-bright">
                Home
              </Link>
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="link-underline w-fit py-1 text-on-dark transition-colors hover:text-gold-bright"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Policies & Regulatory Disclosures — incl. RBI complaint channels */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-on-dark-soft">Policies</p>
            <nav className="flex flex-col gap-3 text-base">
              {footerPolicies.map((p) =>
                p.href.startsWith("http") ? (
                  <a
                    key={p.href}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline w-fit py-1 text-on-dark transition-colors hover:text-gold-bright"
                  >
                    {p.title} ↗
                  </a>
                ) : (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="link-underline w-fit py-1 text-on-dark transition-colors hover:text-gold-bright"
                  >
                    {p.title}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-on-dark-soft">Connect With Us</p>
            <address className="flex flex-col gap-3 text-base not-italic text-on-dark">
              <span className="text-on-dark-soft">{site.contact.address}</span>
              {site.contact.phones.slice(0, 2).map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="w-fit py-1 hover:text-gold-bright">
                  {p}
                </a>
              ))}
              <a href={`mailto:${site.contact.email}`} className="w-fit py-1 hover:text-gold-bright">
                {site.contact.email}
              </a>
            </address>
          </div>
        </div>

        <hr className="my-10 h-px border-0 bg-[var(--color-line-dark)]" />

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-on-dark-soft lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl">
            {site.legalName} · RBI Registration {site.rbiReg} · CIN {site.cin}.
            {" "}We do not charge any upfront fees against our loans. Beware of
            impersonators: only legitimate correspondence comes through{" "}
            {site.contact.email}.
          </p>
          <p className="shrink-0">© {year} {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
