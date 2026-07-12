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
      {/* One <nav>, two geometries. Over the hero it sits full-bleed and flush
          to the top edge — a fixed, edge-to-edge bar with a single gold
          hairline underline. Past the fold it glides inward: narrowing to the
          shell width, lifting off the edge, rounding its corners and lighting
          its full gold frame + drop shadow into the floating navy-glass pill.
          The outer wrapper animates the top offset and side insets; the <nav>
          animates its own width, height, radius, frame, fill and shadow — all
          on one shared ease so the two states melt into each other. */}
      <div
        className={`transition-[padding] duration-500 ease-[var(--ease-rkb)] ${
          scrolled
            ? "px-[var(--gutter)] pt-[calc(env(safe-area-inset-top,0px)+0.625rem)] sm:pt-[calc(env(safe-area-inset-top,0px)+1rem)]"
            : "px-0 pt-[env(safe-area-inset-top,0px)]"
        }`}
      >
        <nav
          className={`relative z-50 mx-auto flex w-full items-center justify-between gap-3 border backdrop-blur-xl transition-[max-width,height,border-radius,border-color,background-color,box-shadow,padding] duration-500 ease-[var(--ease-rkb)] before:pointer-events-none before:absolute before:inset-[2.5px] before:rounded-[1.2rem] before:border before:border-[rgba(217,165,63,0.18)] before:transition-opacity before:duration-500 before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[linear-gradient(90deg,transparent_0%,rgba(217,165,63,0.42)_14%,rgba(217,165,63,0.6)_50%,rgba(217,165,63,0.42)_86%,transparent_100%)] after:transition-opacity after:duration-500 after:content-[''] ${
            scrolled
              ? "h-[4.05rem] max-w-[var(--shell)] rounded-[1.4rem] border-gold-bright/30 bg-deep/[0.93] pl-6 pr-3 shadow-[0_14px_36px_-14px_rgba(8,28,56,0.6)] before:opacity-100 after:opacity-0"
              : "h-[4.75rem] max-w-[100vw] rounded-none border-transparent bg-deep/80 pl-[var(--gutter)] pr-[var(--gutter)] shadow-none before:opacity-0 after:opacity-100"
          }`}
        >
          <Link
            href="/"
            aria-label="R.K. Bansal Finance, home"
            className="group relative z-50 -ml-2 flex items-center self-stretch pl-2 pr-5"
            onClick={() => setOpen(false)}
          >
            {/* The logo pre-struck in ivory (logo-ivory.png) — the source PNG
                carries a haze of near-transparent JPEG artifacts that the old
                brightness/invert CSS filter lit up as grey smudge boxes around
                the mark. The cleaned asset has that haze stripped from the
                alpha channel, so the glass behind the logo stays spotless. */}
            <Image
              src="/logo-ivory.png"
              alt="R.K. Bansal Finance Pvt. Ltd."
              width={152}
              height={36}
              priority
              style={{ width: "auto" }}
              className={`opacity-95 transition-[height,opacity] duration-500 ease-[var(--ease-rkb)] group-hover:opacity-75 ${
                scrolled ? "h-[2.3rem]" : "h-[2.55rem]"
              }`}
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
                      ? "bg-white/[0.1] text-on-dark"
                      : "text-on-dark-soft hover:bg-white/[0.07] hover:text-on-dark"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span className="mx-1.5 h-6 w-px bg-line-dark" aria-hidden />

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
              className={`h-px w-6 bg-on-dark transition-all duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-on-dark transition-all duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile sheet — vault navy. Note: do NOT add a texture class (tx- or
          section-) here; those set position:relative and would override
          `fixed`, breaking the overlay. */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-deep transition-opacity duration-300 md:hidden ${
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
                    ? "bg-white/[0.1] text-on-dark"
                    : "text-on-dark-soft hover:bg-white/[0.07] hover:text-on-dark"
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
