import {
  Building2,
  Clock,
  Download,
  FileCheck,
  ListChecks,
  ShieldCheck,
} from "lucide-react"
import { AnimateIn } from "@/components/animate-in"

const features = [
  {
    icon: Building2,
    title: "120+ Unternehmen",
    description:
      "Von Telekom bis Netflix, von Allianz bis Trade Republic - Adressen und Fristen aller wichtigen Anbieter.",
  },
  {
    icon: FileCheck,
    title: "Rechtssichere Vorlagen",
    description:
      "Unsere Vorlagen werden von Experten erstellt und decken alle Kündigungsarten ab: ordentlich, außerordentlich, Widerruf.",
  },
  {
    icon: Clock,
    title: "Fertig in 2 Minuten",
    description:
      "Anbieter auswählen, Daten eingeben, Schreiben generieren. So einfach war Kündigen noch nie.",
  },
  {
    icon: ShieldCheck,
    title: "DSGVO-konform",
    description:
      "Ihre Daten werden nicht gespeichert und nicht an Dritte weitergegeben. Alles passiert direkt in Ihrem Browser.",
  },
  {
    icon: ListChecks,
    title: "Alle Kündigungsarten",
    description:
      "Ordentliche Kündigung, Sonderkündigung, Widerruf, fristlose Kündigung, Umzug oder Todesfall.",
  },
  {
    icon: Download,
    title: "PDF, Druck & E-Mail",
    description:
      "Laden Sie Ihr Schreiben als PDF herunter, drucken Sie es direkt aus, oder senden Sie es per E-Mail an den Anbieter.",
  },
]

export function FeaturesSection() {
  return (
    <section id="funktionen" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Funktionen
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">
                Alles was Sie brauchen, um Verträge zu kündigen
              </span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              KündigungsHeld vereinfacht den gesamten Kündigungsprozess mit
              intelligenten Vorlagen und einer umfangreichen Unternehmensdatenbank.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} delay={i * 80}>
              <div className="group relative h-full rounded-2xl border border-border/60 bg-white p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
