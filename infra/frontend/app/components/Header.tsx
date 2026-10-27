"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X, Scale, Phone, UserCheck, FileText, BookOpen, CalendarCheck, LayoutGrid, Briefcase, Check, ArrowRight } from "lucide-react"

const products = [
  {
    name: "Lead AI",
    desc: "Captures and qualifies leads from call, text, or web, 24/7.",
    href: "/products/lead-ai",
    icon: <Phone size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Match AI",
    desc: "Recommends the right attorney to every prospective client instantly.",
    href: "/products/match-ai",
    icon: <UserCheck size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Draft AI",
    desc: "Generates demand letters, agreements, and filings in seconds.",
    href: "/products/draft-ai",
    icon: <FileText size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Counsel AI",
    desc: "Gives attorneys research, precedents, and AI-suggested next steps.",
    href: "/products/counsel-ai",
    icon: <BookOpen size={14} strokeWidth={2} className="text-white/60" />,
  },
  {
    name: "Schedule AI",
    desc: "Manages attorney calendars, deadlines, and client coordination.",
    href: "/products/schedule-ai",
    icon: <CalendarCheck size={14} strokeWidth={2} className="text-white/60" />,
  },
]

// Mega menu groups; each name must match an entry in `products`.
const productGroups = [
  { heading: "Capture & Qualify", items: ["Lead AI", "Match AI"] },
  { heading: "Draft & Research",  items: ["Draft AI", "Counsel AI"] },
  { heading: "Manage & Schedule", items: ["Schedule AI"] },
]

const exploreLinks = [
  { name: "All products", desc: "See how the pieces fit together.",     href: "/products",  icon: <LayoutGrid size={14} strokeWidth={2} className="text-white/60" /> },
  { name: "Services",     desc: "What Lawrora does for your firm.",     href: "/services",  icon: <Briefcase  size={14} strokeWidth={2} className="text-white/60" /> },
]

const trustPoints = ["HIPAA compliant", "SOC 2 Type II", "Live 24/7", "Built for law firms"]

const navLinks = [
  { label: "Services", href: "/services" },
]

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  // Delay closing so the pointer can travel from the trigger into the menu.
  function openProducts() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setProductsOpen(true)
  }

  function closeProductsSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setProductsOpen(false), 300)
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMobileOpen(false); setProductsOpen(false) }
    }
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
          <Link href="/" className="flex items-center gap-2.5 leading-none shrink-0">
            <Scale size={25} strokeWidth={2} className="text-white" />
            <span className="font-serif text-[1.7rem] leading-none tracking-tight text-white">Lawrora</span>
          </Link>

          {/* Desktop: nav + CTA grouped on the right */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center text-sm font-medium text-white/75">

              {/* Products mega menu: the wrapper is static so the panel anchors to the full-width header */}
              <div
                onMouseEnter={openProducts}
                onMouseLeave={closeProductsSoon}
              >
                <Link
                  href="/products"
                  onClick={() => setProductsOpen(false)}
                  aria-expanded={productsOpen}
                  className="flex items-center gap-1 transition-colors px-4 py-2 rounded-lg hover:text-white hover:bg-white/10"
                >
                  Products
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {productsOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 px-5 pt-2">
                    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl animate-fade-in">
                      <div className="grid grid-cols-[1fr_auto]">
                        <div className="grid grid-cols-4 gap-8 p-8">
                          {/* Product groups */}
                          <div className="col-span-3">
                            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">Products</p>
                            <div className="grid grid-cols-3 gap-6">
                              {productGroups.map((g) => (
                                <div key={g.heading}>
                                  <p className="mb-2 px-3 text-[11px] font-semibold text-white/55">{g.heading}</p>
                                  <div className="space-y-1">
                                    {products.filter((p) => g.items.includes(p.name)).map((p) => (
                                      <Link
                                          key={p.name}
                                          href={p.href}
                                          onClick={() => setProductsOpen(false)}
                                          className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/6"
                                        >
                                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/8 transition-colors group-hover:bg-white/15">
                                            {p.icon}
                                          </div>
                                          <div>
                                            <span className="block text-sm font-semibold text-white">{p.name}</span>
                                            <span className="mt-0.5 block text-xs leading-snug text-white/45">{p.desc}</span>
                                          </div>
                                        </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Explore */}
                          <div className="border-l border-white/8 pl-8">
                            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">Explore</p>
                            <div className="space-y-1">
                              {exploreLinks.map((l) => (
                                <Link
                                          key={l.name}
                                          href={l.href}
                                          onClick={() => setProductsOpen(false)}
                                          className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/6"
                                        >
                                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/8 transition-colors group-hover:bg-white/15">
                                            {l.icon}
                                          </div>
                                          <div>
                                            <span className="block text-sm font-semibold text-white">{l.name}</span>
                                            <span className="mt-0.5 block text-xs leading-snug text-white/45">{l.desc}</span>
                                          </div>
                                        </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Highlight panel */}
                        <div className="flex w-64 flex-col justify-between border-l border-white/8 bg-white/4 p-8">
                          <div>
                            <p className="text-base font-semibold text-white">Automate your firm</p>
                            <ul className="mt-5 space-y-3">
                              {trustPoints.map((t) => (
                                <li key={t} className="flex items-center gap-3 text-sm text-white/75">
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                                    <Check size={11} strokeWidth={3} />
                                  </span>
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Link
                            href="/demo"
                            onClick={() => setProductsOpen(false)}
                            className="group mt-8 inline-flex items-center justify-between rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/85"
                          >
                            Book a demo
                            <ArrowRight size={15} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
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
              Products
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
