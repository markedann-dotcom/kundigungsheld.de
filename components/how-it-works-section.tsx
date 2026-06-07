"use client"

import { useEffect, useState } from "react"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"
import Lottie from "lottie-react"

const LOTTIE_PATHS = [
  "/animations/step1.json",
  "/animations/step2.json",
  "/animations/step3.json",
]

const STEPS_META = [
  {
    number: "01",
    gradient: "from-blue-500 to-blue-600",
    glow: "shadow-blue-500/40",
    ring: "ring-blue-500/20",
    bg: "bg-blue-500/8",
    dot: "bg-blue-500",
    textAccent: "text-blue-500 dark:text-blue-400",
  },
  {
    number: "02",
    gradient: "from-violet-500 to-violet-600",
    glow: "shadow-violet-500/40",
    ring: "ring-violet-500/20",
    bg: "bg-violet-500/8",
    dot: "bg-violet-500",
    textAccent: "text-violet-500 dark:text-violet-400",
  },
  {
    number: "03",
    gradient: "from-emerald-500 to-emerald-600",
    glow: "shadow-emerald-500/40",
    ring: "ring-emerald-500/20",
    bg: "bg-emerald-500/8",
    dot: "bg-emerald-500",
    textAccent: "text-emerald-500 dark:text-emerald-400",
  },
]

function LottieAnim({ path }: { path: string }) {
  const [data, setData] = useState<object | null>(null)

  useEffect(() => {
    fetch(path)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [path])

  if (!data) return <div className="h-28 w-28" />

  return (
    <Lottie
      animationData={data}
      loop
      autoplay
      style={{ width: 112, height: 112 }}
    />
  )
}

export function HowItWorksSection() {
  const { t } = useI18n()

  const steps = [
    {
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      lottie: LOTTIE_PATHS[0],
      meta: STEPS_META[0],
    },
    {
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      lottie: LOTTIE_PATHS[1],
      meta: STEPS_META[1],
    },
    {
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      lottie: LOTTIE_PATHS[2],
      meta: STEPS_META[2],
    },
  ]

  return (
    <section
      id="so-gehts"
      className="relative overflow-hidden py-24 lg:py-36"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/6 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/6 blur-[120px]" />
        <div className="absolute right-1/6 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              {t.howItWorks.sectionLabel}
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t.howItWorks.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </AnimateIn>

        {/* Timeline */}
        <div className="mt-24 flex flex-col gap-12 lg:flex-row lg:gap-0">
          {steps.map((step, index) => (
            <AnimateIn key={step.meta.number} delay={index * 150} className="flex-1">
              <div className="relative flex flex-col items-center text-center lg:px-8">

                {/* Connecting line (desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-[56px] hidden h-px w-full bg-gradient-to-r from-border/60 via-border/20 to-transparent lg:block"
                    aria-hidden="true"
                  />
                )}

                {/* Number badge */}
                <div className="relative mb-6">
                  {/* Outer ring */}
                  <div
                    className={`absolute -inset-3 rounded-full ${step.meta.ring} ring-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  {/* Badge */}
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${step.meta.gradient} shadow-lg ${step.meta.glow}`}
                  >
                    <span className="font-mono text-lg font-black text-white">
                      {step.meta.number}
                    </span>
                  </div>
                </div>

                {/* Lottie animation card */}
                <div
                  className={`group relative mb-8 flex h-40 w-40 items-center justify-center rounded-3xl border border-border/40 ${step.meta.bg} shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl`}
                >
                  {/* Subtle inner glow on hover */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.meta.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                  />
                  <LottieAnim path={step.lottie} />
                </div>

                {/* Text */}
                <div className="max-w-xs">
                  <span className={`mb-2 block text-xs font-bold uppercase tracking-widest ${step.meta.textAccent}`}>
                    Schritt {step.meta.number}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="mt-8 flex flex-col items-center gap-1 lg:hidden" aria-hidden>
                    <div className={`h-8 w-px ${step.meta.dot} opacity-30`} />
                    <div
                      className={`h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 ${step.meta.textAccent} opacity-40 -mt-1`}
                    />
                  </div>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}