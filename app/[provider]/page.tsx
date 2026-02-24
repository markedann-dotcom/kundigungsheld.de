import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  ShieldCheck,
  FileDown,
  Send,
  ChevronRight,
  Star,
  AlertTriangle,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { companies, CATEGORY_LABELS, type Company } from "@/lib/companies"
import { getLogoUrl } from "@/lib/company-domains"
import { SavingsCalculator } from "@/components/savings-calculator"

const BASE_URL = "https://kundigungsheld.de"

function companyToSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[äöüß]/g, (c) =>
        ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c] ?? c
      )
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + "-kundigen"
  )
}

function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => companyToSlug(c.name) === slug)
}

const AVG_FEE_BY_CATEGORY: Record<string, number> = {
  telekommunikation: 49.99,
  internet: 39.99,
  mobilfunk: 24.99,
  streaming: 14.99,
  fitness: 19.9,
  versicherung: 89.0,
  strom: 79.0,
  gas: 69.0,
  zeitung: 24.99,
  bank: 0,
  default: 29.99,
}

// FAQ по категориям
const FAQ_BY_CATEGORY: Record<string, { q: string; a: string }[]> = {
  telekommunikation: [
    { q: "Wie lange ist die Kündigungsfrist?", a: "Bei Telekommunikationsverträgen beträgt die Kündigungsfrist in der Regel 1 Monat zum Vertragsende. Nach Ablauf der Mindestlaufzeit verlängert sich der Vertrag automatisch, meist um 12 Monate." },
    { q: "Kann ich bei Preiserhöhung sonderkündigen?", a: "Ja! Bei einer Preiserhöhung haben Sie ein außerordentliches Kündigungsrecht. Die Kündigung muss innerhalb von 3 Monaten nach Bekanntgabe der Erhöhung eingehen." },
    { q: "Muss die Kündigung schriftlich erfolgen?", a: "Ja, Kündigungen müssen schriftlich per Post oder Fax erfolgen. Einige Anbieter akzeptieren auch E-Mail – zur Sicherheit empfehlen wir Einschreiben mit Rückschein." },
  ],
  streaming: [
    { q: "Kann ich monatlich kündigen?", a: "Die meisten Streaming-Dienste sind monatlich kündbar. Die Kündigung wird zum Ende des laufenden Abrechnungszeitraums wirksam." },
    { q: "Bekomme ich nach der Kündigung eine Bestätigung?", a: "Ja, seriöse Anbieter senden eine Kündigungsbestätigung per E-Mail. Heben Sie diese unbedingt auf." },
    { q: "Kann ich den Dienst nach Kündigung noch nutzen?", a: "Ja, bis zum Ende des bezahlten Zeitraums haben Sie vollen Zugriff auf alle Inhalte." },
  ],
  fitness: [
    { q: "Wie lange ist die Kündigungsfrist beim Fitnessstudio?", a: "Typischerweise 4–6 Wochen zum Ende der Vertragslaufzeit oder zum Ende eines Verlängerungszeitraums. Prüfen Sie Ihren Vertrag genau." },
    { q: "Kann ich bei Krankheit oder Umzug kündigen?", a: "Ja, bei dauerhafter Erkrankung (mit ärztlichem Attest) oder Umzug in eine andere Stadt haben Sie ein Sonderkündigungsrecht." },
    { q: "Muss ich persönlich kündigen?", a: "Nein, eine schriftliche Kündigung per Post oder persönlich im Studio ist ausreichend. Per Einschreiben sind Sie auf der sicheren Seite." },
  ],
  versicherung: [
    { q: "Wann kann ich eine Versicherung kündigen?", a: "Ordentlich zum Ablauf des Versicherungsjahres mit 3 Monaten Frist. Nach einem Schadensfall oder bei Beitragserhöhung haben Sie zusätzlich ein Sonderkündigungsrecht." },
    { q: "Was passiert mit bereits gezahlten Beiträgen?", a: "Bereits gezahlte Beiträge für noch nicht abgelaufene Versicherungszeiträume werden in der Regel anteilig erstattet." },
    { q: "Brauche ich sofort eine neue Versicherung?", a: "Bei Pflichtversicherungen (z.B. Kfz-Haftpflicht) ja – die alte Versicherung darf erst gekündigt werden, wenn eine neue abgeschlossen ist." },
  ],
  default: [
    { q: "Muss die Kündigung schriftlich erfolgen?", a: "In den meisten Fällen ja. Schriftliche Kündigungen per Post sind die sicherste Methode – am besten als Einschreiben mit Rückschein." },
    { q: "Was tun wenn keine Bestätigung kommt?", a: "Haken Sie nach ca. 2 Wochen beim Anbieter nach. Bewahren Sie den Einlieferungsbeleg als Nachweis auf." },
    { q: "Kann ich eine Kündigung zurückziehen?", a: "Ja, sofern der Anbieter noch nicht bestätigt hat. Kontaktieren Sie den Kundenservice so schnell wie möglich." },
  ],
}

export async function generateStaticParams() {
  return companies.map((c) => ({ provider: companyToSlug(c.name) }))
}

