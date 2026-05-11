import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductsExplorer from "../components/ProductsExplorer"

export default function Products() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E2C]">
      <Header />

      <section className="pt-36 pb-16 px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-[#FCF9EA] text-[#0E0E2C]/60 px-3 py-1.5 rounded-full mb-6">
            Phase 1: Personal Injury and Real Estate
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mb-5 leading-tight">
            Five AI products. One end-to-end workflow.
          </h1>
          <p className="text-lg text-[#0E0E2C]/60 max-w-xl leading-relaxed">
            From the moment a lead comes in to the final invoice, Lawrora covers every stage of the matter lifecycle.
          </p>
        </div>
      </section>

      <section className="pb-24 px-8">
        <div className="mx-auto max-w-7xl">
          <ProductsExplorer />
        </div>
      </section>

      <section className="py-16 px-8 bg-[#FCF9EA] text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0E0E2C]/40 mb-4">Ready to see it live?</p>
        <h2 className="text-2xl font-bold mb-6">See all five products working together in 30 minutes.</h2>
        <Link href="/#demo" className="inline-block rounded-full bg-[#0E0E2C] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0E0E2C]/85 transition-colors">
          Book a Demo
        </Link>
      </section>

      <Footer />
    </main>
  )
}
