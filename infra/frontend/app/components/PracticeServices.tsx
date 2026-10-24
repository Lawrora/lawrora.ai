"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import {
  Car, House, HeartHandshake, Globe, Gavel, ScrollText, Briefcase, Building2, Check,
  Scale, ArrowUpRight, ChevronRight,
  type LucideIcon,
} from "lucide-react"

type Lever = { title: string; desc: string }
type Automation = { title: string; desc: string }

type InputField = {
  id: string
  label: string
  value: number
  prefix?: string
  suffix?: string
  max?: number
}

type Values = Record<string, number>

// One line of the estimate, as a monthly dollar value
type Result = { label: string; monthly: number; note: string }

type Practice = {
  name: string
  tagline: string
  icon: LucideIcon
  live: boolean
  levers: [Lever, Lever, Lever]
  automations: Automation[]
  fields: InputField[]
  estimate: (v: Values) => Result[]
}

const pct = (n: number) => n / 100
const perMonth = (weekly: number) => (weekly * 52) / 12
const round1 = (n: number) => n.toFixed(1)

const practices: Practice[] = [
  {
    name: "Personal Injury",
    tagline: "Accidents, injuries, claims",
    icon: Car,
    live: true,
    levers: [
      { title: "Sign the claims you miss today", desc: "Accident victims call the first firm that answers. Every call, text, and form is answered and qualified 24/7, so after-hours claims become signed cases instead of a competitor's." },
      { title: "Bigger settlements, faster", desc: "Demand letters drafted from the intake brief and backed by comparable verdicts mean stronger demands go out in days, not weeks." },
      { title: "More cases per attorney", desc: "Intake triage, records requests, and deadline tracking run on their own, so each attorney carries more matters without more staff." },
    ],
    automations: [
      { title: "After-hours accident intake", desc: "Calls, texts, and web forms answered 24/7, with incident date, injuries, and insurer captured." },
      { title: "Case value scoring", desc: "Liability, injury severity, and policy limits flagged so high-value claims are called first." },
      { title: "Medical records requests", desc: "Requests sent to every treating provider and chased until records arrive." },
      { title: "Demand letter drafting", desc: "Demands generated from intake facts and records, ready for attorney review." },
      { title: "Statute of limitations tracker", desc: "Every claim's filing deadline calendared from the incident date." },
      { title: "Client status updates", desc: "Automatic texts keep clients informed, cutting \"any update?\" calls." },
    ],
    fields: [
      { id: "inquiries", label: "Accident inquiries per month", value: 120 },
      { id: "missed", label: "Unanswered or after hours", value: 30, suffix: "%", max: 100 },
      { id: "sign", label: "Inquiries that sign", value: 15, suffix: "%", max: 100 },
      { id: "fee", label: "Average contingency fee", value: 12000, prefix: "$" },
      { id: "demands", label: "Demand letters per month", value: 10 },
      { id: "demandHours", label: "Hours per demand letter", value: 6 },
      { id: "saved", label: "Drafting time Lawrora saves", value: 60, suffix: "%", max: 100 },
      { id: "rate", label: "Attorney hourly value", value: 300, prefix: "$" },
    ],
    estimate: (v) => {
      const cases = v.inquiries * pct(v.missed) * pct(v.sign)
      const hours = v.demands * v.demandHours * pct(v.saved)
      return [
        { label: "New signed cases", monthly: cases * v.fee, note: `About ${round1(cases)} extra cases a month` },
        { label: "Demand drafting time recovered", monthly: hours * v.rate, note: `${Math.round(hours)} attorney hours a month` },
      ]
    },
  },
  {
    name: "Real Estate",
    tagline: "Closings, title, leasing",
    icon: House,
    live: true,
    levers: [
      { title: "Win the deal on first contact", desc: "Buyers, sellers, and agents get an instant response with transaction details captured, so the work lands with you, not the next firm on the list." },
      { title: "Close more transactions per week", desc: "Purchase agreements, title objections, and closing checklists drafted in seconds let the same team handle more volume." },
      { title: "No missed contingency dates", desc: "Inspection, financing, and closing deadlines are tracked automatically, avoiding costly extensions and write-offs." },
    ],
    automations: [
      { title: "Transaction intake", desc: "Property address, deal type, parties, and closing date captured on first contact." },
      { title: "Agent and lender coordination", desc: "Closing schedules confirmed with agents, lenders, and title companies automatically." },
      { title: "Purchase agreement and lease drafting", desc: "Contracts generated from deal terms with your standard clauses." },
      { title: "Title review checklist", desc: "Title commitments checked against a standard objection list." },
      { title: "Contingency deadline tracker", desc: "Inspection, financing, and appraisal windows calendared from the contract date." },
      { title: "Document collection", desc: "Clients reminded until IDs, payoff letters, and signed forms are in." },
    ],
    fields: [
      { id: "inquiries", label: "Transaction inquiries per month", value: 60 },
      { id: "missed", label: "Inquiries lost to slow response", value: 25, suffix: "%", max: 100 },
      { id: "convert", label: "Inquiries that engage you", value: 35, suffix: "%", max: 100 },
      { id: "fee", label: "Average fee per closing", value: 2500, prefix: "$" },
      { id: "closings", label: "Closings per month", value: 20 },
      { id: "closingHours", label: "Admin hours per closing", value: 5 },
      { id: "saved", label: "Admin time Lawrora saves", value: 60, suffix: "%", max: 100 },
      { id: "rate", label: "Staff hourly cost", value: 150, prefix: "$" },
    ],
    estimate: (v) => {
      const deals = v.inquiries * pct(v.missed) * pct(v.convert)
      const hours = v.closings * v.closingHours * pct(v.saved)
      return [
        { label: "New closings won", monthly: deals * v.fee, note: `About ${round1(deals)} extra closings a month` },
        { label: "Closing admin recovered", monthly: hours * v.rate, note: `${Math.round(hours)} staff hours a month` },
      ]
    },
  },
  {
    name: "Family Law",
    tagline: "Divorce, custody, support",
    icon: HeartHandshake,
    live: false,
    levers: [
      { title: "Retain more consultations", desc: "Sensitive divorce and custody inquiries are answered with care at any hour, so more consultations turn into paid retainers." },
      { title: "Less unbilled drafting", desc: "Petitions, disclosures, and parenting plans start from intake facts, cutting the hours that rarely make it onto an invoice." },
      { title: "Fewer costly continuances", desc: "Hearings, disclosure deadlines, and mediation dates are tracked across every case." },
    ],
    automations: [
      { title: "Confidential intake", desc: "Divorce and custody inquiries handled with care, with urgent safety matters flagged immediately." },
      { title: "Conflict check", desc: "The opposing party is checked against your client list before the consultation." },
      { title: "Financial disclosure collection", desc: "Clients guided through income, asset, and debt documents with reminders." },
      { title: "Petition and parenting plan drafting", desc: "First drafts generated from intake and disclosure facts." },
      { title: "Support guideline estimates", desc: "Child and spousal support estimates calculated for consultations." },
      { title: "Hearing and mediation calendar", desc: "Court dates and mediation sessions tracked, with client reminders." },
    ],
    fields: [
      { id: "consults", label: "Consultation requests per month", value: 40 },
      { id: "lost", label: "Requests that never book", value: 30, suffix: "%", max: 100 },
      { id: "retain", label: "Consultations that retain", value: 40, suffix: "%", max: 100 },
      { id: "retainer", label: "Average retainer", value: 5000, prefix: "$" },
      { id: "disclosures", label: "Financial disclosures per month", value: 8 },
      { id: "discHours", label: "Hours per disclosure", value: 6 },
      { id: "saved", label: "Time Lawrora saves", value: 50, suffix: "%", max: 100 },
      { id: "rate", label: "Attorney hourly rate", value: 275, prefix: "$" },
    ],
    estimate: (v) => {
      const clients = v.consults * pct(v.lost) * pct(v.retain)
      const hours = v.disclosures * v.discHours * pct(v.saved)
      return [
        { label: "New retainers", monthly: clients * v.retainer, note: `About ${round1(clients)} extra clients a month` },
        { label: "Disclosure work recovered", monthly: hours * v.rate, note: `${Math.round(hours)} attorney hours a month` },
      ]
    },
  },
  {
    name: "Immigration",
    tagline: "Visas, green cards, asylum",
    icon: Globe,
    live: false,
    levers: [
      { title: "Convert inquiries in every language", desc: "Prospective clients are screened in their own language around the clock, so fewer walk away before you speak to them." },
      { title: "Higher volume per paralegal", desc: "Petition packets, support letters, and RFE responses are drafted from client facts, multiplying the cases each team can file." },
      { title: "Protect your fees", desc: "Priority dates, filing windows, and hearings are tracked, so no case is lost to a missed deadline." },
    ],
    automations: [
      { title: "Multilingual intake", desc: "Inquiries answered in the client's language, with status and entry history captured." },
      { title: "Eligibility screening", desc: "Each inquiry matched to likely visa or relief categories before the consultation." },
      { title: "Document checklist and collection", desc: "Category-specific checklists sent and chased until complete." },
      { title: "Petition packet preparation", desc: "Forms, cover letters, and support letters assembled from client facts." },
      { title: "RFE response drafting", desc: "Draft responses generated from the request and the case file." },
      { title: "Priority date and case status monitoring", desc: "Visa bulletin and case status changes trigger alerts to your team." },
    ],
    fields: [
      { id: "inquiries", label: "Inquiries per month", value: 100 },
      { id: "lost", label: "Lost to language or after hours", value: 35, suffix: "%", max: 100 },
      { id: "retain", label: "Inquiries that retain", value: 20, suffix: "%", max: 100 },
      { id: "fee", label: "Average case fee", value: 4000, prefix: "$" },
      { id: "packets", label: "Petition packets per month", value: 15 },
      { id: "packetHours", label: "Hours per packet", value: 8 },
      { id: "saved", label: "Prep time Lawrora saves", value: 50, suffix: "%", max: 100 },
      { id: "rate", label: "Paralegal hourly cost", value: 120, prefix: "$" },
    ],
    estimate: (v) => {
      const cases = v.inquiries * pct(v.lost) * pct(v.retain)
      const hours = v.packets * v.packetHours * pct(v.saved)
      return [
        { label: "New cases retained", monthly: cases * v.fee, note: `About ${round1(cases)} extra cases a month` },
        { label: "Packet prep recovered", monthly: hours * v.rate, note: `${Math.round(hours)} paralegal hours a month` },
      ]
    },
  },
  {
    name: "Criminal Defense",
    tagline: "Arrests, charges, defense",
    icon: Gavel,
    live: false,
    levers: [
      { title: "Be the firm that answers at 2am", desc: "Arrest calls come at all hours. Immediate response with charges and court dates captured means you are retained before morning." },
      { title: "Faster motion work", desc: "Suppression motions and discovery requests drafted from case facts free attorney hours for billable court time." },
      { title: "Never lose a client to a missed date", desc: "Arraignments, hearings, and speedy-trial clocks are tracked automatically." },
    ],
    automations: [
      { title: "24/7 arrest call response", desc: "Family and defendant calls answered at any hour, with charges and custody status captured." },
      { title: "Court date capture", desc: "Arraignment and hearing dates pulled from intake and calendared." },
      { title: "Fee agreement and payment plans", desc: "Engagement letters sent and payment reminders handled automatically." },
      { title: "Discovery and motion drafting", desc: "Discovery requests and suppression motions drafted from case facts." },
      { title: "Speedy-trial clock", desc: "Statutory time limits tracked with alerts before they run." },
      { title: "Family updates", desc: "Approved contacts kept informed without tying up your staff." },
    ],
    fields: [
      { id: "calls", label: "Arrest calls per month", value: 60 },
      { id: "unanswered", label: "Calls missed or after hours", value: 30, suffix: "%", max: 100 },
      { id: "retain", label: "Calls that retain", value: 25, suffix: "%", max: 100 },
      { id: "fee", label: "Average flat fee", value: 5000, prefix: "$" },
      { id: "motions", label: "Motions per month", value: 10 },
      { id: "motionHours", label: "Hours per motion", value: 5 },
      { id: "saved", label: "Drafting time Lawrora saves", value: 50, suffix: "%", max: 100 },
      { id: "rate", label: "Attorney hourly value", value: 250, prefix: "$" },
    ],
    estimate: (v) => {
      const clients = v.calls * pct(v.unanswered) * pct(v.retain)
      const hours = v.motions * v.motionHours * pct(v.saved)
      return [
        { label: "New clients retained", monthly: clients * v.fee, note: `About ${round1(clients)} extra clients a month` },
        { label: "Motion drafting recovered", monthly: hours * v.rate, note: `${Math.round(hours)} attorney hours a month` },
      ]
    },
  },
  {
    name: "Estate Planning",
    tagline: "Wills, trusts, probate",
    icon: ScrollText,
    live: false,
    levers: [
      { title: "Book more planning meetings", desc: "Inquiries are qualified and booked straight onto your calendar, with family and asset details captured before the meeting." },
      { title: "Flat fees, fewer hours", desc: "Wills, trusts, and powers of attorney drafted from questionnaires make every flat-fee plan more profitable." },
      { title: "Steady probate pipeline", desc: "Probate filings and creditor notice periods are tracked so matters close on time and bill sooner." },
    ],
    automations: [
      { title: "Planning questionnaire", desc: "Family, asset, and beneficiary details collected before the first meeting." },
      { title: "Meeting and signing scheduling", desc: "Design and signing meetings booked straight onto your calendar." },
      { title: "Will and trust drafting", desc: "Wills, trusts, and powers of attorney drafted from the questionnaire." },
      { title: "Asset and beneficiary summary", desc: "A one-page summary of the estate prepared for every plan." },
      { title: "Probate deadline tracking", desc: "Filing deadlines and creditor notice periods calendared." },
      { title: "Plan review reminders", desc: "Clients prompted to review their plans, bringing back repeat work." },
    ],
    fields: [
      { id: "inquiries", label: "Planning inquiries per month", value: 40 },
      { id: "unbooked", label: "Inquiries that never book", value: 25, suffix: "%", max: 100 },
      { id: "close", label: "Meetings that buy a plan", value: 50, suffix: "%", max: 100 },
      { id: "planFee", label: "Average plan fee", value: 3000, prefix: "$" },
      { id: "plans", label: "Plans drafted per month", value: 12 },
      { id: "planHours", label: "Drafting hours per plan", value: 4 },
      { id: "saved", label: "Drafting time Lawrora saves", value: 60, suffix: "%", max: 100 },
      { id: "rate", label: "Attorney hourly value", value: 250, prefix: "$" },
    ],
    estimate: (v) => {
      const plans = v.inquiries * pct(v.unbooked) * pct(v.close)
      const hours = v.plans * v.planHours * pct(v.saved)
      return [
        { label: "New plans sold", monthly: plans * v.planFee, note: `About ${round1(plans)} extra plans a month` },
        { label: "Drafting time recovered", monthly: hours * v.rate, note: `${Math.round(hours)} attorney hours a month` },
      ]
    },
  },
  {
    name: "Employment Law",
    tagline: "Wages, discrimination, termination",
    icon: Briefcase,
    live: false,
    levers: [
      { title: "Spot the strong claims first", desc: "Every wage, discrimination, and termination inquiry is screened and scored, so attorneys spend time on the cases worth taking." },
      { title: "Faster demands and charges", desc: "Demand letters and agency charges drafted from intake facts move claims toward resolution sooner." },
      { title: "No claims lost to filing windows", desc: "EEOC and right-to-sue deadlines are tracked from day one." },
    ],
    automations: [
      { title: "Claim screening", desc: "Wage, discrimination, and termination inquiries scored for viability before an attorney reads them." },
      { title: "Agency deadline tracker", desc: "EEOC and state agency filing windows calculated from the adverse action date." },
      { title: "Wage loss calculation", desc: "Back pay and overtime estimates calculated from pay records." },
      { title: "Demand letter and charge drafting", desc: "Demand letters and agency charges drafted from intake facts." },
      { title: "Evidence collection", desc: "Clients prompted for pay stubs, emails, and performance reviews." },
      { title: "Right-to-sue alerts", desc: "Notice dates tracked so suits are filed in time." },
    ],
    fields: [
      { id: "inquiries", label: "Claim inquiries per month", value: 80 },
      { id: "viable", label: "Inquiries that are viable", value: 20, suffix: "%", max: 100 },
      { id: "missed", label: "Viable claims lost today", value: 25, suffix: "%", max: 100 },
      { id: "fee", label: "Average fee per matter", value: 15000, prefix: "$" },
      { id: "screenHours", label: "Hours screening per week", value: 10 },
      { id: "saved", label: "Screening time Lawrora saves", value: 70, suffix: "%", max: 100 },
      { id: "rate", label: "Attorney hourly value", value: 300, prefix: "$" },
    ],
    estimate: (v) => {
      const cases = v.inquiries * pct(v.viable) * pct(v.missed)
      const hours = perMonth(v.screenHours) * pct(v.saved)
      return [
        { label: "Viable claims recovered", monthly: cases * v.fee, note: `About ${round1(cases)} extra matters a month` },
        { label: "Screening time recovered", monthly: hours * v.rate, note: `${Math.round(hours)} attorney hours a month` },
      ]
    },
  },
  {
    name: "Corporate / Business",
    tagline: "Formation, contracts, compliance",
    icon: Building2,
    live: false,
    levers: [
      { title: "Respond before the deal moves on", desc: "Founders and executives get an immediate, informed response with deal size and timeline captured." },
      { title: "More profitable fixed-fee work", desc: "NDAs, operating agreements, and contracts drafted from deal terms cut the hours behind every fixed-fee engagement." },
      { title: "Recurring compliance revenue", desc: "Annual filings and contract renewals are tracked, turning one-off clients into recurring work." },
    ],
    automations: [
      { title: "Entity formation intake", desc: "Founders, ownership, and entity type captured and formation documents prepared." },
      { title: "Contract and NDA drafting", desc: "Agreements drafted from term sheets using your clause library." },
      { title: "Board resolution drafting", desc: "Resolutions and consents generated from meeting notes." },
      { title: "Annual filing tracker", desc: "State annual reports and franchise taxes calendared for every client entity." },
      { title: "Contract renewal alerts", desc: "Renewal and termination notice dates flagged before they pass." },
      { title: "Client onboarding", desc: "Engagement letters, KYC, and conflict checks handled automatically." },
    ],
    fields: [
      { id: "contracts", label: "Contracts drafted per month", value: 25 },
      { id: "contractHours", label: "Hours per contract", value: 4 },
      { id: "saved", label: "Drafting time Lawrora saves", value: 50, suffix: "%", max: 100 },
      { id: "rate", label: "Attorney hourly value", value: 350, prefix: "$" },
      { id: "clients", label: "Clients with annual filings", value: 40 },
      { id: "complianceFee", label: "Annual compliance fee per client", value: 1200, prefix: "$" },
      { id: "missedRenewals", label: "Filings or renewals missed today", value: 15, suffix: "%", max: 100 },
    ],
    estimate: (v) => {
      const hours = v.contracts * v.contractHours * pct(v.saved)
      const recovered = v.clients * pct(v.missedRenewals)
      return [
        { label: "Drafting time recovered", monthly: hours * v.rate, note: `${Math.round(hours)} attorney hours a month` },
        { label: "Compliance revenue kept", monthly: (recovered * v.complianceFee) / 12, note: `About ${round1(recovered)} clients a year no longer missed` },
      ]
    },
  },
]

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

