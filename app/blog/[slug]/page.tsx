import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, User, Calendar, Scale, ShieldCheck, Lightbulb, Home, Zap, FileText, Smartphone, Flame, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { blogArticles, getArticleBySlug } from "@/lib/blog-articles"

const BASE_URL = "https://kuendigungsheld.de"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Artikel nicht gefunden" }

  const ogImageUrl = `${BASE_URL}/blog/${slug}/opengraph-image`

  return {
    title: `${article.title} - KündigungsHeld Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `${BASE_URL}/blog/${slug}`,
      locale: "de_DE",
      siteName: "KündigungsHeld",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImageUrl],
    },
  }
}

function getArticleJsonLd(article: { title: string; excerpt: string; author: string; authorRole: string; date: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    datePublished: article.date,
    publisher: {
      "@type": "Organization",
      name: "KündigungsHeld",
      url: BASE_URL,
    },
    inLanguage: "de",
    url: `${BASE_URL}/blog/${article.slug}`,
  }
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
  Vertragsrecht: "from-teal-500/90 to-teal-600/90",
  Verbraucherrecht: "from-blue-500/90 to-blue-600/90",
  Praxistipps: "from-amber-500/90 to-orange-500/90",
  Mietrecht: "from-emerald-500/90 to-emerald-600/90",
  Versicherungsrecht: "from-indigo-500/90 to-indigo-600/90",
  Energierecht: "from-red-500/90 to-red-600/90",
}

function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    key++
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key}
          className="mb-4 mt-10 font-display text-2xl font-bold text-foreground"
        >
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key}
          className="mb-3 mt-8 font-display text-xl font-semibold text-foreground"
        >
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/)
      if (match) {
        elements.push(
          <li key={key} className="ml-6 list-disc py-1 text-foreground/80">
            <strong className="font-semibold text-foreground">{match[1]}</strong>
            {match[2] ? `: ${match[2]}` : ""}
          </li>
        )
      } else {
        elements.push(
          <li key={key} className="ml-6 list-disc py-1 text-foreground/80">
            {line.slice(2)}
          </li>
        )
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key} className="ml-6 list-disc py-1 text-foreground/80">
          {line.slice(2)}
        </li>
      )
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^\d+\.\s\*\*(.+?)\*\*:?\s*(.*)$/)
      if (match) {
        elements.push(
          <li key={key} className="ml-6 list-decimal py-1 text-foreground/80">
            <strong className="font-semibold text-foreground">{match[1]}</strong>
            {match[2] ? `: ${match[2]}` : ""}
          </li>
        )
      } else {
        elements.push(
          <li key={key} className="ml-6 list-decimal py-1 text-foreground/80">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        )
      }
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key} className="my-3 font-semibold text-foreground">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.trim() === "") {
      elements.push(<div key={key} className="h-2" />)
    } else {
      const formatted = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      elements.push(
        <p
          key={key}
          className="my-2 leading-relaxed text-foreground/80"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      )
    }
  }

  return elements
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const otherArticles = blogArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(article)) }}
      />
      <Navbar />
      <main className="bg-background">
        <article className="py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="mb-8">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground"
                asChild
              >
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  Alle Artikel
                </Link>
              </Button>
            </div>

            {/* Category hero banner */}
            <div className={`-mx-4 mb-10 rounded-2xl bg-gradient-to-br ${CATEGORY_COLORS[article.category] || "from-primary/90 to-primary"} p-8 text-white sm:-mx-8 sm:p-10 lg:-mx-10 lg:p-12`}>
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = CATEGORY_ICONS[article.category] || FileText
                  return <Icon className="h-6 w-6 text-white/80" />
                })()}
                <span className="text-sm font-medium text-white/80">{article.category}</span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                <span className="text-balance">{article.title}</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                {article.excerpt}
              </p>
            </div>

            <header className="mb-10">
              <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-border/40 pt-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {article.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {article.authorRole}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {article.readTime} Lesezeit
                </div>
              </div>
            </header>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10">
              {renderContent(article.content)}
            </div>

            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:p-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                Kündigung erstellen?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Nutzen Sie unseren kostenlosen Generator für rechtssichere
                Kündigungsschreiben.
              </p>
              <Button className="mt-4 rounded-full px-6" asChild>
                <Link href="/#generator">Zum Generator</Link>
              </Button>
            </div>
          </div>
        </article>

        {otherArticles.length > 0 && (
          <section className="border-t border-border/40 py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="mb-8 font-display text-2xl font-bold text-foreground">
                Weitere Artikel
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {a.category}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                      {a.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                      {a.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {a.author}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}