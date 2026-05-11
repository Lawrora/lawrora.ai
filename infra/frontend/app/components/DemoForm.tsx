"use client"

import { useState } from "react"

const inputCls = "w-full rounded-xl border border-[#0E0E2C]/15 bg-[#FCF9EA] px-4 py-3 text-sm placeholder:text-[#0E0E2C]/30 focus:outline-none focus:ring-2 focus:ring-[#0E0E2C]/20"

export default function DemoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", firm: "", message: "" })

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          firm: form.firm,
          message: form.message,
        }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 text-[#0E0E2C] flex flex-col items-center justify-center min-h-[380px] text-center gap-5">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(16,185,129)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">You&apos;re on the list.</h3>
          <p className="text-sm text-[#0E0E2C]/60 max-w-xs">We&apos;ll be in touch within one business day to confirm your demo time.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl p-8 text-[#0E0E2C]">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#0E0E2C]/60 mb-1.5" htmlFor="first">First name</label>
          <input id="first" type="text" required placeholder="Jane" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#0E0E2C]/60 mb-1.5" htmlFor="last">Last name</label>
          <input id="last" type="text" required placeholder="Smith" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[#0E0E2C]/60 mb-1.5" htmlFor="email">Work email</label>
        <input id="email" type="email" required placeholder="jane@yourfirm.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#0E0E2C]/60 mb-1.5" htmlFor="org">Firm name</label>
        <input id="org" type="text" required placeholder="Smith & Associates LLP" value={form.firm} onChange={(e) => update("firm", e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#0E0E2C]/60 mb-1.5" htmlFor="msg">
          What&apos;s the biggest bottleneck in your workflow right now? <span className="text-[#0E0E2C]/30">(optional)</span>
        </label>
        <textarea id="msg" rows={3} placeholder="e.g. intake takes too long, research is inconsistent..." value={form.message} onChange={(e) => update("message", e.target.value)} className={`${inputCls} resize-none`} />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-500 text-center">Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-[#0E0E2C] py-3.5 text-sm font-semibold text-white hover:bg-[#0E0E2C]/85 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Book my demo"}
      </button>
      <p className="text-center text-xs text-[#0E0E2C]/35">No commitment. No credit card. Just 30 minutes.</p>
    </form>
  )
}
