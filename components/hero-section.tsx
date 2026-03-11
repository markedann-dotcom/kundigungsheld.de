"use client"

import { ArrowRight, CheckCircle2, Shield, Zap, FileText, Clock, Lock, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"
import { useEffect, useRef, useState } from "react"
import { PdfPreview } from "@/components/pdf-preview"

/* ─── Animated Counter ─── */

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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

/* ─── Social Proof ─── */

const AVATAR_PHOTOS = [
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=25",
  "https://i.pravatar.cc/64?img=56",
]

if (typeof window !== "undefined") {
  AVATAR_PHOTOS.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {AVATAR_PHOTOS.map((src, i) => (
          <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden bg-muted">
            <img src={src} alt={`Nutzer ${i + 1}`} className="h-full w-full object-cover" width={32} height={32} loading="eager" />
          </div>
        ))}
      </div>
      <div className="text-left">
        <div className="flex items-center gap-0.5">
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

/* ─── AI Mobile Banner ─── */

function AiMobileBanner() {
  const openChat = () => window.dispatchEvent(new Event("open-ai-chat"))
  return (
    <button
      onClick={openChat}
      className="group lg:hidden w-full mt-5 flex items-center gap-3 rounded-2xl border border-violet-300/50 dark:border-violet-700/50 bg-card px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 hover:border-violet-400/70"
    >
      <div className="relative h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
        <Sparkles className="h-4 w-4 text-white" />
        <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-card" />
        </span>
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          KI-Assistent
          <span className="text-[10px] font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-1.5 py-0.5 rounded-full">NEU</span>
        </div>
        <div className="text-xs text-muted-foreground">Kündigungsfragen sofort beantwortet</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-violet-500 transition-colors" />
    </button>
  )
}

/* ─── Floating cards for right panel ─── */

function FloatingCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`absolute hidden lg:flex items-center gap-3 rounded-xl bg-card/95 border border-border/50 px-4 py-3 shadow-xl backdrop-blur-md hover:-translate-y-1 transition-transform duration-300 ${className}`}>
      {children}
    </div>
  )
}

/* ─── Main Component ─── */

