"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import {
  ArrowUpRight, BarChart3, BookOpen, CalendarCheck, FileText, LayoutDashboard, MessageSquare, MessagesSquare,
  PenLine, Phone, PhoneCall, ShieldCheck, Smartphone, Stethoscope, UserCheck, type LucideIcon,
} from "lucide-react"
import { CounselAIDemo, DraftAIDemo, LeadAIDemo, MatchAIDemo, ScheduleAIDemo } from "./ProductDemos"
import { ConflictDemo, MessagesDemo, OverviewDemo, PhoneIntakeDemo, ReportsDemo } from "./AdminDemos"
import { ClientCallDemo, ClientCheckInDemo, ClientPortalDemo, ClientSignDemo, ClientTextDemo } from "./ClientDemos"

// What Lawrora does, told down the page for the reader's role: a lawyer follows one
// case, a firm admin follows a week, and a client sees their side of the same case. Each step slides in from alternating sides as
// you scroll, paired with a demo of that screen.

type Step = {
  time: string
  product: string
  icon: LucideIcon
  href: string
  linkLabel?: string
  title: string
  desc: string
  demo: ReactNode
}

const LAWYER_STEPS: Step[] = [
  {
    time: "Sat, 2:14 AM", product: "Lead AI", icon: Phone, href: "/products/lead-ai", demo: <LeadAIDemo />,
    title: "Every call answered. Qualified by morning.",
    desc: "The AI answers your intake line in seconds, day or night, asks the questions a trained intake specialist would and saves every answer as it is given. The filing deadline is checked before the call ends.",
  },
  {
    time: "Sat, 2:17 AM", product: "Match AI", icon: UserCheck, href: "/products/match-ai", demo: <MatchAIDemo />,
    title: "The right lawyer, before another firm calls back.",
    desc: "Qualified leads go to the lawyer who is licensed in the state, available and has the best record on that kind of case. They get a text straight away, and accepting runs a conflict check and sends your retainer.",
  },
  {
    time: "Sat, 2:18 AM", product: "Counsel AI", icon: BookOpen, href: "/products/counsel-ai", demo: <CounselAIDemo />,
    title: "Comparable cases, found before Monday.",
    desc: "While everyone sleeps, comparable court opinions are pulled and read, so the lawyer opens the file to the case law, likely outcomes and suggested next steps, all with citations.",
  },
  {
    time: "From Mar 9", product: "Schedule AI", icon: CalendarCheck, href: "/products/schedule-ai", demo: <ScheduleAIDemo />,
    title: "Every deadline on the calendar. None missed.",
    desc: "Once the retainer is signed, the statute of limitations, filings and client follow-ups are tracked for you, with reminders from 180 days out to the day before.",
  },
  {
    time: "Tue, Jun 2", product: "Draft AI", icon: FileText, href: "/products/draft-ai", demo: <DraftAIDemo />,
    title: "A demand letter, drafted from the file.",
    desc: "Letterhead, injuries and damages are filled in from the case, and the liability narrative is drafted using comparable cases. Your lawyer edits, approves and sends.",
  },
]

