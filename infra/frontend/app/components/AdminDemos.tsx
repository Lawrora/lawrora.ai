"use client"

import { useState, useEffect } from "react"

// Firm admin screens, in the same looping style as ProductDemos

export function useLoop(steps: number, stepMs: number, holdMs: number) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s >= steps ? 0 : s + 1)), step >= steps ? holdMs : stepMs)
    return () => clearTimeout(t)
  }, [step, steps, stepMs, holdMs])
  return step
}

export function Tick() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}

// ─── Overview: the weekend, counted up ───────────────────────────────────────

const weekend = [
  { label: "Calls & texts answered", value: 23 },
  { label: "Leads qualified",        value: 14 },
  { label: "Consults booked",        value: 9 },
  { label: "Handed to a person",     value: 1 },
]

export function OverviewDemo() {
  const step = useLoop(20, 55, 4000)
  return (
    <div className="flex flex-col gap-3 p-6 bg-sky-50 rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Overview · since Fri 6 PM</p>
        <span className="text-[10px] font-semibold text-sky-600">Mon 8:00 AM</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {weekend.map((w) => (
          <div key={w.label} className="bg-white rounded-xl px-4 py-3 border border-sky-100">
            <p className="text-2xl font-bold text-[#0E0E2C] tabular-nums">{Math.round((w.value * Math.min(step, 20)) / 20)}</p>
            <p className="text-[10px] text-[#0E0E2C]/50 mt-0.5">{w.label}</p>
          </div>
        ))}
      </div>
      <p className={`text-[10px] text-sky-700 transition-opacity duration-500 ${step >= 20 ? "opacity-100" : "opacity-0"}`}>
        No voicemails. Nothing waiting from the weekend.
      </p>
    </div>
  )
}

// ─── AI Phone Intake: calls sorting themselves ───────────────────────────────

const calls = [
  { name: "Maria Alvarez",  meta: "Phone · 2:14 AM · Auto accident", status: "Qualified",      tone: "text-emerald-600" },
  { name: "James Okafor",   meta: "Phone · 12:51 AM · Slip and fall", status: "Qualified",     tone: "text-emerald-600" },
  { name: "(737) 555-0192", meta: "Text · Sun 11:08 PM",             status: "Needs a person", tone: "text-amber-600" },
  { name: "Dana Whitfield", meta: "Phone · Sun 6:40 PM",             status: "Not a fit",      tone: "text-[#0E0E2C]/40" },
]

export function PhoneIntakeDemo() {
  const step = useLoop(calls.length, 900, 3500)
  return (
    <div className="flex flex-col gap-2 p-6 bg-indigo-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-1">AI Phone &amp; Text Intake</p>
      {calls.map((c, i) => {
        const sorted = i < step
        return (
          <div key={c.name} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-indigo-100">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 shrink-0">{c.name[0] === "(" ? "#" : c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0E0E2C] leading-none truncate">{c.name}</p>
              <p className="text-[10px] text-[#0E0E2C]/40 mt-1 truncate">{c.meta}</p>
            </div>
            <span className={`text-[10px] font-bold shrink-0 ${sorted ? c.tone : "text-indigo-400"}`}>
              {sorted ? c.status : "In conversation"}
            </span>
          </div>
        )
      })}
      <p className={`text-[10px] text-indigo-600 mt-1 transition-opacity duration-500 ${step >= calls.length ? "opacity-100" : "opacity-0"}`}>
        Full transcript saved for every call.
      </p>
    </div>
  )
}

// ─── Leads: accept with a conflict check ─────────────────────────────────────

const checks = [
  "Searching 412 open cases",
  "Opposing parties: no match",
  "Existing clients: no match",
]

export function ConflictDemo() {
  const step = useLoop(checks.length + 1, 900, 3500)
  return (
    <div className="flex flex-col gap-3 p-6 bg-amber-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Leads · Accept</p>
      <div className="bg-white rounded-xl px-4 py-3 border border-amber-100">
        <p className="text-xs font-semibold text-[#0E0E2C]">Maria Alvarez · Auto accident</p>
        <p className="text-[10px] text-[#0E0E2C]/40 mt-0.5">Matched to Priya Sharma · Austin, TX</p>
      </div>
      <div className="space-y-2 min-h-[72px]">
        {checks.slice(0, step).map((c, i) => (
          <div key={c} className="flex items-center gap-2 animate-fade-in text-[11px] text-[#0E0E2C]/70">
            <span className={`flex h-4 w-4 items-center justify-center rounded-full ${i === 0 ? "bg-amber-200 text-amber-700" : "bg-amber-500 text-white"}`}><Tick /></span>
            {c}
          </div>
        ))}
      </div>
      {step > checks.length && (
        <div className="flex items-center gap-2 animate-fade-in bg-amber-500 text-white rounded-xl px-4 py-2">
          <Tick />
          <p className="text-[10px] font-semibold">No conflicts · Case opened · Retainer sent for signature</p>
        </div>
      )}
    </div>
  )
}

// ─── Messages: clients kept up to date ───────────────────────────────────────

const inbox = [
  { name: "Maria Alvarez",  via: "SMS",  text: "Still treating. 2 PT sessions this week, no new bills." },
  { name: "James Okafor",   via: "Chat", text: "Uploaded the police report you asked for." },
  { name: "Check-ins",      via: "Auto", text: "Treatment check-in sent to 12 open cases." },
]

export function MessagesDemo() {
  const step = useLoop(inbox.length, 1100, 3500)
  return (
    <div className="flex flex-col gap-2 p-6 bg-emerald-50 rounded-2xl">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Messages</p>
        <span className="text-[10px] font-semibold text-emerald-600 tabular-nums">{step} unread</span>
      </div>
      <div className="space-y-2 min-h-[170px]">
        {inbox.slice(0, step).map((m) => (
          <div key={m.name} className="flex gap-3 animate-fade-in bg-white rounded-xl px-4 py-3 border border-emerald-100">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#0E0E2C] leading-none">
                {m.name} <span className="ml-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">{m.via}</span>
              </p>
              <p className="text-[11px] text-[#0E0E2C]/60 mt-1.5 leading-snug">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Reports: what's working ─────────────────────────────────────────────────

const trend = [3, 5, 4, 6, 8, 5, 7, 9, 6, 8, 10, 9, 11, 12]

export function ReportsDemo() {
  const step = useLoop(20, 60, 4000)
  const p = Math.min(step, 20) / 20
  return (
    <div className="flex flex-col gap-3 p-6 bg-rose-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Reports · last 14 days</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl px-4 py-3 border border-rose-100">
          <p className="text-2xl font-bold text-[#0E0E2C] tabular-nums">{Math.round(38 * p)}%</p>
          <p className="text-[10px] text-[#0E0E2C]/50 mt-0.5">Lead to signed client</p>
        </div>
        <div className="bg-white rounded-xl px-4 py-3 border border-rose-100">
          <p className="text-2xl font-bold text-[#0E0E2C] tabular-nums">{Math.round(64 * p)}</p>
          <p className="text-[10px] text-[#0E0E2C]/50 mt-0.5">Cases opened this year</p>
        </div>
      </div>
      <div className="flex h-20 items-end gap-1.5 bg-white rounded-xl px-4 py-3 border border-rose-100">
        {trend.map((v, i) => (
          <span key={i} className="flex-1 rounded-sm bg-rose-400 transition-[height] duration-300" style={{ height: `${(v / 12) * 100 * p}%` }} />
        ))}
      </div>
    </div>
  )
}
