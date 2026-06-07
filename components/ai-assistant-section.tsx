"use client"

import { Sparkles, MessageCircle, ArrowRight, Bot, User, Zap, Clock, Shield } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"

const QUICK_QUESTIONS = [
  "Wie lange ist die Kündigungsfrist?",
  "Was ist eine Sonderkündigung?",
  "Muss ich schriftlich kündigen?",
  "Was tun wenn keine Bestätigung kommt?",
]

const DEMO_MESSAGES = [
  { role: "user", text: "Wie lange ist die Kündigungsfrist bei einem Fitnessstudio?" },
  { role: "assistant", text: "Bei Fitnessstudios gilt in der Regel eine Kündigungsfrist von 3 Monaten zum Vertragsende. Wichtig: Die Kündigung muss schriftlich erfolgen! 📄" },
  { role: "user", text: "Geht auch eine außerordentliche Kündigung?" },
  { role: "assistant", text: "Ja! Eine Sonderkündigung ist möglich bei Umzug, dauerhafter Krankheit oder schwerwiegenden Vertragsänderungen. In diesen Fällen können Sie fristlos kündigen. 💪" },
]

const FEATURES = [
  { icon: Zap,    title: "Sofortantworten", desc: "Keine Wartezeit, keine Hotline" },
  { icon: Shield, title: "Rechtssicher",    desc: "Basiert auf deutschem Recht" },
  { icon: Clock,  title: "24/7 verfügbar",  desc: "Immer erreichbar, kostenlos" },
]

export function AiAssistantSection() {
  const openChat = () => {
    window.dispatchEvent(new Event("open-ai-chat"))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section id="ki-assistent" className="relative overflow-hidden py-24 lg:py-32 bg-[#080808]">

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 top-1/4 h-[500px] w-[500px] rounded-full blur-[140px] bg-blue-600/8" />
        <div className="absolute -right-64 bottom-1/4 h-[500px] w-[500px] rounded-full blur-[140px] bg-violet-600/8" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── Left ── */}
          <div className="flex flex-col">
            <AnimateIn>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 bg-white/[0.04]">
                <Sparkles className="h-3 w-3" />
                KI-Assistent
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] tracking-[0.15em] text-white/60">
                  NEU
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={100}>
              <h2 className="mt-7 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
                Ihre Fragen —{" "}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    sofort beantwortet
                  </span>
                </span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={150}>
              <p className="mt-6 text-base leading-relaxed text-white/40 max-w-md">
                Unser KI-Assistent kennt das deutsche Kündigungsrecht in- und auswendig. Stellen Sie Ihre Frage — klare Antwort in Sekunden.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div className="mt-9 space-y-3">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.05]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <f.icon className="h-3.5 w-3.5 text-white/50" strokeWidth={1.75} />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-white/80">{f.title}</span>
                      <span className="text-xs text-white/30">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={openChat}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.12)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Jetzt Frage stellen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-xs text-white/25">
                  Kostenlos · Keine Registrierung · 20 Fragen/Tag
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* ── Right: Chat Preview ── */}
          <AnimateIn delay={180}>
            <div className="relative mx-auto max-w-md w-full mt-8 lg:mt-0">

              {/* Glow behind card */}
              <div className="pointer-events-none absolute inset-x-8 -bottom-6 top-8 -z-10 rounded-3xl blur-3xl bg-white/5" />

              {/* Card */}
              <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.04] shadow-[0_32px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                      <Sparkles className="h-4 w-4 text-white/80" />
                      <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#080808]" />
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">KI-Assistent</div>
                      <div className="text-[11px] text-white/30">antwortet sofort</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
                    <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
                    <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-3.5 p-5">
                  {DEMO_MESSAGES.map((msg, i) => (
                    <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                        msg.role === "user"
                          ? "bg-white text-black"
                          : "bg-white/8 border border-white/10 text-white/70"
                      }`}>
                        {msg.role === "user"
                          ? <User className="h-3.5 w-3.5" />
                          : <Bot className="h-3.5 w-3.5" />
                        }
                      </div>
                      <div className={`max-w-[84%] px-4 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-white text-black rounded-[16px_4px_16px_16px] shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
                          : "bg-white/[0.06] text-white/70 border border-white/[0.07] rounded-[4px_16px_16px_16px]"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing */}
                  <div className="flex gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/8 border border-white/10">
                      <Bot className="h-3.5 w-3.5 text-white/60" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl px-4 py-3 bg-white/[0.06] border border-white/[0.07]">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="h-1.5 w-1.5 rounded-full animate-bounce bg-white/30"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick questions */}
                <div className="px-5 pb-4 pt-3 border-t border-white/[0.07]">
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">Häufige Fragen</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={openChat}
                        className="rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-all duration-200 border border-white/[0.08] bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:border-white/15 hover:text-white/70"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="px-5 pb-5 pt-3 border-t border-white/[0.07]">
                  <button
                    onClick={openChat}
                    className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/15"
                  >
                    <span className="flex-1 text-left text-sm text-white/25 group-hover:text-white/40 transition-colors">
                      Ihre Frage hier eingeben...
                    </span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white text-black shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 left-4 sm:-left-5 flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/[0.09] bg-[#0e0e0e]/95 shadow-xl backdrop-blur-sm">
                <span className="text-2xl font-black text-white leading-none">20</span>
                <div className="text-xs leading-snug text-white/35">
                  Fragen täglich<br />
                  <span className="font-semibold text-white/70">kostenlos</span>
                </div>
              </div>

              <div className="absolute -top-4 right-4 sm:-right-5 flex items-center gap-2.5 rounded-2xl px-4 py-3 border border-white/[0.09] bg-[#0e0e0e]/95 shadow-xl backdrop-blur-sm">
                <span className="text-lg">⭐</span>
                <div className="text-xs leading-snug text-white/35">
                  <span className="font-bold text-white/80">4.9/5</span><br />
                  Nutzerbewertung
                </div>
              </div>

            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}