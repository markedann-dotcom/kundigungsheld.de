"use client"

import { useState, useCallback, useMemo } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"

export function FaqSection() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [search, setSearch] = useState("")

  const faqs = useMemo(() => [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
  ], [t])

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  // Highlight matching text
  function highlight(text: string) {
    if (!search.trim()) return <>{text}</>
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const parts = text.split(new RegExp(`(${escaped})`, "gi"))
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-primary/20 text-foreground rounded-sm px-0.5 not-italic">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs.map((f, i) => ({ ...f, originalIndex: i }))
    const q = search.toLowerCase()
    return faqs
      .map((f, i) => ({ ...f, originalIndex: i }))
      .filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      )
  }, [faqs, search])

  return (
    <section id="faq" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">

        {/* Header */}
        <AnimateIn>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t.faq.sectionLabel}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">{t.faq.title}</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {faqs.length} Fragen &amp; Antworten
            </p>
          </div>
        </AnimateIn>

        {/* Search */}
        <AnimateIn delay={100}>
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setOpenIndex(null)
              }}
              placeholder="Fragen durchsuchen..."
              className="w-full h-12 rounded-xl border border-border/60 bg-background pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setOpenIndex(null) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Suche leeren"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </AnimateIn>

        {/* Accordion */}
        <AnimateIn delay={150}>
          <dl className="mt-6 flex flex-col gap-2">
            {filtered.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-border/60 bg-background/50">
                <Search className="h-8 w-8 mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="font-semibold text-foreground text-sm">Keine Ergebnisse</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Kein Treffer für „{search}"
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-xs text-primary hover:underline"
                >
                  Suche zurücksetzen
                </button>
              </div>
            ) : (
              filtered.map((faq, i) => {
                const isOpen = openIndex === faq.originalIndex
                const panelId = `faq-panel-${faq.originalIndex}`
                const triggerId = `faq-trigger-${faq.originalIndex}`

                return (
                  <div
                    key={faq.originalIndex}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-primary/20 bg-card shadow-md"
                        : "border-border/60 bg-card/50 hover:border-border hover:bg-card"
                    }`}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <dt>
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(faq.originalIndex)}
                        className="flex w-full items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:rounded-2xl"
                      >
                        <span className="pr-6 text-sm font-semibold text-foreground sm:text-base">
                          {highlight(faq.question)}
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
                          {highlight(faq.answer)}
                        </p>
                      </div>
                    </dd>
                  </div>
                )
              })
            )}
          </dl>

          {/* Result count when searching */}
          {search && filtered.length > 0 && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {filtered.length} von {faqs.length} Fragen angezeigt
            </p>
          )}
        </AnimateIn>
      </div>
    </section>
  )
}