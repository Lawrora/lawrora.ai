import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProductHero from "../../components/ProductHero"
import ProductStory from "../../components/ProductStory"
import { COUNSEL_AI } from "../../components/productStories"
import { BookOpen } from "lucide-react"
import { CounselAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "Case law and statute search", desc: "Searches across federal and state case law, statutes, and regulations in seconds. Every result is jurisdiction-aware." },
  { title: "Cited summaries", desc: "AI-generated summaries of each result include full citations, making them ready to paste directly into a memo or brief." },
  { title: "Strategy suggestions", desc: "Counsel AI recommends litigation approaches and next steps based on the specific facts and precedents of each matter." },
  { title: "Pre-built case briefs", desc: "When a matter opens, a structured case brief is automatically assembled from intake data so attorneys start with context." },
  { title: "Next step recommendations", desc: "Counsel AI surfaces the most relevant actions for each stage of the matter, from demand to discovery to trial prep." },
  { title: "Precedent clustering", desc: "Groups similar precedents together so attorneys can see patterns in outcomes and damages across comparable cases." },
]

export default function CounselAI() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <ProductHero
        category="Lawyer Intelligence"
        name="Counsel AI"
        icon={<BookOpen size={20} strokeWidth={2} />}
        tagline="Research, strategy, and guidance. Inside every matter."
        desc="Counsel AI gives attorneys instant access to relevant precedents, statutes, and strategic next steps the moment they open a case, without leaving the platform."
        demo={<CounselAIDemo />}
      />

      <ProductStory story={COUNSEL_AI} features={features} />

      <Footer />
    </main>
  )
}
