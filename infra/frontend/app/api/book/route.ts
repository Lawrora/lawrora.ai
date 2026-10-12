import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/app/lib/email"
import { createMeetEvent, googleCalendarConfigured } from "@/app/lib/googleCalendar"

const ADMIN_EMAIL = "admin@lawrora.com"
const DEMO_MINUTES = 60

function escHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildIcs(params: {
  uid: string
  start: Date
  firmName: string
  attendeeEmail: string
  attendeeName: string
}): string {
  const { uid, start, firmName, attendeeEmail, attendeeName } = params
  const end = new Date(start.getTime() + DEMO_MINUTES * 60 * 1000)

  function fmt(d: Date) {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lawrora//Demo Booking//EN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Lawrora Demo: ${firmName}`,
    `ORGANIZER;CN=Lawrora:MAILTO:${ADMIN_EMAIL}`,
    `ATTENDEE;CN=${attendeeName};ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:${attendeeEmail}`,
    "DESCRIPTION:30-minute live Lawrora product demo.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    firstName, lastName, email, phone,
    firm, location, practiceArea, teamSize, message,
    start: startIso, timeZone: rawTimeZone,
  } = body
  let { date, time } = body

  if (!firstName || !lastName || !email || !firm || !location || !practiceArea || !teamSize || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const start = new Date(startIso)
  if (!startIso || Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid start time" }, { status: 400 })
  }

  // Show the slot in the booker's own time zone (falls back to UTC if the zone is unknown)
  let timeZone = "UTC"
  try {
    if (rawTimeZone) {
      new Intl.DateTimeFormat("en-US", { timeZone: rawTimeZone })
      timeZone = rawTimeZone
    }
  } catch {}
  date = start.toLocaleDateString("en-US", { timeZone, weekday: "long", year: "numeric", month: "long", day: "numeric" })
  time = start.toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit", timeZoneName: "short" })

  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@lawrora.ai`

  // Create the event on the Lawrora calendar with a unique Meet link. Google sends the invite to the
  // booker; if this is not configured or fails, fall back to the attached .ics invite without a link.
  let meetLink: string | null = null
  if (googleCalendarConfigured()) {
    try {
      const event = await createMeetEvent({
        requestId: uid.replace(/[^a-zA-Z0-9-]/g, ""),
        summary: `Lawrora Demo: ${firm}`,
        description: [
          `Live Lawrora product demo with ${firstName} ${lastName} (${email}).`,
          "",
          `Firm: ${firm}`,
          `Location: ${location}`,
          `Practice area: ${practiceArea}`,
          `Team size: ${teamSize}`,
          ...(phone ? [`Phone: ${phone}`] : []),
          ...(message ? ["", `Pain point: ${message}`] : []),
        ].join("\n"),
        start,
        end: new Date(start.getTime() + DEMO_MINUTES * 60 * 1000),
        timeZone,
        attendee: { email, name: `${firstName} ${lastName}` },
      })
      meetLink = event.meetLink
    } catch (err) {
      console.error("Google Meet event error:", err)
    }
  }

  const ics = buildIcs({
    uid,
    start,
    firmName: firm,
    attendeeEmail: email,
    attendeeName: `${firstName} ${lastName}`,
  })

  const meetBlock = meetLink
    ? `<p style="margin:16px 0 0"><a href="${escHtml(meetLink)}" style="display:inline-block;background:#0e0e2c;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px">Join Google Meet</a></p>
    <p style="font-size:12px;color:#999;margin:8px 0 0">${escHtml(meetLink)}</p>`
    : ""
  const meetText = meetLink ? `\nGoogle Meet: ${meetLink}` : ""
  // Google already put the event on both calendars, so the .ics is only needed as a fallback
  const attachments = meetLink ? undefined : [{
    filename: "lawrora-demo.ics",
    content: Buffer.from(ics).toString("base64"),
    contentType: "text/calendar; method=REQUEST",
  }]

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#0e0e2c;max-width:600px;margin:0 auto;padding:32px 24px">
  <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:12px">Lawrora</p>
  <h1 style="font-size:22px;font-weight:700;margin:0 0 8px">New demo booking</h1>
  <p style="font-size:14px;color:#666;margin:0 0 28px">A demo has been booked via lawrora.ai/demo</p>

  <div style="background:#f8f7f2;border-radius:12px;padding:20px 24px;margin-bottom:24px">
    <p style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;margin:0 0 4px">Scheduled for</p>
    <p style="font-size:18px;font-weight:700;color:#0e0e2c;margin:0">${escHtml(date)} at ${escHtml(time)}</p>
    ${meetBlock}
  </div>

  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;width:130px">Name</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(firstName)} ${escHtml(lastName)}</td></tr>
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Email</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px"><a href="mailto:${escHtml(email)}" style="color:#0e0e2c">${escHtml(email)}</a></td></tr>
    ${phone ? `<tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Phone</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(phone)}</td></tr>` : ""}
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Firm</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(firm)}</td></tr>
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Location</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(location)}</td></tr>
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Practice Area</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(practiceArea)}</td></tr>
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Team Size</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(teamSize)}</td></tr>
    ${message ? `<tr><td style="padding:11px 0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;vertical-align:top">Pain Point</td><td style="padding:11px 0;font-size:14px;line-height:1.6">${escHtml(message)}</td></tr>` : ""}
  </table>

  <p style="margin-top:32px;font-size:11px;color:#bbb">Submitted via lawrora.com/demo. ${meetLink ? "The event is on the Lawrora calendar." : "Calendar invite attached."}</p>
</body></html>`

  // Email 1: admin notification with full details
  const admin = await sendEmail({
    to: ADMIN_EMAIL,
    replyTo: `${firstName} ${lastName} <${email}>`,
    subject: `Demo booked: ${firstName} ${lastName} from ${firm}, ${date} at ${time}`,
    html,
    text: `New demo booking\n\nDate: ${date} at ${time}${meetText}\nName: ${firstName} ${lastName}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\nFirm: ${firm}\nLocation: ${location}\nPractice Area: ${practiceArea}\nTeam Size: ${teamSize}${message ? `\nPain Point: ${message}` : ""}`,
    attachments,
  })

  if (!admin.ok) {
    console.error("Resend admin email error:", admin.error)
    return NextResponse.json({ error: "Failed to send confirmation" }, { status: 500 })
  }

  // Email 2: confirmation to the booker with calendar invite
  const confirmHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#0e0e2c;max-width:600px;margin:0 auto;padding:32px 24px">
  <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:12px">Lawrora</p>
  <h1 style="font-size:22px;font-weight:700;margin:0 0 8px">You're booked, ${escHtml(firstName)}.</h1>
  <p style="font-size:14px;color:#666;margin:0 0 28px">We're looking forward to showing you Lawrora live. Here are your details.</p>

  <div style="background:#f8f7f2;border-radius:12px;padding:20px 24px;margin-bottom:24px">
    <p style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;margin:0 0 4px">Your demo is scheduled for</p>
    <p style="font-size:18px;font-weight:700;color:#0e0e2c;margin:0">${escHtml(date)} at ${escHtml(time)}</p>
    ${meetBlock}
  </div>

  <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px">
    ${meetLink
      ? "You'll also receive a Google Calendar invite with this link. Accept it to add the demo to your calendar."
      : "A calendar invite is attached to this email. Open it to add the event to your calendar. We'll send the meeting link shortly."}
  </p>

  <p style="font-size:13px;color:#999;margin:0">Questions? Reply to this email and we'll get back to you right away.</p>

  <p style="margin-top:40px;font-size:11px;color:#bbb">Lawrora · lawrora.ai</p>
</body></html>`

  const confirm = await sendEmail({
    to: email,
    replyTo: `Lawrora <${ADMIN_EMAIL}>`,
    subject: `Your Lawrora demo is confirmed: ${date} at ${time}`,
    html: confirmHtml,
    text: `Hi ${firstName},\n\nYour Lawrora demo is confirmed for ${date} at ${time}.${meetLink ? `\n\nJoin on Google Meet: ${meetLink}\n\nYou'll also receive a Google Calendar invite with this link.` : `\n\nA calendar invite is attached. We'll send the meeting link shortly.`}\n\nQuestions? Just reply to this email.\n\nLawrora · lawrora.ai`,
    attachments,
  })

  // The admin already has the booking, so report a failed confirmation instead of failing the request
  if (!confirm.ok) {
    console.error("Resend confirmation email error:", confirm.error)
  }

  return NextResponse.json({ ok: true, confirmationSent: confirm.ok })
}
