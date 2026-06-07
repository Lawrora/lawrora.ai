import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  ShieldCheck,
  Zap,
  CalendarCheck,
  Lock,
  Scale,
  ArrowRight,
  Users,
  FileText,
  Clock,
  Bot,
  UserCheck,
  Search,
  Lightbulb,
} from "lucide-react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WorkflowSection from "./components/WorkflowSection"
import FaqAccordion from "./components/FaqAccordion"

export const metadata: Metadata = {
  title: "AI Paralegal for Law Firms — Capture Leads, Match Clients, Draft Documents",
  description:
    "Lawrora captures every inbound lead 24/7, qualifies clients with AI, matches them to the right attorney, and drafts legal documents in seconds. HIPAA & SOC 2 compliant. Purpose-built for law firms.",
  alternates: { canonical: "https://lawrora.ai" },
}

const featureStrip = [
  { title: "Lead Capture",           desc: "Catches every inbound lead from call, text, and web, around the clock.",                      iconBg: "bg-blue-500/12",    iconColor: "text-blue-600",    icon: <Phone       size={15} strokeWidth={1.8} /> },
  { title: "AI Qualification",       desc: "Engages prospects in real time to assess case fit before any attorney time is spent.",        iconBg: "bg-violet-500/12",  iconColor: "text-violet-600",  icon: <Bot         size={15} strokeWidth={1.8} /> },
  { title: "Lawyer Matching",        desc: "Routes each lead to the right attorney by practice area and availability.",                  iconBg: "bg-emerald-500/12", iconColor: "text-emerald-600", icon: <UserCheck   size={15} strokeWidth={1.8} /> },
  { title: "Demand Letter Drafting", desc: "Generates first-draft demand letters from case facts in seconds, ready for attorney review.", iconBg: "bg-orange-500/12",  iconColor: "text-orange-600",  icon: <FileText    size={15} strokeWidth={1.8} /> },
  { title: "Case Research",          desc: "Surfaces relevant precedents, statutes, and secondary sources in seconds.",                  iconBg: "bg-amber-500/12",   iconColor: "text-amber-600",   icon: <Search      size={15} strokeWidth={1.8} /> },
  { title: "Strategy Guidance",      desc: "Suggests next steps and litigation approaches based on case facts.",                         iconBg: "bg-rose-500/12",    iconColor: "text-rose-600",    icon: <Lightbulb   size={15} strokeWidth={1.8} /> },
  { title: "Smart Scheduling",       desc: "Manages attorney calendars, deadlines, and client coordination automatically.",              iconBg: "bg-cyan-500/12",    iconColor: "text-cyan-600",    icon: <CalendarCheck size={15} strokeWidth={1.8} /> },
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
      <section className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-heading">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0E0E2C]/60" />

        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <h1
              id="hero-heading"
              className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-10"
            >
              Every Lead Captured.<br />Every Case Ready.
            </h1>

            <Link
              href="/demo"
              className="inline-block bg-white text-[#0E0E2C] px-8 py-4 text-sm font-bold tracking-wide hover:bg-white/90 transition-colors duration-200"
            >
              Book a Demo
            </Link>
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
            <div key={i} className="flex items-center gap-3 shrink-0">
              <div className={`w-9 h-9 rounded-xl ${f.iconBg} flex items-center justify-center shrink-0 ${f.iconColor}`}>
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0E0E2C] whitespace-nowrap">{f.title}</p>
                <p className="text-xs text-[#0E0E2C]/50 mt-0.5 leading-snug max-w-48">{f.desc}</p>
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

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-24 px-8 bg-[#0E0E2C] text-white">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-white/35 mb-6">
            Ready to see it work?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
            30 minutes.<br />Your real intake. Live.
          </h2>
          <p className="text-white/55 leading-relaxed mb-10 max-w-xl mx-auto">
            No pitch deck. No canned demo. We run Lawrora on an actual case from your practice area and show you exactly what changes from day one.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2.5 rounded-full bg-white text-[#0E0E2C] px-8 py-4 text-sm font-bold hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a Free Demo
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
          <p className="text-[11px] text-white/25 mt-5">No commitment. No credit card. Set up in 48 hours.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
