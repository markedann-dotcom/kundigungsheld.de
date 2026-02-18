"use client"

import { useState, useMemo, useRef, useCallback } from "react"
import {
  Search,
  ChevronRight,
  Copy,
  Download,
  Check,
  AlertCircle,
  Info,
  Building2,
  User,
  FileText,
  ArrowLeft,
  ArrowRight,
  Archive,
  Printer,
  Mail,
  CalendarPlus,
  FileDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  companies,
  CATEGORY_LABELS,
  type Company,
  type CompanyCategory,
} from "@/lib/companies"
import {
  generateKuendigungsschreiben,
  GRUND_LABELS,
  type TemplateData,
  type KuendigungsGrund,
} from "@/lib/templates"
import { saveToArchiv } from "@/lib/archive"
import {
  generatePdf,
  openMailto,
  printKundigung,
  addCalendarReminder,
} from "@/lib/pdf-generator"

/* ─── Constants ─── */

type Step = "company" | "details" | "preview"

const STEPS = [
  { key: "company" as Step, label: "Anbieter", icon: Building2 },
  { key: "details" as Step, label: "Details", icon: User },
  { key: "preview" as Step, label: "Vorschau", icon: FileText },
] as const

const COMPANIES_PER_PAGE = 12

const ANREDE_OPTIONS = ["Herr", "Frau", "Divers"] as const

const INITIAL_FORM: TemplateData = {
  anrede: "Herr",
  vorname: "",
  nachname: "",
  strasse: "",
  plz: "",
  ort: "",
  kundennummer: "",
  vertragsnummer: "",
  grund: "ordentlich",
  kuendigungZum: "naechstmoeglich",
  kuendigungsDatum: "",
  zusatztext: "",
}

const ZUSATZ_PLACEHOLDERS: Record<string, string> = {
  umzug: "Neue Straße, PLZ Ort",
  todesfall: "Vor- und Nachname",
  default: "Bitte Grund angeben...",
}

const ZUSATZ_LABELS: Record<string, string> = {
  umzug: "Neue Adresse",
  todesfall: "Name des Verstorbenen",
  default: "Begründung",
}

const GRUENDE_MIT_ZUSATZ = ["sonderkuendigung", "fristlos", "umzug", "todesfall"]

/* ─── Reusable sub-components ─── */

function ToggleButton({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      } ${className}`}
    >
      {children}
    </button>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-destructive" role="alert">
      <AlertCircle className="h-3 w-3" /> {message}
    </p>
  )
}

function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
  className = "",
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && " *"}
      </Label>
      <div className="mt-1.5">{children}</div>
      <FieldError message={error} />
    </div>
  )
}

function InfoBanner({
  icon: Icon,
  variant = "primary",
  children,
  action,
}: {
  icon: React.ElementType
  variant?: "primary" | "accent"
  children: React.ReactNode
  action?: React.ReactNode
}) {
  const styles =
    variant === "primary"
      ? "border-primary/20 bg-primary/5"
      : "border-accent/20 bg-accent/5"
  const iconColor = variant === "primary" ? "text-primary" : "text-accent"

  return (
    <div className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${styles}`}>
      <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />
      <div className="min-w-0 flex-1">{children}</div>
      {action}
    </div>
  )
}

/* ─── Main Component ─── */

