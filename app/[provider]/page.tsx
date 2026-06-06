import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
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
import { companies, CATEGORY_LABELS, type Company } from "@/lib/companies"
import { getLogoUrl } from "@/lib/company-domains"
import { SavingsCalculator } from "@/components/savings-calculator"

// Динамический импорт для предотвращения ошибок SSR с useI18n
const Navbar = dynamic(() => import("@/components/navbar").then((mod) => mod.Navbar), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer), { ssr: false })

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
        {/* Оставшаяся верстка страницы остается без изменений */}
        <section className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute top-20 left-0 h-[300px] w-[300px] rounded-full bg-muted/40 blur-[80px]" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">KündigungsHeld</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">{company.name} kündigen</span>
            </nav>
            {/* ... остальное содержание ... */}
          </div>
        </section>
        {/* ... остальная часть страницы ... */}
      </main>

      <Footer />
    </div>
  )
}