const ADMIN_STEPS: Step[] = [
  {
    time: "Mon, 8:00 AM", product: "Overview", icon: LayoutDashboard, href: "/products/lead-ai", linkLabel: "Explore Lead AI", demo: <OverviewDemo />,
    title: "The weekend, already handled.",
    desc: "Open the portal on Monday to every call and text from the weekend answered, qualified and booked. Nothing in the voicemail, and only the calls that truly need a person are waiting for you.",
  },
  {
    time: "Mon, 8:05 AM", product: "AI Phone Intake", icon: PhoneCall, href: "/products/lead-ai", linkLabel: "Explore Lead AI", demo: <PhoneIntakeDemo />,
    title: "Every call transcribed and sorted.",
    desc: "Each phone and text conversation is saved in full, with its progress, consent and outcome. Ask the AI to call or text a lead back with one click.",
  },
  {
    time: "Mon, 9:30 AM", product: "Leads", icon: ShieldCheck, href: "/products/match-ai", linkLabel: "Explore Match AI", demo: <ConflictDemo />,
    title: "Accept with a conflict check, every time.",
    desc: "Every lead from every channel in one list, already matched to a lawyer. Accepting checks for conflicts of interest, opens the case and sends your own retainer for signature.",
  },
  {
    time: "Wed, 2:00 PM", product: "Messages", icon: MessagesSquare, href: "/products/schedule-ai", linkLabel: "Explore Schedule AI", demo: <MessagesDemo />,
    title: "Clients updated without a phone call.",
    desc: "Chat and text from every client land in one inbox per case, and treatment check-in texts go out on the schedule you set, so nobody has to chase anyone.",
  },
  {
    time: "Fri, 4:00 PM", product: "Reports", icon: BarChart3, href: "/products", linkLabel: "Explore all products", demo: <ReportsDemo />,
    title: "Know exactly what is working.",
    desc: "Conversion from lead to signed client, cases and settlements this year, intake sources and an activity log of every change anyone in the firm made.",
  },
]

const CLIENT_STEPS: Step[] = [
  {
    time: "Sat, 2:14 AM", product: "The call", icon: Phone, href: "/products/lead-ai", linkLabel: "Explore Lead AI", demo: <ClientCallDemo />,
    title: "Someone picks up at 2 AM.",
    desc: "No voicemail and no call-back queue. Your client is answered in seconds, asked the right questions one at a time, and can ask for a person whenever they like.",
  },
  {
    time: "Sat, 2:17 AM", product: "The follow-up", icon: MessageSquare, href: "/products/match-ai", linkLabel: "Explore Match AI", demo: <ClientTextDemo />,
    title: "They know exactly what happens next.",
    desc: "A text confirms who their lawyer is and when they will call. If anything changes, they reply to the same thread, any time of day.",
  },
  {
    time: "Mon, 9:24 AM", product: "The agreement", icon: PenLine, href: "/products/draft-ai", linkLabel: "Explore Draft AI", demo: <ClientSignDemo />,
    title: "Signed from their phone, in a minute.",
    desc: "Your own fee agreement arrives for e-signature as soon as the case is accepted. No printing, no scanning, no trip to the office.",
  },
  {
    time: "Every few days", product: "Check-ins", icon: Stethoscope, href: "/products/schedule-ai", linkLabel: "Explore Schedule AI", demo: <ClientCheckInDemo />,
    title: "Updates without anyone chasing.",
    desc: "A short text asks whether they are still treating and about any new providers or bills. They reply, or upload a document, and it goes straight into the case.",
  },
  {
    time: "Any time", product: "Client portal", icon: Smartphone, href: "/products", linkLabel: "Explore all products", demo: <ClientPortalDemo />,
    title: "Their case, one tap away.",
    desc: "Clients sign in to see where their case stands, who their lawyer is and whether the agreement is signed, and to message the firm or add documents.",
  },
]

const ROLES = {
  lawyer: {
    label: "Lawyer",
    title: <>From the first call to the <em>demand letter.</em></>,
    intro: "Follow one personal injury case through Lawrora. Every step below runs on its own, and you step in only where your judgment matters.",
    steps: LAWYER_STEPS,
  },
  admin: {
    label: "Firm Admin",
    title: <>Run the firm, <em>not the inbox.</em></>,
    intro: "Follow one week at the front desk. Intake, conflicts, client updates and reporting take care of themselves, and you see all of it from one place.",
    steps: ADMIN_STEPS,
  },
  client: {
    label: "Client",
    title: <>No hold music. <em>No phone tag.</em></>,
    intro: "Follow Maria from her first call at 2 AM to checking her case from her phone. This is what your clients experience when your firm runs on Lawrora.",
    steps: CLIENT_STEPS,
  },
}

type Role = keyof typeof ROLES

