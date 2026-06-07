"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"
import Lottie from "lottie-react"

// JSON лежат в /public/animations/ — грузятся локально, без внешних запросов
const LOTTIE_PATHS = [
  "/animations/step1.json", // eCommerce — поиск/выбор провайдера
  "/animations/step2.json", // Business WebSite — заполнение формы
  "/animations/step3.json", // Contact Us — отправка письма
]

const STEP_COLORS = [
  { bg: "bg-blue-500/10", dot: "bg-blue-500" },
  { bg: "bg-primary/10",  dot: "bg-primary"  },
  { bg: "bg-emerald-500/10", dot: "bg-emerald-500" },
]

function LottieCard({ path, fallback }: { path: string; fallback: string }) {
  const [data, setData] = useState<object | null>(null)

  useEffect(() => {
    fetch(path)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [path])

  if (!data) {
    return (
      <span className="font-mono text-5xl font-black text-foreground/10 select-none">
        {fallback}
      </span>
    )
  }

  return (
    <Lottie
      animationData={data}
      loop
      autoplay
      style={{ width: 88, height: 88 }}
    />
  )
}

export function HowItWorksSection() {
  const { t } = useI18n()

  const steps = [
    {
      number: "01",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      lottie: LOTTIE_PATHS[0],
      color: STEP_COLORS[0],
    },
    {
      number: "02",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      lottie: LOTTIE_PATHS[1],
      color: STEP_COLORS[1],
    },
    {
      number: "03",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      lottie: LOTTIE_PATHS[2],
      color: STEP_COLORS[2],
    },
  ]

  return (
    <section id="so-gehts" className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
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
        <ol className="mt-20 grid items-center gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const isCenter = index === 1

            return (
              <AnimateIn key={step.number} delay={index * 120}>
                <li className="group relative h-full">
                  <div
                    className={[
                      "relative flex h-full flex-col items-center rounded-2xl border p-8 text-center transition-all duration-500",
                      isCenter
                        ? "border-primary/30 bg-primary shadow-2xl shadow-primary/25 lg:scale-105 lg:py-12"
                        : "border-border/50 bg-card hover:-translate-y-1.5 hover:border-border hover:shadow-xl hover:shadow-black/[0.05] dark:hover:shadow-black/20",
                    ].join(" ")}
                  >
                    {/* Lottie */}
                    <div
                      className={[
                        "mb-6 flex h-24 w-24 items-center justify-center rounded-2xl overflow-hidden",
                        isCenter ? "bg-white/15" : step.color.bg,
                      ].join(" ")}
                    >
                      <LottieCard path={step.lottie} fallback={step.number} />
                    </div>

                    {/* Step label */}
                    <span
                      className={[
                        "mb-2 text-xs font-semibold uppercase tracking-widest",
                        isCenter ? "text-white/60" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      Schritt {step.number}
                    </span>

                    <h3
                      className={[
                        "font-display text-xl font-semibold",
                        isCenter ? "text-white" : "text-foreground",
                      ].join(" ")}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={[
                        "mt-2.5 text-[15px] leading-relaxed",
                        isCenter ? "text-white/75" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {step.description}
                    </p>

                    {/* Bottom accent line (side cards) */}
                    {!isCenter && (
                      <div
                        className={`absolute bottom-0 left-0 h-[2px] w-0 rounded-b-2xl ${step.color.dot} transition-all duration-500 group-hover:w-full`}
                      />
                    )}
                  </div>

                  {/* Arrow connector (desktop) */}
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
            )
          })}
        </ol>
      </div>
    </section>
  )
}