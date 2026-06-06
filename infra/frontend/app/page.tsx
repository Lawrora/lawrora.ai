import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  MessageSquare,
  Globe,
  ShieldCheck,
  Zap,
  CalendarCheck,
  Lock,
  ArrowRight,
  Scale,
  Users,
  FileText,
  Clock,
} from "lucide-react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WorkflowSection from "./components/WorkflowSection"
import DemoForm from "./components/DemoForm"
import FaqAccordion from "./components/FaqAccordion"

export const metadata: Metadata = {
  title: "AI Paralegal for Law Firms — Capture Leads, Match Clients, Draft Documents",
  description:
    "Lawrora captures every inbound lead 24/7, qualifies clients with AI, matches them to the right attorney, and drafts legal documents in seconds. HIPAA & SOC 2 compliant. Purpose-built for law firms.",
  alternates: { canonical: "https://lawrora.ai" },
}

const featureStrip = [
  { title: "Lead Capture",           desc: "Catches every inbound lead from call, text, and web, around the clock.",                             color: "bg-blue-500"    },
  { title: "AI Qualification",       desc: "Engages prospects in real time to assess case fit before any attorney time is spent.",               color: "bg-violet-500"  },
  { title: "Lawyer Matching",        desc: "Routes each lead to the right attorney by practice area and availability.",                          color: "bg-emerald-500" },
  { title: "Demand Letter Drafting", desc: "Generates first-draft demand letters from case facts in seconds, ready for attorney review.",        color: "bg-orange-500"  },
  { title: "Case Research",          desc: "Surfaces relevant precedents, statutes, and secondary sources in seconds.",                          color: "bg-amber-500"   },
  { title: "Strategy Guidance",      desc: "Suggests next steps and litigation approaches based on case facts.",                                 color: "bg-rose-500"    },
  { title: "Smart Scheduling",       desc: "Manages attorney calendars, deadlines, and client coordination automatically.",                      color: "bg-cyan-500"    },
]

const trustStats = [
  { value: "48 hrs",          label: "Average onboarding time"        },
  { value: "HIPAA + SOC 2",   label: "Enterprise-grade compliance"    },
  { value: "99.9%",           label: "Platform uptime SLA"            },
  { value: "24 / 7",          label: "AI lead coverage, zero gaps"    },
]

