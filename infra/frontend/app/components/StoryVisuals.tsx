import type { ReactNode } from "react"
import { Bell, Check, Search, type LucideIcon } from "lucide-react"

// Small animated pictures for the "How it works" steps. They sit on a dark panel,
// use the product's accent through --accent, and play their entrance once mounted.

const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

// Several ways in, all arriving at one place
export function ChannelsVisual({ channels, hub }: { channels: { icon: LucideIcon; label: string }[]; hub: string }) {
  return (
    <div className="flex w-full max-w-80 items-center gap-4">
      <div className="flex flex-col gap-2.5">
        {channels.map(({ icon: Icon, label }, i) => (
          <span key={label} className="flex animate-fade-in items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium opacity-0" style={delay(i * 200)}>
            <Icon size={13} strokeWidth={2} /> {label}
          </span>
        ))}
      </div>
      <div className="relative h-px flex-1 bg-white/20">
        <span className="absolute -top-1 left-0 h-2 w-2 animate-travel rounded-full bg-(--accent)" />
      </div>
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-(--accent) text-center text-[11px] font-semibold leading-tight text-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-(--accent) opacity-20" />
        <span className="relative">{hub}</span>
      </div>
    </div>
  )
}

// A short exchange, one bubble at a time
export function ChatVisual({ lines }: { lines: { from: "ai" | "client"; text: string }[] }) {
  return (
    <div className="flex w-full max-w-80 flex-col gap-2">
      {lines.map((l, i) => (
        <p
          key={i}
          className={`max-w-[85%] animate-fade-in rounded-2xl px-3.5 py-2 text-xs leading-snug opacity-0 ${
            l.from === "ai" ? "self-end rounded-br-md bg-(--accent) text-white" : "self-start rounded-bl-md bg-white/10 text-white/85"
          }`}
          style={delay(i * 450)}
        >
          {l.text}
        </p>
      ))}
    </div>
  )
}

// Something handed from one place to a person
export function RouteVisual({ from, to }: { from: { title: string; meta: string }; to: { initials: string; name: string; note: string } }) {
  return (
    <div className="flex w-full max-w-80 items-center gap-3">
      <div className="flex-1 animate-fade-in rounded-xl bg-white/10 px-3 py-2.5 opacity-0">
        <p className="text-xs font-semibold">{from.title}</p>
        <p className="mt-0.5 text-[10px] text-white/50">{from.meta}</p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--accent)" style={delay(i * 200)} />
        ))}
      </div>
      <div className="flex-1 animate-fade-in rounded-xl bg-white px-3 py-2.5 text-black opacity-0" style={delay(600)}>
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--accent) text-[9px] font-bold text-white">{to.initials}</span>
          <p className="text-xs font-semibold leading-none">{to.name}</p>
        </div>
        <p className="mt-1.5 text-[10px] text-black/55">{to.note}</p>
      </div>
    </div>
  )
}

