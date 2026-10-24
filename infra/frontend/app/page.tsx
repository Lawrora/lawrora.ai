import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  FileText,
  Check,
  ChevronRight,
  Scale,
  ShieldCheck,
  Clock,
  ArrowUpRight,
} from "lucide-react"
import Header from "./components/Header"
import CardCarousel, { type CarouselCard } from "./components/CardCarousel"
import Footer from "./components/Footer"
import FadeIn from "./components/FadeIn"

export const metadata: Metadata = {
  title: "Lawrora",
  description:
    "Lawrora captures every inbound lead 24/7, qualifies clients with AI, matches them to the right attorney, and drafts legal documents in seconds. HIPAA & SOC 2 compliant. Purpose-built for law firms.",
  alternates: { canonical: "https://lawrora.ai" },
}

const welcomeCards: CarouselCard[] = [
  { tag: "Lead intake",       title: "Never miss a client",     desc: "Every call, text and web inquiry answered and qualified, 24/7.",      bg: "bg-[#6b8fc4]", href: "/services", image: "/media/free/cards/lead-intake.jpg" },
  { tag: "AI qualification",  title: "Know the case fit",       desc: "Prospects screened in real time before any attorney time is spent.", bg: "bg-[#5f9ea0]", href: "/services", image: "/media/free/cards/ai-qualification.jpg" },
  { tag: "Case matching",     title: "The right attorney",      desc: "Leads routed by practice area and availability, instantly.",          bg: "bg-[#7fa383]", href: "/services", image: "/media/free/cards/case-matching.jpg" },
  { tag: "Document review",   title: "Drafts in seconds",       desc: "Demand letters and contract analysis, ready for attorney review.",    bg: "bg-[#a88b78]", href: "/services", image: "/media/free/cards/document-review.jpg" },
  { tag: "Legal research",    title: "Answers, not hours",      desc: "Precedents, statutes and secondary sources surfaced on demand.",      bg: "bg-[#9a88cf]", href: "/services", image: "/media/free/cards/legal-research.jpg" },
  { tag: "Strategy guidance", title: "Your next best move",     desc: "Next steps and litigation approaches suggested from case facts.",     bg: "bg-[#c9a25f]", href: "/services", image: "/media/free/cards/strategy.jpg" },
  { tag: "Case organization", title: "Your firm, on autopilot", desc: "Calendars, deadlines and client follow-ups handled automatically.",    bg: "bg-[#c4877a]", href: "/services", image: "/media/free/cards/case-organization.jpg" },
]

// media: path without extension; .mp4 is the loop, .jpg its poster frame
type OfferTile = { stat: string; text: string; word: string; bg: string; media: string }