export default function CaseFlow() {
  const [role, setRole] = useState<Role>("lawyer")
  const view = ROLES[role]

  return (
    <section className="bg-linear-to-b from-[#c2c2c2] via-[#d6d6d6] to-[#e8e8e8] text-black pt-28 pb-28 overflow-hidden" aria-labelledby="case-flow-heading">
      <div className="mx-auto max-w-400 w-full px-4 md:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/55">What we provide</p>
          <h2 id="case-flow-heading" className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
            {view.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-black/70">{view.intro}</p>

          {/* Role switch */}
          <div className="mt-12 flex flex-col items-center gap-5">
            <p className="font-serif text-3xl md:text-4xl leading-none tracking-tight">Which one are you?</p>
            <div role="tablist" aria-label="Your role" className="inline-flex rounded-full bg-black/10 p-1.5">
              {(Object.keys(ROLES) as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  role="tab"
                  aria-selected={role === r}
                  onClick={() => setRole(r)}
                  className={`rounded-full px-8 py-3.5 text-base md:px-10 md:py-4 md:text-lg font-semibold transition-colors duration-200 ${role === r ? "bg-black text-white" : "text-black/60 hover:text-black"}`}
                >
                  {ROLES[r].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Remount per role so the line and reveals start over */}
        <FlowList key={role} steps={view.steps} />
      </div>
    </section>
  )
}

// Gap between panels, and how far outside a panel's edge the line runs
const GAP = 96
const OUTSET = 24
const RADIUS = 28

type Box = { top: number; bottom: number; left: number; right: number }

// The line: from the top centre, down the left edge of panel 1, across the gap,
// down the right edge of panel 2, across again, and so on, ending at the bottom centre
function flowPath(boxes: Box[], width: number) {
  if (boxes.length === 0) return ""
  const cx = width / 2
  const pts: [number, number][] = []
  boxes.forEach((box, i) => {
    const x = i % 2 === 0 ? box.left - OUTSET : box.right + OUTSET
    const top = i === 0 ? box.top - GAP / 2 : (boxes[i - 1].bottom + box.top) / 2
    const bottom = i === boxes.length - 1 ? box.bottom + GAP / 2 : (box.bottom + boxes[i + 1].top) / 2
    if (i === 0) pts.push([cx, top])
    pts.push([x, top], [x, bottom])
  })
  pts.push([cx, pts[pts.length - 1][1]])

  // Straight runs with rounded corners
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1]
    const [x, y] = pts[i]
    const [nx, ny] = pts[i + 1]
    const r1 = Math.min(RADIUS, Math.hypot(x - px, y - py) / 2)
    const r2 = Math.min(RADIUS, Math.hypot(nx - x, ny - y) / 2)
    const inX = x - Math.sign(x - px) * r1
    const inY = y - Math.sign(y - py) * r1
    const outX = x + Math.sign(nx - x) * r2
    const outY = y + Math.sign(ny - y) * r2
    d += ` L ${inX} ${inY} Q ${x} ${y} ${outX} ${outY}`
  }
  const [lx, ly] = pts[pts.length - 1]
  return `${d} L ${lx} ${ly}`
}

function FlowList({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState({ d: "", w: 0, h: 0, crossings: [] as number[] })
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  // Trace the path around the panels whenever the layout changes
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const origin = list.getBoundingClientRect()
      const boxes = Array.from(list.querySelectorAll<HTMLElement>("[data-flow-box]")).map((el) => {
        const r = el.getBoundingClientRect()
        return { top: r.top - origin.top, bottom: r.bottom - origin.top, left: r.left - origin.left, right: r.right - origin.left }
      })
      const crossings = boxes.slice(1).map((box, i) => (boxes[i].bottom + box.top) / 2)
      setGeo({ d: flowPath(boxes, origin.width), w: origin.width, h: origin.height, crossings })
    }
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    list.querySelectorAll("[data-flow-box]").forEach((el) => ro.observe(el))
    return () => ro.disconnect()
  }, [])

  // Draw the line as the page scrolls. An icon badge rides its leading end and,
  // as it crosses the gap into the next card, turns into that card's icon
  useEffect(() => {
    const list = listRef.current
    const path = pathRef.current
    const head = headRef.current
    if (!list || !path || !head || !geo.d) return
    const len = path.getTotalLength()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    path.style.strokeDasharray = `${len}`
    let frame = 0
    const update = () => {
      frame = 0
      const r = list.getBoundingClientRect()
      const progress = reduced ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height))
      path.style.strokeDashoffset = `${len * (1 - progress)}`
      const p = path.getPointAtLength(len * progress)
      head.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`
      head.style.opacity = progress > 0 && progress < 1 ? "1" : "0"
      const idx = geo.crossings.filter((y) => p.y >= y).length
      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActive(idx)
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [geo])

  return (
    <ol ref={listRef} className="relative mt-16 flex flex-col px-8 md:px-12" style={{ gap: GAP, paddingTop: GAP / 2 + 8, paddingBottom: GAP / 2 + 8 }}>
      <svg className="pointer-events-none absolute inset-0 overflow-visible" width={geo.w} height={geo.h} aria-hidden="true">
        <path ref={pathRef} d={geo.d} fill="none" stroke="#000" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div
        ref={headRef}
        className="pointer-events-none absolute top-0 left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/30 ring-4 ring-[#d6d6d6] transition-opacity duration-300"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <HeadIcon key={active} icon={steps[Math.min(active, steps.length - 1)].icon} />
      </div>
      {steps.map((step, i) => (
        <FlowRow key={step.time} step={step} index={i} />
      ))}
    </ol>
  )
}

function HeadIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="animate-icon-morph">
      <Icon size={19} strokeWidth={1.9} />
    </span>
  )
}

function FlowRow({ step, index }: { step: Step; index: number }) {
  const flip = index % 2 === 1
  const ref = useRef<HTMLLIElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const from = flip ? "lg:translate-x-10" : "lg:-translate-x-10"
  const fromOther = flip ? "lg:-translate-x-10" : "lg:translate-x-10"

  return (
    <li
      ref={ref}
      data-flow-box
      className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-4xl bg-[#0a0a0a] px-6 py-12 text-white shadow-2xl shadow-black/25 ring-1 ring-white/5 md:px-14 md:py-18 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-24"
    >
      {/* Soft light behind the copy */}
      <span
        className={`pointer-events-none absolute -top-1/3 h-[140%] w-[60%] rounded-full bg-white/6 blur-3xl ${flip ? "-right-1/4" : "-left-1/4"}`}
        aria-hidden="true"
      />

      <div
        className={`relative transition-all duration-700 ease-out ${flip ? "lg:order-2" : ""} ${revealed ? "translate-x-0 translate-y-0 opacity-100" : `translate-y-8 opacity-0 lg:translate-y-0 ${from}`}`}
      >
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
          <span className="font-mono tracking-normal text-white/35">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-white/25" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
            <step.icon size={14} strokeWidth={2} />
          </span>
          {step.product}
        </div>
        <p className="mt-6 font-serif text-5xl md:text-7xl leading-none tracking-tight">{step.time}</p>
        <h3 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight leading-tight">{step.title}</h3>
        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/65">{step.desc}</p>
        <Link href={step.href} className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-200">
          {step.linkLabel ?? `Explore ${step.product}`}
          <ArrowUpRight size={15} strokeWidth={2} />
        </Link>
      </div>

      <div
        className={`relative flex min-h-88 flex-col justify-center transition-all lg:min-h-112 delay-150 duration-700 ease-out ${flip ? "lg:order-1" : ""} ${revealed ? "translate-x-0 translate-y-0 opacity-100" : `translate-y-8 opacity-0 lg:translate-y-0 ${fromOther}`}`}
      >
        {/* The product page demos are sized for a half-width hero; scale them up here */}
        <div className="lg:[zoom:1.2]">{step.demo}</div>
      </div>
    </li>
  )
}
