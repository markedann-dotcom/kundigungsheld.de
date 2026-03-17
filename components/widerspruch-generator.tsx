"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import {
  ShieldAlert, Car, HeartPulse, Building2, Receipt, AlertCircle,
  ChevronRight, ChevronLeft, Check, Copy, Download, Mail,
  RotateCcw, FileText, Sparkles, Info, ArrowLeft, Home,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Kategorie =
  | "bussgeldbescheid"
  | "versicherung"
  | "jobcenter"
  | "krankenkasse"
  | "steuerbescheid"
  | "inkasso"

interface FormData {
  vorname: string
  nachname: string
  strasse: string
  plz: string
  ort: string
  behoerde: string
  bescheidDatum: string
  aktenzeichen: string
  betrag: string
  grund: string
  zusatzinfo: string
  versicherungsnummer: string
  leistung: string
  tatvorwurf: string
  glaeubiger: string
  forderungsgrund: string
}

const INITIAL_FORM: FormData = {
  vorname: "", nachname: "", strasse: "", plz: "", ort: "",
  behoerde: "", bescheidDatum: "", aktenzeichen: "", betrag: "",
  grund: "", zusatzinfo: "",
  versicherungsnummer: "", leistung: "",
  tatvorwurf: "",
  glaeubiger: "", forderungsgrund: "",
}

// ─── Kategorie Config ─────────────────────────────────────────────────────────

const KATEGORIEN: {
  id: Kategorie
  label: string
  sublabel: string
  icon: typeof ShieldAlert
  color: string
  bg: string
  beispiele: string[]
}[] = [
  {
    id: "bussgeldbescheid",
    label: "Bußgeldbescheid",
    sublabel: "Strafzettel, Ordnungswidrigkeiten",
    icon: Car,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/40",
    beispiele: ["Falschparken", "Geschwindigkeitsverstoß", "Rotlichtverstoß"],
  },
  {
    id: "versicherung",
    label: "Versicherung",
    sublabel: "Leistungsablehnung, Schadensregulierung",
    icon: ShieldAlert,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40",
    beispiele: ["Schadensablehnung", "Zu geringe Regulierung", "Kündigung durch Versicherer"],
  },
  {
    id: "jobcenter",
    label: "Jobcenter / Bürgergeld",
    sublabel: "Sanktionen, Ablehnungen, Kürzungen",
    icon: Building2,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/40",
    beispiele: ["Sanktion / Leistungskürzung", "Ablehnung des Antrags", "Falsche Berechnung"],
  },
  {
    id: "krankenkasse",
    label: "Krankenkasse",
    sublabel: "Abgelehnte Leistungen, Kostenübernahme",
    icon: HeartPulse,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40",
    beispiele: ["Kostenübernahme verweigert", "Hilfsmittel abgelehnt", "Kur / Reha abgelehnt"],
  },
  {
    id: "steuerbescheid",
    label: "Steuerbescheid",
    sublabel: "Einkommenssteuer, Grundsteuer, Gewerbesteuer",
    icon: Receipt,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40",
    beispiele: ["Falsche Steuerberechnung", "Nicht anerkannte Ausgaben", "Falscher Steuerbescheid"],
  },
  {
    id: "inkasso",
    label: "Inkasso / Falsche Forderung",
    sublabel: "Unberechtigte Forderungen, Inkassofirmen",
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40",
    beispiele: ["Forderung bereits bezahlt", "Forderung verjährt", "Forderung nicht nachvollziehbar"],
  },
]

// ─── Widerspruch Text Generator ───────────────────────────────────────────────

