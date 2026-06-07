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
  ArrowRight,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { companies, CATEGORY_LABELS, type Company } from "@/lib/companies"
import { getLogoUrl } from "@/lib/company-domains"
import { SavingsCalculator } from "@/components/savings-calculator"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

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
    keywords: [`${company.name} kündigen`, `${company.name} Kündigung`, `${company.name} Kündigungsschreiben`, `${company.name} Vertrag kündigen`, `${company.name} Kündigungsfrist`],
    alternates: { canonical: `${BASE_URL}/${provider}` },
    openGraph: { title, description, url: `${BASE_URL}/${provider}`, siteName: "KündigungsHeld", locale: "de_DE", type: "website" },
  }
}

function getJsonLd(company: Company) {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(company)) }}
      />
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-background">
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

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left: text */}
              <div className="space-y-6">
                {/* Category badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {categoryLabel}
                </span>

                <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                  {company.name} kündigen
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Erstellen Sie Ihr rechtssicheres Kündigungsschreiben für{" "}
                  <strong className="text-foreground">{company.name}</strong> in unter 2 Minuten —
                  kostenlos, ohne Registrierung, DSGVO-konform.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: ShieldCheck, label: "Rechtssicher" },
                    { icon: FileDown, label: "Als PDF" },
                    { icon: Zap, label: "In 2 Minuten" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href={`/#generator`}>
                  <Button size="lg" className="h-14 rounded-full px-8 text-base font-semibold shadow-lg">
                    Jetzt {company.name} kündigen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Right: company card */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-card p-8 shadow-xl">
                  {/* Logo */}
                  <div className="mb-6 flex justify-center">
                    {logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoUrl}
                        alt={`${company.name} Logo`}
                        className="h-16 w-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-2xl font-bold text-muted-foreground">
                        {company.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <h2 className="mb-1 text-center text-xl font-bold text-foreground">{company.name}</h2>
                  <p className="mb-6 text-center text-sm text-muted-foreground">{categoryLabel}</p>

                  {/* Stats */}
                  <div className="space-y-3">
                    {(company as any).kuendigungsfrist && (
                      <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Kündigungsfrist
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {(company as any).kuendigungsfrist}
                        </span>
                      </div>
                    )}
                    {avgFee > 0 && (
                      <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          Ø Monatsbeitrag
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {avgFee.toFixed(2).replace(".", ",")} €
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        Kündigung per
                      </div>
                      <span className="text-sm font-semibold text-foreground">Post / E-Mail</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="border-y border-border/50 bg-muted/20 py-14">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
              So kündigen Sie {company.name} in 3 Schritten
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { step: "01", icon: CheckCircle2, title: "Anbieter wählen", desc: `${company.name} im Generator auswählen` },
                { step: "02", icon: Send, title: "Daten eingeben", desc: "Name, Adresse und Vertragsdaten eintragen" },
                { step: "03", icon: FileDown, title: "PDF herunterladen", desc: "Rechtssicheres Schreiben sofort fertig" },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="relative rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Schritt {step}
                  </div>
                  <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/#generator">
                <Button size="lg" className="h-12 rounded-full px-8 font-semibold">
                  Jetzt kostenlos starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Savings Calculator ── */}
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              Wie viel können Sie sparen?
            </h2>
            <SavingsCalculator company={company} avgFee={avgFee} />
          </div>
        </section>

        {/* ── Important notice ── */}
        <section className="py-6">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div className="text-sm text-amber-800">
                <strong className="font-semibold">Wichtig:</strong> Prüfen Sie vor der Kündigung Ihre
                Vertragslaufzeit und Kündigungsfristen. Diese finden Sie in Ihren Vertragsunterlagen
                oder im Kundenportal von {company.name}.
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              Häufige Fragen zur {company.name} Kündigung
            </h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-foreground">{q}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-14">
          <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Bereit, {company.name} zu kündigen?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Kostenlos, rechtssicher, in 2 Minuten. Keine Registrierung nötig.
            </p>
            <Link href="/#generator">
              <Button size="lg" className="h-14 rounded-full px-10 text-base font-semibold shadow-lg">
                Kündigung jetzt erstellen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}