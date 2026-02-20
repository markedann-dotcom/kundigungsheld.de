"use client"

import { Building2, FileEdit, Download } from "lucide-react"
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
    },
    {
      number: "02",
      icon: FileEdit,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      number: "03",
      icon: Download,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ]

  return (
    <section id="so-gehts" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t.howItWorks.sectionLabel}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">{t.howItWorks.title}</span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </AnimateIn>

        <ol className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <AnimateIn key={step.number} delay={index * 150}>
              <li className="relative">
                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-16 hidden h-0.5 w-full bg-border/30 lg:block"
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Icon with step number */}
                  <div className="relative mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-elegant">
                      <step.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground text-xs font-bold border border-border"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            </AnimateIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
