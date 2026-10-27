"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react"
import {
  Check, FileText, FolderPlus, Gavel, Moon, PenLine, Phone, Receipt, Send, Stethoscope, TrendingDown, UserCheck, Users,
  type LucideIcon,
} from "lucide-react"

// The hero "video": the life of one case, told against a running case clock.
// A text arrives at 2:14 AM; each step drops a slip into the case file on the left,
// and the bottom timeline doubles as the progress bar. Drawn on a fixed 960x540
// stage and scaled to fit, so it behaves like a video at any size.

const STAGE_W = 960
const STAGE_H = 540

type Line = { from: "caller" | "ai"; text: string; saved?: string[] }

const CHAT: Line[] = [
  { from: "caller", text: "Hi, um, I was rear-ended on I-35 last Tuesday. Do you handle that?", saved: ["Rear-end collision", "Incident: Mar 3"] },
  { from: "ai",     text: "We do, and I'm sorry that happened. Were you hurt?" },
  { from: "caller", text: "Yeah, my neck. I went to urgent care the next morning.", saved: ["Injury: moderate"] },
  { from: "ai",     text: "Did the police come out to the scene?" },
  { from: "caller", text: "They did. The other driver got a ticket.", saved: ["Fault: other driver", "Within filing deadline"] },
]

type Slip = { label: string; icon: LucideIcon; by: "auto" | "lawyer"; color: string }

type Scene = {
  clock: string
  accent: string          // the scene's case-file colour, used across the frame
  line?: string
  slips?: Slip[]          // added to the case file once the scene finishes
  full?: boolean          // takes the whole frame: no case clock, no case file
  beats: number[]
  render: (b: number) => ReactNode
}

const SCENES: Scene[] = [
  { accent: "#e9e3d5", clock: "", full: true, beats: [1700, 1900, 2600], render: (b) => <IntroScene b={b} /> },
  { accent: "#22c55e", clock: "Sat, Mar 7 · 2:14 AM", full: true, beats: [1100, 1000, 1000, 1700], render: (b) => <RingScene b={b} /> },
  { accent: "#3b82f6", clock: "Sat, Mar 7 · 2:14 AM", line: "No voicemail. The call is answered and qualified before anyone wakes up.",
    slips: [{ label: "Call transcript", icon: Phone, by: "auto", color: "#3b82f6" }],
    beats: [...CHAT.flatMap(() => [1400, 450]), 1900], render: (b) => <IntakeScene b={b} /> },
  { accent: "#8b5cf6", clock: "Sat, Mar 7 · 2:17 AM", line: "Routed to the best-fit lawyer before another firm calls back.",
    slips: [{ label: "Lawyer match", icon: Users, by: "auto", color: "#8b5cf6" }],
    beats: [1400, 1300, 1300, 2000], render: (b) => <MatchScene b={b} /> },
  { accent: "#14b8a6", clock: "Mar 9 – May 21", line: "Retainer signed, deadline set, treatment tracked. Nothing retyped.",
    slips: [{ label: "Signed retainer", icon: PenLine, by: "auto", color: "#14b8a6" }, { label: "Chronology", icon: Stethoscope, by: "auto", color: "#22c55e" }],
    beats: [1100, 1100, 1100, 1100, 1800], render: (b) => <CaseScene b={b} /> },
  { accent: "#f97316", clock: "Tue, Jun 2", line: "The demand letter is drafted from the file. The lawyer just reviews it.",
    slips: [{ label: "Demand letter", icon: FileText, by: "lawyer", color: "#f97316" }],
    beats: [1000, 1200, 1400, 1200, 1800], render: (b) => <DemandScene b={b} /> },
  { accent: "#f43f5e", clock: "Jun 19 – Jul 8", line: "The client's net and your fee invoice, worked out automatically.",
    slips: [{ label: "Settlement", icon: Gavel, by: "auto", color: "#f43f5e" }, { label: "Fee invoice", icon: Receipt, by: "auto", color: "#f59e0b" }],
    beats: [1300, 1100, 1300, 1400, 2100], render: (b) => <SettleScene b={b} /> },
  { accent: "#e9e3d5", clock: "Case closed", full: true, beats: [4200], render: () => <EndScene /> },
]


const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

