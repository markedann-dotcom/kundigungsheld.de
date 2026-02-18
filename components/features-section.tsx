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
    title: "150+ Unternehmen",
    description:
      "Von Telekom bis Netflix, von Allianz bis Trade Republic — Adressen und Fristen aller wichtigen Anbieter.",
    accent: "from-blue-500/20 to-cyan-500/20",
    accentHover: "group-hover:from-blue-500 group-hover:to-cyan-500",
    iconAccent: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: FileCheck,
    title: "Rechtssichere Vorlagen",
    description:
      "Unsere Vorlagen werden von Experten erstellt und decken alle Kündigungsarten ab: ordentlich, außerordentlich, Widerruf.",
    accent: "from-emerald-500/20 to-green-500/20",
    accentHover: "group-hover:from-emerald-500 group-hover:to-green-500",
    iconAccent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Clock,
    title: "Fertig in 2 Minuten",
    description:
      "Anbieter auswählen, Daten eingeben, Schreiben generieren. So einfach war Kündigen noch nie.",
    accent: "from-amber-500/20 to-orange-500/20",
    accentHover: "group-hover:from-amber-500 group-hover:to-orange-500",
    iconAccent: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: ShieldCheck,
    title: "DSGVO-konform",
    description:
      "Ihre Daten werden nicht gespeichert und nicht an Dritte weitergegeben. Alles passiert direkt in Ihrem Browser.",
    accent: "from-violet-500/20 to-purple-500/20",
    accentHover: "group-hover:from-violet-500 group-hover:to-purple-500",
    iconAccent: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: ListChecks,
    title: "Alle Kündigungsarten",
    description:
      "Ordentliche Kündigung, Sonderkündigung, Widerruf, fristlose Kündigung, Umzug oder Todesfall.",
    accent: "from-rose-500/20 to-pink-500/20",
    accentHover: "group-hover:from-rose-500 group-hover:to-pink-500",
    iconAccent: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: Download,
    title: "PDF, Druck & E-Mail",
    description:
      "Laden Sie Ihr Schreiben als PDF herunter, drucken Sie es direkt aus, oder senden Sie es per E-Mail.",
    accent: "from-sky-500/20 to-indigo-500/20",
    accentHover: "group-hover:from-sky-500 group-hover:to-indigo-500",
    iconAccent: "text-sky-600 dark:text-sky-400",
  },
]

export function FeaturesSection() {
  return (
    <section id="funktionen" className="relative overflow-hidden bg-card py-24 lg:py-32">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Funktionen
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">
                Alles was Sie brauchen,{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  um Verträge zu kündigen
                </span>
              </span>
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
              KündigungsHeld vereinfacht den gesamten Kündigungsprozess mit
              intelligenten Vorlagen und einer umfangreichen Unternehmensdatenbank.
            </p>
          </div>
        </AnimateIn>

        {/* Feature grid */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-black/[0.03] dark:hover:shadow-black/20">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Top decorative line */}
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${feature.accentHover} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} ${feature.iconAccent} ring-1 ring-black/[0.04] transition-all duration-500 dark:ring-white/[0.08]`}
                  >
                    <feature.icon className="h-5.5 w-5.5 h-[22px] w-[22px]" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Hover arrow indicator */}
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>Mehr erfahren</span>
                    <svg
                      className="h-4 w-4 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom stat bar */}
        <AnimateIn delay={700}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-8 rounded-2xl border border-border/40 bg-muted/30 px-8 py-6 sm:gap-12">
            {[
              { value: "150+", label: "Unternehmen" },
              { value: "50k+", label: "Kündigungen" },
              { value: "4.9★", label: "Bewertung" },
              { value: "100%", label: "Kostenlos" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold text-foreground sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}