"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  RotateCcw,
  Copy,
  Check,
  CalendarPlus,
  ArrowRight,
} from "lucide-react"
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
  icon: string
}

/* ─── Contract Types ─── */

const CONTRACT_TYPES: ContractType[] = [
  {
    id: "handy",
    label: "Mobilfunk / Handy",
    noticePeriodMonths: 1,
    minDurationMonths: 24,
    description: "Standard 2-Jahres-Vertrag, 1 Monat Kündigungsfrist",
    icon: "📱",
  },
  {
    id: "internet",
    label: "Internet / DSL",
    noticePeriodMonths: 1,
    minDurationMonths: 24,
    description: "Standard 2-Jahres-Vertrag, 1 Monat Kündigungsfrist",
    icon: "🌐",
  },
  {
    id: "streaming",
    label: "Streaming (Netflix, DAZN...)",
    noticePeriodMonths: 1,
    minDurationMonths: 1,
    description: "Monatlich kündbar, 1 Monat Frist",
    icon: "🎬",
  },
  {
    id: "fitness",
    label: "Fitnessstudio",
    noticePeriodMonths: 3,
    minDurationMonths: 12,
    description: "Meist 1 Jahr Mindestlaufzeit, 3 Monate Frist",
    icon: "💪",
  },
  {
    id: "versicherung",
    label: "Versicherung",
    noticePeriodMonths: 3,
    minDurationMonths: 12,
    description: "Jährlich kündbar, 3 Monate vor Ablauf",
    icon: "🛡️",
  },
  {
    id: "strom",
    label: "Strom / Gas",
    noticePeriodMonths: 1,
    minDurationMonths: 12,
    description: "1 Jahr Mindestlaufzeit, 1 Monat Frist",
    icon: "⚡",
  },
  {
    id: "zeitung",
    label: "Zeitschrift / Zeitung",
    noticePeriodMonths: 1,
    minDurationMonths: 12,
    description: "Jährlich kündbar, 1 Monat Frist",
    icon: "📰",
  },
  {
    id: "custom",
    label: "Eigene Eingabe",
    noticePeriodMonths: 0,
    minDurationMonths: 0,
    description: "Eigene Kündigungsfrist und Mindestlaufzeit eingeben",
    icon: "✏️",
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

/** Generate .ics calendar file content */
function generateIcs(date: Date, title: string): string {
  const pad = (n: number) => String(n).padStart(2, "0")
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const now = new Date()
  const stamp = `${fmt(now)}T${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}Z`
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//KuendigungsHeld//Fristenrechner//DE",
    "BEGIN:VEVENT",
    `UID:kuendigung-${Date.now()}@kuendigungsheld.de`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${fmt(date)}`,
    `DTEND;VALUE=DATE:${fmt(addMonths(date, 0))}`,
    `SUMMARY:⚠️ Letzter Kündigungstag: ${title}`,
    `DESCRIPTION:Heute ist der letzte Tag für Ihre Kündigung (${title}).`,
    "BEGIN:VALARM",
    "TRIGGER:-P7D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Kündigung in 7 Tagen fällig!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}

function downloadIcs(date: Date, label: string) {
  const ics = generateIcs(date, label)
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `Kuendigung_${label.replace(/[^a-zA-Z0-9]/g, "_")}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Write prefill data so the generator can restore the form */
function prefillGenerator(type: ContractType) {
  try {
    localStorage.setItem(
      "kundigung-prefill",
      JSON.stringify({ formData: { grund: "ordentlich" } })
    )
  } catch {
    // ignore
  }
  window.location.href = "/#generator"
}

/* ─── Timeline Bar ─── */

function ContractTimeline({
  start,
  end,
  deadline,
}: {
  start: Date
  end: Date
  deadline: Date
}) {
  const totalMs = end.getTime() - start.getTime()
  const todayMs = Math.min(Date.now() - start.getTime(), totalMs)
  const deadlineMs = deadline.getTime() - start.getTime()

  const todayPct = Math.max(0, Math.min(100, (todayMs / totalMs) * 100))
  const deadlinePct = Math.max(0, Math.min(100, (deadlineMs / totalMs) * 100))

  const isPast = Date.now() > deadline.getTime()
  const isUrgent = !isPast && getDaysUntil(deadline) <= 30

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
        <span>Vertragsbeginn</span>
        <span>Vertragsende</span>
      </div>

      {/* Track */}
      <div className="relative h-3 w-full rounded-full bg-muted overflow-visible">
        {/* Progress fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-foreground/20 transition-all duration-700"
          style={{ width: `${todayPct}%` }}
        />

        {/* Deadline marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          style={{ left: `${deadlinePct}%` }}
        >
          <div
            className={`h-5 w-1.5 rounded-full shadow-sm transition-colors ${
              isPast
                ? "bg-red-500"
                : isUrgent
                ? "bg-amber-500"
                : "bg-green-500"
            }`}
          />
        </div>

        {/* Today marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
          style={{ left: `${todayPct}%` }}
        >
          <div className="h-4 w-4 rounded-full border-2 border-background bg-foreground shadow-md" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{formatDate(start)}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
            Heute
          </span>
          <span
            className={`flex items-center gap-1 ${
              isPast ? "text-red-500" : isUrgent ? "text-amber-500" : "text-green-500"
            }`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                isPast ? "bg-red-500" : isUrgent ? "bg-amber-500" : "bg-green-500"
              }`}
            />
            Letzter Kündigungstag
          </span>
        </div>
        <span>{formatDate(end)}</span>
      </div>
    </div>
  )
}

/* ─── Default State ─── */

const DEFAULT_TYPE = CONTRACT_TYPES[0]

/* ─── Component ─── */

export function Fristenrechner() {
  const [startDate, setStartDate] = useState("")
  const [selectedType, setSelectedType] = useState<ContractType>(DEFAULT_TYPE)
  const [customNotice, setCustomNotice] = useState("3")
  const [customDuration, setCustomDuration] = useState("12")
  const [isOpen, setIsOpen] = useState(false)
  const [copiedDate, setCopiedDate] = useState(false)

  /* ─── Reset ─── */
  const handleReset = useCallback(() => {
    setStartDate("")
    setSelectedType(DEFAULT_TYPE)
    setCustomNotice("3")
    setCustomDuration("12")
    setIsOpen(false)
    setCopiedDate(false)
  }, [])

  /* ─── Copy deadline date ─── */
  const handleCopyDate = useCallback(async (date: Date) => {
    try {
      await navigator.clipboard.writeText(formatDateLong(date))
      setCopiedDate(true)
      setTimeout(() => setCopiedDate(false), 2000)
    } catch {
      // ignore
    }
  }, [])

  /* ─── Auto-calculate (no button needed) ─── */
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

    const firstPossibleEnd = addMonths(start, minDuration)
    const lastNoticDate = addMonths(firstPossibleEnd, -noticePeriod)

    const today = new Date()
    let nextEnd = new Date(firstPossibleEnd)
    let nextNotice = new Date(lastNoticDate)

    while (nextEnd < today) {
      nextEnd = addMonths(nextEnd, 12)
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
      ? <AlertTriangle className="h-6 w-6 text-red-500 shrink-0" />
      : result.isUrgent
      ? <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
      : <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
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
            Geben Sie Ihren Vertragsbeginn ein — die Frist wird sofort berechnet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Input Card ── */}
          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Vertragsdaten
              </h3>
              {startDate && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Zurücksetzen
                </button>
              )}
            </div>

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

            {/* Тип договора */}
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Vertragstyp <span className="text-destructive">*</span>
              </Label>
              <div className="relative mt-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full h-12 rounded-xl border border-input bg-background px-4 text-left text-sm flex items-center justify-between hover:border-foreground/20 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <span>{selectedType.icon}</span>
                    {selectedType.label}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
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
                        <div className="flex items-center gap-2 font-medium text-foreground">
                          <span>{type.icon}</span>
                          {type.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 pl-6">
                          {type.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Custom fields */}
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
                  <span className="font-semibold text-foreground">
                    {selectedType.icon} {selectedType.label}:
                  </span>{" "}
                  Mindestlaufzeit{" "}
                  <strong>{selectedType.minDurationMonths} Monate</strong>,
                  Kündigungsfrist{" "}
                  <strong>
                    {selectedType.noticePeriodMonths} Monat
                    {selectedType.noticePeriodMonths > 1 ? "e" : ""}
                  </strong>
                </div>
              </div>
            )}

            {/* No-date hint */}
            {!startDate && (
              <p className="text-center text-sm text-muted-foreground py-2">
                ↑ Vertragsbeginn eingeben — Ergebnis erscheint sofort
              </p>
            )}
          </div>

          {/* ── Result Card ── */}
          <div className="space-y-4">
            {!result ? (
              <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm h-full flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
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
                <div
                  className={`rounded-2xl border p-5 animate-in fade-in slide-in-from-bottom-4 duration-300 ${statusColor}`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    {statusIcon}
                    <span className="text-lg font-black text-foreground">
                      {result.isOverdue
                        ? "Frist leider abgelaufen"
                        : result.isUrgent
                        ? `Nur noch ${result.daysUntilDeadline} Tage!`
                        : `Noch ${result.daysUntilDeadline} Tage Zeit`}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-9">
                    {result.isOverdue
                      ? "Sie können erst zum nächsten Verlängerungszeitraum kündigen."
                      : result.isUrgent
                      ? "Handeln Sie schnell — die Frist läuft bald ab!"
                      : "Sie haben noch ausreichend Zeit für Ihre Kündigung."}
                  </p>
                </div>

                {/* Timeline */}
                <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm animate-in fade-in duration-300 delay-75">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    Vertragszeitraum
                  </p>
                  <ContractTimeline
                    start={result.start}
                    end={result.nextEnd}
                    deadline={result.nextNotice}
                  />
                </div>

                {/* Details */}
                <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm space-y-1 animate-in fade-in duration-300 delay-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Ihre Fristen im Überblick
                  </p>

                  {[
                    { label: "Vertragsbeginn", value: formatDate(result.start) },
                    { label: "Mindestlaufzeit", value: `${result.minDuration} Monate` },
                    {
                      label: "Kündigungsfrist",
                      value: `${result.noticePeriod} Monat${result.noticePeriod > 1 ? "e" : ""}`,
                    },
                    {
                      label: "Nächstes Vertragsende",
                      value: formatDate(result.nextEnd),
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-semibold text-foreground">{value}</span>
                    </div>
                  ))}

                  {/* Main deadline date */}
                  <div
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl mt-2 ${
                      result.isOverdue
                        ? "bg-red-500/10 border border-red-500/20"
                        : result.isUrgent
                        ? "bg-amber-500/10 border border-amber-500/20"
                        : "bg-green-500/10 border border-green-500/20"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        Letzter Kündigungstag
                      </div>
                      <div className="text-base font-black text-foreground">
                        {formatDateLong(result.nextNotice)}
                      </div>
                    </div>
                    {result.isOverdue ? (
                      <AlertTriangle className="h-7 w-7 text-red-500 shrink-0" />
                    ) : (
                      <CheckCircle2
                        className={`h-7 w-7 shrink-0 ${
                          result.isUrgent ? "text-amber-500" : "text-green-500"
                        }`}
                      />
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 animate-in fade-in duration-300 delay-150">
                  {/* Copy date */}
                  <Button
                    variant="outline"
                    className="h-11 rounded-full text-sm font-semibold gap-2 border-border/60 hover:border-foreground/30"
                    onClick={() => handleCopyDate(result.nextNotice)}
                  >
                    {copiedDate ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Datum kopieren
                      </>
                    )}
                  </Button>

                  {/* Add to calendar */}
                  <Button
                    variant="outline"
                    className="h-11 rounded-full text-sm font-semibold gap-2 border-border/60 hover:border-foreground/30"
                    onClick={() =>
                      downloadIcs(result.nextNotice, selectedType.label)
                    }
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Kalender (.ics)
                  </Button>

                  {/* Reset */}
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="h-11 rounded-full text-sm font-semibold gap-2 border-border/60 hover:border-foreground/30"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Neu berechnen
                  </Button>

                  {/* Go to generator */}
                  <Button
                    onClick={() => prefillGenerator(selectedType)}
                    className="h-11 rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm font-semibold gap-2 transition-all duration-300"
                  >
                    Jetzt kündigen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}