export function HeroSection() {
  const { t } = useI18n()
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const { value: countTerminations, ref: refTerminations } = useCountUp(100000)
  const { value: countCompanies, ref: refCompanies } = useCountUp(300)

  return (
    <section className="relative overflow-hidden bg-background">

      {/* ── Background grid + orbs ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/6 dark:bg-emerald-400/5 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 h-[400px] w-[400px] rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[350px] w-[350px] rounded-full bg-violet-500/5 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">

        {/* ── Split layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col items-start">

            {/* Badge */}
            <AnimateIn instant>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 backdrop-blur-sm shadow-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                  {t.hero.badge}
                </span>
              </div>
            </AnimateIn>

            {/* Heading */}
            <AnimateIn instant>
              <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl mb-5">
                {t.hero.title}
              </h1>
            </AnimateIn>

            {/* Description */}
            <AnimateIn delay={200}>
              <p className="text-lg leading-relaxed text-muted-foreground font-normal max-w-xl mb-8">
                {t.hero.subtitle}
              </p>
            </AnimateIn>

            {/* Trust chips */}
            <AnimateIn delay={280}>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { icon: ShieldCheck, label: "DSGVO-konform", color: "text-emerald-600 dark:text-emerald-400" },
                  { icon: Lock, label: "SSL 256-Bit", color: "text-blue-600 dark:text-blue-400" },
                  { icon: BadgeCheck, label: "Rechtssicher", color: "text-violet-600 dark:text-violet-400" },
                  { icon: FileText, label: "Keine Registrierung", color: "text-amber-600 dark:text-amber-400" },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground/80">
                    <Icon className={`h-3.5 w-3.5 ${color}`} />
                    {label}
                  </div>
                ))}
              </div>
            </AnimateIn>

            {/* CTA buttons */}
            <AnimateIn delay={350}>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
                <Button
                  size="lg"
                  className="group h-13 rounded-full px-8 text-base font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto"
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
                  className="h-13 rounded-full px-8 text-base font-semibold border-border/60 hover:bg-muted/50 hover:border-border transition-all duration-300 w-full sm:w-auto"
                  asChild
                >
                  <a href="#howItWorks">
                    <FileText className="mr-2 h-4 w-4" />
                    {t.hero.howItWorksCTA}
                  </a>
                </Button>
              </div>
            </AnimateIn>

            {/* Social proof */}
            <AnimateIn delay={420}>
              <SocialProof />
            </AnimateIn>

            {/* AI banner — mobile only */}
            <AnimateIn delay={440}>
              <div className="w-full">
                <AiMobileBanner />
              </div>
            </AnimateIn>

            {/* Stats row */}
            <AnimateIn delay={480}>
              <div className="mt-10 pt-8 border-t border-border/40 grid grid-cols-3 gap-6 w-full max-w-sm">
                <div ref={refTerminations} className="text-center">
                  <div className="text-2xl font-black text-foreground tabular-nums">
                    {countTerminations.toLocaleString("de-DE")}+
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1 font-medium leading-tight">
                    {t.hero.stats?.terminations}
                  </div>
                </div>
                <div ref={refCompanies} className="text-center">
                  <div className="text-2xl font-black text-foreground tabular-nums">
                    {countCompanies}+
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1 font-medium leading-tight">
                    {t.hero.stats?.companies}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-foreground">4.9</div>
                  <div className="text-[11px] text-muted-foreground mt-1 font-medium leading-tight">
                    ★ {t.hero.stats?.rating}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* ── RIGHT: Visual mockup ── */}
          <AnimateIn delay={300}>
            <div className="relative lg:pl-8">

              {/* Glow behind document */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
                <div className="h-72 w-72 rounded-full bg-emerald-500/8 dark:bg-emerald-400/8 blur-[80px]" />
                <div className="absolute h-48 w-48 rounded-full bg-violet-500/8 blur-[60px] translate-x-16 translate-y-8" />
              </div>

              {/* Subtle frame / tilt */}
              <div className="relative mx-auto max-w-sm lg:max-w-none">

                {/* Document card — slight tilt for depth */}
                <div className="relative lg:rotate-1 lg:hover:rotate-0 transition-transform duration-500">
                  <div className="w-full aspect-[1/1.35] rounded-2xl shadow-2xl border border-border/50 overflow-hidden ring-1 ring-foreground/5 min-w-0">
                    <PdfPreview url="/preview/kuendigung-muster.pdf" />
                  </div>

                  {/* Gloss overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                </div>

                {/* ── Floating cards ── */}

                {/* PDF ready — top right */}
                <FloatingCard className="-right-6 -top-4 lg:-right-10 lg:top-6">
                  <div className="h-9 w-9 rounded-lg bg-foreground flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-background" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.hero.mockup?.pdfReady}</div>
                    <div className="text-xs text-muted-foreground">{t.hero.mockup?.instantDownload}</div>
                  </div>
                </FloatingCard>

                {/* SSL — top left */}
                <FloatingCard className="-left-6 top-16 lg:-left-10 lg:top-20">
                  <div className="h-9 w-9 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                    <Lock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">SSL-gesichert</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">256-Bit</div>
                  </div>
                </FloatingCard>

                {/* Validated — bottom left */}
                <FloatingCard className="-left-6 bottom-32 lg:-left-10 lg:bottom-40">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.hero.mockup?.validated}</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t.hero.mockup?.legal}</div>
                  </div>
                </FloatingCard>

                {/* Fristenrechner — bottom right */}
                <FloatingCard className="-right-6 bottom-20 lg:-right-10 lg:bottom-24">
                  <div className="h-9 w-9 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Fristenrechner</div>
                    <div className="text-xs text-muted-foreground">Frist berechnen</div>
                  </div>
                </FloatingCard>

                {/* KI-Assistent — mid right */}
                <button
                  onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
                  className="group absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:flex lg:-right-10 items-center gap-3 rounded-xl bg-card/95 border border-violet-300/50 dark:border-violet-700/50 px-4 py-3 shadow-xl backdrop-blur-md hover:-translate-y-[calc(50%+4px)] transition-transform duration-300"
                >
                  <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                    <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                      <span className={`absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 ${pulse ? "animate-ping" : ""}`} />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-card" />
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      KI-Assistent
                      <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-1.5 py-0.5 rounded-full">NEU</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Sofort beantwortet</div>
                  </div>
                </button>

              </div>
            </div>
          </AnimateIn>

        </div>

        {/* ── Feature badges ── */}
        <AnimateIn delay={600}>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-5 border-t border-border/40 pt-10 max-w-3xl mx-auto">
            {[
              { icon: Shield, label: t.hero.features?.secure },
              { icon: Zap, label: t.hero.features?.fast },
              { icon: CheckCircle2, label: t.hero.features?.free },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm font-medium group">
                <div className="h-9 w-9 rounded-xl bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <Icon className="h-4 w-4 text-background" />
                </div>
                <span className="text-foreground/75 group-hover:text-foreground transition-colors">{label}</span>
              </div>
            ))}
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}