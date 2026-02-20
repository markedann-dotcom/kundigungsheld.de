"use client"

import { Star } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"

export function TestimonialsSection() {
  const { t } = useI18n()

  const testimonials = [
    {
      name: "Sandra M.",
      location: "Berlin",
      rating: 5,
      text: t.testimonials.testimonial1Text,
      company: "McFIT",
    },
    {
      name: "Thomas K.",
      location: "München",
      rating: 5,
      text: t.testimonials.testimonial2Text,
      company: "Deutsche Telekom",
    },
    {
      name: "Lisa W.",
      location: "Hamburg",
      rating: 5,
      text: t.testimonials.testimonial3Text,
      company: "Allianz",
    },
    {
      name: "Marco R.",
      location: "Köln",
      rating: 4,
      text: t.testimonials.testimonial4Text,
      company: "DAZN",
    },
    {
      name: "Julia H.",
      location: "Frankfurt",
      rating: 5,
      text: t.testimonials.testimonial5Text,
      company: "1&1",
    },
    {
      name: "Andreas B.",
      location: "Stuttgart",
      rating: 5,
      text: t.testimonials.testimonial6Text,
      company: "Vodafone",
    },
  ]

  return (
    <section id="stimmen" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t.testimonials.sectionLabel}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">
                {t.testimonials.title}
              </span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.testimonials.subtitle}
            </p>
          </div>
        </AnimateIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <AnimateIn key={i} delay={i * 80}>
            <div
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`h-4 w-4 ${si < testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 leading-relaxed text-foreground/80">
                {`"${testimonial.text}"`}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                  {testimonial.company}
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
