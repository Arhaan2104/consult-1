"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-md shadow-[0_1px_0_rgba(17,47,91,0.06),0_8px_24px_-16px_rgba(11,36,71,0.25)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-rkb)] ${
          scrolled ? "h-16" : "h-[4.5rem]"
        }`}
      >
        <Link
          href="/"
          aria-label="R.K. Bansal Finance — home"
          className="relative z-50 flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/R.K.-BANSAL.png"
            alt="R.K. Bansal Finance Pvt. Ltd."
            width={152}
            height={36}
            priority
            className={`h-8 w-auto origin-left transition-transform duration-500 ease-[var(--ease-rkb)] sm:h-9 ${
              scrolled ? "scale-[0.9]" : "scale-100"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-sm transition-colors ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas shadow-[0_1px_2px_rgba(11,36,71,0.10)] transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-rkb)] hover:-translate-y-0.5 hover:bg-deep-2 hover:shadow-[0_8px_24px_-8px_rgba(11,36,71,0.35)] active:translate-y-px active:scale-[0.985]"
          >
            Apply now
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
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
