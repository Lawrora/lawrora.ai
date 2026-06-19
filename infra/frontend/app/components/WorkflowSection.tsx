"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const steps = [
  {
    step: "01",
    label: "Lead arrives via call, text, or web",
    desc: "Lawrora listens across every channel, including inbound calls, SMS, and web forms, so no lead slips through regardless of how a prospect reaches out.",
  },
  {
    step: "02",
    label: "AI engages and qualifies the prospect",
    desc: "An AI assistant converses with the prospect in real time, asking the right questions to assess case type, urgency, and fit before a human ever picks up.",
  },
  {
    step: "03",
    label: "Matched to the right attorney instantly",
    desc: "Based on practice area, jurisdiction, and attorney availability, Lawrora scores and routes each lead to the best-fit lawyer for that specific matter.",
  },
  {
    step: "04",
    label: "Attorney receives a pre-qualified case brief",
    desc: "The attorney opens a ready-made summary with prospect details, case facts, risk flags, and suggested next steps. No admin work required.",
  },
  {
    step: "05",
    label: "AI assists with research and strategy",
    desc: "Counsel AI surfaces relevant precedents, statutes, and strategic guidance. Attorneys spend their time on judgment, not search.",
  },
  {
    step: "06",
    label: "Schedules, deadlines, and billing managed",
    desc: "Schedule AI tracks every calendar event, filing deadline, and time entry automatically. Matters stay on track from first contact to final invoice.",
  },
]

