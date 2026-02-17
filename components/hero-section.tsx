"use client"

import { ArrowRight, CheckCircle2, Shield, Zap, FileText, Download } from "lucide-react"
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
      
      {/* Фон (пятна) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-[50%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 lg:px-8 lg:pb-20 lg:pt-24">
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
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground font-medium">
              Erstellen Sie in wenigen Minuten rechtssichere Kündigungsschreiben. 
              Kein Anwalt nötig, keine Kosten, sofortiger Download.
            </p>
          </AnimateIn>

          <AnimateIn delay={400}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
        </div>

        {/* --- COMPACT MOCKUP (Компактный вариант) --- */}
        <AnimateIn delay={500} duration={1000}>
          <div className="relative mx-auto mt-16 max-w-2xl perspective-1000 group">
            
            {/* Свечение за документом */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/40 blur-[60px] rounded-full opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-700" />

            {/* Левитирующий документ */}
            <div className="relative mx-auto w-[280px] sm:w-[320px] aspect-[1/1.4] bg-white rounded-xl shadow-2xl shadow-primary/20 border border-white/40 ring-1 ring-black/5 transform rotate-x-12 rotate-y-6 rotate-z-[-2deg] transition-all duration-700 hover:rotate-0 hover:scale-105 hover:shadow-primary/40">
                
                {/* Содержимое "Листа бумаги" */}
                <div className="p-6 flex flex-col h-full bg-gradient-to-b from-white to-gray-50/50 rounded-xl">
                    {/* Шапка письма */}
                    <div className="flex justify-between items-start mb-6 opacity-80">
                         <div className="space-y-1.5">
                            <div className="h-2 w-16 bg-slate-800 rounded-full" />
                            <div className="h-1.5 w-24 bg-slate-300 rounded-full" />
                         </div>
                         <Shield className="h-6 w-6 text-primary/80" />
                    </div>
                    
                    {/* Полоски текста */}
                    <div className="space-y-3 mb-auto opacity-60">
                         <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                         <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                         <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
                         <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                    </div>

                    {/* Печать / Подпись */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2">
                             <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                             </div>
                             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                Geprüft
                             </div>
                        </div>
                        <div className="font-handwriting text-slate-400 text-lg rotate-[-5deg]">
                           Muster Max
                        </div>
                    </div>
                </div>

                {/* Плавающие бейджики (Floating Elements) */}
                <div className="absolute -right-12 top-10 animate-bounce delay-100 duration-[4000ms] hidden sm:flex">
                     <div className="flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur px-3 py-2 shadow-lg border border-white/50">
                        <FileText className="h-4 w-4 text-red-500" />
                        <span className="text-xs font-bold text-slate-700">PDF</span>
                     </div>
                </div>

                <div className="absolute -left-10 bottom-20 animate-bounce delay-700 duration-[5000ms] hidden sm:flex">
                     <div className="flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur px-3 py-2 shadow-lg border border-white/50">
                        <Download className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-bold text-slate-700">Download</span>
                     </div>
                </div>

            </div>
          </div>
        </AnimateIn>

        {/* Иконки внизу, чтобы заполнить пустоту */}
        <AnimateIn delay={600}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border/40 pt-8 max-w-2xl mx-auto">
              {badges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground/80">
                  <badge.icon className="h-4 w-4 text-primary" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
        </AnimateIn>

      </div>
    </section>
  )
}