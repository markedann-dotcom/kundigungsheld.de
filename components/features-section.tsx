"use client"

import {
  Building2,
  Clock,
  Download,
  FileCheck,
  ListChecks,
  ShieldCheck,
} from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"

export function FeaturesSection() {
  const { t } = useI18n()

  const features = [
    {
      icon: Building2,
      title: t.features.feature1Title,
      description: t.features.feature1Desc,
      accent: "from-foreground/5 to-foreground/10",
      iconAccent: "text-foreground",
    },
    {
      icon: FileCheck,
      title: t.features.feature2Title,
      description: t.features.feature2Desc,
      accent: "from-foreground/5 to-foreground/10",
      iconAccent: "text-foreground",
    },
    {
      icon: Clock,
      title: t.features.feature3Title,
      description: t.features.feature3Desc,
      accent: "from-foreground/5 to-foreground/10",
      iconAccent: "text-foreground",
    },
    {
      icon: ShieldCheck,
      title: t.features.feature4Title,
      description: t.features.feature4Desc,
      accent: "from-foreground/5 to-foreground/10",
      iconAccent: "text-foreground",
    },
    {
      icon: ListChecks,
      title: t.features.feature5Title,
      description: t.features.feature5Desc,
      accent: "from-foreground/5 to-foreground/10",
      iconAccent: "text-foreground",
    },
    {
      icon: Download,
      title: t.features.feature6Title,
      description: t.features.feature6Desc,
      accent: "from-foreground/5 to-foreground/10",
      iconAccent: "text-foreground",
    },
  ]

  return (
    <section id="funktionen" className="relative overflow-hidden bg-card py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t.features.sectionLabel}
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">{t.features.title}</span>
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {t.features.subtitle}
            </p>
          </div>
        </AnimateIn>

        {/* Feature grid */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-black/[0.03] dark:hover:shadow-black/20">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Content */}
                <div className="relative">
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} ${feature.iconAccent} ring-1 ring-black/[0.04] transition-all duration-500 dark:ring-white/[0.08]`}
                  >
                    <feature.icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom stat bar */}
        <AnimateIn delay={700}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-8 rounded-2xl border border-border/40 bg-muted/30 px-8 py-6 sm:gap-12">
            {[
              { value: "150+", label: t.features.statCompanies },
              { value: "75k+", label: t.features.statTerminations },
              { value: "4.9★", label: t.features.statRating },
              { value: "100%", label: t.features.statFree },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold text-foreground sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