// Card colours, in the same muted palette as the homepage; indexed by practice order
const practiceColors = ["#6b8fc4", "#7fa383", "#a88b78", "#9a88cf", "#c4877a", "#5f9ea0", "#c9a25f", "#8a6f9e"]

function NumberField({ field, value, onChange }: { field: InputField; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/50 mb-2">{field.label}</span>
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:border-white/40 transition-colors">
        {field.prefix && <span className="pl-4 text-white/40">{field.prefix}</span>}
        <input
          type="number"
          min={0}
          max={field.max}
          value={value}
          onChange={(e) => onChange(Math.max(0, Math.min(field.max ?? Infinity, e.target.valueAsNumber || 0)))}
          className="w-full bg-transparent px-4 py-3 text-white text-lg font-semibold focus:outline-none tabular-nums"
        />
        {field.suffix && <span className="pr-4 text-white/40 text-sm whitespace-nowrap">{field.suffix}</span>}
      </div>
    </label>
  )
}

function ProfitView({ practice, color }: { practice: Practice; color: string }) {
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(practice.fields.map((f) => [f.id, f.value]))
  )
  const results = practice.estimate(values)
  const annual = results.reduce((sum, r) => sum + r.monthly, 0) * 12

  return (
    <div className="animate-fade-in">
      <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 text-xs font-medium text-black/70">
        <span className={`h-1.5 w-1.5 rounded-full ${practice.live ? "bg-emerald-500" : "bg-amber-500"}`} />
        {practice.live ? `Live for ${practice.name} firms` : "Early access"}
      </span>
      <h2 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-5xl">
        What Lawrora is worth to your {practice.name} firm
      </h2>
      <p className="mt-6 text-base md:text-lg text-black/60 max-w-2xl">
        {practice.live
          ? `Lawrora is live for ${practice.name} firms today.`
          : `${practice.name} support is on our roadmap. Book a demo to join early access.`}
      </p>

      {/* Profit levers */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
        {practice.levers.map((l, i) => (
          <div key={l.title} className="flex min-h-72 flex-col rounded-4xl p-8 text-white" style={{ backgroundColor: color }}>
            <span className="text-5xl font-semibold text-white/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-auto pt-10 text-2xl font-semibold leading-tight">{l.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{l.desc}</p>
          </div>
        ))}
      </div>

      {/* Automations */}
      <div className="mt-24">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Automations built for {practice.name}</h3>
        <p className="mt-4 text-base text-black/60 max-w-2xl">
          The work Lawrora takes off your team&apos;s plate, from first contact to close.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practice.automations.map((a) => (
            <div key={a.title} className="rounded-3xl bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
                <Check size={15} strokeWidth={3} />
              </span>
              <h4 className="mt-5 text-lg font-semibold">{a.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Estimator */}
      <div className="mt-24 overflow-hidden rounded-4xl bg-[#0a0a0a] text-white">
        <div className="relative px-6 py-12 md:px-14 md:py-16">
          <div className="pointer-events-none absolute -left-40 top-1/3 h-[140%] w-[90%] rounded-full bg-white/5 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">Estimate your return</h3>
            <p className="mt-4 text-base text-white/55 max-w-2xl">
              Starting values are placeholders. Replace them with your firm&apos;s numbers.
            </p>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 content-start">
                {practice.fields.map((f) => (
                  <NumberField
                    key={f.id}
                    field={f}
                    value={values[f.id]}
                    onChange={(v) => setValues((prev) => ({ ...prev, [f.id]: v }))}
                  />
                ))}
              </div>

              <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
                <div className="space-y-8">
                  {results.map((r) => (
                    <div key={r.label}>
                      <p className="text-xs font-medium text-white/50 mb-2">{r.label}</p>
                      <p className="text-3xl font-semibold tabular-nums">{usd(r.monthly)}<span className="text-base text-white/40 font-medium"> / month</span></p>
                      <p className="text-xs text-white/40 mt-1">{r.note}</p>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-8">
                    <p className="text-xs font-medium text-white/50 mb-2">Potential added value per year</p>
                    <p className="text-5xl md:text-6xl font-semibold tabular-nums">{usd(annual)}</p>
                  </div>
                </div>
                <div className="mt-10">
                  <Link
                    href="/demo"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/85"
                  >
                    Book a Demo
                    <ChevronRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                  <p className="text-[11px] text-white/35 mt-4 leading-relaxed">
                    Estimate only, based on the figures above. Actual results depend on your firm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PracticeServices() {
  const [selected, setSelected] = useState<number | null>(null)
  const resultsRef = useRef<HTMLElement>(null)
  const practice = selected === null ? null : practices[selected]

  function choose(i: number) {
    setSelected(i)
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  return (
    <>
      {/* ── Hero: practice selector ──────────────────────────── */}
      <section className="bg-[#0a0a0a] px-3 md:px-5 pt-18 pb-5" aria-labelledby="services-hero-heading">
        <div className="rounded-4xl bg-linear-to-b from-[#b9b9b9] via-[#d6d6d6] to-[#f2f2f2] text-black px-6 md:px-14 lg:px-20 py-14 lg:py-20">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
              <Scale size={20} strokeWidth={2} />
            </span>
            <div className="leading-tight">
              <p className="text-base font-semibold">Services by practice area</p>
              <p className="text-sm text-black/70">Pick yours to see what Lawrora automates</p>
            </div>
          </div>

          <h1
            id="services-hero-heading"
            className="mt-8 font-serif text-[3.25rem] md:text-[6rem] xl:text-[7rem] leading-[0.95] tracking-tight"
          >
            What law do you practise?
          </h1>

          <div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            role="radiogroup"
            aria-labelledby="services-hero-heading"
          >
            {practices.map((p, i) => {
              const Icon = p.icon
              const active = selected === i
              return (
                <button
                  key={p.name}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => choose(i)}
                  style={{ backgroundColor: practiceColors[i % practiceColors.length] }}
                  className={`group relative flex min-h-48 flex-col items-start overflow-hidden rounded-3xl p-6 text-left text-white transition-all duration-300 ${
                    active
                      ? "ring-4 ring-black ring-offset-4 ring-offset-[#e0e0e0] -translate-y-1"
                      : "hover:-translate-y-1 hover:shadow-xl"
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="mt-auto pt-8 block text-2xl font-semibold leading-tight">{p.name}</span>
                  <span className="mt-1 block text-sm text-white/75">{p.tagline}</span>
                  <span className="absolute top-5 right-5 flex items-center gap-2">
                    {p.live && (
                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                        Live
                      </span>
                    )}
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                        active ? "bg-white text-black" : "bg-white/20 text-white group-hover:bg-white group-hover:text-black"
                      }`}
                    >
                      {active ? <Check size={14} strokeWidth={3} /> : <ArrowUpRight size={14} strokeWidth={2.2} />}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Profit view for the selected practice ────────────── */}
      {practice && selected !== null && (
        <section ref={resultsRef} className="scroll-mt-16 bg-[#f5f0e8] text-black px-4 md:px-16 lg:px-24 py-24">
          <div className="mx-auto max-w-7xl">
            {/* key resets the estimator to this practice's fields */}
            <ProfitView key={practice.name} practice={practice} color={practiceColors[selected % practiceColors.length]} />
          </div>
        </section>
      )}
    </>
  )
}
