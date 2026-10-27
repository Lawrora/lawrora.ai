import {
  BellRing, BookOpen, CalendarCheck, CalendarPlus, CheckCircle2, FilePen, FileText, FolderOpen, Globe, ListChecks,
  MessageSquare, Phone, PhoneIncoming, Scale, Send, UserCheck,
} from "lucide-react"
import type { Story } from "./ProductStory"
import {
  AlertVisual, CalendarVisual, CaseVisual, ChannelsVisual, ChatVisual, ChecklistVisual, DocVisual, RouteVisual,
  ScoreVisual, SearchVisual,
} from "./StoryVisuals"

// What each product page explains under its hero. Accents match the case-file colours.

export const LEAD_AI: Story = {
  name: "Lead AI",
  accent: "#3b82f6",
  howTitle: <>How Lead AI <em>works.</em></>,
  steps: [
    {
      icon: PhoneIncoming, title: "A client reaches out",
      desc: "They call, text or fill in your website form, at any hour. Lead AI is listening on every channel at once.",
      visual: <ChannelsVisual hub="Answered in seconds" channels={[{ icon: Phone, label: "Phone call" }, { icon: MessageSquare, label: "Text" }, { icon: Globe, label: "Web form" }]} />,
    },
    {
      icon: MessageSquare, title: "It asks your questions",
      desc: "Lawrora talks with them the way a trained intake specialist would, one question at a time, and saves every answer as it goes.",
      visual: <ChatVisual lines={[{ from: "client", text: "I was rear-ended last Tuesday." }, { from: "ai", text: "I'm sorry. Were you hurt?" }, { from: "client", text: "My neck. I saw urgent care." }, { from: "ai", text: "Did police come to the scene?" }]} />,
    },
    {
      icon: UserCheck, title: "You get a qualified lead",
      desc: "Good cases land with the right lawyer, with the facts already written up. Poor fits never take up your time.",
      visual: <RouteVisual from={{ title: "Maria Alvarez", meta: "Auto accident · Qualified" }} to={{ initials: "PS", name: "Priya Sharma", note: "Texted at 2:17 AM" }} />,
    },
  ],
  whyTitle: <>Stop losing clients to <em>voicemail.</em></>,
  without: [
    "Calls after 6 PM and at weekends go to voicemail",
    "The caller rings the next firm on their list",
    "Staff spend mornings on calls that were never viable",
    "Details get lost between sticky notes and the CRM",
  ],
  with: [
    "Every call and text answered in seconds, day or night",
    "You are the first firm to pick up, every time",
    "Only qualified leads reach your lawyers",
    "Every answer saved, with the full transcript",
  ],
  gainTitle: <>A front desk that <em>never closes.</em></>,
  gains: [
    { value: "24/7", title: "Always answered", desc: "Nights, weekends and holidays, by voice or text." },
    { value: "Secs", title: "To pick up", desc: "No hold music and no call-back queue." },
    { value: "Every", title: "Call transcribed", desc: "Read exactly what was said, any time." },
    { value: "Zero", title: "Voicemails", desc: "Nothing waiting for you on Monday morning." },
  ],
  ctaTitle: "Hear Lead AI answer your own intake line.",
}

