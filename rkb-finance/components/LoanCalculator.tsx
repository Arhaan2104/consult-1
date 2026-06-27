"use client";

import { useState } from "react";
import { product } from "@/content/site";

/**
 * Short Term Loan calculator.
 *
 * Honest math: SIMPLE daily interest on the principal — no compounding, per
 * `product.rateNote` ("Fixed interest rate. No compounding."). The implied APR is a
 * straight, non-compounded annualisation (daily rate × 365) shown explicitly so the
 * true cost is never hidden. Bounds come from `product.amount` / `product.tenure`
 * (tenure is a PLACEHOLDER — see content/site.ts).
 */

const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

const RATES = [
  { pct: product.dailyRatePct.min, label: `${product.dailyRatePct.min}%` },
  { pct: 0.5, label: "0.5%" },
  { pct: product.dailyRatePct.max, label: `${product.dailyRatePct.max}%` },
] as const;

const { minVal, maxVal } = product.amount;
const { minDays, maxDays } = product.tenure;

export default function LoanCalculator() {
  const [amount, setAmount] = useState(25000);
  const [days, setDays] = useState(30);
  const [ratePct, setRatePct] = useState(0.5);

  const dailyRate = ratePct / 100;
  const dailyInterest = amount * dailyRate;
  const totalInterest = dailyInterest * days;
  const totalRepayable = amount + totalInterest;
  const impliedAPR = ratePct * 365; // simple, non-compounded annualisation

  // touch-none → dragging the slider adjusts it instead of scrolling the page;
  // py-2.5 + a 20px thumb give a ~24px touch target while the track stays 4px.
  const slider =
    "w-full cursor-pointer touch-none appearance-none bg-transparent py-2.5 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-line-strong [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(17,47,91,0.35)] [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-line-strong [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent focus:outline-none";

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-[var(--color-line)] lg:grid-cols-[1.1fr_0.9fr]">
      {/* Controls */}
      <div className="flex flex-col gap-9 bg-canvas p-8 sm:p-10">
        <label className="flex flex-col gap-3">
          <span className="flex items-baseline justify-between">
            <span className="eyebrow text-ink-faint">Loan amount</span>
            <span className="font-display text-3xl text-ink">{inr(amount)}</span>
          </span>
          <input
            type="range"
            min={minVal}
            max={maxVal}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={slider}
            aria-label="Loan amount"
          />
          <span className="flex justify-between text-sm text-ink-faint">
            <span>{product.amount.min}</span>
            <span>{product.amount.max}</span>
          </span>
        </label>

        <label className="flex flex-col gap-3">
          <span className="flex items-baseline justify-between">
            <span className="eyebrow text-ink-faint">Tenure</span>
            <span className="font-display text-3xl text-ink">{days} days</span>
          </span>
          <input
            type="range"
            min={minDays}
            max={maxDays}
            step={1}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className={slider}
            aria-label="Tenure in days"
          />
          <span className="flex justify-between text-sm text-ink-faint">
            <span>{product.tenure.min}</span>
            <span>{product.tenure.max}</span>
          </span>
        </label>

        <div className="flex flex-col gap-3">
          <span className="eyebrow text-ink-faint">Daily interest rate</span>
          <div className="grid grid-cols-3 gap-2">
            {RATES.map((r) => {
              const active = r.pct === ratePct;
              return (
                <button
                  key={r.pct}
                  type="button"
                  onClick={() => setRatePct(r.pct)}
                  aria-pressed={active}
                  className={`rounded-full border py-3 text-base font-medium transition-colors ${
                    active
                      ? "border-accent bg-accent text-canvas"
                      : "border-line-strong text-ink-soft hover:border-accent hover:text-ink"
                  }`}
                >
                  {r.label}
                  <span className="ml-1 text-xs opacity-70">/day</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col justify-between gap-8 bg-canvas-3 p-8 sm:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <span className="text-base text-ink-soft">Daily interest</span>
            <span className="font-display text-xl text-ink">{inr(dailyInterest)}</span>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <span className="text-base text-ink-soft">Total interest</span>
            <span className="font-display text-xl text-ink">{inr(totalInterest)}</span>
          </div>
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="eyebrow text-ink-faint">Total repayable</span>
            <span className="font-display text-4xl leading-none text-ink sm:text-5xl">
              {inr(totalRepayable)}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink-faint">
          Implied APR ≈ {impliedAPR.toLocaleString("en-IN")}% — simple daily interest
          on the principal, with no compounding. Illustrative only; final terms are set
          out in your sanction letter and Key Fact Statement.
        </p>
      </div>
    </div>
  );
}
