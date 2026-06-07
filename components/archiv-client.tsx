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
  { label: string; icon: typeof Clock; color: string; dot: string; ring: string }
> = {
  erstellt: {
    label: "Erstellt",
    icon: Clock,
    color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
    dot: "bg-amber-400",
    ring: "ring-amber-400/20",
  },
  gesendet: {
    label: "Gesendet",
    icon: Send,
    color: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/40",
    dot: "bg-sky-400",
    ring: "ring-sky-400/20",
  },
  bestaetigt: {
    label: "Bestätigt",
    icon: Check,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/20",
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
  borderActive: string
}[] = [
  { key: "total",      label: "Gesamt",    colorClass: "text-foreground",                            bgClass: "bg-muted/40",              borderActive: "border-foreground/20" },
  { key: "erstellt",   label: "Erstellt",  colorClass: "text-amber-600 dark:text-amber-400",         bgClass: "bg-amber-50 dark:bg-amber-950/30",   borderActive: "border-amber-300 dark:border-amber-700" },
  { key: "gesendet",   label: "Gesendet",  colorClass: "text-sky-600 dark:text-sky-400",             bgClass: "bg-sky-50 dark:bg-sky-950/30",       borderActive: "border-sky-300 dark:border-sky-700" },
  { key: "bestaetigt", label: "Bestätigt", colorClass: "text-emerald-600 dark:text-emerald-400",     bgClass: "bg-emerald-50 dark:bg-emerald-950/30", borderActive: "border-emerald-300 dark:border-emerald-700" },
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
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/50 bg-muted/20 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted shadow-sm">
        <Icon className="h-7 w-7 text-muted-foreground/30" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">{description}</p>
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
      <AlertDialogContent className="max-w-sm rounded-2xl">
        <AlertDialogHeader>
          <div className="flex items-start gap-4 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
            </div>
            <div>
              <AlertDialogTitle className="text-base font-semibold">
                {isBulk ? `${count} Einträge löschen?` : "Eintrag löschen?"}
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {isBulk
                  ? `${count} ausgewählte Kündigungen werden unwiderruflich entfernt.`
                  : <>Kündigung für <span className="font-medium text-foreground">{companyName}</span> wird unwiderruflich entfernt.</>
                }
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 mt-2">
          <AlertDialogCancel onClick={onCancel} className="flex-1 rounded-xl">
            Abbrechen
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Löschen
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
      className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-150 ${
        active
          ? "bg-foreground/8 text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {label}
      {active
        ? <span className="text-[11px] opacity-70 ml-0.5">{currentDir === "asc" ? "↑" : "↓"}</span>
        : <ArrowUpDown className="h-3 w-3 opacity-30" />
      }
    </button>
  )
}

/* ─── Action button helper ─────────────────────────────────────────────────── */

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  active = false,
  className = "",
}: {
  icon: typeof Copy
  label: string
  onClick: () => void
  variant?: "default" | "danger" | "primary"
  active?: boolean
  className?: string
}) {
  const base = "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-150 select-none"
  const variants = {
    default: "border-border/60 bg-background text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50",
    danger: "border-destructive/20 bg-background text-destructive hover:bg-destructive/8 hover:border-destructive/40",
    primary: "border-primary/30 bg-background text-primary hover:bg-primary/6 hover:border-primary/50",
  }
  const activeClass = active ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : ""

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${active ? activeClass : variants[variant]} ${className}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {label}
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
  const [sortField, setSortField] = useState<SortField>("datum")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)

  const loadItems = useCallback(() => setItems(getArchiv()), [])
  useEffect(() => { loadItems() }, [loadItems])

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase()
    let result = items.filter((item) => {
      const matchesSearch =
        !q ||
        item.companyName.toLowerCase().includes(q) ||
        item.nachname.toLowerCase().includes(q) ||
        item.grundLabel.toLowerCase().includes(q)
      const matchesStatus = filterStatus === "alle" || item.status === filterStatus
      return matchesSearch && matchesStatus
    })
    result = [...result].sort((a, b) => {
      let cmp = 0
      if (sortField === "datum") cmp = new Date(a.datum).getTime() - new Date(b.datum).getTime()
      else if (sortField === "companyName") cmp = a.companyName.localeCompare(b.companyName, "de")
      else if (sortField === "status") {
        const order: Record<Status, number> = { erstellt: 0, gesendet: 1, bestaetigt: 2 }
        const sa = (a.status && STATUS_CONFIG[a.status as Status]) ? a.status as Status : "erstellt"
        const sb = (b.status && STATUS_CONFIG[b.status as Status]) ? b.status as Status : "erstellt"
        cmp = order[sa] - order[sb]
      }
      return sortDir === "asc" ? cmp : -cmp
    })
    return result
  }, [items, searchQuery, filterStatus, sortField, sortDir])

  const stats = useMemo(() => {
    const counts: Record<string, number> = { total: items.length }
    for (const s of STATUSES) counts[s] = items.filter((i) => i.status === s).length
    return counts
  }, [items])

  const hasItems = items.length > 0
  const allVisibleSelected = filteredItems.length > 0 && filteredItems.every((i) => selectedIds.has(i.id))
  const someSelected = selectedIds.size > 0

  const handleStatusChange = useCallback((id: string, status: Status) => {
    updateArchivItem(id, { status })
    loadItems()
  }, [loadItems])

  const handleDeleteRequest = useCallback((item: ArchivedKundigung) => setDeleteTarget(item), [])

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return
    deleteArchivItem(deleteTarget.id)
    loadItems()
    setExpandedId((prev) => (prev === deleteTarget.id ? null : prev))
    setSelectedIds((prev) => { const next = new Set(prev); next.delete(deleteTarget.id); return next })
    setDeleteTarget(null)
  }, [deleteTarget, loadItems])

  const handleBulkDeleteConfirm = useCallback(() => {
    for (const id of selectedIds) deleteArchivItem(id)
    loadItems()
    setSelectedIds(new Set())
    setBulkDeleteOpen(false)
  }, [selectedIds, loadItems])

  const handleNotizSave = useCallback((id: string) => {
    updateArchivItem(id, { notiz: notizText })
    loadItems()
    setEditingNotiz(null)
  }, [notizText, loadItems])

  const startEditingNotiz = useCallback((item: ArchivedKundigung) => {
    setEditingNotiz(item.id)
    setNotizText(item.notiz || "")
  }, [])

  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { /* clipboard not available */ }
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
      const validStatus = (item.status && STATUS_CONFIG[item.status as Status]) ? item.status as Status : "erstellt"
      return [
        item.companyName, item.grundLabel,
        STATUS_CONFIG[validStatus].label,
        formatDateLong(item.datum), item.kuendigungZum,
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
    setEditingNotiz((prev) => (prev === id ? null : prev))
  }, [])

  const handleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) { setSortDir((d) => (d === "asc" ? "desc" : "asc")); return prev }
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
    if (allVisibleSelected) setSelectedIds(new Set())
    else setSelectedIds(new Set(filteredItems.map((i) => i.id)))
  }, [allVisibleSelected, filteredItems])

  const handleErneut = useCallback((item: ArchivedKundigung) => {
    setReCreatingId(item.id)
    try {
      localStorage.setItem("kundigung-prefill", JSON.stringify({
        companyName: item.companyName,
        formData: { vorname: item.vorname, nachname: item.nachname, grund: item.grund, kuendigungZum: item.kuendigungZum, kundennummer: "", vertragsnummer: "", kuendigungsDatum: "", zusatztext: "" },
      }))
      router.push("/#generator")
    } catch { router.push("/#generator") }
  }, [router])

  /* ─── Render ─────────────────────────────────────────────────────────────── */

  return (
    <section className="min-h-screen py-10 lg:py-14">
      <div className="mx-auto max-w-4xl px-4 lg:px-6">

        <DeleteDialog open={!!deleteTarget} companyName={deleteTarget?.companyName ?? ""} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />
        <DeleteDialog open={bulkDeleteOpen} companyName="" count={selectedIds.size} onConfirm={handleBulkDeleteConfirm} onCancel={() => setBulkDeleteOpen(false)} />

        {/* ── Back ── */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground -ml-2 rounded-xl" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Zur Startseite
            </Link>
          </Button>
        </div>

        {/* ── Header ── */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Archive className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Mein Archiv</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {hasItems
                  ? `${items.length} Kündigung${items.length !== 1 ? "en" : ""} gespeichert`
                  : "Alle erstellten Kündigungen im Überblick"}
              </p>
            </div>
          </div>
          {hasItems && (
            <Button size="sm" variant="outline" className="shrink-0 gap-2 rounded-xl text-xs h-9" onClick={handleExportCsv}>
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">CSV exportieren</span>
              <span className="sm:hidden">CSV</span>
            </Button>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {STAT_ITEMS.map(({ key, label, colorClass, bgClass, borderActive }) => {
            const isActive = key !== "total" && filterStatus === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => key !== "total" && setFilterStatus(filterStatus === key ? "alle" : key as FilterStatus)}
                className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${bgClass} ${
                  isActive
                    ? `${borderActive} ring-2 ring-offset-0 shadow-sm`
                    : "border-border/50 hover:border-border/80 hover:shadow-sm"
                } ${key === "total" ? "cursor-default" : "cursor-pointer"}`}
              >
                <p className={`text-2xl font-bold tabular-nums leading-none ${colorClass}`}>
                  {stats[key] ?? 0}
                </p>
                <p className="mt-1.5 text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wide">{label}</p>
              </button>
            )
          })}
        </div>

        {/* ── Search & filter ── */}
        {hasItems && (
          <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40 pointer-events-none" />
              <Input
                type="search"
                placeholder="Unternehmen, Name oder Grund…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-9 h-10 rounded-xl border-border/60 bg-background focus-visible:ring-primary/20"
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
            <div className="flex gap-1 rounded-xl border border-border/50 bg-muted/40 p-1" role="tablist">
              {FILTER_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={filterStatus === value}
                  onClick={() => setFilterStatus(value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                    filterStatus === value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Toolbar ── */}
        {filteredItems.length > 0 && (
          <div className="mb-3 flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleSelectAll}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {allVisibleSelected
                  ? <CheckSquare className="h-3.5 w-3.5" />
                  : someSelected
                  ? <Minus className="h-3.5 w-3.5" />
                  : <Square className="h-3.5 w-3.5" />
                }
                <span className="hidden sm:inline text-xs">
                  {allVisibleSelected ? "Alle abwählen" : "Alle auswählen"}
                </span>
              </button>

              {someSelected && (
                <button
                  type="button"
                  onClick={() => setBulkDeleteOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/8 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {selectedIds.size} löschen
                </button>
              )}
            </div>

            <div className="flex items-center gap-0.5">
              <span className="hidden sm:inline text-xs text-muted-foreground/50 mr-1.5">Sortieren:</span>
              <SortButton field="datum"       label="Datum"  currentField={sortField} currentDir={sortDir} onClick={handleSort} />
              <SortButton field="companyName" label="Name"   currentField={sortField} currentDir={sortDir} onClick={handleSort} />
              <SortButton field="status"      label="Status" currentField={sortField} currentDir={sortDir} onClick={handleSort} />
            </div>
          </div>
        )}

        {/* ── Empty states ── */}
        {!hasItems && (
          <EmptyState
            icon={FileText}
            title="Noch keine Kündigungen"
            description="Erstellen Sie Ihre erste Kündigung mit unserem Generator."
            action={
              <Button className="rounded-full px-6 h-10" asChild>
                <Link href="/#generator">Kündigung erstellen</Link>
              </Button>
            }
          />
        )}

        {hasItems && filteredItems.length === 0 && (
          <EmptyState
            icon={Search}
            title="Keine Ergebnisse"
            description="Versuchen Sie einen anderen Suchbegriff oder Filter."
            action={
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { setSearchQuery(""); setFilterStatus("alle") }}>
                Filter zurücksetzen
              </Button>
            }
          />
        )}

        {/* ── List ── */}
        <div className="space-y-2" role="list">
          {filteredItems.map((item, index) => {
            const isExpanded = expandedId === item.id
            const isSelected = selectedIds.has(item.id)
            const validStatus = (item.status && STATUS_CONFIG[item.status as Status]) ? item.status as Status : "erstellt"
            const isCopied = copiedId === item.id
            const isReCreating = reCreatingId === item.id

            return (
              <div
                key={item.id || `archiv-item-${index}`}
                role="listitem"
                className={`overflow-hidden rounded-2xl border bg-card transition-all duration-200 ${
                  isSelected
                    ? "border-primary/40 ring-2 ring-primary/8 shadow-sm"
                    : isExpanded
                    ? "border-border shadow-sm"
                    : "border-border/50 hover:border-border/80 hover:shadow-sm"
                }`}
              >
                {/* ── Header row ── */}
                <div className="flex items-center gap-3 px-4 py-3.5">
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleSelectItem(item.id)}
                    aria-label={isSelected ? "Abwählen" : "Auswählen"}
                    className="shrink-0 text-muted-foreground/30 hover:text-primary transition-colors"
                  >
                    {isSelected
                      ? <CheckSquare className="h-4 w-4 text-primary" />
                      : <Square className="h-4 w-4" />
                    }
                  </button>

                  {/* Expand area */}
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`archiv-panel-${item.id || index}`}
                    onClick={() => toggleExpand(item.id)}
                    className="flex flex-1 items-center gap-3 text-left min-w-0 focus-visible:outline-none"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 border border-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-sm text-foreground truncate">
                          {item.companyName}
                        </span>
                        <StatusBadge status={validStatus} />
                        {item.notiz && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/50">
                            <StickyNote className="h-3 w-3" />
                            Notiz
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0 text-[11px] text-muted-foreground/60">
                        <span>{item.grundLabel}</span>
                        <span className="opacity-40">·</span>
                        <time dateTime={item.datum}>{formatDate(item.datum)}</time>
                        <span className="opacity-40">·</span>
                        <span>zum {item.kuendigungZum}</span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground/30 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* ── Expanded panel ── */}
                {isExpanded && (
                  <div
                    id={`archiv-panel-${item.id || index}`}
                    className="border-t border-border/40 px-4 pb-5 pt-4 space-y-5"
                  >
                    {/* Status */}
                    <div>
                      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">Status ändern</p>
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
                              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-150 ${
                                isActive
                                  ? cfg.color + " shadow-sm"
                                  : "border-border/50 bg-background text-muted-foreground hover:border-border hover:text-foreground"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {cfg.label}
                              {isActive && <Check className="h-3 w-3 ml-0.5 opacity-70" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Note */}
                    <div>
                      <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                        <StickyNote className="h-3 w-3" />
                        Notiz
                      </p>
                      {editingNotiz === item.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={notizText}
                            onChange={(e) => setNotizText(e.target.value)}
                            placeholder="Versanddatum, Tracking-Nummer, Anmerkungen…"
                            rows={3}
                            className="resize-none text-sm rounded-xl bg-background"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleNotizSave(item.id)} className="rounded-xl text-xs h-8 px-4">
                              Speichern
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingNotiz(null)} className="rounded-xl text-xs h-8">
                              Abbrechen
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEditingNotiz(item)}
                          className="w-full rounded-xl border border-dashed border-border/50 bg-muted/30 p-3.5 text-left text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/4 hover:text-foreground"
                        >
                          {item.notiz || (
                            <span className="text-muted-foreground/40 text-xs">
                              + Notiz hinzufügen…
                            </span>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Letter preview */}
                    <div>
                      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">Kündigungsschreiben</p>
                      <pre className="max-h-52 overflow-auto rounded-xl border border-border/40 bg-muted/30 p-4 font-mono text-[11px] leading-relaxed text-foreground/60 scrollbar-thin">
                        {item.text}
                      </pre>
                    </div>

                    {/* Actions */}
                    <div>
                      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">Aktionen</p>
                      <div className="flex flex-wrap gap-2">
                        <ActionBtn
                          icon={isCopied ? Check : Copy}
                          label={isCopied ? "Kopiert!" : "Kopieren"}
                          onClick={() => handleCopy(item.text, item.id)}
                          active={isCopied}
                        />
                        <ActionBtn icon={Download}  label="TXT"             onClick={() => handleDownloadTxt(item)} />
                        <ActionBtn icon={FileDown}  label="PDF"             onClick={() => generatePdf(item.text, item.companyName)} />
                        <ActionBtn icon={Printer}   label="Drucken"         onClick={() => printKundigung(item.text, item.companyName)} />
                        <ActionBtn icon={Mail}      label="E-Mail"          onClick={() => openMailto(item.text, item.companyName)} />
                        <ActionBtn
                          icon={isReCreating ? Check : RefreshCw}
                          label={isReCreating ? "Wird geladen…" : "Erneut erstellen"}
                          onClick={() => handleErneut(item)}
                          variant="primary"
                        />
                        <ActionBtn
                          icon={Trash2}
                          label="Löschen"
                          onClick={() => handleDeleteRequest(item)}
                          variant="danger"
                          className="ml-auto"
                        />
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
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Daten werden lokal gespeichert — keine Übertragung an Server.
          </div>
        )}
      </div>
    </section>
  )
}