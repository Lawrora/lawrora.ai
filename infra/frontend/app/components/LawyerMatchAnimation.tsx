"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Star } from "lucide-react"

const LAWYERS = [
  { name: "Sarah Chen",    role: "Senior Partner",    specialty: "Personal Injury", cases: 142, match: 98, avatar: "SC" },
  { name: "Marcus Hall",   role: "Associate",         specialty: "Real Estate",     cases: 89,  match: 72, avatar: "MH" },
  { name: "Priya Sharma",  role: "Lead Attorney",     specialty: "Personal Injury", cases: 201, match: 94, avatar: "PS" },
  { name: "David Wong",    role: "Partner",           specialty: "Corporate",       cases: 67,  match: 41, avatar: "DW" },
  { name: "Elena Russo",   role: "Senior Associate",  specialty: "Personal Injury", cases: 178, match: 89, avatar: "ER" },
]

type Phase = "incoming" | "scanning" | "analyzing" | "matched" | "complete"

export default function LawyerMatchAnimation() {
  const [phase, setPhase] = useState<Phase>("incoming")
  const [scanIndex, setScanIndex] = useState(0)
  const [scoreVisible, setScoreVisible] = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    if (phase === "incoming") {
      t = setTimeout(() => setPhase("scanning"), 1600)
    } else if (phase === "scanning") {
      if (scanIndex < LAWYERS.length - 1) {
        t = setTimeout(() => setScanIndex((i) => i + 1), 420)
      } else {
        t = setTimeout(() => setPhase("analyzing"), 600)
      }
    } else if (phase === "analyzing") {
      t = setTimeout(() => setScoreVisible(true), 200)
      t = setTimeout(() => setPhase("matched"), 1800)
    } else if (phase === "matched") {
      t = setTimeout(() => setPhase("complete"), 1000)
    } else if (phase === "complete") {
      t = setTimeout(() => {
        setPhase("incoming")
        setScanIndex(0)
        setScoreVisible(false)
      }, 3000)
    }

    return () => clearTimeout(t)
  }, [phase, scanIndex])

  const winner = LAWYERS[0]

  return (
    <div className="relative w-full max-w-md mx-auto select-none">

      {/* Incoming client request */}
      <div
        className={`mb-5 rounded-2xl border border-[#0E0E2C]/10 bg-white px-5 py-4 flex items-start gap-3 transition-all duration-500 ${
          phase === "incoming" ? "opacity-100 translate-y-0" : "opacity-60 scale-95"
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-[#0E0E2C] flex items-center justify-center shrink-0 text-white text-xs font-bold">
          JD
        </div>
        <div>
          <p className="text-xs font-bold text-[#0E0E2C]">New Client — Personal Injury</p>
          <p className="text-xs text-[#0E0E2C]/55 mt-0.5 leading-snug">
            Motor vehicle accident · Downtown area · Urgent
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] font-semibold bg-[#F8F7F2] text-[#0E0E2C]/60 px-2 py-0.5 rounded-md">High value</span>
            <span className="text-[10px] font-semibold bg-[#F8F7F2] text-[#0E0E2C]/60 px-2 py-0.5 rounded-md">Liability clear</span>
          </div>
        </div>
        {phase !== "incoming" && (
          <div className="ml-auto shrink-0">
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Qualified ✓</span>
          </div>
        )}
      </div>

      {/* Scanning label */}
      {(phase === "scanning" || phase === "analyzing") && (
        <div className="text-center mb-3 animate-fade-in">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#0E0E2C]/40">
            {phase === "analyzing" ? "Scoring match quality…" : "Scanning available attorneys…"}
          </p>
        </div>
      )}

      {/* Lawyer cards */}
      <div className="space-y-2">
        {LAWYERS.map((lawyer, i) => {
          const isVisible = phase === "incoming" ? false : i <= scanIndex || phase === "analyzing" || phase === "matched" || phase === "complete"
          const isWinner = lawyer.name === winner.name && (phase === "matched" || phase === "complete")
          const isEliminated = lawyer.name !== winner.name && (phase === "matched" || phase === "complete")

          return (
            <div
              key={lawyer.name}
              className={[
                "rounded-xl border px-4 py-3 flex items-center gap-3 transition-all duration-300",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
                isWinner ? "border-[#0E0E2C] bg-[#0E0E2C] text-white" : "border-[#0E0E2C]/10 bg-white",
                isEliminated ? "opacity-30 scale-98" : "",
              ].filter(Boolean).join(" ")}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                isWinner ? "bg-white text-[#0E0E2C]" : "bg-[#F8F7F2] text-[#0E0E2C]"
              }`}>
                {lawyer.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold leading-none ${isWinner ? "text-white" : "text-[#0E0E2C]"}`}>
                  {lawyer.name}
                </p>
                <p className={`text-[10px] mt-0.5 ${isWinner ? "text-white/60" : "text-[#0E0E2C]/45"}`}>
                  {lawyer.role} · {lawyer.specialty}
                </p>
              </div>

              {/* Score bar or final match % */}
              {(phase === "analyzing" || phase === "matched" || phase === "complete") && (
                <div className="flex items-center gap-2 shrink-0">
                  {phase === "analyzing" && scoreVisible ? (
                    <div className="w-20">
                      <div className="h-1 bg-[#0E0E2C]/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0E0E2C] rounded-full transition-all duration-700"
                          style={{ width: `${lawyer.match}%`, transitionDelay: `${i * 80}ms` }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <span className={`text-xs font-bold tabular-nums ${
                    isWinner ? "text-white" : lawyer.match > 85 ? "text-[#0E0E2C]" : "text-[#0E0E2C]/40"
                  }`}>
                    {lawyer.match}%
                  </span>
                  {isWinner && <CheckCircle size={14} strokeWidth={2.5} className="text-white" />}
                </div>
              )}

              {/* Scanning pulse */}
              {phase === "scanning" && i === scanIndex && (
                <div className="w-2 h-2 rounded-full bg-[#0E0E2C] animate-pulse shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      {/* Result */}
      {phase === "complete" && (
        <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle size={14} strokeWidth={2.5} className="text-emerald-600" />
            <p className="text-xs font-bold text-emerald-700">Match confirmed</p>
          </div>
          <p className="text-xs text-emerald-600 leading-snug">
            <span className="font-bold">{winner.name}</span> has been notified and the client brief is ready.
            Case scheduled within 2 hours.
          </p>
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-700">
              <Star size={10} strokeWidth={2} className="fill-emerald-500 text-emerald-500" />
              Client matched
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-700">
              <Star size={10} strokeWidth={2} className="fill-emerald-500 text-emerald-500" />
              Attorney ready
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
