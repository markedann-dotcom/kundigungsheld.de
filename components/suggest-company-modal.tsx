"use client"

import { useState } from "react"
import { X, Building2, Globe, Tag, MessageSquare, Check, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const CATEGORIES = [
  "Mobilfunk",
  "Internet & TV",
  "Streaming",
  "Versicherung",
  "Energie",
  "Fitnessstudio",
  "Zeitung & Magazin",
  "Bank & Finanzen",
  "Software & Apps",
  "Sonstiges",
]

interface SuggestCompanyModalProps {
  open: boolean
  onClose: () => void
}

type Status = "idle" | "loading" | "success" | "error"

export function SuggestCompanyModal({ open, onClose }: SuggestCompanyModalProps) {
  const [companyName, setCompanyName] = useState("")
  const [category, setCategory] = useState("")
  const [website, setWebsite] = useState("")
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  if (!open) return null

  const handleSubmit = async () => {
    if (!companyName.trim()) {
      setErrorMsg("Bitte geben Sie einen Firmennamen ein.")
      return
    }

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/suggest-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, category, website, comment }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus("success")
      } else {
        setErrorMsg(data.error || "Ein Fehler ist aufgetreten.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Netzwerkfehler. Bitte versuchen Sie es erneut.")
      setStatus("error")
    }
  }

  const handleClose = () => {
    onClose()
    // Reset after animation
    setTimeout(() => {
      setCompanyName("")
      setCategory("")
      setWebsite("")
      setComment("")
      setStatus("idle")
      setErrorMsg("")
    }, 300)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">

          {/* Decorative top gradient */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Anbieter vorschlagen</h2>
                <p className="text-sm text-muted-foreground">
                  Fehlt ein Unternehmen? Wir fügen es hinzu!
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            {status === "success" ? (
              /* Success state */
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Danke für Ihren Vorschlag!</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Wir prüfen <span className="font-semibold text-foreground">"{companyName}"</span> und fügen es bald hinzu.
                  </p>
                </div>
                <Button onClick={handleClose} className="mt-2 rounded-full px-6">
                  Schließen
                </Button>
              </div>
            ) : (
              /* Form */
              <div className="space-y-4">
                {/* Company name */}
                <div className="space-y-1.5">
                  <Label htmlFor="company-name" className="text-sm font-semibold">
                    Firmenname <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="company-name"
                      value={companyName}
                      onChange={(e) => { setCompanyName(e.target.value); setErrorMsg("") }}
                      placeholder="z.B. Telekom, Netflix, ING..."
                      className="h-11 pl-9 rounded-xl"
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold">
                    Kategorie <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat === category ? "" : cat)}
                        disabled={status === "loading"}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                          category === cat
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <Label htmlFor="website" className="text-sm font-semibold">
                    Website <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="www.beispiel.de"
                      className="h-11 pl-9 rounded-xl"
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-1.5">
                  <Label htmlFor="comment" className="text-sm font-semibold">
                    Kommentar <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Warum sollte dieser Anbieter hinzugefügt werden?"
                      rows={3}
                      className="pl-9 rounded-xl resize-none text-sm"
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                {/* Error */}
                {errorMsg && (
                  <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 rounded-full"
                    disabled={status === "loading"}
                  >
                    Abbrechen
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90"
                    disabled={status === "loading" || !companyName.trim()}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Senden...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Vorschlagen
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}