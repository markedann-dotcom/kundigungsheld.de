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
  History,
  MapPin,
  Pencil,
  RotateCcw,
  Eye,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
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
import { saveToArchiv, updateArchivItem, getArchiv } from "@/lib/archive"
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
import { getLogoUrl } from "@/lib/company-domains"
import { useI18n } from "@/contexts/i18n-context"

/* ─── Constants ─── */

type Step = "company" | "details" | "preview"

const COMPANIES_PER_PAGE = 12
const MAX_RECENT = 5

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

// Page overflow thresholds
const LINES_WARN = 48
const LINES_DANGER = 56
const CHARS_PER_LINE = 64

/* ─── Page overflow utils ─── */

function countLines(text: string): number {
  if (!text) return 0
  return text.split("\n").reduce((acc, line) => {
    return acc + Math.max(1, Math.ceil(line.length / CHARS_PER_LINE))
  }, 0)
}

/* ─── Progress Bar ─── */

function FormProgressBar({ formData, needsZusatztext }: { formData: TemplateData; needsZusatztext: boolean }) {
  const fields = useMemo(() => {
    const required = [
      { key: "vorname", filled: !!formData.vorname.trim() },
      { key: "nachname", filled: !!formData.nachname.trim() },
      { key: "strasse", filled: !!formData.strasse.trim() },
      { key: "plz", filled: !!formData.plz.trim() && /^\d{5}$/.test(formData.plz) },
      { key: "ort", filled: !!formData.ort.trim() },
    ]
    if (formData.kuendigungZum === "datum") {
      required.push({ key: "kuendigungsDatum", filled: !!formData.kuendigungsDatum.trim() })
    }
    if (needsZusatztext) {
      required.push({ key: "zusatztext", filled: !!formData.zusatztext.trim() })
    }
    return required
  }, [formData, needsZusatztext])

  const filled = fields.filter((f) => f.filled).length
  const total = fields.length
  const pct = Math.round((filled / total) * 100)

  const color =
    pct === 100
      ? "bg-green-500"
      : pct >= 60
      ? "bg-foreground"
      : pct >= 30
      ? "bg-amber-500"
      : "bg-muted-foreground"

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-muted-foreground">Formular ausgefüllt</span>
        <span className={pct === 100 ? "text-green-600" : "text-foreground"}>
          {filled}/{total} Felder {pct === 100 ? "✓ Bereit" : ""}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ─── CompanyCardLogo ─── */

function CompanyCardLogo({ company, size = "md" }: { company: Company; size?: "sm" | "md" }) {
  const [imgError, setImgError] = useState(false)
  const logoUrl = getLogoUrl(company.id)

  const initials = company.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  const hue = company.name
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360

  const sizeClass = size === "sm" ? "h-8 w-8" : "h-14 w-14"
  const imgClass = size === "sm" ? "w-6 h-6" : "w-10 h-10"

  if (logoUrl && !imgError) {
    return (
      <div className={`flex ${sizeClass} items-center justify-center rounded-xl overflow-hidden border border-border/50 group-hover:border-foreground/20 group-hover:scale-105 transition-all duration-300 bg-white`}>
        <img
          src={logoUrl}
          alt={`${company.name} logo`}
          className={`${imgClass} object-contain`}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={`flex ${sizeClass} items-center justify-center rounded-xl border border-border/50 group-hover:border-foreground/20 group-hover:scale-105 transition-all duration-300 text-white font-black ${size === "sm" ? "text-[10px]" : "text-sm"}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 65%, 45%), hsl(${(hue + 40) % 360}, 70%, 35%))`,
      }}
    >
      {initials}
    </div>
  )
}

/* ─── Address Tooltip ─── */

function AddressTooltip({ address }: { address: string }) {
  const lines = address.split("\n").filter(Boolean)
  return (
    <div
      role="tooltip"
      className={[
        "pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50",
        "w-max max-w-[220px] rounded-xl border border-border bg-card/95 backdrop-blur-sm px-3.5 py-2.5 shadow-xl",
        "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100",
        "transition-all duration-200 ease-out",
      ].join(" ")}
    >
      <div className="flex items-start gap-2 text-xs text-foreground">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <div className="space-y-0.5">
          {lines.map((line, i) => (
            <p key={i} className={i === 0 ? "font-semibold" : "text-muted-foreground"}>
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-border" />
      <div className="absolute left-1/2 top-full -translate-x-1/2 mt-[-1px] border-4 border-transparent border-t-card/95" />
    </div>
  )
}

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

/* ─── Mobile Sticky Footer ─── */

function MobileStickyFooter({ count, onNext }: { count: number; onNext: () => void }) {
  if (count === 0) return null
  return (
    <div
      className={[
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-background/90 backdrop-blur-md border-t border-border/60 px-4 py-3",
        "flex items-center justify-between gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]",
        "animate-in slide-in-from-bottom-2 duration-300",
      ].join(" ")}
    >
      <span className="text-sm font-semibold text-foreground">
        {count === 1 ? "1 Anbieter ausgewählt" : `${count} Anbieter ausgewählt`}
      </span>
      <Button
        onClick={onNext}
        className="h-11 rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 shadow-elegant text-sm font-semibold shrink-0"
      >
        <Package className="mr-1.5 h-4 w-4" />
        Weiter
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Button>
    </div>
  )
}

/* ─── Page Overflow Indicator ─── */

function PageOverflowIndicator({ lineCount }: { lineCount: number }) {
  if (lineCount <= LINES_WARN) {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-500">
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span>Passt auf eine Seite ({lineCount} / {LINES_WARN} Zeilen)</span>
      </div>
    )
  }
  if (lineCount <= LINES_DANGER) {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-500">
        <AlertTriangle className="h-3.5 w-3.5" />
        <span>Nahe am Seitenende ({lineCount} Zeilen) — Text kürzen empfohlen</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-destructive">
      <AlertTriangle className="h-3.5 w-3.5 animate-pulse" />
      <span>Zu lang! Geht auf Seite 2 über ({lineCount} Zeilen) — bitte Text kürzen</span>
    </div>
  )
}

/* ─── Editing Tips ─── */

function EditingTips() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-border/50 bg-muted/30 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Tipps zum Bearbeiten
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs text-muted-foreground space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 border-t border-border/30">
          <ul className="space-y-1.5 mt-3 list-disc list-inside">
            <li>Halten Sie den Text <strong>unter 48 Zeilen</strong>, damit er auf eine PDF-Seite passt</li>
            <li>Kürzere Absätze sehen professioneller aus als lange Blöcke</li>
            <li>Fügen Sie keine zusätzlichen Leerzeilen zwischen Absätzen ein — das verschwendet Platz</li>
            <li>Kundennummer / Vertragsnummer stehen bereits im Briefkopf — nicht doppelt erwähnen</li>
            <li>Mit <kbd className="font-mono bg-muted border border-border/60 rounded px-1 py-0.5">Zurücksetzen</kbd> stellen Sie das Original jederzeit wieder her</li>
          </ul>
        </div>
      )}
    </div>
  )
}

