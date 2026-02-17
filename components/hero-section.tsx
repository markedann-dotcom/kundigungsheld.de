"use client"

import { ArrowRight, CheckCircle2, Shield, Zap, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/animate-in"

const badges = [
  { icon: Shield, label: "Rechtssicher" },
  { icon: Zap, label: "In 2 Minuten fertig" },
  { icon: CheckCircle2, label: "100% kostenlos" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(173,58%,39%,0.06)] via-background to-background">
      {/* Фоновые пятна */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          
          <AnimateIn delay={100}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">
                Über 150 Unternehmen verfügbar
              </span>
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">
                Verträge kündigen{" "}
                <span className="relative">
                  <span className="relative z-10 text-primary">leicht gemacht</span>
                  <span className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded bg-primary/10" />
                </span>
              </span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={300}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Erstellen Sie in wenigen Minuten rechtssichere Kündigungsschreiben
              für über 150 deutsche Unternehmen. Wählen Sie Ihren Anbieter,
              füllen Sie das Formular aus, fertig.
            </p>
          </AnimateIn>

          <AnimateIn delay={400}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="group rounded-full px-8 text-base" asChild>
                <a href="#generator">
                  Jetzt Kündigung erstellen
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base"
                asChild
              >
                <a href="#so-gehts">So funktioniert{"'"}s</a>
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn delay={500}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {badges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <badge.icon className="h-4 w-4 text-primary" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* MOCKUP SECTION (Вместо Видео) */}
        <AnimateIn delay={600} duration={800}>
          <div className="relative mx-auto mt-16 max-w-4xl">
            
            {/* Задняя подсветка (Glow Effect) */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-2xl opacity-40" />

            {/* Карточка-имитация интерфейса */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-2xl dark:bg-black/40 dark:border-white/10">
              
              {/* Шапка "браузера" или приложения */}
              <div className="flex items-center gap-4 border-b border-border/10 bg-muted/20 px-6 py-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="h-2 w-32 rounded-full bg-foreground/10" />
              </div>

              {/* Тело мокапа (Логотип и контент) */}
              <div className="flex flex-col items-center justify-center py-20 text-center sm:py-24">
                
                {/* Логотип в круге */}
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0f7a66] to-[#23b496] shadow-lg shadow-primary/20 ring-4 ring-white/50 dark:ring-white/10">
                  <Shield className="h-12 w-12 text-white" fill="rgba(255,255,255,0.2)" />
                  {/* Декоративная галочка */}
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Название бренда */}
                <h3 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  KündigungsHeld
                </h3>
                <p className="mt-2 text-lg font-medium text-muted-foreground">
                  Deutschlands einfacher Kündigungsservice
                </p>

                {/* Имитация кнопок/действий */}
                <div className="mt-8 flex gap-3">
                   <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2 shadow-sm backdrop-blur-sm">
                      <FileCheck className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">PDF erstellt</span>
                   </div>
                   <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2 shadow-sm backdrop-blur-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium">Versandbereit</span>
                   </div>
                </div>

              </div>

              {/* Декоративные линии (письмо) на заднем плане внизу */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}