"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"

export function CtaSection() {
  const { t } = useI18n()
  
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateIn duration={800}>
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center sm:px-12 lg:px-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-background/5" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-background/5" />
          </div>

          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-background sm:text-4xl">
              <span className="text-balance">{t.cta.title}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-background/80">
              {t.cta.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group rounded-full bg-background px-8 text-base font-semibold text-foreground hover:bg-background/90"
                asChild
              >
                <a href="#generator">
                  {t.cta.button}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        </AnimateIn>
      </div>
    </section>
  )
}
