import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  CalendarCheck,
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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
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
        <div className="absolute inset-0 bg-black/60" />

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
              className="inline-block bg-white text-black px-8 py-4 text-sm font-bold tracking-wide hover:bg-white/90 transition-colors duration-200"
            >
              Book a Demo
            </Link>
          </div>
        </div>

        {/* Marquee at hero bottom — translucent */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black/30 backdrop-blur-sm border-t border-white/8 py-5 z-10">
          <div className="flex animate-marquee w-max gap-16 px-8" aria-hidden="true">
            {[...featureStrip, ...featureStrip].map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 shrink-0">
                <div className={`w-7 h-7 rounded-lg ${f.iconBg} flex items-center justify-center shrink-0`}>
                  <span className={f.iconColor}>{f.icon}</span>
                </div>
                <span className="text-sm font-medium text-white/65 whitespace-nowrap">{f.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust stats ──────────────────────────────────────── */}
      <section className="py-14 px-8 border-b border-white/6" aria-label="Key metrics">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {value}
                </span>
                <span className="text-xs text-white/45 leading-snug max-w-30">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────── */}
      <section className="py-20 px-8" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
            AI Paralegal
          </p>
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-bold mb-12 max-w-xl leading-tight text-white"
          >
            What your AI paralegal handles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((card) => (
              <article
                key={card.tag}
                className="rounded-2xl border border-white/8 bg-white/5 p-8 flex flex-col gap-4 card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${card.accent}/15 flex items-center justify-center shrink-0 text-white/70`}>
                    {card.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/35">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{card.desc}</p>
                <ul className="space-y-2 mt-auto pt-4 border-t border-white/8">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs font-medium text-white/60">
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


      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-8" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">FAQ</p>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold mb-12 text-white"
          >
            Frequently Asked Questions
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-24 px-8 bg-white/4 border-t border-white/6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-white/35 mb-6">
            Ready to see it work?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight text-white">
            30 minutes.<br />Your real intake. Live.
          </h2>
          <p className="text-white/55 leading-relaxed mb-10 max-w-xl mx-auto">
            No pitch deck. No canned demo. We run Lawrora on an actual case from your practice area and show you exactly what changes from day one.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 text-sm font-bold hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5"
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
