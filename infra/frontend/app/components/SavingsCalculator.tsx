"use client"

import { useState } from "react"

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n)
}

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
}

export default function SavingsCalculator() {
  const [attorneys, setAttorneys] = useState(10)
  const [leads, setLeads] = useState(60)
  const [rate, setRate] = useState(350)
  const [adminHrsPerDay, setAdminHrsPerDay] = useState(2)

  // adminHrsPerDay is a linear multiplier on all savings (baseline = 2 hrs/day)
  const multiplier = adminHrsPerDay / 2

  const intakeHrs = leads * (40 / 60) * multiplier
  const researchHrs = leads * 0.4 * 4.5 * multiplier
  const draftingHrs = leads * 0.3 * 2.5 * multiplier
  const schedulingHrs = attorneys * 2.1 * 4.3 * multiplier

  const totalHrs = intakeHrs + researchHrs + draftingHrs + schedulingHrs
  const monthlySavings = totalHrs * rate
  const annualSavings = monthlySavings * 12

  const breakdown = [
    { label: "Lead intake", hours: intakeHrs, color: "bg-blue-400" },
    { label: "Case research", hours: researchHrs, color: "bg-violet-400" },
    { label: "Document drafting", hours: draftingHrs, color: "bg-orange-400" },
    { label: "Scheduling & admin", hours: schedulingHrs, color: "bg-emerald-400" },
  ]

  return (
    <div className="rounded-2xl border border-[#0E0E2C]/8 bg-[#F8F7F2] p-8 md:p-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40 mb-2">Savings predictor</p>
          <h3 className="text-2xl font-bold text-[#0E0E2C] leading-tight max-w-sm">
            How much could your firm save?
          </h3>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40">Estimated monthly savings</p>
          <p className="text-4xl font-bold text-[#0E0E2C] tabular-nums">{money(monthlySavings)}</p>
          <p className="text-sm text-[#0E0E2C]/50">{money(annualSavings)} per year</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-semibold text-[#0E0E2C]/60">Attorneys</label>
            <span className="text-xs font-bold text-[#0E0E2C] tabular-nums">{attorneys}</span>
          </div>
          <input
            type="range" min={1} max={50} step={1} value={attorneys}
            onChange={(e) => setAttorneys(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#0E0E2C]/12 accent-[#0E0E2C] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#0E0E2C]/30">1</span>
            <span className="text-[10px] text-[#0E0E2C]/30">50</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-semibold text-[#0E0E2C]/60">Leads per month</label>
            <span className="text-xs font-bold text-[#0E0E2C] tabular-nums">{leads}</span>
          </div>
          <input
            type="range" min={10} max={300} step={5} value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#0E0E2C]/12 accent-[#0E0E2C] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#0E0E2C]/30">10</span>
            <span className="text-[10px] text-[#0E0E2C]/30">300</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-semibold text-[#0E0E2C]/60">Avg. hourly rate</label>
            <span className="text-xs font-bold text-[#0E0E2C] tabular-nums">${rate}</span>
          </div>
          <input
            type="range" min={100} max={1000} step={25} value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#0E0E2C]/12 accent-[#0E0E2C] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#0E0E2C]/30">$100</span>
            <span className="text-[10px] text-[#0E0E2C]/30">$1,000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-semibold text-[#0E0E2C]/60">Admin time per attorney per day</label>
            <span className="text-xs font-bold text-[#0E0E2C] tabular-nums">{adminHrsPerDay} hrs</span>
          </div>
          <input
            type="range" min={0.5} max={8} step={0.5} value={adminHrsPerDay}
            onChange={(e) => setAdminHrsPerDay(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#0E0E2C]/12 accent-[#0E0E2C] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#0E0E2C]/30">0.5 hrs</span>
            <span className="text-[10px] text-[#0E0E2C]/30">8 hrs</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {breakdown.map((b) => (
          <div key={b.label} className="bg-white rounded-xl p-4 border border-[#0E0E2C]/6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${b.color}`} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0E0E2C]/40">{b.label}</span>
            </div>
            <p className="text-xl font-bold text-[#0E0E2C] tabular-nums">{fmt(b.hours)}</p>
            <p className="text-[10px] text-[#0E0E2C]/40 mt-0.5">hrs saved / month</p>
          </div>
        ))}
      </div>

      {/* Total bar */}
      <div className="bg-[#0E0E2C] rounded-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span className="text-sm font-semibold text-white">{fmt(totalHrs)} attorney hours freed per month</span>
        </div>
        <span className="text-sm font-bold text-white/60">{fmt(totalHrs * 12)} hours per year</span>
      </div>

      <p className="text-[10px] text-[#0E0E2C]/30 mt-4">
        Baseline assumes 2 hrs/day of admin burden per attorney. Each additional hour scales all savings proportionally. Underlying benchmarks: 40 min per lead on intake, 4.5 hrs per case on research, 2.5 hrs per demand letter, 2.1 hrs/week on scheduling. Actual results vary.
      </p>
    </div>
  )
}
