// Creates Google Calendar events with a Google Meet link on the calendar of the Google account that
// authorised the OAuth client (admin@lawrora.com), using its long-lived refresh token.

const TOKEN_URL = "https://oauth2.googleapis.com/token"

export function googleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN
  )
}

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
    }),
  })
  if (!res.ok) throw new Error(`Google token error: ${await res.text()}`)
  return (await res.json()).access_token
}

type CalendarEvent = {
  status?: string
  transparency?: string
  eventType?: string
  start?: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
  attendees?: { self?: boolean; responseStatus?: string }[]
}

// Times the calendar owner is busy between timeMin and timeMax. Skips cancelled, "free", and declined
// events, and all-day events other than out-of-office.
export async function listBusy(timeMin: Date, timeMax: Date): Promise<{ start: number; end: number }[]> {
  const token = await getAccessToken()
  const busy: { start: number; end: number }[] = []
  let pageToken: string | undefined

  do {
    const query = new URLSearchParams({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: "true",
      maxResults: "250",
      fields: "nextPageToken,items(status,transparency,eventType,start,end,attendees(self,responseStatus))",
      ...(pageToken && { pageToken }),
    })
    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`Google Calendar list error: ${await res.text()}`)
    const page: { items?: CalendarEvent[]; nextPageToken?: string } = await res.json()

    for (const e of page.items ?? []) {
      if (e.status === "cancelled" || e.transparency === "transparent") continue
      if (e.attendees?.some((a) => a.self && a.responseStatus === "declined")) continue
      const allDay = !e.start?.dateTime
      if (allDay && e.eventType !== "outOfOffice") continue
      const start = Date.parse(e.start?.dateTime ?? `${e.start?.date}T00:00:00Z`)
      const end = Date.parse(e.end?.dateTime ?? `${e.end?.date}T00:00:00Z`)
      if (!Number.isNaN(start) && !Number.isNaN(end)) busy.push({ start, end })
    }
    pageToken = page.nextPageToken
  } while (pageToken)

  return busy
}

export async function createMeetEvent(params: {
  requestId: string
  summary: string
  description: string
  start: Date
  end: Date
  timeZone: string
  attendee: { email: string; name: string }
}): Promise<{ eventId: string; meetLink: string }> {
  const token = await getAccessToken()

  // sendUpdates=all makes Google email the invite (with the Meet link) to the attendee
  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: params.summary,
        description: params.description,
        start: { dateTime: params.start.toISOString(), timeZone: params.timeZone },
        end: { dateTime: params.end.toISOString(), timeZone: params.timeZone },
        attendees: [{ email: params.attendee.email, displayName: params.attendee.name }],
        conferenceData: {
          createRequest: {
            requestId: params.requestId,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    }
  )
  if (!res.ok) throw new Error(`Google Calendar error: ${await res.text()}`)

  const event = await res.json()
  const meetLink: string | undefined =
    event.hangoutLink ??
    event.conferenceData?.entryPoints?.find((e: { entryPointType: string }) => e.entryPointType === "video")?.uri
  if (!meetLink) throw new Error("Google Calendar event created without a Meet link")

  return { eventId: event.id, meetLink }
}
