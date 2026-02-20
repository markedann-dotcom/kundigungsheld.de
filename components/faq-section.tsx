"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimateIn } from "@/components/animate-in"
import { useI18n } from "@/contexts/i18n-context"

export function FaqSection() {
  const { t } = useI18n()

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
  ]

  return (
    <section id="faq" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <AnimateIn>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t.faq.sectionLabel}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">{t.faq.title}</span>
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
