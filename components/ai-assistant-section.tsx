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
  {
    role: "user",
    text: "Wie lange ist die Kündigungsfrist bei einem Fitnessstudio?",
  },
  {
    role: "assistant",
    text: "Bei Fitnessstudios gilt in der Regel eine Kündigungsfrist von 3 Monaten zum Vertragsende. Wichtig: Die Kündigung muss schriftlich erfolgen! 📄",
  },
  {
    role: "user",
    text: "Geht auch eine außerordentliche Kündigung?",
  },
  {
    role: "assistant",
    text: "Ja! Eine Sonderkündigung ist möglich bei Umzug, dauerhafter Krankheit oder schwerwiegenden Vertragsänderungen. In diesen Fällen können Sie fristlos kündigen. 💪",
  },
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
    // Жёстко чёрный фон — не зависит от темы
    <section id="ki-assistent" className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: "#0a0a0a" }}>

      {/* Сетка */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Световые пятна */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
        <div className="absolute left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" style={{ backgroundColor: "rgba(255,255,255,0.02)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left ── */}
          <div>
            <AnimateIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <Sparkles className="h-3.5 w-3.5 text-white/60" />
                KI-Assistent
                <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/70" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  NEU
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={100}>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ihre Kündigungsfragen —{" "}
                <span className="relative">
                  <span className="relative z-10">sofort beantwortet</span>
                  <span className="absolute bottom-1 left-0 z-0 h-[6px] w-full rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
                </span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={150}>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Unser KI-Assistent kennt das deutsche Kündigungsrecht in- und auswendig. Stellen Sie Ihre Frage — und erhalten Sie in Sekunden eine klare, verständliche Antwort.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div className="mt-8 flex flex-col gap-4">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex items-center gap-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <f.icon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.65)" }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">{f.title}</span>
                      <span className="ml-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={openChat}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{ color: "#0a0a0a", boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Jetzt Frage stellen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Kostenlos · Keine Registrierung · 20 Fragen/Tag
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* ── Right: Chat Preview ── */}
          <AnimateIn delay={180}>
            <div className="relative">

              <div
                className="pointer-events-none absolute inset-x-6 -bottom-4 top-6 -z-10 rounded-3xl blur-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              />

              <div
                className="overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">KI-Assistent</div>
                      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Online · antwortet sofort
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 p-5">
                  {DEMO_MESSAGES.map((msg, i) => (
                    <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5"
                        style={
                          msg.role === "user"
                            ? { backgroundColor: "#ffffff", color: "#0a0a0a" }
                            : { backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }
                        }
                      >
                        {msg.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                      </div>
                      <div
                        className="max-w-[82%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed"
                        style={
                          msg.role === "user"
                            ? { backgroundColor: "#ffffff", color: "#0a0a0a", borderRadius: "16px 4px 16px 16px" }
                            : { backgroundColor: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px 16px 16px 16px" }
                        }
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing */}
                  <div className="flex gap-2.5">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full shrink-0"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div
                      className="flex items-center gap-1 rounded-2xl px-4 py-3"
                      style={{ backgroundColor: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <span className="h-2 w-2 rounded-full animate-bounce" style={{ backgroundColor: "rgba(255,255,255,0.4)", animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full animate-bounce" style={{ backgroundColor: "rgba(255,255,255,0.4)", animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full animate-bounce" style={{ backgroundColor: "rgba(255,255,255,0.4)", animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>

                {/* Quick questions */}
                <div className="px-5 pb-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Häufige Fragen
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={openChat}
                        className="rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-200 hover:text-white"
                        style={{
                          border: "1px solid rgba(255,255,255,0.12)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.55)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.12)"
                          ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)"
                          ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="px-5 pb-5 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <button
                    onClick={openChat}
                    className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200"
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.09)"
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.22)"
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)"
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"
                    }}
                  >
                    <span className="flex-1 text-left text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
                      Ihre Frage hier eingeben...
                    </span>
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white"
                      style={{ color: "#0a0a0a" }}
                    >
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Badge — kostenlos */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(20,20,20,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="text-xl font-black text-white">20</div>
                <div className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Fragen täglich<br />
                  <span className="font-semibold text-white">kostenlos</span>
                </div>
              </div>

              {/* Badge — rating */}
              <div
                className="absolute -right-4 -top-4 flex items-center gap-2 rounded-xl px-3.5 py-2.5 shadow-lg backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(20,20,20,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-lg">⭐</span>
                <div className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span className="font-bold text-white">4.9/5</span><br />
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