"use client"

import { useState, useMemo } from "react"
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  CalendarPlus,
  Share2,
  RotateCcw,
  TrendingUp,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

/* ─── Types ─── */

interface ContractType {
  id: string
  label: string
  emoji: string
  noticePeriodMonths: number
  minDurationMonths: number
  renewalMonths: number // how long it auto-renews after min duration
  description: string
}

/* ─── Contract Types ─── */

const CONTRACT_TYPES: ContractType[] = [
  {
    id: "handy",
    label: "Mobilfunk / Handy",
    emoji: "📱",
    noticePeriodMonths: 1,
    minDurationMonths: 24,
    renewalMonths: 12,
    description: "2-Jahres-Vertrag, 1 Monat Kündigungsfrist",
  },
  {
    id: "internet",
    label: "Internet / DSL",
    emoji: "🌐",
    noticePeriodMonths: 1,
    minDurationMonths: 24,
    renewalMonths: 12,
    description: "2-Jahres-Vertrag, 1 Monat Kündigungsfrist",
  },
  {
    id: "streaming",
    label: "Streaming (Netflix, DAZN...)",
    emoji: "🎬",
    noticePeriodMonths: 1,
    minDurationMonths: 1,
    renewalMonths: 1,
    description: "Monatlich kündbar, 1 Monat Frist",
  },
  {
    id: "fitness",
    label: "Fitnessstudio",
    emoji: "💪",
    noticePeriodMonths: 3,
    minDurationMonths: 12,
    renewalMonths: 12,
    description: "1 Jahr Mindestlaufzeit, 3 Monate Frist",
  },
  {
    id: "versicherung",
    label: "Versicherung",
    emoji: "🛡️",
    noticePeriodMonths: 3,
    minDurationMonths: 12,
    renewalMonths: 12,
    description: "Jährlich kündbar, 3 Monate vor Ablauf",
  },
  {
    id: "strom",
    label: "Strom / Gas",
    emoji: "⚡",
    noticePeriodMonths: 1,
    minDurationMonths: 12,
    renewalMonths: 12,
    description: "1 Jahr Mindestlaufzeit, 1 Monat Frist",
  },
  {
    id: "zeitung",
    label: "Zeitschrift / Zeitung",
    emoji: "📰",
    noticePeriodMonths: 1,
    minDurationMonths: 12,
    renewalMonths: 12,
    description: "Jährlich kündbar, 1 Monat Frist",
  },
  {
    id: "custom",
    label: "Eigene Eingabe",
    emoji: "✏️",
    noticePeriodMonths: 0,
    minDurationMonths: 0,
    renewalMonths: 12,
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

function formatMoneyFromMonths(months: number, monthlyPrice: number): string {
  return (months * monthlyPrice).toFixed(2).replace(".", ",") + " €"
}

/* ─── Calendar Export ─── */

function exportToICS(title: string, date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  const d = date
  const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${dateStr}`,
    `SUMMARY:⚠️ Letzte Kündigung: ${title}`,
    `DESCRIPTION:Letzter Kündigungstag für Ihren Vertrag — berechnet von Kündigungsheld.de`,
    `ALARM:TRIGGER:-P7D`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `kuendigung_${title.replace(/\s+/g, "_")}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/* ─── Progress Ring ─── */

function ProgressRing({ days, maxDays = 365 }: { days: number; maxDays?: number }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, days / maxDays))
  const offset = circ * (1 - pct)

  const color = days < 0 ? "#ef4444" : days <= 30 ? "#f59e0b" : "#22c55e"

  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className="rotate-[-90deg]">
      <circle cx="44" cy="44" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
      <circle
        cx="44"
        cy="44"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
      />
    </svg>
  )
}

/* ─── Timeline ─── */