function StepVisual({ index }: { index: number }) {
  if (index === 0) return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-5 space-y-2.5 max-w-sm">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">Incoming leads</p>
      {[
        { src: "Call", msg: "New inbound · (555) 210-4488", time: "just now", dot: "bg-blue-400" },
        { src: "Text", msg: "Hi, I was in an accident...", time: "2m ago", dot: "bg-violet-400" },
        { src: "Web", msg: "Injury intake form submitted", time: "5m ago", dot: "bg-emerald-400" },
      ].map((n) => (
        <div key={n.src} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/8">
          <span className={`w-2 h-2 rounded-full shrink-0 ${n.dot}`} />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-white/35 uppercase mr-2">{n.src}</span>
            <span className="text-xs text-white/80">{n.msg}</span>
          </div>
          <span className="text-[10px] text-white/30 shrink-0">{n.time}</span>
        </div>
      ))}
    </div>
  )

  if (index === 1) return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-5 space-y-2.5 max-w-sm">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">AI conversation</p>
      {[
        { role: "ai", text: "Were you involved in an accident?" },
        { role: "client", text: "Yes, a rear-end collision on Oct 12." },
        { role: "ai", text: "Any injuries or medical treatment?" },
        { role: "client", text: "ER visit and physical therapy." },
      ].map((msg, i) => (
        <div key={i} className={`flex ${msg.role === "client" ? "justify-end" : ""}`}>
          <div className={`text-xs px-3 py-2 rounded-xl max-w-[80%] leading-relaxed ${msg.role === "ai" ? "bg-white/8 text-white/80 border border-white/10" : "bg-white text-black"}`}>
            {msg.text}
          </div>
        </div>
      ))}
      <div className="pt-1">
        <div className="flex justify-between text-[10px] text-white/40 mb-1.5">
          <span>Qualification score</span><span className="font-semibold text-emerald-400">84%</span>
        </div>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div className="h-full w-[84%] bg-emerald-500 rounded-full" />
        </div>
      </div>
    </div>
  )

  if (index === 2) return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-5 space-y-2.5 max-w-sm">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">Match results</p>
      {[
        { name: "Sarah Chen", spec: "PI Specialist", match: 98, best: true },
        { name: "Mike Torres", spec: "PI Generalist", match: 81, best: false },
      ].map((a) => (
        <div key={a.name} className={`flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border ${a.best ? "border-emerald-400/40" : "border-white/8"}`}>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">{a.name[0]}</div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">{a.name}</p>
            <p className="text-[10px] text-white/40">{a.spec}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-emerald-400">{a.match}%</p>
            {a.best && <p className="text-[10px] text-emerald-400">Best fit</p>}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 pt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        <span className="text-xs text-white/50">Routing to Sarah Chen...</span>
      </div>
    </div>
  )

  if (index === 3) return (
    <div className="space-y-3 max-w-sm">
      <div className="rounded-2xl border border-white/10 bg-white/6 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Case brief</p>
          <span className="text-[10px] font-semibold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">PI · High value</span>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/8 space-y-3">
          {[
            { k: "Incident", v: "Rear-end MVA, Oct 12 2024" },
            { k: "Treatment", v: "ER + Physical therapy" },
            { k: "Liability", v: "Clear" },
            { k: "Risk flags", v: "None" },
          ].map((row) => (
            <div key={row.k} className="flex gap-4">
              <span className="text-[10px] font-semibold text-white/30 uppercase w-20 shrink-0 pt-0.5">{row.k}</span>
              <span className="text-xs text-white/80">{row.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-orange-400/20 bg-orange-500/8 p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(251,146,60)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-white">Demand letter draft ready</p>
          <p className="text-[10px] text-white/45 mt-0.5">Generated from case facts · pending review</p>
        </div>
        <span className="text-[10px] font-semibold text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded-full">Draft AI</span>
      </div>
    </div>
  )

  if (index === 4) return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-5 space-y-2.5 max-w-sm">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">Research · 3 results</p>
      {[
        { case: "Smith v. Allstate (2022)", note: "Comparable rear-end, $180k settlement" },
        { case: "Doe v. Progressive (2021)", note: "PT damages, full recovery awarded" },
        { case: "Torres v. Hartford (2023)", note: "Liability threshold precedent" },
      ].map((r) => (
        <div key={r.case} className="bg-white/5 rounded-xl px-4 py-3 border border-white/8">
          <p className="text-xs font-semibold text-white/85">{r.case}</p>
          <p className="text-[10px] text-white/45 mt-0.5">{r.note}</p>
        </div>
      ))}
      <div className="bg-white/8 rounded-xl px-4 py-3 border border-white/10">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">Strategy</p>
        <p className="text-xs text-white/75">Demand letter recommended. Target range $120k to $200k.</p>
      </div>
    </div>
  )

  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-5 space-y-2.5 max-w-sm">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">Upcoming</p>
      {[
        { month: "Nov", day: "12", label: "Client intake call", time: "2:00 PM", status: "Confirmed" },
        { month: "Nov", day: "19", label: "Medical records deadline", time: "EOD", status: "Pending" },
        { month: "Dec", day: "5", label: "Initial demand draft due", time: "EOD", status: "Upcoming" },
      ].map((ev) => (
        <div key={ev.label} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/8">
          <div className="text-center w-8 shrink-0">
            <p className="text-[9px] font-semibold text-white/35 uppercase">{ev.month}</p>
            <p className="text-sm font-bold text-white leading-tight">{ev.day}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-white/85">{ev.label}</p>
            <p className="text-[10px] text-white/40">{ev.time}</p>
          </div>
          <span className="text-[10px] text-white/30">{ev.status}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/8">
        <span className="text-[10px] text-white/40 flex-1">Time logged this matter</span>
        <span className="text-xs font-bold text-white/80">2.5 hrs</span>
      </div>
    </div>
  )
}

export default function WorkflowSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const active = steps[activeIndex]

  return (
    <section className="border-t border-white/6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row">

        {/* Sticky left panel */}
        <div className="hidden md:flex flex-col justify-center sticky top-0 h-screen w-1/2 px-12 py-16 shrink-0">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/6 text-white/50 px-3 py-1.5 rounded-full mb-10 w-fit">
            Workflow
          </span>

          {/* Progress indicators */}
          <div className="flex gap-2 mb-10">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-8 bg-white"
                    : i < activeIndex
                    ? "w-4 bg-white/30"
                    : "w-4 bg-white/10"
                }`}
              />
            ))}
          </div>

          <p className="text-8xl font-bold text-white/6 leading-none mb-4 tabular-nums select-none">
            {active.step}
          </p>

          <h2
            key={`label-${activeIndex}`}
            className="text-2xl md:text-3xl font-bold leading-tight mb-4 animate-fade-in text-white"
          >
            {active.label}
          </h2>

          <p
            key={`desc-${activeIndex}`}
            className="text-white/55 leading-relaxed mb-10 max-w-sm text-sm animate-fade-in"
          >
            {active.desc}
          </p>

          <Link
            href="/demo"
            className="inline-block bg-white text-black px-7 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors w-fit"
          >
            Book a Demo
          </Link>
        </div>

        {/* Right: scroll triggers */}
        <div className="w-full md:w-1/2 border-l border-white/6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              ref={(el) => { stepRefs.current[i] = el }}
              className="flex flex-col justify-center px-12 py-20 min-h-screen border-b border-white/6 last:border-b-0"
            >
              {/* Mobile */}
              <div className="md:hidden space-y-4">
                <span className="text-xs font-semibold text-white/30 block">Step {s.step}</span>
                <h3 className="text-xl font-bold text-white">{s.label}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                <StepVisual index={i} />
              </div>

              {/* Desktop */}
              <div
                className={`hidden md:block transition-all duration-500 ${
                  i === activeIndex ? "opacity-100 translate-y-0" : "opacity-15 translate-y-2"
                }`}
              >
                <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase block mb-3">
                  Step {s.step}
                </span>
                <h3 className="text-xl font-bold text-white leading-snug mb-8 max-w-xs">
                  {s.label}
                </h3>
                <StepVisual index={i} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
