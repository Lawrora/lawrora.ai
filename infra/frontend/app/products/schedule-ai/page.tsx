import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ProductHero from "../../components/ProductHero"
import ProductStory from "../../components/ProductStory"
import { SCHEDULE_AI } from "../../components/productStories"
import { CalendarCheck } from "lucide-react"
import { ScheduleAIDemo } from "../../components/ProductDemos"

const features = [
  { title: "Filing deadline tracking", desc: "Automatically identifies and tracks every deadline associated with a matter, from statutes of limitations to court-ordered dates." },
  { title: "Calendar sync", desc: "Syncs with Google Calendar, Outlook, and major practice management systems so attorney schedules stay in one place." },
  { title: "Conflict detection", desc: "Surfaces scheduling conflicts across the team before they become problems, including double-booked hearings and overlapping deadlines." },
  { title: "Automated time logging", desc: "Tracks time spent on each matter automatically based on activity, reducing the burden of manual time entry." },
  { title: "Client appointment coordination", desc: "Manages client-facing scheduling, sends reminders, and handles rescheduling without staff involvement." },
  { title: "Deadline alerts", desc: "Proactive alerts fire days or weeks before critical deadlines so nothing is missed and nothing is rushed." },
]

export default function ScheduleAI() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <ProductHero
        category="Scheduling"
        name="Schedule AI"
        icon={<CalendarCheck size={20} strokeWidth={2} />}
        tagline="Every deadline tracked. Every calendar managed."
        desc="Schedule AI monitors filing deadlines, manages attorney calendars, logs time entries, and alerts the team before anything slips, all without manual input."
        demo={<ScheduleAIDemo />}
      />

      <ProductStory story={SCHEDULE_AI} features={features} />

      <Footer />
    </main>
  )
}
