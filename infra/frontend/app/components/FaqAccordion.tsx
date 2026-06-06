"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "How does Lawrora handle leads that come in by phone?",
    a: "Lawrora integrates with your existing phone lines. When a call comes in, AI joins the conversation, qualifies the prospect in real time, and prepares a brief for the attorney. The attorney picks up a pre-qualified call — never a cold one.",
  },
  {
    q: "How does the lawyer matching work?",
    a: "Match AI considers practice area, jurisdiction, attorney availability, and current caseload to recommend the best-fit attorney and routes the lead directly to them with a pre-populated case brief.",
  },
  {
    q: "Which practice areas are supported in Phase 1?",
    a: "Phase 1 is purpose-built for Personal Injury and Real Estate — two of the highest-volume, most time-sensitive practice areas. Additional practice areas including Family Law, Immigration, and Litigation are on the roadmap.",
  },
  {
    q: "Is client data secure and HIPAA compliant?",
    a: "Yes. All data is encrypted at rest and in transit using AES-256. Lawrora is HIPAA compliant and SOC 2 Type II certified. We never use your client data to train AI models. Business Associate Agreements (BAAs) are available for all plans.",
  },
  {
    q: "How does Lawrora integrate with existing legal software?",
    a: "Lawrora connects via API to major practice management systems including Clio, MyCase, and Filevine. Integration setup typically takes under a day and our team handles the full configuration.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most firms are fully onboarded within 48 hours. Our team handles all configuration, data migration, and provides live training for your staff at no additional cost.",
  },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
      {faqs.map((faq, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            className="border-b border-[#0E0E2C]/10 last:border-b-0 md:last:border-b md:[&:nth-last-child(2)]:border-b-0"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4 group cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-[#0E0E2C] group-hover:text-[#0E0E2C]/80 transition-colors">
                {faq.q}
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`shrink-0 text-[#0E0E2C]/35 transition-transform duration-250 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="text-sm text-[#0E0E2C]/60 leading-relaxed pb-5 animate-accordion-down">
                {faq.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
