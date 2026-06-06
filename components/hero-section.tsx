"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Shield, Zap, CheckCircle2, FileText, Lock, Sparkles, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/contexts/i18n-context"

/* ─── useCountUp ─── */
function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      let s: number
      const step = (ts: number) => {
        if (!s) s = ts
        const p = Math.min((ts - s) / duration, 1)
        setValue(Math.floor((1 - Math.pow(1 - p, 4)) * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 800)
    return () => clearTimeout(t)
  }, [target, duration])
  return value
}

/* ─── Animated Demo ─── */
function TypingDemo() {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState("")
  const [showDoc, setShowDoc] = useState(false)
  const fullText =
    "Sehr geehrte Damen und Herren, hiermit kündige ich meinen Vertrag fristgerecht zum nächstmöglichen Termin..."

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s < 2 ? s + 1 : s))
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (step === 2) {
      let i = 0
      const t = setInterval(() => {
        setTyped(fullText.slice(0, i))
        i++
        if (i > fullText.length) {
          clearInterval(t)
          setTimeout(() => setShowDoc(true), 300)
        }
      }, 28)
      return () => clearInterval(t)
    }
  }, [step])

  useEffect(() => {
    if (showDoc) {
      const t = setTimeout(() => {
        setStep(0)
        setTyped("")
        setShowDoc(false)
      }, 3200)
      return () => clearTimeout(t)
    }
  }, [showDoc])

  const steps = ["Anbieter", "Details", "Dokument"]

  return (
    <div className="flex h-full w-full flex-col bg-card">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ background: c }} className="h-2.5 w-2.5 rounded-full" />
          ))}
        </div>
        <div className="flex-1 text-center font-mono text-[11px] tracking-wide text-muted-foreground">
          kuendigungsheld.de/generator
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-5">
        {/* Progress bar */}
        <div className="mb-1 flex gap-3">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{s}</div>
              <div className="h-[3px] overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: i <= step ? "100%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Provider card */}
        <div className="rounded-xl border border-border bg-secondary/60 p-3.5">
          <div className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Anbieter
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              T
            </div>
            <span className="text-[13px] font-medium text-foreground">Telekom Deutschland</span>
            <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Reason card */}
        {step >= 1 && (
          <div className="kh-fadein rounded-xl border border-border bg-secondary/60 p-3.5">
            <div className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Kündigungsgrund
            </div>
            <div className="flex flex-wrap gap-2">
              {["Vertragsende", "Preiserhöhung", "Umzug"].map((g, i) => (
                <div
                  key={g}
                  className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    i === 0
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Typing card */}
        {step >= 2 && !showDoc && (
          <div className="kh-fadein flex-1 overflow-hidden rounded-xl border border-primary/20 bg-primary/[0.06] p-3.5">
            <div className="mb-2.5 flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">KI schreibt</span>
              <div className="ml-auto flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="kh-bounce h-1 w-1 rounded-full bg-primary"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            <p className="font-serif text-[11px] leading-[1.8] text-foreground/70">
              {typed}
              <span className="kh-blink ml-px border-r-2 border-primary">&nbsp;</span>
            </p>
          </div>
        )}

        {/* Doc ready */}
        {showDoc && (
          <div className="kh-scalein flex-1 rounded-xl bg-secondary p-5 shadow-inner">
            <div className="mb-3 text-right font-serif text-[10px] italic text-muted-foreground">Berlin, 12.03.2025</div>
            <div className="mb-2.5 font-serif text-[15px] font-semibold text-foreground">Kündigung — Telekom</div>
            <div className="mb-4 font-serif text-[11px] leading-[1.8] text-muted-foreground">
              Sehr geehrte Damen und Herren,
              <br />
              hiermit kündige ich meinen Vertrag fristgerecht zum nächstmöglichen Termin.
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-semibold tracking-wide text-primary">PDF bereit zum Download</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Social Proof ─── */
const AVATAR_PHOTOS = [
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=25",
  "https://i.pravatar.cc/64?img=56",
]

const PARTNERS = ["Telekom", "Vodafone", "O2", "1&1"]

function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {AVATAR_PHOTOS.map((src, i) => (
          <div key={i} className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-card bg-muted">
            <img
              src={src || "/placeholder.svg"}
              alt={`Nutzer ${i + 1}`}
              className="h-full w-full object-cover"
              width={32}
              height={32}
            />
          </div>
        ))}
      </div>
      <div className="leading-tight">
        <div className="flex gap-0.5 text-amber-500">
          {"★★★★★".split("").map((s, i) => (
            <span key={i} className="text-xs">
              {s}
            </span>
          ))}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">2.400+</span> diese Woche gekündigt
        </p>
      </div>
    </div>
  )
}

/* ─── Floating Card ─── */
function FloatCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl shadow-black/[0.08] backdrop-blur-xl sm:flex dark:shadow-black/50 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

/* ─── Main Export ─── */
export function HeroSection() {
  const { t } = useI18n()
  const countT = useCountUp(100000)
  const countC = useCountUp(300)

  const titleHead = (t.hero.title as string).split("—")[0].trim()
  const titleAccent = (t.hero.title as string).split("—")[1]?.trim() ?? "einfach & kostenlos"

  const steps = ["Anbieter wählen", "Daten eingeben", "PDF erhalten"]

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-20 lg:px-8 lg:pb-28">
        {/* ══════════ HERO CARD ══════════ */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10">
          {/* Background image */}
          <img
            src="/images/hero-sky.png"
            alt="Blauer Himmel mit Wolken"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/50 to-transparent" />

          <div className="relative flex min-h-[460px] flex-col justify-center px-6 py-12 sm:px-12 lg:min-h-[540px] lg:px-16">
            <div className="flex items-start gap-6 lg:gap-10">
              {/* Numbered steps */}
              <div className="hidden flex-col items-center pt-2 sm:flex">
                {steps.map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                        i === 0
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-foreground/20 bg-card/70 text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className="h-12 w-px bg-foreground/15 lg:h-16" />}
                  </div>
                ))}
              </div>

              {/* Headline block */}
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  {t.hero.badge}
                </div>

                <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                  {titleHead}
                  <span className="mt-1 block text-primary">{titleAccent}</span>
                </h1>

                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                  {t.hero.subtitle}
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <a href="#generator">
                      {t.hero.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-full border-foreground/15 bg-card/80 px-7 text-base font-semibold text-foreground backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-card"
                  >
                    <a href="#howItWorks">
                      <FileText className="mr-2 h-4 w-4" />
                      {t.hero.howItWorksCTA}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating "Mehr erfahren" card */}
          <div className="absolute right-4 bottom-4 hidden w-64 rounded-2xl border border-border bg-card/95 p-4 shadow-xl shadow-black/10 backdrop-blur-xl lg:block">
            <a
              href="#howItWorks"
              className="flex items-center justify-between text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Mehr erfahren
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
              <div className="flex -space-x-2">
                {AVATAR_PHOTOS.slice(0, 3).map((src, i) => (
                  <div key={i} className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-card">
                    <img src={src || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-foreground">Über 100.000 Nutzer</div>
                <div className="text-[11px] text-muted-foreground">Vertrauen auf uns</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ PARTNER / TRUST BAR ══════════ */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3 rounded-full border border-border bg-card py-1.5 pr-4 pl-1.5 shadow-sm">
            <SocialProof />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PARTNERS.map((p) => (
              <span key={p} className="text-lg font-bold tracking-tight text-muted-foreground/60">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════ DEMO + FLOATING CARDS ══════════ */}
        <div id="howItWorks" className="mt-24 text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl">
            So einfach geht Kündigen
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            In nur drei Schritten zum rechtssicheren Kündigungsschreiben — komplett kostenlos.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Bottom glow */}
          <div className="pointer-events-none absolute -bottom-16 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[70px]" />

          {/* Browser frame */}
          <div
            className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/[0.12] dark:shadow-black/60"
            style={{ animation: "kh-float 6s ease-in-out infinite" }}
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-3 border-b border-border bg-secondary px-4 py-3">
              <div className="flex gap-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} style={{ background: c }} className="h-2.5 w-2.5 rounded-full" />
                ))}
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-card px-3 py-1">
                <Lock className="h-3 w-3 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">kuendigungsheld.de/generator</span>
              </div>
            </div>

            {/* Demo content */}
            <div className="h-[360px] sm:h-[420px]">
              <TypingDemo />
            </div>
          </div>

          {/* ── Floating card: Kündigungen ── */}
          <FloatCard className="top-12 -left-4 sm:-left-14" style={{ animation: "kh-float 5s 0.5s ease-in-out infinite" }}>
            <div className="text-center">
              <div className="font-display text-2xl font-bold leading-none tabular-nums text-foreground">
                {countT > 0 ? countT.toLocaleString("de-DE") : "—"}
                <span className="text-lg">+</span>
              </div>
              <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Kündigungen</div>
            </div>
          </FloatCard>

          {/* ── Floating card: Speed ── */}
          <FloatCard className="top-8 -right-4 sm:-right-14" style={{ animation: "kh-float 4s 1s ease-in-out infinite" }}>
            <div className="text-center">
              <div className="font-display text-2xl font-bold leading-none text-foreground">
                2 <span className="text-sm font-normal text-muted-foreground">Min.</span>
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Zap className="h-3 w-3" />
                Blitzschnell
              </div>
            </div>
          </FloatCard>

          {/* ── Floating card: Rating ── */}
          <FloatCard
            className="-bottom-5 -left-4 sm:-left-12"
            style={{ animation: "kh-float 5.5s 0.3s ease-in-out infinite" }}
          >
            <div className="font-display text-2xl font-bold text-foreground">4.9</div>
            <div className="leading-tight">
              <div className="flex gap-0.5 text-amber-500">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">1.200+ Bewertungen</div>
            </div>
          </FloatCard>

          {/* ── Floating card: KI-Assistent ── */}
          <div
            className="absolute -right-4 -bottom-3 hidden cursor-pointer items-center gap-3 rounded-2xl border border-primary/20 bg-card/95 px-4 py-3 shadow-xl shadow-primary/10 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 sm:-right-12 sm:flex"
            style={{ animation: "kh-float 4.5s 0.8s ease-in-out infinite" }}
            onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                KI-Assistent
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                  Neu
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground">Online · Bereit</div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="mx-auto mt-24 grid max-w-2xl grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:grid-cols-4 sm:divide-y-0">
          {[
            {
              val: countT.toLocaleString("de-DE") + "+",
              label: t.hero.stats?.terminations,
            },
            { val: countC + "+", label: t.hero.stats?.companies },
            { val: "4.9★", label: t.hero.stats?.rating },
            { val: "100%", label: "Kostenlos" },
          ].map(({ val, label }) => (
            <div key={String(label)} className="px-3 py-6 text-center">
              <div className="font-display text-2xl font-bold leading-none tracking-tight text-foreground">{val}</div>
              <div className="mt-2 text-[11px] font-medium leading-tight text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Feature chips ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { icon: Shield, label: t.hero.features?.secure },
            { icon: Zap, label: t.hero.features?.fast },
            { icon: CheckCircle2, label: t.hero.features?.free },
            { icon: Lock, label: "SSL-verschlüsselt" },
          ].map(({ icon: Icon, label }) => (
            <div key={String(label)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes kh-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes kh-fadein  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes kh-scalein { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
        @keyframes kh-bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes kh-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        .kh-fadein  { animation: kh-fadein  0.4s ease both }
        .kh-scalein { animation: kh-scalein 0.5s cubic-bezier(0.34,1.56,0.64,1) both }
        .kh-bounce  { animation: kh-bounce  1s ease-in-out infinite }
        .kh-blink   { animation: kh-blink   1s ease-in-out infinite }
      `}</style>
    </section>
  )
}
