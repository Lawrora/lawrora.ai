import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import WorkflowSection from "../components/WorkflowSection"

const solutions = [
  {
    audience: "Law Firms",
    headline: "More clients. Less admin.",
    body: "Accelerate due diligence, contract review, and client research. Lawrora helps fee-earners spend less time on intake and research, and more time on billable advice.",
    points: ["Automated matter qualification", "AI-powered legal research", "First-draft document generation", "Workflow coordination across teams"],
  },
  {
    audience: "In-House Counsel",
    headline: "Legal clarity at the speed of business.",
    body: "Manage contract workflows, track regulatory exposure, and keep leadership informed with clear, AI-drafted briefing notes, without growing headcount.",
    points: ["Contract review & redlining", "Regulatory risk monitoring", "Executive briefing generation", "Matter tracking & reporting"],
  },
  {
    audience: "Compliance Teams",
    headline: "Stay ahead of every change.",
    body: "Monitor regulatory changes across jurisdictions automatically. Reduce manual review overhead and surface the changes that actually matter to your organisation.",
    points: ["Multi-jurisdiction tracking", "Automated risk flagging", "Policy gap analysis", "Audit-ready documentation"],
  },
  {
    audience: "Legal Operations",
    headline: "Operationalise your legal function.",
    body: "Centralize knowledge, automate routine tasks, and give your entire legal function a shared intelligence layer that scales without additional headcount.",
    points: ["Centralised matter knowledge base", "Process automation & templates", "Spend & vendor management insights", "Cross-team collaboration tools"],
  },
]

export default function Solutions() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <section className="pt-36 pb-16 px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mb-5">
            Built for how legal work actually happens
          </h1>
          <p className="text-lg text-white/55 max-w-xl leading-relaxed">
            Whether you run a firm, an in-house team, or a legal ops function, Lawrora adapts to your workflow.
          </p>
        </div>
      </section>

      <section className="pb-24 px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {solutions.map((s) => (
            <div key={s.audience} className="rounded-2xl border border-white/8 bg-white/4 p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 hover:border-white/15 transition-colors">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40 block mb-3">{s.audience}</span>
                <h2 className="text-2xl font-bold mb-4">{s.headline}</h2>
                <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
              </div>
              <ul className="space-y-3 self-center">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <WorkflowSection />

      <section className="py-16 px-8 bg-white/4 border-t border-white/6 text-center">
        <h2 className="text-2xl font-bold mb-4">See how Lawrora fits your team</h2>
        <Link href="/demo" className="inline-block bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
