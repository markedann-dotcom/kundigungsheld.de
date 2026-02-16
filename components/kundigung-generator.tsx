"use client"

import { useState, useMemo, useRef } from "react"
import {
  Search,
  ChevronDown,
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
import { companies, CATEGORY_LABELS, type Company, type CompanyCategory } from "@/lib/companies"
import {
  generateKuendigungsschreiben,
  GRUND_LABELS,
  type TemplateData,
  type KuendigungsGrund,
} from "@/lib/templates"
import { saveToArchiv } from "@/lib/archive"
import { generatePdf, openMailto, printKundigung, addCalendarReminder } from "@/lib/pdf-generator"

type Step = "company" | "details" | "preview"

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
  const COMPANIES_PER_PAGE = 12
  const previewRef = useRef<HTMLPreElement>(null)

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === "alle" || c.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const categories = useMemo(() => {
    const cats = new Set(companies.map((c) => c.category))
    return Array.from(cats) as CompanyCategory[]
  }, [])

  function selectCompany(company: Company) {
    setSelectedCompany(company)
    setStep("details")
    setErrors({})
  }

  function updateField(field: keyof TemplateData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {}
    if (!formData.vorname.trim()) newErrors.vorname = "Vorname ist erforderlich"
    if (!formData.nachname.trim()) newErrors.nachname = "Nachname ist erforderlich"
    if (!formData.strasse.trim()) newErrors.strasse = "Straße ist erforderlich"
    if (!formData.plz.trim()) newErrors.plz = "PLZ ist erforderlich"
    if (!formData.ort.trim()) newErrors.ort = "Ort ist erforderlich"
    if (formData.kuendigungZum === "datum" && !formData.kuendigungsDatum.trim()) {
      newErrors.kuendigungsDatum = "Bitte Datum angeben"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function goToPreview() {
    if (validateForm()) {
      setStep("preview")
    }
  }

  function generatedText(): string {
    if (!selectedCompany) return ""
    return generateKuendigungsschreiben(formData, selectedCompany.name, selectedCompany.address)
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback: select text */
      if (previewRef.current) {
        const range = document.createRange()
        range.selectNodeContents(previewRef.current)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }
  }

  function downloadText() {
    const text = generatedText()
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Kuendigung_${selectedCompany?.name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")}_${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function handleSaveToArchiv() {
    if (!selectedCompany) return
    const today = new Date()
    saveToArchiv({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      companyName: selectedCompany.name,
      companyCategory: selectedCompany.category,
      grund: formData.grund,
      grundLabel: GRUND_LABELS[formData.grund as KuendigungsGrund],
      vorname: formData.vorname,
      nachname: formData.nachname,
      datum: today.toISOString(),
      kuendigungZum:
        formData.kuendigungZum === "naechstmoeglich"
          ? "Nächstmöglich"
          : formData.kuendigungsDatum,
      text: generatedText(),
      status: "erstellt",
      notiz: "",
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function resetAll() {
    setStep("company")
    setSelectedCompany(null)
    setSearch("")
    setActiveCategory("alle")
    setFormData(INITIAL_FORM)
    setErrors({})
    setSaved(false)
  }

  return (
    <section id="generator" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Generator
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">Kündigungsschreiben erstellen</span>
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Wählen Sie Ihren Anbieter, füllen Sie das Formular aus und erhalten
            Sie sofort Ihr fertiges Kündigungsschreiben.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mx-auto mt-10 flex max-w-lg items-center justify-center gap-2">
          {[
            { key: "company" as Step, label: "Anbieter", icon: Building2 },
            { key: "details" as Step, label: "Details", icon: User },
            { key: "preview" as Step, label: "Vorschau", icon: FileText },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (s.key === "company") setStep("company")
                  else if (s.key === "details" && selectedCompany) setStep("details")
                  else if (s.key === "preview" && selectedCompany && validateForm()) setStep("preview")
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                  step === s.key
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : s.key === "company" ||
                        (s.key === "details" && selectedCompany) ||
                        (s.key === "preview" && step === "preview")
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <s.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
              {i < 2 && (
                <div className="h-px w-6 bg-border sm:w-10" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Company Selection */}
        {step === "company" && (
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Unternehmen suchen (z.B. Telekom, Vodafone, Netflix...)"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCompanyPage(0) }}
                className="w-full rounded-xl border border-border bg-background py-4 pl-12 pr-4 text-base text-foreground shadow-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveCategory("alle"); setCompanyPage(0) }}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === "alle"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                Alle
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setCompanyPage(0) }}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* Showing count */}
            <p className="mt-4 text-xs text-muted-foreground">
              {filteredCompanies.length} Unternehmen gefunden
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies
                .slice(companyPage * COMPANIES_PER_PAGE, (companyPage + 1) * COMPANIES_PER_PAGE)
                .map((company) => (
                <button
                  key={company.id}
                  onClick={() => selectCompany(company)}
                  className="group flex flex-col items-start rounded-xl border border-border/60 bg-background p-4 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                >
                  <div className="flex w-full items-start justify-between">
                    <h3 className="font-semibold text-foreground group-hover:text-primary">
                      {company.name}
                    </h3>
                    <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
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

            {/* Pagination */}
            {filteredCompanies.length > COMPANIES_PER_PAGE && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={companyPage === 0}
                  onClick={() => setCompanyPage((p) => Math.max(0, p - 1))}
                  className="gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Zuruck
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE) }).map((_, i) => (
                    <button
                      key={i}
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
                  disabled={companyPage >= Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE) - 1}
                  onClick={() => setCompanyPage((p) => p + 1)}
                  className="gap-1.5"
                >
                  Weiter <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {filteredCompanies.length === 0 && (
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
          </div>
        )}

        {/* Step 2: Form Details */}
        {step === "details" && selectedCompany && (
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <Building2 className="h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{selectedCompany.name}</p>
                <p className="text-sm text-muted-foreground">
                  Kündigungsfrist: {selectedCompany.kuendigungsfrist} | Mindestlaufzeit:{" "}
                  {selectedCompany.mindestlaufzeit}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setStep("company")}>
                Ändern
              </Button>
            </div>

            {selectedCompany.hinweise && (
              <div className="mb-6 flex gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <Info className="h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {selectedCompany.hinweise}
                </p>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Persönliche Daten
                </h3>

                <div>
                  <Label className="text-sm font-medium">Anrede</Label>
                  <div className="mt-1.5 flex gap-2">
                    {(["Herr", "Frau", "Divers"] as const).map((a) => (
                      <button
                        key={a}
                        onClick={() => updateField("anrede", a)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          formData.anrede === a
                            ? "bg-primary text-white shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="vorname" className="text-sm font-medium">
                      Vorname *
                    </Label>
                    <Input
                      id="vorname"
                      value={formData.vorname}
                      onChange={(e) => updateField("vorname", e.target.value)}
                      placeholder="Max"
                      className={`mt-1.5 ${errors.vorname ? "border-destructive" : ""}`}
                    />
                    {errors.vorname && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.vorname}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="nachname" className="text-sm font-medium">
                      Nachname *
                    </Label>
                    <Input
                      id="nachname"
                      value={formData.nachname}
                      onChange={(e) => updateField("nachname", e.target.value)}
                      placeholder="Mustermann"
                      className={`mt-1.5 ${errors.nachname ? "border-destructive" : ""}`}
                    />
                    {errors.nachname && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.nachname}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="strasse" className="text-sm font-medium">
                    Straße und Hausnummer *
                  </Label>
                  <Input
                    id="strasse"
                    value={formData.strasse}
                    onChange={(e) => updateField("strasse", e.target.value)}
                    placeholder="Musterstraße 1"
                    className={`mt-1.5 ${errors.strasse ? "border-destructive" : ""}`}
                  />
                  {errors.strasse && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> {errors.strasse}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="plz" className="text-sm font-medium">
                      PLZ *
                    </Label>
                    <Input
                      id="plz"
                      value={formData.plz}
                      onChange={(e) => updateField("plz", e.target.value)}
                      placeholder="10115"
                      maxLength={5}
                      className={`mt-1.5 ${errors.plz ? "border-destructive" : ""}`}
                    />
                    {errors.plz && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.plz}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="ort" className="text-sm font-medium">
                      Ort *
                    </Label>
                    <Input
                      id="ort"
                      value={formData.ort}
                      onChange={(e) => updateField("ort", e.target.value)}
                      placeholder="Berlin"
                      className={`mt-1.5 ${errors.ort ? "border-destructive" : ""}`}
                    />
                    {errors.ort && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.ort}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Vertragsinformationen
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="kundennummer" className="text-sm font-medium">
                      Kundennummer
                    </Label>
                    <Input
                      id="kundennummer"
                      value={formData.kundennummer}
                      onChange={(e) => updateField("kundennummer", e.target.value)}
                      placeholder="Optional"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vertragsnummer" className="text-sm font-medium">
                      Vertragsnummer
                    </Label>
                    <Input
                      id="vertragsnummer"
                      value={formData.vertragsnummer}
                      onChange={(e) => updateField("vertragsnummer", e.target.value)}
                      placeholder="Optional"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Kündigungsgrund</Label>
                  <div className="mt-1.5 grid grid-cols-1 gap-2">
                    {(Object.keys(GRUND_LABELS) as KuendigungsGrund[]).map((grund) => (
                      <button
                        key={grund}
                        onClick={() => updateField("grund", grund)}
                        className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
                          formData.grund === grund
                            ? "bg-primary text-white shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                      >
                        {GRUND_LABELS[grund]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Kündigung zum</Label>
                  <div className="mt-1.5 flex gap-2">
                    <button
                      onClick={() => updateField("kuendigungZum", "naechstmoeglich")}
                      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                        formData.kuendigungZum === "naechstmoeglich"
                          ? "bg-primary text-white shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Nächstmöglich
                    </button>
                    <button
                      onClick={() => updateField("kuendigungZum", "datum")}
                      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                        formData.kuendigungZum === "datum"
                          ? "bg-primary text-white shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Bestimmtes Datum
                    </button>
                  </div>
                  {formData.kuendigungZum === "datum" && (
                    <div className="mt-2">
                      <Input
                        type="date"
                        value={formData.kuendigungsDatum}
                        onChange={(e) => updateField("kuendigungsDatum", e.target.value)}
                        className={errors.kuendigungsDatum ? "border-destructive" : ""}
                      />
                      {errors.kuendigungsDatum && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                          <AlertCircle className="h-3 w-3" /> {errors.kuendigungsDatum}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {(formData.grund === "sonderkuendigung" ||
                  formData.grund === "fristlos" ||
                  formData.grund === "umzug" ||
                  formData.grund === "todesfall") && (
                  <div>
                    <Label htmlFor="zusatztext" className="text-sm font-medium">
                      {formData.grund === "umzug"
                        ? "Neue Adresse"
                        : formData.grund === "todesfall"
                          ? "Name des Verstorbenen"
                          : "Begründung"}
                    </Label>
                    <Textarea
                      id="zusatztext"
                      value={formData.zusatztext}
                      onChange={(e) => updateField("zusatztext", e.target.value)}
                      placeholder={
                        formData.grund === "umzug"
                          ? "Neue Straße, PLZ Ort"
                          : formData.grund === "todesfall"
                            ? "Vor- und Nachname"
                            : "Bitte Grund angeben..."
                      }
                      rows={3}
                      className="mt-1.5 resize-none"
                    />
                  </div>
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

        {/* Step 3: Preview */}
        {step === "preview" && selectedCompany && (
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  Kündigung an {selectedCompany.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {GRUND_LABELS[formData.grund]}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-lg">
              <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span className="text-sm font-medium text-muted-foreground">Kündigungsschreiben</span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1.5 text-xs">
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Kopiert!" : "Kopieren"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadText} className="gap-1.5 text-xs">
                    <Download className="h-3.5 w-3.5" /> TXT
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generatePdf(generatedText(), selectedCompany?.name ?? "")} className="gap-1.5 text-xs">
                    <FileDown className="h-3.5 w-3.5" /> PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => printKundigung(generatedText())} className="gap-1.5 text-xs">
                    <Printer className="h-3.5 w-3.5" /> Drucken
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openMailto(generatedText(), selectedCompany?.name ?? "")} className="gap-1.5 text-xs">
                    <Mail className="h-3.5 w-3.5" /> E-Mail
                  </Button>
                </div>
              </div>
              <pre
                ref={previewRef}
                className="whitespace-pre-wrap p-6 font-sans text-sm leading-relaxed text-foreground sm:p-8"
              >
                {generatedText()}
              </pre>
            </div>

            {/* Action bar below the letter */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveToArchiv}
                  disabled={saved}
                  className="gap-1.5"
                >
                  {saved ? <Check className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                  {saved ? "Im Archiv gespeichert!" : "Im Archiv speichern"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date()
                    const deadline = new Date(today)
                    deadline.setMonth(deadline.getMonth() + 1)
                    addCalendarReminder(
                      selectedCompany?.name ?? "",
                      deadline.toISOString(),
                      `Kündigungsbestätigung von ${selectedCompany?.name} prüfen. Kündigung erstellt am ${today.toLocaleDateString("de-DE")}.`
                    )
                  }}
                  className="gap-1.5"
                >
                  <CalendarPlus className="h-4 w-4" /> Erinnerung setzen
                </Button>
              </div>
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
