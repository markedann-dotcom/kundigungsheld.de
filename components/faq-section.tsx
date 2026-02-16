"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimateIn } from "@/components/animate-in"

const faqs = [
  {
    question: "Ist die Nutzung wirklich kostenlos?",
    answer:
      "Ja, absolut! KündigungsHeld ist zu 100% kostenlos. Es gibt keine versteckten Kosten, keine Limits und keine Premium-Versionen. Erstellen Sie so viele Kündigungsschreiben, wie Sie benötigen.",
  },
  {
    question: "Sind die Kündigungsschreiben rechtlich gültig?",
    answer:
      "Unsere Vorlagen sind von juristischen Experten erstellt und entsprechen den Anforderungen des deutschen Rechts. Bitte beachten Sie jedoch, dass wir keine Rechtsberatung ersetzen können. Bei komplexen Fällen empfehlen wir die Konsultation eines Anwalts.",
  },
  {
    question: "Werden meine Daten gespeichert?",
    answer:
      "Ihre Kündigungsdaten werden ausschließlich in Ihrem Browser (localStorage) verarbeitet und nicht an unsere Server übermittelt. Das Archiv speichert Ihre Kündigungen ebenfalls nur lokal auf Ihrem Gerät. Wir nehmen Datenschutz ernst und sind vollständig DSGVO-konform.",
  },
  {
    question: "Was mache ich nach dem Erstellen des Schreibens?",
    answer:
      "Drucken Sie das Schreiben aus und senden Sie es per Post an die angegebene Adresse – am besten als Einschreiben mit Rückschein, damit Sie einen Nachweis haben. Alternativ können Sie es per Fax oder E-Mail senden, sofern vom Anbieter akzeptiert. Vergessen Sie nicht, die Kündigung in Ihrem Archiv als 'gesendet' zu markieren!",
  },
  {
    question: "Was ist der Unterschied zwischen ordentlicher und außerordentlicher Kündigung?",
    answer:
      "Eine ordentliche Kündigung erfolgt unter Einhaltung der vertraglich vereinbarten Kündigungsfrist. Eine außerordentliche (fristlose) Kündigung ist nur bei einem wichtigen Grund möglich, z.B. bei schwerwiegenden Vertragsverletzungen des Anbieters. Die Sonderkündigung, z.B. bei Preiserhöhungen, ist ein Mittelweg.",
  },
  {
    question: "Kann ich auch Verträge kündigen, die nicht in Ihrer Liste sind?",
    answer:
      "Ja! Auch wenn ein Unternehmen nicht in unserer Datenbank mit über 150 Anbietern ist, können Sie unsere allgemeinen Vorlagen verwenden. Sie müssen lediglich die Anbieteradresse selbst eintragen.",
  },
  {
    question: "Was ist das Archiv und wie funktioniert es?",
    answer:
      "Im Archiv können Sie alle erstellten Kündigungen verwalten und den Status verfolgen (erstellt, gesendet, bestätigt). Alle Daten werden ausschließlich lokal in Ihrem Browser gespeichert. Sie können jederzeit Notizen hinzufügen und den Überblick behalten.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <AnimateIn>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">Häufig gestellte Fragen</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left font-medium text-foreground transition-colors duration-200 hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateIn>
      </div>
    </section>
  )
}
