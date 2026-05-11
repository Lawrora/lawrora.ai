"use client"

import { useState } from "react"
import Link from "next/link"

const products = [
  {
    name: "Lead AI",
    desc: "Captures and qualifies leads from call, text, or web, 24/7.",
    href: "/products/lead-ai",
  },
  {
    name: "Match AI",
    desc: "Recommends the right attorney to every prospective client instantly.",
    href: "/products/match-ai",
  },
  {
    name: "Draft AI",
    desc: "Generates demand letters, agreements, and filings from case facts in seconds.",
    href: "/products/draft-ai",
  },
  {
    name: "Counsel AI",
    desc: "Gives attorneys research, precedents, and AI-suggested next steps.",
    href: "/products/counsel-ai",
  },
  {
    name: "Schedule AI",
    desc: "Manages attorney calendars, deadlines, and client coordination.",
    href: "/products/schedule-ai",
  },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-[#0E0E2C]/8">
      <div className="w-full flex items-center justify-between pl-7 pr-8 py-3">

        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="text-xl font-bold tracking-tight text-[#0E0E2C]">LAWRORA</span>
          <span className="text-[10px] font-semibold tracking-widest text-[#0E0E2C]/40 uppercase">Legal Ease</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#0E0E2C]/65">

          {/* Products with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <Link
              href="/products"
              className="flex items-center gap-1 hover:text-[#0E0E2C] transition-colors py-4"
            >
              Products
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>

            {open && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-72 bg-white rounded-2xl shadow-xl border border-[#0E0E2C]/8 p-2 z-50">
                {products.map((p) => (
                  <Link
                    key={p.name}
                    href={p.href}
                    className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-[#FCF9EA] transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#0E0E2C]">{p.name}</span>
                    <span className="text-xs text-[#0E0E2C]/50 leading-snug">{p.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/solutions"  className="hover:text-[#0E0E2C] transition-colors">Solutions</Link>
          <Link href="/use-cases"  className="hover:text-[#0E0E2C] transition-colors">Use Cases</Link>
          <Link href="/resources"  className="hover:text-[#0E0E2C] transition-colors">Resources</Link>

          <button aria-label="Search" className="text-[#0E0E2C]/50 hover:text-[#0E0E2C] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </nav>

      </div>
    </header>
  )
}
