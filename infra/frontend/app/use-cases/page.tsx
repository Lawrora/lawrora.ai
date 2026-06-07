import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const useCases = [
  {
    tag: "Litigation",
    title: "Case intake to trial-ready in record time",
    body: "Intake AI qualifies potential clients instantly. Research AI surfaces relevant precedents. Draft AI prepares motions and filings. Lawrora compresses weeks of prep work into hours.",
  },
  {
    tag: "Transactional",
    title: "Due diligence that doesn't slow down deals",
    body: "Review hundreds of documents in minutes, flag non-standard clauses, and generate executive summaries without burning out your associates.",
  },
  {
    tag: "Immigration",
    title: "More petitions. Less paperwork.",
    body: "Automate form preparation, document checklists, and case status tracking. Lawrora handles the routine so your team can serve more clients.",
  },
  {
    tag: "Family Law",
    title: "Sensitive matters, handled with care",
    body: "Structured intake for complex family matters, automated financial disclosure drafts, and research support for custody and property proceedings.",
  },
  {
    tag: "IP & Tech",
    title: "Prior art searches at the speed of AI",
    body: "Surface prior art, draft patent summaries, and track prosecution history across portfolios, all from a single platform.",
  },
  {
    tag: "Compliance",
    title: "Regulatory monitoring that never sleeps",
    body: "Track changes across jurisdictions automatically. Get alerts on regulations that affect your clients before your competitors do.",
  },
]

export default function UseCases() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <section className="pt-36 pb-16 px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Use Cases</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mb-5">
            Real work, real impact
          </h1>
          <p className="text-lg text-white/55 max-w-xl leading-relaxed">
            Lawrora adapts to every practice area. Here&apos;s how legal teams are using it today.
          </p>
        </div>
      </section>

      <section className="pb-24 px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc) => (
            <div key={uc.tag} className="rounded-2xl border border-white/8 bg-white/5 p-8 hover:border-white/15 transition-colors flex flex-col gap-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/8 text-white/50 px-2.5 py-1 rounded-full w-fit">{uc.tag}</span>
              <h2 className="text-lg font-bold">{uc.title}</h2>
              <p className="text-sm text-white/55 leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 bg-white/4 border-t border-white/6 text-center">
        <h2 className="text-2xl font-bold mb-4">Don&apos;t see your practice area?</h2>
        <p className="text-white/55 mb-6 text-sm">Talk to us. Lawrora is flexible enough to fit almost any legal workflow.</p>
        <Link href="/demo" className="inline-block bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
