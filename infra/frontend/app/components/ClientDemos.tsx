"use client"

import { Tick, useLoop } from "./AdminDemos"

// What the injured person sees, in the same looping style as ProductDemos

// ─── The call: someone picks up at 2 AM ──────────────────────────────────────

const callLines = [
  { who: "Firm",  text: "Hale & Ortiz, how can I help?" },
  { who: "Maria", text: "I was rear-ended last Tuesday. Is it too late to call?" },
  { who: "Firm",  text: "Not at all. Were you hurt?" },
  { who: "Maria", text: "My neck. I saw urgent care the next morning." },
]

export function ClientCallDemo() {
  const step = useLoop(callLines.length, 1000, 3500)
  const secs = 8 + step * 11
  return (
    <div className="flex flex-col gap-3 p-6 bg-teal-50 rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">On the phone · Sat 2:14 AM</p>
        <span className="text-[10px] font-semibold text-teal-600 tabular-nums">0:{String(secs).padStart(2, "0")}</span>
      </div>
      <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-teal-100">
        <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">H</span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-[#0E0E2C]">Hale &amp; Ortiz</p>
          <p className="text-[10px] text-[#0E0E2C]/40">Answered in 4 seconds</p>
        </div>
        <div className="flex items-end gap-0.5 h-4">
          {[6, 12, 8, 14, 9].map((h, i) => (
            <span key={i} className="w-1 rounded-full bg-teal-400 animate-wave" style={{ height: h, animationDelay: `${i * 90}ms` }} />
          ))}
        </div>
      </div>
      <div className="space-y-2 min-h-[118px]">
        {callLines.slice(0, step).map((l, i) => (
          <p key={i} className="flex gap-2 animate-fade-in text-[11px] leading-snug">
            <span className={`w-10 shrink-0 font-semibold ${l.who === "Firm" ? "text-teal-600" : "text-[#0E0E2C]/40"}`}>{l.who}</span>
            <span className="text-[#0E0E2C]/75">{l.text}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

// ─── The text: knowing what happens next ─────────────────────────────────────

const texts = [
  { from: "firm",   text: "Thanks for calling, Maria. Priya Sharma, a personal injury lawyer, will call you Monday at 9:00 AM." },
  { from: "client", text: "Thank you, that's a relief." },
  { from: "firm",   text: "If anything changes before then, just reply here. Reply HUMAN anytime to reach our team." },
]

export function ClientTextDemo() {
  const step = useLoop(texts.length, 1200, 3500)
  return (
    <div className="flex flex-col gap-2 p-6 bg-lime-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-1">Messages · Hale &amp; Ortiz</p>
      <div className="flex flex-col gap-2 min-h-[170px]">
        {texts.slice(0, step).map((t, i) => (
          <p
            key={i}
            className={`max-w-[85%] animate-fade-in rounded-2xl px-3.5 py-2 text-[11px] leading-snug ${
              t.from === "firm" ? "self-start rounded-bl-md bg-white border border-lime-100 text-[#0E0E2C]/80" : "self-end rounded-br-md bg-lime-500 text-white"
            }`}
          >
            {t.text}
          </p>
        ))}
      </div>
    </div>
  )
}

// ─── The retainer: signed from the phone ─────────────────────────────────────

export function ClientSignDemo() {
  const step = useLoop(3, 1100, 3500)
  return (
    <div className="flex flex-col gap-3 p-6 bg-orange-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Fee agreement · DocuSign</p>
      <div className="bg-white rounded-xl px-4 py-4 border border-orange-100 space-y-2">
        <p className="text-xs font-semibold text-[#0E0E2C]">Contingency fee agreement</p>
        <div className="space-y-1.5">
          <span className="block h-1.5 w-full rounded bg-orange-100" />
          <span className="block h-1.5 w-11/12 rounded bg-orange-100" />
          <span className="block h-1.5 w-4/5 rounded bg-orange-100" />
        </div>
        <p className="text-[10px] text-[#0E0E2C]/50 pt-1">No fee unless we win · 33⅓%</p>
        <div className="mt-2 border-b border-[#0E0E2C]/20 pb-1 h-9 flex items-end">
          {step >= 1 && <span className="animate-fade-in font-serif italic text-2xl text-[#0E0E2C] leading-none">Maria Alvarez</span>}
        </div>
        <p className="text-[9px] uppercase tracking-wider text-[#0E0E2C]/40">Signature</p>
      </div>
      {step >= 2 && (
        <div className="flex items-center gap-2 animate-fade-in bg-orange-500 text-white rounded-xl px-4 py-2">
          <Tick />
          <p className="text-[10px] font-semibold">Signed Mon 9:24 AM · Copy emailed to Maria</p>
        </div>
      )}
    </div>
  )
}

// ─── Check-ins and uploads: updates without chasing ──────────────────────────

export function ClientCheckInDemo() {
  const step = useLoop(4, 1000, 3500)
  return (
    <div className="flex flex-col gap-2 p-6 bg-cyan-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-1">Check-in · every 5 days</p>
      <div className="flex flex-col gap-2 min-h-[96px]">
        {step >= 1 && (
          <p className="self-start max-w-[85%] animate-fade-in rounded-2xl rounded-bl-md bg-white border border-cyan-100 px-3.5 py-2 text-[11px] leading-snug text-[#0E0E2C]/80">
            Hi Maria, are you still treating? Any new providers, ER visits or bills?
          </p>
        )}
        {step >= 2 && (
          <p className="self-end max-w-[85%] animate-fade-in rounded-2xl rounded-br-md bg-cyan-500 px-3.5 py-2 text-[11px] leading-snug text-white">
            Still in PT twice a week. Uploading the MRI bill now.
          </p>
        )}
      </div>
      <div className={`bg-white rounded-xl px-4 py-3 border border-cyan-100 transition-opacity duration-300 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-[#0E0E2C]">MRI_bill_March.pdf</span>
          <span className="text-cyan-600 font-semibold">{step >= 4 ? "Added to case" : "Uploading…"}</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-cyan-100 overflow-hidden">
          <div className="h-full rounded-full bg-cyan-500 transition-[width] duration-700" style={{ width: step >= 4 ? "100%" : step >= 3 ? "45%" : "0%" }} />
        </div>
      </div>
    </div>
  )
}

// ─── The portal: their case, any time ────────────────────────────────────────

const stages = ["Intake complete", "Fee agreement signed", "Treatment", "Demand sent", "Settlement"]

export function ClientPortalDemo() {
  const step = useLoop(4, 800, 3500)
  return (
    <div className="flex flex-col gap-3 p-6 bg-fuchsia-50 rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">My case · Client portal</p>
        <span className="text-[10px] font-semibold text-fuchsia-600">Lawyer: Priya Sharma</span>
      </div>
      <div className="bg-white rounded-xl px-4 py-3 border border-fuchsia-100 space-y-2.5">
        {stages.map((s, i) => {
          const done = i < step
          const current = i === step
          return (
            <div key={s} className="flex items-center gap-3 text-[11px]">
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${done ? "bg-fuchsia-500 text-white" : current ? "border-2 border-fuchsia-500" : "border border-[#0E0E2C]/20"}`}>
                {done && <Tick />}
              </span>
              <span className={done || current ? "font-semibold text-[#0E0E2C]" : "text-[#0E0E2C]/40"}>{s}</span>
              {current && <span className="ml-auto text-[10px] text-fuchsia-600">In progress</span>}
            </div>
          )
        })}
      </div>
      <p className="text-[10px] text-fuchsia-700">Message your lawyer or upload a document any time.</p>
    </div>
  )
}
