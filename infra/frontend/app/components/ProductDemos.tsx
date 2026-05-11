"use client"

import { useState, useEffect } from "react"

// ─── Lead AI: Live qualification chat ────────────────────────────────────────

const chatMessages = [
  { role: "ai", text: "Hi! Were you recently in an accident?" },
  { role: "prospect", text: "Yes, rear-ended on the highway last Thursday." },
  { role: "ai", text: "Did you suffer any injuries?" },
  { role: "prospect", text: "Yes — back pain and whiplash. I saw a doctor." },
]

export function LeadAIDemo() {
  const [shown, setShown] = useState(0)
  const [qualified, setQualified] = useState(false)

  useEffect(() => {
    if (shown < chatMessages.length) {
      const delay = shown === 0 ? 800 : shown % 2 === 0 ? 1100 : 900
      const t = setTimeout(() => setShown((s) => s + 1), delay)
      return () => clearTimeout(t)
    }
    if (!qualified) {
      const t = setTimeout(() => setQualified(true), 700)
      return () => clearTimeout(t)
    }
    if (qualified) {
      const t = setTimeout(() => { setShown(0); setQualified(false) }, 4000)
      return () => clearTimeout(t)
    }
  }, [shown, qualified])

  return (
    <div className="hidden md:flex flex-col gap-2 p-6 bg-blue-50 rounded-2xl">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">AI Qualification</p>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-2 min-h-[160px]">
        {chatMessages.slice(0, shown).map((m, i) => (
          <div key={i} className={`flex ${m.role === "prospect" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
              m.role === "ai"
                ? "bg-white border border-blue-100 text-[#0E0E2C]"
                : "bg-blue-500 text-white"
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {shown < chatMessages.length && shown > 0 && (
          <div className={`flex ${chatMessages[shown]?.role === "prospect" ? "justify-end" : "justify-start"}`}>
            <div className="bg-white border border-blue-100 rounded-2xl px-3 py-2 flex gap-1 items-center">
              {[0, 150, 300].map((d) => (
                <span key={d} className="w-1 h-1 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {qualified && (
        <div className="flex items-center gap-2.5 animate-fade-in bg-blue-600 text-white rounded-xl px-4 py-2.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <p className="text-[10px] font-bold">Lead Qualified</p>
            <p className="text-[10px] text-blue-200">Personal Injury · Routing to attorney...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Match AI: Score bars filling per attorney ───────────────────────────────

const attorneys = [
  { name: "Sarah Chen", spec: "PI Specialist", target: 98, bar: "bg-violet-500" },
  { name: "Mike Torres", spec: "PI Generalist", target: 81, bar: "bg-violet-300" },
  { name: "Priya Nair", spec: "Real Estate", target: 34, bar: "bg-violet-200" },
]

export function MatchAIDemo() {
  const [shown, setShown] = useState(0)
  const [pct, setPct] = useState([0, 0, 0])
  const [routed, setRouted] = useState(false)

  useEffect(() => {
    if (shown < attorneys.length) {
      const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 600 : 800)
      return () => clearTimeout(t)
    }
  }, [shown])

  useEffect(() => {
    if (shown === 0) { setPct([0, 0, 0]); setRouted(false); return }
    const interval = setInterval(() => {
      setPct((prev) => {
        const next = prev.map((v, i) => i < shown ? Math.min(v + 3, attorneys[i].target) : v)
        if (next.every((v, i) => i >= shown || v >= attorneys[i].target)) clearInterval(interval)
        return next
      })
    }, 20)
    return () => clearInterval(interval)
  }, [shown])

  useEffect(() => {
    if (shown === attorneys.length && pct[attorneys.length - 1] >= attorneys[attorneys.length - 1].target) {
      const t = setTimeout(() => setRouted(true), 500)
      return () => clearTimeout(t)
    }
  }, [pct, shown])

  useEffect(() => {
    if (routed) {
      const t = setTimeout(() => { setShown(0); setPct([0, 0, 0]); setRouted(false) }, 3500)
      return () => clearTimeout(t)
    }
  }, [routed])

  return (
    <div className="hidden md:flex flex-col gap-3 p-6 bg-violet-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-1">Match results · PI Matter</p>

      <div className="space-y-3 min-h-[150px]">
        {attorneys.slice(0, shown).map((a, i) => (
          <div key={a.name} className={`bg-white rounded-xl px-4 py-3 border transition-all duration-300 animate-fade-in ${i === 0 && pct[0] >= attorneys[0].target ? "border-violet-400" : "border-violet-100"}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-[10px] font-bold text-violet-600 shrink-0">{a.name[0]}</div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#0E0E2C] leading-none">{a.name}</p>
                <p className="text-[10px] text-[#0E0E2C]/40">{a.spec}</p>
              </div>
              <p className="text-xs font-bold text-violet-600 tabular-nums w-8 text-right">{pct[i]}%</p>
            </div>
            <div className="h-1.5 bg-violet-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-100 ${a.bar}`} style={{ width: `${pct[i]}%` }} />
            </div>
          </div>
        ))}

        {shown < attorneys.length && (
          <div className="flex items-center gap-2 px-1 py-1">
            {[0, 150, 300].map((d) => (
              <span key={d} className="w-1.5 h-1.5 rounded-full bg-violet-300 animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
            <span className="text-[10px] text-violet-400 ml-1">Scoring attorneys...</span>
          </div>
        )}
      </div>

      {routed && (
        <div className="flex items-center gap-2 animate-fade-in bg-violet-600 text-white rounded-xl px-4 py-2">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <p className="text-[10px] font-semibold">Sarah Chen selected · Notifying now...</p>
        </div>
      )}
    </div>
  )
}

// ─── Draft AI: Typewriter on real document lines ─────────────────────────────

const docLines = [
  { label: "RE:", text: "Personal Injury Claim — Smith v. Allstate" },
  { label: "Date:", text: "October 12, 2024" },
  { label: "Claim:", text: "Medical expenses $24,500. Pain & suffering est. $80,000." },
  { label: "Demand:", text: "$104,500 · Please respond within 30 days." },
]

export function DraftAIDemo() {
  const [phase, setPhase] = useState<"loading" | "typing" | "ready">("loading")
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (phase === "loading") {
      const t = setTimeout(() => { setPhase("typing"); setLineIdx(0); setCharIdx(0) }, 1600)
      return () => clearTimeout(t)
    }
    if (phase === "typing") {
      const line = docLines[lineIdx]
      if (!line) { setPhase("ready"); return }
      if (charIdx < line.text.length) {
        const t = setTimeout(() => setCharIdx((c) => c + 1), 28)
        return () => clearTimeout(t)
      } else if (lineIdx < docLines.length - 1) {
        const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0) }, 180)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("ready"), 400)
        return () => clearTimeout(t)
      }
    }
    if (phase === "ready") {
      const t = setTimeout(() => { setPhase("loading"); setLineIdx(0); setCharIdx(0) }, 4500)
      return () => clearTimeout(t)
    }
  }, [phase, lineIdx, charIdx])

  return (
    <div className="hidden md:flex flex-col gap-3 p-6 bg-orange-50 rounded-2xl">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Demand Letter</p>
        <span className="text-[10px] font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Draft AI</span>
      </div>

      <div className="bg-white rounded-xl p-4 border border-orange-100 min-h-[140px]">
        {phase === "loading" && (
          <div className="flex flex-col gap-2 items-center justify-center h-28">
            <div className="flex gap-1">
              {[0, 150, 300].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full bg-orange-300 animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
            <p className="text-[10px] text-orange-400">Reading case facts...</p>
          </div>
        )}

        {(phase === "typing" || phase === "ready") && (
          <div className="space-y-2.5">
            {docLines.map((ln, i) => {
              const isCurrent = i === lineIdx && phase === "typing"
              const isDone = i < lineIdx || phase === "ready"
              if (!isCurrent && !isDone) return null
              const text = isCurrent ? ln.text.slice(0, charIdx) : ln.text
              return (
                <div key={i} className="text-[10px] leading-relaxed animate-fade-in">
                  <span className="font-bold text-[#0E0E2C]/40 mr-1.5">{ln.label}</span>
                  <span className="text-[#0E0E2C]/80">{text}</span>
                  {isCurrent && (
                    <span className="inline-block w-0.5 h-3 bg-orange-400 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {phase === "ready" && (
        <div className="flex gap-2 animate-fade-in">
          <span className="text-[10px] font-semibold bg-white border border-orange-200 text-orange-600 px-3 py-1.5 rounded-lg cursor-default">Review draft</span>
          <span className="text-[10px] font-semibold bg-orange-500 text-white px-3 py-1.5 rounded-lg cursor-default">Send for signature</span>
        </div>
      )}
    </div>
  )
}

// ─── Counsel AI: Search query types → results with highlights ────────────────

const searchQuery = "rear-end injury California damages 2022"
const researchResults = [
  { case: "Smith v. Allstate (2022)", note: "Comparable rear-end, $180k settlement", term: "rear-end" },
  { case: "Doe v. Progressive (2021)", note: "PT damages, full recovery awarded", term: "damages" },
  { case: "Torres v. Hartford (2023)", note: "Liability threshold precedent", term: "Liability" },
]

function Highlighted({ text, term }: { text: string; term: string }) {
  const idx = text.toLowerCase().indexOf(term.toLowerCase())
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-amber-200 text-[#0E0E2C] rounded px-0.5 not-italic">{text.slice(idx, idx + term.length)}</mark>
      {text.slice(idx + term.length)}
    </span>
  )
}

export function CounselAIDemo() {
  const [queryLen, setQueryLen] = useState(0)
  const [searching, setSearching] = useState(false)
  const [shown, setShown] = useState(0)
  const [strategy, setStrategy] = useState(false)

  useEffect(() => {
    if (queryLen < searchQuery.length) {
      const t = setTimeout(() => setQueryLen((q) => q + 1), 45)
      return () => clearTimeout(t)
    }
    if (!searching) {
      const t = setTimeout(() => setSearching(true), 300)
      return () => clearTimeout(t)
    }
    if (shown < researchResults.length) {
      const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 900 : 800)
      return () => clearTimeout(t)
    }
    if (!strategy) {
      const t = setTimeout(() => setStrategy(true), 600)
      return () => clearTimeout(t)
    }
    if (strategy) {
      const t = setTimeout(() => {
        setQueryLen(0); setSearching(false); setShown(0); setStrategy(false)
      }, 4000)
      return () => clearTimeout(t)
    }
  }, [queryLen, searching, shown, strategy])

  return (
    <div className="hidden md:flex flex-col gap-3 p-6 bg-amber-50 rounded-2xl">
      <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest mb-1">Case Research</p>

      <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-xl px-3 py-2">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span className="text-[11px] text-[#0E0E2C] flex-1 font-mono">
          {searchQuery.slice(0, queryLen)}
          {queryLen < searchQuery.length && (
            <span className="inline-block w-0.5 h-3 bg-amber-400 ml-0.5 animate-pulse align-middle" />
          )}
        </span>
        {searching && shown === 0 && (
          <div className="flex gap-0.5">
            {[0, 100, 200].map((d) => (
              <span key={d} className="w-1 h-1 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 min-h-[100px]">
        {researchResults.slice(0, shown).map((r) => (
          <div key={r.case} className="bg-white rounded-xl px-3 py-2.5 border border-amber-100 animate-fade-in">
            <p className="text-xs font-semibold text-[#0E0E2C]">{r.case}</p>
            <p className="text-[10px] text-[#0E0E2C]/50 mt-0.5">
              <Highlighted text={r.note} term={r.term} />
            </p>
          </div>
        ))}

        {searching && shown < researchResults.length && shown > 0 && (
          <div className="flex items-center gap-1.5 px-1 py-1">
            {[0, 100, 200].map((d) => (
              <span key={d} className="w-1 h-1 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        )}
      </div>

      {strategy && (
        <div className="bg-[#0E0E2C] rounded-xl px-4 py-2.5 animate-fade-in">
          <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1">Strategy</p>
          <p className="text-xs text-white/80">Demand letter recommended. Target $120k to $200k.</p>
        </div>
      )}
    </div>
  )
}

// ─── Schedule AI: Conflict detection and auto-resolution ─────────────────────

const scheduleItems = [
  { month: "Nov", day: "12", label: "Client intake call", time: "2:00 PM", conflict: false },
  { month: "Nov", day: "19", label: "Medical records deadline", time: "EOD", conflict: true },
  { month: "Dec", day: "5", label: "Initial demand draft due", time: "EOD", conflict: false },
]

export function ScheduleAIDemo() {
  const [shown, setShown] = useState(0)
  const [alerting, setAlerting] = useState(false)
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    if (shown < scheduleItems.length) {
      const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 600 : 700)
      return () => clearTimeout(t)
    }
    if (!alerting) {
      const t = setTimeout(() => setAlerting(true), 600)
      return () => clearTimeout(t)
    }
    if (!resolved) {
      const t = setTimeout(() => setResolved(true), 1500)
      return () => clearTimeout(t)
    }
    if (resolved) {
      const t = setTimeout(() => { setShown(0); setAlerting(false); setResolved(false) }, 3500)
      return () => clearTimeout(t)
    }
  }, [shown, alerting, resolved])

  return (
    <div className="hidden md:flex flex-col gap-2.5 p-6 bg-emerald-50 rounded-2xl">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold text-[#0E0E2C]/40 uppercase tracking-widest">Schedule · Smith v. Allstate</p>
        {resolved && <span className="text-[10px] font-semibold text-emerald-600 animate-fade-in">All clear</span>}
      </div>

      <div className="space-y-2 min-h-[116px]">
        {scheduleItems.slice(0, shown).map((ev) => {
          const isConflict = ev.conflict && alerting && !resolved
          const wasConflict = ev.conflict && resolved
          return (
            <div key={ev.label} className={`flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border transition-all duration-500 animate-fade-in ${
              isConflict ? "border-red-300 shadow-sm shadow-red-100"
              : wasConflict ? "border-emerald-300"
              : "border-emerald-100"
            }`}>
              <div className="text-center w-8 shrink-0">
                <p className="text-[9px] font-semibold text-[#0E0E2C]/35 uppercase">{ev.month}</p>
                <p className="text-sm font-bold text-[#0E0E2C] leading-tight">{ev.day}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#0E0E2C]">{ev.label}</p>
                <p className="text-[10px] text-[#0E0E2C]/40">{ev.time}</p>
              </div>
              {isConflict && (
                <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded animate-pulse">Conflict</span>
              )}
              {wasConflict && (
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded animate-fade-in">Resolved</span>
              )}
            </div>
          )
        })}

        {shown < scheduleItems.length && (
          <div className="flex items-center gap-2 px-1 py-1">
            {[0, 150, 300].map((d) => (
              <span key={d} className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        )}
      </div>

      {alerting && (
        <div className={`flex items-center gap-2.5 rounded-xl px-4 py-2 animate-fade-in transition-colors duration-500 ${resolved ? "bg-emerald-600" : "bg-red-500"}`}>
          {resolved ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <p className="text-[10px] font-semibold text-white">Conflict resolved · Rescheduled automatically</p>
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <p className="text-[10px] font-semibold text-white">Conflict detected · Resolving...</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
