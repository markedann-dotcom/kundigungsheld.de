"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Clock, User, ArrowLeft, Scale, ShieldCheck, Lightbulb, Home, Zap, FileText, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { blogArticles } from "@/lib/blog-articles"

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Vertragsrecht: Scale,
  Verbraucherrecht: ShieldCheck,
  Praxistipps: Lightbulb,
  Mietrecht: Home,
  Versicherungsrecht: ShieldCheck,
  Energierecht: Zap,
  Finanzen: FileText,
}

const CATEGORY_COLORS: Record<string, string> = {
  Vertragsrecht: "from-teal-500 to-teal-600",
  Verbraucherrecht: "from-blue-500 to-blue-600",
  Praxistipps: "from-amber-500 to-orange-500",
  Mietrecht: "from-emerald-500 to-emerald-600",
  Versicherungsrecht: "from-indigo-500 to-indigo-600",
  Energierecht: "from-red-500 to-red-600",
  Finanzen: "from-violet-500 to-violet-600",
}

const ALL_CATEGORIES = Array.from(new Set(blogArticles.map((a) => a.category)))

export function BlogClient() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogArticles.filter((article) => {
      const matchesCategory = activeCategory ? article.category === activeCategory : true
      const matchesQuery =
        q === "" ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  const clearSearch = () => {
    setQuery("")
    setActiveCategory(null)
  }

  const hasFilters = query.trim() !== "" || activeCategory !== null

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background">
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-4">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Zur Startseite
                </Link>
              </Button>
            </div>

            {/* Header */}
            <div className="mb-10 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Blog
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Rechtstipps &amp; Ratgeber
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Praxisnahe Artikel rund um Kündigungen, Vertragsrecht und Verbraucherrecht — geprüft von der KündigungsHeld Redaktion.
              </p>
            </div>

            {/* Search + Filter block */}
            <div className="mb-10 space-y-4">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Artikel suchen — z.B. Kündigung, Frist, Umzug …"
                  className="w-full rounded-xl border border-border/60 bg-card py-3 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all border ${
                    activeCategory === null
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-muted-foreground border-border/60 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  Alle
                </button>
                {ALL_CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat] || FileText
                  const isActive = activeCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(isActive ? null : cat)}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all border ${
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card text-muted-foreground border-border/60 hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {cat}
                    </button>
                  )
                })}
              </div>

              {/* Results count + clear */}
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {filtered.length === blogArticles.length
                    ? `${blogArticles.length} Artikel`
                    : `${filtered.length} von ${blogArticles.length} Artikeln`}
                </p>
                {hasFilters && (
                  <button
                    onClick={clearSearch}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    <X className="h-3 w-3" />
                    Filter zurücksetzen
                  </button>
                )}
              </div>
            </div>

            {/* Articles grid */}
            {filtered.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div
                      className={`flex items-center gap-2 bg-gradient-to-r ${
                        CATEGORY_COLORS[article.category] || "from-primary to-primary/80"
                      } px-4 py-3`}
                    >
                      {(() => {
                        const Icon = CATEGORY_ICONS[article.category] || FileText
                        return <Icon className="h-4 w-4 text-white/80" />
                      })()}
                      <span className="text-xs font-medium text-white/90">{article.category}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.date).toLocaleDateString("de-DE", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                        {article.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-4 border-t border-border/40 pt-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <User className="h-3.5 w-3.5" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Keine Artikel gefunden
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Zu „{query}" gibt es leider keine Treffer. Versuchen Sie einen anderen Suchbegriff.
                </p>
                <button
                  onClick={clearSearch}
                  className="mt-6 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/80 transition-colors"
                >
                  Alle Artikel anzeigen
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}