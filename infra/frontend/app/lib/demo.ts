// Length of a booked demo; a slot is unavailable if anything on the calendar overlaps this window
export const DEMO_MINUTES = 60

// Earliest bookable slot, measured from now
export const MIN_LEAD_MINUTES = 120

export type BusyInterval = { start: number; end: number } // epoch ms

export function overlapsBusy(start: Date, busy: BusyInterval[]) {
  const s = start.getTime()
  const e = s + DEMO_MINUTES * 60 * 1000
  return busy.some((b) => b.start < e && b.end > s)
}
