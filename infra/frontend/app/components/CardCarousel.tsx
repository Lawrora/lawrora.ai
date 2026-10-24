"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export type CarouselCard = {
  tag: string
  title: string
  desc: string
  bg: string
  image: string
  href: string
}

export default function CardCarousel({ cards }: { cards: CarouselCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })
  const [dragging, setDragging] = useState(false)

  // Start with the third card centred so the first card is half visible on desktop.
  useEffect(() => {
    const track = trackRef.current
    const third = track?.children[2] as HTMLElement | undefined
    if (!track || !third) return
    track.scrollTo({ left: third.offsetLeft + third.offsetWidth / 2 - track.clientWidth / 2, behavior: "instant" })
  }, [])

  // Centre card at full size, neighbours shrink away from it; scale falls off over one card width.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0

    function update() {
      frame = 0
      if (!track) return
      const center = track.scrollLeft + track.clientWidth / 2
      for (const el of Array.from(track.children) as HTMLElement[]) {
        const cardCenter = el.offsetLeft + el.offsetWidth / 2
        const t = Math.min(Math.abs(center - cardCenter) / el.offsetWidth, 1)
        el.style.transform = `scale(${0.8 + 0.32 * (1 - t)})`
        el.style.zIndex = t < 0.5 ? "1" : "0"
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    track.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return // touch scrolls natively
    const track = trackRef.current
    if (!track) return
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: 0 }
    setDragging(true)
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current
    if (!drag.current.active || !track) return
    const dx = e.clientX - drag.current.startX
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx))
    track.scrollLeft = drag.current.startScroll - dx
  }

  function endDrag() {
    if (!drag.current.active) return
    drag.current.active = false
    setDragging(false)
  }

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={(e) => {
        // A drag should not count as a click on the card underneath.
        if (drag.current.moved > 5) {
          e.preventDefault()
          e.stopPropagation()
          drag.current.moved = 0
        }
      }}
      className={`flex gap-4 pt-20 pb-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none ${
        dragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory scroll-smooth"
      } [--card-w:calc((100vw-2rem)/2)] md:[--card-w:calc((100vw-4rem)/4)]`}
    >
      {cards.map((c) => (
        <Link
          key={c.title}
          href={c.href}
          draggable={false}
          className={`group relative flex h-120 lg:h-150 w-(--card-w) shrink-0 snap-center flex-col origin-bottom will-change-transform overflow-hidden rounded-4xl ${c.bg} p-7 text-white`}
        >
          <Image
            src={c.image}
            alt=""
            fill
            sizes="(min-width: 768px) 30vw, 60vw"
            draggable={false}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/25 to-black/10" aria-hidden="true" />
          <div className="relative flex items-start justify-between gap-4">
            <span className="text-xs font-medium text-white/75">{c.tag}</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors duration-200 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={18} strokeWidth={2} />
            </span>
          </div>
          <h3 className="relative mt-4 text-3xl font-semibold leading-tight">{c.title}</h3>
          <p className="relative mt-4 text-base leading-relaxed text-white/80">{c.desc}</p>
        </Link>
      ))}
    </div>
  )
}
