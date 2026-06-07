import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { DraftAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "Demand letter generation", desc: "Generates complete, properly structured demand letters from case facts in seconds, ready for attorney review and signature." },
  { title: "Retainer and engagement agreements", desc: "Produces engagement letters and retainer agreements tailored to the client's matter type and your firm's standard terms." },
  { title: "Motion and filing templates", desc: "Pre-built templates for common motions and filings, populated automatically from case data." },
  { title: "Clause library", desc: "A searchable library of approved clauses that attorneys can insert or swap without starting from scratch." },
  { title: "Redline and version history", desc: "Every draft is versioned. Attorneys can compare changes, restore prior versions, and track who edited what." },
  { title: "E-signature ready output", desc: "Final documents are formatted for immediate e-signature, removing the final manual step before execution." },
]

const steps = [
  {
    n: "01",
    title: "Case brief is created",
    desc: "When a lead is qualified and a case brief is assembled, Draft AI automatically pulls the relevant facts, dates, parties, and case type.",
  },
  {
    n: "02",
    title: "Draft generated in seconds",
    desc: "Draft AI generates the appropriate document, demand letter, retainer, or filing, formatted to your firm's standards and ready for review.",
  },
  {
    n: "03",
    title: "Attorney reviews and finalises",
    desc: "The attorney opens a near-finished document. They review, adjust if needed, and send. No blank page. No wasted time.",
  },
]

export default function DraftAI() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <section className="pt-36 pb-20 px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white transition-colors mb-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            All products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-orange-500/15 text-orange-400 px-3 py-1.5 rounded-full mb-6">Document Drafting</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Draft AI</h1>
              <p className="text-xl font-semibold text-white/65 mb-5 leading-snug">First drafts from case facts. In seconds.</p>
              <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
                Draft AI generates demand letters, retainer agreements, motions, and filings directly from case data. Attorneys review and sign, not start from scratch.
              </p>
              <Link href="/demo" className="inline-block bg-white text-black px-7 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
                Book a Demo
              </Link>
            </div>
            <DraftAIDemo />
          </div>
        </div>
      </section>

      <section className="py-20 px-8 border-t border-white/6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Capabilities</p>
          <h2 className="text-3xl font-bold mb-12">What Draft AI does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="w-2 h-2 rounded-full bg-orange-400 mb-4" />
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
          <h2 className="text-3xl font-bold mb-12">From case facts to finished document</h2>
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
        <h2 className="text-2xl font-bold mb-6">See Draft AI generate a demand letter in 30 minutes.</h2>
        <Link href="/demo" className="inline-block bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-white/90 transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
