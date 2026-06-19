import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { ScheduleAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "Filing deadline tracking", desc: "Automatically identifies and tracks every deadline associated with a matter, from statutes of limitations to court-ordered dates." },
  { title: "Calendar sync", desc: "Syncs with Google Calendar, Outlook, and major practice management systems so attorney schedules stay in one place." },
  { title: "Conflict detection", desc: "Surfaces scheduling conflicts across the team before they become problems, including double-booked hearings and overlapping deadlines." },
  { title: "Automated time logging", desc: "Tracks time spent on each matter automatically based on activity, reducing the burden of manual time entry." },
  { title: "Client appointment coordination", desc: "Manages client-facing scheduling, sends reminders, and handles rescheduling without staff involvement." },
  { title: "Deadline alerts", desc: "Proactive alerts fire days or weeks before critical deadlines so nothing is missed and nothing is rushed." },
]

const steps = [
  {
    n: "01",
    title: "Matter opens",
    desc: "The moment a matter is created, Schedule AI identifies the relevant deadlines, hearing types, and milestone events for that case category.",
  },
  {
    n: "02",
    title: "Deadlines and events auto-populated",
    desc: "The matter's calendar is built automatically. Attorneys see their schedule without entering a single date manually.",
  },
  {
    n: "03",
    title: "Alerts fire before anything is missed",
    desc: "Schedule AI monitors every deadline and sends proactive alerts to the right attorney with enough lead time to prepare.",
  },
]

export default function ScheduleAI() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <section className="pt-36 pb-20 px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white transition-colors mb-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            All products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-emerald-500/15 text-emerald-400 px-3 py-1.5 rounded-full mb-6">Scheduling</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Schedule AI</h1>
              <p className="text-xl font-semibold text-white/65 mb-5 leading-snug">Every deadline tracked. Every calendar managed.</p>
              <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
                Schedule AI monitors filing deadlines, manages attorney calendars, logs time entries, and alerts the team before anything slips, all without manual input.
              </p>
              <Link href="/demo" className="inline-block bg-white text-black px-7 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
                Book a Demo
              </Link>
            </div>
            <ScheduleAIDemo />
          </div>
        </div>
      </section>

      <section className="py-20 px-8 border-t border-white/6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Capabilities</p>
          <h2 className="text-3xl font-bold mb-12">What Schedule AI does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mb-4" />
                <h3 className="text-sm font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white/4 border-y border-white/6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">How it works</p>
          <h2 className="text-3xl font-bold mb-12">From matter open to nothing missed</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n}>
                <p className="text-5xl font-bold text-white/8 mb-4 tabular-nums">{s.n}</p>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Ready to see it live?</p>
        <h2 className="text-2xl font-bold mb-6">See Schedule AI manage a live matter in 30 minutes.</h2>
        <Link href="/demo" className="inline-block bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
