import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const articles = [
  {
    tag: "Guide",
    title: "How to Automate Client Intake Without Losing the Human Touch",
    excerpt: "A practical guide to using AI intake tools while keeping clients feeling heard and valued throughout the intake process.",
    readTime: "6 min read",
  },
  {
    tag: "Case Study",
    title: "How a 12-Attorney Firm Cut Intake Time by 60% in 30 Days",
    excerpt: "We followed one boutique litigation firm through their Lawrora onboarding and measured the real-world impact on their intake workflow.",
    readTime: "8 min read",
  },
  {
    tag: "Explainer",
    title: "What Is Retrieval-Augmented Generation and Why It Matters for Legal AI",
    excerpt: "RAG is the technology behind accurate, cited legal AI responses. Here's what it means and why it beats standard language models for legal work.",
    readTime: "5 min read",
  },
  {
    tag: "Guide",
    title: "The Legal Ops Playbook: Implementing AI Without Disrupting Your Team",
    excerpt: "Change management is the hardest part of any technology rollout. This playbook covers the people side of AI adoption for legal teams.",
    readTime: "10 min read",
  },
  {
    tag: "Webinar",
    title: "AI & Attorney Ethics: What You Need to Know Before You Deploy",
    excerpt: "A recording from our panel of general counsel and bar association representatives discussing ethical obligations when using AI in legal practice.",
    readTime: "45 min watch",
  },
  {
    tag: "Template",
    title: "Free: AI Vendor Evaluation Checklist for Law Firms",
    excerpt: "A downloadable checklist of the 30 questions your firm should ask any legal AI vendor before signing a contract.",
    readTime: "Download",
  },
]

export default function Resources() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E2C]">
      <Header />

      <section className="pt-36 pb-16 px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40 mb-3">Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mb-5">
            Insights for modern legal teams
          </h1>
          <p className="text-lg text-[#0E0E2C]/60 max-w-xl leading-relaxed">
            Guides, case studies, and explainers to help you get the most from AI in your legal practice.
          </p>
        </div>
      </section>

      <section className="pb-24 px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <div key={a.title} className="rounded-2xl border border-[#0E0E2C]/8 bg-[#FCF9EA] p-8 hover:border-[#0E0E2C]/20 transition-colors flex flex-col gap-4 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-[#0E0E2C]/6 text-[#0E0E2C]/50 px-2.5 py-1 rounded-full">{a.tag}</span>
                <span className="text-xs text-[#0E0E2C]/35">{a.readTime}</span>
              </div>
              <h2 className="text-base font-bold leading-snug">{a.title}</h2>
              <p className="text-sm text-[#0E0E2C]/60 leading-relaxed flex-1">{a.excerpt}</p>
              <span className="text-sm font-medium text-[#0E0E2C] hover:opacity-60 transition-opacity w-fit">Read more →</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 bg-[#FCF9EA] text-center">
        <h2 className="text-2xl font-bold mb-4">Want a personalised walkthrough?</h2>
        <Link href="/#demo" className="inline-block rounded-full bg-[#0E0E2C] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0E0E2C]/85 transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
