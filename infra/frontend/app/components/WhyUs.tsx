import Link from "next/link"
import { Check, Minus, Scale, ShieldCheck, SlidersHorizontal, X } from "lucide-react"
import FadeIn from "./FadeIn"

// Why Lawrora: how it compares with the usual alternatives, then the principles
// behind it (from the product's "what makes it different")

type Mark = "yes" | "partly" | "no"

const ROWS: { label: string; service: Mark; form: Mark }[] = [
  { label: "Answers calls and texts at 2 AM",           service: "yes",    form: "no" },
  { label: "Qualifies by your firm's criteria",         service: "partly", form: "partly" },
  { label: "Checks the statute of limitations",         service: "no",     form: "no" },
  { label: "Matches the lead to the right lawyer",      service: "no",     form: "partly" },
  { label: "Sends your retainer for e-signature",       service: "no",     form: "partly" },
  { label: "Drafts the demand letter from the file",    service: "no",     form: "no" },
  { label: "One record from first call to invoice",     service: "no",     form: "no" },
]

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "The AI is kept honest",
    desc: "Deadline checks, date sanity, email confirmation, consent and hand-over to a person are enforced in code, not left to the model.",
  },
  {
    icon: Scale,
    title: "Matching you can explain",
    desc: "Leads are assigned by a clear rule built on your own lawyers' licences, availability and track record. No black box, no per-lead fee.",
  },
  {
    icon: SlidersHorizontal,
    title: "Your firm's rules",
    desc: "Your retainer text, your fee terms. Deadlines are always entered by a lawyer, and every AI estimate is labelled as an estimate.",
  },
]

function Cell({ mark, highlight = false }: { mark: Mark; highlight?: boolean }) {
  if (mark === "yes") {
    return (
      <span className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${highlight ? "bg-black text-white" : "bg-white/15 text-white"}`}>
        <Check size={15} strokeWidth={3} />
      </span>
    )
  }
  if (mark === "partly") {
    return <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full text-white/50"><Minus size={16} strokeWidth={2.5} /></span>
  }
  return <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full text-white/25"><X size={15} strokeWidth={2.5} /></span>
}

export default function WhyUs() {
  return (
    <section className="bg-[#0a0a0a] text-white px-4 md:px-8 py-20 md:py-28" aria-labelledby="why-us-heading">
      <div className="mx-auto max-w-400 w-full">
        <FadeIn className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Why us</p>
            <h2 id="why-us-heading" className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
              Not an answering service. <em>Not another form.</em>
            </h2>
          </div>
          <p className="max-w-xl text-base md:text-lg leading-relaxed text-white/65 lg:justify-self-end">
            Answering services take messages. Intake forms wait to be filled in. Lawrora answers, qualifies, matches and keeps the case moving, all in one record.
          </p>
        </FadeIn>

        {/* Comparison */}
        <FadeIn delay={100} className="mt-14">
          <div className="overflow-x-auto rounded-4xl bg-white/5 text-white ring-1 ring-white/10">
            <table className="w-full min-w-160 border-collapse text-left">
              <thead>
                <tr className="text-sm">
                  <th className="px-6 py-6 font-medium text-white/50 md:px-10">What happens to a new lead</th>
                  <th className="w-36 px-3 py-6 text-center font-medium text-white/50 md:w-44">Answering service</th>
                  <th className="w-36 px-3 py-6 text-center font-medium text-white/50 md:w-44">Intake form + CRM</th>
                  <th className="w-36 rounded-t-3xl bg-white px-3 py-6 text-center md:w-44">
                    <span className="font-serif text-2xl text-black">Lawrora</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} className="border-t border-white/10">
                    <td className="px-6 py-4 text-base md:px-10">{row.label}</td>
                    <td className="px-3 py-4"><Cell mark={row.service} /></td>
                    <td className="px-3 py-4"><Cell mark={row.form} /></td>
                    <td className={`bg-white px-3 py-4 ${i === ROWS.length - 1 ? "rounded-b-3xl" : ""}`}><Cell mark="yes" highlight /></td>
                  </tr>
                ))}
                <tr><td colSpan={4} className="h-6" /></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 flex items-center gap-4 text-xs text-white/45">
            <span className="flex items-center gap-1.5"><Check size={13} strokeWidth={3} /> Yes</span>
            <span className="flex items-center gap-1.5"><Minus size={13} strokeWidth={3} /> Partly or with extra tools</span>
            <span className="flex items-center gap-1.5"><X size={13} strokeWidth={3} /> No</span>
          </p>
        </FadeIn>

        {/* Principles */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={150 + i * 100}>
              <div className="h-full rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/60">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300} className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link href="/demo" className="inline-flex items-center rounded-full bg-white px-9 py-4.5 text-base md:text-lg font-semibold text-black hover:bg-white/85 transition-colors duration-200">
            Book a Demo
          </Link>
          <span className="flex items-center gap-2 text-sm text-white/55">
            <ShieldCheck size={17} strokeWidth={1.8} /> HIPAA &amp; SOC 2 Type II
          </span>
        </FadeIn>
      </div>
    </section>
  )
}
