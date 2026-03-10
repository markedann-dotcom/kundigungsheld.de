"use client"

import { useState, useMemo } from "react"
import { Plus, Trash2, TrendingDown, Euro, AlertCircle, Zap, ArrowRight } from "lucide-react"

type Interval = "monthly" | "yearly"

interface Abo {
  id: string
  name: string
  amount: string
  interval: Interval
}

const PRESETS: { name: string; amount: string; interval: Interval }[] = [
  { name: "Netflix", amount: "13.99", interval: "monthly" },
  { name: "Spotify", amount: "10.99", interval: "monthly" },
  { name: "Amazon Prime", amount: "8.99", interval: "monthly" },
  { name: "Disney+", amount: "11.99", interval: "monthly" },
  { name: "Fitnessstudio", amount: "29.99", interval: "monthly" },
  { name: "ADAC", amount: "59.00", interval: "yearly" },
  { name: "Mobilfunk", amount: "24.99", interval: "monthly" },
  { name: "Internet", amount: "39.99", interval: "monthly" },
  { name: "Sky", amount: "22.99", interval: "monthly" },
  { name: "YouTube Premium", amount: "11.99", interval: "monthly" },
]

function uid() {
  return Math.random().toString(36).slice(2)
}

function toYearly(amount: number, interval: Interval) {
  return interval === "monthly" ? amount * 12 : amount
}

function toMonthly(amount: number, interval: Interval) {
  return interval === "yearly" ? amount / 12 : amount
}

