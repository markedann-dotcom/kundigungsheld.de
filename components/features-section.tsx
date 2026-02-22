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
      gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
      iconBg: "from-blue-500/15 to-blue-600/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      ringColor: "ring-blue-500/10",
      number: "01",
    },
    {
      icon: FileCheck,
      title: t.features.feature2Title,
      description: t.features.feature2Desc,
      gradient: "from-emerald-500/10 via-emerald-400/5 to-transparent",
      iconBg: "from-emerald-500/15 to-emerald-600/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      ringColor: "ring-emerald-500/10",
      number: "02",
    },
    {
      icon: Clock,
      title: t.features.feature3Title,
      description: t.features.feature3Desc,
      gradient: "from-violet-500/10 via-violet-400/5 to-transparent",
      iconBg: "from-violet-500/15 to-violet-600/10",
      iconColor: "text-violet-600 dark:text-violet-400",
      ringColor: "ring-violet-500/10",
      number: "03",
    },
    {
      icon: ShieldCheck,
      title: t.features.feature4Title,
      description: t.features.feature4Desc,
      gradient: "from-amber-500/10 via-amber-400/5 to-transparent",
      iconBg: "from-amber-500/15 to-amber-600/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      ringColor: "ring-amber-500/10",
      number: "04",
    },
    {
      icon: ListChecks,
      title: t.features.feature5Title,
      description: t.features.feature5Desc,
      gradient: "from-rose-500/10 via-rose-400/5 to-transparent",
      iconBg: "from-rose-500/15 to-rose-600/10",
      iconColor: "text-rose-600 dark:text-rose-400",
      ringColor: "ring-rose-500/10",
      number: "05",
    },
    {
      icon: Download,
      title: t.features.feature6Title,
      description: t.features.feature6Desc,
      gradient: "from-cyan-500/10 via-cyan-400/5 to-transparent",
      iconBg: "from-cyan-500/15 to-cyan-600/10",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      ringColor: "ring-cyan-500/10",
      number: "06",
    },
  ]

  const stats = [
    { value: "150+", label: t.features.statCompanies },
    { value: "75k+", label: t.features.statTerminations },
    { value: "4.9★", label: t.features.statRating },
    { value: "100%", label: t.features.statFree },
  ]

  return (
    <section
      id="funktionen"
      className="relative overflow-hidden bg-card py-24 lg:py-36"
    >
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 top-0 h-[500px] w-[500px] rounded-full bg-primary/4 blur-[120px]" />
        <div className="absolute -right-64 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/4 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[100px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
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
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-border hover:shadow-2xl hover:shadow-black/[0.06] dark:hover:shadow-black/25">
                {/* Per-card gradient wash on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Number watermark */}
                <span className="absolute right-5 top-4 font-mono text-5xl font-black leading-none text-foreground/[0.03] transition-colors duration-500 group-hover:text-foreground/[0.06] select-none">
                  {feature.number}
                </span>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.iconBg} ${feature.iconColor} ring-1 ${feature.ringColor} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <h3 className="font-display text-[17px] font-semibold leading-snug text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${feature.iconBg} transition-all duration-500 group-hover:w-full`}
                />
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Stats bar */}
        <AnimateIn delay={600}>
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-border/40">
            {/* Top gradient strip */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="flex flex-wrap items-stretch divide-x divide-border/30 bg-muted/20 backdrop-blur-sm">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="group flex flex-1 flex-col items-center justify-center gap-1 px-6 py-5 transition-colors duration-300 hover:bg-primary/5"
                >
                  <span className="text-2xl font-bold tabular-nums text-foreground transition-all duration-300 group-hover:scale-105 sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-center text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom gradient strip */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}