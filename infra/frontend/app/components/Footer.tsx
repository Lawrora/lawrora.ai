import Link from "next/link"
import { Scale, Twitter, Linkedin, Github, ShieldCheck, Lock } from "lucide-react"

const productLinks = [
  { label: "Lead AI",      href: "/products/lead-ai" },
  { label: "Match AI",     href: "/products/match-ai" },
  { label: "Draft AI",     href: "/products/draft-ai" },
  { label: "Counsel AI",   href: "/products/counsel-ai" },
  { label: "Schedule AI",  href: "/products/schedule-ai" },
]

const companyLinks = [
  { label: "About",    href: "#" },
  { label: "Careers",  href: "#" },
  { label: "Blog",     href: "#" },
  { label: "Contact",  href: "#" },
]

const legalLinks = [
  { label: "Privacy Policy",    href: "#" },
  { label: "Terms of Service",  href: "#" },
  { label: "HIPAA Notice",      href: "#" },
  { label: "Compliance",        href: "#" },
]

const socials = [
  {
    label: "Twitter / X",
    href: "https://x.com/lawrora_ai",
    icon: <Twitter size={16} strokeWidth={1.8} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/lawrora/",
    icon: <Linkedin size={16} strokeWidth={1.8} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Lawrora",
    icon: <Github size={16} strokeWidth={1.8} />,
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0E0E2C] text-white px-8 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-12 pb-10 border-b border-white/8">
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/60">
            <ShieldCheck size={13} strokeWidth={2} className="text-emerald-400 shrink-0" />
            HIPAA Compliant
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/60">
            <ShieldCheck size={13} strokeWidth={2} className="text-blue-400 shrink-0" />
            SOC 2 Type II
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/60">
            <Lock size={13} strokeWidth={2} className="text-violet-400 shrink-0" />
            256-bit AES Encryption
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/60">
            <ShieldCheck size={13} strokeWidth={2} className="text-amber-400 shrink-0" />
            Zero Model Training on Client Data
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Scale size={15} strokeWidth={2} className="text-white/80" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight">LAWRORA</span>
                <span className="text-[9px] font-semibold tracking-widest text-white/30 uppercase">Legal Ease</span>
              </div>
            </Link>
            <p className="text-sm text-white/45 max-w-xs leading-relaxed mb-6">
              The AI paralegal for modern law firms. Helps lawyers capture and convert every lead, and connects every client with the right attorney — automatically.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">Products</h4>
            <ul className="space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Lawrora Technologies, Inc. All rights reserved.</p>
          <p className="text-center">
            Not a law firm. Lawrora does not provide legal advice. All outputs require attorney review.
          </p>
        </div>

      </div>
    </footer>
  )
}
