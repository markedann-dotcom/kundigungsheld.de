"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  AlertTriangle,
  RefreshCw,
  X,
  ArrowUpDown,
  CheckSquare,
  Square,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  type ArchivedKundigung,
  getArchiv,
  updateArchivItem,
  deleteArchivItem,
} from "@/lib/archive"
import { generatePdf, openMailto, printKundigung } from "@/lib/pdf-generator"

/* ─── Constants ──────────────────────────────────────────────────────────── */

type Status = "erstellt" | "gesendet" | "bestaetigt"
type FilterStatus = Status | "alle"
type SortField = "datum" | "companyName" | "status"
type SortDir = "asc" | "desc"

const STATUS_CONFIG: Record<
  Status,
  { label: string; icon: typeof Clock; color: string; dot: string }
> = {
  erstellt: {
    label: "Erstellt",
    icon: Clock,
    color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
    dot: "bg-amber-400",
  },
  gesendet: {
    label: "Gesendet",
    icon: Send,
    color: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/40",
    dot: "bg-sky-400",
  },
  bestaetigt: {
    label: "Bestätigt",
    icon: Check,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
    dot: "bg-emerald-400",
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
  bgClass: string
}[] = [
  { key: "total",       label: "Gesamt",    colorClass: "text-foreground",                                          bgClass: "bg-muted/60" },
  { key: "erstellt",    label: "Erstellt",  colorClass: "text-amber-600 dark:text-amber-400",                       bgClass: "bg-amber-50 dark:bg-amber-950/30" },
  { key: "gesendet",    label: "Gesendet",  colorClass: "text-sky-600 dark:text-sky-400",                           bgClass: "bg-sky-50 dark:bg-sky-950/30" },
  { key: "bestaetigt",  label: "Bestätigt", colorClass: "text-emerald-600 dark:text-emerald-400",                   bgClass: "bg-emerald-50 dark:bg-emerald-950/30" },
]

const STATUSES: Status[] = ["erstellt", "gesendet", "bestaetigt"]

/* ─── Helpers ────────────────────────────────────────────────────────────── */

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
    month: "short",
    year: "numeric",
  })
}

