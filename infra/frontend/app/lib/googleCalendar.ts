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