export const MATCH_AI: Story = {
  name: "Match AI",
  accent: "#8b5cf6",
  howTitle: <>How Match AI <em>works.</em></>,
  steps: [
    {
      icon: ListChecks, title: "A lead is qualified",
      desc: "Once Lead AI has the answers it needs, the case is ready to be handed to one of your lawyers.",
      visual: <ChecklistVisual title="Maria Alvarez · Auto accident" items={["Injured, treated next day", "Within the filing deadline", "Not already represented", "Other driver cited"]} />,
    },
    {
      icon: Scale, title: "Your lawyers are compared",
      desc: "Each lawyer is scored on whether they are licensed in that state, free to take it on, and how they have done on cases like it.",
      visual: <ScoreVisual rows={[{ name: "Priya Sharma", note: "Licensed TX · available · strong record", pct: 96 }, { name: "Daniel Cho", note: "Licensed TX · busy this week", pct: 74 }, { name: "Elena Russo", note: "Not licensed in TX", pct: 31 }]} />,
    },
    {
      icon: BellRing, title: "The best fit gets a text",
      desc: "The chosen lawyer is told straight away, without client details in the text, and opens the lead in the portal to accept it.",
      visual: <AlertVisual time="2:17" from="Lawrora" text="New lead matched to you. Review it on your Leads page." />,
    },
  ],
  whyTitle: <>The right lawyer, <em>every time.</em></>,
  without: [
    "New leads sit in a shared inbox until someone notices",
    "Cases go to whoever happens to be free",
    "A lawyer licensed in the wrong state picks it up",
    "Hours pass before anyone calls the client back",
  ],
  with: [
    "Assigned the moment the lead is qualified",
    "Matched on licence, availability and track record",
    "A clear rule you can explain, not a black box",
    "The lawyer is notified within seconds",
  ],
  gainTitle: <>Faster hand-offs, <em>fairer workloads.</em></>,
  gains: [
    { value: "Secs", title: "Lead to lawyer", desc: "No triage meeting, no manual assignment." },
    { value: "Why", title: "Shown for every match", desc: "See exactly why each lawyer was chosen." },
    { value: "Even", title: "Workloads", desc: "Availability is part of every decision." },
    { value: "$0", title: "Per lead", desc: "Matching is a rule, not a per-lead charge." },
  ],
  ctaTitle: "See Match AI route a lead to your own team.",
}

export const DRAFT_AI: Story = {
  name: "Draft AI",
  accent: "#f97316",
  howTitle: <>How Draft AI <em>works.</em></>,
  steps: [
    {
      icon: FolderOpen, title: "The facts are already in the file",
      desc: "Dates, injuries, treatment and bills were captured at intake and during the case, so nothing has to be typed again.",
      visual: <CaseVisual title="Maria Alvarez · Auto accident" meta="Date of loss Mar 3, 2026 · Austin, TX" tags={["Neck injury", "MRI + 14 PT sessions", "Bills $9,420", "Other driver cited"]} />,
    },
    {
      icon: FilePen, title: "A first draft is written",
      desc: "Your letterhead, the injuries and the damages are filled in, and the liability narrative is drafted using comparable cases.",
      visual: <DocVisual title="Hale & Ortiz" lines={["Re: Maria Alvarez, date of loss Mar 3, 2026", "Injuries: urgent care, cervical MRI, 14 PT sessions.", "Medical specials: $9,420.", "Liability: your insured struck Ms. Alvarez's stopped vehicle from behind and was cited…", "Demand: $55,000"]} />,
    },
    {
      icon: Send, title: "You review and send",
      desc: "Open a near-finished letter, change what you want, approve it and send. You stay in control of every word.",
      visual: <DocVisual title="Demand letter" lines={["Reviewed by Priya Sharma", "2 edits to the liability section", "Demand confirmed at $55,000"]} stamp="Sent to insurer" />,
    },
  ],
  whyTitle: <>No more <em>blank pages.</em></>,
  without: [
    "Every demand letter starts from an empty document",
    "Facts are retyped from intake notes and records",
    "Hours of drafting for every single letter",
    "Formatting and letterhead fixed by hand",
  ],
  with: [
    "Drafted from the case's own data",
    "Your letterhead, your terms, your templates",
    "Narrative informed by comparable cases",
    "You edit, approve and send",
  ],
  gainTitle: <>Hours back on <em>every letter.</em></>,
  gains: [
    { value: "Mins", title: "Not hours", desc: "Start from a near-finished draft." },
    { value: "0", title: "Facts retyped", desc: "Everything comes from the case file." },
    { value: "Yours", title: "Voice and format", desc: "Your letterhead and standard terms." },
    { value: "100%", title: "Lawyer reviewed", desc: "Nothing goes out without your approval." },
  ],
  ctaTitle: "Watch Draft AI write a demand from a real file.",
}

