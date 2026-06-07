"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function generateSlots(date: Date): string[] {
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const day = date.getDay()
  const isWeekend = day === 0 || day === 6
  // Weekdays: 9am–7pm (slots 9:00–18:30), Weekends: 9am–5pm (slots 9:00–16:30)
  const endHour = isWeekend ? 17 : 19

  const slots: string[] = []
  for (let h = 9; h < endHour; h++) {
    for (const min of [0, 30]) {
      if (isToday) {
        const slot = new Date(date)
        slot.setHours(h, min, 0, 0)
        if (slot <= now) continue
      }
      const h12 = h === 12 ? 12 : h % 12
      const ap = h >= 12 ? "PM" : "AM"
      slots.push(`${h12}:${min === 0 ? "00" : "30"} ${ap}`)
    }
  }
  return slots
}

function isDateSelectable(date: Date, today: Date): boolean {
  if (date < today) return false
  if (date.toDateString() === today.toDateString()) {
    // Check if any slots remain today
    return generateSlots(date).length > 0
  }
  return true
}

type Props = {
  onSelect: (date: Date, time: string) => void
  selectedDate: Date | null
  selectedTime: string | null
}

export default function DemoCalendar({ onSelect, selectedDate, selectedTime }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }))

  const { year, month } = view
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const isCurrentView =
    year === today.getFullYear() && month === today.getMonth()

  function prevMonth() {
    setView(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    )
  }
  function nextMonth() {
    setView(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    )
  }

  function handleDay(day: number) {
    const date = new Date(year, month, day)
    if (!isDateSelectable(date, today)) return
    // Reset time when date changes
    onSelect(date, "")
  }

  function handleTime(time: string) {
    if (!selectedDate) return
    onSelect(selectedDate, time)
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const slots = selectedDate ? generateSlots(selectedDate) : []

  return (
    <div className="space-y-5">
      {/* Calendar grid */}
      <div className="rounded-2xl border border-[#0E0E2C]/10 bg-[#F8F7F2] p-5">
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isCurrentView}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#0E0E2C]/8 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Previous month"
          >
            <ChevronLeft size={15} strokeWidth={2} />
          </button>
          <span className="text-sm font-bold text-[#0E0E2C]">
            {MONTHS[month]} {year}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#0E0E2C]/8 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1.5">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-semibold uppercase text-[#0E0E2C]/35 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((day, idx) => {
            if (day === null) return <div key={idx} />
            const date = new Date(year, month, day)
            const past = !isDateSelectable(date, today)
            const isToday = date.toDateString() === today.toDateString()
            const isSel = selectedDate?.toDateString() === date.toDateString()
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleDay(day)}
                disabled={past}
                className={[
                  "w-9 h-9 mx-auto rounded-xl text-xs font-medium transition-all duration-150 flex items-center justify-center",
                  past ? "text-[#0E0E2C]/18 cursor-not-allowed" : "cursor-pointer",
                  isSel ? "bg-[#0E0E2C] text-white" : "",
                  !isSel && isToday ? "ring-1 ring-[#0E0E2C]/25 font-bold text-[#0E0E2C]" : "",
                  !isSel && !past ? "hover:bg-[#0E0E2C]/10 text-[#0E0E2C]/80" : "",
                ].filter(Boolean).join(" ")}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && slots.length > 0 && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={13} strokeWidth={2} className="text-[#0E0E2C]/40" />
            <span className="text-xs font-semibold text-[#0E0E2C]/50">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric",
              })}
              {" — "}
              {[0, 6].includes(selectedDate.getDay())
                ? "Weekend · 9 AM – 5 PM"
                : "Weekday · 9 AM – 7 PM"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {slots.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTime(t)}
                className={[
                  "py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150",
                  selectedTime === t
                    ? "bg-[#0E0E2C] text-white border-[#0E0E2C]"
                    : "bg-white border-[#0E0E2C]/12 text-[#0E0E2C]/65 hover:border-[#0E0E2C]/35 hover:text-[#0E0E2C]",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && slots.length === 0 && (
        <p className="text-xs text-[#0E0E2C]/40 text-center py-4">
          No slots remaining for today. Please pick another date.
        </p>
      )}
    </div>
  )
}
