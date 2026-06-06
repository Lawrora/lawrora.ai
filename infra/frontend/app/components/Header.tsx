"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, Scale } from "lucide-react"

const products = [
  {
    name: "Lead AI",
    desc: "Captures and qualifies leads from call, text, or web, 24/7.",
    href: "/products/lead-ai",
    dot: "bg-blue-500",
  },
  {
    name: "Match AI",
    desc: "Recommends the right attorney to every prospective client instantly.",
    href: "/products/match-ai",
    dot: "bg-violet-500",
  },
  {
    name: "Draft AI",
    desc: "Generates demand letters, agreements, and filings in seconds.",
    href: "/products/draft-ai",
    dot: "bg-orange-500",
  },
  {
    name: "Counsel AI",
    desc: "Gives attorneys research, precedents, and AI-suggested next steps.",
    href: "/products/counsel-ai",
    dot: "bg-amber-500",
  },
  {
    name: "Schedule AI",
    desc: "Manages attorney calendars, deadlines, and client coordination.",
    href: "/products/schedule-ai",
    dot: "bg-emerald-500",
  },
]

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Resources", href: "/resources" },
]

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#0E0E2C]/8"
            : "bg-white/90 backdrop-blur-sm border-b border-[#0E0E2C]/6"
        }`}
      >
        <div className="w-full flex items-center justify-between pl-7 pr-5 py-3">

          {/* Logo — always left */}
          <Link href="/" className="flex items-center gap-2.5 leading-none shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0E0E2C] flex items-center justify-center shrink-0">
              <Scale size={15} strokeWidth={2} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-[#0E0E2C]">LAWRORA</span>
              <span className="text-[9px] font-semibold tracking-widest text-[#0E0E2C]/40 uppercase">Legal Ease</span>
            </div>
          </Link>

          {/* Desktop: nav + CTA grouped on the right */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center text-sm font-medium text-[#0E0E2C]/60">

              {/* Products dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <Link
                  href="/products"
                  className="flex items-center gap-1 hover:text-[#0E0E2C] hover:bg-[#0E0E2C]/4 transition-colors px-4 py-2 rounded-lg"
                >
                  Products
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {productsOpen && (
                  <div className="absolute top-full right-0 mt-1 w-76 bg-white rounded-2xl shadow-xl border border-[#0E0E2C]/8 p-2 z-50 animate-fade-in">
                    {products.map((p) => (
                      <Link
                        key={p.name}
                        href={p.href}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-[#FCF9EA] transition-colors"
                      >
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${p.dot}`} />
                        <div>
                          <span className="block text-sm font-semibold text-[#0E0E2C]">{p.name}</span>
                          <span className="block text-xs text-[#0E0E2C]/50 leading-snug mt-0.5">{p.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="hover:text-[#0E0E2C] hover:bg-[#0E0E2C]/4 transition-colors px-4 py-2 rounded-lg"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-px h-5 bg-[#0E0E2C]/10 mx-3" />

            <Link
              href="#demo"
              className="inline-flex items-center rounded-full bg-[#0E0E2C] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0E0E2C]/85 transition-all duration-200 hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile: hamburger only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#FCF9EA] transition-colors text-[#0E0E2C]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#0E0E2C]/8 px-5 pt-5 pb-6 animate-fade-in">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0E0E2C]/35 mb-3 px-3">
              Products
            </p>
            <div className="space-y-1 mb-5">
              {products.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FCF9EA] transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${p.dot}`} />
                  <div>
                    <span className="block text-sm font-semibold text-[#0E0E2C]">{p.name}</span>
                    <span className="block text-xs text-[#0E0E2C]/50 mt-0.5 leading-snug">{p.desc}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-[#0E0E2C]/8 pt-4 space-y-1 mb-5">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-[#0E0E2C]/70 hover:text-[#0E0E2C] rounded-xl hover:bg-[#FCF9EA] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              href="#demo"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center rounded-xl bg-[#0E0E2C] px-5 py-3 text-sm font-semibold text-white"
            >
              Book a Demo
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
