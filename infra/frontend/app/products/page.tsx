import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FadeIn from "../components/FadeIn"
import CardCarousel, { type CarouselCard } from "../components/CardCarousel"

// One card per product
const welcomeCards: CarouselCard[] = [
  { tag: "Lead AI",      title: "Never miss a client",    desc: "Every call, text and web inquiry answered and qualified, day or night.",       bg: "bg-[#6b8fc4]", href: "/products/lead-ai",     image: "/media/free/cards/lead-intake.jpg" },
  { tag: "Match AI",     title: "The right attorney",     desc: "Qualified clients routed by practice area, licence and availability.",        bg: "bg-[#7fa383]", href: "/products/match-ai",    image: "/media/free/cards/case-matching.jpg" },
  { tag: "Draft AI",     title: "Drafts in seconds",      desc: "Demand letters and retainers built from case facts, ready for review.",       bg: "bg-[#a88b78]", href: "/products/draft-ai",    image: "/media/free/cards/document-review.jpg" },
  { tag: "Counsel AI",   title: "Answers, not hours",     desc: "Case law and comparable outcomes surfaced, with next steps suggested.",       bg: "bg-[#9a88cf]", href: "/products/counsel-ai",  image: "/media/free/cards/legal-research.jpg" },
  { tag: "Schedule AI",  title: "Never miss a deadline",  desc: "Filing deadlines, reminders and client follow-ups tracked automatically.",    bg: "bg-[#c4877a]", href: "/products/schedule-ai", image: "/media/free/cards/case-organization.jpg" },
]

export default function Products() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-end pb-24 px-8 md:px-16 lg:px-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/all_p_bg1.jpg')" }}
        aria-labelledby="products-hero-heading"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <h1
            id="products-hero-heading"
            className="text-[6rem] md:text-[9rem] font-bold tracking-tight text-white leading-none"
          >
            Our products
          </h1>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] text-black pt-28 pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-6">
          <div className="flex flex-col items-center text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                More cases. Less admin.
                <br />
                More time for law.
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-black/65">
                Five products that automate the running of a law firm: intake, matching, drafting, research and deadlines. Use one, or run your whole firm on all five.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <Link href="/demo" className="mt-8 inline-flex items-center gap-2 bg-black text-white border border-white px-8 py-4 text-sm font-bold tracking-wide hover:bg-white hover:text-black hover:border-black transition-colors duration-200">
                Book a Demo →
              </Link>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={400} className="mt-20">
          <CardCarousel cards={welcomeCards} />
        </FadeIn>
      </section>

      {/* ── Reach out ────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">

          {/* CTA row */}
          <FadeIn>
            <div className="border-t border-white/10 min-h-[50vh] py-12 grid grid-cols-2 gap-12 items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Reach out today</h2>
              <div>
                <Link
                  href="/demo"
                  className="inline-flex items-center bg-white text-black border border-black px-8 py-4 text-sm font-bold tracking-wide hover:bg-black hover:text-white hover:border-white transition-colors duration-200"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      <Footer />
    </main>
  )
}