// A list that ticks itself off
export function ChecklistVisual({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="w-full max-w-72 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => (
          <li key={item} className="flex animate-fade-in items-center gap-2.5 text-xs opacity-0" style={delay(i * 350)}>
            <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-(--accent) text-white"><Check size={10} strokeWidth={3.5} /></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// People or options ranked against each other
export function ScoreVisual({ rows }: { rows: { name: string; note: string; pct: number }[] }) {
  return (
    <div className="w-full max-w-80 space-y-2.5">
      {rows.map((r, i) => (
        <div key={r.name} className={`animate-fade-in rounded-xl px-3 py-2.5 opacity-0 ${i === 0 ? "bg-white text-black" : "bg-white/10"}`} style={delay(i * 250)}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold leading-none">{r.name}</p>
              <p className={`mt-1 text-[10px] ${i === 0 ? "text-black/50" : "text-white/45"}`}>{r.note}</p>
            </div>
            <p className={`text-xs font-bold tabular-nums ${i === 0 ? "text-(--accent)" : "text-white/60"}`}>{r.pct}%</p>
          </div>
          <div className={`mt-2 h-1 overflow-hidden rounded-full ${i === 0 ? "bg-black/10" : "bg-white/10"}`}>
            <div className="h-full origin-left animate-bar rounded-full bg-(--accent)" style={{ width: `${r.pct}%`, ...delay(i * 250 + 200) }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// A message landing on someone's phone
export function AlertVisual({ from, text, time }: { from: string; text: string; time: string }) {
  return (
    <div className="w-full max-w-72">
      <div className="mx-auto h-44 w-full rounded-[1.75rem] border border-white/15 bg-white/5 p-3">
        <p className="text-center font-serif text-3xl leading-none text-white/80">{time}</p>
        <div className="mt-4 flex animate-slide-in items-start gap-2.5 rounded-2xl bg-white px-3 py-2.5 text-black opacity-0" style={delay(300)}>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--accent) text-white"><Bell size={13} strokeWidth={2} /></span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-black/50">{from}</p>
            <p className="text-xs font-medium leading-snug">{text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// A page filling in, with an optional stamp at the end
export function DocVisual({ title, lines, stamp }: { title: string; lines: string[]; stamp?: string }) {
  return (
    <div className="relative w-full max-w-64 -rotate-2 rounded-lg bg-[#fbfaf7] px-5 py-4 text-black shadow-xl">
      <p className="font-serif text-lg leading-none">{title}</p>
      <div className="mt-3 space-y-1.5">
        {lines.map((l, i) => (
          <p key={i} className="animate-fade-in text-[10px] leading-snug text-black/70 opacity-0" style={delay(i * 300)}>{l}</p>
        ))}
      </div>
      {stamp && (
        <span className="absolute -right-3 -bottom-3 animate-pop rounded-full bg-(--accent) px-3 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg" style={delay(lines.length * 300 + 200)}>
          {stamp}
        </span>
      )}
    </div>
  )
}

// A search with results arriving
export function SearchVisual({ query, results }: { query: string; results: { title: string; note: string }[] }) {
  return (
    <div className="w-full max-w-80 space-y-2">
      <div className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs">
        <Search size={13} strokeWidth={2} className="text-white/50" />
        <span className="truncate">{query}</span>
        <span className="h-3.5 w-px animate-pulse bg-white" />
      </div>
      {results.map((r, i) => (
        <div key={r.title} className="animate-fade-in rounded-xl bg-white/5 px-3.5 py-2 opacity-0 ring-1 ring-white/10" style={delay(400 + i * 300)}>
          <p className="text-xs font-semibold">{r.title}</p>
          <p className="mt-0.5 text-[10px] text-white/50">{r.note}</p>
        </div>
      ))}
    </div>
  )
}

// A month with the important days marked
export function CalendarVisual({ month, marks }: { month: string; marks: { day: number; label: string }[] }) {
  const marked = new Map(marks.map((m) => [m.day, m.label]))
  return (
    <div className="flex w-full max-w-80 gap-4">
      <div className="w-40 shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">{month}</p>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
            <span
              key={d}
              className={`flex aspect-square items-center justify-center rounded text-[9px] ${marked.has(d) ? "animate-pop bg-(--accent) font-bold text-white opacity-0" : "text-white/40"}`}
              style={marked.has(d) ? delay([...marked.keys()].indexOf(d) * 300) : undefined}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <ul className="flex-1 space-y-2 pt-5">
        {marks.map((m, i) => (
          <li key={m.day} className="animate-fade-in text-[10px] leading-snug opacity-0" style={delay(i * 300 + 150)}>
            <span className="font-bold text-(--accent)">{m.day}</span> <span className="text-white/75">{m.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// A case as it appears in the file
export function CaseVisual({ title, meta, tags }: { title: string; meta: string; tags: string[] }) {
  return (
    <div className="w-full max-w-72 animate-fade-in rounded-2xl bg-white p-4 text-black opacity-0">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40">Case file</p>
      <p className="mt-2 text-sm font-bold">{title}</p>
      <p className="text-[11px] text-black/55">{meta}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((t, i) => (
          <span key={t} className="animate-fade-in rounded-full border border-black/15 px-2 py-0.5 text-[10px] opacity-0" style={delay(300 + i * 200)}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export function Stack({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-col items-center gap-3">{children}</div>
}
