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

// Rich gradient + noise covers per category
const CATEGORY_COVERS: Record<
  string,
  { gradient: string; noise: string; iconBg: string; badge: string }
> = {
  Vertragsrecht: {
    gradient: "from-teal-900 via-teal-700 to-cyan-600",
    noise: "bg-teal-400/10",
    iconBg: "bg-teal-500/20 text-teal-200",
    badge: "bg-teal-500/20 text-teal-200 border-teal-400/20",
  },
  Verbraucherrecht: {
    gradient: "from-blue-900 via-blue-700 to-sky-600",
    noise: "bg-blue-400/10",
    iconBg: "bg-blue-500/20 text-blue-200",
    badge: "bg-blue-500/20 text-blue-200 border-blue-400/20",
  },
  Praxistipps: {
    gradient: "from-amber-900 via-orange-700 to-amber-500",
    noise: "bg-amber-400/10",
    iconBg: "bg-amber-500/20 text-amber-200",
    badge: "bg-amber-500/20 text-amber-200 border-amber-400/20",
  },
  Mietrecht: {
    gradient: "from-emerald-900 via-emerald-700 to-green-600",
    noise: "bg-emerald-400/10",
    iconBg: "bg-emerald-500/20 text-emerald-200",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/20",
  },
  Versicherungsrecht: {
    gradient: "from-indigo-900 via-indigo-700 to-violet-600",
    noise: "bg-indigo-400/10",
    iconBg: "bg-indigo-500/20 text-indigo-200",
    badge: "bg-indigo-500/20 text-indigo-200 border-indigo-400/20",
  },
  Energierecht: {
    gradient: "from-rose-900 via-red-700 to-orange-600",
    noise: "bg-rose-400/10",
    iconBg: "bg-rose-500/20 text-rose-200",
    badge: "bg-rose-500/20 text-rose-200 border-rose-400/20",
  },
}

const FALLBACK_COVER = {
  gradient: "from-slate-800 via-slate-700 to-slate-600",
  noise: "bg-slate-400/10",
  iconBg: "bg-slate-500/20 text-slate-200",
  badge: "bg-slate-500/20 text-slate-200 border-slate-400/20",
}

const FEATURED_COUNT = 3

function ArticleCover({ category }: { category: string }) {
  const Icon = CATEGORY_ICONS[category] ?? FileText
  const cover = CATEGORY_COVERS[category] ?? FALLBACK_COVER

  return (
    <div
      className={`relative h-44 w-full overflow-hidden bg-gradient-to-br ${cover.gradient}`}
    >
      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />
      <div className="absolute right-8 bottom-6 h-20 w-20 rounded-full bg-white/[0.04]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Noise overlay */}
      <div className={`absolute inset-0 ${cover.noise} mix-blend-overlay`} />

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-sm ${cover.iconBg} ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110`}
        >
          <Icon className="h-7 w-7" strokeWidth={1.5} />
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute bottom-4 left-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm ${cover.badge}`}
        >
          <Icon className="h-3 w-3" />
          {category}
        </span>
      </div>
    </div>
  )
}

export function BlogPreviewSection() {
  const { t } = useI18n()
  const featured = blogArticles.slice(0, FEATURED_COUNT)

  if (featured.length === 0) return null

  return (
    <section id="blog" className="relative overflow-hidden bg-card py-24 lg:py-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              {t.blog.sectionLabel}
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">{t.blog.title}</span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.blog.subtitle}
            </p>
          </div>
        </AnimateIn>

        {/* Articles grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((article, i) => (
            <AnimateIn key={article.slug} delay={i * 100}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-background transition-all duration-500 hover:-translate-y-1.5 hover:border-border hover:shadow-2xl hover:shadow-black/[0.06] dark:hover:shadow-black/25"
              >
                {/* Cover image area */}
                <ArticleCover category={article.category} />

                {/* Card body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                    {article.title}
                  </h3>

                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>

                  {/* Meta + arrow */}
                  <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5 shrink-0" />
                        <span>{article.author}</span>
                      </div>
                      <div className="h-3 w-px bg-border" />
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <time>{article.readTime}</time>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn delay={FEATURED_COUNT * 100}>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="group gap-2 rounded-full px-7 py-2.5"
              asChild
            >
              <Link href="/blog">
                {t.blog.readAll}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}