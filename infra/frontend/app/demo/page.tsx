import type { Metadata } from "next"
import { Clock, FileText, PhoneIncoming, ShieldCheck, UserCheck } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import DemoPageForm from "../components/DemoPageForm"

export const metadata: Metadata = {
  title: "Book a Demo — See Lawrora Work on Your Real Intake",
  description:
    "30 minutes. No pitch deck. Watch Lawrora capture a lead, qualify a client, and draft a demand letter live on your actual workflow. HIPAA & SOC 2 compliant.",
  robots: { index: false, follow: false },
}

// What the visitor will actually see in the call, in the order it happens
const agenda = [
  { icon: PhoneIncoming, text: "A call to your intake line answered and qualified, live" },
  { icon: UserCheck,     text: "The lead matched to one of your own lawyers" },
  { icon: FileText,      text: "A demand letter drafted from the case file" },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <section className="px-3 pt-18 pb-5 md:px-5" aria-labelledby="demo-heading">
        <div className="rounded-4xl bg-linear-to-b from-[#b9b9b9] via-[#d6d6d6] to-[#f2f2f2] text-black">
          <div className="grid grid-cols-1 items-start gap-12 px-6 py-14 md:px-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-16 lg:py-20 xl:px-20">

            {/* The case for booking */}
            <aside className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/55">Book a demo</p>
              <h1 id="demo-heading" className="mt-5 font-serif text-[3.25rem] leading-[0.95] tracking-tight md:text-[4.75rem] lg:text-[4.25rem] xl:text-[5.25rem]">
                See Lawrora answer <em className="pr-[0.12em]">your</em> intake line.
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-black/75">
                Thirty minutes on your own workflow, not a slide deck. Bring a real scenario and watch it handled end to end.
              </p>

              <div className="mt-10 max-w-lg border-y border-black/15 py-7">
                <p className="text-sm font-semibold text-black/60">In 30 minutes you will see</p>
                <ol className="mt-5 space-y-4">
                  {agenda.map(({ icon: Icon, text }, i) => (
                    <li key={text} className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="text-base font-medium md:text-lg">
                        <span className="mr-2 font-mono text-sm text-black/40">{String(i + 1).padStart(2, "0")}</span>
                        {text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-black/70">
                <span className="flex items-center gap-2"><Clock size={16} strokeWidth={2} /> 30 minutes</span>
                <span className="text-black/30">/</span>
                <span>No pitch deck, no commitment</span>
                <span className="text-black/30">/</span>
                <span className="flex items-center gap-2"><ShieldCheck size={17} strokeWidth={1.8} /> HIPAA &amp; SOC 2 Type II</span>
              </div>
            </aside>

            {/* Booking */}
            <div className="rounded-4xl bg-[#0a0a0a] p-6 text-white shadow-2xl shadow-black/25 md:p-10">
              <p className="font-serif text-3xl leading-none tracking-tight md:text-4xl">Pick a time that suits you.</p>
              <p className="mt-3 text-sm text-white/55">You will get a calendar invite straight away.</p>
              <div className="mt-8">
                <DemoPageForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