function generateWiderspruchText(kat: Kategorie, form: FormData): string {
  const today = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })
  const absender = `${form.vorname} ${form.nachname}\n${form.strasse}\n${form.plz} ${form.ort}`
  const datum = form.bescheidDatum
    ? new Date(form.bescheidDatum).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })
    : "[Datum des Bescheids]"

  const aktenzeichen = form.aktenzeichen ? `\nAktenzeichen: ${form.aktenzeichen}` : ""
  const betrag = form.betrag ? ` über ${form.betrag} €` : ""

  const header = `${absender}\n\n${form.behoerde || "[Behörde / Unternehmen]"}\n\n${today}\n\nBetreff: Widerspruch gegen Bescheid vom ${datum}${aktenzeichen}`
  const anrede = `\nSehr geehrte Damen und Herren,\n`

  let body = ""

  switch (kat) {
    case "bussgeldbescheid":
      body = `
hiermit lege ich fristgerecht Widerspruch gegen den Bußgeldbescheid vom ${datum}${betrag} ein.

Der mir zur Last gelegte Vorwurf (${form.tatvorwurf || "[Tatvorwurf]"}) wird von mir ausdrücklich bestritten.

${form.grund ? `Begründung:\n${form.grund}\n` : ""}
${form.zusatzinfo ? `Weitere Angaben:\n${form.zusatzinfo}\n` : ""}
Ich beantrage,

1. den Bußgeldbescheid aufzuheben,
2. das Verfahren einzustellen,
3. mir Akteneinsicht zu gewähren.

Bis zur abschließenden Klärung bitte ich, keine weiteren Vollstreckungsmaßnahmen einzuleiten.`
      break

    case "versicherung":
      body = `
hiermit lege ich Widerspruch gegen Ihre Entscheidung vom ${datum} ein, mit der Sie die beantragte Leistung (${form.leistung || "[Leistung]"}) abgelehnt haben.
${form.versicherungsnummer ? `\nVersicherungsnummer: ${form.versicherungsnummer}\n` : ""}
${form.grund ? `Begründung meines Widerspruchs:\n${form.grund}\n` : ""}
${form.zusatzinfo ? `Weitere Angaben / Nachweise:\n${form.zusatzinfo}\n` : ""}
Ich beantrage,

1. Ihre Entscheidung vollständig zu überprüfen,
2. die beantragte Leistung zu erbringen,
3. mir eine schriftliche Begründung Ihrer endgültigen Entscheidung zuzusenden.

Sollte meinem Widerspruch nicht abgeholfen werden, behalte ich mir vor, die Ombudsstelle einzuschalten und rechtliche Schritte einzuleiten.`
      break

    case "jobcenter":
      body = `
hiermit lege ich gemäß § 83 SGG fristgerecht Widerspruch gegen den Bescheid vom ${datum}${betrag} ein.
${form.aktenzeichen ? `\nBetroffenes Aktenzeichen: ${form.aktenzeichen}\n` : ""}
${form.grund ? `Begründung:\n${form.grund}\n` : ""}
${form.zusatzinfo ? `Weitere Angaben:\n${form.zusatzinfo}\n` : ""}
Ich beantrage,

1. den angefochtenen Bescheid aufzuheben bzw. abzuändern,
2. mir die vollen gesetzlichen Leistungen zu gewähren,
3. mir eine Kopie meiner vollständigen Akte zur Verfügung zu stellen.

Ich weise darauf hin, dass gemäß § 86b SGG die aufschiebende Wirkung meines Widerspruchs gilt. Ich bitte, von einer Vollstreckung abzusehen.`
      break

    case "krankenkasse":
      body = `
hiermit lege ich gemäß § 84 SGB X Widerspruch gegen Ihren Bescheid vom ${datum} ein, mit dem Sie die Kostenübernahme / Leistung (${form.leistung || "[Leistung / Hilfsmittel]"}) abgelehnt haben.
${form.versicherungsnummer ? `\nVersichertennummer: ${form.versicherungsnummer}\n` : ""}
${form.grund ? `Begründung:\n${form.grund}\n` : ""}
${form.zusatzinfo ? `Ärztliche Unterlagen / Nachweise liegen bei bzw. werden nachgereicht:\n${form.zusatzinfo}\n` : ""}
Ich beantrage,

1. Ihre Entscheidung erneut zu prüfen,
2. die medizinisch notwendige Leistung zu genehmigen,
3. ggf. ein Gutachten des Medizinischen Dienstes (MD) einzuholen.

Bitte teilen Sie mir Ihre Entscheidung innerhalb der gesetzlichen Frist von 3 Monaten schriftlich mit.`
      break

    case "steuerbescheid":
      body = `
hiermit lege ich gemäß § 347 AO fristgerecht Einspruch gegen den Steuerbescheid vom ${datum}${betrag} ein.
${form.aktenzeichen ? `\nSteuernummer / Aktenzeichen: ${form.aktenzeichen}\n` : ""}
${form.grund ? `Begründung:\n${form.grund}\n` : ""}
${form.zusatzinfo ? `Ergänzende Angaben / Nachweise:\n${form.zusatzinfo}\n` : ""}
Ich beantrage,

1. den Steuerbescheid in den angefochtenen Punkten zu korrigieren,
2. die Aussetzung der Vollziehung gemäß § 361 AO bis zur Entscheidung über den Einspruch,
3. Akteneinsicht in die relevanten Unterlagen.

Ich weise darauf hin, dass ich bereit bin, weitere Nachweise einzureichen.`
      break

    case "inkasso":
      body = `
hiermit widerspreche ich der von Ihnen geltend gemachten Forderung vom ${datum}${betrag} ausdrücklich und vollumfänglich.

Gläubiger / Auftraggeber: ${form.glaeubiger || "[Gläubiger]"}
Behaupteter Forderungsgrund: ${form.forderungsgrund || "[Forderungsgrund]"}

${form.grund ? `Begründung meines Widerspruchs:\n${form.grund}\n` : ""}
${form.zusatzinfo ? `Weitere Angaben:\n${form.zusatzinfo}\n` : ""}
Ich fordere Sie auf:

1. Die Forderung unverzüglich zurückzunehmen und mir dies schriftlich zu bestätigen,
2. alle weiteren Mahnungen und Inkassomaßnahmen sofort einzustellen,
3. mir innerhalb von 14 Tagen einen vollständigen Nachweis der Forderung (Originalvertrag, Kontoauszüge, Abtretungserklärung) zu übermitteln.

Ohne vollständigen Nachweis sehe ich keinen Rechtsgrund zur Zahlung. Bei weiteren unberechtigten Kontaktaufnahmen behalte ich mir rechtliche Schritte wegen Belästigung vor.`
      break
  }

  return `${header}\n${anrede}${body}\n\nMit freundlichen Grüßen\n\n${form.vorname} ${form.nachname}`
}

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Kategorie" },
  { id: 2, label: "Ihre Daten" },
  { id: 3, label: "Bescheid" },
  { id: 4, label: "Begründung" },
  { id: 5, label: "Ergebnis" },
]

