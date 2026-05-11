"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [message]);

    async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
        const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
        });

        if (!res.ok) throw new Error("Backend request failed");

        const data = await res.json();

        setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
        ]);
    } catch {
        setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to backend." },
        ]);
    } finally {
        setLoading(false);
    }
    }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Mono:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080808;
          --sidebar-bg: #0d0d0d;
          --surface: #131313;
          --surface-2: #1c1c1c;
          --border: #242424;
          --border-light: #303030;
          --text: #ebebeb;
          --text-muted: #5a5a5a;
          --text-dim: #383838;
          --white: #ffffff;
          --accent: #e8e8e8;
          --sidebar-width: 260px;
        }

        html, body { height: 100%; overflow: hidden; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Mono', monospace;
        }

        .chat-root {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .sidebar {
          width: var(--sidebar-width);
          flex-shrink: 0;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.32s ease,
                      opacity 0.22s ease;
        }

        .sidebar.closed {
          width: 0;
          border-color: transparent;
          opacity: 0;
          pointer-events: none;
        }

        .sidebar-inner {
          width: var(--sidebar-width);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .sidebar-logo {
          padding: 32px 28px 24px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .logo-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .logo-icon {
          width: 28px;
          height: 28px;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--white);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .logo-sub {
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding-left: 38px;
          white-space: nowrap;
        }

        .sidebar-section { padding: 20px 20px 8px; flex-shrink: 0; }

        .sidebar-section-label {
          font-size: 8.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 10px;
          padding-left: 8px;
          white-space: nowrap;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-item:hover { background: var(--surface); color: var(--text); }
        .sidebar-item.active { background: var(--surface-2); color: var(--accent); }

        .sidebar-item-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--text-dim);
          flex-shrink: 0;
        }

        .sidebar-item.active .sidebar-item-dot { background: var(--white); }

        .sidebar-spacer { flex: 1; }

        .sidebar-footer {
          padding: 20px 28px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--white);
          flex-shrink: 0;
          animation: pulse 2.4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        .topbar {
          height: 56px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 32px;
          gap: 16px;
          flex-shrink: 0;
          background: var(--bg);
        }

        .toggle-btn {
          width: 32px;
          height: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          flex-shrink: 0;
          border: 1px solid transparent;
          background: none;
          padding: 0;
          transition: border-color 0.15s, background 0.15s;
          border-radius: 2px;
        }

        .toggle-btn:hover {
          border-color: var(--border-light);
          background: var(--surface);
        }

        .toggle-bar {
          display: block;
          height: 1px;
          background: var(--text-muted);
          transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.2s ease;
          transform-origin: center center;
        }

        .toggle-btn .bar-top { width: 16px; }
        .toggle-btn .bar-mid { width: 12px; }
        .toggle-btn .bar-bot { width: 16px; }

        .toggle-btn.is-closed .bar-top { width: 9px;  transform: rotate(38deg) translate(1px, 3px); }
        .toggle-btn.is-closed .bar-mid { width: 14px; }
        .toggle-btn.is-closed .bar-bot { width: 9px;  transform: rotate(-38deg) translate(1px, -3px); }

        .topbar-divider {
          width: 1px;
          height: 14px;
          background: var(--border);
          flex-shrink: 0;
        }

        .topbar-title {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .topbar-sep { width: 1px; height: 14px; background: var(--border-light); }

        .topbar-label {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: var(--white);
          font-weight: 500;
        }

        .topbar-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .topbar-chip {
          font-size: 9.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 4px 10px;
          white-space: nowrap;
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 48px 80px;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }

        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: auto;
          max-width: 520px;
          width: 100%;
        }

        .empty-glyph { font-size: 48px; opacity: 0.06; margin-bottom: 28px; line-height: 1; }

        .empty-heading {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 400;
          color: var(--white);
          opacity: 0.35;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .empty-sub {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 40px;
        }

        .empty-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }

        .empty-chip {
          font-size: 10.5px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 7px 14px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .empty-chip:hover { border-color: var(--border-light); color: var(--text); background: var(--surface); }

        .message-row {
          display: flex;
          gap: 14px;
          margin-bottom: 20px;
          animation: fadeUp 0.2s ease forwards;
          max-width: 900px;
          width: 100%;
          align-self: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message-row.user { flex-direction: row-reverse; }

        .message-avatar {
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .message-row.user .message-avatar {
          background: var(--white);
          color: var(--bg);
          border-color: var(--white);
          font-weight: 500;
        }

        .message-body { flex: 1; min-width: 0; }

        .message-who {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 10px;
        }

        .message-row.user .message-who { text-align: right; }

        .message-bubble {
          display: inline-block;
          padding: 10px 14px;
          font-size: 13px;
          line-height: 1.6;
          white-space: pre-wrap;
          font-weight: 300;
          letter-spacing: 0.01em;
          max-width: 65%;
        }

        .message-row.user .message-bubble {
          float: right;
          background: var(--white);
          color: #080808;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
        }

        .message-row.assistant .message-bubble {
          background: var(--surface);
          border: 1px solid var(--border);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }

        .message-clearfix { clear: both; }

        .typing-row {
          display: flex;
          gap: 14px;
          margin-bottom: 20px;
          max-width: 900px;
          width: 100%;
          align-self: center;
          animation: fadeUp 0.2s ease forwards;
        }

        .typing-bubble {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .typing-dot {
          width: 4px;
          height: 4px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: blink 1.2s ease-in-out infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }

        .input-dock {
          border-top: 1px solid var(--border);
          padding: 20px 80px 28px;
          background: var(--bg);
          flex-shrink: 0;
        }

        .input-outer { max-width: 900px; margin: 0 auto; }

        .input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 14px 18px;
          transition: border-color 0.2s;
        }

        .input-wrapper:focus-within { border-color: var(--border-light); }

        .input-field {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--text);
          font-family: 'DM Mono', monospace;
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.65;
          resize: none;
          min-height: 24px;
          max-height: 200px;
          letter-spacing: 0.01em;
        }

        .input-field::placeholder { color: var(--text-dim); font-style: italic; }

        .send-button {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          background: var(--white);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%);
        }

        .send-button:hover:not(:disabled) { background: var(--accent); transform: scale(1.05); }
        .send-button:disabled { background: var(--surface-2); cursor: not-allowed; }
        .send-button svg { width: 14px; height: 14px; fill: #080808; }
        .send-button:disabled svg { fill: var(--text-dim); }

        .input-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .input-tags { display: flex; gap: 6px; }

        .input-tag {
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          border: 1px solid var(--border);
          padding: 2px 8px;
        }

        .input-hint {
          font-size: 9.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-dim);
          display: flex;
          gap: 12px;
        }

        kbd {
          font-family: 'DM Mono', monospace;
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 1px 5px;
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0;
        }

        @media (max-width: 768px) {
          .messages-area { padding: 24px 20px; }
          .input-dock { padding: 14px 20px 20px; }
          .message-bubble { max-width: 90%; font-size: 13px; padding: 14px 16px; }
          .topbar { padding: 0 16px; }
          .input-tags { display: none; }
          .topbar-title, .topbar-sep { display: none; }
        }
      `}</style>

      <div className="chat-root">
        <aside className={`sidebar${sidebarOpen ? "" : " closed"}`}>
          <div className="sidebar-inner">
            <div className="sidebar-logo">
              <div className="logo-mark">
                <div className="logo-icon">⚖</div>
                <div className="logo-text">Liability AI</div>
              </div>
              <div className="logo-sub">Personal Liability</div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-label">Case Sessions</div>
              <div className="sidebar-item active">
                <span className="sidebar-item-dot" />
                New Case Review
              </div>
              <div className="sidebar-item">
                <span className="sidebar-item-dot" />
                Accident Claim - Apr 22
              </div>
              <div className="sidebar-item">
                <span className="sidebar-item-dot" />
                Property Damage - Apr 18
              </div>
              <div className="sidebar-item">
                <span className="sidebar-item-dot" />
                Negligence Question
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-label">Tools</div>
              <div className="sidebar-item">
                <span className="sidebar-item-dot" />
                Upload Case File
              </div>
              <div className="sidebar-item">
                <span className="sidebar-item-dot" />
                Liability Review
              </div>
              <div className="sidebar-item">
                <span className="sidebar-item-dot" />
                Lawyer Suggestion
              </div>
              <div className="sidebar-item">
                <span className="sidebar-item-dot" />
                Case Questions
              </div>
            </div>

            <div className="sidebar-spacer" />

            <div className="sidebar-footer">
              <div className="status-row">
                <div className="status-dot" />
                <span>Case Assistant Online</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <button
              className={`toggle-btn${sidebarOpen ? "" : " is-closed"}`}
              onClick={() => setSidebarOpen((v) => !v)}
              title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <span className="toggle-bar bar-top" />
              <span className="toggle-bar bar-mid" />
              <span className="toggle-bar bar-bot" />
            </button>

            <div className="topbar-divider" />
            <span className="topbar-title">Session</span>
            <div className="topbar-sep" />
            <span className="topbar-label">New Case Review</span>
            <div className="topbar-right">
              <span className="topbar-chip">GPT-4o</span>
              <span className="topbar-chip">Liability Mode</span>
            </div>
          </div>

          <div className="messages-area">
            {messages.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-glyph">⚖</div>
                <div className="empty-heading">Personal Liability Assistant</div>
                <div className="empty-sub">
                  Ask about your case file or request lawyer guidance
                </div>
                <div className="empty-chips">
                  <div
                    className="empty-chip"
                    onClick={() =>
                      setMessage(
                        "Review this personal liability case file and summarize the main legal issues."
                      )
                    }
                  >
                    Review case file
                  </div>
                  <div
                    className="empty-chip"
                    onClick={() =>
                      setMessage(
                        "Based on this case file, what type of lawyer should I consult?"
                      )
                    }
                  >
                    Suggest lawyer type
                  </div>
                  <div
                    className="empty-chip"
                    onClick={() =>
                      setMessage(
                        "What questions should I ask a lawyer about this personal liability case?"
                      )
                    }
                  >
                    Questions for lawyer
                  </div>
                  <div
                    className="empty-chip"
                    onClick={() =>
                      setMessage(
                        "Identify possible liability risks, missing evidence, and next steps from this case file."
                      )
                    }
                  >
                    Liability risk check
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === "user" ? "You" : "AI"}
                </div>
                <div className="message-body">
                  <div className="message-who">
                    {msg.role === "user" ? "You" : "Liability AI"}
                  </div>
                  <div className="message-bubble">{msg.content}</div>
                  <div className="message-clearfix" />
                </div>
              </div>
            ))}

            {loading && (
              <div className="typing-row">
                <div className="message-avatar">AI</div>
                <div className="message-body">
                  <div className="message-who">Liability AI</div>
                  <div className="typing-bubble">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="input-dock">
            <div className="input-outer">
              <div className="input-wrapper">
                <textarea
                  ref={textareaRef}
                  className="input-field"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask about a case file, paste case facts, or request lawyer suggestions..."
                  rows={1}
                />
                <button
                  className="send-button"
                  onClick={sendMessage}
                  disabled={loading || !message.trim()}
                >
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8L15 1L8.5 15L7 9L1 8Z" />
                  </svg>
                </button>
              </div>
              <div className="input-footer">
                <div className="input-tags">
                  <span className="input-tag">Personal Liability</span>
                  <span className="input-tag">Case File</span>
                  <span className="input-tag">Evidence</span>
                  <span className="input-tag">Risk</span>
                  <span className="input-tag">Lawyer Match</span>
                </div>
                <div className="input-hint">
                  <span>
                    <kbd>↵</kbd> send
                  </span>
                  <span>
                    <kbd>⇧↵</kbd> newline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}