interface Props {
  params: Promise<{ provider: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider } = await params
  const company = getCompanyBySlug(provider)
  if (!company) return { title: "Nicht gefunden" }

  const title = `${company.name} kündigen – kostenlos & rechtssicher | KündigungsHeld`
  const description = `${company.name} Vertrag kündigen: Erstellen Sie in 2 Minuten ein rechtssicheres Kündigungsschreiben – kostenlos, ohne Registrierung, DSGVO-konform.`

  return {
    title,
    description,
    keywords: [
      `${company.name} kündigen`,
      `${company.name} Kündigung`,
      `${company.name} Kündigungsschreiben`,
      `${company.name} Vertrag kündigen`,
      `${company.name} Kündigungsfrist`,
    ],
    alternates: { canonical: `${BASE_URL}/${provider}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${provider}`,
      siteName: "KündigungsHeld",
      locale: "de_DE",
      type: "website",
    },
  }
}

function getJsonLd(company: Company, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${company.name} kündigen`,
    description: `${company.name} Vertrag rechtssicher kündigen – so geht's`,
    totalTime: "PT2M",
    step: [
      { "@type": "HowToStep", name: "Anbieter auswählen", text: `${company.name} im Generator auswählen` },
      { "@type": "HowToStep", name: "Daten eingeben", text: "Persönliche Daten und Vertragsinformationen eingeben" },
      { "@type": "HowToStep", name: "Kündigung herunterladen", text: "Rechtssicheres PDF herunterladen und absenden" },
    ],
    tool: { "@type": "HowToTool", name: "KündigungsHeld Generator", url: `${BASE_URL}/#generator` },
  }
}

