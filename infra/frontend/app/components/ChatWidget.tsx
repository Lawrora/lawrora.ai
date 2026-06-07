"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Scale } from "lucide-react"

type Message = { role: "user" | "assistant"; content: string }

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi, I'm Lex — Lawrora's assistant. How can I help your firm today? I can walk you through what Lawrora does, answer questions about compliance, integrations, or help you decide if it's a fit.",
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [open, messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput("")
    const next: Message[] = [...messages, { role: "user", content: text }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m.role !== "assistant" || m !== WELCOME).map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.content ?? "Sorry, I couldn't process that. Please try again." }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment." }])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[360px] max-h-[540px] flex flex-col rounded-2xl bg-white shadow-2xl border border-[#0E0E2C]/10 animate-scale-in overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#0E0E2C] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Scale size={15} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">Lex</p>
                <p className="text-[10px] text-white/45 mt-0.5">Lawrora Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              aria-label="Close chat"
            >
              <X size={15} strokeWidth={2} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-[#0E0E2C] text-white rounded-br-sm"
                      : "bg-[#F8F7F2] text-[#0E0E2C] rounded-bl-sm",
                  ].join(" ")}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#F8F7F2] rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E2C]/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E2C]/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E2C]/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-[#0E0E2C]/6 shrink-0">
            <div className="flex items-end gap-2 rounded-xl border border-[#0E0E2C]/12 bg-[#F8F7F2] px-3 py-2.5">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask about Lawrora…"
                className="flex-1 bg-transparent text-sm text-[#0E0E2C] placeholder:text-[#0E0E2C]/30 resize-none focus:outline-none max-h-24"
                style={{ lineHeight: "1.5" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="shrink-0 w-8 h-8 rounded-lg bg-[#0E0E2C] flex items-center justify-center text-white disabled:opacity-30 transition-opacity hover:bg-[#0E0E2C]/80"
                aria-label="Send"
              >
                <Send size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-2xl bg-[#0E0E2C] shadow-xl flex items-center justify-center hover:bg-[#0E0E2C]/85 transition-all duration-200 hover:-translate-y-0.5"
        aria-label={open ? "Close chat" : "Chat with Lex"}
      >
        {open ? (
          <X size={20} strokeWidth={2} className="text-white" />
        ) : (
          <Scale size={20} strokeWidth={1.8} className="text-white" />
        )}
      </button>
    </>
  )
}
