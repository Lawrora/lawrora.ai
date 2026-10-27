"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

// Mounts its children only once they scroll into view, so their CSS entrance
// animations play when the reader gets there rather than on page load
export default function PlayOnView({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div ref={ref} className="flex h-full w-full items-center justify-center">{shown && children}</div>
}
