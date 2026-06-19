import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const services = [
  {
    name: "Lead AI",
    desc: "Captures and qualifies every inbound lead from call, text, or web — 24/7 — so no prospect ever slips through the cracks before an attorney is involved.",
  },
  {
    name: "Match AI",
    desc: "Instantly routes each qualified client to the right attorney by practice area, availability, and case type, eliminating manual intake triage.",
  },
  {
    name: "Draft AI",
    desc: "Generates demand letters, retainer agreements, and motion templates straight from case facts in seconds, ready for attorney review.",
  },
  {
    name: "Counsel AI",
    desc: "Surfaces relevant case law, statutes, and secondary sources and suggests next litigation steps — so attorneys spend time on judgment, not search.",
  },
  {
    name: "Schedule AI",
    desc: "Tracks every calendar event, filing deadline, and client coordination task automatically, keeping every matter on time with zero admin overhead.",
  },
]

export default function Services() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-end pb-24 px-8 md:px-16 lg:px-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/all_p_bg1.jpg')" }}
        aria-labelledby="services-hero-heading"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <h1
            id="services-hero-heading"
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            How we help you
          </h1>
        </div>
      </section>

      {/* ── Services list ────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">

          <p className="text-2xl md:text-3xl font-semibold text-white mb-16">
            Ready to make law easier?
          </p>

          {services.map(({ name, desc }, i) => (
            <div key={name} className="border-t border-white/10 py-12 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8 items-start">
              <span className="text-sm font-semibold text-white/30 tabular-nums pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{name}</h2>
                <p className="text-base text-white/55 leading-relaxed max-w-2xl">{desc}</p>
              </div>
            </div>
          ))}

          {/* CTA row */}
          <div className="border-t border-white/10 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Reach out today</h2>
            <div>
              <Link
                href="/demo"
                className="inline-flex items-center bg-white text-black px-8 py-4 text-sm font-bold tracking-wide hover:bg-white/90 transition-colors duration-200"
              >
                Book a Demo
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
