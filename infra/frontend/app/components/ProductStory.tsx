import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { Check, X, type LucideIcon } from "lucide-react"
import FadeIn from "./FadeIn"
import PlayOnView from "./PlayOnView"

// The sections under every product hero, in the homepage style: how it works in
// three plain steps, why it matters (without vs with), and what the firm gains.

export type StoryStep = { icon: LucideIcon; title: string; desc: string; visual: ReactNode }
export type StoryGain = { value: string; title: string; desc: string }

export type Story = {
  name: string
  accent: string
  howTitle: ReactNode
  steps: StoryStep[]
  whyTitle: ReactNode
  without: string[]
  with: string[]
  gainTitle: ReactNode
  gains: StoryGain[]
  ctaTitle: string
}

export default function ProductStory({ story, features }: { story: Story; features: { title: string }[] }) {
  return (
    <div style={{ "--accent": story.accent } as CSSProperties}>
      {/* ── How it works ───────────────────────────────────── */}
      <section className="bg-linear-to-b from-[#c2c2c2] via-[#d6d6d6] to-[#e8e8e8] px-4 py-24 text-black md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-400">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/55">How it works</p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">{story.howTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">Three steps, in plain terms. Nothing for your team to set up or babysit.</p>
          </FadeIn>

          <div className="relative mt-16">
            {/* The thick line from the homepage, running behind the panels */}
            <span className="absolute top-1/2 right-6 left-6 hidden h-2.5 -translate-y-1/2 rounded-full bg-black lg:block" aria-hidden="true" />
            <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
              {story.steps.map(({ icon: Icon, title, desc, visual }, i) => (
                <FadeIn key={title} delay={i * 150}>
                  <li className="flex h-full flex-col rounded-4xl bg-[#0a0a0a] p-6 text-white shadow-2xl shadow-black/25 md:p-8">
                    <div className="flex h-60 items-center justify-center overflow-hidden rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                      <PlayOnView>{visual}</PlayOnView>
                    </div>
                    <div className="mt-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                      <span className="font-mono tracking-normal text-white/35">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-8 bg-white/25" />
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                        <Icon size={14} strokeWidth={2} />
                      </span>
                      Step {i + 1}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">{title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/65">{desc}</p>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Why ────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] px-4 py-24 text-white md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-400">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Why {story.name}</p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">{story.whyTitle}</h2>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-4xl bg-white/5 p-8 ring-1 ring-white/10 md:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Without {story.name}</p>
                <ul className="mt-8 space-y-5">
                  {story.without.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-lg text-white/55">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50"><X size={15} strokeWidth={2.5} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="h-full rounded-4xl bg-white p-8 text-black md:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">With {story.name}</p>
                <ul className="mt-8 space-y-5">
                  {story.with.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-lg font-medium">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--accent) text-white"><Check size={15} strokeWidth={3} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── What you gain ──────────────────────────────────── */}
      <section className="bg-linear-to-b from-[#e8e8e8] via-[#d6d6d6] to-[#c2c2c2] px-4 py-24 text-black md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-400">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/55">What you gain</p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">{story.gainTitle}</h2>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {story.gains.map((g, i) => (
              <FadeIn key={g.title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-4xl bg-[#0a0a0a] p-8 text-white shadow-2xl shadow-black/20">
                  <p className="font-serif text-6xl leading-none tracking-tight">{g.value}</p>
                  <span className="mt-6 block h-1.5 w-12 rounded-full bg-(--accent)" />
                  <h3 className="mt-6 text-xl font-bold">{g.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/60">{g.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">Also included</p>
            <div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-2.5">
              {features.map((f) => (
                <span key={f.title} className="rounded-full bg-black/8 px-4 py-2 text-sm font-medium text-black/75">{f.title}</span>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-20">
            <div className="relative overflow-hidden rounded-4xl bg-[#0a0a0a] px-8 py-16 text-center text-white md:py-20">
              <span className="pointer-events-none absolute -top-1/2 left-1/4 h-[150%] w-1/2 rounded-full bg-(--accent) opacity-15 blur-3xl" aria-hidden="true" />
              <h2 className="relative font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">{story.ctaTitle}</h2>
              <Link href="/demo" className="relative mt-10 inline-flex items-center rounded-full bg-white px-9 py-4.5 text-base font-semibold text-black transition-colors duration-200 hover:bg-white/85 md:text-lg">
                Book a Demo
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
