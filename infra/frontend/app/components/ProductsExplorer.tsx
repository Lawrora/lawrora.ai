"use client"

import { useState } from "react"
import Link from "next/link"

const products = [
  {
    id: "lead-ai",
    name: "Lead AI",
    tag: "Lead Management",
    tagline: "Never miss a lead. Route every one.",
    description: "Lead AI captures inbound interest across call, text, and web 24/7, qualifies every prospect with a real-time AI conversation, and routes the right leads to the right attorneys automatically.",
    features: ["24/7 multi-channel lead capture", "Live AI qualification conversation", "Case type and urgency scoring", "Instant attorney routing on qualification", "Pre-qualified lead brief on handoff"],
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-600",
    ring: "ring-blue-200",
  },
  {
    id: "match-ai",
    name: "Match AI",
    tag: "Attorney Matching",
    tagline: "The right attorney for every client.",
    description: "Match AI scores each qualified lead against your firm's attorneys and recommends the best fit based on practice area, jurisdiction, and current workload. No manual assignment.",
    features: ["Practice area and jurisdiction matching", "Availability and workload scoring", "Match confidence percentage", "Client-facing attorney recommendation", "Auto-notification on match"],
    dot: "bg-violet-400",
    badge: "bg-violet-50 text-violet-600",
    ring: "ring-violet-200",
  },
  {
    id: "draft-ai",
    name: "Draft AI",
    tag: "Document Drafting",
    tagline: "First drafts from case facts. In seconds.",
    description: "Draft AI generates demand letters, retainer agreements, motions, and filings directly from case data. Attorneys review and sign, not start from scratch.",
    features: ["Demand letter generation from case brief", "Retainer and engagement agreement drafts", "Motion and filing templates", "Clause library and redline history", "E-signature ready output"],
    dot: "bg-orange-400",
    badge: "bg-orange-50 text-orange-600",
    ring: "ring-orange-200",
  },
  {
    id: "counsel-ai",
    name: "Counsel AI",
    tag: "Lawyer Intelligence",
    tagline: "Research, strategy, and guidance. Inside every matter.",
    description: "Counsel AI gives attorneys instant access to relevant precedents, statutes, and strategic next steps the moment they open a case, without leaving the platform.",
    features: ["Jurisdiction-aware case law search", "Cited AI summaries ready to use", "AI-suggested next steps and strategy", "Pre-built case briefs on intake", "Precedent clustering by outcome"],
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600",
    ring: "ring-amber-200",
  },
  {
    id: "schedule-ai",
    name: "Schedule AI",
    tag: "Scheduling",
    tagline: "Every deadline tracked. Every calendar managed.",
    description: "Schedule AI monitors filing deadlines, manages attorney calendars, logs time entries, and alerts the team before anything slips, all without manual input.",
    features: ["Filing deadline tracking", "Calendar sync across attorneys", "Conflict detection before it matters", "Automated time entry logging", "Proactive deadline alerts"],
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-600",
    ring: "ring-emerald-200",
  },
]

