"use client";

import { useState } from "react";
import { buttonClasses } from "./Button";

// Underline grows to 2px accent on focus (via box-shadow, no layout shift);
// turns danger-red only after invalid interaction (:user-invalid).
const field =
  "w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] duration-300 ease-[var(--ease-rkb)] focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)] [&:user-invalid]:border-[var(--color-danger)]";

// label wrapper: eyebrow shifts to accent while the field is focused.
const labelCls = "group flex flex-col gap-2";
const labelText =
  "eyebrow text-ink-faint transition-colors group-focus-within:text-accent";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full min-h-64 flex-col items-start justify-center gap-3">
        <span className="font-display text-3xl text-ink">Thank you.</span>
        <p className="measure text-ink-soft">
          Your message has been noted. Our team will be in touch during business
          hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelCls}>
          <span className={labelText}>Name</span>
          <input required name="name" autoComplete="name" className={field} placeholder="Your full name" />
        </label>
        <label className={labelCls}>
          <span className={labelText}>Mobile</span>
          <input
            required
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            className={field}
            placeholder="Registered mobile number"
          />
        </label>
      </div>
      <label className={labelCls}>
        <span className={labelText}>Email</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className={field}
          placeholder="you@example.com"
        />
      </label>
      <label className={labelCls}>
        <span className={labelText}>How can we help?</span>
        <textarea
          required
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Tell us a little about your query"
        />
      </label>
      <button type="submit" className={`${buttonClasses("primary")} self-start`}>
        Send message
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        >
          →
        </span>
      </button>
    </form>
  );
}
