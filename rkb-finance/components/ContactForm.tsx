"use client";

import { useState } from "react";
import { buttonClasses } from "./Button";

// Underline grows to 2px accent on focus (via box-shadow, no layout shift);
// turns danger-red only after invalid interaction (:user-invalid).
const field =
  "w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] duration-300 ease-[var(--ease-rkb)] focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)] [&:user-invalid]:border-[var(--color-danger)]";

// Same underline field, tuned for the native <select>: drop the OS chevron
// (we draw our own for cross-browser consistency) and clear room for it.
const selectField = `${field} cursor-pointer appearance-none pr-8`;

// label wrapper: eyebrow shifts to accent while the field is focused.
const labelCls = "group flex flex-col gap-2";
const labelText =
  "eyebrow text-ink-faint transition-colors group-focus-within:text-accent";

// Enquiry categories — routes the message to the right desk.
const categories = [
  "Apply for a new loan",
  "Check my application status",
  "Loan repayment / Payment assistance",
  "EMI / Due amount enquiry",
  "Loan statement / NOC request",
  "Update my contact or KYC details",
  "General enquiry",
  "Complaint / Grievance",
  "Report fraud or suspicious activity",
  "Business partnership / Corporate enquiry",
  "Careers",
  "Media & Press",
  "Other",
] as const;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("");

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
            placeholder="Your mobile number"
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
        <span className={labelText}>Application / Loan Account Number (Optional)</span>
        <input
          name="accountNumber"
          inputMode="numeric"
          autoComplete="off"
          className={field}
          placeholder="For existing customers, if you have one"
        />
      </label>
      <label className={labelCls}>
        <span className={labelText}>What can we help you with?</span>
        <div className="relative">
          <select
            required
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${selectField} ${category ? "text-ink" : "text-ink-faint"}`}
          >
            <option value="" disabled hidden>
              I would like to…
            </option>
            {categories.map((c) => (
              <option key={c} value={c} className="text-ink">
                {c}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 12 8"
            className="pointer-events-none absolute right-1 top-1/2 w-3 -translate-y-1/2 text-ink-faint transition-colors duration-300 group-focus-within:text-accent"
          >
            <path
              d="M1 1.5 6 6.5 11 1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </label>
      <label className={labelCls}>
        <span className={labelText}>Tell us more (optional)</span>
        <span className="text-sm leading-relaxed text-ink-soft">
          Please provide any additional details that will help us assist you.
        </span>
        <textarea
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="For example, your application number, loan account number, repayment date or a brief description of your query."
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
