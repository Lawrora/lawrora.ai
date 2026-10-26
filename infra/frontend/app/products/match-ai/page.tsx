import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProductHero from "../../components/ProductHero"
import ProductStory from "../../components/ProductStory"
import { MATCH_AI } from "../../components/productStories"
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

      <ProductStory story={MATCH_AI} features={features} />

      <Footer />
    </main>
  )
}
