import type { Metadata } from "next"
import Link from "next/link"
import { Scale, CheckCircle, ShieldCheck, Lock, Clock, Users, Zap } from "lucide-react"
import DemoPageForm from "../components/DemoPageForm"

export const metadata: Metadata = {
  title: "Book a Demo — See Lawrora Work on Your Real Intake",
  description:
    "30 minutes. No pitch deck. Watch Lawrora capture a lead, qualify a client, and draft a demand letter live on your actual workflow. HIPAA & SOC 2 compliant.",
  robots: { index: false, follow: false },
}

const demoHighlights = [
  "Lawrora captures a lead live from your actual number",
  "AI qualifies and scores the case in real time, no attorney involvement",
  "Client matched to the right attorney in under 60 seconds",
  "Demand letter drafted from a real case while you watch",
  "Every question answered. No slides. No limits.",
]

const stats = [
  { value: "< 3 min", label: "Lead to attorney-ready brief" },
  { value: "48 hrs",  label: "Average firm onboarding time" },
  { value: "100%",    label: "Leads captured after hours" },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Minimal header */}
      <header className="border-b border-white/8 px-8 py-4">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
            <Scale size={15} strokeWidth={2} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">LAWRORA</span>
        </Link>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-14 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

        {/* Left: persuasion column (2/5) */}
        <aside className="lg:col-span-2 lg:sticky lg:top-10">

          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-white/40 mb-5">
            30-minute live demo
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5 tracking-tight">
            See Lawrora work on your real intake.
          </h1>

          <p className="text-sm text-white/50 leading-relaxed mb-10">
            No slides. No recorded video. We run Lawrora live on an actual case workflow,
            your practice area, your intake, and show you exactly what changes from day one.
          </p>

          {/* What you'll see */}
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-4">
              What happens in 30 minutes
            </p>
            <ul className="space-y-3.5">
              {demoHighlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle size={15} strokeWidth={2} className="text-white/60 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/65 leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-xl bg-white/5 border border-white/8 p-4 text-center">
                <p className="text-lg font-bold text-white leading-none mb-1">{value}</p>
                <p className="text-[10px] text-white/40 leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* Who is this for */}
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-4">
              Built for
            </p>
            <div className="space-y-2.5">
              {[
                { icon: <Users size={13} strokeWidth={2} />, text: "Managing partners evaluating legal tech" },
                { icon: <Zap   size={13} strokeWidth={2} />, text: "Ops leads looking to cut intake admin" },
                { icon: <Clock size={13} strokeWidth={2} />, text: "Firms losing leads after business hours" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-white/55">
                  <span className="text-white/35">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <ShieldCheck size={11} strokeWidth={2} className="text-white/45" />, label: "HIPAA Compliant" },
              { icon: <ShieldCheck size={11} strokeWidth={2} className="text-white/45" />, label: "SOC 2 Type II" },
              { icon: <Lock       size={11} strokeWidth={2} className="text-white/45" />, label: "AES-256 Encrypted" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/45"
              >
                {icon}
                {label}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-white/25 mt-6 leading-relaxed">
            Firms that book a demo typically go live within one week.
            No commitment required.
          </p>
        </aside>

        {/* Right: form (3/5) */}
        <main className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-8">
            <DemoPageForm />
          </div>
        </main>

      </div>
    </div>
  )
}
