import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WorkflowSection from "./components/WorkflowSection"
import DemoForm from "./components/DemoForm"

const featureStrip = [
  {
    title: "Lead Capture",
    desc: "Catches every inbound lead from call, text, and web, around the clock.",
    color: "bg-blue-500",
  },
  {
    title: "AI Qualification",
    desc: "Engages prospects in real time to assess case fit before any attorney time is spent.",
    color: "bg-violet-500",
  },
  {
    title: "Lawyer Matching",
    desc: "Routes each lead to the right attorney by practice area and availability.",
    color: "bg-emerald-500",
  },
  {
    title: "Demand Letter Drafting",
    desc: "Generates first-draft demand letters from case facts in seconds, ready for attorney review.",
    color: "bg-orange-500",
  },
  {
    title: "Case Research",
    desc: "Surfaces relevant precedents, statutes, and secondary sources in seconds.",
    color: "bg-amber-500",
  },
  {
    title: "Strategy Guidance",
    desc: "Suggests next steps and litigation approaches based on case facts.",
    color: "bg-rose-500",
  },
  {
    title: "Smart Scheduling",
    desc: "Manages attorney calendars, deadlines, and client coordination automatically.",
    color: "bg-cyan-500",
  },
]


const faqs = [
  {
    q: "How does Lawrora handle leads that come in by phone?",
    a: "Lawrora integrates with your existing phone lines. When a call comes in, AI joins the conversation, qualifies the prospect, and prepares a brief. The attorney picks up a pre-qualified call.",
  },
  {
    q: "How does the lawyer matching work?",
    a: "Match AI considers practice area, jurisdiction, attorney availability, and current caseload to recommend the best-fit attorney and route the lead directly to them.",
  },
  {
    q: "Which practice areas are supported in Phase 1?",
    a: "Phase 1 is purpose-built for Personal Injury and Real Estate, the two highest-volume practice areas. Additional practice areas are on the roadmap.",
  },
  {
    q: "Is client data kept secure?",
    a: "Yes. All data is encrypted at rest and in transit. We are SOC 2 Type II compliant and never train models on your client data.",
  },
  {
    q: "How does Lawrora integrate with existing legal software?",
    a: "Lawrora connects via API to major practice management systems including Clio, MyCase, and Filevine. Setup takes under a day.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most firms are fully onboarded within 48 hours. Our team handles configuration and provides live training for your staff.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E2C]">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-0 px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[520px]">

          {/* Left */}
          <div className="py-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-[#FCF9EA] text-[#0E0E2C]/60 px-3 py-1.5 rounded-full mb-6">
              Your AI Paralegal
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
              Every Lead Routed.<br />Every Case Prepared.
            </h1>

            <p className="text-base text-[#0E0E2C]/60 leading-relaxed mb-8 max-w-lg">
              Lawrora is your AI paralegal. It captures leads, qualifies them, drafts demand letters and documents, and routes each client to the right attorney. Then it keeps working inside the case.
            </p>

            <Link
              href="#demo"
              className="inline-block rounded-full bg-[#0E0E2C] px-7 py-3 text-sm font-semibold text-white hover:bg-[#0E0E2C]/85 transition-colors mb-10"
            >
              Book a Demo
            </Link>

            <div className="flex flex-wrap gap-6">
              {[
                "No lead left behind",
                "Right lawyer, every time",
                "Attorneys focused on law",
              ].map((stat) => (
                <div key={stat} className="flex items-center gap-2 text-sm text-[#0E0E2C]/65">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  {stat}
                </div>
              ))}
            </div>
          </div>

          {/* Right: lead flow diagram */}
          <div className="hidden md:flex flex-col items-center justify-center bg-[#0E0E2C] rounded-2xl h-[400px] p-8 gap-5">

            {/* Channels */}
            <div className="flex gap-3">
              {/* Call */}
              <div className="flex items-center gap-2 rounded-xl bg-white/8 border border-white/10 px-4 py-2.5">
                <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l1.93-1.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <span className="text-xs font-semibold text-white/70">Call</span>
              </div>
              {/* Text */}
              <div className="flex items-center gap-2 rounded-xl bg-white/8 border border-white/10 px-4 py-2.5">
                <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </span>
                <span className="text-xs font-semibold text-white/70">Text</span>
              </div>
              {/* Web */}
              <div className="flex items-center gap-2 rounded-xl bg-white/8 border border-white/10 px-4 py-2.5">
                <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </span>
                <span className="text-xs font-semibold text-white/70">Web</span>
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-5 bg-white/15" />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            {/* AI box */}
            <div className="flex items-center gap-3 rounded-2xl bg-[#FCF9EA] px-6 py-4 w-56">
              <div className="w-8 h-8 rounded-lg bg-[#0E0E2C]/8 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0E0E2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0E0E2C]">AI Qualifies &amp; Matches</p>
                <p className="text-[10px] text-[#0E0E2C]/50 mt-0.5">Scores, routes, and briefs</p>
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-5 bg-white/15" />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            {/* Outcome */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 w-56">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(52,211,153)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Right Attorney, Instantly</p>
                <p className="text-[10px] text-white/40 mt-0.5">Pre-qualified case brief ready</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Feature strip: auto-scrolling marquee */}
      <section className="bg-[#F8F7F2] border-y border-[#0E0E2C]/6 py-8 mt-8 overflow-hidden">
        <div className="flex animate-marquee w-max gap-16 px-8">
          {[...featureStrip, ...featureStrip].map((f, i) => (
            <div key={i} className="flex items-start gap-3 w-[220px] shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${f.color}`} />
              <div>
                <p className="text-sm font-semibold text-[#0E0E2C]">{f.title}</p>
                <p className="text-xs text-[#0E0E2C]/50 mt-0.5 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-20 px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40 mb-3">AI Paralegal</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-xl leading-tight">What your AI paralegal handles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tag: "For the firm",
                title: "Lead Intelligence",
                desc: "AI captures every call, text, and web inquiry, qualifies the prospect in real time, and routes the right lead to the right attorney. No one picks up until the lead is scored.",
                bullets: ["24/7 multi-channel capture", "Live AI qualification", "Instant attorney routing"],
                accent: "bg-blue-500",
              },
              {
                tag: "For the attorney",
                title: "Counsel AI",
                desc: "Inside every active matter, attorneys get AI-assisted research, relevant precedents, and suggested next steps. They spend their time on judgment, not search.",
                bullets: ["Case law & statute research", "Strategy suggestions", "Pre-built case briefs"],
                accent: "bg-violet-500",
              },
              {
                tag: "For the case",
                title: "Draft AI",
                desc: "Generates demand letters, retainer agreements, and filing drafts straight from case facts. First drafts are ready in seconds and formatted for attorney review.",
                bullets: ["Demand letter generation", "Retainer & agreement drafts", "Filing and motion templates"],
                accent: "bg-orange-500",
              },
              {
                tag: "For the practice",
                title: "Smart Scheduling",
                desc: "Schedule AI tracks every calendar event, filing deadline, and time entry automatically. Every matter stays on track without admin overhead.",
                bullets: ["Deadline & calendar sync", "Conflict detection", "Automated time tracking"],
                accent: "bg-emerald-500",
              },
            ].map((card) => (
              <div
                key={card.tag}
                className="rounded-2xl border border-[#0E0E2C]/8 bg-[#FCF9EA] p-8 flex flex-col gap-4 hover:border-[#0E0E2C]/20 transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/35">{card.tag}</span>
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="text-sm text-[#0E0E2C]/60 leading-relaxed">{card.desc}</p>
                <ul className="space-y-2 mt-auto pt-4 border-t border-[#0E0E2C]/8">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs font-medium text-[#0E0E2C]/70">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${card.accent}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 1 */}
      <section className="py-24 px-8 bg-[#0E0E2C] text-white">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/8 text-white/50 px-3 py-1.5 rounded-full mb-6">
              Phase 1
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
              Built first for Personal Injury<br />and Real Estate
            </h2>
            <p className="text-white/50 mt-4 max-w-xl leading-relaxed text-sm">
              Two of the highest-volume, most time-sensitive practice areas. Lawrora is purpose-built for the specific intake, matching, and case workflows each one demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Personal Injury */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(251,146,60)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-white/35">Practice Area</p>
                  <h3 className="text-lg font-bold">Personal Injury</h3>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "AI screens injury claims 24/7 across call, text, and web",
                  "Liability and case value scored before the first attorney call",
                  "Auto-routes to the right injury attorney by case type",
                  "Medical records and evidence checklist generated instantly",
                  "Relevant precedents surfaced before the intake meeting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Real Estate */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(52,211,153)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-white/35">Practice Area</p>
                  <h3 className="text-lg font-bold">Real Estate</h3>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Transaction intake captured from any channel in minutes",
                  "Contract review with AI-flagged risk clauses highlighted",
                  "Deadline and contingency tracking across all open matters",
                  "Matches clients to the right transactional attorney instantly",
                  "Jurisdiction-specific forms drafted and ready to review",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      <WorkflowSection />

      {/* FAQ */}
      <section className="py-20 px-8 bg-[#FCF9EA]">
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40 mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className={`py-6 ${i < faqs.length - 1 || faqs.length % 2 === 0 ? "border-b border-[#0E0E2C]/10" : ""}`}>
                <p className="text-sm font-semibold text-[#0E0E2C] mb-2">{faq.q}</p>
                <p className="text-sm text-[#0E0E2C]/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Demo request */}
      <section id="demo" className="py-24 px-8 bg-[#0E0E2C] text-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: persuasion */}
          <div className="md:sticky md:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Book a demo</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              See exactly what Lawrora can do for your firm in 30 minutes.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              No slides. No sales pitch. We&apos;ll run Lawrora live on a real workflow and show you what changes for your team from day one.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { icon: "⚡", text: "Live walkthrough tailored to your practice area" },
                { icon: "🔒", text: "Your data stays yours. We never train on client information." },
                { icon: "📅", text: "Set up in under 48 hours. No IT team required." },
                { icon: "💬", text: "Ask anything. Our team answers every question on the call." },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="text-base leading-none mt-0.5">{icon}</span>
                  {text}
                </li>
              ))}
            </ul>

            <p className="text-xs text-white/30 italic">
              Firms that book a demo typically go live within one week.
            </p>
          </div>

          {/* Right: form */}
          <DemoForm />

        </div>
      </section>

      <Footer />
    </main>
  )
}