/* ─── Line Numbers ─── */

function LineNumbers({ text, scrollTop }: { text: string; scrollTop: number }) {
  const lines = text.split("\n")
  return (
    <div
      className="select-none pointer-events-none absolute left-0 top-0 bottom-0 w-10 flex flex-col items-end pr-2 pt-[17px] overflow-hidden z-10"
      style={{ transform: `translateY(-${scrollTop}px)` }}
    >
      {lines.map((_, i) => (
        <span
          key={i}
          className="text-[11px] leading-[1.625rem] text-muted-foreground/30 font-mono tabular-nums"
        >
          {i + 1}
        </span>
      ))}
    </div>
  )
}

/* ─── Letter Editor ─── */

function LetterEditor({
  companyId,
  originalText,
  editedText,
  onChange,
  onReset,
}: {
  companyId: string
  originalText: string
  editedText: string | undefined
  onChange: (id: string, value: string) => void
  onReset: (id: string) => void
}) {
  const [mode, setMode] = useState<"view" | "edit">("view")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [scrollTop, setScrollTop] = useState(0)

  const currentText = editedText ?? originalText
  const isEdited = editedText !== undefined && editedText !== originalText
  const lineCount = countLines(currentText)

  useEffect(() => {
    if (mode === "edit" && textareaRef.current) {
      textareaRef.current.focus()
      const len = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(len, len)
    }
  }, [mode])

  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    setScrollTop((e.target as HTMLTextAreaElement).scrollTop)
  }, [])

  const handleReset = useCallback(() => {
    onReset(companyId)
    setMode("view")
  }, [companyId, onReset])

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {/* View / Edit toggle */}
          <div className="flex items-center rounded-full bg-muted p-1 gap-0.5">
            <button
              type="button"
              onClick={() => setMode("view")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                mode === "view"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              Vorschau
            </button>
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                mode === "edit"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Pencil className="h-3.5 w-3.5" />
              Bearbeiten
            </button>
          </div>

          {isEdited && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full px-3 py-1 animate-in fade-in duration-200">
              <Pencil className="h-3 w-3" />
              Bearbeitet
            </span>
          )}
        </div>

        {isEdited && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-full px-3 py-2 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Zurücksetzen
          </button>
        )}
      </div>

      {/* Page overflow indicator */}
      <PageOverflowIndicator lineCount={lineCount} />

      {/* Document area */}
      {mode === "view" ? (
        <div className="relative group">
          <pre
            className={[
              "w-full min-h-[520px] rounded-xl px-8 py-8",
              "bg-background border font-mono text-sm text-foreground leading-[1.625rem]",
              "whitespace-pre-wrap break-words overflow-auto",
              isEdited ? "border-amber-300 dark:border-amber-700/50" : "border-border/50",
            ].join(" ")}
          >
            {currentText}
          </pre>

          {/* Hover CTA overlay */}
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={[
              "absolute inset-0 rounded-xl flex flex-col items-center justify-end pb-10 gap-2",
              "bg-gradient-to-t from-background/80 via-transparent to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "cursor-text",
            ].join(" ")}
          >
            <div className="flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-semibold shadow-xl scale-95 group-hover:scale-100 transition-transform duration-200">
              <Pencil className="h-4 w-4" />
              Text bearbeiten
            </div>
            <span className="text-xs text-foreground/60 font-medium">Klicken zum Bearbeiten</span>
          </button>
        </div>
      ) : (
        /* Edit mode — line-numbered textarea */
        <div className="relative rounded-xl border border-foreground/30 bg-background overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-foreground/20 transition-shadow">
          <div className="relative">
            {/* Line number background */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-muted/30 border-r border-border/30 z-10 pointer-events-none" />
            <LineNumbers text={currentText} scrollTop={scrollTop} />

            <textarea
              ref={textareaRef}
              value={currentText}
              onChange={(e) => onChange(companyId, e.target.value)}
              onScroll={handleScroll}
              rows={Math.max(28, currentText.split("\n").length + 2)}
              spellCheck={false}
              className={[
                "w-full bg-transparent font-mono text-sm text-foreground",
                "leading-[1.625rem] resize-none outline-none",
                "pl-12 pr-6 pt-4 pb-8",
                lineCount > LINES_DANGER ? "selection:bg-destructive/20" : "",
              ].join(" ")}
              aria-label="Kündigungsschreiben bearbeiten"
            />
          </div>

          {/* Bottom bar */}
          <div className="sticky bottom-0 flex items-center justify-between px-4 py-2 bg-muted/50 border-t border-border/30 backdrop-blur-sm">
            <span className="text-[11px] text-muted-foreground font-mono">
              {currentText.length} Zeichen · {currentText.split("\n").length} Absätze
            </span>
            <button
              type="button"
              onClick={() => setMode("view")}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              Vorschau anzeigen
            </button>
          </div>
        </div>
      )}

      {/* Tips (only in edit mode) */}
      {mode === "edit" && <EditingTips />}
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
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentCompanyIds, setRecentCompanyIds] = useLocalStorage<string[]>("kundigung-recent", [])
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(-1)
  const [keyboardNavActive, setKeyboardNavActive] = useState(false)
  const [notizen, setNotizen] = useState<Record<string, string>>({})
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>({})
  const [plzStatus, setPlzStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle")
  const [plzAutoFilledCity, setPlzAutoFilledCity] = useState<string | null>(null)
  const plzTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const STEPS = useMemo(() => [
    { key: "company" as Step, label: "Anbieter", icon: Building2 },
    { key: "details" as Step, label: "Details", icon: User },
    { key: "preview" as Step, label: "Vorschau", icon: FileText },
  ], [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    if (step === "details" && selectedCompanies.length > 0) {
      setAutoSaveStatus("saving")
      const timer = setTimeout(() => setAutoSaveStatus("saved"), 500)
      return () => clearTimeout(timer)
    }
  }, [formData, step, selectedCompanies])

  useEffect(() => {
    setFocusedCardIndex(-1)
    setKeyboardNavActive(false)
  }, [companyPage, activeCategory, search])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kundigung-prefill")
      if (!raw) return
      localStorage.removeItem("kundigung-prefill")
      const { companyId, companyName, formData: prefill } = JSON.parse(raw)
      const company =
        companies.find((c) => c.id === companyId) ??
        companies.find((c) => c.name === companyName)
      if (company) setSelectedCompanies([company])
      if (prefill) setFormData((prev) => ({ ...prev, ...prefill }))
      setStep("details")
      setTimeout(() => {
        document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } catch {
      // ignore malformed data
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const GRID_COLS = 4

  const handleGridKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const total = pagedCompanies.length
      if (total === 0) return
      if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter", " "].includes(e.key)) return
      e.preventDefault()
      setKeyboardNavActive(true)
      setFocusedCardIndex((prev) => {
        const current = prev === -1 ? 0 : prev
        switch (e.key) {
          case "ArrowRight": return Math.min(current + 1, total - 1)
          case "ArrowLeft": return Math.max(current - 1, 0)
          case "ArrowDown": return Math.min(current + GRID_COLS, total - 1)
          case "ArrowUp": return Math.max(current - GRID_COLS, 0)
          default: return current
        }
      })
      if ((e.key === "Enter" || e.key === " ") && focusedCardIndex >= 0) {
        toggleCompany(pagedCompanies[focusedCardIndex])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusedCardIndex]
  )

  /* ─── Derived state ─── */

  const suggestions = useMemo(() => {
    if (!search.trim() || search.length < 1) return []
    const q = search.toLowerCase()
    return companies
      .filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
      .slice(0, 3)
  }, [search])

  const recentCompanies = useMemo(() => {
    return recentCompanyIds
      .map((id) => companies.find((c) => c.id === id))
      .filter(Boolean) as Company[]
  }, [recentCompanyIds])

  const filteredCompanies = useMemo(() => {
    const q = search.toLowerCase()
    return companies.filter((c) => {
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
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
    () => filteredCompanies.slice(companyPage * COMPANIES_PER_PAGE, (companyPage + 1) * COMPANIES_PER_PAGE),
    [filteredCompanies, companyPage]
  )

  const letters = useMemo(() => {
    return selectedCompanies.map((company) => ({
      company,
      text: generateKuendigungsschreiben(formData, company.name, company.address),
    }))
  }, [formData, selectedCompanies])

  const currentLetter = letters[activePreviewIndex]
  const currentText = editedTexts[currentLetter?.company.id] ?? currentLetter?.text ?? ""

  const needsZusatztext = GRUENDE_MIT_ZUSATZ.includes(formData.grund)

  const duplicateWarnings = useMemo(() => {
    if (step !== "details") return {}
    const archiv = getArchiv()
    const result: Record<string, { date: string; daysAgo: number }> = {}
    for (const company of selectedCompanies) {
      const existing = archiv.find((a) => a.companyName.toLowerCase() === company.name.toLowerCase())
      if (existing) {
        const daysAgo = Math.floor(
          (Date.now() - new Date(existing.createdAt ?? existing.datum).getTime()) / 86_400_000
        )
        result[company.id] = {
          date: new Date(existing.createdAt ?? existing.datum).toLocaleDateString("de-DE", {
            day: "numeric", month: "long", year: "numeric",
          }),
          daysAgo,
        }
      }
    }
    return result
  }, [selectedCompanies, step])

  /* ─── Callbacks ─── */

  const addToRecent = useCallback((company: Company) => {
    setRecentCompanyIds((prev) => {
      const filtered = prev.filter((id) => id !== company.id)
      return [company.id, ...filtered].slice(0, MAX_RECENT)
    })
  }, [setRecentCompanyIds])

  const toggleCompany = useCallback((company: Company) => {
    setSelectedCompanies((prev) => {
      const isSelected = prev.some((c) => c.id === company.id)
      if (isSelected) return prev.filter((c) => c.id !== company.id)
      addToRecent(company)
      return [...prev, company]
    })
  }, [addToRecent])

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

      if (field === "plz") {
        if (plzTimerRef.current) clearTimeout(plzTimerRef.current)
        if (!/^\d{5}$/.test(value)) {
          setPlzStatus("idle")
          return
        }
        setPlzStatus("loading")
        const plzValue = value
        plzTimerRef.current = setTimeout(async () => {
          try {
            const res = await fetch(`https://api.zippopotam.us/de/${plzValue}`)
            if (res.ok) {
              const json = await res.json()
              const city: string = json?.places?.[0]?.["place name"] ?? ""
              setPlzStatus("valid")
              if (city) {
                setFormData((prev) => ({
                  ...prev,
                  plz: prev.plz,
                  ort: prev.ort.trim() === "" || prev.ort === plzAutoFilledCity ? city : prev.ort,
                }))
                setPlzAutoFilledCity(city)
              }
            } else {
              setPlzStatus("invalid")
              setPlzAutoFilledCity(null)
            }
          } catch {
            setPlzStatus("idle")
          }
        }, 600)
      }
    },
    [errors, setFormData, plzAutoFilledCity]
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
    } catch { /* fallback */ }
  }, [])

  const downloadAllAsZip = useCallback(async () => {
    showLoading()
    try {
      const JSZip = (await import("jszip")).default
      const { saveAs } = await import("file-saver")
      const zip = new JSZip()
      for (let i = 0; i < letters.length; i++) {
        const { company, text } = letters[i]
        const finalText = editedTexts[company.id] ?? text
        updateLoadingText(`Erstelle PDF ${i + 1} von ${letters.length}: ${company.name}`)
        const safeName = company.name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")
        const pdfBlob = await generatePdfBlob(finalText, company.name)
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
  }, [letters, editedTexts])

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
    const now = new Date().toISOString()
    letters.forEach(({ company, text }) => {
      const finalText = editedTexts[company.id] ?? text
      const id = `kh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
      saveToArchiv({
        id,
        companyName: company.name,
        companyCategory: company.category,
        grund: formData.grund,
        grundLabel: formData.grund,
        vorname: formData.vorname,
        nachname: formData.nachname,
        datum: now,
        kuendigungZum: formData.kuendigungZum,
        text: finalText,
        status: "erstellt",
        notiz: notizen[company.id] ?? "",
        createdAt: now,
        updatedAt: now,
      })
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [letters, formData, notizen, editedTexts])

  /* ─── Render Steps ─── */

  const renderCompanyStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-4xl font-bold text-foreground tracking-tight">Wählen Sie Anbieter aus</h2>
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

      <div className="relative max-w-2xl mx-auto" ref={searchRef}>
        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground z-10" />
        <Input
          type="search"
          placeholder="Anbieter suchen (z.B. Vodafone, Netflix, O2...)"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCompanyPage(0); setShowSuggestions(true) }}
          onFocus={() => setShowSuggestions(true)}
          className="h-14 pl-14 pr-4 text-base rounded-full border-border/60 focus:border-foreground/20 transition-colors duration-200 shadow-minimal bg-card"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-border bg-card shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {suggestions.map((company) => {
              const isSelected = selectedCompanies.some((c) => c.id === company.id)
              return (
                <button
                  key={company.id}
                  onMouseDown={(e) => { e.preventDefault(); toggleCompany(company); setSearch(""); setShowSuggestions(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left ${isSelected ? "bg-foreground/5" : ""}`}
                >
                  <div className="group"><CompanyCardLogo company={company} size="sm" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[company.category]}</p>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-foreground shrink-0" />}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {recentCompanies.length > 0 && !search && (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <History className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Zuletzt verwendet</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentCompanies.map((company) => {
              const isSelected = selectedCompanies.some((c) => c.id === company.id)
              return (
                <button
                  key={company.id}
                  onClick={() => toggleCompany(company)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all duration-200 ${
                    isSelected
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card border-border/60 text-foreground hover:border-foreground/30 hover:bg-muted/30"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                  {company.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        <ToggleButton active={activeCategory === "alle"} onClick={() => { setActiveCategory("alle"); setCompanyPage(0) }}>
          Alle ({companies.length})
        </ToggleButton>
        {categories.map((cat) => (
          <ToggleButton key={cat} active={activeCategory === cat} onClick={() => { setActiveCategory(cat); setCompanyPage(0) }}>
            {CATEGORY_LABELS[cat]} ({companies.filter((c) => c.category === cat).length})
          </ToggleButton>
        ))}
      </div>

      {filteredCompanies.length > 0 ? (
        <>
          <div
            ref={gridRef}
            role="grid"
            aria-label="Anbieter auswählen"
            tabIndex={0}
            onKeyDown={handleGridKeyDown}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto outline-none"
          >
            {pagedCompanies.map((company, idx) => {
              const isSelected = selectedCompanies.some((c) => c.id === company.id)
              const isFocused = focusedCardIndex === idx
              return (
                <div key={company.id} role="gridcell" className="relative group" style={{ animationDelay: `${idx * 30}ms` }}>
                  <AddressTooltip address={company.address} />
                  <button
                    onClick={() => toggleCompany(company)}
                    aria-pressed={isSelected}
                    aria-label={`${company.name} ${isSelected ? "abgewählt" : "auswählen"}`}
                    className={[
                      "relative overflow-hidden rounded-2xl border p-6 text-left w-full",
                      "transition-all duration-300 hover:shadow-card hover:scale-[1.01] animate-scale-in",
                      isSelected ? "border-foreground bg-foreground/5 shadow-elegant" : "border-border/50 bg-card hover:bg-muted/30 hover:border-foreground/20",
                      isFocused && keyboardNavActive ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : "",
                    ].join(" ")}
                  >
                    <div className={`absolute top-3 right-3 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? "bg-foreground border-foreground" : "border-border/50 group-hover:border-foreground/30"}`}>
                      {isSelected && <Check className="h-3.5 w-3.5 text-background" />}
                    </div>
                    <div className="relative z-10">
                      <div className="mb-4 flex items-start justify-between pr-8">
                        <CompanyCardLogo company={company} />
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-semibold uppercase bg-muted text-muted-foreground border border-border/50 mb-2">
                        {CATEGORY_LABELS[company.category]}
                      </Badge>
                      <h3 className="font-semibold text-base text-foreground line-clamp-2 mb-2 leading-tight tracking-tight">{company.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{company.address.split("\n")[0]}</p>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button variant="outline" size="sm" onClick={() => setCompanyPage((p) => Math.max(0, p - 1))} disabled={companyPage === 0} className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-muted-foreground">Seite {companyPage + 1} von {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setCompanyPage((p) => Math.min(totalPages - 1, p + 1))} disabled={companyPage === totalPages - 1} className="rounded-full">
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
        <div className="hidden md:flex justify-center pt-4">
          <Button
            onClick={() => setStep("details")}
            className="h-14 rounded-full px-10 bg-foreground text-background hover:bg-foreground/90 shadow-elegant hover:shadow-premium transition-all duration-300 text-base font-semibold"
          >
            <Package className="mr-2 h-5 w-5" />
            {selectedCompanies.length === 1 ? "Weiter mit 1 Anbieter" : `Weiter mit ${selectedCompanies.length} Anbietern`}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      {selectedCompanies.length > 0 && <div className="h-20 md:hidden" aria-hidden />}
      <MobileStickyFooter count={selectedCompanies.length} onNext={() => setStep("details")} />
    </div>
  )

  const renderDetailsStep = () => {
    if (selectedCompanies.length === 0) return null
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-3 mb-8">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">Ihre Daten eingeben</h2>
            {autoSaveStatus && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground animate-in fade-in">
                {autoSaveStatus === "saving" ? (
                  <><Clock className="h-4 w-4 animate-spin" /><span>Speichert...</span></>
                ) : (
                  <><Check className="h-4 w-4 text-foreground" /><span className="text-foreground/70">Gespeichert</span></>
                )}
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-lg">
            Daten werden für{" "}
            <span className="font-semibold text-foreground">
              {selectedCompanies.length === 1 ? selectedCompanies[0].name : `${selectedCompanies.length} Anbieter`}
            </span>{" "}
            verwendet
          </p>
          {selectedCompanies.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {selectedCompanies.map((c) => (
                <span key={c.id} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">{c.name}</span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border/50 px-6 py-4 shadow-sm">
          <FormProgressBar formData={formData} needsZusatztext={needsZusatztext} />
        </div>

        {Object.entries(duplicateWarnings).map(([companyId, info]) => {
          const company = selectedCompanies.find((c) => c.id === companyId)
          if (!company) return null
          return (
            <div key={companyId} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-900/10 p-4 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-semibold text-amber-900 dark:text-amber-400">Mögliches Duplikat: {company.name}</p>
                <p className="text-amber-700 dark:text-amber-500 mt-0.5">
                  Sie haben bereits am {info.date} eine Kündigung für <span className="font-semibold">{company.name}</span> erstellt
                  {info.daysAgo === 0 ? " (heute)" : info.daysAgo === 1 ? " (gestern)" : ` (vor ${info.daysAgo} Tagen)`}.
                  Möchten Sie wirklich eine neue erstellen?
                </p>
              </div>
            </div>
          )
        })}

        <InfoBanner icon={Info}>
          <span className="text-sm">Alle Daten werden <strong>lokal im Browser</strong> gespeichert und niemals an Server übertragen.</span>
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
                  <ToggleButton key={anrede} active={formData.anrede === anrede} onClick={() => updateField("anrede", anrede)} className="flex-1">{anrede}</ToggleButton>
                ))}
              </div>
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Vorname" htmlFor="vorname" required error={errors.vorname}>
                <Input id="vorname" value={formData.vorname} onChange={(e) => updateField("vorname", e.target.value)} placeholder="Max" className={`h-12 rounded-xl ${errors.vorname ? "border-destructive" : ""}`} />
              </FormField>
              <FormField label="Nachname" htmlFor="nachname" required error={errors.nachname}>
                <Input id="nachname" value={formData.nachname} onChange={(e) => updateField("nachname", e.target.value)} placeholder="Mustermann" className={`h-12 rounded-xl ${errors.nachname ? "border-destructive" : ""}`} />
              </FormField>
            </div>
            <FormField label="Straße und Hausnummer" htmlFor="strasse" required error={errors.strasse}>
              <Input id="strasse" value={formData.strasse} onChange={(e) => updateField("strasse", e.target.value)} placeholder="Musterstraße 123" className={`h-12 rounded-xl ${errors.strasse ? "border-destructive" : ""}`} />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="PLZ" htmlFor="plz" required error={errors.plz}>
                <div className="relative">
                  <Input
                    id="plz"
                    value={formData.plz}
                    onChange={(e) => updateField("plz", e.target.value)}
                    placeholder="12345"
                    maxLength={5}
                    className={`h-12 rounded-xl pr-10 ${errors.plz ? "border-destructive" : plzStatus === "valid" ? "border-green-500 focus-visible:ring-green-500/20" : plzStatus === "invalid" ? "border-amber-500" : ""}`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {plzStatus === "loading" && <Clock className="h-4 w-4 text-muted-foreground animate-spin" />}
                    {plzStatus === "valid" && <Check className="h-4 w-4 text-green-500" />}
                    {plzStatus === "invalid" && <AlertCircle className="h-4 w-4 text-amber-500" />}
                  </div>
                </div>
                {plzStatus === "invalid" && !errors.plz && (
                  <p className="mt-1.5 text-xs text-amber-600 flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5" />Diese PLZ existiert nicht in Deutschland</p>
                )}
                {plzStatus === "valid" && !errors.plz && (
                  <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1.5"><Check className="h-3.5 w-3.5" />PLZ gültig</p>
                )}
              </FormField>
              <FormField label="Ort" htmlFor="ort" required error={errors.ort} className="sm:col-span-2">
                <Input
                  id="ort"
                  value={formData.ort}
                  onChange={(e) => {
                    updateField("ort", e.target.value)
                    if (plzAutoFilledCity && e.target.value !== plzAutoFilledCity) setPlzAutoFilledCity(null)
                  }}
                  placeholder="Berlin"
                  className={`h-12 rounded-xl ${errors.ort ? "border-destructive" : ""} ${plzAutoFilledCity && formData.ort === plzAutoFilledCity ? "border-green-500/60" : ""}`}
                />
                {plzAutoFilledCity && formData.ort === plzAutoFilledCity && (
                  <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" />Stadt automatisch eingetragen</p>
                )}
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
                <Input id="kundennummer" value={formData.kundennummer} onChange={(e) => updateField("kundennummer", e.target.value)} placeholder="KD-123456" className="h-12 rounded-xl" />
              </FormField>
              <FormField label="Vertragsnummer" htmlFor="vertragsnummer" hint="Optional, falls vorhanden">
                <Input id="vertragsnummer" value={formData.vertragsnummer} onChange={(e) => updateField("vertragsnummer", e.target.value)} placeholder="VT-789012" className="h-12 rounded-xl" />
              </FormField>
            </div>
            <FormField label="Kündigungsgrund" htmlFor="grund" required>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(GRUND_LABELS) as KuendigungsGrund[]).map((grund) => (
                  <ToggleButton key={grund} active={formData.grund === grund} onClick={() => updateField("grund", grund)}>{GRUND_LABELS[grund]}</ToggleButton>
                ))}
              </div>
            </FormField>
            <FormField label="Kündigen zum" htmlFor="kuendigungZum" required>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <ToggleButton active={formData.kuendigungZum === "naechstmoeglich"} onClick={() => updateField("kuendigungZum", "naechstmoeglich")} className="flex-1">Nächstmöglichen Zeitpunkt</ToggleButton>
                  <ToggleButton active={formData.kuendigungZum === "datum"} onClick={() => updateField("kuendigungZum", "datum")} className="flex-1">Bestimmtes Datum</ToggleButton>
                </div>
                {formData.kuendigungZum === "datum" && (
                  <div className="animate-in fade-in slide-in-from-top-2 space-y-2">
                    <Input type="date" id="kuendigungsDatum" value={formData.kuendigungsDatum} onChange={(e) => updateField("kuendigungsDatum", e.target.value)} min={new Date().toISOString().split("T")[0]} className={`h-12 rounded-xl ${errors.kuendigungsDatum ? "border-destructive" : ""}`} />
                    <FieldError message={errors.kuendigungsDatum} />
                    {formData.kuendigungsDatum && (() => {
                      const diff = Math.ceil((new Date(formData.kuendigungsDatum).getTime() - Date.now()) / 86_400_000)
                      if (isNaN(diff)) return null
                      return (
                        <p className={`text-xs font-semibold flex items-center gap-1.5 ${diff < 0 ? "text-destructive" : diff <= 14 ? "text-amber-600" : "text-green-600"}`}>
                          <Clock className="h-3.5 w-3.5" />
                          {diff < 0 ? `Datum liegt ${Math.abs(diff)} Tage in der Vergangenheit` : diff === 0 ? "Heute" : `in ${diff} ${diff === 1 ? "Tag" : "Tagen"}`}
                        </p>
                      )
                    })()}
                  </div>
                )}
              </div>
            </FormField>
            {needsZusatztext && (
              <FormField label={ZUSATZ_LABELS[formData.grund] || ZUSATZ_LABELS.default} htmlFor="zusatztext" required error={errors.zusatztext} className="animate-in fade-in slide-in-from-top-2">
                <Textarea id="zusatztext" value={formData.zusatztext} onChange={(e) => updateField("zusatztext", e.target.value)} placeholder={ZUSATZ_PLACEHOLDERS[formData.grund] || ZUSATZ_PLACEHOLDERS.default} rows={3} className={`rounded-xl resize-none ${errors.zusatztext ? "border-destructive" : ""}`} />
              </FormField>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button variant="outline" onClick={() => setStep("company")} className="h-12 rounded-full px-6">
            <ArrowLeft className="mr-2 h-4 w-4" />Zurück
          </Button>
          <Button onClick={goToPreview} className="h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 shadow-elegant hover:shadow-premium transition-all duration-300">
            Weiter zur Vorschau<ArrowRight className="ml-2 h-4 w-4" />
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
          <h2 className="text-3xl font-bold text-foreground">Vorschau & Download</h2>
          <p className="text-muted-foreground">
            {isMultiple ? `${letters.length} Kündigungsschreiben bereit zum Download` : "Überprüfen und bearbeiten Sie Ihr Kündigungsschreiben"}
          </p>
        </div>

        <InfoBanner icon={Sparkles} onClose={() => {}}>
          <span className="text-sm">
            <strong>Perfekt!</strong>{" "}
            {isMultiple ? `${letters.length} rechtssichere Kündigungsschreiben sind bereit.` : "Ihr rechtssicheres Kündigungsschreiben ist bereit."}{" "}
            Wechseln Sie in den <strong>Bearbeiten-Modus</strong> um den Text anzupassen.
          </span>
        </InfoBanner>

        {/* Company tabs for multiple letters */}
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
                {editedTexts[l.company.id] && (
                  <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Letter editor */}
        {currentLetter && (
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card space-y-6">
            {isMultiple && (
              <p className="text-sm font-semibold text-muted-foreground">
                {activePreviewIndex + 1} / {letters.length} — {currentLetter.company.name}
              </p>
            )}

            <LetterEditor
              companyId={currentLetter.company.id}
              originalText={currentLetter.text}
              editedText={editedTexts[currentLetter.company.id]}
              onChange={(id, value) =>
                setEditedTexts((prev) => ({ ...prev, [id]: value }))
              }
              onReset={(id) =>
                setEditedTexts((prev) => {
                  const next = { ...prev }
                  delete next[id]
                  return next
                })
              }
            />

            {/* Note */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <label
                htmlFor={`notiz-${currentLetter.company.id}`}
                className="flex items-center gap-2 text-sm font-semibold text-foreground"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                Notiz zu diesem Schreiben
                <span className="text-xs font-normal text-muted-foreground ml-1">(optional)</span>
              </label>
              <Textarea
                id={`notiz-${currentLetter.company.id}`}
                value={notizen[currentLetter.company.id] ?? ""}
                onChange={(e) => setNotizen((prev) => ({ ...prev, [currentLetter.company.id]: e.target.value }))}
                placeholder="z.B. Per Einschreiben gesendet am 21.02, Sendungsnummer XY123..."
                rows={3}
                className="resize-none rounded-xl text-sm bg-background border-border/60 focus:border-foreground/30 placeholder:text-muted-foreground/50 transition-colors"
              />
              {notizen[currentLetter.company.id] && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Check className="h-3 w-3 text-green-500" />Notiz wird beim Archivieren gespeichert
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button
            onClick={() => currentLetter && generatePdf(currentText, currentLetter.company.name)}
            className="h-16 rounded-2xl flex-col gap-1 bg-foreground text-background hover:bg-foreground/90 shadow-elegant transition-all duration-300"
          >
            <FileDown className="h-5 w-5" /><span className="text-xs font-semibold">PDF Download</span>
          </Button>
          <Button
            onClick={() => currentLetter && copyToClipboard(currentText, currentLetter.company.id)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            {copied === currentLetter?.company.id ? (
              <><Check className="h-5 w-5 text-green-500" /><span className="text-xs font-semibold text-green-600">Kopiert!</span></>
            ) : (
              <><Copy className="h-5 w-5" /><span className="text-xs font-semibold">Kopieren</span></>
            )}
          </Button>
          <Button
            onClick={() => currentLetter && printKundigung(currentText, currentLetter.company.name)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Printer className="h-5 w-5" /><span className="text-xs font-semibold">Drucken</span>
          </Button>
          <Button
            onClick={() => currentLetter && openMailto(currentText, currentLetter.company.name)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Mail className="h-5 w-5" /><span className="text-xs font-semibold">Per E-Mail</span>
          </Button>
          <Button
            onClick={() => currentLetter && downloadSingleText(currentLetter.company, currentText)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Download className="h-5 w-5" /><span className="text-xs font-semibold">TXT Download</span>
          </Button>
          <Button
            onClick={handleSaveAllToArchiv}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            {saved ? (
              <><Check className="h-5 w-5 text-green-500" /><span className="text-xs font-semibold text-green-600">Gespeichert!</span></>
            ) : (
              <><Archive className="h-5 w-5" /><span className="text-xs font-semibold">{isMultiple ? "Alle archivieren" : "Archivieren"}</span></>
            )}
          </Button>
          <Button
            onClick={() => currentLetter && addCalendarReminder(currentLetter.company.name, formData.kuendigungsDatum)}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <CalendarPlus className="h-5 w-5" /><span className="text-xs font-semibold">Erinnerung</span>
          </Button>
          <Button
            onClick={() => {
              setStep("company")
              setSelectedCompanies([])
              setFormData(INITIAL_FORM)
              setErrors({})
              setNotizen({})
              setEditedTexts({})
            }}
            variant="outline"
            className="h-16 rounded-2xl flex-col gap-1 hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300"
          >
            <Sparkles className="h-5 w-5" /><span className="text-xs font-semibold">Neue erstellen</span>
          </Button>
        </div>

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
          <Button variant="outline" onClick={() => setStep("details")} className="h-12 rounded-full px-6">
            <ArrowLeft className="mr-2 h-4 w-4" />Bearbeiten
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
                  {idx < STEPS.length - 1 && <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />}
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