import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, MapPin, Euro, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { companies, CATEGORY_LABELS, type Company } from "@/lib/companies"
import { getLogoUrl } from "@/lib/company-domains"
import { SavingsCalculator } from "@/components/savings-calculator"

const BASE_URL = "https://kundigungsheld.de"

// ── Helpers ────────────────────────────────────────────────────────────────────

// Строим slug из названия компании: "Deutsche Telekom" → "deutsche-telekom-kundigen"
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

// Находим компанию по slug
function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => companyToSlug(c.name) === slug)
}

// Средний месячный взнос по категории (для калькулятора)
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

// ── Static params — генерирует URL для каждой компании ───────────────────────

export async function generateStaticParams() {
  return companies.map((c) => ({ provider: companyToSlug(c.name) }))
}

// ── Metadata ─────────────────────────────────────────────────────────────────

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
    alternates: {
      canonical: `${BASE_URL}/${provider}`,
    },
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

// ── JSON-LD ───────────────────────────────────────────────────────────────────

function getJsonLd(company: Company, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${company.name} kündigen`,
    description: `${company.name} Vertrag rechtssicher kündigen – so geht's`,
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        name: "Anbieter auswählen",
        text: `${company.name} im Generator auswählen`,
      },
      {
        "@type": "HowToStep",
        name: "Daten eingeben",
        text: "Persönliche Daten und Vertragsinformationen eingeben",
      },
      {
        "@type": "HowToStep",
        name: "Kündigung herunterladen",
        text: "Rechtssicheres PDF herunterladen und absenden",
      },
    ],
    tool: {
      "@type": "HowToTool",
      name: "KündigungsHeld Generator",
      url: `${BASE_URL}/#generator`,
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProviderPage({ params }: Props) {
  const { provider } = await params
  const company = getCompanyBySlug(provider)

  if (!company) notFound()

  const categoryLabel = CATEGORY_LABELS[company.category] ?? company.category
  const logoUrl = getLogoUrl(company.domain)
  const avgFee =
    AVG_FEE_BY_CATEGORY[company.category] ?? AVG_FEE_BY_CATEGORY.default

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLd(company, provider)),
        }}
      />
      <Navbar />

      <main className="bg-background">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-border/40 py-12 lg:py-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-muted/30 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 gap-2 text-muted-foreground"
              asChild
            >
              <Link href="/#generator">
                <ArrowLeft className="h-4 w-4" />
                Zum Generator
              </Link>
            </Button>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              {/* Logo */}
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-sm">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={company.name}
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                  />
                ) : (
                  <span className="text-lg font-bold text-foreground">
                    {company.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {categoryLabel}
                </div>
                <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
                  {company.name} kündigen –{" "}
                  <span className="text-primary">kostenlos & rechtssicher</span>
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Erstellen Sie in 2 Minuten ein rechtssicheres
                  Kündigungsschreiben für {company.name} – ohne Registrierung,
                  ohne Kosten, DSGVO-konform.
                </p>

                {/* Stats row */}
                <div className="mt-5 flex flex-wrap gap-4">
                  {[
                    { icon: Clock, text: "2 Min Dauer" },
                    { icon: CheckCircle2, text: "100 % kostenlos" },
                    { icon: CheckCircle2, text: "Sofort-Download" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                size="lg"
                className="rounded-full px-8 shadow-elegant"
                asChild
              >
                <Link href="/#generator">
                  Jetzt {company.name} kündigen →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Content grid ── */}
        <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

            {/* LEFT */}
            <div className="space-y-8">

              {/* Info card */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h2 className="mb-4 font-display text-lg font-bold text-foreground">
                  Wichtige Informationen
                </h2>
                <div className="divide-y divide-border/40">
                  {[
                    {
                      label: "Kategorie",
                      value: categoryLabel,
                    },
                    {
                      label: "Kündigungsart",
                      value: "Schriftlich (Post / Fax / E-Mail)",
                    },
                    company.address && {
                      label: "Adresse",
                      value: company.address,
                    },
                    company.noticePeriod && {
                      label: "Kündigungsfrist",
                      value: company.noticePeriod,
                    },
                  ]
                    .filter(Boolean)
                    .map((row: any) => (
                      <div
                        key={row.label}
                        className="flex justify-between gap-4 py-3 text-sm"
                      >
                        <span className="font-medium text-muted-foreground">
                          {row.label}
                        </span>
                        <span className="text-right text-foreground">
                          {row.value}
                        </span>
                      </div>
                    ))}
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
                    schriftlich erfolgen. Mit KündigungsHeld erstellen Sie das
                    Kündigungsschreiben in unter 2 Minuten – rechtssicher,
                    kostenlos und DSGVO-konform.
                  </p>
                  <p>
                    Senden Sie die Kündigung per{" "}
                    <strong className="text-foreground">
                      Einschreiben mit Rückschein
                    </strong>
                    , damit Sie einen rechtsverbindlichen Nachweis des Erhalts
                    haben.
                  </p>
                  <p>
                    Bei Preiserhöhungen oder wesentlichen Vertragsänderungen
                    steht Ihnen außerdem ein{" "}
                    <strong className="text-foreground">
                      Sonderkündigungsrecht
                    </strong>{" "}
                    zu – unabhängig von der regulären Kündigungsfrist.
                  </p>
                </div>
              </div>

              {/* CTA box */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Kündigung erstellen?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nutzen Sie unseren kostenlosen Generator für rechtssichere
                  Kündigungsschreiben.
                </p>
                <Button className="mt-4 rounded-full px-6" asChild>
                  <Link href="/#generator">Zum Generator</Link>
                </Button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* Savings Calculator — client component */}
              <SavingsCalculator
                companyName={company.name}
                avgMonthlyFee={avgFee}
              />

              {/* Steps card */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h3 className="mb-4 font-display text-base font-bold text-foreground">
                  In 3 Schritten zur Kündigung
                </h3>
                <div className="space-y-3">
                  {[
                    "Anbieter auswählen",
                    "Daten eingeben",
                    "PDF herunterladen & senden",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-5 w-full rounded-full" asChild>
                  <Link href="/#generator">
                    Jetzt kostenlos kündigen →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}