function ProductVisual({ id }: { id: string }) {
  if (id === "lead-ai") return (
    <div className="rounded-2xl border border-[#0E0E2C]/8 bg-[#F8F7F2] p-5 space-y-2.5">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-3">Incoming leads</p>
      {[
        { src: "Call", msg: "New inbound · (555) 210-4488", time: "just now", dot: "bg-blue-400" },
        { src: "Text", msg: "Hi, I was in an accident...", time: "2m ago", dot: "bg-blue-300" },
        { src: "Web", msg: "Injury intake form submitted", time: "5m ago", dot: "bg-blue-200" },
      ].map((n) => (
        <div key={n.src} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-[#0E0E2C]/5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${n.dot}`} />
          <span className="text-[10px] font-bold text-[#0E0E2C]/30 uppercase w-8">{n.src}</span>
          <span className="text-xs text-[#0E0E2C] flex-1 truncate">{n.msg}</span>
          <span className="text-[10px] text-[#0E0E2C]/30 shrink-0">{n.time}</span>
        </div>
      ))}
    </div>
  )

  if (id === "match-ai") return (
    <div className="rounded-2xl border border-[#0E0E2C]/8 bg-[#F8F7F2] p-5 space-y-2.5">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-3">Match results · PI Matter</p>
      {[
        { name: "Sarah Chen", spec: "PI Specialist", match: 98, best: true },
        { name: "Mike Torres", spec: "PI Generalist", match: 81, best: false },
        { name: "Priya Nair", spec: "Real Estate", match: 34, best: false },
      ].map((a) => (
        <div key={a.name} className={`flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border ${a.best ? "border-violet-300" : "border-[#0E0E2C]/5"}`}>
          <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">{a.name[0]}</div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#0E0E2C]">{a.name}</p>
            <p className="text-[10px] text-[#0E0E2C]/40">{a.spec}</p>
          </div>
          <p className="text-xs font-bold text-violet-600">{a.match}%</p>
        </div>
      ))}
    </div>
  )

  if (id === "draft-ai") return (
    <div className="rounded-2xl border border-[#0E0E2C]/8 bg-[#F8F7F2] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Document ready</p>
        <span className="text-[10px] font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Draft AI</span>
      </div>
      <div className="bg-white rounded-xl p-4 border border-orange-100 space-y-2">
        <p className="text-xs font-bold text-[#0E0E2C]">Demand Letter · Smith v. Allstate</p>
        <p className="text-[10px] text-[#0E0E2C]/40 mb-3">Generated from case brief · Oct 12 2024</p>
        {[85, 65, 90, 55, 75].map((w, i) => (
          <div key={i} className="h-1.5 bg-[#0E0E2C]/6 rounded-full overflow-hidden">
            <div className="h-full bg-orange-200 rounded-full" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <span className="text-[10px] font-semibold bg-white border border-orange-200 text-orange-600 px-3 py-1.5 rounded-lg">Review draft</span>
        <span className="text-[10px] font-semibold bg-orange-500 text-white px-3 py-1.5 rounded-lg">Send for signature</span>
      </div>
    </div>
  )

  if (id === "counsel-ai") return (
    <div className="rounded-2xl border border-[#0E0E2C]/8 bg-[#F8F7F2] p-5 space-y-2.5">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-3">Research · 3 results</p>
      {[
        { case: "Smith v. Allstate (2022)", note: "Comparable rear-end, $180k settlement" },
        { case: "Doe v. Progressive (2021)", note: "PT damages, full recovery awarded" },
        { case: "Torres v. Hartford (2023)", note: "Liability threshold precedent" },
      ].map((r) => (
        <div key={r.case} className="bg-white rounded-xl px-4 py-2.5 border border-[#0E0E2C]/5">
          <p className="text-xs font-semibold text-[#0E0E2C]">{r.case}</p>
          <p className="text-[10px] text-[#0E0E2C]/50 mt-0.5">{r.note}</p>
        </div>
      ))}
      <div className="bg-[#0E0E2C] rounded-xl px-4 py-2.5">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1">Strategy</p>
        <p className="text-xs text-white/80">Demand letter recommended. Target $120k to $200k.</p>
      </div>
    </div>
  )

  return (
    <div className="rounded-2xl border border-[#0E0E2C]/8 bg-[#F8F7F2] p-5 space-y-2.5">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-3">Upcoming · Smith v. Allstate</p>
      {[
        { month: "Nov", day: "12", label: "Client intake call", time: "2:00 PM" },
        { month: "Nov", day: "19", label: "Medical records deadline", time: "EOD" },
        { month: "Dec", day: "5", label: "Initial demand draft due", time: "EOD" },
      ].map((ev) => (
        <div key={ev.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-[#0E0E2C]/5">
          <div className="text-center w-7 shrink-0">
            <p className="text-[9px] font-semibold text-[#0E0E2C]/35 uppercase">{ev.month}</p>
            <p className="text-sm font-bold text-[#0E0E2C] leading-tight">{ev.day}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#0E0E2C]">{ev.label}</p>
            <p className="text-[10px] text-[#0E0E2C]/40">{ev.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProductsExplorer() {
  const [active, setActive] = useState(0)
  const p = products[active]

  return (
    <div className="flex flex-col md:flex-row gap-0 border border-[#0E0E2C]/8 rounded-2xl overflow-hidden">

      {/* Left: product selector */}
      <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-[#0E0E2C]/8 bg-[#F8F7F2]">
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
          {products.map((prod, i) => (
            <button
              key={prod.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 px-5 py-4 text-left w-full shrink-0 transition-all duration-200 border-b md:border-b-0 md:border-l-2 ${
                i === active
                  ? "bg-white border-[#0E0E2C] md:border-l-[#0E0E2C]"
                  : "border-transparent hover:bg-white/60 text-[#0E0E2C]/50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${prod.dot}`} />
              <span className={`text-sm font-semibold whitespace-nowrap ${i === active ? "text-[#0E0E2C]" : ""}`}>{prod.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: active product detail */}
      <div className="flex-1 p-8 md:p-10 bg-white">
        <div key={p.id} className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Text */}
          <div>
            <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 ${p.badge}`}>{p.tag}</span>
            <h2 className="text-3xl font-bold mb-3">{p.name}</h2>
            <p className="text-base font-semibold text-[#0E0E2C]/60 mb-4 leading-snug">{p.tagline}</p>
            <p className="text-sm text-[#0E0E2C]/55 leading-relaxed mb-6">{p.description}</p>
            <ul className="space-y-2.5 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#0E0E2C]/70">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dot}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${p.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E0E2C] hover:opacity-70 transition-opacity"
            >
              See full product page
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Visual */}
          <div>
            <ProductVisual id={p.id} />
          </div>

        </div>
      </div>

    </div>
  )
}
