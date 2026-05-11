import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0E0E2C] text-white px-8 py-16">
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <div className="mb-1">
              <span className="text-xl font-bold tracking-tight">LAWRORA</span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-white/30 uppercase block mb-4">Legal Ease</span>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Intelligent legal assistance designed to simplify workflows and improve clarity.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Product</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { label: "Products",  href: "/products"  },
                { label: "Solutions", href: "/solutions" },
                { label: "Use Cases", href: "/use-cases" },
                { label: "Resources", href: "/resources" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {["About", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {["Privacy Policy", "Terms of Service", "Compliance"].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <p>© {new Date().getFullYear()} Lawrora.ai. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://x.com/lawrora_ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/company/lawrora/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/Lawrora" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
