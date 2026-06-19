import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  CalendarCheck,
  FileText,
  Bot,
  UserCheck,
  Search,
  Lightbulb,
} from "lucide-react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FadeIn from "./components/FadeIn"

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

        {/* Content — Lawrora centered just above marquee */}
        <div className="absolute bottom-52 left-0 right-0 z-10 flex flex-col items-center gap-4">
          <h1
            id="hero-heading"
            className="text-[8rem] font-bold tracking-tight text-white leading-none"
          >
            Lawrora
          </h1>
          <p className="text-[4rem] font-medium text-white/80 leading-none">
            Justice for clients by clients
          </p>
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

      {/* ── Welcome ──────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#f5f0e8] text-black flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24">
        <div className="mx-auto max-w-7xl w-full">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">
              Welcome to Lawrora AI
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <FadeIn delay={100}>
              <p className="text-lg leading-relaxed text-black/75">
                Lawrora AI is built for modern law firms that want to handle more cases, reduce administrative work, and deliver exceptional client experiences. Our AI automates intake, legal research, document review, contract analysis, and case organization, allowing attorneys to spend less time on repetitive tasks and more time practicing law.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg leading-relaxed text-black/75">
                Increase productivity, respond to clients instantly, and scale your firm without scaling overhead. With AI-powered workflows designed specifically for legal professionals, Lawrora helps your team work faster, improve accuracy, and turn every inquiry into an opportunity for growth.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={300}>
            <Link href="/demo" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-bold tracking-wide hover:bg-white hover:text-black transition-colors duration-200">
              Book a Demo →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── bg2 image ────────────────────────────────────────── */}
      <section
        className="h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/bg2.jpg')" }}
        aria-hidden="true"
      />

      {/* ── What we offer ────────────────────────────────────── */}
      <section className="min-h-screen bg-black text-white flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
            <FadeIn className="flex flex-col justify-between">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                What we offer
              </h2>
              <Link href="/services" className="inline-flex items-center self-start bg-white text-black px-8 py-4 text-sm font-bold tracking-wide hover:bg-black hover:text-white transition-colors duration-200">
                Services
              </Link>
            </FadeIn>
            <ul className="space-y-4">
              {["Lead Intake", "Case Matching", "Demand Drafting", "Legal Research", "Appointment Scheduling","Firm Automation"].map((name, i) => (
                <FadeIn key={name} delay={i * 80}>
                  <li className="text-5xl md:text-6xl font-semibold text-white">
                    {name}
                  </li>
                </FadeIn>
              ))}
              <FadeIn delay={400}>
                <li className="text-5xl md:text-6xl font-semibold text-[#f5f0e8]">+More</li>
              </FadeIn>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
