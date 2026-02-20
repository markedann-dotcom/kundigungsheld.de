"use client"

import { useState, useMemo, useRef, useCallback, useEffect } from "react"
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
  Clock,
  Sparkles,
  X,
  Package,
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
  generatePdfBlob,
  openMailto,
  printKundigung,
  addCalendarReminder,
  showLoading,
  hideLoading,
  updateLoadingText,
} from "@/lib/pdf-generator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { generateCompanyLogo } from "@/lib/logo-generator"
import { useI18n } from "@/contexts/i18n-context"

/* ─── Constants ─── */

type Step = "company" | "details" | "preview"

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
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-foreground text-background shadow-elegant"
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
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive animate-in fade-in slide-in-from-top-1" role="alert">
      <AlertCircle className="h-3.5 w-3.5" /> {message}
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
  hint,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
  hint?: string
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      <div className="mt-2">{children}</div>
      <FieldError message={error} />
    </div>
  )
}

function InfoBanner({
  icon: Icon,
  children,
  onClose,
}: {
  icon: React.ElementType
  children: React.ReactNode
  onClose?: () => void
}) {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-4 animate-in fade-in slide-in-from-top-2">
      <Icon className="h-5 w-5 shrink-0 text-foreground" />
      <div className="min-w-0 flex-1 text-sm font-medium text-foreground/80">{children}</div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

/* ─── Main Component ─── */

export function KundigungGenerator() {
  const { t } = useI18n()
  const [step, setStep] = useState<Step>("company")
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([])
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<CompanyCategory | "alle">("alle")
  const [formData, setFormData] = useLocalStorage<TemplateData>("kundigung-draft", INITIAL_FORM)
  const [copied, setCopied] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [companyPage, setCompanyPage] = useState(0)
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | null>(null)
  const [activePreviewIndex, setActivePreviewIndex] = useState(0)
  const previewRef = useRef<HTMLPreElement>(null)

  const STEPS = useMemo(() => [
    { key: "company" as Step, label: "Anbieter", icon: Building2 },
    { key: "details" as Step, label: "Details", icon: User },
    { key: "preview" as Step, label: "Vorschau", icon: FileText },
  ], [])

  useEffect(() => {
    if (step === "details" && selectedCompanies.length > 0) {
      setAutoSaveStatus("saving")
      const timer = setTimeout(() => setAutoSaveStatus("saved"), 500)
      return () => clearTimeout(timer)
    }
  }, [formData, step, selectedCompanies])

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

  const letters = useMemo(() => {
    return selectedCompanies.map((company) => ({
      company,
      text: generateKuendigungsschreiben(formData, company.name, company.address),
    }))
  }, [formData, selectedCompanies])

  const currentLetter = letters[activePreviewIndex]

  const needsZusatztext = GRUENDE_MIT_ZUSATZ.includes(formData.grund)

  /* ─── Callbacks ─── */

  const toggleCompany = useCallback((company: Company) => {
    setSelectedCompanies((prev) => {
      const isSelected = prev.some((c) => c.id === company.id)
      if (isSelected) return prev.filter((c) => c.id !== company.id)
      return [...prev, company]
    })
  }, [])

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
    [errors, setFormData]
  )

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {}
    if (!formData.vorname.trim()) e.vorname = "Vorname ist erforderlich"
    if (!formData.nachname.trim()) e.nachname = "Nachname ist erforderlich"
    if (!formData.strasse.trim()) e.strasse = "Straße ist erforderlich"
    if (!formData.plz.trim()) e.plz = "PLZ ist erforderlich"
    else if (!/^\d{5}$/.test(formData.plz)) e.plz = "PLZ muss 5 Ziffern haben"
    if (!formData.ort.trim()) e.ort = "Ort ist erforderlich"
    if (formData.kuendigungZum === "datum" && !formData.kuendigungsDatum.trim()) {
      e.kuendigungsDatum = "Bitte Datum angeben"
    }
    if (needsZusatztext && !formData.zusatztext.trim()) {
      e.zusatztext = "Zusatzinformation ist erforderlich"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }, [formData, needsZusatztext])

  const goToPreview = useCallback(() => {
    if (validate()) {
      setStep("preview")
      setActivePreviewIndex(0)
    }
  }, [validate])

  const navigateStep = useCallback(
    (target: Step) => {
      if (target === "company") setStep("company")
      else if (target === "details" && selectedCompanies.length > 0) setStep("details")
      else if (target === "preview" && selectedCompanies.length > 0 && validate()) setStep("preview")
    },
    [selectedCompanies, validate]
  )

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      /* fallback */
    }
  }, [])

  const downloadAllAsZip = useCallback(async () => {
    showLoading()
    try {
      const JSZip = (await import("jszip")).default
      const { saveAs } = await import("file-saver")

      const zip = new JSZip()

      for (let i = 0; i < letters.length; i++) {
        const { company, text } = letters[i]
        updateLoadingText(`Erstelle PDF ${i + 1} von ${letters.length}: ${company.name}`)
        const safeName = company.name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")
        const pdfBlob = await generatePdfBlob(text, company.name)
        zip.file(`Kuendigung_${safeName}.pdf`, pdfBlob)
      }

      updateLoadingText("Erstelle ZIP-Datei...")
      const blob = await zip.generateAsync({ type: "blob" })
      saveAs(blob, `Kundigungen_${new Date().toISOString().slice(0, 10)}.zip`)
    } catch (error) {
      console.error("ZIP error:", error)
      alert("Fehler beim Erstellen der ZIP-Datei.")
    } finally {
      hideLoading()
    }
  }, [letters])

  const downloadSingleText = useCallback((company: Company, text: string) => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Kuendigung_${company.name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")}_${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const handleSaveAllToArchiv = useCallback(() => {
    letters.forEach(({ company, text }) => {
      saveToArchiv({
        company: company.name,
        date: new Date().toISOString(),
        text,
        data: formData,
      })
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [letters, formData])

  /* ─── Render Steps ─── */

  const renderCompanyStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-4xl font-bold text-foreground tracking-tight">
          Wählen Sie Anbieter aus
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Wählen Sie <span className="font-semibold text-foreground">einen oder mehrere Anbieter</span> aus — alle Kündigungen mit einem Klick.
        </p>
      </div>

      {selectedCompanies.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-2xl border border-border/50">
            <span className="text-sm font-semibold text-muted-foreground self-center mr-1">
              Ausgewählt ({selectedCompanies.length}):
            </span>
            {selectedCompanies.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleCompany(c)}
                className="flex items-center gap-1.5 rounded-full bg-foreground text-background px-3 py-1 text-xs font-semibold hover:bg-foreground/80 transition-colors"
              >
                {c.name}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={() => setSelectedCompanies([])}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Alle entfernen
            </button>
          </div>
        </div>
      )}

      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Anbieter suchen (z.B. Vodafone, Netflix, O2...)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCompanyPage(0)
          }}
          className="h-14 pl-14 pr-4 text-base rounded-full border-border/60 focus:border-foreground/20 transition-colors duration-200 shadow-minimal bg-card"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        <ToggleButton active={activeCategory === "alle"} onClick={() => {
          setActiveCategory("alle")
          setCompanyPage(0)
        }}>
          Alle ({companies.length})
        </ToggleButton>
        {categories.map((cat) => {
          const count = companies.filter((c) => c.category === cat).length
          return (
            <ToggleButton
              key={cat}
              active={activeCategory === cat}
              onClick={() => {
                setActiveCategory(cat)
                setCompanyPage(0)
              }}
            >
              {CATEGORY_LABELS[cat]} ({count})
            </ToggleButton>
          )
        })}
      </div>

      {filteredCompanies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {pagedCompanies.map((company, idx) => {
              const isSelected = selectedCompanies.some((c) => c.id === company.id)
              return (
                <button
                  key={company.id}
                  onClick={() => toggleCompany(company)}
                  className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 hover:shadow-card hover:scale-[1.01] animate-scale-in ${
                    isSelected
                      ? "border-foreground bg-foreground/5 shadow-elegant"
                      : "border-border/50 bg-card hover:bg-muted/30 hover:border-foreground/20"
                  }`}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div className={`absolute top-3 right-3 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-foreground border-foreground"
                      : "border-border/50 group-hover:border-foreground/30"
                  }`}>
                    {isSelected && <Check className="h-3.5 w-3.5 text-background" />}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-start justify-between pr-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl overflow-hidden border border-border/50 group-hover:border-foreground/20 group-hover:scale-105 transition-all duration-300 bg-muted/30">
                        <img
                          src={generateCompanyLogo(company.name, company.category)}
                          alt={`${company.name} logo`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-semibold uppercase bg-muted text-muted-foreground border border-border/50 mb-2">
                      {CATEGORY_LABELS[company.category]}
                    </Badge>
                    <h3 className="font-semibold text-base text-foreground line-clamp-2 mb-2 leading-tight tracking-tight">
                      {company.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {company.address.split("\n")[0]}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompanyPage((p) => Math.max(0, p - 1))}
                disabled={companyPage === 0}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-muted-foreground">
                Seite {companyPage + 1} von {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompanyPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={companyPage === totalPages - 1}
                className="rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Keine Anbieter gefunden</h3>
          <p className="text-muted-foreground">Versuchen Sie es mit einem anderen Suchbegriff oder Filter.</p>
        </div>
      )}

      {selectedCompanies.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => setStep("details")}
            className="h-14 rounded-full px-10 bg-foreground text-background hover:bg-foreground/90 shadow-elegant hover:shadow-premium transition-all duration-300 text-base font-semibold"
          >
            <Package className="mr-2 h-5 w-5" />
            {selectedCompanies.length === 1
              ? "Weiter mit 1 Anbieter"
              : `Weiter mit ${selectedCompanies.length} Anbietern`}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )

  const renderDetailsStep = () => {
    if (selectedCompanies.length === 0) return null

    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-3 mb-8">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              Ihre Daten eingeben
            </h2>
            {autoSaveStatus && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground animate-in fade-in">
                {autoSaveStatus === "saving" ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Speichert...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-foreground" />
                    <span className="text-foreground/70">Gespeichert</span>
                  </>
                )}
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-lg">
            Daten werden für{" "}
            <span className="font-semibold text-foreground">
              {selectedCompanies.length === 1
                ? selectedCompanies[0].name
                : `${selectedCompanies.length} Anbieter`}
            </span>{" "}
            verwendet
          </p>

          {selectedCompanies.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {selectedCompanies.map((c) => (
                <span key={c.id} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                  {c.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <InfoBanner icon={Info}>
          <span className="text-sm">
            Alle Daten werden <strong>lokal im Browser</strong> gespeichert und niemals an Server übertragen.
          </span>
        </InfoBanner>

        <div className="space-y-6 bg-card rounded-2xl border border-border/50 p-8 shadow-card">
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-foreground" />
              Persönliche Daten
            </h3>

            <FormField label="Anrede" htmlFor="anrede" required>
              <div className="flex gap-2">
                {ANREDE_OPTIONS.map((anrede) => (
                  <ToggleButton
                    key={anrede}
                    active={formData.anrede === anrede}
                    onClick={() => updateField("anrede", anrede)}
                    className="flex-1"
                  >
                    {anrede}
                  </ToggleButton>
                ))}
              </div>
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Vorname" htmlFor="vorname" required error={errors.vorname}>
                <Input
                  id="vorname"
                  value={formData.vorname}
                  onChange={(e) => updateField("vorname", e.target.value)}
                  placeholder="Max"
                  className={`h-12 rounded-xl ${errors.vorname ? "border-destructive" : ""}`}
                />
              </FormField>
              <FormField label="Nachname" htmlFor="nachname" required error={errors.nachname}>
                <Input
                  id="nachname"
                  value={formData.nachname}
                  onChange={(e) => updateField("nachname", e.target.value)}
                  placeholder="Mustermann"
                  className={`h-12 rounded-xl ${errors.nachname ? "border-destructive" : ""}`}
                />
              </FormField>
            </div>

            <FormField label="Straße und Hausnummer" htmlFor="strasse" required error={errors.strasse}>
              <Input
                id="strasse"
                value={formData.strasse}
                onChange={(e) => updateField("strasse", e.target.value)}
                placeholder="Musterstraße 123"
                className={`h-12 rounded-xl ${errors.strasse ? "border-destructive" : ""}`}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="PLZ" htmlFor="plz" required error={errors.plz}>
                <Input
                  id="plz"
                  value={formData.plz}
                  onChange={(e) => updateField("plz", e.target.value)}
                  placeholder="12345"
                  maxLength={5}
                  className={`h-12 rounded-xl ${errors.plz ? "border-destructive" : ""}`}
                />
              </FormField>
              <FormField label="Ort" htmlFor="ort" required error={errors.ort} className="sm:col-span-2">
                <Input
                  id="ort"
                  value={formData.ort}
                  onChange={(e) => updateField("ort", e.target.value)}
                  placeholder="Berlin"
                  className={`h-12 rounded-xl ${errors.ort ? "border-destructive" : ""}`}
                />
              </FormField>
            </div>
          </div>

          <div className="border-t border-border pt-6" />

          <div className="space-y-5">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Vertragsdaten
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Kundennummer" htmlFor="kundennummer" hint="Optional, falls vorhanden">
                <Input
                  id="kundennummer"
                  value={formData.kundennummer}
                  onChange={(e) => updateField("kundennummer", e.target.value)}
                  placeholder="KD-123456"
                  className="h-12 rounded-xl"
                />
              </FormField>
              <FormField label="Vertragsnummer" htmlFor="vertragsnummer" hint="Optional, falls vorhanden">
                <Input
                  id="vertragsnummer"
                  value={formData.vertragsnummer}
                  onChange={(e) => updateField("vertragsnummer", e.target.value)}
                  placeholder="VT-789012"
                  className="h-12 rounded-xl"
                />
              </FormField>
            </div>

            <FormField label="Kündigungsgrund" htmlFor="grund" required>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(GRUND_LABELS) as KuendigungsGrund[]).map((grund) => (
                  <ToggleButton
                    key={grund}
                    active={formData.grund === grund}
                    onClick={() => updateField("grund", grund)}
                  >
                    {GRUND_LABELS[grund]}
                  </ToggleButton>
                ))}
              </div>
            </FormField>

            <FormField label="Kündigen zum" htmlFor="kuendigungZum" required>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <ToggleButton
                    active={formData.kuendigungZum === "naechstmoeglich"}
                    onClick={() => updateField("kuendigungZum", "naechstmoeglich")}
                    className="flex-1"
                  >
                    Nächstmöglichen Zeitpunkt
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
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <Input
                      type="date"
                      id="kuendigungsDatum"
                      value={formData.kuendigungsDatum}
                      onChange={(e) => updateField("kuendigungsDatum", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`h-12 rounded-xl ${errors.kuendigungsDatum ? "border-destructive" : ""}`}
                    />
                    <FieldError message={errors.kuendigungsDatum} />
                  </div>
                )}
              </div>
            </FormField>

            {needsZusatztext && (
              <FormField
                label={ZUSATZ_LABELS[formData.grund] || ZUSATZ_LABELS.default}
                htmlFor="zusatztext"
                required
                error={errors.zusatztext}
                className="animate-in fade-in slide-in-from-top-2"
              >
                <Textarea
                  id="zusatztext"
                  value={formData.zusatztext}
                  onChange={(e) => updateField("zusatztext", e.target.value)}
                  placeholder={ZUSATZ_PLACEHOLDERS[formData.grund] || ZUSATZ_PLACEHOLDERS.default}
                  rows={3}
                  className={`rounded-xl resize-none ${errors.zusatztext ? "border-destructive" : ""}`}
                />
              </FormField>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            variant="outline"
            onClick={() => setStep("company")}
            className="h-12 rounded-full px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
          <Button
            onClick={goToPreview}
            className="h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 shadow-elegant hover:shadow-premium transition-all duration-300"
          >
            Weiter zur Vorschau
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderPreviewStep = () => {
    if (selectedCompanies.length === 0) return null
    const isMultiple = letters.length > 1

    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            Vorschau & Download
          </h2>
          <p className="text-muted-foreground">
            {isMultiple
              ? `${letters.length} Kündigungsschreiben bereit zum Download`
              : "Überprüfen Sie Ihr Kündigungsschreiben"}
          </p>
        </div>

        <InfoBanner icon={Sparkles} onClose={() => {}}>
          <span className="text-sm">
            <strong>Perfekt!</strong>{" "}
            {isMultiple
              ? `${letters.length} rechtssichere Kündigungsschreiben sind bereit.`
              : "Ihr rechtssicheres Kündigungsschreiben ist bereit zum Download."}
          </span>
        </InfoBanner>

        {isMultiple && (
          <div className="flex flex-wrap gap-2">
            {letters.map((l, i) => (
              <button
                key={l.company.id}
                onClick={() => setActivePreviewIndex(i)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activePreviewIndex === i
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.company.name}
              </button>
            ))}
          </div>
        )}

        {currentLetter && (
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
            {isMultiple && (
              <div className="mb-4">
                <span className="text-sm font-semibold text-muted-foreground">
                  {activePreviewIndex + 1} / {letters.length} — {currentLetter.company.name}
                </span>
              </div>
            )}
            <div className="bg-background rounded-xl p-8 border border-border/50 max-h-[600px] overflow-y-auto scrollbar-minimal">
              <pre
                ref={previewRef}
                className="whitespace-pre-wrap font-mono text-sm text-foreground leading-relaxed"
              >
                {currentLetter.text}
              </pre>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button
            onClick={() => currentLetter && generatePdf(currentLetter.text, currentLetter.company.name)}
            className="h-16 rounded-2xl flex-col gap-1 bg-foreground text-background hover:bg-foreground/90 shadow-elegant transition-all duration-300"
          >
            <FileDown className="h-5 w-5" />
            <span className="text-xs font-semibold">PDF Download</span>
          </Button>

          <Button
            onClick={() => currentLetter && copyToClipboard(currentLetter.text, currentLetter.company.id)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            {copied === currentLetter?.company.id ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-xs font-semibold text-green-600">Kopiert!</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                <span className="text-xs font-semibold">Kopieren</span>
              </>
            )}
          </Button>

          <Button
            onClick={() => currentLetter && printKundigung(currentLetter.text, currentLetter.company.name)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Printer className="h-5 w-5" />
            <span className="text-xs font-semibold">Drucken</span>
          </Button>

          <Button
            onClick={() => currentLetter && openMailto(currentLetter.text, currentLetter.company.name)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Mail className="h-5 w-5" />
            <span className="text-xs font-semibold">Per E-Mail</span>
          </Button>

          <Button
            onClick={() => currentLetter && downloadSingleText(currentLetter.company, currentLetter.text)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Download className="h-5 w-5" />
            <span className="text-xs font-semibold">TXT Download</span>
          </Button>

          <Button
            onClick={handleSaveAllToArchiv}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            {saved ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-xs font-semibold text-green-600">Gespeichert!</span>
              </>
            ) : (
              <>
                <Archive className="h-5 w-5" />
                <span className="text-xs font-semibold">
                  {isMultiple ? "Alle archivieren" : "Archivieren"}
                </span>
              </>
            )}
          </Button>

          <Button
            onClick={() => currentLetter && addCalendarReminder(currentLetter.company.name, formData.kuendigungsDatum)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <CalendarPlus className="h-5 w-5" />
            <span className="text-xs font-semibold">Erinnerung</span>
          </Button>

          <Button
            onClick={() => {
              setStep("company")
              setSelectedCompanies([])
              setFormData(INITIAL_FORM)
              setErrors({})
            }}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300"
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold">Neue erstellen</span>
          </Button>
        </div>

        {/* ZIP кнопка — только если несколько писем */}
        {isMultiple && (
          <Button
            onClick={downloadAllAsZip}
            className="w-full h-14 rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-elegant text-base font-semibold transition-all duration-300"
          >
            <Download className="mr-2 h-5 w-5" />
            Alle {letters.length} Kündigungen als PDF-ZIP herunterladen
          </Button>
        )}

        <div className="flex gap-3 justify-start">
          <Button
            variant="outline"
            onClick={() => setStep("details")}
            className="h-12 rounded-full px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Bearbeiten
          </Button>
        </div>
      </div>
    )
  }

  /* ─── Main Render ─── */

  return (
    <section id="generator" className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] h-[500px] w-[500px] rounded-full bg-muted/30 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-muted/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-xl rounded-full border-2 border-border p-2 shadow-xl">
            {STEPS.map((s, idx) => {
              const isActive = s.key === step
              const isCompleted =
                (s.key === "company" && selectedCompanies.length > 0) ||
                (s.key === "details" && step === "preview")
              const Icon = s.icon

              return (
                <div key={s.key} className="flex items-center">
                  <button
                    onClick={() => navigateStep(s.key)}
                    className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-foreground text-background shadow-elegant"
                        : isCompleted
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{s.label}</span>
                    {isCompleted && !isActive && <Check className="h-3.5 w-3.5" />}
                  </button>
                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div>
          {step === "company" && renderCompanyStep()}
          {step === "details" && renderDetailsStep()}
          {step === "preview" && renderPreviewStep()}
        </div>
      </div>
    </section>
  )
}