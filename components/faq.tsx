"use client"

import { useState, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const faqs = [
  {
    question: "Ist der Service wirklich kostenlos?",
    answer:
      "Ja, AmtlyPhoto ist komplett kostenlos. Du kannst so viele Fotos erstellen, wie du möchtest.",
  },
  {
    question: "Werden meine Fotos gespeichert?",
    answer:
      "Nein. Deine Fotos werden ausschließlich zur Verarbeitung verwendet und danach sofort gelöscht. Wir speichern keine persönlichen Daten.",
  },
  {
    question: "Erfüllt das Foto die deutschen Anforderungen?",
    answer:
      "Unsere KI erstellt Fotos im Format 35×45 mm mit biometrischem Standard. Das Ergebnis ist für Reisepass, Personalausweis und Führerschein geeignet.",
  },
  {
    question: "Welche Fotos kann ich hochladen?",
    answer:
      "Am besten funktioniert ein frontales Selfie mit guter Beleuchtung. Unterstützt werden JPG, PNG und WebP bis maximal 10 MB.",
  },
  {
    question: "Kann ich das Foto für Bewerbungen verwenden?",
    answer:
      "Ja! Das generierte Foto eignet sich hervorragend als professionelles Bewerbungsfoto.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll()
  const { ref: listRef, isVisible: listVisible } = useAnimateOnScroll({
    threshold: 0.05,
  })

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  return (
    <section id="faq" className="px-5 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div
          ref={headerRef}
          className={`scroll-reveal mb-12 text-center sm:mb-14 ${headerVisible ? "visible" : ""}`}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Häufig gestellte Fragen
          </h2>
        </div>

        {/* Accordion list */}
        <dl
          ref={listRef}
          className={`scroll-reveal-stagger flex flex-col gap-2 ${listVisible ? "visible" : ""}`}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            const panelId = `faq-panel-${i}`
            const triggerId = `faq-trigger-${i}`

            return (
              <div
                key={triggerId}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/20 bg-card shadow-md"
                    : "border-border/60 bg-card/50 hover:border-border hover:bg-card"
                }`}
              >
                <dt>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:rounded-2xl"
                  >
                    <span className="pr-6 text-sm font-semibold text-foreground sm:text-base">
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>
                </dt>
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pr-16 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}