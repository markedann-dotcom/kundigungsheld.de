"use client"

import { useState, useEffect } from "react"
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
  const fullText = "Sehr geehrte Damen und Herren, hiermit kündige ich meinen Vertrag fristgerecht zum nächstmöglichen Termin..."

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

  return (
    <div style={{ width: "100%", height: "100%", background: "#0f0f0f", display: "flex", flexDirection: "column" }}>
      {/* Window chrome */}
      <div style={{ padding: "12px 16px", background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
          kuendigungsheld.de/generator
        </div>
      </div>

      <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 5, marginBottom: 2 }}>
          {["Anbieter", "Details", "Dokument"].map((s, i) => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? "#10b981" : "rgba(255,255,255,0.1)", transition: "background 0.5s" }} />
          ))}
        </div>

        {/* Step 1 — always shown */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "11px 13px" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>Anbieter</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#e0c3fc,#8ec5fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>T</div>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>Telekom Deutschland</span>
            <div style={{ marginLeft: "auto", color: "#10b981", fontSize: 11 }}>✓</div>
          </div>
        </div>

        {/* Step 2 */}
        {step >= 1 && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "11px 13px", animation: "kh-fadeIn 0.4s ease" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>Kündigungsgrund</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {["Vertragsende", "Preiserhöhung", "Umzug"].map((g, i) => (
                <div key={g} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, border: i === 0 ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)", color: i === 0 ? "#10b981" : "rgba(255,255,255,0.45)", background: i === 0 ? "rgba(16,185,129,0.1)" : "transparent" }}>{g}</div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — typing */}
        {step >= 2 && !showDoc && (
          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "11px 13px", flex: 1, animation: "kh-fadeIn 0.4s ease", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
              <span style={{ fontSize: 9, color: "#10b981", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>✦ KI schreibt...</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#10b981", animation: `kh-bounce 1s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, fontFamily: "Georgia, serif", margin: 0 }}>
              {typed}<span style={{ borderRight: "1.5px solid #10b981", marginLeft: 1, animation: "kh-blink 1s infinite" }}>&nbsp;</span>
            </p>
          </div>
        )}

        {/* Step 3 — doc ready */}
        {showDoc && (
          <div style={{ background: "#fff", borderRadius: 12, flex: 1, padding: "13px 15px", animation: "kh-scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div style={{ fontSize: 9, color: "#888", textAlign: "right", marginBottom: 7 }}>Berlin, 12.03.2025</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#111", marginBottom: 5 }}>Kündigung — Telekom</div>
            <div style={{ fontSize: 9.5, color: "#444", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
              Sehr geehrte Damen und Herren,<br />
              hiermit kündige ich meinen Vertrag fristgerecht zum nächstmöglichen Termin.
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", borderRadius: 6, padding: "5px 9px" }}>
              <span style={{ fontSize: 10 }}>✓</span>
              <span style={{ fontSize: 9, color: "#15803d", fontWeight: 600 }}>PDF bereit zum Download</span>
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
          <div key={i} className="h-7 w-7 rounded-full border-2 border-background overflow-hidden bg-muted">
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

/* ─── Main Export ─── */

export function HeroSection() {
  const { t } = useI18n()
  const countT = useCountUp(100000)
  const countC = useCountUp(300)

  return (
    <section className="relative overflow-hidden bg-background">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]" />

      {/* Orbs */}
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/8 dark:bg-emerald-400/8 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/4 -left-32 h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 pt-20 pb-20 lg:pt-28 lg:pb-28">

        {/* Top badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-1.5 backdrop-blur-sm shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              {t.hero.badge}
            </span>
            <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.03] tracking-tight text-foreground mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button
              size="lg"
              className="h-13 rounded-xl px-8 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
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
              className="h-13 rounded-xl px-8 text-base font-semibold border-border/60 hover:bg-muted/50 transition-all duration-300 w-full sm:w-auto"
              asChild
            >
              <a href="#howItWorks">
                <FileText className="mr-2 h-4 w-4" />
                {t.hero.howItWorksCTA}
              </a>
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SocialProof />
            <div className="hidden sm:block w-px h-7 bg-border/50" />
            <p className="text-sm text-muted-foreground">Keine Registrierung · DSGVO · SSL</p>
          </div>
        </div>

        {/* Browser mockup */}
        <div className="relative max-w-3xl mx-auto">

          {/* Glow */}
          <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-emerald-500/12 blur-[60px]" />

          {/* Frame */}
          <div
            className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl dark:shadow-black/60"
            style={{ animation: "kh-float 6s ease-in-out infinite" }}
          >
            {/* Chrome bar */}
            <div className="bg-muted/80 dark:bg-zinc-900 border-b border-border/40 px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
              <div className="flex gap-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <div className="flex-1 bg-background/60 dark:bg-zinc-800/60 rounded-md px-3 py-1 flex items-center gap-2">
                <Lock className="h-2.5 w-2.5 text-emerald-500" />
                <span className="text-xs text-muted-foreground font-mono">kuendigungsheld.de/generator</span>
              </div>
            </div>

            {/* Demo */}
            <div className="h-[360px] sm:h-[420px]">
              <TypingDemo />
            </div>
          </div>

          {/* Floating — Kündigungen */}
          <div
            className="absolute -left-4 sm:-left-14 top-12 hidden sm:flex items-center gap-3 rounded-2xl bg-card border border-border/50 px-4 py-3.5 shadow-xl backdrop-blur-md"
            style={{ animation: "kh-float 5s 0.5s ease-in-out infinite" }}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-foreground leading-none tabular-nums">
                {countT > 0 ? countT.toLocaleString("de-DE") : "—"}<span className="text-lg">+</span>
              </div>
              <div className="text-[10px] text-emerald-500 font-semibold mt-1">↑ Kündigungen</div>
            </div>
          </div>

          {/* Floating — Speed */}
          <div
            className="absolute -right-4 sm:-right-14 top-8 hidden sm:flex items-center gap-3 rounded-2xl bg-card border border-border/50 px-4 py-3.5 shadow-xl backdrop-blur-md"
            style={{ animation: "kh-float 4s 1s ease-in-out infinite" }}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-foreground leading-none">
                2 <span className="text-sm font-medium text-muted-foreground">Min.</span>
              </div>
              <div className="text-[10px] text-amber-500 font-semibold mt-1">⚡ Blitzschnell</div>
            </div>
          </div>

          {/* Floating — Rating */}
          <div
            className="absolute -left-4 sm:-left-12 -bottom-5 hidden sm:flex items-center gap-3 rounded-2xl bg-card border border-border/50 px-4 py-3 shadow-xl backdrop-blur-md"
            style={{ animation: "kh-float 5.5s 0.3s ease-in-out infinite" }}
          >
            <div className="text-xl font-black text-foreground">4.9</div>
            <div>
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, i) => <span key={i} className="text-amber-400 text-[10px]">{s}</span>)}
              </div>
              <div className="text-[10px] text-muted-foreground">1.200+ Bewertungen</div>
            </div>
          </div>

          {/* Floating — KI */}
          <div
            className="absolute -right-4 sm:-right-12 -bottom-3 hidden sm:flex items-center gap-3 rounded-2xl border border-violet-300/40 dark:border-violet-700/40 bg-card px-4 py-3 shadow-xl shadow-violet-500/10 backdrop-blur-md cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
            style={{ animation: "kh-float 4.5s 0.8s ease-in-out infinite" }}
            onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
          >
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-card" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                KI-Assistent
                <span className="text-[9px] bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded-full font-bold">NEU</span>
              </div>
              <div className="text-[10px] text-muted-foreground">Online · Bereit</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-24 max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 border border-border/40 rounded-2xl bg-muted/20 overflow-hidden">
          {[
            { val: countT.toLocaleString("de-DE") + "+", label: t.hero.stats?.terminations, color: "text-emerald-500" },
            { val: countC + "+", label: t.hero.stats?.companies, color: "text-blue-500" },
            { val: "4.9★", label: t.hero.stats?.rating, color: "text-amber-500" },
            { val: "100%", label: "Kostenlos", color: "text-violet-500" },
          ].map(({ val, label, color }, i) => (
            <div key={i} className={`text-center py-5 px-3 ${i > 0 ? "border-l border-border/40" : ""}`}>
              <div className={`text-2xl font-black ${color} leading-none tracking-tight`}>{val}</div>
              <div className="text-[11px] text-muted-foreground mt-2 font-medium leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Feature chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { icon: Shield, label: t.hero.features?.secure },
            { icon: Zap, label: t.hero.features?.fast },
            { icon: CheckCircle2, label: t.hero.features?.free },
            { icon: Lock, label: "SSL-verschlüsselt" },
          ].map(({ icon: Icon, label }) => (
            <div key={String(label)} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Icon className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes kh-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes kh-fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes kh-scaleIn { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
        @keyframes kh-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes kh-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  )
}