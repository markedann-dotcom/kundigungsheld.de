"use client"

import { ArrowRight, CheckCircle2, Shield, Zap, FileText, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/animate-in"

const badges = [
  { icon: Shield, label: "Rechtssicher" },
  { icon: Zap, label: "In 2 Minuten fertig" },
  { icon: CheckCircle2, label: "100% kostenlos" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      
      {/* Глобальный фон (Градиентные пятна) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-[50%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center z-10 relative">
          
          <AnimateIn delay={100}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-4 py-1.5 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                Über 150 Anbieter verfügbar
              </span>
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              <span className="block text-balance drop-shadow-sm">
                Verträge kündigen
              </span>
              <span className="mt-2 block bg-gradient-to-r from-primary via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                einfach wie nie.
              </span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={300}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground font-medium">
              Erstellen Sie in wenigen Minuten rechtssichere Kündigungsschreiben. 
              Kein Anwalt nötig, keine Kosten, sofortiger Download.
            </p>
          </AnimateIn>

          <AnimateIn delay={400}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" asChild>
                <a href="#generator">
                  Kündigung erstellen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-full px-8 text-base bg-background/60 backdrop-blur-sm border-border/60 hover:bg-background/80"
                asChild
              >
                <a href="#so-gehts">So funktioniert{"'"}s</a>
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn delay={500}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {badges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <badge.icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* --- PREMIUM MOCKUP SECTION --- */}
        <AnimateIn delay={600} duration={1000}>
          <div className="relative mx-auto mt-20 max-w-5xl perspective-1000">
            
            {/* Декоративное свечение за карточкой */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-teal-500/30 to-emerald-500/30 blur-[80px] rounded-full opacity-50 pointer-events-none" />

            {/* Главная карточка (Стекло) */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-2xl backdrop-blur-xl dark:bg-black/40 dark:border-white/10 ring-1 ring-black/5">
              
              {/* Шапка интерфейса */}
              <div className="flex items-center justify-between border-b border-black/5 bg-white/50 px-6 py-4 backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/90 shadow-sm" />
                  <div className="h-3 w-3 rounded-full bg-amber-400/90 shadow-sm" />
                  <div className="h-3 w-3 rounded-full bg-green-400/90 shadow-sm" />
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  <Shield className="h-3 w-3" />
                  Secure Document
                </div>
              </div>

              {/* Тело мокапа */}
              <div className="relative flex flex-col md:flex-row min-h-[400px]">
                
                {/* Левая часть: Форма (Имитация) */}
                <div className="flex-1 p-8 md:p-12 space-y-6">
                  <div className="space-y-2">
                    <div className="h-2 w-20 rounded-full bg-primary/20" />
                    <h3 className="text-2xl font-bold text-foreground">Kündigungsvorlage</h3>
                    <p className="text-sm text-muted-foreground">Wählen Sie Ihren Anbieter aus.</p>
                  </div>

                  {/* Имитация полей ввода */}
                  <div className="space-y-4 pt-4">
                     <div className="flex items-center gap-4 rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                           <span className="font-bold">V</span>
                        </div>
                        <div className="flex-1">
                           <div className="text-sm font-semibold">Vodafone GmbH</div>
                           <div className="text-xs text-muted-foreground">Kundenservice</div>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                     </div>
                     
                     <div className="h-12 w-full rounded-xl bg-black/5 animate-pulse" />
                     <div className="h-12 w-3/4 rounded-xl bg-black/5 animate-pulse delay-75" />
                  </div>

                  {/* Кнопка в интерфейсе */}
                  <div className="pt-4">
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-medium text-background shadow-lg">
                      Kündigung jetzt erstellen
                    </div>
                  </div>
                </div>

                {/* Правая часть: Результат (Превью документа) */}
                <div className="relative w-full md:w-[45%] bg-muted/30 border-l border-black/5 p-8 flex items-center justify-center overflow-hidden">
                   
                   {/* Лист бумаги (Документ) */}
                   <div className="relative w-[240px] bg-white shadow-xl shadow-black/10 rounded-lg p-6 rotate-[-2deg] transition-transform hover:rotate-0 duration-500 border border-black/5">
                      {/* Шапка документа */}
                      <div className="flex justify-between items-start mb-6">
                         <div className="space-y-1">
                            <div className="h-2 w-12 bg-black/80 rounded-full" />
                            <div className="h-1.5 w-20 bg-black/20 rounded-full" />
                         </div>
                         <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-primary" />
                         </div>
                      </div>
                      
                      {/* Текст документа (полоски) */}
                      <div className="space-y-2.5 mb-8">
                         <div className="h-1.5 w-full bg-black/10 rounded-full" />
                         <div className="h-1.5 w-full bg-black/10 rounded-full" />
                         <div className="h-1.5 w-2/3 bg-black/10 rounded-full" />
                         <div className="h-1.5 w-full bg-black/10 rounded-full" />
                         <div className="h-1.5 w-1/2 bg-black/10 rounded-full" />
                      </div>

                      {/* Плашка действия (Скачать) */}
                      <div className="absolute bottom-6 left-6 right-6">
                         <div className="flex items-center gap-3 rounded-lg bg-green-50 px-3 py-2 border border-green-100">
                            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                               <CheckCircle2 className="h-3 w-3" />
                            </div>
                            <div className="text-[10px] font-semibold text-green-700">
                               Rechtssicher geprüft
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Всплывающие элементы (Floating Cards) */}
                   <div className="absolute top-10 right-6 animate-bounce delay-700 duration-[3000ms]">
                      <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-lg border border-black/5">
                         <FileText className="h-3.5 w-3.5 text-blue-500" />
                         <span className="text-[10px] font-bold text-foreground">PDF</span>
                      </div>
                   </div>

                   <div className="absolute bottom-10 left-6 animate-bounce delay-100 duration-[3000ms]">
                      <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-lg border border-black/5">
                         <Printer className="h-3.5 w-3.5 text-orange-500" />
                         <span className="text-[10px] font-bold text-foreground">Druckfertig</span>
                      </div>
                   </div>

                </div>
              </div>

            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}