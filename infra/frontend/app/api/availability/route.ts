import { NextRequest, NextResponse } from "next/server"
import { googleCalendarConfigured, listBusy } from "@/app/lib/googleCalendar"

const MAX_RANGE_MS = 62 * 24 * 60 * 60 * 1000

// Busy intervals on the Lawrora calendar, so the demo picker can grey out taken slots.
// Only start/end times are returned, never event details.
export async function GET(req: NextRequest) {
  const start = new Date(req.nextUrl.searchParams.get("start") ?? "")
  const end = new Date(req.nextUrl.searchParams.get("end") ?? "")
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start || end.getTime() - start.getTime() > MAX_RANGE_MS) {
    return NextResponse.json({ error: "Invalid range" }, { status: 400 })
  }

  const headers = { "Cache-Control": "no-store" }
  if (!googleCalendarConfigured()) {
    return NextResponse.json({ busy: [] }, { headers })
  }

  try {
    const busy = await listBusy(start, end)
    return NextResponse.json({ busy }, { headers })
  } catch (err) {
    // Don't block bookings if Google is unreachable; the booking route still re-checks
    console.error("Availability error:", err)
    return NextResponse.json({ busy: [] }, { headers })
  }
}
