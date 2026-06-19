import type { Metadata } from "next"
import Header from "../components/Header"
import DemoPageForm from "../components/DemoPageForm"

export const metadata: Metadata = {
  title: "Book a Demo — See Lawrora Work on Your Real Intake",
  description:
    "30 minutes. No pitch deck. Watch Lawrora capture a lead, qualify a client, and draft a demand letter live on your actual workflow. HIPAA & SOC 2 compliant.",
  robots: { index: false, follow: false },
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-8 pt-36 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: big heading */}
        <aside className="lg:sticky lg:top-32">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
            Ready to take the first step?
          </h1>
        </aside>

        {/* Right: form */}
        <main>
          <div className="rounded-2xl border border-white/10 bg-white/4 p-8">
            <DemoPageForm />
          </div>
        </main>

      </div>
    </div>
  )
}
