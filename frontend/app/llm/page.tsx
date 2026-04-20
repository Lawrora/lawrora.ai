"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function LLMPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error contacting LLM.",
        },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <main className="flex flex-col h-screen p-6">

      <h1 className="text-2xl font-bold mb-4">
        LLM Chat
      </h1>

      <div className="flex-1 overflow-y-auto border rounded-xl p-4 space-y-4 bg-gray-50">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-xl ${
              msg.role === "user"
                ? "bg-black text-white ml-auto"
                : "bg-white border"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-gray-500">
            Thinking...
          </div>
        )}

      </div>

      <div className="flex mt-4 gap-2">

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-xl px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
        >
          Send
        </button>

      </div>

    </main>
  );
}