import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

// Product page hero in the homepage style: grey rounded panel inside the black frame
export default function ProductHero({
  category,
  name,
  icon,
  tagline,
  desc,
  demo,
}: {
  category: string
  name: string
  icon: ReactNode
  tagline: string
  desc: string
  demo: ReactNode
}) {
  return (
    <section className="bg-[#0a0a0a] px-3 md:px-5 pt-18 pb-5" aria-labelledby="product-hero-heading">
      <div className="rounded-4xl bg-linear-to-b from-[#b9b9b9] via-[#d6d6d6] to-[#f2f2f2] text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-14 lg:px-20 py-14 lg:py-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                {icon}
              </span>
              <div className="leading-tight">
                <p className="text-base font-semibold">{category}</p>
                <p className="text-sm text-black/70">Law firm automation</p>
              </div>
            </div>

            <h1 id="product-hero-heading" className="mt-8 font-serif text-[4.5rem] md:text-[7rem] leading-[0.9] tracking-tight">
              {name}
            </h1>

            <div className="mt-8 max-w-lg border-y border-black/15 py-6">
              <p className="text-xl md:text-2xl font-medium leading-snug">{tagline}</p>
              <p className="mt-4 text-base leading-relaxed text-black/70">{desc}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/demo" className="inline-flex items-center rounded-full border-2 border-white bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_#000] hover:bg-[#222] transition-colors duration-200">
                Book a Demo
              </Link>
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-black/70">
                Our Services
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="w-full">{demo}</div>
        </div>
      </div>
    </section>
  )
}
