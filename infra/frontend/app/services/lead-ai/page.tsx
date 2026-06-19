import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { LeadAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "24/7 multi-channel capture", desc: "Catches every inbound from phone calls, SMS, and web forms around the clock so no prospect ever falls through." },
  { title: "Live AI qualification", desc: "An AI assistant engages the prospect in real time, asking the right questions to assess case type, urgency, and fit." },
  { title: "Case type and urgency scoring", desc: "Every lead is scored on fit and priority so your team always knows which matters need attention first." },
  { title: "Instant attorney routing", desc: "Qualified leads are automatically routed to the right attorney without any manual triage or staff intervention." },
  { title: "Pre-qualified lead brief", desc: "The attorney receives a ready-made summary with the prospect's details, case facts, and risk flags before the first call." },
  { title: "No-lead-left-behind guarantee", desc: "Overflow routing and after-hours coverage ensure every contact is handled, even when the team is unavailable." },
]

const steps = [
  {
    n: "01",
    title: "Prospect reaches out",
    desc: "A potential client calls, texts, or submits a web form. Lead AI is listening across every channel simultaneously.",
  },
  {
    n: "02",
    title: "AI engages and qualifies",
    desc: "An AI assistant responds immediately, converses naturally with the prospect, and scores the matter for case type, urgency, and fit.",
  },
  {
    n: "03",
    title: "Routed to the right attorney",
    desc: "The qualified lead and a pre-built brief land in the right attorney's queue. No triage. No manual assignment. No delay.",
  },
]

export default function LeadAI() {
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
              <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-blue-500/15 text-blue-400 px-3 py-1.5 rounded-full mb-6">Lead Management</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Lead AI</h1>
              <p className="text-xl font-semibold text-white/65 mb-5 leading-snug">Never miss a lead. Route every one.</p>
              <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
                Lead AI captures inbound interest across call, text, and web 24/7, qualifies every prospect with a real-time AI conversation, and routes the right leads to the right attorneys automatically.
              </p>
              <Link href="/demo" className="inline-block bg-white text-black px-7 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
                Book a Demo
              </Link>
            </div>
            <LeadAIDemo />
          </div>
        </div>
      </section>

      <section className="py-20 px-8 border-t border-white/6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Capabilities</p>
          <h2 className="text-3xl font-bold mb-12">What Lead AI does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="w-2 h-2 rounded-full bg-blue-400 mb-4" />
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
          <h2 className="text-3xl font-bold mb-12">From first contact to attorney queue</h2>
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
        <h2 className="text-2xl font-bold mb-6">See Lead AI qualify a real lead in 30 minutes.</h2>
        <Link href="/demo" className="inline-block bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
