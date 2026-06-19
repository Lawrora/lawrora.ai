import { NextRequest, NextResponse } from "next/server"

const ADMIN_EMAIL = "admin@lawrora.com"

function escHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildIcs(params: {
  uid: string
  dateStr: string   // e.g. "Monday, January 6, 2026"
  timeStr: string   // e.g. "10:00 AM"
  firmName: string
  attendeeEmail: string
  attendeeName: string
}): string {
  const { uid, dateStr, timeStr, firmName, attendeeEmail, attendeeName } = params

  // Parse "Monday, January 6, 2026" + "10:00 AM" into a JS Date (local time)
  const clean = dateStr.replace(/^[A-Za-z]+,\s*/, "")
  const start = new Date(`${clean} ${timeStr}`)
  const end = new Date(start.getTime() + 60 * 60 * 1000) // +1 hour

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
    `SUMMARY:Lawrora Demo — ${firmName}`,
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
    firm, practiceArea, teamSize, message,
    date, time,
  } = body

  if (!firstName || !lastName || !email || !firm || !practiceArea || !teamSize || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@lawrora.ai`
  const ics = buildIcs({
    uid,
    dateStr: date,
    timeStr: time,
    firmName: firm,
    attendeeEmail: email,
    attendeeName: `${firstName} ${lastName}`,
  })

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#0e0e2c;max-width:600px;margin:0 auto;padding:32px 24px">
  <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:12px">Lawrora</p>
  <h1 style="font-size:22px;font-weight:700;margin:0 0 8px">New demo booking</h1>
  <p style="font-size:14px;color:#666;margin:0 0 28px">A demo has been booked via lawrora.ai/demo</p>

  <div style="background:#f8f7f2;border-radius:12px;padding:20px 24px;margin-bottom:24px">
    <p style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;margin:0 0 4px">Scheduled for</p>
    <p style="font-size:18px;font-weight:700;color:#0e0e2c;margin:0">${escHtml(date)} at ${escHtml(time)}</p>
  </div>

  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;width:130px">Name</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(firstName)} ${escHtml(lastName)}</td></tr>
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Email</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px"><a href="mailto:${escHtml(email)}" style="color:#0e0e2c">${escHtml(email)}</a></td></tr>
    ${phone ? `<tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Phone</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(phone)}</td></tr>` : ""}
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Firm</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(firm)}</td></tr>
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Practice Area</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(practiceArea)}</td></tr>
    <tr><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Team Size</td><td style="padding:11px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(teamSize)}</td></tr>
    ${message ? `<tr><td style="padding:11px 0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;vertical-align:top">Pain Point</td><td style="padding:11px 0;font-size:14px;line-height:1.6">${escHtml(message)}</td></tr>` : ""}
  </table>

  <p style="margin-top:32px;font-size:11px;color:#bbb">Submitted via lawrora.ai/demo — calendar invite attached</p>
</body></html>`

  const res = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({
      from: { email: process.env.MAILERSEND_FROM_EMAIL, name: "Lawrora" },
      to: [{ email: ADMIN_EMAIL }],
      reply_to: {
        email: escHtml(email),
        name: `${escHtml(firstName)} ${escHtml(lastName)}`,
      },
      subject: `Demo booked: ${firstName} ${lastName} from ${firm} — ${date} at ${time}`,
      html,
      text: `New demo booking\n\nDate: ${date} at ${time}\nName: ${firstName} ${lastName}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\nFirm: ${firm}\nPractice Area: ${practiceArea}\nTeam Size: ${teamSize}${message ? `\nPain Point: ${message}` : ""}`,
      attachments: [
        {
          filename: "lawrora-demo.ics",
          content: Buffer.from(ics).toString("base64"),
          type: "text/calendar",
          disposition: "attachment",
        },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("MailerSend error:", err)
    return NextResponse.json({ error: "Failed to send confirmation" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
