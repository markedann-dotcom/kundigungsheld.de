"use client"

import { Building2, FileEdit, Download, ArrowRight } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"

export function HowItWorksSection() {
  const { t } = useI18n()

  const steps = [
    {
      number: "01",
      icon: Building2,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      accent: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      glow: "shadow-blue-500/20",
      dotColor: "bg-blue-500",
    },
    {
      number: "02",
      icon: FileEdit,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      accent: "from-violet-500/20 to-violet-600/10",
      iconColor: "text-violet-600 dark:text-violet-400",
      glow: "shadow-violet-500/20",
      dotColor: "bg-violet-500",
    },
    {
      number: "03",
      icon: Download,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      accent: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      glow: "shadow-emerald-500/20",
      dotColor: "bg-emerald-500",
    },
  ]

  return (
    <section id="so-gehts" className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Subtle ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/4 blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 translate-x-1/2 rounded-full bg-primary/4 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              {t.howItWorks.sectionLabel}
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">{t.howItWorks.title}</span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </AnimateIn>

        {/* Steps */}
        <ol className="mt-20 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <AnimateIn key={step.number} delay={index * 120}>
              <li className="group relative h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-border hover:shadow-xl hover:shadow-black/[0.05] dark:hover:shadow-black/20">
                  
                  {/* Top row: icon + number */}
                  <div className="mb-6 flex items-start justify-between">
                    {/* Icon */}
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} shadow-lg ${step.glow} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <step.icon className={`h-6 w-6 ${step.iconColor}`} strokeWidth={1.75} />
                    </div>

                    {/* Step number */}
                    <span className="font-mono text-4xl font-black leading-none text-foreground/8 transition-colors duration-300 group-hover:text-foreground/[0.12] select-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground text-[15px]">
                    {step.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] w-0 rounded-b-2xl ${step.dotColor} transition-all duration-500 group-hover:w-full`}
                  />
                </div>

                {/* Arrow connector between cards (desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute -right-[19px] top-1/2 z-10 hidden -translate-y-1/2 lg:flex"
                    aria-hidden="true"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                  </div>
                )}
              </li>
            </AnimateIn>
          ))}
        </ol>
      </div>
    </section>
  )
}