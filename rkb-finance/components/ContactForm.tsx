"use client";

import { useState } from "react";

const field =
  "w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors";

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
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-faint">Name</span>
          <input required name="name" className={field} placeholder="Your full name" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-faint">Mobile</span>
          <input
            required
            name="phone"
            inputMode="tel"
            className={field}
            placeholder="Registered mobile number"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-ink-faint">Email</span>
        <input
          required
          type="email"
          name="email"
          className={field}
          placeholder="you@example.com"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-ink-faint">How can we help?</span>
        <textarea
          required
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Tell us a little about your query"
        />
      </label>
      <button
        type="submit"
        className="group inline-flex items-center gap-2.5 self-start rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-deep-2"
      >
        Send message
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
