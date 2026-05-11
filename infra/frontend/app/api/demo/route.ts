import { NextRequest, NextResponse } from "next/server"

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, firm, message } = await req.json()

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#0e0e2c;max-width:560px;margin:0 auto;padding:32px 24px">
  <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:16px">Lawrora</p>
  <h1 style="font-size:20px;font-weight:700;margin:0 0 28px">New demo request</h1>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:12px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;width:120px">Name</td><td style="padding:12px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(firstName)} ${escHtml(lastName)}</td></tr>
    <tr><td style="padding:12px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Email</td><td style="padding:12px 0;border-bottom:1px solid #f0ede0;font-size:14px"><a href="mailto:${escHtml(email)}" style="color:#0e0e2c">${escHtml(email)}</a></td></tr>
    <tr><td style="padding:12px 0;border-bottom:1px solid #f0ede0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">Firm</td><td style="padding:12px 0;border-bottom:1px solid #f0ede0;font-size:14px">${escHtml(firm)}</td></tr>
    ${message ? `<tr><td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999;vertical-align:top">Note</td><td style="padding:12px 0;font-size:14px;line-height:1.6">${escHtml(message)}</td></tr>` : ""}
  </table>
  <p style="margin-top:32px;font-size:11px;color:#bbb">Submitted via lawrora.com</p>
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
      to: [{ email: process.env.MAILERSEND_TO_EMAIL }],
      reply_to: { email: escHtml(email), name: `${escHtml(firstName)} ${escHtml(lastName)}` },
      subject: `Demo request: ${firstName} ${lastName} from ${firm}`,
      html,
      text: `New demo request\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nFirm: ${firm}${message ? `\nNote: ${message}` : ""}`,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("MailerSend error:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
