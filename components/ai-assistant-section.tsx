"use client"

import { Sparkles, MessageCircle, ArrowRight, Bot, User, Zap, Clock, Shield } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"

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
    text: "Bei Fitnessstudios gilt in der Regel eine Kündigungsfrist von 3 Monaten zum Vertragsende. Bei einer Laufzeit von 12 Monaten können Sie also frühestens nach 9 Monaten kündigen. Wichtig: Die Kündigung muss schriftlich erfolgen! 📄",
  },
  {
    role: "user",
    text: "Geht auch eine außerordentliche Kündigung?",
  },
  {
    role: "assistant",
    text: "Ja! Eine Sonderkündigung ist möglich bei: Umzug in eine andere Stadt (über 25 km), dauerhafter Krankheit oder Verletzung (mit Attest), oder schwerwiegenden Änderungen der Vertragsbedingungen durch das Studio. In diesen Fällen können Sie fristlos kündigen. 💪",
  },
]

const FEATURES = [
  {
    icon: Zap,
    title: "Sofortantworten",
    desc: "Keine Wartezeit, keine Hotline",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Rechtssicher",
    desc: "Basiert auf deutschem Recht",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Clock,
    title: "24/7 verfügbar",
    desc: "Immer erreichbar, kostenlos",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
]

export function AiAssistantSection() {
  const { t } = useI18n()

  const openChat = () => {
    window.dispatchEvent(new Event("open-ai-chat"))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section id="ki-assistent" className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-purple-500/4 blur-[100px]" />
        <div className="absolute -right-40 top-1/2 h-72 w-72 rounded-full bg-violet-500/4 blur-[100px]" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: Text ── */}
          <div>
            <AnimateIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 dark:border-violet-700/40 bg-violet-500/5 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
                <Sparkles className="h-3.5 w-3.5" />
                KI-Assistent
                <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                  NEU
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={100}>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Ihre Kündigungsfragen —{" "}
                <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                  sofort beantwortet
                </span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={150}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Unser KI-Assistent kennt das deutsche Kündigungsrecht in- und auswendig. Stellen Sie Ihre Frage — und erhalten Sie in Sekunden eine klare, verständliche Antwort.
              </p>
            </AnimateIn>

            {/* Feature pills */}
            <AnimateIn delay={200}>
              <div className="mt-8 flex flex-col gap-3">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex items-center gap-3.5">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${f.bg}`}>
                      <f.icon className={`h-4.5 w-4.5 ${f.color}`} strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-foreground">{f.title}</span>
                      <span className="ml-2 text-sm text-muted-foreground">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            {/* CTA */}
            <AnimateIn delay={280}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={openChat}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/30"
                >
                  <MessageCircle className="h-4 w-4" />
                  Jetzt Frage stellen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-xs text-muted-foreground">
                  Kostenlos · Keine Registrierung · 20 Fragen/Tag
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* ── Right: Chat Preview ── */}
          <AnimateIn delay={200}>
            <div className="relative">
              {/* Glow behind card */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-x-8 bottom-0 top-8 rounded-3xl bg-violet-500/10 blur-2xl" />
              </div>

              {/* Chat card */}
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-black/[0.07] dark:shadow-black/30">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                      <Sparkles className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">KI-Assistent</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Online · antwortet sofort
                      </div>
                    </div>
                  </div>
                  {/* Window dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 p-5">
                  {DEMO_MESSAGES.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                          msg.role === "user"
                            ? "bg-foreground text-background"
                            : "bg-violet-100 dark:bg-violet-900/40"
                        }`}
                      >
                        {msg.role === "user"
                          ? <User className="h-3.5 w-3.5" />
                          : <Bot className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                        }
                      </div>
                      <div
                        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-foreground text-background rounded-tr-sm"
                            : "bg-muted text-foreground rounded-tl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  <div className="flex gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40 shrink-0">
                      <Bot className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>

                {/* Quick questions */}
                <div className="border-t border-border/40 px-5 pb-3 pt-3">
                  <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/60">
                    Häufige Fragen
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={openChat}
                        className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-[12px] font-medium text-muted-foreground transition-all duration-200 hover:border-violet-400/50 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input preview */}
                <div className="border-t border-border/40 px-5 pb-5 pt-3">
                  <button
                    onClick={openChat}
                    className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-3 transition-all duration-200 hover:border-violet-400/50 hover:shadow-sm"
                  >
                    <span className="flex-1 text-left text-sm text-muted-foreground/60">
                      Ihre Frage hier eingeben...
                    </span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
                      <ArrowRight className="h-3.5 w-3.5 text-white transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Floating stat badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-xl border border-border/50 bg-card px-4 py-2.5 shadow-lg">
                <div className="text-xl font-black text-foreground">20</div>
                <div className="text-xs text-muted-foreground leading-tight">
                  Fragen täglich<br />
                  <span className="font-semibold text-foreground">kostenlos</span>
                </div>
              </div>

              {/* Floating satisfaction badge */}
              <div className="absolute -right-4 -top-4 flex items-center gap-2 rounded-xl border border-border/50 bg-card px-3.5 py-2.5 shadow-lg">
                <span className="text-lg">⭐</span>
                <div className="text-xs text-muted-foreground leading-tight">
                  <span className="font-bold text-foreground">4.9/5</span><br />
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