export const COUNSEL_AI: Story = {
  name: "Counsel AI",
  accent: "#eab308",
  howTitle: <>How Counsel AI <em>works.</em></>,
  steps: [
    {
      icon: FolderOpen, title: "You open a case",
      desc: "Counsel AI already knows the facts from intake, so you don't have to explain the case before asking about it.",
      visual: <CaseVisual title="Maria Alvarez · Auto accident" meta="Rear-end collision · Texas" tags={["Neck injury", "Other driver cited", "Bills $9,420"]} />,
    },
    {
      icon: BookOpen, title: "Comparable cases are found",
      desc: "It searches and reads court opinions on cases like yours and pulls out what matters: the facts, the outcome and the amount.",
      visual: <SearchVisual query="rear-end collision, neck injury, Texas" results={[{ title: "Rear-end, cervical strain", note: "Tex. App. 2022 · liability found" }, { title: "Rear-end, soft tissue, PT", note: "Tex. App. 2021 · damages awarded" }, { title: "Highway collision, neck injury", note: "Tex. App. 2019 · settled" }]} />,
    },
    {
      icon: CheckCircle2, title: "You get answers with citations",
      desc: "A plain-English answer with the cases it relied on. Anything it could not verify is clearly marked.",
      visual: <ChecklistVisual title="Answer · 3 citations" items={["Following driver presumed at fault", "Cited driver strengthens liability", "Opening demand range $38k to $62k", "1 claim flagged as unverified"]} />,
    },
  ],
  whyTitle: <>Research in minutes, <em>not afternoons.</em></>,
  without: [
    "Hours inside research databases for every case",
    "Hunting for similar verdicts by hand",
    "Notes scattered across tabs and documents",
    "Hard to put a value on a case early on",
  ],
  with: [
    "Comparable opinions found for you automatically",
    "Plain-English summaries with full citations",
    "Unverified points clearly flagged",
    "An early value range to decide what to take",
  ],
  gainTitle: <>Better calls, <em>made sooner.</em></>,
  gains: [
    { value: "Cited", title: "Every answer", desc: "See the cases behind each conclusion." },
    { value: "Early", title: "Case value", desc: "A demand range before you accept the case." },
    { value: "Flagged", title: "Unverified points", desc: "Nothing presented as fact that isn't." },
    { value: "One", title: "Place", desc: "Research lives inside the case, not another tool." },
  ],
  ctaTitle: "Ask Counsel AI about one of your own cases.",
}

export const SCHEDULE_AI: Story = {
  name: "Schedule AI",
  accent: "#22c55e",
  howTitle: <>How Schedule AI <em>works.</em></>,
  steps: [
    {
      icon: FileText, title: "A case is opened",
      desc: "When a lead is accepted, the case starts with its key dates: the incident, treatment and the statute of limitations to confirm.",
      visual: <CaseVisual title="Maria Alvarez · Auto accident" meta="Accepted Mar 9 · Priya Sharma" tags={["Incident Mar 3", "Statute: lawyer to confirm", "Check-ins on"]} />,
    },
    {
      icon: CalendarPlus, title: "Key dates go on the calendar",
      desc: "Deadlines, filings and client follow-ups are tracked for every case, so nobody has to keep them in their head.",
      visual: <CalendarVisual month="March" marks={[{ day: 4, label: "Records request due" }, { day: 12, label: "Client check-in text" }, { day: 19, label: "Medical records deadline" }, { day: 26, label: "Demand draft due" }]} />,
    },
    {
      icon: CalendarCheck, title: "Reminders before anything slips",
      desc: "The lawyer and admins get texts 180, 90, 60, 30, 14, 7 and 1 day before the statute date, until the suit is filed.",
      visual: <AlertVisual time="9:00" from="Lawrora · Deadline" text="Maria Alvarez: statute of limitations in 30 days." />,
    },
  ],
  whyTitle: <>Never miss <em>a deadline.</em></>,
  without: [
    "Deadlines live in one person's calendar or head",
    "A single missed date can sink a whole case",
    "Clients are chased by phone for updates",
    "Calendars drift out of sync across the team",
  ],
  with: [
    "Every key date tracked, case by case",
    "Reminders at 180, 90, 60, 30, 14, 7 and 1 day",
    "Check-in texts go to clients automatically",
    "Deadlines are always confirmed by a lawyer",
  ],
  gainTitle: <>Every matter, <em>on time.</em></>,
  gains: [
    { value: "7", title: "Reminders per deadline", desc: "From 180 days out to the day before." },
    { value: "Every", title: "Case covered", desc: "Including cases with no date entered yet." },
    { value: "Auto", title: "Client check-ins", desc: "Treatment updates without a phone call." },
    { value: "You", title: "Confirm the dates", desc: "The system suggests, your lawyer decides." },
  ],
  ctaTitle: "See Schedule AI build a case calendar in seconds.",
}
