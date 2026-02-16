import { Building2, FileEdit, Download } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Anbieter auswählen",
    description:
      "Suchen Sie Ihren Anbieter aus unserer Datenbank mit über 120 deutschen Unternehmen. Alle wichtigen Informationen wie Adresse und Kündigungsfristen werden automatisch eingefügt.",
  },
  {
    number: "02",
    icon: FileEdit,
    title: "Formular ausfüllen",
    description:
      "Geben Sie Ihre persönlichen Daten und Vertragsinformationen ein. Wählen Sie die passende Kündigungsart - von ordentlich bis Sonderkündigung.",
  },
  {
    number: "03",
    icon: Download,
    title: "Kündigung versenden",
    description:
      "Ihr Kündigungsschreiben wird sofort generiert. Kopieren Sie es in die Zwischenablage oder laden Sie es herunter. Dann nur noch per Post versenden!",
  },
]

export function HowItWorksSection() {
  return (
    <section id="so-gehts" className="bg-[hsl(210,40%,98%)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              So gehts
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">In drei einfachen Schritten zur Kündigung</span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Kein Anwalt, kein Fachwissen nötig. Unser Generator führt Sie
              Schritt für Schritt durch den Prozess.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <AnimateIn key={step.number} delay={index * 150}>
            <div className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-0.5 w-full -translate-x-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/10 lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
