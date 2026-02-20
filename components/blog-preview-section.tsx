"use client"

import Link from "next/link"
import {
  ArrowRight,
  Clock,
  User,
  Scale,
  ShieldCheck,
  Lightbulb,
  Home,
  Zap,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogArticles } from "@/lib/blog-articles"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"
import type { ElementType } from "react"

const CATEGORY_ICONS: Record<string, ElementType> = {
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

const FEATURED_COUNT = 3

function CategoryBadge({ category }: { category: string }) {
  const Icon = CATEGORY_ICONS[category] ?? FileText
  const gradient = CATEGORY_COLORS[category] ?? "from-primary to-primary/80"

  return (
    <div
      className={`flex items-center gap-2 bg-gradient-to-r ${gradient} px-4 py-3`}
    >
      <Icon className="h-4 w-4 text-white/80" />
      <span className="text-xs font-medium text-white/90">{category}</span>
    </div>
  )
}

export function BlogPreviewSection() {
  const { t } = useI18n()
  const featured = blogArticles.slice(0, FEATURED_COUNT)

  if (featured.length === 0) return null

  return (
    <section id="blog" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t.blog.sectionLabel}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">{t.blog.title}</span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.blog.subtitle}
            </p>
          </div>
        </AnimateIn>

        {/* Articles grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((article, i) => (
            <AnimateIn key={article.slug} delay={i * 100}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <CategoryBadge category={article.category} />

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                    {article.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-4 border-t border-border/40 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <time>{article.readTime}</time>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn delay={FEATURED_COUNT * 100}>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className="group gap-2 rounded-full px-6"
              asChild
            >
              <Link href="/blog">
                {t.blog.readAll}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