export default async function ProviderPage({ params }: Props) {
  const { provider } = await params
  const company = getCompanyBySlug(provider)
  if (!company) notFound()

  const categoryLabel = CATEGORY_LABELS[company.category] ?? company.category
  const logoUrl = getLogoUrl(company.id)
  const avgFee = AVG_FEE_BY_CATEGORY[company.category] ?? AVG_FEE_BY_CATEGORY.default
  const faqs = FAQ_BY_CATEGORY[company.category] ?? FAQ_BY_CATEGORY.default

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(company, provider)) }}
      />
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-background">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute top-20 left-0 h-[300px] w-[300px] rounded-full bg-muted/40 blur-[80px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                KündigungsHeld
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">{company.name} kündigen</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16 items-start">
              {/* Left: Hero content */}
              <div>
                {/* Logo + category */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-md">
                    {logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logoUrl} alt={company.name} width={40} height={40} className="rounded-lg object-contain" />
                    ) : (
                      <span className="text-xl font-black text-foreground">
                        {company.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {categoryLabel}
                    </span>
                  </div>
                </div>

                <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
                  {company.name} kündigen
                  <span className="mt-1 block text-primary">kostenlos &amp; rechtssicher</span>
                </h1>

                <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-xl">
                  Erstellen Sie in unter 2 Minuten ein juristisch geprüftes Kündigungsschreiben –
                  ohne Registrierung, ohne versteckte Kosten.
                </p>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { icon: Clock, label: "Fertig in 2 Min" },
                    { icon: ShieldCheck, label: "DSGVO-konform" },
                    { icon: CheckCircle2, label: "100 % kostenlos" },
                    { icon: FileDown, label: "Sofort-Download" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" className="h-13 rounded-full px-8 text-base font-semibold shadow-elegant" asChild>
                    <Link href="/#generator">
                      Jetzt {company.name} kündigen →
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-13 rounded-full px-6 text-base" asChild>
                    <Link href="/#generator">
                      Generator öffnen
                    </Link>
                  </Button>
                </div>

                {/* Social proof */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["bg-blue-400", "bg-emerald-400", "bg-amber-400", "bg-rose-400"].map((bg, i) => (
                      <div key={i} className={`h-8 w-8 rounded-full ${bg} border-2 border-background flex items-center justify-center text-white text-xs font-bold`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">75.000+</span> erfolgreiche Kündigungen
                    <span className="ml-2 inline-flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Calculator (desktop) */}
              <div className="hidden lg:block">
                <SavingsCalculator companyName={company.name} avgMonthlyFee={avgFee} />
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="border-y border-border/40 bg-muted/20 py-10">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { num: "01", icon: FileDown, title: "Anbieter wählen", desc: `${company.name} im Generator auswählen` },
                { num: "02", icon: Send, title: "Daten eingeben", desc: "Name, Adresse & Vertragsnummer" },
                { num: "03", icon: CheckCircle2, title: "PDF herunterladen", desc: "Ausdrucken & per Post senden" },
              ].map(({ num, icon: Icon, title, desc }) => (
                <div key={num} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-foreground text-background text-sm font-black">
                    {num}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* LEFT */}
            <div className="space-y-6">

              {/* Info card */}
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="border-b border-border/40 bg-muted/30 px-6 py-4">
                  <h2 className="font-display text-base font-bold text-foreground">
                    Wichtige Informationen zur Kündigung
                  </h2>
                </div>
                <div className="divide-y divide-border/40 px-6">
                  {[
                    { label: "Anbieter", value: company.name },
                    { label: "Kategorie", value: categoryLabel },
                    { label: "Kündigungsform", value: "Schriftlich (Post / Fax / E-Mail)" },
                    ...(company.address ? [{ label: "Adresse", value: company.address }] : []),
                    ...(company.noticePeriod ? [{ label: "Kündigungsfrist", value: company.noticePeriod }] : []),
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 py-3.5 text-sm">
                      <span className="font-medium text-muted-foreground whitespace-nowrap">{row.label}</span>
                      <span className="text-right text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning tip */}
              <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-900/10 p-5">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-900 dark:text-amber-400">Tipp: Einschreiben mit Rückschein</p>
                  <p className="mt-1 text-amber-700 dark:text-amber-500">
                    Senden Sie Ihre Kündigung immer per Einschreiben mit Rückschein. So haben Sie einen rechtssicheren Nachweis, dass {company.name} die Kündigung erhalten hat.
                  </p>
                </div>
              </div>

              {/* SEO text */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h2 className="mb-4 font-display text-lg font-bold text-foreground">
                  {company.name} Vertrag kündigen – so geht&apos;s
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Eine Kündigung bei <strong className="text-foreground">{company.name}</strong> muss
                    schriftlich erfolgen. Mit KündigungsHeld erstellen Sie das Kündigungsschreiben in
                    unter 2 Minuten – rechtssicher, kostenlos und DSGVO-konform.
                  </p>
                  <p>
                    Senden Sie die Kündigung per{" "}
                    <strong className="text-foreground">Einschreiben mit Rückschein</strong>, damit Sie
                    einen rechtsverbindlichen Nachweis des Erhalts haben. Heben Sie den
                    Einlieferungsbeleg gut auf.
                  </p>
                  <p>
                    Bei Preiserhöhungen oder wesentlichen Vertragsänderungen steht Ihnen außerdem ein{" "}
                    <strong className="text-foreground">Sonderkündigungsrecht</strong> zu – unabhängig
                    von der regulären Kündigungsfrist. Nutzen Sie dieses Recht innerhalb von 4 Wochen
                    nach Bekanntgabe der Änderung.
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
                <div className="border-b border-border/40 bg-muted/30 px-6 py-4">
                  <h2 className="font-display text-base font-bold text-foreground">
                    Häufige Fragen zur {company.name} Kündigung
                  </h2>
                </div>
                <div className="divide-y divide-border/40">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group px-6 py-4">
                      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground list-none">
                        {faq.q}
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              {/* CTA box */}
              <div className="relative overflow-hidden rounded-2xl bg-foreground p-8 text-center">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
                </div>
                <Zap className="mx-auto mb-3 h-8 w-8 text-white/60" />
                <h3 className="font-display text-xl font-bold text-white">
                  Bereit zu kündigen?
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  In 2 Minuten zum rechtssicheren Kündigungsschreiben – kostenlos.
                </p>
                <Button
                  className="mt-5 rounded-full bg-white px-8 text-foreground hover:bg-white/90 font-semibold shadow-lg"
                  asChild
                >
                  <Link href="/#generator">Jetzt kostenlos kündigen →</Link>
                </Button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* Calculator (mobile too) */}
              <div className="lg:hidden">
                <SavingsCalculator companyName={company.name} avgMonthlyFee={avgFee} />
              </div>

              {/* Steps card */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h3 className="mb-5 font-display text-base font-bold text-foreground">
                  In 3 Schritten zur Kündigung
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Anbieter auswählen", desc: `${company.name} im Generator wählen` },
                    { step: "02", title: "Daten eingeben", desc: "Name, Adresse & optional Kundennummer" },
                    { step: "03", title: "PDF herunterladen", desc: "Per Einschreiben an den Anbieter senden" },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-black">
                        {step}
                      </div>
                      <div className="pt-0.5">
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-6 w-full rounded-full font-semibold" asChild>
                  <Link href="/#generator">Jetzt kostenlos kündigen →</Link>
                </Button>
              </div>

              {/* Trust card */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h3 className="mb-4 font-display text-base font-bold text-foreground">
                  Warum KündigungsHeld?
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: ShieldCheck, text: "Juristisch geprüfte Vorlagen" },
                    { icon: CheckCircle2, text: "Keine Datenspeicherung auf Servern" },
                    { icon: Clock, text: "Fertig in unter 2 Minuten" },
                    { icon: FileDown, text: "PDF, DOCX & E-Mail Export" },
                    { icon: Zap, text: "300+ Anbieter verfügbar" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm">
                      <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating card */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm text-center">
                <div className="flex justify-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="mt-2 text-2xl font-black text-foreground">4.9 / 5</p>
                <p className="text-sm text-muted-foreground">basierend auf 10.000+ Bewertungen</p>
                <p className="mt-4 text-sm italic text-muted-foreground leading-relaxed">
                  &ldquo;Endlich einfach und schnell kündigen – ohne Stress und ohne Anwalt!&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold text-foreground">— Sandra M., Berlin</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}