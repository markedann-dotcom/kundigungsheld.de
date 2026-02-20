"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, AlertTriangle, CheckCircle2, Info, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

/* ─── Types ─── */

interface ContractType {
  id: string
  label: string
  noticePeriodMonths: number
  minDurationMonths: number
  description: string
}

/* ─── Contract Types ─── */

const CONTRACT_TYPES: ContractType[] = [
  {
    id: "handy",
    label: "Mobilfunk / Handy",
    noticePeriodMonths: 1,
    minDurationMonths: 24,
    description: "Standard 2-Jahres-Vertrag, 1 Monat Kündigungsfrist",
  },
  {
    id: "internet",
    label: "Internet / DSL",
    noticePeriodMonths: 1,
    minDurationMonths: 24,
    description: "Standard 2-Jahres-Vertrag, 1 Monat Kündigungsfrist",
  },
  {
    id: "streaming",
    label: "Streaming (Netflix, DAZN...)",
    noticePeriodMonths: 1,
    minDurationMonths: 1,
    description: "Monatlich kündbar, 1 Monat Frist",
  },
  {
    id: "fitness",
    label: "Fitnessstudio",
    noticePeriodMonths: 3,
    minDurationMonths: 12,
    description: "Meist 1 Jahr Mindestlaufzeit, 3 Monate Frist",
  },
  {
    id: "versicherung",
    label: "Versicherung",
    noticePeriodMonths: 3,
    minDurationMonths: 12,
    description: "Jährlich kündbar, 3 Monate vor Ablauf",
  },
  {
    id: "strom",
    label: "Strom / Gas",
    noticePeriodMonths: 1,
    minDurationMonths: 12,
    description: "1 Jahr Mindestlaufzeit, 1 Monat Frist",
  },
  {
    id: "zeitung",
    label: "Zeitschrift / Zeitung",
    noticePeriodMonths: 1,
    minDurationMonths: 12,
    description: "Jährlich kündbar, 1 Monat Frist",
  },
  {
    id: "custom",
    label: "Eigene Eingabe",
    noticePeriodMonths: 0,
    minDurationMonths: 0,
    description: "Eigene Kündigungsfrist und Mindestlaufzeit eingeben",
  },
]

/* ─── Helpers ─── */

function addMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function formatDateLong(date: Date): string {
  return date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function getDaysUntil(date: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

/* ─── Component ─── */

export function Fristenrechner() {
  const [startDate, setStartDate] = useState("")
  const [selectedType, setSelectedType] = useState<ContractType>(CONTRACT_TYPES[0])
  const [customNotice, setCustomNotice] = useState("3")
  const [customDuration, setCustomDuration] = useState("12")
  const [isOpen, setIsOpen] = useState(false)

  const result = useMemo(() => {
    if (!startDate) return null

    const start = new Date(startDate)
    if (isNaN(start.getTime())) return null

    const noticePeriod =
      selectedType.id === "custom"
        ? parseInt(customNotice) || 0
        : selectedType.noticePeriodMonths

    const minDuration =
      selectedType.id === "custom"
        ? parseInt(customDuration) || 0
        : selectedType.minDurationMonths

    // Первая возможная дата расторжения = дата начала + минимальный срок
    const firstPossibleEnd = addMonths(start, minDuration)

    // Последний день подачи заявки = первая возможная дата - срок уведомления
    const lastNoticDate = addMonths(firstPossibleEnd, -noticePeriod)

    // Следующие возможные даты (если уже пропустил)
    const today = new Date()
    let nextEnd = new Date(firstPossibleEnd)
    let nextNotice = new Date(lastNoticDate)

    // Ищем ближайшую будущую дату расторжения
    while (nextEnd < today) {
      nextEnd = addMonths(nextEnd, 12) // обычно продлевается на год
      nextNotice = addMonths(nextEnd, -noticePeriod)
    }

    const daysUntilDeadline = getDaysUntil(nextNotice)
    const isOverdue = daysUntilDeadline < 0
    const isUrgent = daysUntilDeadline >= 0 && daysUntilDeadline <= 30
    const isSafe = daysUntilDeadline > 30

    return {
      start,
      firstPossibleEnd,
      lastNoticDate,
      nextEnd,
      nextNotice,
      daysUntilDeadline,
      isOverdue,
      isUrgent,
      isSafe,
      noticePeriod,
      minDuration,
    }
  }, [startDate, selectedType, customNotice, customDuration])

  const statusColor = result
    ? result.isOverdue
      ? "border-red-500/30 bg-red-500/5"
      : result.isUrgent
      ? "border-amber-500/30 bg-amber-500/5"
      : "border-green-500/30 bg-green-500/5"
    : ""

  const statusIcon = result
    ? result.isOverdue
      ? <AlertTriangle className="h-6 w-6 text-red-500" />
      : result.isUrgent
      ? <AlertTriangle className="h-6 w-6 text-amber-500" />
      : <CheckCircle2 className="h-6 w-6 text-green-500" />
    : null

  return (
    <section id="fristenrechner" className="relative py-20 lg:py-28 bg-muted/20">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Fristenrechner
          </div>
          <h2 className="text-4xl font-black tracking-tight text-foreground">
            Kündigungsfrist berechnen
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Geben Sie Ihren Vertragsbeginn und den Vertragstyp ein — wir berechnen automatisch den letzten Tag für Ihre Kündigung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Input Card */}
          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Vertragsdaten
            </h3>

            {/* Дата начала */}
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Vertragsbeginn <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="mt-2 h-12 rounded-xl"
              />
            </div>

            {/* Тип договора — кастомный дропдаун */}
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Vertragstyp <span className="text-destructive">*</span>
              </Label>
              <div className="relative mt-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full h-12 rounded-xl border border-input bg-background px-4 text-left text-sm flex items-center justify-between hover:border-foreground/20 transition-colors"
                >
                  <span className="font-medium">{selectedType.label}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden">
                    {CONTRACT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type)
                          setIsOpen(false)
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0 ${
                          selectedType.id === type.id ? "bg-muted/50 font-semibold" : ""
                        }`}
                      >
                        <div className="font-medium text-foreground">{type.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{type.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Кастомные поля */}
            {selectedType.id === "custom" && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div>
                  <Label className="text-sm font-semibold text-foreground">
                    Mindestlaufzeit (Monate)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    className="mt-2 h-12 rounded-xl"
                    placeholder="12"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">
                    Kündigungsfrist (Monate)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={customNotice}
                    onChange={(e) => setCustomNotice(e.target.value)}
                    className="mt-2 h-12 rounded-xl"
                    placeholder="3"
                  />
                </div>
              </div>
            )}

            {/* Info Banner */}
            {selectedType.id !== "custom" && (
              <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{selectedType.label}:</span>{" "}
                  Mindestlaufzeit <strong>{selectedType.minDurationMonths} Monate</strong>,
                  Kündigungsfrist <strong>{selectedType.noticePeriodMonths} Monat{selectedType.noticePeriodMonths > 1 ? "e" : ""}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Result Card */}
          <div className="space-y-4">
            {!result ? (
              <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Noch keine Berechnung</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Geben Sie links den Vertragsbeginn ein
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Status Banner */}
                <div className={`rounded-2xl border p-6 ${statusColor}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {statusIcon}
                    <span className="text-lg font-black text-foreground">
                      {result.isOverdue
                        ? "Frist leider abgelaufen"
                        : result.isUrgent
                        ? `Nur noch ${result.daysUntilDeadline} Tage!`
                        : `Noch ${result.daysUntilDeadline} Tage Zeit`}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.isOverdue
                      ? "Sie können erst zum nächsten Verlängerungszeitraum kündigen."
                      : result.isUrgent
                      ? "Handeln Sie schnell — die Frist läuft bald ab!"
                      : "Sie haben noch ausreichend Zeit für Ihre Kündigung."}
                  </p>
                </div>

                {/* Детали */}
                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest text-muted-foreground">
                    Ihre Fristen im Überblick
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Vertragsbeginn</span>
                      <span className="text-sm font-semibold text-foreground">
                        {formatDate(result.start)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Mindestlaufzeit</span>
                      <span className="text-sm font-semibold text-foreground">
                        {result.minDuration} Monate
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Kündigungsfrist</span>
                      <span className="text-sm font-semibold text-foreground">
                        {result.noticePeriod} Monat{result.noticePeriod > 1 ? "e" : ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Nächste Vertragsende</span>
                      <span className="text-sm font-semibold text-foreground">
                        {formatDate(result.nextEnd)}
                      </span>
                    </div>

                    {/* Главная дата — выделена */}
                    <div className={`flex items-center justify-between py-4 px-4 rounded-xl ${
                      result.isOverdue
                        ? "bg-red-500/10 border border-red-500/20"
                        : result.isUrgent
                        ? "bg-amber-500/10 border border-amber-500/20"
                        : "bg-green-500/10 border border-green-500/20"
                    }`}>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          Letzter Kündigungstag
                        </div>
                        <div className="text-base font-black text-foreground">
                          {formatDateLong(result.nextNotice)}
                        </div>
                      </div>
                      {result.isOverdue ? (
                        <AlertTriangle className="h-8 w-8 text-red-500 shrink-0" />
                      ) : (
                        <CheckCircle2 className={`h-8 w-8 shrink-0 ${result.isUrgent ? "text-amber-500" : "text-green-500"}`} />
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="w-full h-14 rounded-full bg-foreground text-background hover:bg-foreground/90 text-base font-semibold shadow-sm transition-all duration-300"
                >
                  <a href="#generator">
                    Jetzt Kündigung erstellen →
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}