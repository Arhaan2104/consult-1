"use client";

import { useState, type CSSProperties } from "react";
import { product } from "@/content/site";

/**
 * Short Term Loan calculator.
 *
 * Honest math: SIMPLE daily interest on the principal — no compounding, per
 * `product.rateNote` ("Fixed interest rate. No compounding."). The processing fee
 * (band per the on-site Interest Rate & Charges Policy, 2%–10%) is deducted from
 * the disbursal, so the panel separates "you receive" from "you repay" — and the
 * implied APR is annualised on the NET amount received including the fee, so the
 * true cost is never hidden. Bounds come from `product.amount` / `product.tenure`
 * (tenure max is grounded at 45 days; the minimum is still a PLACEHOLDER — see content/site.ts).
 */

const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

const RATES = [
  { pct: product.dailyRatePct.min, label: `${product.dailyRatePct.min}%` },
  { pct: 0.75, label: "0.75%" },
  { pct: product.dailyRatePct.max, label: `${product.dailyRatePct.max}%` },
] as const;

const FEES = [
  { pct: product.processingFeePct.min, label: `${product.processingFeePct.min}%` },
  { pct: product.processingFeePct.mid, label: `${product.processingFeePct.mid}%` },
  { pct: product.processingFeePct.max, label: `${product.processingFeePct.max}%` },
] as const;

const { minVal, maxVal } = product.amount;
const { minDays, maxDays } = product.tenure;

export default function LoanCalculator() {
  const [amount, setAmount] = useState(50000);
  const [days, setDays] = useState(30);
  const [ratePct, setRatePct] = useState<number>(0.75);
  const [feePct, setFeePct] = useState<number>(product.processingFeePct.mid);

  const dailyRate = ratePct / 100;
  const dailyInterest = amount * dailyRate;
  const totalInterest = dailyInterest * days;
  const totalRepayable = amount + totalInterest;
  const processingFee = (amount * feePct) / 100;
  const netDisbursal = amount - processingFee;
  // All-in annualisation: (interest + fee) over the net amount actually received,
  // scaled to a year — the KFS-style number, not the flattering one.
  const impliedAPR =
    ((totalInterest + processingFee) / netDisbursal) * (365 / days) * 100;

  // Filled-track percentage drives a hard-stop gradient (accent up to --pct).
  const amountPct = ((amount - minVal) / (maxVal - minVal)) * 100;
  const daysPct = ((days - minDays) / (maxDays - minDays)) * 100;

  // touch-none → dragging the slider adjusts it instead of scrolling the page;
  // py-2.5 + a 20px thumb give a ~24px touch target while the track stays 4px.
  // Track is an accent→line-strong gradient stopping at --pct (set per input).
  // NB: kept as ONE literal string so Tailwind's static extractor sees it.
  const slider =
    "w-full cursor-pointer touch-none appearance-none bg-transparent py-2.5 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-accent)_0,var(--color-accent)_var(--pct),var(--color-line-strong)_var(--pct))] [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(17,47,91,0.35)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200 hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95 [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-accent)_0,var(--color-accent)_var(--pct),var(--color-line-strong)_var(--pct))] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent hover:[&::-moz-range-thumb]:scale-110 focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-accent focus-visible:[&::-webkit-slider-thumb]:ring-offset-2 focus-visible:[&::-webkit-slider-thumb]:ring-offset-canvas";

  return (
    <div className="card-raised grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-[var(--color-line)] lg:grid-cols-[1.1fr_0.9fr]">
      {/* Controls */}
      <div className="flex flex-col gap-9 bg-canvas p-6 sm:p-10">
        <label className="flex flex-col gap-3">
          <span className="flex items-baseline justify-between">
            <span className="eyebrow text-ink-faint">Loan amount</span>
            <span className="font-display text-3xl text-ink tabular-nums">{inr(amount)}</span>
          </span>
          <input
            type="range"
            min={minVal}
            max={maxVal}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={slider}
            style={{ "--pct": `${amountPct}%` } as CSSProperties}
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
            <span className="font-display text-3xl text-ink tabular-nums">{days} days</span>
          </span>
          <input
            type="range"
            min={minDays}
            max={maxDays}
            step={1}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className={slider}
            style={{ "--pct": `${daysPct}%` } as CSSProperties}
            aria-label="Tenure in days"
          />
          <span className="flex justify-between text-sm text-ink-faint">
            <span>{product.tenure.min}</span>
            <span>{product.tenure.max}</span>
          </span>
        </label>

        <ChipGroup
          label="Daily interest rate"
          options={RATES}
          value={ratePct}
          onChange={setRatePct}
        />

        <ChipGroup
          label="Processing fee — deducted from disbursal"
          options={FEES}
          value={feePct}
          onChange={setFeePct}
        />
      </div>

      {/* Results */}
      <div className="flex flex-col justify-between gap-8 bg-canvas-3 p-6 sm:p-10">
        <div className="flex flex-col gap-5">
          {/* Disbursal: what lands in the bank, after the upfront fee */}
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-base text-ink-soft">Loan amount</span>
            <span className="font-display text-xl text-ink tabular-nums">{inr(amount)}</span>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <span className="text-base text-ink-soft">
              Processing fee&ensp;·&ensp;{feePct}%
            </span>
            <span className="font-display text-xl text-ink-soft tabular-nums">
              − {inr(processingFee)}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <span className="flex items-center gap-2.5 text-base font-medium text-ink">
              <span className="mint-mark h-2.5 w-2.5" aria-hidden />
              You receive
            </span>
            <span className="font-display text-2xl text-ink tabular-nums">
              {inr(netDisbursal)}
            </span>
          </div>

          {/* Repayment: interest accrues on the full principal */}
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-base text-ink-soft">Daily interest</span>
            <span className="font-display text-xl text-ink tabular-nums">{inr(dailyInterest)}</span>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <span className="text-base text-ink-soft">Total interest&ensp;·&ensp;{days} days</span>
            <span className="font-display text-xl text-ink tabular-nums">{inr(totalInterest)}</span>
          </div>
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="eyebrow text-ink-faint">Total repayable</span>
            <span className="font-display text-4xl leading-none text-ink tabular-nums sm:text-5xl">
              {inr(totalRepayable)}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink-faint">
          The processing fee (plus GST, as applicable) is deducted upfront; interest
          accrues on the full principal. All-in APR ≈{" "}
          {Math.round(impliedAPR).toLocaleString("en-IN")}% including the processing
          fee — simple daily interest, no compounding. Illustrative only; final terms
          are set out in your sanction letter and Key Fact Statement.
        </p>
      </div>
    </div>
  );
}

/** Preset chip row — one control per pricing input, same interaction pattern. */
function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { pct: number; label: string }[];
  value: number;
  onChange: (pct: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow text-ink-faint">{label}</span>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => {
          const active = o.pct === value;
          return (
            <button
              key={o.pct}
              type="button"
              onClick={() => onChange(o.pct)}
              aria-pressed={active}
              className={`rounded-full border px-2 py-3 text-center text-sm font-medium tabular-nums transition-[colors,transform] sm:text-base duration-200 ease-[var(--ease-rkb)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                active
                  ? "border-accent bg-accent text-canvas"
                  : "border-line-strong text-ink-soft hover:border-accent hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