export default function IntakeAnimation() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [onScreen, setOnScreen] = useState(true)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [beat, setBeat] = useState(0)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )

  // Scale the fixed stage to the box, and pause while scrolled out of view
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE_W))
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    ro.observe(el)
    io.observe(el)
    return () => { ro.disconnect(); io.disconnect() }
  }, [])

  useEffect(() => {
    if (reducedMotion || !onScreen) return
    const t = setTimeout(() => {
      if (beat < SCENES[sceneIndex].beats.length - 1) {
        setBeat(beat + 1)
      } else {
        setBeat(0)
        setSceneIndex((sceneIndex + 1) % SCENES.length)
      }
    }, SCENES[sceneIndex].beats[beat])
    return () => clearTimeout(t)
  }, [sceneIndex, beat, reducedMotion, onScreen])

  // Reduced motion: hold on the closing frame, the finished case file
  const shownIndex = reducedMotion ? SCENES.length - 1 : sceneIndex
  const scene = SCENES[shownIndex]
  const b = reducedMotion ? scene.beats.length - 1 : beat
  const slips = SCENES.slice(0, shownIndex).flatMap((s) => s.slips ?? [])

  return (
    <div
      ref={stageRef}
      className="relative aspect-video w-full select-none overflow-hidden rounded-2xl bg-[#0c0c0e] shadow-2xl shadow-black/40 ring-1 ring-black/30"
      style={{ "--accent": scene.accent } as CSSProperties}
      aria-hidden="true"
    >
      {/* Slow drifting light, tinted with the scene's colour */}
      <div className="absolute top-[10%] left-[30%] h-[80%] w-[50%] rounded-full bg-(--accent) opacity-20 blur-[120px] transition-colors duration-1000" />
      <div className="absolute -top-[30%] -left-[10%] h-[95%] w-[55%] animate-float-a rounded-full bg-[#e9e3d5] opacity-20 blur-[110px]" />
      <div className="absolute -right-[12%] -bottom-[40%] h-[105%] w-[60%] animate-float-b rounded-full bg-[#8d939c] opacity-25 blur-[120px]" />

      <div
        className="absolute top-0 left-0 text-[#F7F7F2]"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, transformOrigin: "0 0", opacity: scale ? 1 : 0 }}
      >
        {/* Case clock and case badge */}
        {(!scene.full || shownIndex === SCENES.length - 1) && (
          <div className="absolute top-6 right-8 left-8 flex items-baseline justify-between">
            <p key={scene.clock} className="animate-word font-serif text-[30px] leading-none opacity-0">{scene.clock}</p>
            {SCENES[shownIndex - 1] && !SCENES[shownIndex - 1].full && (
              <p className="animate-fade-in font-mono text-[11px] tracking-wide text-white/50">CASE #2611 · MARIA ALVAREZ</p>
            )}
          </div>
        )}

        {/* The case file, one slip per finished step */}
        <CaseFile slips={slips} show={!scene.full || shownIndex === SCENES.length - 1} />

        {/* Current scene */}
        <div key={shownIndex} className="absolute inset-0 animate-scene">
          {scene.full ? (
            scene.render(b)
          ) : (
            <>
              <div className="absolute top-20 right-8 bottom-24 left-50 flex items-center justify-center">
                <Drift>{scene.render(b)}</Drift>
              </div>
              {scene.line && (
                <div className="absolute right-8 bottom-10 left-50 text-center">
                  <Words text={scene.line} delay={400} className="text-[17px] text-white/80" />
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}

/* ── Frame pieces ───────────────────────────────────────── */

const ALL_SLIPS = SCENES.flatMap((s) => s.slips ?? [])

// Every step of the case, ticked off as the video reaches it
function CaseFile({ slips, show }: { slips: Slip[]; show: boolean }) {
  if (!show) return null
  return (
    <div className="absolute top-22 left-8 w-44 animate-fade-in rounded-xl border border-white/10 bg-white/3 px-3 pt-2.5 pb-2">
      <div className="mb-1.5 flex items-baseline justify-between">
        <p className="text-[9.5px] uppercase tracking-[0.18em] text-white/45">Case file</p>
        <p className="font-mono text-[10px] text-white/45">{slips.length}/{ALL_SLIPS.length}</p>
      </div>
      {ALL_SLIPS.map(({ label, by, color }, i) => {
        const done = i < slips.length
        return (
          <div key={label} className="flex items-center gap-2 py-1.25">
            {/* Each step in its product's colour: a faint ring until done, then filled */}
            <span
              key={String(done)}
              className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-white ${done ? "animate-pop" : ""}`}
              style={done ? { background: color, borderColor: color } : { borderColor: `${color}66` }}
            >
              {done && <Check size={9} strokeWidth={3.5} />}
            </span>
            <span className={`flex-1 truncate text-[11.5px] transition-colors duration-500 ${done ? "text-white/90" : "text-white/35"}`}>{label}</span>
            <span className={`font-mono text-[8.5px] ${by === "lawyer" ? "text-white/70" : "text-white/35"}`}>{by === "lawyer" ? "lawyer" : "auto"}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Scenes ─────────────────────────────────────────────── */

// Before the story: the problem, then the name
function IntroScene({ b }: { b: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-20 text-center">
      {b === 0 && <Words text="Your office closes at 6 PM." className="font-serif text-[60px] leading-[1.05]" />}
      {b === 1 && <Words text="Your clients don't wait until morning." className="font-serif text-[60px] leading-[1.05]" />}
      {b === 2 && (
        <>
          <p className="font-serif text-[128px] leading-none tracking-tight">
            {"Lawrora".split("").map((ch, i) => (
              <span key={i} className="inline-block animate-word opacity-0" style={{ animationDelay: `${i * 60}ms` }}>{ch}</span>
            ))}
          </p>
          <Words text="Law firm automation that never clocks out." delay={650} className="mt-5 text-[20px] text-white/65" />
        </>
      )}
    </div>
  )
}

// The firm's intake line ringing after hours, then picked up
function RingScene({ b }: { b: number }) {
  const answered = b >= 3
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <span className="flex animate-fade-in items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[12px] text-white/60">
        <Moon size={13} strokeWidth={2} /> Hale &amp; Ortiz · office closed · Sat 2:14 AM
      </span>

      <div className="relative mt-10 flex h-44 w-44 items-center justify-center">
        {!answered && [0, 1, 2].map((i) => (
          <span key={i} className="absolute inset-0 animate-ring-wave rounded-full border-2 border-[#22c55e]" style={{ animationDelay: `${i * 450}ms` }} />
        ))}
        <span
          key={String(answered)}
          className={`relative flex h-24 w-24 animate-pop items-center justify-center rounded-full shadow-[0_0_60px_rgba(34,197,94,0.45)] ${answered ? "bg-white text-black" : "bg-[#22c55e] text-white"}`}
        >
          {answered ? <Check size={40} strokeWidth={2.5} /> : <Phone size={38} strokeWidth={1.8} className="animate-ring" />}
        </span>
      </div>

      <p className="mt-8 font-mono text-[13px] tracking-wider text-white/50">INTAKE LINE · (512) 555-0148</p>
      <p key={answered ? "a" : `r${b}`} className="mt-2 animate-word text-[28px] font-semibold opacity-0">
        {answered ? "Answered in 4 seconds" : `Ringing${".".repeat(Math.min(b, 2) + 1)}`}
      </p>
      <div className="mt-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${i < Math.min(b + 1, 3) ? "bg-[#22c55e]" : "bg-white/15"}`} />
        ))}
      </div>
    </div>
  )
}

const WAVE = [5, 9, 14, 8, 18, 11, 22, 13, 7, 16, 24, 12, 19, 9, 15, 21, 10, 17, 6, 13, 20, 8, 12, 5]

function IntakeScene({ b }: { b: number }) {
  const shown = Math.min(CHAT.length, Math.floor((b + 1) / 2))
  const speaking = b % 2 === 0 && b < CHAT.length * 2
  const done = b === CHAT.length * 2
  const saved = CHAT.slice(0, shown).flatMap((l) => l.saved ?? [])
  const speaker = CHAT[shown]?.from
  const secs = done ? 102 : Math.round(4 + b * 9)

  return (
    <UiCard className="relative w-110">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[12px]">
        <span className="flex items-center gap-2 font-semibold">
          <span className={`h-2 w-2 rounded-full ${done ? "bg-white/30" : "animate-pulse bg-[#e5484d]"}`} />
          {done ? "Call ended" : "Live call"} · (512) 555-0148
        </span>
        <span className="font-mono text-white/55">{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, "0")}</span>
      </div>

      {/* Voice waveform for whoever is speaking */}
      <div className="flex h-12 items-center gap-3 border-b border-white/10 px-4">
        <span className="w-14 shrink-0 text-[10px] uppercase tracking-widest text-white/45">
          {done ? "Ended" : speaking ? (speaker === "ai" ? "AI" : "Caller") : "Listening"}
        </span>
        <div className="flex h-7 flex-1 items-center gap-0.75">
          {WAVE.map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-colors duration-300 ${speaking ? "animate-wave" : ""} ${speaking && speaker === "ai" ? "bg-(--accent)" : "bg-white/40"}`}
              style={{ height: speaking ? h : 3, animationDelay: `${(i % 6) * 90}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Live transcript */}
      <div className="flex h-40 flex-col justify-end gap-2.5 overflow-hidden px-4 py-3 mask-[linear-gradient(to_bottom,transparent,black_35%)]">
        {CHAT.slice(0, shown).map((line, i) => (
          <p key={i} className="flex animate-fade-in gap-3 text-[13px] leading-snug">
            <span className={`w-12 shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-wider ${line.from === "ai" ? "text-white" : "text-white/45"}`}>
              {line.from === "ai" ? "AI" : "Caller"}
            </span>
            <span className={line.from === "ai" ? "text-white" : "text-white/75"}>{line.text}</span>
          </p>
        ))}
      </div>

      <div className="flex min-h-13 flex-wrap content-start gap-1.5 border-t border-white/10 px-4 py-3">
        {done ? (
          <Pill tone="success">All answers saved</Pill>
        ) : (
          saved.map((s) => <Pill key={s} tone={s === "Within filing deadline" ? "success" : undefined}>{s}</Pill>)
        )}
      </div>
      {done && <EventCard icon={UserCheck} title="Lead qualified" detail="Answers saved, sent to matching" time="2:16 AM" tone="green" className="absolute -right-14 -bottom-7" />}
    </UiCard>
  )
}

function MatchScene({ b }: { b: number }) {
  return (
    <div className="relative">
      <UiCard className="w-100 p-5">
        <Label>Matched lawyer</Label>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-(--accent) text-[14px] font-bold text-white">PS</span>
          <div>
            <p className="text-[16px] font-bold">Priya Sharma</p>
            <p className="text-[12px] text-white/55">Licensed in TX · available · best rear-end record</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-white/10 px-3 py-2.5">
          <p className="text-[13px] font-semibold">Maria Alvarez · Auto accident</p>
          <p className="text-[11.5px] text-white/50">Rear-end · Austin, TX · Injury: moderate</p>
        </div>
        <div className="mt-4 flex gap-2">
          <span className={`rounded-md border px-4 py-1.5 text-[12px] font-bold transition-colors duration-300 ${b >= 2 ? "border-(--accent) bg-(--accent) text-white" : "border-white/30"}`}>Accept</span>
          <span className="rounded-md border border-white/15 px-4 py-1.5 text-[12px] font-bold text-white/45">Decline</span>
        </div>
        <div className="mt-4 h-8 border-t border-white/10 pt-3">
          {b >= 2 && <LogLine time="2:17 AM">Conflict check clear</LogLine>}
        </div>
      </UiCard>
      {b >= 1 && b <= 2 && (
        <div className="absolute -top-8 -right-14 w-60 animate-slide-in rounded-2xl border border-white/15 bg-[#1d1d21] px-4 py-3 shadow-2xl shadow-black/60">
          <p className="flex justify-between text-[10px] uppercase tracking-wider text-white/45"><span>Text to Priya</span><span>now</span></p>
          <p className="mt-1 text-[13px] leading-snug">New lead matched to you. Review it on your Leads page.</p>
        </div>
      )}
      {b >= 3 && <EventCard icon={FolderPlus} title="Case #2611 opened" detail="Retainer emailed to Maria for e-signature" time="2:17 AM" tone="blue" className="absolute -bottom-8 -left-14" />}
    </div>
  )
}

function CaseScene({ b }: { b: number }) {
  const events = [["Urgent care visit", "Mar 4"], ["MRI, cervical spine", "Mar 11"], ["Physical therapy × 14", "Mar 18 – May 20"]]
  return (
    <div className="relative w-170">
      <div className="grid grid-cols-3 gap-3">
        <UiCard className="p-4">
          <Label>Retainer</Label>
          <p className="mt-2 text-[13.5px]">Firm fee agreement</p>
          {b >= 1 ? (
            <div className="animate-fade-in">
              <p className="mt-1 font-serif text-[24px] leading-none italic">Maria Alvarez</p>
              <p className="mt-1 border-t border-white/15 pt-1 text-[11px] text-white/50">Signed Mar 9 via DocuSign</p>
            </div>
          ) : (
            <p className="mt-2 text-[12px] text-white/50">Out for signature</p>
          )}
        </UiCard>
        <UiCard className="p-4">
          <Label>Statute of limitations</Label>
          {b >= 2 ? (
            <div className="animate-fade-in">
              <p className="mt-2 text-[20px] font-bold">Mar 3, 2028</p>
              <p className="text-[11px] text-white/50">Entered by Priya Sharma · reminders on</p>
            </div>
          ) : (
            <p className="mt-2 text-[12.5px] text-white/55">Suggested date, waiting for the lawyer</p>
          )}
        </UiCard>
        <UiCard className="p-4">
          <Label>Medical events</Label>
          <div className="mt-1.5 divide-y divide-white/10">
            {events.slice(0, b >= 3 ? 3 : 0).map(([what, when], i) => (
              <div key={what} className="flex animate-fade-in justify-between gap-2 py-1.5 text-[11px] opacity-0" style={{ animationDelay: `${i * 160}ms` }}>
                <span>{what}</span>
                <span className="shrink-0 text-white/45">{when}</span>
              </div>
            ))}
          </div>
        </UiCard>
      </div>
      <div className="mt-5 flex h-16 justify-center">
        {b >= 4 && <EventCard icon={Stethoscope} title="Treatment chronology drafted" detail="From 3 medical events, ready to review" time="May 21" tone="blue" />}
      </div>
    </div>
  )
}

function DemandScene({ b }: { b: number }) {
  return (
    <div className="relative w-90 -rotate-2 rounded-md border-t-4 border-(--accent) bg-[#fbfaf7] px-7 py-5 text-black shadow-2xl shadow-black/60">
      <p className="font-serif text-[24px] leading-none">Hale &amp; Ortiz</p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/50">Personal injury law · Austin, TX</p>
      <p className="mt-3 text-[11.5px]"><b>Re:</b> Maria Alvarez · Date of loss Mar 3, 2026</p>
      <div className="mt-2.5 h-48 space-y-2.5 text-[11.5px] leading-snug">
        {b >= 1 && (
          <div className="animate-fade-in">
            <p className="text-[9.5px] font-bold uppercase tracking-wider text-black/50">Injuries and treatment</p>
            <p>Urgent care, cervical MRI and 14 physical therapy sessions. Medical specials: $9,420.</p>
          </div>
        )}
        {b >= 2 && (
          <div className="animate-fade-in">
            <p className="text-[9.5px] font-bold uppercase tracking-wider text-black/50">Liability</p>
            <p>Your insured struck Ms. Alvarez&apos;s stopped vehicle from behind on I-35 and was cited at the scene. Texas courts have consistently held following drivers liable in comparable collisions…</p>
          </div>
        )}
        {b >= 3 && <p className="animate-fade-in border-t border-black/15 pt-2 text-[13px]"><b>Demand:</b> $55,000</p>}
      </div>
      {b >= 4 && <EventCard icon={Send} title="Demand sent" detail="To Lone Star Mutual, adjuster copied" time="Jun 2" tone="blue" className="absolute -right-24 -bottom-8 rotate-2" />}
    </div>
  )
}

function SettleScene({ b }: { b: number }) {
  const offers: [string, string][] = [["Insurer offer", "$22,000"], ["Firm counter-offer", "$50,000"], ["Insurer offer · agreed", "$48,000"]]
  const statement: [string, string][] = [["Gross settlement", "$48,000"], ["Fee (33⅓%)", "−$16,000"], ["Case costs", "−$1,240"], ["Medical liens", "−$6,180"]]

  return (
    <UiCard className="relative w-105 p-5">
      <Label>Negotiation</Label>
      <div className="mt-1.5 divide-y divide-white/10">
        {offers.slice(0, Math.min(3, b + 1)).map(([who, amount]) => (
          <div key={who} className="flex animate-fade-in justify-between py-1.5 text-[13px]">
            <span className="text-white/65">{who}</span>
            <span className="font-semibold">{amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 h-32">
        {b >= 3 && (
          <div className="animate-fade-in">
            <Label>Settlement statement</Label>
            <div className="mt-1.5 text-[12.5px]">
              {statement.map(([k, v]) => (
                <div key={k} className="flex justify-between py-0.5"><span className="text-white/60">{k}</span><span>{v}</span></div>
              ))}
              <div className="mt-1 flex justify-between border-t border-white/15 pt-1.5 text-[14px] font-bold"><span>Client net</span><span className="text-(--accent)">$24,580</span></div>
            </div>
          </div>
        )}
      </div>
      {b <= 1 && <EventCard icon={TrendingDown} title="Offer below estimate" detail="$22,000 against a $38k–$62k range" time="Jun 19" tone="red" className="absolute -top-8 -right-16" />}
      {b >= 4 && <EventCard icon={Receipt} title="Invoice INV-0318 issued" detail="$17,240, contingency fee and costs" time="Jul 8" tone="green" className="absolute -bottom-8 -left-16" />}
    </UiCard>
  )
}

// The case, scored: what the software did versus what the lawyer had to do
function EndScene() {
  const stats: [string, string][] = [
    ["4 sec", "to answer a 2 AM call"],
    ["3 min", "from first ring to a matched lawyer"],
    ["3", "decisions the lawyer made: accept, deadline, demand"],
  ]
  return (
    <div className="absolute top-20 right-8 bottom-24 left-54 flex flex-col justify-center">
      <Words text="First call to final invoice." className="font-serif text-[46px] leading-none" />
      <div className="mt-7 grid grid-cols-3 gap-6 border-t border-white/15 pt-5">
        {stats.map(([value, label], i) => (
          <div key={value} className="animate-word opacity-0" style={{ animationDelay: `${500 + i * 250}ms` }}>
            <p className="font-serif text-[44px] leading-none">{value}</p>
            <p className="mt-2 text-[12.5px] leading-snug text-white/60">{label}</p>
          </div>
        ))}
      </div>
      <Words text="Everything else, automated." delay={1400} className="mt-6 font-serif text-[30px] text-white/60 italic" />
      <div className="mt-6 flex animate-word items-center gap-4 opacity-0" style={{ animationDelay: "1900ms" }}>
        <span className="font-serif text-[26px] leading-none">Lawrora</span>
        <span className="rounded-full bg-white px-5 py-2 text-[14px] font-semibold text-black">Book a demo</span>
      </div>
    </div>
  )
}

/* ── Building blocks ────────────────────────────────────── */

// Word-by-word blur in
function Words({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="inline-block animate-word opacity-0" style={{ animationDelay: `${delay + i * 70}ms` }}>{w}</span>{" "}
        </span>
      ))}
    </span>
  )
}

// Card arrives out of a blur, then the "camera" slowly pushes in
function Drift({ children }: { children: ReactNode }) {
  return (
    <div className="animate-card opacity-0">
      <div className="animate-drift">{children}</div>
    </div>
  )
}

function UiCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-2xl border border-white/12 border-t-2 border-t-(--accent) bg-[#131316]/95 shadow-2xl shadow-black/50 ${className}`}>{children}</div>
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{children}</p>
}

// A row from the case activity log
function LogLine({ time, children }: { time: string; children: ReactNode }) {
  return (
    <p className="flex animate-fade-in items-baseline gap-3 text-[12.5px]">
      <span className="w-14 shrink-0 font-mono text-[11px] text-white/40">{time}</span>
      <span className="text-white/85">{children}</span>
    </p>
  )
}

// Green: done. Blue: the case moved forward. Red: needs the lawyer's attention.
const EVENT_TONES = {
  green: { card: "bg-[#e8f4ec] text-[#0c3a25] ring-[#1f7a4d]/15", icon: "bg-[#1f7a4d]" },
  blue:  { card: "bg-[#e9f0fb] text-[#0d2a52] ring-[#2459b8]/15", icon: "bg-[#2459b8]" },
  red:   { card: "bg-[#fbeceb] text-[#4a1414] ring-[#b42828]/15", icon: "bg-[#b42828]" },
}

// A notification that pops out over the product UI when something happens
function EventCard({ icon: Icon, title, detail, time, tone, className = "" }: {
  icon: LucideIcon; title: string; detail: string; time: string; tone: keyof typeof EVENT_TONES; className?: string
}) {
  const t = EVENT_TONES[tone]
  return (
    <div className={`z-10 flex w-72 animate-pop items-center gap-3 rounded-xl p-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ${t.card} ${className}`}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${t.icon}`}>
        <Icon size={17} strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[13px] font-semibold">{title}</p>
          <span className="shrink-0 font-mono text-[10px] opacity-50">{time}</span>
        </div>
        <p className="truncate text-[11.5px] opacity-70">{detail}</p>
      </div>
    </div>
  )
}

function Pill({ tone, children }: { tone?: "success"; children: ReactNode }) {
  return (
    <span
      className={`animate-fade-in rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
        tone === "success" ? "border-transparent bg-[#1f7a4d]/25 text-[#8fdcb0]" : "border-white/20 text-white/80"
      }`}
    >
      {children}
    </span>
  )
}
