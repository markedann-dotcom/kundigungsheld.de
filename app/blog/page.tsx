import Link from "next/link"
import type { Metadata } from "next"
import { Clock, User, ArrowLeft, Scale, ShieldCheck, Lightbulb, Home, Zap, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { blogArticles } from "@/lib/blog-articles"

export const metadata: Metadata = {
  title: "Blog - KündigungsHeld | Rechtstipps von Experten",
  description:
    "Aktuelle Artikel von deutschen Rechtsanwälten und Fachanwälten rund um das Thema Kündigung, Vertragsrecht und Verbraucherschutz.",
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Vertragsrecht: Scale,
  Verbraucherrecht: ShieldCheck,
  Praxistipps: Lightbulb,
  Mietrecht: Home,
  Versicherungsrecht: ShieldCheck,
  Energierecht: Zap,
}

const CATEGORY_COLORS: Record<string, string> = {
  Vertragsrecht: "from-teal-500 to-teal-600",
  Verbraucherrecht: "from-blue-500 to-blue-600",
  Praxistipps: "from-amber-500 to-orange-500",
  Mietrecht: "from-emerald-500 to-emerald-600",
  Versicherungsrecht: "from-indigo-500 to-indigo-600",
  Energierecht: "from-red-500 to-red-600",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-[hsl(210,40%,98%)]">
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

            <div className="mb-14 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Blog
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Rechtstipps von Experten
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Unsere Fachartikel werden von erfahrenen deutschen
                Rechtsanwalten und Fachanwalten verfasst. Hier finden Sie
                praxisnahe Tipps rund um Kündigungen und Verbraucherschutz.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className={`flex items-center gap-2 bg-gradient-to-r ${CATEGORY_COLORS[article.category] || "from-primary to-primary/80"} px-4 py-3`}>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
