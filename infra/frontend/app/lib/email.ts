// Transactional email via Resend (https://resend.com/docs/api-reference/emails/send-email)

export type EmailAttachment = {
  filename: string
  content: string // base64
  contentType?: string
}

export async function sendEmail(params: {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
  attachments?: EmailAttachment[]
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    return { ok: false, error: "RESEND_API_KEY or RESEND_FROM_EMAIL is not set" }
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from.includes("<") ? from : `Lawrora <${from}>`,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      ...(params.replyTo && { reply_to: params.replyTo }),
      ...(params.attachments && {
        attachments: params.attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
          ...(a.contentType && { content_type: a.contentType }),
        })),
      }),
    }),
  })

  if (!res.ok) return { ok: false, error: await res.text() }
  return { ok: true }
}
