import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { CounselAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "Case law and statute search", desc: "Searches across federal and state case law, statutes, and regulations in seconds. Every result is jurisdiction-aware." },
  { title: "Cited summaries", desc: "AI-generated summaries of each result include full citations, making them ready to paste directly into a memo or brief." },
  { title: "Strategy suggestions", desc: "Counsel AI recommends litigation approaches and next steps based on the specific facts and precedents of each matter." },
  { title: "Pre-built case briefs", desc: "When a matter opens, a structured case brief is automatically assembled from intake data so attorneys start with context." },
  { title: "Next step recommendations", desc: "Counsel AI surfaces the most relevant actions for each stage of the matter, from demand to discovery to trial prep." },
  { title: "Precedent clustering", desc: "Groups similar precedents together so attorneys can see patterns in outcomes and damages across comparable cases." },
]

const steps = [
  {
    n: "01",
    title: "Attorney opens a matter",
    desc: "The moment an attorney accesses a case, Counsel AI begins surfacing relevant research based on the intake data and case type.",
  },
  {
    n: "02",
    title: "Research surfaces automatically",
    desc: "Relevant precedents, statutes, and secondary sources are retrieved and summarised, with citations ready to use.",
  },
  {
    n: "03",
    title: "Strategy options presented",
    desc: "Counsel AI recommends next steps and litigation approaches based on the facts, surfaced precedents, and typical outcomes in comparable matters.",
  },
]

export default function CounselAI() {
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
              <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-amber-500/15 text-amber-400 px-3 py-1.5 rounded-full mb-6">Lawyer Intelligence</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Counsel AI</h1>
              <p className="text-xl font-semibold text-white/65 mb-5 leading-snug">Research, strategy, and guidance. Inside every matter.</p>
              <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
                Counsel AI gives attorneys instant access to relevant precedents, statutes, and strategic next steps the moment they open a case, without leaving the platform.
              </p>
              <Link href="/demo" className="inline-block bg-white text-black px-7 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors">
                Book a Demo
              </Link>
            </div>
            <CounselAIDemo />
          </div>
        </div>
      </section>

      <section className="py-20 px-8 border-t border-white/6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Capabilities</p>
          <h2 className="text-3xl font-bold mb-12">What Counsel AI does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="w-2 h-2 rounded-full bg-amber-400 mb-4" />
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
          <h2 className="text-3xl font-bold mb-12">From matter open to strategy ready</h2>
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
        <h2 className="text-2xl font-bold mb-6">See Counsel AI research a live matter in 30 minutes.</h2>
        <Link href="/demo" className="inline-block bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
