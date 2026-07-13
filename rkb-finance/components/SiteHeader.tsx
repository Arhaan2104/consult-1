"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/Button";
import { nav } from "@/content/site";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <header className="fixed inset-x-0 top-0 z-50">
      {/* A single floating glass pill — the same shape from first load to the
          footer, inset from the top edge and the side gutters, never an
          edge-to-edge bar. It wears the house double stroke (a navy hairline
          ring, an inset gold frame and a lit top edge) over warm-white glass.
          Scroll only deepens the drop shadow a touch, so the plate lifts a
          little further as the page slides beneath it — no geometry morph. */}
      <div className="px-[var(--gutter)] pt-[calc(env(safe-area-inset-top,0px)+0.625rem)] sm:pt-[calc(env(safe-area-inset-top,0px)+1rem)]">
        <nav
          className={`relative z-50 mx-auto flex h-[4.05rem] w-full max-w-[var(--shell)] items-center justify-between gap-3 rounded-[1.4rem] bg-[#fdfbf6]/95 pl-6 pr-3 backdrop-blur-xl transition-[box-shadow] duration-500 ease-[var(--ease-rkb)] before:pointer-events-none before:absolute before:inset-[3px] before:rounded-[1.2rem] before:border before:border-[rgba(184,134,36,0.42)] before:content-[''] ${
            scrolled
              ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(17,47,91,0.26),0_22px_50px_-20px_rgba(11,36,71,0.42),0_6px_16px_-8px_rgba(11,36,71,0.18)]"
              : "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(17,47,91,0.24),0_18px_44px_-20px_rgba(11,36,71,0.34),0_5px_14px_-8px_rgba(11,36,71,0.16)]"
          }`}
        >
          <Link
            href="/"
            aria-label="R.K. Bansal Finance, home"
            className="group relative z-50 -ml-2 flex items-center self-stretch pl-2 pr-5"
            onClick={() => setOpen(false)}
          >
            {/* The logo in its original brand blue (R.K.-BANSAL.png) — a
                transparent PNG (corners are fully alpha-0), so it sits clean on
                the white nav plate with no baked-in box to colour-match. The
                blue mark needs a light backing to read, which is exactly why
                the pill is warm-white glass (never transparent over the dark
                hero). */}
            <Image
              src="/R.K.-BANSAL.png"
              alt="R.K. Bansal Finance Pvt. Ltd."
              width={152}
              height={36}
              priority
              style={{ width: "auto" }}
              className="h-[2.15rem] opacity-100 transition-opacity duration-500 ease-[var(--ease-rkb)] group-hover:opacity-80"
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
                  className={`rounded-xl px-4 py-2.5 text-[0.95rem] tracking-tight transition-colors duration-300 ${
                    active
                      ? "bg-ink/[0.06] text-ink"
                      : "text-ink-soft hover:bg-ink/[0.045] hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span className="mx-1.5 h-6 w-px bg-line-strong" aria-hidden />

            <Link href="/contact" className={buttonClasses("gold", "", "px-6 py-3")}>
              Apply now
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
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

      {/* Mobile sheet — the same warm white as the nav plate, so the fixed
          white bar (with its blue logo) reads as one continuous light surface
          over the open menu, never a white-bar-over-navy inversion. Note: do
          NOT add a texture class (tx- or section-) here; those set
          position:relative and would override `fixed`, breaking the overlay. */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-[#fdfbf6] transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Mirrors the desktop nav exactly: the same three items with the
            same quiet active treatment (soft white pill), and Apply now as
            the one gold button — never a second highlighted text item. */}
        <div className="shell flex h-full flex-col justify-center gap-2 pt-16">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-5 py-3.5 font-display text-3xl tracking-tight transition-colors duration-300 ${
                  active
                    ? "bg-ink/[0.06] text-ink"
                    : "text-ink-soft hover:bg-ink/[0.045] hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={buttonClasses("gold", "mt-6 w-full justify-center", "px-8 py-4")}
          >
            Apply now
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