const offerColumns: OfferTile[][] = [
  [
    { stat: "24/7",      text: "Every call, text and web inquiry captured by", word: "lead intake",       bg: "bg-[#3f5f93]", media: "/media/free/tiles/lead-intake" },
    { stat: "Seconds",   text: "First-draft demand letters with",               word: "demand drafting",   bg: "bg-[#a88b78]",             media: "/media/free/tiles/demand-drafting" },
    { stat: "On demand", text: "Precedents and statutes surfaced by",           word: "legal research",    bg: "bg-[#7fa383]", media: "/media/free/tiles/legal-research" },
    { stat: "Next step", text: "Litigation approaches suggested by",            word: "strategy guidance", bg: "bg-[#c9a25f]",             media: "/media/free/tiles/strategy" },
    { stat: "+More",     text: "Workflows that keep your whole firm on",        word: "autopilot",         bg: "bg-[#8a6f9e]", media: "/media/free/tiles/autopilot" },
  ],
  [
    { stat: "Instant",   text: "The right attorney for every lead with",        word: "case matching",     bg: "bg-[#9a88cf]",             media: "/media/free/tiles/case-matching" },
    { stat: "Real time", text: "Case fit assessed before attorney time with",   word: "AI qualification",  bg: "bg-[#5f9ea0]", media: "/media/free/tiles/ai-qualification" },
    { stat: "Zero",      text: "Double-bookings or missed deadlines with",      word: "scheduling",        bg: "bg-[#c4877a]",             media: "/media/free/tiles/scheduling" },
    { stat: "Always on", text: "Clients kept in the loop with",                 word: "instant updates",   bg: "bg-[#2f4a78]", media: "/media/free/tiles/client-updates" },
  ],
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] px-3 md:px-5 pt-18 pb-5" aria-labelledby="hero-heading">
        <div className="relative overflow-hidden rounded-4xl bg-linear-to-b from-[#b9b9b9] via-[#d6d6d6] to-[#f2f2f2] text-black">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 px-6 md:px-14 lg:px-20 py-14 lg:py-20">
            {/* Copy */}
            <div className="flex flex-col justify-center">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                    <Scale size={20} strokeWidth={2} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-base font-semibold">AI paralegal for law firms</p>
                    <p className="text-sm text-black/70">
                      Explore our{" "}
                      <Link href="/products" className="font-semibold text-black underline underline-offset-2">products</Link>
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <h1 id="hero-heading" className="mt-8 font-serif text-[5.5rem] md:text-[8rem] xl:text-[9.5rem] leading-[0.9] tracking-tight">
                  Lawrora
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="mt-8 max-w-lg border-y border-black/15">
                  <p className="py-6 text-lg md:text-xl leading-relaxed text-black/85">
                    Justice for clients, by clients. Capture every lead, match every client and draft every document, around the clock.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/15 py-5 text-sm">
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={18} strokeWidth={1.8} />
                      HIPAA &amp; SOC 2 Type II
                    </span>
                    <span className="text-black/30">/</span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} strokeWidth={2} />
                      Live 24/7
                    </span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <Link href="/demo" className="inline-flex items-center rounded-full border-2 border-white bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_#000] hover:bg-[#222] transition-colors duration-200">
                    Book a Demo
                  </Link>
                  <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-black/70">
                    Our Services
                    <ArrowUpRight size={15} strokeWidth={2} />
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Illustration + floating cards */}
            <FadeIn delay={200} className="relative mx-auto w-full max-w-130 lg:mx-0 lg:ml-auto">
              <div className="relative ml-8 mr-10 md:ml-16 md:mr-20">
                <Image
                  src="/hero-scales.svg"
                  alt="Scales of justice weighing case files"
                  width={520}
                  height={640}
                  priority
                  unoptimized
                  className="aspect-13/16 w-full rounded-[2.25rem] object-cover shadow-2xl shadow-black/20"
                />

                {/* Intake chips */}
                <div className="absolute -left-8 md:-left-16 top-[18%] flex flex-col items-start gap-3">
                  <span className="flex items-center gap-2.5 rounded-full bg-white px-3 py-2 text-sm shadow-lg">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-black text-white"><Check size={12} strokeWidth={3} /></span>
                    Was anyone injured?
                  </span>
                  <span className="-ml-6 flex items-center gap-2.5 rounded-full bg-white px-3 py-2 text-sm shadow-lg">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-[#6b6b6b] text-white"><Check size={12} strokeWidth={3} /></span>
                    When did it happen?
                  </span>
                </div>

                {/* Stat glass card */}
                <div className="absolute -right-10 md:-right-20 top-6 w-36 md:w-40 rounded-3xl border border-white/40 bg-white/30 p-4 backdrop-blur-md shadow-lg">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-black/70">— Every lead</p>
                  <p className="mt-2 text-3xl md:text-4xl font-semibold">24/7</p>
                  <p className="mt-1 text-xs leading-snug text-black/75">Captured and qualified, nights and weekends</p>
                </div>

                {/* Draft glass card */}
                <div className="absolute -right-10 md:-right-20 bottom-8 flex w-64 md:w-72 items-center gap-4 rounded-3xl border border-white/40 bg-white/35 p-4 backdrop-blur-md shadow-lg">
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <FileText size={34} strokeWidth={1.5} className="text-black" />
                  </span>
                  <div>
                    <p className="text-base leading-tight">Demand letter</p>
                    <p className="mt-1 text-xl font-semibold leading-tight">Drafted in seconds</p>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-medium">
                      <Check size={11} strokeWidth={3} /> Ready for review
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Practice areas strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 pt-8 pb-3 text-lg md:text-xl font-semibold tracking-tight text-white/70">
          {["Personal Injury", "Family Law", "Immigration", "Criminal Defense", "Employment", "Real Estate"].map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      {/* ── Welcome ──────────────────────────────────────────── */}
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
                AI built for modern law firms. Automate intake, research, document review and case organization, and scale your firm without scaling overhead.
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

      {/* ── bg2 image ────────────────────────────────────────── */}
      <section
        className="h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/bg2.jpg')" }}
        aria-hidden="true"
      />

      {/* ── What we offer ────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] px-4 md:px-8 py-16 md:py-24">
        <FadeIn className="mx-auto max-w-400 w-full">
          <div className="relative overflow-hidden rounded-4xl bg-[#0a0a0a] text-white">
            {/* Soft wave highlight */}
            <div className="pointer-events-none absolute -left-40 top-1/3 h-[140%] w-[90%] rounded-full bg-white/5 blur-3xl" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
              {/* Copy */}
              <div className="flex flex-col justify-center px-8 py-14 md:px-16 lg:py-20">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Built for law firms
                </span>
                <p className="mt-10 text-sm font-medium text-white/80">What we offer</p>
                <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08]">
                  Drowning in admin?
                  <br />
                  Let AI run the
                  <br />
                  busywork.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">
                  From the first inquiry to the final draft, Lawrora handles the repetitive work so your attorneys can focus on practicing law.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Every lead captured and qualified, 24/7", "Matched to the right attorney instantly", "Drafts and research in seconds, not hours"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/90 text-black">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="mt-10 inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-white/85 transition-colors duration-200">
                  Explore services
                  <ChevronRight size={16} strokeWidth={2.2} />
                </Link>
              </div>

              {/* Scrolling service tiles */}
              <div className="relative grid h-130 grid-cols-2 gap-3 overflow-hidden px-4 lg:h-auto lg:min-h-180 lg:pl-0 lg:pr-6">
                {offerColumns.map((col, ci) => (
                  <div key={ci} className="relative overflow-hidden">
                    <div className={`absolute inset-x-0 top-0 flex flex-col ${ci === 0 ? "animate-scroll-up" : "animate-scroll-down"}`}>
                      {[...col, ...col].map((t, i) => (
                        <div key={i} className="pb-3" aria-hidden={i >= col.length}>
                          <div className={`relative flex h-96 flex-col justify-end overflow-hidden rounded-3xl ${t.bg} p-5`}>
                            <video
                              src={`${t.media}.mp4`}
                              poster={`${t.media}.jpg`}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              className="absolute inset-0 h-full w-full object-cover"
                              aria-hidden="true"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
                            <p className="relative text-3xl xl:text-4xl font-semibold leading-none">{t.stat}</p>
                            <p className="relative mt-3 text-sm leading-snug text-white/85">
                              {t.text}{" "}
                              <span className="font-semibold text-white underline decoration-2 underline-offset-4 decoration-white/60">{t.word}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
