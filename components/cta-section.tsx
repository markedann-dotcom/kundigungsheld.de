import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/animate-in"

export function CtaSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateIn duration={800}>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-12 lg:px-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />
          </div>

          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              <span className="text-balance">Bereit, Ihren Vertrag zu kündigen?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
              Erstellen Sie jetzt Ihr rechtssicheres Kündigungsschreiben.
              100% kostenlos, schnell und ohne Registrierung.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group rounded-full bg-white px-8 text-base font-semibold text-primary hover:bg-white/90"
                asChild
              >
                <a href="#generator">
                  Jetzt Kündigung erstellen
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
