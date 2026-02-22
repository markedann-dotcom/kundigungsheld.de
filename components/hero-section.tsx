"use client"

import { ArrowRight, CheckCircle2, Shield, Zap, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"
import { useEffect, useRef, useState } from "react"
import { PdfPreview } from "@/components/pdf-preview"

/* ─── Animated Counter ─── */

function useCountUp(target: number, duration = 1800, startOnMount = false) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (startOnMount) { setStarted(true); return }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [startOnMount])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { value, ref }
}

function AnimatedStat({
  value,
  suffix = "",
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  const { value: count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="group">
      <div className="text-4xl font-black text-foreground group-hover:scale-105 transition-transform duration-300 tabular-nums">
        {count.toLocaleString("de-DE")}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1.5 font-medium">{label}</div>
    </div>
  )
}

/* ─── Social Proof Avatars ─── */

const AVATAR_PHOTOS = [
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=25",
  "https://i.pravatar.cc/64?img=56",
]

function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {AVATAR_PHOTOS.map((src, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full border-2 border-background overflow-hidden bg-muted"
          >
            <img
              src={src}
              alt={`Nutzer ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="text-left">
        <div className="flex items-center gap-1">
          {"★★★★★".split("").map((s, i) => (
            <span key={i} className="text-amber-400 text-xs">{s}</span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          <span className="text-foreground font-semibold">2.400+</span> diese Woche gekündigt
        </p>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-background">

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted/30" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
        <div className="mx-auto max-w-5xl text-center">

          {/* Badge */}
          <AnimateIn delay={100}>
            <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 backdrop-blur-sm shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                {t.hero.badge}
              </span>
            </div>
          </AnimateIn>

          {/* Heading */}
          <AnimateIn delay={200}>
            <h1 className="font-display text-6xl font-black leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-8xl mb-6">
              {t.hero.title}
            </h1>
          </AnimateIn>

          {/* Description */}
          <AnimateIn delay={300}>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground font-normal">
              {t.hero.subtitle}
            </p>
          </AnimateIn>

          {/* CTA Buttons */}
          <AnimateIn delay={400}>
            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group h-14 rounded-full px-10 text-base font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href="#generator">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full px-10 text-base font-semibold border-border/60 hover:bg-muted/50 hover:border-border transition-all duration-300"
                asChild
              >
                <a href="#howItWorks">
                  <FileText className="mr-2 h-4 w-4" />
                  {t.hero.howItWorksCTA}
                </a>
              </Button>
            </div>
          </AnimateIn>

          {/* Social Proof */}
          <AnimateIn delay={440}>
            <div className="mt-6 flex justify-center">
              <SocialProof />
            </div>
          </AnimateIn>

          {/* Animated Stats */}
          <AnimateIn delay={450}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-6 text-center">
              <AnimatedStat value={100000} suffix="+" label={t.hero.stats?.terminations} />
              <AnimatedStat value={300} suffix="+" label={t.hero.stats?.companies} />
              <div className="group">
                <div className="text-4xl font-black text-foreground group-hover:scale-105 transition-transform duration-300">
                  4.9
                </div>
                <div className="text-sm text-muted-foreground mt-1.5 font-medium">
                  ★ {t.hero.stats?.rating}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Mockup */}
        <AnimateIn delay={500}>
          <div className="relative mx-auto mt-24 max-w-4xl">

            {/* Document Card — реальный PDF */}
            <div className="relative mx-auto w-full max-w-2xl aspect-[1/1.35] rounded-2xl shadow-xl border border-border/50 overflow-hidden">
              <PdfPreview url="/preview/kuendigung-muster.pdf" />
            </div>

            {/* Floating Card — PDF */}
            <div className="absolute -right-12 top-20 hidden lg:block hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 rounded-xl bg-card border border-border/50 px-4 py-3 shadow-lg backdrop-blur-sm">
                <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center">
                  <FileText className="h-5 w-5 text-background" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.hero.mockup?.pdfReady}</div>
                  <div className="text-xs text-muted-foreground">{t.hero.mockup?.instantDownload}</div>
                </div>
              </div>
            </div>

            {/* Floating Card — Validated */}
            <div className="absolute -left-12 bottom-44 hidden lg:block hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 rounded-xl bg-card border border-border/50 px-4 py-3 shadow-lg backdrop-blur-sm">
                <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-background" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.hero.mockup?.validated}</div>
                  <div className="text-xs text-muted-foreground">{t.hero.mockup?.legal}</div>
                </div>
              </div>
            </div>

            {/* Floating Card — Fristenrechner */}
            <div className="absolute -right-12 bottom-32 hidden lg:block hover:-translate-y-1 transition-transform duration-300">
              <a
                href="#fristenrechner"
                className="flex items-center gap-3 rounded-xl bg-card border border-amber-400/40 px-4 py-3 shadow-lg backdrop-blur-sm hover:border-amber-400/70 transition-colors group"
              >
                <div className="h-10 w-10 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Fristenrechner</div>
                  <div className="text-xs text-muted-foreground">Kündigungsfrist berechnen</div>
                </div>
              </a>
            </div>

          </div>
        </AnimateIn>

        {/* Feature Badges */}
        <AnimateIn delay={600}>
          <div className="mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-border/40 pt-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3.5 text-base font-medium group">
              <div className="h-11 w-11 rounded-xl bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Shield className="h-5 w-5 text-background" />
              </div>
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">{t.hero.features?.secure}</span>
            </div>
            <div className="flex items-center gap-3.5 text-base font-medium group">
              <div className="h-11 w-11 rounded-xl bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Zap className="h-5 w-5 text-background" />
              </div>
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">{t.hero.features?.fast}</span>
            </div>
            <div className="flex items-center gap-3.5 text-base font-medium group">
              <div className="h-11 w-11 rounded-xl bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="h-5 w-5 text-background" />
              </div>
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">{t.hero.features?.free}</span>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}