export function KundigungGenerator() {
  const [step, setStep] = useState<Step>("company")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<CompanyCategory | "alle">("alle")
  const [formData, setFormData] = useState<TemplateData>(INITIAL_FORM)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [companyPage, setCompanyPage] = useState(0)
  const previewRef = useRef<HTMLPreElement>(null)

  /* ─── Derived state ─── */

  const filteredCompanies = useMemo(() => {
    const q = search.toLowerCase()
    return companies.filter((c) => {
      const matchesSearch =
        !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      const matchesCategory = activeCategory === "alle" || c.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const categories = useMemo(
    () => [...new Set(companies.map((c) => c.category))] as CompanyCategory[],
    []
  )

  const totalPages = Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE)

  const pagedCompanies = useMemo(
    () =>
      filteredCompanies.slice(
        companyPage * COMPANIES_PER_PAGE,
        (companyPage + 1) * COMPANIES_PER_PAGE
      ),
    [filteredCompanies, companyPage]
  )

  const letterText = useMemo(() => {
    if (!selectedCompany) return ""
    return generateKuendigungsschreiben(formData, selectedCompany.name, selectedCompany.address)
  }, [formData, selectedCompany])

  const needsZusatztext = GRUENDE_MIT_ZUSATZ.includes(formData.grund)

  /* ─── Callbacks ─── */

  const updateField = useCallback(
    (field: keyof TemplateData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    },
    [errors]
  )

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {}
    if (!formData.vorname.trim()) e.vorname = "Vorname ist erforderlich"
    if (!formData.nachname.trim()) e.nachname = "Nachname ist erforderlich"
    if (!formData.strasse.trim()) e.strasse = "Straße ist erforderlich"
    if (!formData.plz.trim()) e.plz = "PLZ ist erforderlich"
    if (!formData.ort.trim()) e.ort = "Ort ist erforderlich"
    if (formData.kuendigungZum === "datum" && !formData.kuendigungsDatum.trim()) {
      e.kuendigungsDatum = "Bitte Datum angeben"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }, [formData])

  const selectCompany = useCallback((company: Company) => {
    setSelectedCompany(company)
    setStep("details")
    setErrors({})
  }, [])

  const goToPreview = useCallback(() => {
    if (validate()) setStep("preview")
  }, [validate])

  const navigateStep = useCallback(
    (target: Step) => {
      if (target === "company") setStep("company")
      else if (target === "details" && selectedCompany) setStep("details")
      else if (target === "preview" && selectedCompany && validate()) setStep("preview")
    },
    [selectedCompany, validate]
  )

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(letterText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      if (previewRef.current) {
        const range = document.createRange()
        range.selectNodeContents(previewRef.current)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }
  }, [letterText])

  const downloadText = useCallback(() => {
    const blob = new Blob([letterText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Kuendigung_${selectedCompany?.name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")}_${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [letterText, selectedCompany])

  const handleSave = useCallback(() => {
    if (!selectedCompany) return
    const now = new Date()
    saveToArchiv({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      companyName: selectedCompany.name,
      companyCategory: selectedCompany.category,
      grund: formData.grund,
      grundLabel: GRUND_LABELS[formData.grund as KuendigungsGrund],
      vorname: formData.vorname,
      nachname: formData.nachname,
      datum: now.toISOString(),
      kuendigungZum:
        formData.kuendigungZum === "naechstmoeglich"
          ? "Nächstmöglich"
          : formData.kuendigungsDatum,
      text: letterText,
      status: "erstellt",
      notiz: "",
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [selectedCompany, formData, letterText])

  const handleCalendarReminder = useCallback(() => {
    if (!selectedCompany) return
    const today = new Date()
    const deadline = new Date(today)
    deadline.setMonth(deadline.getMonth() + 1)
    addCalendarReminder(
      selectedCompany.name,
      deadline.toISOString(),
      `Kündigungsbestätigung von ${selectedCompany.name} prüfen. Kündigung erstellt am ${today.toLocaleDateString("de-DE")}.`
    )
  }, [selectedCompany])

  const resetAll = useCallback(() => {
    setStep("company")
    setSelectedCompany(null)
    setSearch("")
    setActiveCategory("alle")
    setFormData(INITIAL_FORM)
    setErrors({})
    setSaved(false)
    setCompanyPage(0)
  }, [])

  const setSearchAndReset = useCallback((value: string) => {
    setSearch(value)
    setCompanyPage(0)
  }, [])

  const setCategoryAndReset = useCallback((cat: CompanyCategory | "alle") => {
    setActiveCategory(cat)
    setCompanyPage(0)
  }, [])

  /* ─── Render ─── */

  return (
    <section id="generator" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Generator
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">Kündigungsschreiben erstellen</span>
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Wählen Sie Ihren Anbieter, füllen Sie das Formular aus und erhalten Sie
            sofort Ihr fertiges Kündigungsschreiben.
          </p>
        </div>

        {/* Step Indicator */}
        <nav
          aria-label="Fortschritt"
          className="mx-auto mt-10 flex max-w-lg items-center justify-center gap-2"
        >
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <button
                type="button"
                aria-current={step === s.key ? "step" : undefined}
                onClick={() => navigateStep(s.key)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                  step === s.key
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : s.key === "company" ||
                        (s.key === "details" && selectedCompany) ||
                        (s.key === "preview" && step === "preview")
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <s.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
              {i < STEPS.length - 1 && <div className="h-px w-6 bg-border sm:w-10" />}
            </div>
          ))}
        </nav>

        {/* ─── Step 1: Company Selection ─── */}
        {step === "company" && (
          <div className="mx-auto mt-10 max-w-4xl">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Unternehmen suchen (z.B. Telekom, Vodafone, Netflix...)"
                value={search}
                onChange={(e) => setSearchAndReset(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-4 pl-12 pr-4 text-base text-foreground shadow-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Category filters */}
            <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Kategorien">
              <ToggleButton
                active={activeCategory === "alle"}
                onClick={() => setCategoryAndReset("alle")}
                className="rounded-full px-3.5 py-1.5"
              >
                Alle
              </ToggleButton>
              {categories.map((cat) => (
                <ToggleButton
                  key={cat}
                  active={activeCategory === cat}
                  onClick={() => setCategoryAndReset(cat)}
                  className="rounded-full px-3.5 py-1.5"
                >
                  {CATEGORY_LABELS[cat]}
                </ToggleButton>
              ))}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {filteredCompanies.length} Unternehmen gefunden
            </p>

            {/* Company grid */}
            {pagedCompanies.length > 0 ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {pagedCompanies.map((company) => (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() => selectCompany(company)}
                    className="group flex flex-col items-start rounded-xl border border-border/60 bg-background p-4 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                  >
                    <div className="flex w-full items-start justify-between">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {CATEGORY_LABELS[company.category]}
                    </Badge>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Frist: {company.kuendigungsfrist}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-10 flex flex-col items-center text-center">
                <Search className="h-10 w-10 text-muted-foreground/40" />
                <p className="mt-3 font-medium text-muted-foreground">
                  Kein Unternehmen gefunden
                </p>
                <p className="mt-1 text-sm text-muted-foreground/70">
                  Versuchen Sie einen anderen Suchbegriff oder wählen Sie eine Kategorie.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={companyPage === 0}
                  onClick={() => setCompanyPage((p) => p - 1)}
                  className="gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Zurück
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCompanyPage(i)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        companyPage === i
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={companyPage >= totalPages - 1}
                  onClick={() => setCompanyPage((p) => p + 1)}
                  className="gap-1.5"
                >
                  Weiter <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ─── Step 2: Form Details ─── */}
        {step === "details" && selectedCompany && (
          <div className="mx-auto mt-10 max-w-4xl">
            {/* Company info banner */}
            <InfoBanner
              icon={Building2}
              action={
                <Button variant="ghost" size="sm" onClick={() => setStep("company")}>
                  Ändern
                </Button>
              }
            >
              <p className="font-semibold text-foreground">{selectedCompany.name}</p>
              <p className="text-sm text-muted-foreground">
                Kündigungsfrist: {selectedCompany.kuendigungsfrist} · Mindestlaufzeit:{" "}
                {selectedCompany.mindestlaufzeit}
              </p>
            </InfoBanner>

            {selectedCompany.hinweise && (
              <InfoBanner icon={Info} variant="accent">
                <p className="text-sm leading-relaxed text-foreground/80">
                  {selectedCompany.hinweise}
                </p>
              </InfoBanner>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left column: Personal data */}
              <div className="space-y-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Persönliche Daten
                </h3>

                <div>
                  <Label className="text-sm font-medium">Anrede</Label>
                  <div className="mt-1.5 flex gap-2">
                    {ANREDE_OPTIONS.map((a) => (
                      <ToggleButton
                        key={a}
                        active={formData.anrede === a}
                        onClick={() => updateField("anrede", a)}
                        className="py-2"
                      >
                        {a}
                      </ToggleButton>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Vorname" htmlFor="vorname" required error={errors.vorname}>
                    <Input
                      id="vorname"
                      value={formData.vorname}
                      onChange={(e) => updateField("vorname", e.target.value)}
                      placeholder="Max"
                      className={errors.vorname ? "border-destructive" : ""}
                    />
                  </FormField>
                  <FormField label="Nachname" htmlFor="nachname" required error={errors.nachname}>
                    <Input
                      id="nachname"
                      value={formData.nachname}
                      onChange={(e) => updateField("nachname", e.target.value)}
                      placeholder="Mustermann"
                      className={errors.nachname ? "border-destructive" : ""}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Straße und Hausnummer"
                  htmlFor="strasse"
                  required
                  error={errors.strasse}
                >
                  <Input
                    id="strasse"
                    value={formData.strasse}
                    onChange={(e) => updateField("strasse", e.target.value)}
                    placeholder="Musterstraße 1"
                    className={errors.strasse ? "border-destructive" : ""}
                  />
                </FormField>

                <div className="grid grid-cols-3 gap-3">
                  <FormField label="PLZ" htmlFor="plz" required error={errors.plz}>
                    <Input
                      id="plz"
                      value={formData.plz}
                      onChange={(e) => updateField("plz", e.target.value)}
                      placeholder="10115"
                      maxLength={5}
                      inputMode="numeric"
                      className={errors.plz ? "border-destructive" : ""}
                    />
                  </FormField>
                  <FormField
                    label="Ort"
                    htmlFor="ort"
                    required
                    error={errors.ort}
                    className="col-span-2"
                  >
                    <Input
                      id="ort"
                      value={formData.ort}
                      onChange={(e) => updateField("ort", e.target.value)}
                      placeholder="Berlin"
                      className={errors.ort ? "border-destructive" : ""}
                    />
                  </FormField>
                </div>
              </div>

              {/* Right column: Contract info */}
              <div className="space-y-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Vertragsinformationen
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Kundennummer" htmlFor="kundennummer">
                    <Input
                      id="kundennummer"
                      value={formData.kundennummer}
                      onChange={(e) => updateField("kundennummer", e.target.value)}
                      placeholder="Optional"
                    />
                  </FormField>
                  <FormField label="Vertragsnummer" htmlFor="vertragsnummer">
                    <Input
                      id="vertragsnummer"
                      value={formData.vertragsnummer}
                      onChange={(e) => updateField("vertragsnummer", e.target.value)}
                      placeholder="Optional"
                    />
                  </FormField>
                </div>

                <div>
                  <Label className="text-sm font-medium">Kündigungsgrund</Label>
                  <div className="mt-1.5 grid grid-cols-1 gap-2">
                    {(Object.keys(GRUND_LABELS) as KuendigungsGrund[]).map((grund) => (
                      <ToggleButton
                        key={grund}
                        active={formData.grund === grund}
                        onClick={() => updateField("grund", grund)}
                        className="text-left"
                      >
                        {GRUND_LABELS[grund]}
                      </ToggleButton>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Kündigung zum</Label>
                  <div className="mt-1.5 flex gap-2">
                    <ToggleButton
                      active={formData.kuendigungZum === "naechstmoeglich"}
                      onClick={() => updateField("kuendigungZum", "naechstmoeglich")}
                      className="flex-1"
                    >
                      Nächstmöglich
                    </ToggleButton>
                    <ToggleButton
                      active={formData.kuendigungZum === "datum"}
                      onClick={() => updateField("kuendigungZum", "datum")}
                      className="flex-1"
                    >
                      Bestimmtes Datum
                    </ToggleButton>
                  </div>
                  {formData.kuendigungZum === "datum" && (
                    <div className="mt-2">
                      <Input
                        type="date"
                        value={formData.kuendigungsDatum}
                        onChange={(e) => updateField("kuendigungsDatum", e.target.value)}
                        className={errors.kuendigungsDatum ? "border-destructive" : ""}
                      />
                      <FieldError message={errors.kuendigungsDatum} />
                    </div>
                  )}
                </div>

                {needsZusatztext && (
                  <FormField
                    label={ZUSATZ_LABELS[formData.grund] ?? ZUSATZ_LABELS.default}
                    htmlFor="zusatztext"
                  >
                    <Textarea
                      id="zusatztext"
                      value={formData.zusatztext}
                      onChange={(e) => updateField("zusatztext", e.target.value)}
                      placeholder={
                        ZUSATZ_PLACEHOLDERS[formData.grund] ?? ZUSATZ_PLACEHOLDERS.default
                      }
                      rows={3}
                      className="resize-none"
                    />
                  </FormField>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep("company")} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Zurück
              </Button>
              <Button onClick={goToPreview} className="gap-2">
                Vorschau anzeigen <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ─── Step 3: Preview ─── */}
        {step === "preview" && selectedCompany && (
          <div className="mx-auto mt-10 max-w-4xl">
            <InfoBanner icon={FileText}>
              <p className="font-semibold text-foreground">
                Kündigung an {selectedCompany.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {GRUND_LABELS[formData.grund as KuendigungsGrund]}
              </p>
            </InfoBanner>

            {/* Letter card */}
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-lg">
              <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span className="text-sm font-medium text-muted-foreground">
                  Kündigungsschreiben
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      label: copied ? "Kopiert!" : "Kopieren",
                      icon: copied ? Check : Copy,
                      onClick: copyToClipboard,
                    },
                    { label: "TXT", icon: Download, onClick: downloadText },
                    {
                      label: "PDF",
                      icon: FileDown,
                      onClick: () => generatePdf(letterText, selectedCompany.name),
                    },
                    {
                      label: "Drucken",
                      icon: Printer,
                      onClick: () => printKundigung(letterText),
                    },
                    {
                      label: "E-Mail",
                      icon: Mail,
                      onClick: () => openMailto(letterText, selectedCompany.name),
                    },
                  ].map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      onClick={action.onClick}
                      className="gap-1.5 text-xs"
                    >
                      <action.icon className="h-3.5 w-3.5" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
              <pre
                ref={previewRef}
                className="whitespace-pre-wrap p-6 font-sans text-sm leading-relaxed text-foreground sm:p-8"
              >
                {letterText}
              </pre>
            </div>

            {/* Actions below letter */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={handleSave} disabled={saved} className="gap-1.5">
                {saved ? <Check className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                {saved ? "Im Archiv gespeichert!" : "Im Archiv speichern"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCalendarReminder}
                className="gap-1.5"
              >
                <CalendarPlus className="h-4 w-4" /> Erinnerung setzen
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep("details")} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Bearbeiten
              </Button>
              <Button variant="outline" onClick={resetAll}>
                Neue Kündigung erstellen
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}