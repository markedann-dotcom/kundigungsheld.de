"use client"

import { useState, useCallback } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const faqs = [
  {
    question: "Ist der Service wirklich kostenlos?",
    answer:
      "Ja, AmtlyPhoto ist komplett kostenlos. Du kannst so viele Fotos erstellen, wie du möchtest – ohne versteckte Kosten oder Abonnements.",
    category: "Allgemein",
  },
  {
    question: "Werden meine Fotos gespeichert?",
    answer:
      "Nein. Deine Fotos werden ausschließlich zur Verarbeitung verwendet und danach sofort gelöscht. Wir speichern keine persönlichen Daten – deine Privatsphäre hat für uns höchste Priorität.",
    category: "Datenschutz",
  },
  {
    question: "Erfüllt das Foto die deutschen Anforderungen?",
    answer:
      "Unsere KI erstellt Fotos im Format 35×45 mm mit biometrischem Standard. Das Ergebnis ist für Reisepass, Personalausweis und Führerschein geeignet und entspricht den aktuellen Vorgaben des Bundesinnenministeriums.",
    category: "Technik",
  },
  {
    question: "Welche Fotos kann ich hochladen?",
    answer:
      "Am besten funktioniert ein frontales Selfie mit guter Beleuchtung und neutralem Hintergrund. Unterstützt werden JPG, PNG und WebP bis maximal 10 MB. Brillen und Kopfbedeckungen sollten vermieden werden.",
    category: "Technik",
  },
  {
    question: "Kann ich das Foto für Bewerbungen verwenden?",
    answer:
      "Ja! Das generierte Foto eignet sich hervorragend als professionelles Bewerbungsfoto – mit sauberem Hintergrund und optimierter Belichtung.",
    category: "Verwendung",
  },
  {
    question: "Wie lange dauert die Verarbeitung?",
    answer:
      "Die KI-Verarbeitung dauert in der Regel nur wenige Sekunden. Bei hoher Auslastung kann es etwas länger dauern, aber meist bist du in unter 30 Sekunden fertig.",
    category: "Technik",
  },
  {
    question: "In welchen Formaten kann ich das Foto herunterladen?",
    answer:
      "Du kannst dein Foto als JPG oder PNG herunterladen – in der druckfertigen Auflösung für optimale Qualität beim Ausdrucken.",
    category: "Verwendung",
  },
]

const CATEGORIES = ["Alle", ...Array.from(new Set(faqs.map((f) => f.category)))]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("Alle")
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll()
  const { ref: listRef, isVisible: listVisible } = useAnimateOnScroll({ threshold: 0.05 })

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  const filtered = faqs.filter((faq) => {
    const matchesSearch =
      !search.trim() ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === "Alle" || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Highlight matching text
  function highlight(text: string) {
    if (!search.trim()) return text
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <section id="faq" className="px-5 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div
          ref={headerRef}
          className={`scroll-reveal mb-10 text-center sm:mb-12 ${headerVisible ? "visible" : ""}`}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Häufig gestellte Fragen
          </h2>
          <p className="mt-4 text-muted-foreground text-base">
            {faqs.length} Antworten auf die häufigsten Fragen
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null) }}
            placeholder="Fragen durchsuchen..."
            className="w-full h-12 rounded-xl border border-border/60 bg-card pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              {cat !== "Alle" && (
                <span className="ml-1.5 opacity-60">
                  {faqs.filter((f) => f.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <dl
          ref={listRef}
          className={`scroll-reveal-stagger flex flex-col gap-2 ${listVisible ? "visible" : ""}`}
        >
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-foreground">Keine Ergebnisse</p>
              <p className="text-sm mt-1">Versuche einen anderen Suchbegriff</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("Alle") }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            filtered.map((faq, i) => {
              // Find original index for stable toggle
              const originalIndex = faqs.indexOf(faq)
              const isOpen = openIndex === originalIndex
              const panelId = `faq-panel-${originalIndex}`
              const triggerId = `faq-trigger-${originalIndex}`

              return (
                <div
                  key={triggerId}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-primary/20 bg-card shadow-md"
                      : "border-border/60 bg-card/50 hover:border-border hover:bg-card"
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <dt>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(originalIndex)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:rounded-2xl"
                    >
                      <div className="flex-1 pr-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-1 block">
                          {faq.category}
                        </span>
                        <span className="text-sm font-semibold text-foreground sm:text-base">
                          {highlight(faq.question)}
                        </span>
                      </div>
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
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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

        {/* Footer count */}
        {filtered.length > 0 && search && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {filtered.length} von {faqs.length} Fragen angezeigt
          </p>
        )}
      </div>
    </section>
  )
}