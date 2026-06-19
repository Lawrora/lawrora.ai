"use client"

import { useState } from "react"
import { CheckCircle, ArrowRight, CalendarCheck } from "lucide-react"
import DemoCalendar from "./DemoCalendar"

const practiceAreas = [
  "Personal Injury",
  "Real Estate",
  "Family Law",
  "Immigration",
  "Criminal Defense",
  "Corporate / Business",
  "Estate Planning",
  "Intellectual Property",
  "Employment Law",
  "Other",
]

const teamSizes = [
  "1–2 attorneys",
  "3–5 attorneys",
  "6–15 attorneys",
  "16–50 attorneys",
  "50+ attorneys",
]

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-white/20 transition-shadow"

const selectCls =
  "w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-shadow appearance-none cursor-pointer"

export default function DemoPageForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    firm: "", practiceArea: "", teamSize: "", message: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleCalendarSelect(date: Date, time: string) {
    setSelectedDate(date)
    setSelectedTime(time)
  }

  const isReady =
    form.firstName && form.lastName && form.email && form.firm &&
    form.practiceArea && form.teamSize && selectedDate && selectedTime

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isReady) return
    setStatus("loading")
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: selectedDate!.toLocaleDateString("en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          }),
          time: selectedTime,
        }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center gap-6 py-16">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
          <CheckCircle size={28} strokeWidth={1.8} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">You&apos;re booked.</h3>
          <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
            We&apos;ll send a calendar invite to{" "}
            <span className="font-semibold text-white">{form.email}</span> within the hour.
            See you on{" "}
            <span className="font-semibold text-white">
              {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>{" "}at{" "}
            <span className="font-semibold text-white">{selectedTime}</span>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center text-xs text-white/35">
          <span>Check your inbox for the calendar invite.</span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Section 1: Your information */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-5">
          Your Information
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-first">
                First name <span className="text-white/25">*</span>
              </label>
              <input
                id="demo-first" type="text" required
                placeholder="Jane"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-last">
                Last name <span className="text-white/25">*</span>
              </label>
              <input
                id="demo-last" type="text" required
                placeholder="Smith"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-email">
              Work email <span className="text-white/25">*</span>
            </label>
            <input
              id="demo-email" type="email" required
              placeholder="jane@smithlaw.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-phone">
              Phone <span className="text-white/35">(optional)</span>
            </label>
            <input
              id="demo-phone" type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-firm">
              Firm name <span className="text-white/25">*</span>
            </label>
            <input
              id="demo-firm" type="text" required
              placeholder="Smith & Associates LLP"
              value={form.firm}
              onChange={(e) => set("firm", e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-area">
                Practice area <span className="text-white/25">*</span>
              </label>
              <select
                id="demo-area" required
                value={form.practiceArea}
                onChange={(e) => set("practiceArea", e.target.value)}
                className={selectCls}
              >
                <option value="">Select…</option>
                {practiceAreas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="relative">
              <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-size">
                Team size <span className="text-white/25">*</span>
              </label>
              <select
                id="demo-size" required
                value={form.teamSize}
                onChange={(e) => set("teamSize", e.target.value)}
                className={selectCls}
              >
                <option value="">Select…</option>
                {teamSizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="demo-msg">
              What&apos;s your biggest intake or admin pain point?{" "}
              <span className="text-white/35">(optional)</span>
            </label>
            <textarea
              id="demo-msg" rows={3}
              placeholder="e.g. We miss leads that come in after hours, research takes too long…"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Calendar */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-5">
          Pick a Date &amp; Time
        </p>
        <DemoCalendar
          onSelect={handleCalendarSelect}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      </div>

      {/* Confirmation row */}
      {selectedDate && selectedTime && (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/6 px-5 py-4 animate-fade-in">
          <CalendarCheck size={16} strokeWidth={2} className="text-white/50 shrink-0" />
          <p className="text-sm font-semibold text-white">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric", year: "numeric",
            })}{" "}
            at <span className="text-white">{selectedTime}</span>
          </p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <p className="text-xs text-red-500 text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isReady || status === "loading"}
        className={[
          "w-full flex items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold transition-all duration-200",
          isReady && status !== "loading"
            ? "bg-white text-black border border-black hover:bg-black hover:text-white hover:border-white hover:-translate-y-0.5 cursor-pointer"
            : "bg-white/10 text-white/35 cursor-not-allowed",
        ].join(" ")}
      >
        {status === "loading" ? (
          "Confirming…"
        ) : (
          <>
            Confirm my demo
            <ArrowRight size={15} strokeWidth={2.5} />
          </>
        )}
      </button>

      <p className="text-center text-xs text-white/25">
        No commitment. Just 30 focused minutes.
      </p>
    </form>
  )
}
