import { createSign } from "node:crypto"

// Creates Google Calendar events with a Google Meet link, using a service account with
// domain-wide delegation that acts as GOOGLE_CALENDAR_USER (a Workspace user).

const TOKEN_URL = "https://oauth2.googleapis.com/token"
const SCOPE = "https://www.googleapis.com/auth/calendar.events"

const b64url = (input: string | Buffer) => Buffer.from(input).toString("base64url")

export function googleCalendarConfigured() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
}

async function getAccessToken(subject: string): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
  // Vercel env vars usually store the PEM with literal "\n" sequences
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!.replace(/\\n/g, "\n")

  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claims = b64url(JSON.stringify({
    iss: clientEmail,
    sub: subject,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }))
  const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(privateKey)
  const assertion = `${header}.${claims}.${b64url(signature)}`

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
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
  const calendarUser = process.env.GOOGLE_CALENDAR_USER || "admin@lawrora.com"
  const token = await getAccessToken(calendarUser)

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
