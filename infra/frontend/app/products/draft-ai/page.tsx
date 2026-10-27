import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProductHero from "../../components/ProductHero"
import ProductStory from "../../components/ProductStory"
import { DRAFT_AI } from "../../components/productStories"
import { FileText } from "lucide-react"
import { DraftAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "Demand letter generation", desc: "Generates complete, properly structured demand letters from case facts in seconds, ready for attorney review and signature." },
  { title: "Retainer and engagement agreements", desc: "Produces engagement letters and retainer agreements tailored to the client's matter type and your firm's standard terms." },
  { title: "Motion and filing templates", desc: "Pre-built templates for common motions and filings, populated automatically from case data." },
  { title: "Clause library", desc: "A searchable library of approved clauses that attorneys can insert or swap without starting from scratch." },
  { title: "Redline and version history", desc: "Every draft is versioned. Attorneys can compare changes, restore prior versions, and track who edited what." },
  { title: "E-signature ready output", desc: "Final documents are formatted for immediate e-signature, removing the final manual step before execution." },
]

export default function DraftAI() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <ProductHero
        category="Document Drafting"
        name="Draft AI"
        icon={<FileText size={20} strokeWidth={2} />}
        tagline="First drafts from case facts. In seconds."
        desc="Draft AI generates demand letters, retainer agreements, motions, and filings directly from case data. Attorneys review and sign, not start from scratch."
        demo={<DraftAIDemo />}
      />

      <ProductStory story={DRAFT_AI} features={features} />

      <Footer />
    </main>
  )
}
