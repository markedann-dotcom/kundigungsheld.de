"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  Trash2,
  Check,
  Send,
  Clock,
  ChevronDown,
  Copy,
  Download,
  StickyNote,
  Archive,
  Search,
  Printer,
  Mail,
  FileDown,
  FileSpreadsheet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  type ArchivedKundigung,
  getArchiv,
  updateArchivItem,
  deleteArchivItem,
} from "@/lib/archive"
import { generatePdf, openMailto, printKundigung } from "@/lib/pdf-generator"

/* ─── Constants ─── */

type Status = "erstellt" | "gesendet" | "bestaetigt"
type FilterStatus = Status | "alle"

const STATUS_CONFIG: Record<
  Status,
  { label: string; icon: typeof Clock; color: string }
> = {
  erstellt: {
    label: "Erstellt",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  gesendet: {
    label: "Gesendet",
    icon: Send,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  bestaetigt: {
    label: "Bestätigt",
    icon: Check,
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
} as const

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "alle", label: "Alle" },
  { value: "erstellt", label: "Erstellt" },
  { value: "gesendet", label: "Gesendet" },
  { value: "bestaetigt", label: "Bestätigt" },
]

const STAT_ITEMS: {
  key: "total" | Status
  label: string
  colorClass: string
}[] = [
  { key: "total", label: "Gesamt", colorClass: "text-foreground" },
  { key: "erstellt", label: "Erstellt", colorClass: "text-yellow-600 dark:text-yellow-400" },
  { key: "gesendet", label: "Gesendet", colorClass: "text-blue-600 dark:text-blue-400" },
  { key: "bestaetigt", label: "Bestätigt", colorClass: "text-green-600 dark:text-green-400" },
]

const STATUSES: Status[] = ["erstellt", "gesendet", "bestaetigt"]

/* ─── Helpers ─── */

function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/* ─── Sub-components ─── */

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
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-card text-muted-foreground hover:bg-muted"
      } ${className}`}
    >
      {children}
    </button>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof FileText
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border/60 bg-card py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground/50" aria-hidden="true" />
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "outline",
  className = "",
}: {
  icon: typeof Copy
  label: string
  onClick: () => void
  variant?: "outline" | "default"
  className?: string
}) {
  return (
    <Button
      size="sm"
      variant={variant}
      className={`gap-1.5 text-xs ${className}`}
      onClick={onClick}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </Button>
  )
}

/* ─── Main Component ─── */

export function ArchivClient() {
  const [items, setItems] = useState<ArchivedKundigung[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingNotiz, setEditingNotiz] = useState<string | null>(null)
  const [notizText, setNotizText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("alle")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  /* ─── Data loading ─── */

  const loadItems = useCallback(() => {
    setItems(getArchiv())
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  /* ─── Derived state ─── */

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.companyName.toLowerCase().includes(q) ||
        item.nachname.toLowerCase().includes(q) ||
        item.grundLabel.toLowerCase().includes(q)
      const matchesStatus =
        filterStatus === "alle" || item.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [items, searchQuery, filterStatus])

  const stats = useMemo(() => {
    const counts: Record<string, number> = { total: items.length }
    for (const s of STATUSES) {
      counts[s] = items.filter((i) => i.status === s).length
    }
    return counts
  }, [items])

  const hasItems = items.length > 0

  /* ─── Handlers ─── */

  const handleStatusChange = useCallback(
    (id: string, status: Status) => {
      updateArchivItem(id, { status })
      loadItems()
    },
    [loadItems]
  )

  const handleDelete = useCallback(
    (id: string) => {
      if (!window.confirm("Möchten Sie diese Kündigung wirklich löschen?")) return
      deleteArchivItem(id)
      loadItems()
      setExpandedId((prev) => (prev === id ? null : prev))
    },
    [loadItems]
  )

  const handleNotizSave = useCallback(
    (id: string) => {
      updateArchivItem(id, { notiz: notizText })
      loadItems()
      setEditingNotiz(null)
    },
    [notizText, loadItems]
  )

  const startEditingNotiz = useCallback((item: ArchivedKundigung) => {
    setEditingNotiz(item.id)
    setNotizText(item.notiz || "")
  }, [])

  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      /* clipboard not available */
    }
  }, [])

  const handleDownloadTxt = useCallback((item: ArchivedKundigung) => {
    downloadBlob(
      item.text,
      `Kuendigung_${sanitizeFilename(item.companyName)}_${item.datum.slice(0, 10)}.txt`,
      "text/plain;charset=utf-8"
    )
  }, [])

  const handleExportCsv = useCallback(() => {
    const header = "Unternehmen;Grund;Status;Datum;Kündigung zum;Name;Notiz"
    const rows = items.map((item) =>
      [
        item.companyName,
        item.grundLabel,
        STATUS_CONFIG[item.status].label,
        formatDate(item.datum),
        item.kuendigungZum,
        `${item.vorname} ${item.nachname}`,
        (item.notiz || "").replace(/\n/g, " "),
      ].join(";")
    )
    downloadBlob(
      "\uFEFF" + [header, ...rows].join("\n"),
      `KuendigungsHeld_Archiv_${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv;charset=utf-8"
    )
  }, [items])

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  /* ─── Render ─── */

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        {/* Back link */}
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Zur Startseite
            </Link>
          </Button>
        </div>

        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Archive className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
                Mein Archiv
              </h1>
              <p className="mt-1 text-muted-foreground">
                Übersicht über alle erstellten Kündigungen
              </p>
            </div>
          </div>
        </div>

        {/* CSV export */}
        {hasItems && (
          <div className="mb-4 flex justify-end">
            <ActionButton
              icon={FileSpreadsheet}
              label="Archiv als CSV exportieren"
              onClick={handleExportCsv}
            />
          </div>
        )}

        {/* Stats grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STAT_ITEMS.map(({ key, label, colorClass }) => (
            <div
              key={key}
              className="rounded-xl border border-border/60 bg-card p-4"
            >
              <p className={`text-2xl font-bold ${colorClass}`}>
                {stats[key] ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Search & filter */}
        {hasItems && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Suchen nach Unternehmen, Name oder Grund..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2" role="tablist" aria-label="Status-Filter">
              {FILTER_OPTIONS.map(({ value, label }) => (
                <ToggleButton
                  key={value}
                  active={filterStatus === value}
                  onClick={() => setFilterStatus(value)}
                >
                  {label}
                </ToggleButton>
              ))}
            </div>
          </div>
        )}

        {/* Empty state: no items at all */}
        {!hasItems && (
          <EmptyState
            icon={FileText}
            title="Noch keine Kündigungen"
            description="Erstellen Sie Ihre erste Kündigung mit unserem Generator. Sie können sie anschließend hier im Archiv speichern und verwalten."
            action={
              <Button className="rounded-full px-6" asChild>
                <Link href="/#generator">Kündigung erstellen</Link>
              </Button>
            }
          />
        )}

        {/* Empty state: no search results */}
        {hasItems && filteredItems.length === 0 && (
          <EmptyState
            icon={Search}
            title="Keine Ergebnisse"
            description="Versuchen Sie einen anderen Suchbegriff oder Filter."
          />
        )}

        {/* Item list */}
        <div className="space-y-3" role="list">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id
            const statusCfg = STATUS_CONFIG[item.status]
            const StatusIcon = statusCfg.icon
            const isCopied = copiedId === item.id

            return (
              <div
                key={item.id}
                role="listitem"
                className="overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:shadow-sm"
              >
                {/* Collapsed header */}
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`archiv-panel-${item.id}`}
                  onClick={() => toggleExpand(item.id)}
                  className="flex w-full items-center gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold text-foreground">
                        {item.companyName}
                      </h3>
                      <Badge
                        className={`shrink-0 border-0 text-xs ${statusCfg.color}`}
                      >
                        <StatusIcon className="mr-1 h-3 w-3" aria-hidden="true" />
                        {statusCfg.label}
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>{item.grundLabel}</span>
                      <time dateTime={item.datum}>{formatDate(item.datum)}</time>
                      <span>Kündigung zum: {item.kuendigungZum}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Expanded panel */}
                {isExpanded && (
                  <div
                    id={`archiv-panel-${item.id}`}
                    className="border-t border-border/40 px-4 pb-5 pt-4 sm:px-5"
                  >
                    {/* Status change */}
                    <div className="mb-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Status ändern
                      </p>
                      <div className="flex gap-2">
                        {STATUSES.map((status) => {
                          const cfg = STATUS_CONFIG[status]
                          const Icon = cfg.icon
                          return (
                            <ToggleButton
                              key={status}
                              active={item.status === status}
                              onClick={() => handleStatusChange(item.id, status)}
                              className="flex items-center gap-1.5 text-xs"
                            >
                              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                              {cfg.label}
                            </ToggleButton>
                          )
                        })}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        <StickyNote className="h-3.5 w-3.5" aria-hidden="true" />
                        Notiz
                      </p>
                      {editingNotiz === item.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={notizText}
                            onChange={(e) => setNotizText(e.target.value)}
                            placeholder="Notiz hinzufügen (z.B. Versanddatum, Tracking-Nummer...)"
                            rows={3}
                            className="resize-none text-sm"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleNotizSave(item.id)}
                              className="text-xs"
                            >
                              Speichern
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingNotiz(null)}
                              className="text-xs"
                            >
                              Abbrechen
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEditingNotiz(item)}
                          className="w-full rounded-lg border border-dashed border-border/60 p-3 text-left text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          {item.notiz || "Klicken, um eine Notiz hinzuzufügen..."}
                        </button>
                      )}
                    </div>

                    {/* Letter preview */}
                    <div className="mb-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Kündigungsschreiben
                      </p>
                      <pre className="max-h-60 overflow-auto rounded-lg border border-border/40 bg-muted/30 p-4 font-sans text-xs leading-relaxed text-foreground/80">
                        {item.text}
                      </pre>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      <ActionButton
                        icon={isCopied ? Check : Copy}
                        label={isCopied ? "Kopiert!" : "Kopieren"}
                        onClick={() => handleCopy(item.text, item.id)}
                      />
                      <ActionButton
                        icon={Download}
                        label="TXT"
                        onClick={() => handleDownloadTxt(item)}
                      />
                      <ActionButton
                        icon={FileDown}
                        label="PDF"
                        onClick={() => generatePdf(item.text, item.companyName)}
                      />
                      <ActionButton
                        icon={Printer}
                        label="Drucken"
                        onClick={() => printKundigung(item.text)}
                      />
                      <ActionButton
                        icon={Mail}
                        label="E-Mail"
                        onClick={() => openMailto(item.text, item.companyName)}
                      />
                      <ActionButton
                        icon={Trash2}
                        label="Löschen"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Privacy notice */}
        {hasItems && (
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
            <p className="text-sm text-muted-foreground">
              Alle Daten werden lokal in Ihrem Browser gespeichert. Es werden
              keine Daten an Server übertragen.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}