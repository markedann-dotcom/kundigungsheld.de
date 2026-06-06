"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Shield, Zap, CheckCircle2, FileText, Lock, Sparkles } from "lucide-react"
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
      setStep(s => (s < 2 ? s + 1 : s))
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
    <div className="w-full h-full bg-zinc-950 dark:bg-zinc-950 flex flex-col">
      {/* Window chrome */}
      <div className="px-4 py-3 bg-zinc-900 border-b border-white/[0.07] flex items-center gap-2">
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
            <div key={c} style={{ background: c }} className="w-2.5 h-2.5 rounded-full" />
          ))}
        </div>
        <div className="flex-1 text-center text-[11px] text-white/30 font-mono">
          kuendigungsheld.de/generator
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-1">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className="text-[9px] text-white/30 uppercase tracking-widest mb-1">{s}</div>
              <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700"
                  style={{ width: i <= step ? "100%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Provider card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3">
          <div className="text-[9px] text-white/35 uppercase tracking-widest mb-2">Anbieter</div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center text-sm font-black">
              T
            </div>
            <span className="text-white text-[13px] font-semibold">Telekom Deutschland</span>
            <span className="ml-auto text-emerald-400 text-[11px] font-bold">✓</span>
          </div>
        </div>

        {/* Reason card */}
        {step >= 1 && (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 kh-fadein">
            <div className="text-[9px] text-white/35 uppercase tracking-widest mb-2">Kündigungsgrund</div>
            <div className="flex gap-2 flex-wrap">
              {["Vertragsende", "Preiserhöhung", "Umzug"].map((g, i) => (
                <div
                  key={g}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                    i === 0
                      ? "border-emerald-500/60 text-emerald-400 bg-emerald-500/10"
                      : "border-white/10 text-white/40"
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
          <div className="bg-emerald-500/[0.06] border border-emerald-500/20 rounded-xl p-3 flex-1 kh-fadein overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">✦ KI schreibt...</span>
              <div className="ml-auto flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-emerald-400 kh-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-white/65 leading-[1.7] font-serif">
              {typed}
              <span className="border-r-2 border-emerald-400 ml-px kh-blink">&nbsp;</span>
            </p>
          </div>
        )}

        {/* Doc ready */}
        {showDoc && (
          <div className="bg-white rounded-xl flex-1 p-4 kh-scalein">
            <div className="text-[10px] text-gray-400 text-right mb-2">Berlin, 12.03.2025</div>
            <div className="text-[13px] font-black text-gray-900 mb-2">Kündigung — Telekom</div>
            <div className="text-[10px] text-gray-500 leading-[1.7] font-serif mb-3">
              Sehr geehrte Damen und Herren,<br />
              hiermit kündige ich meinen Vertrag fristgerecht zum nächstmöglichen Termin.
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2">
              <span className="text-emerald-600 text-sm">✓</span>
              <span className="text-[10px] text-emerald-700 font-bold">PDF bereit zum Download</span>
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

function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {AVATAR_PHOTOS.map((src, i) => (
          <div key={i} className="h-7 w-7 rounded-full border-2 border-background overflow-hidden bg-muted ring-0">
            <img src={src} alt={`Nutzer ${i + 1}`} className="h-full w-full object-cover" width={28} height={28} />
          </div>
        ))}
      </div>
      <div>
        <div className="flex gap-0.5">
          {"★★★★★".split("").map((s, i) => (
            <span key={i} className="text-amber-400 text-xs">{s}</span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-foreground font-semibold">2.400+</span> diese Woche gekündigt
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
      className={`
        absolute hidden sm:flex items-center gap-3
        rounded-2xl px-4 py-3.5
        bg-white/95 dark:bg-zinc-900/95
        border border-black/[0.06] dark:border-white/[0.1]
        shadow-xl shadow-black/10 dark:shadow-black/60
        backdrop-blur-xl
        ${className}
      `}
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

  return (
    <section className="relative overflow-hidden bg-white dark:bg-zinc-950">

      {/* ── Light mode background ── */}
      <div className="dark:hidden pointer-events-none absolute inset-0">
        {/* Soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-white to-white" />
        {/* Radial glow top */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-400/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-violet-400/8 blur-[100px]" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, #10b981 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Dark mode background ── */}
      <div className="hidden dark:block pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 -translate-x-1/4 h-[700px] w-[700px] rounded-full bg-emerald-500/[0.12] blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-violet-500/[0.10] blur-[100px]" />
        <div className="absolute top-1/4 -left-32 h-[350px] w-[350px] rounded-full bg-blue-500/[0.07] blur-[90px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 pt-20 pb-20 lg:pt-28 lg:pb-28">

        {/* ── Top badge ── */}
        <div className="flex justify-center mb-10">
          <div className="
            inline-flex items-center gap-2 rounded-full px-4 py-1.5
            bg-white/80 dark:bg-white/[0.05]
            border border-black/[0.07] dark:border-white/[0.1]
            backdrop-blur-sm shadow-sm dark:shadow-none
          ">
            {/* Live dot */}
            <span className="
              flex items-center gap-1.5
              bg-emerald-100 dark:bg-emerald-500/15
              text-emerald-700 dark:text-emerald-400
              text-[10px] font-bold uppercase tracking-wider
              px-2 py-0.5 rounded-full
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-white/40 tracking-wide uppercase">
              {t.hero.badge}
            </span>
            <ArrowRight className="h-3 w-3 text-zinc-400 dark:text-white/30" />
          </div>
        </div>

        {/* ── Headline ── */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h1 className="
            font-display text-4xl sm:text-6xl lg:text-[5.5rem]
            font-black leading-[1.03] tracking-tight
            text-zinc-900 dark:text-white
            mb-6
          ">
            {/* First line: plain */}
            <span className="block">{(t.hero.title as string).split("—")[0].trim()} —</span>
            {/* Second line: gradient accent */}
            <span className="
              block
              bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400
              dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300
              bg-clip-text text-transparent
            ">
              {(t.hero.title as string).split("—")[1]?.trim() ?? "einfach & kostenlos"}
            </span>
          </h1>

          <p className="text-xl leading-relaxed text-zinc-500 dark:text-white/50 max-w-2xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>

          {/* ── CTAs ── */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button
              size="lg"
              className="
                h-13 rounded-xl px-8 text-base font-bold
                bg-emerald-600 hover:bg-emerald-500
                dark:bg-emerald-500 dark:hover:bg-emerald-400
                text-white
                shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/40
                dark:shadow-emerald-500/25 dark:hover:shadow-emerald-400/40
                hover:-translate-y-0.5 transition-all duration-200
                w-full sm:w-auto
              "
              asChild
            >
              <a href="#generator">
                {t.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="
                h-13 rounded-xl px-8 text-base font-semibold
                border-zinc-200 dark:border-white/[0.12]
                text-zinc-700 dark:text-white/70
                hover:bg-zinc-50 dark:hover:bg-white/[0.06]
                hover:border-zinc-300 dark:hover:border-white/20
                transition-all duration-200
                w-full sm:w-auto
              "
              asChild
            >
              <a href="#howItWorks">
                <FileText className="mr-2 h-4 w-4" />
                {t.hero.howItWorksCTA}
              </a>
            </Button>
          </div>

          {/* ── Social proof ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SocialProof />
            <div className="hidden sm:block w-px h-7 bg-zinc-200 dark:bg-white/10" />
            <div className="flex items-center gap-4">
              {["Keine Registrierung", "DSGVO", "SSL"].map(item => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-white/40 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Browser mockup ── */}
        <div className="relative max-w-3xl mx-auto">

          {/* Bottom glow */}
          <div className="
            pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2
            h-48 w-96 rounded-full
            bg-emerald-500/10 dark:bg-emerald-500/15
            blur-[70px]
          " />

          {/* Browser frame */}
          <div
            className="
              relative rounded-2xl overflow-hidden
              border border-black/[0.08] dark:border-white/[0.08]
              shadow-2xl shadow-black/15 dark:shadow-black/70
            "
            style={{ animation: "kh-float 6s ease-in-out infinite" }}
          >
            {/* Chrome bar */}
            <div className="
              bg-zinc-100 dark:bg-zinc-900
              border-b border-black/[0.06] dark:border-white/[0.07]
              px-4 py-3 flex items-center gap-3
            ">
              <div className="flex gap-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} style={{ background: c }} className="w-2.5 h-2.5 rounded-full" />
                ))}
              </div>
              <div className="
                flex-1 rounded-md px-3 py-1 flex items-center gap-2
                bg-white dark:bg-zinc-800/60
                border border-black/[0.06] dark:border-white/[0.06]
              ">
                <Lock className="h-3 w-3 text-emerald-500" />
                <span className="text-xs text-zinc-400 dark:text-white/35 font-mono">kuendigungsheld.de/generator</span>
              </div>
            </div>

            {/* Demo content */}
            <div className="h-[360px] sm:h-[420px]">
              <TypingDemo />
            </div>
          </div>

          {/* ── Floating card: Kündigungen ── */}
          <FloatCard
            className="-left-4 sm:-left-14 top-12"
            style={{ animation: "kh-float 5s 0.5s ease-in-out infinite" }}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-zinc-900 dark:text-white leading-none tabular-nums">
                {countT > 0 ? countT.toLocaleString("de-DE") : "—"}<span className="text-lg">+</span>
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">↑ Kündigungen</div>
            </div>
          </FloatCard>

          {/* ── Floating card: Speed ── */}
          <FloatCard
            className="-right-4 sm:-right-14 top-8"
            style={{ animation: "kh-float 4s 1s ease-in-out infinite" }}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-zinc-900 dark:text-white leading-none">
                2 <span className="text-sm font-medium text-zinc-400 dark:text-white/40">Min.</span>
              </div>
              <div className="text-[10px] text-amber-500 dark:text-amber-400 font-bold mt-1">⚡ Blitzschnell</div>
            </div>
          </FloatCard>

          {/* ── Floating card: Rating ── */}
          <FloatCard
            className="-left-4 sm:-left-12 -bottom-5"
            style={{ animation: "kh-float 5.5s 0.3s ease-in-out infinite" }}
          >
            <div className="text-2xl font-black text-zinc-900 dark:text-white">4.9</div>
            <div>
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-amber-400 text-[11px]">{s}</span>
                ))}
              </div>
              <div className="text-[10px] text-zinc-400 dark:text-white/40">1.200+ Bewertungen</div>
            </div>
          </FloatCard>

          {/* ── Floating card: KI-Assistent ── */}
          <div
            className="
              absolute -right-4 sm:-right-12 -bottom-3
              hidden sm:flex items-center gap-3
              rounded-2xl px-4 py-3
              bg-white/95 dark:bg-zinc-900/95
              border border-violet-200/60 dark:border-violet-500/25
              shadow-xl shadow-violet-500/10 dark:shadow-violet-500/20
              backdrop-blur-xl
              cursor-pointer
              hover:-translate-y-0.5 transition-transform duration-300
            "
            style={{ animation: "kh-float 4.5s 0.8s ease-in-out infinite" }}
            onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
          >
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
              <Sparkles className="h-4 w-4 text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                KI-Assistent
                <span className="
                  text-[9px] px-1.5 py-0.5 rounded-full font-bold
                  bg-violet-100 text-violet-700
                  dark:bg-violet-900/40 dark:text-violet-300
                ">NEU</span>
              </div>
              <div className="text-[10px] text-zinc-400 dark:text-white/40">Online · Bereit</div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="
          mt-24 max-w-2xl mx-auto
          grid grid-cols-2 sm:grid-cols-4
          rounded-2xl overflow-hidden
          border border-black/[0.07] dark:border-white/[0.07]
          bg-zinc-50/80 dark:bg-white/[0.03]
          divide-x divide-black/[0.07] dark:divide-white/[0.07]
        ">
          {[
            { val: countT.toLocaleString("de-DE") + "+", label: t.hero.stats?.terminations, color: "text-emerald-600 dark:text-emerald-400" },
            { val: countC + "+",                          label: t.hero.stats?.companies,    color: "text-blue-600 dark:text-blue-400" },
            { val: "4.9★",                               label: t.hero.stats?.rating,       color: "text-amber-500 dark:text-amber-400" },
            { val: "100%",                                label: "Kostenlos",                color: "text-violet-600 dark:text-violet-400" },
          ].map(({ val, label, color }) => (
            <div key={String(label)} className="text-center py-5 px-3">
              <div className={`text-2xl font-black ${color} leading-none tracking-tight`}>{val}</div>
              <div className="text-[11px] text-zinc-500 dark:text-white/40 mt-2 font-medium leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Feature chips ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { icon: Shield,        label: t.hero.features?.secure },
            { icon: Zap,           label: t.hero.features?.fast },
            { icon: CheckCircle2,  label: t.hero.features?.free },
            { icon: Lock,          label: "SSL-verschlüsselt" },
          ].map(({ icon: Icon, label }) => (
            <div key={String(label)} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-white/40 font-medium">
              <Icon className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
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
