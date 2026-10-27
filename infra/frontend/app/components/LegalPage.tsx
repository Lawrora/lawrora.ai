import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

export const LEGAL_UPDATED = "October 26, 2026"
export const CONTACT_EMAIL = "hello@lawrora.ai"

export function LegalSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold tracking-tight text-white mb-4">{title}</h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-white/70 [&_strong]:text-white [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  )
}

export default function LegalPage({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <article className="mx-auto max-w-3xl px-6 pt-36 pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-sm text-white/40 mb-10">Last updated {LEGAL_UPDATED}</p>
        <div className="text-[15px] leading-relaxed text-white/70 mb-12">{intro}</div>
        <div className="space-y-12">{children}</div>
      </article>
      <Footer />
    </main>
  )
}
