import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProductHero from "../../components/ProductHero"
import { UserCheck } from "lucide-react"
import { MatchAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "Practice area matching", desc: "Matches each qualified lead to attorneys who specialise in the relevant area of law, from personal injury to real estate." },
  { title: "Jurisdiction awareness", desc: "Filters attorneys by the jurisdiction in which the matter arose, ensuring only qualified counsel is recommended." },
  { title: "Workload and availability", desc: "Real-time awareness of each attorney's active caseload and calendar prevents overloading any single team member." },
  { title: "Match confidence scoring", desc: "Every attorney recommendation comes with a scored percentage so the right pick is always obvious." },
  { title: "Client-facing recommendation", desc: "Clients can be shown the matched attorney's profile, building trust before the first conversation." },
  { title: "Auto-notification on match", desc: "The matched attorney is notified instantly with the prospect brief so they can prepare before the call." },
]

const steps = [
  {
    n: "01",
    title: "Lead is qualified by Lead AI",
    desc: "Once a prospect passes the AI qualification conversation, their case details and scoring data are passed to Match AI.",
  },
  {
    n: "02",
    title: "Attorneys scored for fit",
    desc: "Match AI ranks your attorneys by practice area, jurisdiction, current caseload, and availability to find the best match.",
  },
  {
    n: "03",
    title: "Top match selected and notified",
    desc: "The highest-scoring attorney is automatically selected, notified with the case brief, and the client is introduced.",
  },
]

export default function MatchAI() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <ProductHero
        category="Attorney Matching"
        name="Match AI"
        icon={<UserCheck size={20} strokeWidth={2} />}
        tagline="The right attorney for every client."
        desc="Match AI scores each qualified lead against your firm's attorneys and recommends the best fit based on practice area, jurisdiction, and current workload. No manual assignment. No guesswork."
        demo={<MatchAIDemo />}
      />

      <section className="py-20 px-8 border-t border-white/6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Capabilities</p>
          <h2 className="text-3xl font-bold mb-12">What Match AI does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="w-2 h-2 rounded-full bg-violet-400 mb-4" />
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
          <h2 className="text-3xl font-bold mb-12">From qualified lead to attorney handoff</h2>
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
        <h2 className="text-2xl font-bold mb-6">See Match AI route a real lead in 30 minutes.</h2>
        <Link href="/demo" className="inline-block bg-white text-black border border-black px-8 py-3 text-sm font-semibold hover:bg-black hover:text-white hover:border-white transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