function Timeline({
  start,
  firstEnd,
  nextNotice,
  nextEnd,
}: {
  start: Date
  firstEnd: Date
  nextNotice: Date
  nextEnd: Date
}) {
  const today = new Date()
  const totalMs = nextEnd.getTime() - start.getTime()

  const pct = (date: Date) =>
    Math.max(0, Math.min(100, ((date.getTime() - start.getTime()) / totalMs) * 100))

  const todayPct = pct(today)
  const noticePct = pct(nextNotice)
  const endPct = pct(nextEnd)

  return (
    <div className="space-y-2">
      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Zeitstrahl</div>
      <div className="relative h-3 rounded-full bg-muted overflow-hidden">
        {/* elapsed */}
        <div
          className="absolute left-0 top-0 h-full bg-foreground/20 rounded-full transition-all duration-700"
          style={{ width: `${todayPct}%` }}
        />
        {/* notice zone */}
        <div
          className="absolute top-0 h-full bg-amber-400/40 transition-all duration-700"
          style={{ left: `${noticePct}%`, width: `${endPct - noticePct}%` }}
        />
        {/* today marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-foreground transition-all duration-700"
          style={{ left: `${todayPct}%` }}
        />
        {/* notice deadline marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-amber-500 transition-all duration-700"
          style={{ left: `${noticePct}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
        <span>{formatDate(start)}</span>
        <span className="text-amber-600 font-bold">Frist: {formatDate(nextNotice)}</span>
        <span>{formatDate(nextEnd)}</span>
      </div>
    </div>
  )
}

/* ─── Component ─── */

export function Fristenrechner() {
  const [startDate, setStartDate] = useState("")
  const [contractName, setContractName] = useState("")
  const [monthlyPrice, setMonthlyPrice] = useState("")
  const [selectedType, setSelectedType] = useState<ContractType>(CONTRACT_TYPES[0])
  const [customNotice, setCustomNotice] = useState("3")
  const [customDuration, setCustomDuration] = useState("12")
  const [customRenewal, setCustomRenewal] = useState("12")
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!startDate) return null

    const start = new Date(startDate)
    if (isNaN(start.getTime())) return null

    const noticePeriod =
      selectedType.id === "custom" ? parseInt(customNotice) || 0 : selectedType.noticePeriodMonths

    const minDuration =
      selectedType.id === "custom" ? parseInt(customDuration) || 0 : selectedType.minDurationMonths

    const renewal =
      selectedType.id === "custom" ? parseInt(customRenewal) || 12 : selectedType.renewalMonths

    const firstPossibleEnd = addMonths(start, minDuration)
    const today = new Date()

    let nextEnd = new Date(firstPossibleEnd)
    while (nextEnd <= today) {
      nextEnd = addMonths(nextEnd, renewal)
    }

    const nextNotice = addMonths(nextEnd, -noticePeriod)
    const daysUntilDeadline = getDaysUntil(nextNotice)
    const isOverdue = daysUntilDeadline < 0
    const isUrgent = daysUntilDeadline >= 0 && daysUntilDeadline <= 30
    const isSafe = daysUntilDeadline > 30

    // Cost until next end
    const monthsUntilEnd = Math.max(
      0,
      (nextEnd.getFullYear() - today.getFullYear()) * 12 +
        (nextEnd.getMonth() - today.getMonth())
    )
    const price = parseFloat(monthlyPrice.replace(",", ".")) || 0
    const totalCostUntilEnd = price * monthsUntilEnd

    // Already paid since start
    const monthsSinceStart = Math.max(
      0,
      (today.getFullYear() - start.getFullYear()) * 12 +
        (today.getMonth() - start.getMonth())
    )
    const totalPaid = price * monthsSinceStart

    return {
      start,
      firstPossibleEnd,
      nextEnd,
      nextNotice,
      daysUntilDeadline,
      isOverdue,
      isUrgent,
      isSafe,
      noticePeriod,
      minDuration,
      renewal,
      monthsUntilEnd,
      totalCostUntilEnd,
      totalPaid,
      price,
    }
  }, [startDate, selectedType, customNotice, customDuration, customRenewal, monthlyPrice])

  const reset = () => {
    setStartDate("")
    setContractName("")
    setMonthlyPrice("")
    setSelectedType(CONTRACT_TYPES[0])
    setCustomNotice("3")
    setCustomDuration("12")
    setCustomRenewal("12")
  }

  const handleShare = async () => {
    if (!result) return
    const text = `Letzter Kündigungstag${contractName ? ` für ${contractName}` : ""}: ${formatDateLong(result.nextNotice)} — noch ${result.daysUntilDeadline} Tage!`
    try {
      if (navigator.share) {
        await navigator.share({ title: "Kündigungsfrist", text })
      } else {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch { /* ignore */ }
  }

  const statusBg = result
    ? result.isOverdue
      ? "border-red-500/30 bg-red-500/5"
      : result.isUrgent
      ? "border-amber-500/30 bg-amber-500/5"
      : "border-green-500/30 bg-green-500/5"
    : ""

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
          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Vertragsdaten
              </h3>
              {(startDate || contractName) && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Zurücksetzen
                </button>
              )}
            </div>

            {/* Название контракта */}
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Bezeichnung <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
                placeholder="z.B. Vodafone Handyvertrag"
                className="mt-2 h-12 rounded-xl"
              />
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
                  <span className="font-medium flex items-center gap-2">
                    <span>{selectedType.emoji}</span>
                    {selectedType.label}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden max-h-72 overflow-y-auto">
                    {CONTRACT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => { setSelectedType(type); setIsOpen(false) }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0 ${
                          selectedType.id === type.id ? "bg-muted/50 font-semibold" : ""
                        }`}
                      >
                        <div className="font-medium text-foreground flex items-center gap-2">
                          <span>{type.emoji}</span>
                          {type.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 ml-6">{type.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Кастомные поля */}
            {selectedType.id === "custom" && (
              <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2">
                <div>
                  <Label className="text-xs font-semibold text-foreground">Mindestlaufzeit (M.)</Label>
                  <Input type="number" min="1" max="120" value={customDuration} onChange={(e) => setCustomDuration(e.target.value)} className="mt-2 h-10 rounded-xl" placeholder="12" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground">Kündigungsfrist (M.)</Label>
                  <Input type="number" min="1" max="12" value={customNotice} onChange={(e) => setCustomNotice(e.target.value)} className="mt-2 h-10 rounded-xl" placeholder="3" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground">Verlängerung (M.)</Label>
                  <Input type="number" min="1" max="12" value={customRenewal} onChange={(e) => setCustomRenewal(e.target.value)} className="mt-2 h-10 rounded-xl" placeholder="12" />
                </div>
              </div>
            )}

            {/* Monthly price */}
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Monatlicher Beitrag <span className="text-muted-foreground font-normal">(optional, für Kostenrechnung)</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  placeholder="9,99"
                  className="h-12 rounded-xl pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">€</span>
              </div>
            </div>

            {/* Info Banner */}
            {selectedType.id !== "custom" && (
              <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{selectedType.label}:</span>{" "}
                  Mindestlaufzeit <strong>{selectedType.minDurationMonths} Monate</strong>,
                  Kündigungsfrist <strong>{selectedType.noticePeriodMonths} Monat{selectedType.noticePeriodMonths !== 1 ? "e" : ""}</strong>,
                  Verlängerung um <strong>{selectedType.renewalMonths} Monate</strong>
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
                {/* Status Banner with Ring */}
                <div className={`rounded-2xl border p-6 ${statusBg}`}>
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <ProgressRing
                        days={result.daysUntilDeadline}
                        maxDays={result.renewal * 30}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-black tabular-nums ${
                          result.isOverdue ? "text-red-500" : result.isUrgent ? "text-amber-500" : "text-green-500"
                        }`}>
                          {result.isOverdue ? "✗" : `${Math.max(0, result.daysUntilDeadline)}d`}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground">
                        {result.isOverdue
                          ? "Frist abgelaufen"
                          : result.isUrgent
                          ? `Noch ${result.daysUntilDeadline} Tage!`
                          : `Noch ${result.daysUntilDeadline} Tage`}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {result.isOverdue
                          ? "Kündigung erst zum nächsten Verlängerungszeitraum möglich"
                          : result.isUrgent
                          ? "Handeln Sie schnell — die Frist läuft bald ab!"
                          : "Sie haben noch ausreichend Zeit für Ihre Kündigung"}
                      </p>
                      {contractName && (
                        <p className="text-xs text-muted-foreground mt-1 font-semibold">{contractName}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
                  <Timeline
                    start={result.start}
                    firstEnd={result.firstPossibleEnd}
                    nextNotice={result.nextNotice}
                    nextEnd={result.nextEnd}
                  />
                </div>

                {/* Детали */}
                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Fristen im Überblick
                  </h3>

                  {[
                    { label: "Vertragsbeginn", value: formatDate(result.start) },
                    { label: "Mindestlaufzeit", value: `${result.minDuration} Monate` },
                    { label: "Kündigungsfrist", value: `${result.noticePeriod} Monat${result.noticePeriod !== 1 ? "e" : ""}` },
                    { label: "Verlängerung um", value: `${result.renewal} Monate` },
                    { label: "Nächstes Vertragsende", value: formatDate(result.nextEnd) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-semibold text-foreground">{value}</span>
                    </div>
                  ))}

                  {/* Letzter Kündigungstag — highlighted */}
                  <div className={`flex items-center justify-between py-4 px-4 rounded-xl mt-2 ${
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
                    {result.isOverdue
                      ? <AlertTriangle className="h-8 w-8 text-red-500 shrink-0" />
                      : <CheckCircle2 className={`h-8 w-8 shrink-0 ${result.isUrgent ? "text-amber-500" : "text-green-500"}`} />
                    }
                  </div>
                </div>

                {/* Kostenrechnung */}
                {result.price > 0 && (
                  <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Kostenrechnung
                    </h3>
                    <div className="flex items-center justify-between py-2.5 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Monatlich</span>
                      <span className="text-sm font-semibold text-foreground">{result.price.toFixed(2).replace(".", ",")} €</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Bisher bezahlt</span>
                      <span className="text-sm font-semibold text-foreground">{formatMoneyFromMonths(1, result.totalPaid)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5">
                      <span className="text-sm text-muted-foreground">Noch bis Vertragsende</span>
                      <span className={`text-sm font-black ${result.isOverdue ? "text-red-500" : "text-foreground"}`}>
                        {result.totalCostUntilEnd.toFixed(2).replace(".", ",")} €
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => exportToICS(contractName || selectedType.label, result.nextNotice)}
                    className="h-12 rounded-xl flex items-center gap-2 text-sm font-semibold"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Im Kalender speichern
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="h-12 rounded-xl flex items-center gap-2 text-sm font-semibold"
                  >
                    <Share2 className="h-4 w-4" />
                    {copied ? "Kopiert!" : "Teilen"}
                  </Button>
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