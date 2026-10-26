import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProductHero from "../../components/ProductHero"
import ProductStory from "../../components/ProductStory"
import { LEAD_AI } from "../../components/productStories"
import { Phone } from "lucide-react"
import { LeadAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "24/7 multi-channel capture", desc: "Catches every inbound from phone calls, SMS, and web forms around the clock so no prospect ever falls through." },
  { title: "Live AI qualification", desc: "An AI assistant engages the prospect in real time, asking the right questions to assess case type, urgency, and fit." },
  { title: "Case type and urgency scoring", desc: "Every lead is scored on fit and priority so your team always knows which matters need attention first." },
  { title: "Instant attorney routing", desc: "Qualified leads are automatically routed to the right attorney without any manual triage or staff intervention." },
  { title: "Pre-qualified lead brief", desc: "The attorney receives a ready-made summary with the prospect's details, case facts, and risk flags before the first call." },
  { title: "No-lead-left-behind guarantee", desc: "Overflow routing and after-hours coverage ensure every contact is handled, even when the team is unavailable." },
]

export default function LeadAI() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <ProductHero
        category="Lead Management"
        name="Lead AI"
        icon={<Phone size={20} strokeWidth={2} />}
        tagline="Never miss a lead. Route every one."
        desc="Lead AI captures inbound interest across call, text, and web 24/7, qualifies every prospect with a real-time AI conversation, and routes the right leads to the right attorneys automatically."
        demo={<LeadAIDemo />}
      />

      <ProductStory story={LEAD_AI} features={features} />

      <Footer />
    </main>
  )
}