const featureCards = [
  {
    tag: "For the firm",
    title: "Lead Intelligence",
    desc: "AI captures every call, text, and web inquiry, qualifies the prospect in real time, and routes the right lead to the right attorney. No attorney picks up until the lead is scored.",
    bullets: ["24/7 multi-channel capture", "Live AI qualification", "Instant attorney routing"],
    accent: "bg-blue-500",
    icon: <Users size={18} strokeWidth={1.8} />,
  },
  {
    tag: "For the attorney",
    title: "Counsel AI",
    desc: "Inside every active matter, attorneys get AI-assisted research, relevant precedents, and suggested next steps. They spend their time on judgment, not search.",
    bullets: ["Case law & statute research", "Strategy suggestions", "Pre-built case briefs"],
    accent: "bg-violet-500",
    icon: <Scale size={18} strokeWidth={1.8} />,
  },
  {
    tag: "For the case",
    title: "Draft AI",
    desc: "Generates demand letters, retainer agreements, and filing drafts straight from case facts. First drafts are ready in seconds and formatted for attorney review.",
    bullets: ["Demand letter generation", "Retainer & agreement drafts", "Filing and motion templates"],
    accent: "bg-orange-500",
    icon: <FileText size={18} strokeWidth={1.8} />,
  },
  {
    tag: "For the practice",
    title: "Smart Scheduling",
    desc: "Schedule AI tracks every calendar event, filing deadline, and time entry automatically. Every matter stays on track without admin overhead.",
    bullets: ["Deadline & calendar sync", "Conflict detection", "Automated time tracking"],
    accent: "bg-emerald-500",
    icon: <Clock size={18} strokeWidth={1.8} />,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E2C]">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-28 pb-0 px-8" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-135">

          {/* Left */}
          <div className="py-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-[#FCF9EA] text-[#0E0E2C]/60 px-3 py-1.5 rounded-full mb-6">
              <Scale size={11} strokeWidth={2.5} />
              Your AI Paralegal
            </span>

            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
            >
              Every Lead Routed.<br />Every Case Prepared.
            </h1>

            <p className="text-base text-[#0E0E2C]/60 leading-relaxed mb-8 max-w-lg">
              Lawrora is your AI paralegal. It captures leads, qualifies them, drafts demand letters and documents, and routes each client to the right attorney — then keeps working inside the case.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-[#0E0E2C] px-7 py-3 text-sm font-semibold text-white hover:bg-[#0E0E2C]/85 transition-all duration-200 hover:-translate-y-0.5 animate-pulse-ring"
              >
                Book a Demo
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-[#0E0E2C]/15 bg-white px-7 py-3 text-sm font-semibold text-[#0E0E2C] hover:border-[#0E0E2C]/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                See products
              </Link>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                { icon: <ShieldCheck size={13} strokeWidth={2.5} className="text-emerald-500" />, text: "HIPAA & SOC 2 compliant" },
                { icon: <Zap size={13} strokeWidth={2.5} className="text-amber-500" />,          text: "Live in 48 hours"         },
                { icon: <Users size={13} strokeWidth={2.5} className="text-blue-500" />,          text: "Right attorney, every time" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-medium text-[#0E0E2C]/60">
                  {icon}
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: lead flow diagram */}
          <div className="hidden md:flex flex-col items-center justify-center bg-[#0E0E2C] rounded-2xl h-110 p-8 gap-5 relative overflow-hidden">
            {/* Subtle background shimmer */}
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />

            {/* Channels */}
            <div className="flex gap-3 relative z-10">
              {[
                { label: "Call",  icon: <Phone  size={11} strokeWidth={2} /> },
                { label: "Text",  icon: <MessageSquare size={11} strokeWidth={2} /> },
                { label: "Web",   icon: <Globe  size={11} strokeWidth={2} /> },
              ].map(({ label, icon }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl bg-white/8 border border-white/10 px-4 py-2.5">
                  <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0 text-white/60">
                    {icon}
                  </span>
                  <span className="text-xs font-semibold text-white/70">{label}</span>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-0.5 relative z-10">
              <div className="w-px h-6 bg-white/15" />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* AI box */}
            <div className="flex items-center gap-3 rounded-2xl bg-[#FCF9EA] px-6 py-4 w-60 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-[#0E0E2C]/8 flex items-center justify-center shrink-0">
                <Scale size={16} strokeWidth={2} className="text-[#0E0E2C]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0E0E2C]">AI Qualifies &amp; Matches</p>
                <p className="text-[10px] text-[#0E0E2C]/50 mt-0.5">Scores, routes, and briefs</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-0.5 relative z-10">
              <div className="w-px h-6 bg-white/15" />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Outcome */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 w-60 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Users size={16} strokeWidth={2} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Right Attorney, Instantly</p>
                <p className="text-[10px] text-white/40 mt-0.5">Pre-qualified case brief ready</p>
              </div>
            </div>

            {/* Compliance badge */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold text-white/40 relative z-10">
              <ShieldCheck size={11} strokeWidth={2} className="text-emerald-400" />
              HIPAA &amp; SOC 2 Type II compliant
            </div>
          </div>

        </div>
      </section>

      {/* ── Feature strip ────────────────────────────────────── */}
      <section
        className="bg-[#F8F7F2] border-y border-[#0E0E2C]/6 py-8 mt-8 overflow-hidden"
        aria-label="Feature highlights"
      >
        <div className="flex animate-marquee w-max gap-16 px-8" aria-hidden="true">
          {[...featureStrip, ...featureStrip].map((f, i) => (
            <div key={i} className="flex items-start gap-3 w-55 shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${f.color}`} />
              <div>
                <p className="text-sm font-semibold text-[#0E0E2C]">{f.title}</p>
                <p className="text-xs text-[#0E0E2C]/50 mt-0.5 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust stats ──────────────────────────────────────── */}
      <section className="py-14 px-8 border-b border-[#0E0E2C]/6" aria-label="Key metrics">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span className="text-2xl md:text-3xl font-bold text-[#0E0E2C] tracking-tight">
                  {value}
                </span>
                <span className="text-xs text-[#0E0E2C]/45 leading-snug max-w-30">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────── */}
      <section className="py-20 px-8" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40 mb-3">
            AI Paralegal
          </p>
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-bold mb-12 max-w-xl leading-tight"
          >
            What your AI paralegal handles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((card) => (
              <article
                key={card.tag}
                className="rounded-2xl border border-[#0E0E2C]/8 bg-[#FCF9EA] p-8 flex flex-col gap-4 card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${card.accent}/10 flex items-center justify-center shrink-0 text-[#0E0E2C]/60`}>
                    {card.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/35">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="text-sm text-[#0E0E2C]/60 leading-relaxed">{card.desc}</p>
                <ul className="space-y-2 mt-auto pt-4 border-t border-[#0E0E2C]/8">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs font-medium text-[#0E0E2C]/70">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${card.accent}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Phase 1 ──────────────────────────────────────────── */}
      <section
        className="py-24 px-8 bg-[#0E0E2C] text-white"
        aria-labelledby="phase1-heading"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/8 text-white/50 px-3 py-1.5 rounded-full mb-6">
              Phase 1
            </span>
            <h2
              id="phase1-heading"
              className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl"
            >
              Built first for Personal Injury<br />and Real Estate
            </h2>
            <p className="text-white/50 mt-4 max-w-xl leading-relaxed text-sm">
              Two of the highest-volume, most time-sensitive practice areas. Lawrora is purpose-built for the specific intake, matching, and case workflows each one demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Personal Injury */}
            <article className="rounded-2xl border border-white/10 bg-white/4 p-8 card-hover hover:border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} strokeWidth={1.8} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-white/35">Practice Area</p>
                  <h3 className="text-lg font-bold">Personal Injury</h3>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "AI screens injury claims 24/7 across call, text, and web",
                  "Liability and case value scored before the first attorney call",
                  "Auto-routes to the right injury attorney by case type",
                  "Medical records and evidence checklist generated instantly",
                  "Relevant precedents surfaced before the intake meeting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            {/* Real Estate */}
            <article className="rounded-2xl border border-white/10 bg-white/4 p-8 card-hover hover:border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <FileText size={18} strokeWidth={1.8} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-white/35">Practice Area</p>
                  <h3 className="text-lg font-bold">Real Estate</h3>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Transaction intake captured from any channel in minutes",
                  "Contract review with AI-flagged risk clauses highlighted",
                  "Deadline and contingency tracking across all open matters",
                  "Matches clients to the right transactional attorney instantly",
                  "Jurisdiction-specific forms drafted and ready to review",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

          </div>
        </div>
      </section>

      <WorkflowSection />

      {/* ── Compliance trust bar ─────────────────────────────── */}
      <section className="py-12 px-8 bg-[#F8F7F2] border-y border-[#0E0E2C]/6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/35 text-center mb-8">
            Enterprise security &amp; compliance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <ShieldCheck size={14} strokeWidth={2} className="text-emerald-500" />, label: "HIPAA Compliant",                 sub: "PHI protected at rest & transit" },
              { icon: <ShieldCheck size={14} strokeWidth={2} className="text-blue-500" />,    label: "SOC 2 Type II Certified",          sub: "Annual third-party audit"         },
              { icon: <Lock       size={14} strokeWidth={2} className="text-violet-500" />,   label: "AES-256 Encryption",              sub: "All data encrypted at rest"       },
              { icon: <ShieldCheck size={14} strokeWidth={2} className="text-amber-500" />,   label: "Zero Model Training",             sub: "Your data stays yours"            },
              { icon: <CalendarCheck size={14} strokeWidth={2} className="text-rose-500" />,  label: "BAA Available",                   sub: "Business Associate Agreements"    },
            ].map(({ icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-[#0E0E2C]/10 bg-white px-5 py-3.5"
              >
                {icon}
                <div>
                  <p className="text-xs font-semibold text-[#0E0E2C]">{label}</p>
                  <p className="text-[10px] text-[#0E0E2C]/45 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-8 bg-[#FCF9EA]" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40 mb-3">FAQ</p>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Frequently Asked Questions
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Demo request ─────────────────────────────────────── */}
      <section id="demo" className="py-24 px-8 bg-[#0E0E2C] text-white" aria-labelledby="demo-heading">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="md:sticky md:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Book a demo
            </p>
            <h2
              id="demo-heading"
              className="text-3xl md:text-4xl font-bold leading-tight mb-6"
            >
              See exactly what Lawrora can do for your firm in 30 minutes.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              No slides. No sales pitch. We&apos;ll run Lawrora live on a real workflow and show you what changes for your team from day one.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                { icon: <Zap         size={16} strokeWidth={2} className="text-amber-400 shrink-0 mt-0.5" />,          text: "Live walkthrough tailored to your practice area" },
                { icon: <Lock        size={16} strokeWidth={2} className="text-violet-400 shrink-0 mt-0.5" />,          text: "HIPAA & SOC 2 compliant. Your data stays yours." },
                { icon: <CalendarCheck size={16} strokeWidth={2} className="text-emerald-400 shrink-0 mt-0.5" />,       text: "Set up in under 48 hours. No IT team required."  },
                { icon: <MessageSquare size={16} strokeWidth={2} className="text-blue-400 shrink-0 mt-0.5" />,          text: "Ask anything. Our team answers every question on the call." },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/75">
                  {icon}
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: <ShieldCheck size={12} strokeWidth={2} className="text-emerald-400" />, label: "HIPAA Compliant" },
                { icon: <ShieldCheck size={12} strokeWidth={2} className="text-blue-400" />,    label: "SOC 2 Type II"   },
                { icon: <Lock        size={12} strokeWidth={2} className="text-violet-400" />,   label: "Encrypted"       },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/50">
                  {icon}
                  {label}
                </div>
              ))}
            </div>

            <p className="text-xs text-white/25 italic mt-6">
              Firms that book a demo typically go live within one week.
            </p>
          </div>

          {/* Right: form */}
          <DemoForm />

        </div>
      </section>

      <Footer />
    </main>
  )
}
