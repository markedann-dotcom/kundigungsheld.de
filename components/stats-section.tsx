import { AnimateIn } from "@/components/animate-in"

const stats = [
  { value: "150+", label: "Unternehmen" },
  { value: "75.000+", label: "Kündigungen erstellt" },
  { value: "98%", label: "Erfolgsquote" },
  { value: "2 Min", label: "Durchschnittliche Dauer" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border/50 bg-card py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 100} direction="up">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
