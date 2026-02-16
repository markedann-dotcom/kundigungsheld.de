import { Star } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"

const testimonials = [
  {
    name: "Sandra M.",
    location: "Berlin",
    rating: 5,
    text: "Ich musste meinen Fitnessstudio-Vertrag kündigen und wusste nicht wie. Mit KündigungsHeld war das Schreiben in 2 Minuten fertig. Absolut empfehlenswert!",
    company: "McFIT",
  },
  {
    name: "Thomas K.",
    location: "München",
    rating: 5,
    text: "Endlich ein Tool, das wirklich funktioniert. Habe schon drei Verträge damit gekündigt - Telekom, Vodafone und Sky. Jedes Mal problemlos.",
    company: "Deutsche Telekom",
  },
  {
    name: "Lisa W.",
    location: "Hamburg",
    rating: 5,
    text: "Die Sonderkündigung wegen Preiserhöhung war perfekt formuliert. Mein Versicherungsanbieter hat sofort akzeptiert. Danke!",
    company: "Allianz",
  },
  {
    name: "Marco R.",
    location: "Köln",
    rating: 4,
    text: "Super einfach zu bedienen. Habe meine DAZN-Mitgliedschaft und mein Zeitungsabo gleichzeitig gekündigt. Alles in unter 5 Minuten.",
    company: "DAZN",
  },
  {
    name: "Julia H.",
    location: "Frankfurt",
    rating: 5,
    text: "Als ich umgezogen bin, musste ich meinen DSL-Vertrag kündigen. Die Umzugs-Vorlage war genau richtig. Der Anbieter hat sofort bestätigt.",
    company: "1&1",
  },
  {
    name: "Andreas B.",
    location: "Stuttgart",
    rating: 5,
    text: "Dass man sogar an die Widerspruchsklausel gegen Werbung gedacht hat, zeigt wie durchdacht die Vorlagen sind. Klasse Service!",
    company: "Vodafone",
  },
]

export function TestimonialsSection() {
  return (
    <section id="stimmen" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Kundenstimmen
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">
                Über 10.000 zufriedene Nutzer
              </span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Erfahren Sie, was unsere Nutzer über KündigungsHeld sagen.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimateIn key={i} delay={i * 80}>
            <div
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`h-4 w-4 ${si < t.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 leading-relaxed text-foreground/80">
                {`"${t.text}"`}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
                <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                  {t.company}
                </span>
              </div>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