// ─── Field helpers ────────────────────────────────────────────────────────────

function Field({
  label, required, hint, children,
}: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function TextInput({
  value, onChange, placeholder, type = "text",
}: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-all"
    />
  )
}

function TextareaInput({
  value, onChange, placeholder, rows = 4,
}: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-all"
    />
  )
}

// ─── Deadline badge ───────────────────────────────────────────────────────────

function DeadlineBadge({ bescheidDatum }: { bescheidDatum: string }) {
  if (!bescheidDatum) return null
  const deadline = new Date(bescheidDatum)
  deadline.setMonth(deadline.getMonth() + 1)
  const today = new Date()
  const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return (
    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 dark:border-red-800/40 dark:bg-red-950/20 px-4 py-3">
      <span className="text-base">⚠️</span>
      <p className="text-xs text-red-700 dark:text-red-400 font-medium">Widerspruchsfrist abgelaufen! Konsultieren Sie einen Anwalt.</p>
    </div>
  )
  const color = diffDays <= 7
    ? "border-red-200 bg-red-50 dark:border-red-800/40 dark:bg-red-950/20 text-red-700 dark:text-red-400"
    : diffDays <= 14
    ? "border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400"
    : "border-emerald-200 bg-emerald-50 dark:border-emerald-800/40 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
  return (
    <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${color}`}>
      <span className="text-base">⏱</span>
      <p className="text-xs font-medium">
        Widerspruchsfrist: <span className="font-bold">{deadline.toLocaleDateString("de-DE")}</span>
        {" "}— noch <span className="font-bold">{diffDays} Tage</span>
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WiderspruchGenerator() {
  const [step, setStep] = useState(1)
  const [kategorie, setKategorie] = useState<Kategorie | null>(null)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [copied, setCopied] = useState(false)
  const [savedToArchiv, setSavedToArchiv] = useState(false)

  const set = useCallback((key: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }))
  }, [])

  const katConfig = useMemo(
    () => KATEGORIEN.find((k) => k.id === kategorie),
    [kategorie]
  )

  const generatedText = useMemo(() => {
    if (!kategorie) return ""
    return generateWiderspruchText(kategorie, form)
  }, [kategorie, form])

  const canProceed = useMemo(() => {
    if (step === 1) return !!kategorie
    if (step === 2) return !!(form.vorname && form.nachname && form.strasse && form.plz && form.ort)
    if (step === 3) return !!(form.behoerde && form.bescheidDatum)
    return true
  }, [step, kategorie, form])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }, [generatedText])

  const handleDownloadTxt = useCallback(() => {
    const blob = new Blob([generatedText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Widerspruch_${katConfig?.label ?? "Dokument"}_${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a); a.click()
    document.body.removeChild(a); URL.revokeObjectURL(url)
  }, [generatedText, katConfig])

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(`Widerspruch gegen Bescheid vom ${form.bescheidDatum || "..."}`)
    const body = encodeURIComponent(generatedText)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }, [generatedText, form.bescheidDatum])

  const handleSaveToArchiv = useCallback(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("widerspruch-archiv") || "[]")
      existing.unshift({
        id: crypto.randomUUID(),
        kategorie,
        kategorieLabel: katConfig?.label,
        behoerde: form.behoerde,
        datum: new Date().toISOString(),
        bescheidDatum: form.bescheidDatum,
        aktenzeichen: form.aktenzeichen,
        vorname: form.vorname,
        nachname: form.nachname,
        text: generatedText,
        status: "erstellt",
      })
      localStorage.setItem("widerspruch-archiv", JSON.stringify(existing))
      setSavedToArchiv(true)
      setTimeout(() => setSavedToArchiv(false), 3000)
    } catch {}
  }, [kategorie, katConfig, form, generatedText])

  const handleReset = useCallback(() => {
    setStep(1)
    setKategorie(null)
    setForm(INITIAL_FORM)
    setCopied(false)
    setSavedToArchiv(false)
  }, [])

  const KatIcon = katConfig?.icon ?? ShieldAlert

  return (
    <>
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Back to home */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Zurück zur Startseite
          </Link>

          {/* Logo / brand */}
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Home className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <span className="hidden sm:inline">KündigungsHeld</span>
          </Link>

          {/* Context label */}
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldAlert className="h-3 w-3" />
            Widerspruch-Generator
          </div>
        </div>
      </header>

      <section id="widerspruch" className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">

          {/* ── Header ── */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Widerspruch erstellen
            </h1>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
              Rechtssicherer Widerspruch in wenigen Minuten — kostenlos, lokal, ohne Anmeldung.
            </p>
          </div>

          {/* ── Progress bar ── */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((s, i) => {
                const done = step > s.id
                const active = step === s.id
                return (
                  <div key={s.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                        done    ? "bg-foreground text-background"
                        : active ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-4 ring-primary/10"
                                 : "border-2 border-border/50 text-muted-foreground/50"
                      }`}>
                        {done ? <Check className="h-4 w-4" /> : s.id}
                      </div>
                      <span className={`hidden sm:block text-[10px] font-medium transition-colors ${
                        active ? "text-foreground" : "text-muted-foreground/50"
                      }`}>{s.label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 mx-2 h-0.5 rounded-full transition-all duration-500 ${
                        step > s.id ? "bg-foreground" : "bg-border/40"
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Deadline badge (shown from step 3 when date is filled) ── */}
          {step >= 3 && form.bescheidDatum && (
            <div className="mb-4">
              <DeadlineBadge bescheidDatum={form.bescheidDatum} />
            </div>
          )}

          {/* ── Card ── */}
          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">

            {/* Card header */}
            <div className="border-b border-border/40 bg-muted/30 px-6 py-4 flex items-center gap-3">
              {kategorie && step > 1 ? (
                <>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${katConfig?.bg}`}>
                    <KatIcon className={`h-4 w-4 ${katConfig?.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{katConfig?.label}</p>
                    <p className="text-xs text-muted-foreground">Schritt {step} von {STEPS.length}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm font-semibold text-foreground">
                  {STEPS[step - 1]?.label} — Schritt {step} von {STEPS.length}
                </p>
              )}
            </div>

            {/* Card body */}
            <div className="p-6 sm:p-8">

              {/* ── STEP 1: Kategorie ── */}
              {step === 1 && (
                <div>
                  <p className="mb-5 text-sm text-muted-foreground">
                    Wählen Sie die Art des Bescheids, gegen den Sie Widerspruch einlegen möchten:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {KATEGORIEN.map((kat) => {
                      const Icon = kat.icon
                      const isActive = kategorie === kat.id
                      return (
                        <button
                          key={kat.id}
                          type="button"
                          onClick={() => setKategorie(kat.id)}
                          className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
                            isActive
                              ? kat.bg + " ring-2 ring-inset ring-current/20 shadow-sm"
                              : "border-border/60 bg-background hover:border-border"
                          }`}
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                            isActive ? kat.bg : "border-border/50 bg-muted/50"
                          }`}>
                            <Icon className={`h-5 w-5 ${isActive ? kat.color : "text-muted-foreground"}`} />
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <p className={`font-semibold text-sm leading-tight ${isActive ? "" : "text-foreground"}`}>
                              {kat.label}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                              {kat.sublabel}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {kat.beispiele.map((b) => (
                                <span key={b} className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                          {isActive && (
                            <Check className={`h-4 w-4 shrink-0 mt-0.5 ${kat.color}`} />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Persönliche Daten ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <p className="text-sm text-muted-foreground">Ihre Absenderdaten für das Schreiben:</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Vorname" required>
                      <TextInput value={form.vorname} onChange={(v) => set("vorname", v)} placeholder="Max" />
                    </Field>
                    <Field label="Nachname" required>
                      <TextInput value={form.nachname} onChange={(v) => set("nachname", v)} placeholder="Mustermann" />
                    </Field>
                  </div>
                  <Field label="Straße und Hausnummer" required>
                    <TextInput value={form.strasse} onChange={(v) => set("strasse", v)} placeholder="Musterstraße 12" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="PLZ" required>
                      <TextInput value={form.plz} onChange={(v) => set("plz", v)} placeholder="12345" />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Ort" required>
                        <TextInput value={form.ort} onChange={(v) => set("ort", v)} placeholder="Berlin" />
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Bescheid-Daten ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <p className="text-sm text-muted-foreground">
                    Daten aus dem Bescheid — so präzise wie möglich:
                  </p>

                  <Field label={kategorie === "inkasso" ? "Inkassofirma / Auftraggeber" : "Behörde / Unternehmen"} required>
                    <TextInput
                      value={form.behoerde}
                      onChange={(v) => set("behoerde", v)}
                      placeholder={
                        kategorie === "inkasso" ? "z.B. Creditreform GmbH"
                        : kategorie === "versicherung" ? "z.B. Allianz Versicherung AG"
                        : kategorie === "krankenkasse" ? "z.B. AOK Bayern"
                        : kategorie === "jobcenter" ? "z.B. Jobcenter Berlin Mitte"
                        : kategorie === "steuerbescheid" ? "z.B. Finanzamt Mitte"
                        : "z.B. Stadt Hamburg, Ordnungsamt"
                      }
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Datum des Bescheids" required hint="Frist: 1 Monat ab diesem Datum">
                      <TextInput type="date" value={form.bescheidDatum} onChange={(v) => set("bescheidDatum", v)} />
                    </Field>
                    <Field label="Aktenzeichen / Referenz" hint="Steht im Bescheid oben rechts">
                      <TextInput value={form.aktenzeichen} onChange={(v) => set("aktenzeichen", v)} placeholder="z.B. 2024-12345" />
                    </Field>
                  </div>

                  <Field label="Betrag (falls vorhanden)" hint="Nur die Zahl, z.B. 89,50">
                    <div className="relative">
                      <TextInput value={form.betrag} onChange={(v) => set("betrag", v)} placeholder="89,50" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/50">€</span>
                    </div>
                  </Field>

                  {kategorie === "bussgeldbescheid" && (
                    <Field label="Tatvorwurf" hint="Was wird Ihnen vorgeworfen?">
                      <TextInput value={form.tatvorwurf} onChange={(v) => set("tatvorwurf", v)} placeholder="z.B. Überschreitung der zulässigen Höchstgeschwindigkeit" />
                    </Field>
                  )}

                  {(kategorie === "versicherung" || kategorie === "krankenkasse") && (
                    <>
                      <Field label={kategorie === "krankenkasse" ? "Versichertennummer" : "Versicherungsnummer"}>
                        <TextInput value={form.versicherungsnummer} onChange={(v) => set("versicherungsnummer", v)} placeholder="z.B. A123456789" />
                      </Field>
                      <Field label="Abgelehnte Leistung" hint="Was wurde abgelehnt?">
                        <TextInput value={form.leistung} onChange={(v) => set("leistung", v)} placeholder={kategorie === "krankenkasse" ? "z.B. Kostenübernahme Physiotherapie" : "z.B. Schadensregulierung Wasserschaden"} />
                      </Field>
                    </>
                  )}

                  {kategorie === "inkasso" && (
                    <>
                      <Field label="Ursprünglicher Gläubiger">
                        <TextInput value={form.glaeubiger} onChange={(v) => set("glaeubiger", v)} placeholder="z.B. Telekom Deutschland GmbH" />
                      </Field>
                      <Field label="Behaupteter Forderungsgrund">
                        <TextInput value={form.forderungsgrund} onChange={(v) => set("forderungsgrund", v)} placeholder="z.B. Offene Rechnung vom 01.01.2024" />
                      </Field>
                    </>
                  )}
                </div>
              )}

              {/* ── STEP 4: Begründung ── */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-950/20 p-4 flex gap-3">
                    <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      Je konkreter Ihre Begründung, desto besser. Beschreiben Sie, warum der Bescheid falsch ist — Fakten, Daten, Zeugen. Beide Felder sind optional — der Widerspruch ist auch ohne Begründung rechtlich wirksam.
                    </p>
                  </div>

                  <Field
                    label="Begründung Ihres Widerspruchs"
                    hint="Warum ist der Bescheid falsch oder ungerechtfertigt?"
                  >
                    <TextareaInput
                      value={form.grund}
                      onChange={(v) => set("grund", v)}
                      rows={5}
                      placeholder={
                        kategorie === "bussgeldbescheid"
                          ? "z.B. Zum angegebenen Zeitpunkt befand ich mich nachweislich nicht am Tatort. Zeugen können dies bestätigen..."
                          : kategorie === "versicherung"
                          ? "z.B. Der Schaden entstand eindeutig durch ein versichertes Ereignis. Laut Vertrag §5 Abs. 2 ist dieser Fall abgedeckt..."
                          : kategorie === "jobcenter"
                          ? "z.B. Die Sanktion ist rechtswidrig, da ich meiner Mitwirkungspflicht vollständig nachgekommen bin. Belege liegen vor..."
                          : kategorie === "krankenkasse"
                          ? "z.B. Die Behandlung ist medizinisch notwendig. Ärztliche Atteste liegen bei. Laut § 33 SGB V besteht Anspruch auf..."
                          : kategorie === "steuerbescheid"
                          ? "z.B. Die geltend gemachten Werbungskosten wurden zu Unrecht nicht anerkannt. Belege sind vorhanden..."
                          : "z.B. Die Forderung wurde bereits am 15.03.2024 vollständig bezahlt. Kontoauszug liegt bei..."
                      }
                    />
                  </Field>

                  <Field
                    label="Weitere Angaben / Beweise"
                    hint="Optional: Dokumente die Sie beifügen, Zeugen, etc."
                  >
                    <TextareaInput
                      value={form.zusatzinfo}
                      onChange={(v) => set("zusatzinfo", v)}
                      rows={3}
                      placeholder="z.B. Anlage 1: Kontoauszug vom 15.03.2024&#10;Anlage 2: Schreiben vom 20.03.2024&#10;Anlage 3: Zeugenaussage Herrn Müller"
                    />
                  </Field>
                </div>
              )}

              {/* ── STEP 5: Ergebnis ── */}
              {step === 5 && (
                <div className="space-y-5">
                  {/* Success header */}
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800/40 dark:bg-emerald-950/20 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 shrink-0">
                      <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        Widerspruch wurde erstellt
                      </p>
                      <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70">
                        {katConfig?.label} · {form.behoerde}
                      </p>
                    </div>
                  </div>

                  {/* Deadline reminder */}
                  {form.bescheidDatum && (
                    <DeadlineBadge bescheidDatum={form.bescheidDatum} />
                  )}

                  {/* Preview */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Vorschau
                      </p>
                      <span className="text-[10px] text-muted-foreground/50">
                        {generatedText.length} Zeichen
                      </span>
                    </div>
                    <pre className="max-h-72 overflow-auto rounded-xl border border-border/40 bg-muted/30 p-5 font-mono text-[11px] leading-relaxed text-foreground/75 scrollbar-thin whitespace-pre-wrap">
                      {generatedText}
                    </pre>
                  </div>

                  {/* Actions */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Aktionen
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          copied
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : "border-border/60 bg-background text-foreground hover:border-foreground/20 hover:shadow-sm"
                        }`}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Kopiert!" : "Text kopieren"}
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadTxt}
                        className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/20 hover:shadow-sm"
                      >
                        <Download className="h-4 w-4" />
                        Als TXT herunterladen
                      </button>

                      <button
                        type="button"
                        onClick={handleEmail}
                        className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/20 hover:shadow-sm"
                      >
                        <Mail className="h-4 w-4" />
                        Per E-Mail senden
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveToArchiv}
                        className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          savedToArchiv
                            ? "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/30 dark:text-sky-400"
                            : "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/50"
                        }`}
                      >
                        {savedToArchiv ? <Check className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                        {savedToArchiv ? "Im Archiv gespeichert!" : "Im Archiv speichern"}
                      </button>
                    </div>
                  </div>

                  {/* Hinweis */}
                  <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
                    <p className="text-xs font-semibold text-foreground mb-1.5">📌 Wichtige Hinweise</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Widerspruch muss <span className="font-medium text-foreground">innerhalb 1 Monat</span> nach Bescheiddatum eingehen</li>
                      <li>• Senden Sie ihn per <span className="font-medium text-foreground">Einschreiben mit Rückschein</span></li>
                      <li>• Bewahren Sie alle Belege und eine Kopie des Schreibens auf</li>
                      {kategorie === "steuerbescheid" && (
                        <li>• Beim Steuerbescheid gilt <span className="font-medium text-foreground">Einspruch (§ 347 AO)</span> — Frist ebenfalls 1 Monat</li>
                      )}
                      {kategorie === "jobcenter" && (
                        <li>• Widerspruch hat <span className="font-medium text-foreground">aufschiebende Wirkung</span> — Leistungen können nicht sofort gekürzt werden</li>
                      )}
                    </ul>
                  </div>

                  {/* Bottom actions */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Neuen Widerspruch erstellen
                    </button>
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                    >
                      <Home className="h-3.5 w-3.5" />
                      Zur Startseite
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ── Navigation ── */}
            {step < 5 && (
              <div className="border-t border-border/40 bg-muted/20 flex items-center justify-between gap-4 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Zurück
                </button>

                <div className="flex items-center gap-1.5">
                  {STEPS.slice(0, -1).map((s) => (
                    <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === s.id ? "w-6 bg-primary" : step > s.id ? "w-3 bg-foreground/30" : "w-3 bg-border/50"
                    }`} />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(5, s + 1))}
                  disabled={!canProceed}
                  className="flex items-center gap-1.5 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {step === 4 ? (
                    <><Sparkles className="h-4 w-4" />Widerspruch erstellen</>
                  ) : (
                    <>Weiter<ChevronRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ── Trust signals ── */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/60">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Kostenlos & ohne Anmeldung
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Daten bleiben lokal im Browser
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Rechtlich geprüfte Vorlagen
            </span>
          </div>
        </div>
      </section>
    </>
  )
}