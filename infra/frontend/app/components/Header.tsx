"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X, Scale, Phone, UserCheck, FileText, BookOpen, CalendarCheck } from "lucide-react"

const products = [
  {
    name: "Lead AI",
    desc: "Captures and qualifies leads from call, text, or web, 24/7.",
    href: "/services/lead-ai",
    icon: <Phone size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Match AI",
    desc: "Recommends the right attorney to every prospective client instantly.",
    href: "/services/match-ai",
    icon: <UserCheck size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Draft AI",
    desc: "Generates demand letters, agreements, and filings in seconds.",
    href: "/services/draft-ai",
    icon: <FileText size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Counsel AI",
    desc: "Gives attorneys research, precedents, and AI-suggested next steps.",
    href: "/services/counsel-ai",
    icon: <BookOpen size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Schedule AI",
    desc: "Manages attorney calendars, deadlines, and client coordination.",
    href: "/services/schedule-ai",
    icon: <CalendarCheck size={14} strokeWidth={2} className="text-white/60" />,
  },
]

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
]

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

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
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/8"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between pl-7 pr-5 py-3">

          {/* Logo — always left */}
          <Link href="/" className="flex items-center leading-none shrink-0">
            <Scale size={25} strokeWidth={2} className="text-white" />
          </Link>

          {/* Desktop: nav + CTA grouped on the right */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center text-sm font-medium text-white/75">

              {/* Products dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <Link
                  href="/services"
                  className="flex items-center gap-1 transition-colors px-4 py-2 rounded-lg hover:text-white hover:bg-white/10"
                >
                  Services
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {productsOpen && (
                  <div className="absolute top-full right-0 mt-1 w-76 bg-[#111] rounded-2xl shadow-2xl border border-white/10 p-2 z-50 animate-fade-in">
                    {products.map((p) => (
                      <Link
                        key={p.name}
                        href={p.href}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-white/6 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                          {p.icon}
                        </div>
                        <div>
                          <span className="block text-sm font-semibold text-white">{p.name}</span>
                          <span className="block text-xs text-white/45 leading-snug mt-0.5">{p.desc}</span>
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
                  className="transition-colors px-4 py-2 rounded-lg hover:text-white hover:bg-white/10"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-px h-5 mx-3 bg-white/20" />

            <Link
              href="/demo"
              className="inline-flex items-center px-5 py-2 text-sm font-semibold bg-white text-black border border-black hover:bg-black hover:text-white hover:border-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile: hamburger only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-white/8 px-5 pt-5 pb-6 animate-fade-in">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-3 px-3">
              Services
            </p>
            <div className="space-y-1 mb-5">
              {products.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/6 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                    {p.icon}
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white">{p.name}</span>
                    <span className="block text-xs text-white/45 mt-0.5 leading-snug">{p.desc}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-white/8 pt-4 space-y-1 mb-5">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/6 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              href="/demo"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Book a Demo
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
