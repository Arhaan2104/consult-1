"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/Button";
import { nav, site } from "@/content/site";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-2.5 z-50 sm:top-4">
      <div className="shell">
        {/* Floating frosted-glass pill */}
        <nav
          className={`flex h-14 items-center justify-between gap-3 rounded-full border pl-5 pr-2.5 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 ease-[var(--ease-rkb)] ${
            scrolled
              ? "border-line bg-canvas/85 shadow-[0_14px_36px_-14px_rgba(11,36,71,0.42)]"
              : "border-line/70 bg-canvas/60 shadow-[0_8px_26px_-16px_rgba(11,36,71,0.30)]"
          }`}
        >
          <Link
            href="/"
            aria-label="R.K. Bansal Finance — home"
            className="group relative z-50 flex items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/R.K.-BANSAL.png"
              alt="R.K. Bansal Finance Pvt. Ltd."
              width={152}
              height={36}
              priority
              style={{ width: "auto" }}
              className="h-8 opacity-100 transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop: pill nav items + action */}
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm tracking-tight transition-colors duration-300 ${
                    active
                      ? "bg-ink/[0.07] text-ink"
                      : "text-ink-soft hover:bg-ink/[0.05] hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span className="mx-1.5 h-5 w-px bg-line-strong" aria-hidden />

            <Link href="/contact" className={buttonClasses("primary", "px-4 py-2")}>
              Apply now
              <span
                aria-hidden
                className="text-accent-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 -mr-1 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-ink transition-all duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-all duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile sheet — note: do NOT add a tx-* texture class here; those set
          position:relative and would override `fixed`, breaking the overlay. */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-canvas transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col justify-center gap-2 pt-16">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-accent"
          >
            Apply now
          </Link>
          <p className="eyebrow mt-10 text-ink-faint">
            {site.contact.phones[0]}
          </p>
        </div>
      </div>
    </header>
  );
}
