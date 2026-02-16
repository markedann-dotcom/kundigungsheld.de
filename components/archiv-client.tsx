"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  Trash2,
  Check,
  Send,
  Clock,
  ChevronDown,
  ChevronUp,
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

const STATUS_CONFIG = {
  erstellt: {
    label: "Erstellt",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800",
  },
  gesendet: {
    label: "Gesendet",
    icon: Send,
    color: "bg-blue-100 text-blue-800",
  },
  bestaetigt: {
    label: "Bestätigt",
    icon: Check,
    color: "bg-green-100 text-green-800",
  },
} as const

export function ArchivClient() {
  const [items, setItems] = useState<ArchivedKundigung[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingNotiz, setEditingNotiz] = useState<string | null>(null)
  const [notizText, setNotizText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<
    "alle" | "erstellt" | "gesendet" | "bestaetigt"
  >("alle")
  const [copied, setCopied] = useState<string | null>(null)

  const loadItems = useCallback(() => {
    setItems(getArchiv())
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  const handleStatusChange = (
    id: string,
    status: "erstellt" | "gesendet" | "bestaetigt"
  ) => {
    updateArchivItem(id, { status })
    loadItems()
  }

  const handleDelete = (id: string) => {
    deleteArchivItem(id)
    loadItems()
    if (expandedId === id) setExpandedId(null)
  }

  const handleNotizSave = (id: string) => {
    updateArchivItem(id, { notiz: notizText })
    loadItems()
    setEditingNotiz(null)
  }

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      /* ignore */
    }
  }

  const handleDownload = (item: ArchivedKundigung) => {
    const blob = new Blob([item.text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Kuendigung_${item.companyName.replace(/[^a-zA-Z0-9]/g, "_")}_${item.datum.slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nachname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.grundLabel.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      filterStatus === "alle" || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: items.length,
    erstellt: items.filter((i) => i.status === "erstellt").length,
    gesendet: items.filter((i) => i.status === "gesendet").length,
    bestaetigt: items.filter((i) => i.status === "bestaetigt").length,
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Zur Startseite
            </Link>
          </Button>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Archive className="h-6 w-6" />
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

        {/* Export & Stats */}
        {items.length > 0 && (
          <div className="mb-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => {
                const header = "Unternehmen;Grund;Status;Datum;Kündigung zum;Name;Notiz"
                const rows = items.map((item) =>
                  [
                    item.companyName,
                    item.grundLabel,
                    item.status,
                    new Date(item.datum).toLocaleDateString("de-DE"),
                    item.kuendigungZum,
                    `${item.vorname} ${item.nachname}`,
                    (item.notiz || "").replace(/\n/g, " "),
                  ].join(";")
                )
                const csv = [header, ...rows].join("\n")
                const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `KuendigungsHeld_Archiv_${new Date().toISOString().slice(0, 10)}.csv`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Archiv als CSV exportieren
            </Button>
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Gesamt</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.erstellt}
            </p>
            <p className="text-sm text-muted-foreground">Erstellt</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <p className="text-2xl font-bold text-blue-600">
              {stats.gesendet}
            </p>
            <p className="text-sm text-muted-foreground">Gesendet</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <p className="text-2xl font-bold text-green-600">
              {stats.bestaetigt}
            </p>
            <p className="text-sm text-muted-foreground">Bestätigt</p>
          </div>
        </div>

        {/* Search and Filter */}
        {items.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Suchen nach Unternehmen, Name oder Grund..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(
                ["alle", "erstellt", "gesendet", "bestaetigt"] as const
              ).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    filterStatus === status
                      ? "bg-primary text-white shadow-sm"
                      : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {status === "alle"
                    ? "Alle"
                    : status === "erstellt"
                      ? "Erstellt"
                      : status === "gesendet"
                        ? "Gesendet"
                        : "Bestätigt"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-border/60 bg-card py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <FileText className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
              Noch keine Kündigungen
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Erstellen Sie Ihre erste Kündigung mit unserem Generator. Sie
              können sie anschließend hier im Archiv speichern und verwalten.
            </p>
            <Button className="mt-6 rounded-full px-6" asChild>
              <Link href="/#generator">Kündigung erstellen</Link>
            </Button>
          </div>
        )}

        {/* Items */}
        {filteredItems.length === 0 && items.length > 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-border/60 bg-card py-16 text-center">
            <Search className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 font-medium text-muted-foreground">
              Keine Ergebnisse
            </p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              Versuchen Sie einen anderen Suchbegriff oder Filter.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id
            const statusConfig = STATUS_CONFIG[item.status]
            const StatusIcon = statusConfig.icon

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:shadow-sm"
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : item.id)
                  }
                  className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold text-foreground">
                        {item.companyName}
                      </h3>
                      <Badge
                        className={`shrink-0 text-xs ${statusConfig.color} border-0`}
                      >
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>{item.grundLabel}</span>
                      <span>
                        {new Date(item.datum).toLocaleDateString("de-DE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span>
                        Kündigung zum: {item.kuendigungZum}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-border/40 px-4 pb-5 pt-4 sm:px-5">
                    {/* Status Actions */}
                    <div className="mb-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Status ändern
                      </p>
                      <div className="flex gap-2">
                        {(
                          ["erstellt", "gesendet", "bestaetigt"] as const
                        ).map((status) => {
                          const config = STATUS_CONFIG[status]
                          const Icon = config.icon
                          return (
                            <button
                              key={status}
                              onClick={() =>
                                handleStatusChange(item.id, status)
                              }
                              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                                item.status === status
                                  ? "bg-primary text-white shadow-sm"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {config.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        <StickyNote className="h-3.5 w-3.5" />
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
                          onClick={() => {
                            setEditingNotiz(item.id)
                            setNotizText(item.notiz || "")
                          }}
                          className="w-full rounded-lg border border-dashed border-border/60 p-3 text-left text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          {item.notiz || "Klicken, um eine Notiz hinzuzufügen..."}
                        </button>
                      )}
                    </div>

                    {/* Preview */}
                    <div className="mb-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Kündigungsschreiben
                      </p>
                      <pre className="max-h-60 overflow-auto rounded-lg border border-border/40 bg-muted/30 p-4 font-sans text-xs leading-relaxed text-foreground/80">
                        {item.text}
                      </pre>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={() => handleCopy(item.text, item.id)}
                      >
                        {copied === item.id ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied === item.id ? "Kopiert!" : "Kopieren"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={() => handleDownload(item)}
                      >
                        <Download className="h-3.5 w-3.5" />
                        TXT
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={() => generatePdf(item.text, item.companyName)}
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={() => printKundigung(item.text)}
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Drucken
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={() => openMailto(item.text, item.companyName)}
                      >
                        <Mail className="h-3.5 w-3.5" />
                        E-Mail
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Löschen
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {items.length > 0 && (
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
