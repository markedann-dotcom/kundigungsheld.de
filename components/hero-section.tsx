"use client"

import { ArrowRight, CheckCircle2, Shield, Zap } from "lucide-react"
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

        <AnimateIn delay={600} duration={800}>
          <div className="relative mx-auto mt-16 max-w-4xl">
            {/* БЛОК ВИДЕО */}
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl shadow-primary/5">
              <video
                src="/hero.mp4"      // Имя файла в папке public
                autoPlay             // Автозапуск
                loop                 // Зациклить
                muted                // Без звука (обязательно для автозапуска!)
                playsInline          // Для iPhone (чтобы не открывалось на весь экран)
                className="w-full h-auto object-cover"
                width="100%"
                height="100%"
              >
                {/* Текст, если браузер совсем старый */}
                Ihr Browser unterstützt dieses Video nicht.
              </video>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}