function formatDateLong(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${cfg.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
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
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/60 bg-card/50 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

/* ─── Delete Confirmation Dialog ─────────────────────────────────────────── */

function DeleteDialog({
  open,
  companyName,
  count,
  onConfirm,
  onCancel,
}: {
  open: boolean
  companyName: string
  count?: number
  onConfirm: () => void
  onCancel: () => void
}) {
  const isBulk = (count ?? 0) > 1
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-start gap-3 mb-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 mt-0.5">
              <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg">
                {isBulk ? `${count} Kündigungen löschen?` : "Kündigung löschen?"}
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-1 text-sm text-muted-foreground">
                {isBulk
                  ? `${count} ausgewählte Kündigungen werden unwiderruflich aus Ihrem Archiv entfernt.`
                  : <>Die Kündigung für <span className="font-semibold text-foreground">{companyName}</span> wird unwiderruflich aus Ihrem Archiv entfernt.</>
                }{" "}
                Diese Aktion kann nicht rückgängig gemacht werden.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel onClick={onCancel} className="flex-1 sm:flex-none">
            Abbrechen
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 sm:flex-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            Endgültig löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ─── Sort button ─────────────────────────────────────────────────────────── */

function SortButton({
  field,
  currentField,
  currentDir,
  label,
  onClick,
}: {
  field: SortField
  currentField: SortField
  currentDir: SortDir
  label: string
  onClick: (f: SortField) => void
}) {
  const active = currentField === field
  return (
    <button
      type="button"
      onClick={() => onClick(field)}
      className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-foreground/8 text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {label}
      <ArrowUpDown className={`h-3 w-3 ${active ? "opacity-100" : "opacity-40"}`} />
      {active && (
        <span className="text-[10px] opacity-60">{currentDir === "asc" ? "↑" : "↓"}</span>
      )}
    </button>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export function ArchivClient() {
  const router = useRouter()
  const [items, setItems] = useState<ArchivedKundigung[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingNotiz, setEditingNotiz] = useState<string | null>(null)
  const [notizText, setNotizText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("alle")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ArchivedKundigung | null>(null)
  const [reCreatingId, setReCreatingId] = useState<string | null>(null)
  // Sorting
  const [sortField, setSortField] = useState<SortField>("datum")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)

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
    let result = items.filter((item) => {
      const matchesSearch =
        !q ||
        item.companyName.toLowerCase().includes(q) ||
        item.nachname.toLowerCase().includes(q) ||
        item.grundLabel.toLowerCase().includes(q)
      const matchesStatus =
        filterStatus === "alle" || item.status === filterStatus
      return matchesSearch && matchesStatus
    })

    result = [...result].sort((a, b) => {
      let cmp = 0
      if (sortField === "datum") {
        cmp = new Date(a.datum).getTime() - new Date(b.datum).getTime()
      } else if (sortField === "companyName") {
        cmp = a.companyName.localeCompare(b.companyName, "de")
      } else if (sortField === "status") {
        const order: Record<Status, number> = { erstellt: 0, gesendet: 1, bestaetigt: 2 }
        const sa = (a.status && STATUS_CONFIG[a.status]) ? a.status : "erstellt"
        const sb = (b.status && STATUS_CONFIG[b.status]) ? b.status : "erstellt"
        cmp = order[sa] - order[sb]
      }
      return sortDir === "asc" ? cmp : -cmp
    })

    return result
  }, [items, searchQuery, filterStatus, sortField, sortDir])

  const stats = useMemo(() => {
    const counts: Record<string, number> = { total: items.length }
    for (const s of STATUSES) {
      counts[s] = items.filter((i) => i.status === s).length
    }
    return counts
  }, [items])

  const hasItems = items.length > 0

  const allVisibleSelected =
    filteredItems.length > 0 &&
    filteredItems.every((i) => selectedIds.has(i.id))
  const someSelected = selectedIds.size > 0

  /* ─── Handlers ─── */

  const handleStatusChange = useCallback(
    (id: string, status: Status) => {
      updateArchivItem(id, { status })
      loadItems()
    },
    [loadItems]
  )

  const handleDeleteRequest = useCallback((item: ArchivedKundigung) => {
    setDeleteTarget(item)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return
    deleteArchivItem(deleteTarget.id)
    loadItems()
    setExpandedId((prev) => (prev === deleteTarget.id ? null : prev))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(deleteTarget.id)
      return next
    })
    setDeleteTarget(null)
  }, [deleteTarget, loadItems])

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null)
  }, [])

  const handleBulkDeleteConfirm = useCallback(() => {
    for (const id of selectedIds) {
      deleteArchivItem(id)
    }
    loadItems()
    setSelectedIds(new Set())
    setBulkDeleteOpen(false)
  }, [selectedIds, loadItems])

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
    const rows = items.map((item) => {
      const validStatus = (item.status && STATUS_CONFIG[item.status]) ? item.status : "erstellt"
      return [
        item.companyName,
        item.grundLabel,
        STATUS_CONFIG[validStatus].label,
        formatDateLong(item.datum),
        item.kuendigungZum,
        `${item.vorname} ${item.nachname}`,
        (item.notiz || "").replace(/\n/g, " "),
      ].join(";")
    })
    downloadBlob(
      "\uFEFF" + [header, ...rows].join("\n"),
      `KuendigungsHeld_Archiv_${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv;charset=utf-8"
    )
  }, [items])

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
    // close note editor when collapsing
    setEditingNotiz((prev) => (prev === id ? null : prev))
  }, [])

  const handleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"))
        return prev
      }
      setSortDir("desc")
      return field
    })
  }, [])

  const toggleSelectItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleSelectAll = useCallback(() => {
    if (allVisibleSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredItems.map((i) => i.id)))
    }
  }, [allVisibleSelected, filteredItems])

  const handleErneut = useCallback(
    (item: ArchivedKundigung) => {
      setReCreatingId(item.id)
      try {
        localStorage.setItem(
          "kundigung-prefill",
          JSON.stringify({
            companyName: item.companyName,
            formData: {
              vorname: item.vorname,
              nachname: item.nachname,
              grund: item.grund,
              kuendigungZum: item.kuendigungZum,
              kundennummer: "",
              vertragsnummer: "",
              kuendigungsDatum: "",
              zusatztext: "",
            },
          })
        )
        router.push("/#generator")
      } catch {
        router.push("/#generator")
      }
    },
    [router]
  )

  /* ─── Render ─────────────────────────────────────────────────────────────── */

  return (
    <section className="min-h-screen py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">

        {/* ── Dialogs ── */}
        <DeleteDialog
          open={!!deleteTarget}
          companyName={deleteTarget?.companyName ?? ""}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
        <DeleteDialog
          open={bulkDeleteOpen}
          companyName=""
          count={selectedIds.size}
          onConfirm={handleBulkDeleteConfirm}
          onCancel={() => setBulkDeleteOpen(false)}
        />

        {/* ── Back link ── */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground -ml-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Zur Startseite
            </Link>
          </Button>
        </div>

        {/* ── Page header ── */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Archive className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Mein Archiv
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {hasItems
                  ? `${items.length} Kündigung${items.length !== 1 ? "en" : ""} gespeichert`
                  : "Alle erstellten Kündigungen im Überblick"}
              </p>
            </div>
          </div>
          {hasItems && (
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 gap-1.5 text-xs"
              onClick={handleExportCsv}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">CSV exportieren</span>
              <span className="sm:hidden">CSV</span>
            </Button>
          )}
        </div>

        {/* ── Stats grid ── */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STAT_ITEMS.map(({ key, label, colorClass, bgClass }) => (
            <button
              key={key}
              type="button"
              onClick={() => key !== "total" && setFilterStatus(filterStatus === key ? "alle" : key as FilterStatus)}
              className={`group rounded-xl border p-4 text-left transition-all hover:shadow-sm ${bgClass} ${
                key !== "total" && filterStatus === key
                  ? "border-foreground/20 ring-2 ring-foreground/10"
                  : "border-border/60"
              }`}
            >
              <p className={`text-2xl font-bold tabular-nums ${colorClass}`}>
                {stats[key] ?? 0}
              </p>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">{label}</p>
            </button>
          ))}
        </div>

        {/* ── Search & filter ── */}
        {hasItems && (
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Unternehmen, Name oder Grund suchen…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-9"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="flex gap-1.5 rounded-xl border border-border/60 bg-card p-1" role="tablist" aria-label="Status-Filter">
              {FILTER_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={filterStatus === value}
                  onClick={() => setFilterStatus(value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    filterStatus === value
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Toolbar: sort + bulk actions ── */}
        {filteredItems.length > 0 && (
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-1">
              {/* Select-all toggle */}
              <button
                type="button"
                onClick={toggleSelectAll}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title={allVisibleSelected ? "Alle abwählen" : "Alle auswählen"}
              >
                {allVisibleSelected ? (
                  <CheckSquare className="h-4 w-4" />
                ) : someSelected ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {allVisibleSelected ? "Alle abwählen" : "Alle auswählen"}
                </span>
              </button>

              {/* Bulk delete */}
              {someSelected && (
                <button
                  type="button"
                  onClick={() => setBulkDeleteOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {selectedIds.size} löschen
                </button>
              )}
            </div>

            {/* Sort controls */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Sortieren:</span>
              <SortButton field="datum"        label="Datum"      currentField={sortField} currentDir={sortDir} onClick={handleSort} />
              <SortButton field="companyName"  label="Name"       currentField={sortField} currentDir={sortDir} onClick={handleSort} />
              <SortButton field="status"       label="Status"     currentField={sortField} currentDir={sortDir} onClick={handleSort} />
            </div>
          </div>
        )}

        {/* ── Empty: no items at all ── */}
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

        {/* ── Empty: no search results ── */}
        {hasItems && filteredItems.length === 0 && (
          <EmptyState
            icon={Search}
            title="Keine Ergebnisse"
            description="Versuchen Sie einen anderen Suchbegriff oder Filter."
            action={
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setFilterStatus("alle") }}>
                Filter zurücksetzen
              </Button>
            }
          />
        )}

        {/* ── Item list ── */}
        <div className="space-y-2.5" role="list">
          {filteredItems.map((item, index) => {
            const isExpanded = expandedId === item.id
            const isSelected = selectedIds.has(item.id)
            const validStatus = (item.status && STATUS_CONFIG[item.status]) ? item.status : "erstellt"
            const statusCfg = STATUS_CONFIG[validStatus]
            const isCopied = copiedId === item.id
            const isReCreating = reCreatingId === item.id

            return (
              <div
                key={item.id || `archiv-item-${index}`}
                role="listitem"
                className={`overflow-hidden rounded-xl border bg-card transition-all duration-200 ${
                  isSelected
                    ? "border-primary/40 ring-2 ring-primary/10 shadow-sm"
                    : "border-border/60 hover:border-border hover:shadow-sm"
                }`}
              >
                {/* ── Collapsed header ── */}
                <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleSelectItem(item.id)}
                    aria-label={isSelected ? "Abwählen" : "Auswählen"}
                    className="shrink-0 text-muted-foreground/40 hover:text-primary transition-colors"
                  >
                    {isSelected
                      ? <CheckSquare className="h-4 w-4 text-primary" />
                      : <Square className="h-4 w-4" />
                    }
                  </button>

                  {/* Expand toggle — takes rest of width */}
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`archiv-panel-${item.id || index}`}
                    onClick={() => toggleExpand(item.id)}
                    className="flex flex-1 items-center gap-3 text-left focus-visible:outline-none min-w-0"
                  >
                    {/* Icon */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                      <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-foreground text-sm truncate">
                          {item.companyName}
                        </span>
                        <StatusBadge status={validStatus} />
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-muted-foreground">
                        <span>{item.grundLabel}</span>
                        <span className="opacity-40">·</span>
                        <time dateTime={item.datum}>{formatDate(item.datum)}</time>
                        <span className="opacity-40">·</span>
                        <span>Kündigung zum {item.kuendigungZum}</span>
                        {item.notiz && (
                          <>
                            <span className="opacity-40">·</span>
                            <span className="flex items-center gap-1">
                              <StickyNote className="h-3 w-3" />
                              Notiz
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* ── Expanded panel ── */}
                {isExpanded && (
                  <div
                    id={`archiv-panel-${item.id || index}`}
                    className="border-t border-border/40 bg-muted/20 px-4 pb-5 pt-4 sm:px-5 space-y-4"
                  >
                    {/* Status change */}
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Status
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {STATUSES.map((status) => {
                          const cfg = STATUS_CONFIG[status]
                          const Icon = cfg.icon
                          const isActive = item.status === status
                          return (
                            <button
                              key={status}
                              type="button"
                              onClick={() => handleStatusChange(item.id, status)}
                              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                                isActive
                                  ? cfg.color + " shadow-sm"
                                  : "border-border/60 bg-background text-muted-foreground hover:border-border hover:text-foreground"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                              {cfg.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
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
                            className="resize-none text-sm bg-background"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleNotizSave(item.id)} className="text-xs h-8">
                              Speichern
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingNotiz(null)} className="text-xs h-8">
                              Abbrechen
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEditingNotiz(item)}
                          className="w-full rounded-lg border border-dashed border-border/60 bg-background p-3 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                        >
                          {item.notiz || (
                            <span className="text-muted-foreground/50">
                              Klicken, um eine Notiz hinzuzufügen…
                            </span>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Letter preview */}
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Kündigungsschreiben
                      </p>
                      <pre className="max-h-56 overflow-auto rounded-lg border border-border/40 bg-background p-4 font-mono text-[11px] leading-relaxed text-foreground/70 scrollbar-thin">
                        {item.text}
                      </pre>
                    </div>

                    {/* Action buttons */}
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Aktionen
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className={`gap-1.5 text-xs h-8 transition-all ${isCopied ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : ""}`}
                          onClick={() => handleCopy(item.text, item.id)}
                        >
                          {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {isCopied ? "Kopiert!" : "Kopieren"}
                        </Button>

                        <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8" onClick={() => handleDownloadTxt(item)}>
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                          TXT
                        </Button>

                        <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8" onClick={() => generatePdf(item.text, item.companyName)}>
                          <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                          PDF
                        </Button>

                        <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8" onClick={() => printKundigung(item.text, item.companyName)}>
                          <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                          Drucken
                        </Button>

                        <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8" onClick={() => openMailto(item.text, item.companyName)}>
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          E-Mail
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs h-8 text-primary border-primary/30 hover:bg-primary/5 hover:border-primary/60"
                          onClick={() => handleErneut(item)}
                        >
                          {isReCreating
                            ? <><Check className="h-3.5 w-3.5" />Wird geladen…</>
                            : <><RefreshCw className="h-3.5 w-3.5" />Erneut erstellen</>
                          }
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs h-8 text-destructive border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive ml-auto"
                          onClick={() => handleDeleteRequest(item)}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          Löschen
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Privacy notice ── */}
        {hasItems && (
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Alle Daten werden lokal in Ihrem Browser gespeichert — keine Übertragung an Server.
          </div>
        )}
      </div>
    </section>
  )
}