export function AboKostenRechner() {
  const [abos, setAbos] = useState<Abo[]>([
    { id: uid(), name: "Netflix", amount: "13.99", interval: "monthly" },
    { id: uid(), name: "Spotify", amount: "10.99", interval: "monthly" },
    { id: uid(), name: "Fitnessstudio", amount: "29.99", interval: "monthly" },
  ])
  const [showPresets, setShowPresets] = useState(false)

  const addEmpty = () => {
    setAbos((prev) => [...prev, { id: uid(), name: "", amount: "", interval: "monthly" }])
  }

  const addPreset = (preset: typeof PRESETS[0]) => {
    setAbos((prev) => [...prev, { id: uid(), ...preset }])
    setShowPresets(false)
  }

  const remove = (id: string) => setAbos((prev) => prev.filter((a) => a.id !== id))

  const update = (id: string, field: keyof Abo, value: string) => {
    setAbos((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  const { totalMonthly, totalYearly, validAbos } = useMemo(() => {
    const validAbos = abos.filter((a) => a.name && parseFloat(a.amount) > 0)
    const totalYearly = validAbos.reduce((sum, a) => {
      return sum + toYearly(parseFloat(a.amount) || 0, a.interval)
    }, 0)
    return {
      totalMonthly: totalYearly / 12,
      totalYearly,
      validAbos,
    }
  }, [abos])

  const coffees = Math.round(totalMonthly / 3.5)
  const vacationDays = Math.round(totalYearly / 80) // ~80€/day budget travel

  return (
    <section id="abo-rechner" className="py-20 bg-muted/20 border-y border-border/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            <Euro className="h-3.5 w-3.5" />
            Kostenloser Rechner
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3">
            Was kosten Ihre Abos wirklich?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Die meisten unterschätzen ihre Abo-Ausgaben um <strong className="text-foreground">Faktor 3</strong>. 
            Tragen Sie Ihre Abos ein und sehen Sie die Wahrheit.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Left — Abo list */}
          <div className="space-y-3">

            {/* Abo rows */}
            {abos.map((abo) => (
              <div
                key={abo.id}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-3 py-2.5 group"
              >
                {/* Name */}
                <input
                  type="text"
                  value={abo.name}
                  onChange={(e) => update(abo.id, "name", e.target.value)}
                  placeholder="z.B. Netflix"
                  className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                />

                {/* Amount */}
                <div className="flex items-center gap-1 shrink-0">
                  <input
                    type="number"
                    value={abo.amount}
                    onChange={(e) => update(abo.id, "amount", e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-20 bg-transparent text-sm text-foreground text-right outline-none placeholder:text-muted-foreground/40"
                  />
                  <span className="text-muted-foreground text-sm">€</span>
                </div>

                {/* Interval toggle */}
                <div className="flex shrink-0 rounded-lg border border-border/60 overflow-hidden text-xs font-medium">
                  <button
                    onClick={() => update(abo.id, "interval", "monthly")}
                    className={`px-2.5 py-1.5 transition-colors ${
                      abo.interval === "monthly"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    /Mo
                  </button>
                  <button
                    onClick={() => update(abo.id, "interval", "yearly")}
                    className={`px-2.5 py-1.5 transition-colors ${
                      abo.interval === "yearly"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    /Jahr
                  </button>
                </div>

                {/* Yearly equivalent */}
                {parseFloat(abo.amount) > 0 && (
                  <span className="hidden sm:block shrink-0 text-xs text-muted-foreground w-20 text-right">
                    {abo.interval === "monthly"
                      ? `= ${(parseFloat(abo.amount) * 12).toFixed(0)} €/Jahr`
                      : `= ${(parseFloat(abo.amount) / 12).toFixed(2)} €/Mo`}
                  </span>
                )}

                {/* Delete */}
                <button
                  onClick={() => remove(abo.id)}
                  className="shrink-0 p-1 rounded-md text-muted-foreground/30 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {/* Add buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={addEmpty}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-border/60 px-4 py-2 text-sm text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Abo hinzufügen
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowPresets((v) => !v)}
                  className="flex items-center gap-1.5 rounded-lg border border-dashed border-border/60 px-4 py-2 text-sm text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Schnellauswahl
                </button>

                {showPresets && (
                  <div className="absolute top-full left-0 mt-2 z-10 w-56 rounded-xl border border-border/60 bg-background shadow-lg overflow-hidden">
                    {PRESETS.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => addPreset(p)}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-foreground">{p.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {p.amount} €/{p.interval === "monthly" ? "Mo" : "Jahr"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — Summary card */}
          <div className="space-y-3 lg:sticky lg:top-20">

            {/* Total */}
            <div className="rounded-2xl border border-border/60 bg-background p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Ihre Abo-Kosten
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Pro Monat</span>
                  <span className="text-xl font-bold text-foreground tabular-nums">
                    {totalMonthly.toFixed(2)} €
                  </span>
                </div>
                <div className="h-px bg-border/40" />
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">Pro Jahr</span>
                  <span className="text-3xl font-black text-foreground tabular-nums">
                    {totalYearly.toFixed(0)} €
                  </span>
                </div>
              </div>

              {/* Fun comparisons */}
              {totalYearly > 0 && (
                <div className="space-y-2 pt-3 border-t border-border/40">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-2">
                    Das entspricht…
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>☕</span>
                    <span><span className="font-semibold text-foreground">{coffees}</span> Cappuccinos im Monat</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>✈️</span>
                    <span><span className="font-semibold text-foreground">{vacationDays}</span> Urlaubstage (Budget)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>💶</span>
                    <span><span className="font-semibold text-foreground">{(totalYearly / 8.5).toFixed(0)}</span> Arbeitsstunden (Mindestlohn)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Warning if high spend */}
            {totalMonthly > 50 && (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200/60 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 p-4">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    Über 50 €/Monat
                  </p>
                  <p className="text-xs text-amber-600/80 dark:text-amber-500/80 mt-0.5">
                    Das ist überdurchschnittlich hoch. Prüfen Sie welche Abos Sie wirklich nutzen.
                  </p>
                </div>
              </div>
            )}

            {/* Potential savings */}
            {validAbos.length >= 2 && (
              <div className="rounded-xl border border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/20 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Einsparpotenzial
                  </p>
                </div>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-500/80">
                  Wenn Sie nur <strong className="text-emerald-700 dark:text-emerald-400">1 Abo kündigen</strong>, 
                  sparen Sie im Schnitt{" "}
                  <strong className="text-emerald-700 dark:text-emerald-400">
                    {(totalYearly / validAbos.length).toFixed(0)} €/Jahr
                  </strong>.
                </p>
              </div>
            )}

            {/* CTA */}
            {validAbos.length > 0 && (
              <a
                href="#generator"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Jetzt kündigen
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
