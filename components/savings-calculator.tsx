"use client"

import { useState } from "react"
import { Euro } from "lucide-react"

interface Props {
  companyName: string
  avgMonthlyFee: number
}

export function SavingsCalculator({ companyName, avgMonthlyFee }: Props) {
  const [monthlyFee, setMonthlyFee] = useState(avgMonthlyFee)
  const [monthsLeft, setMonthsLeft] = useState(6)
  const [alternative, setAlternative] = useState(0)

  const savings = (monthlyFee - alternative) * monthsLeft
  const yearlySavings = (monthlyFee - alternative) * 12

  const fmt = (n: number) =>
    n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Euro className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-foreground">
            Kostenrechner
          </h3>
          <p className="text-xs text-muted-foreground">
            Wie viel könnten Sie sparen?
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Monthly fee */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground">
            Ihr monatlicher Beitrag
          </label>
          <div className="flex items-center rounded-xl border border-border/60 bg-background focus-within:border-foreground/30 transition-colors">
            <input
              type="number"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(parseFloat(e.target.value) || 0)}
              step="0.01"
              className="w-full rounded-xl bg-transparent px-3 py-2.5 text-sm font-semibold text-foreground outline-none"
            />
            <span className="border-l border-border/60 bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground rounded-r-xl">
              €/Monat
            </span>
          </div>
        </div>

        {/* Months left */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground">
            Restlaufzeit
          </label>
          <div className="flex items-center rounded-xl border border-border/60 bg-background focus-within:border-foreground/30 transition-colors">
            <input
              type="number"
              value={monthsLeft}
              onChange={(e) => setMonthsLeft(parseInt(e.target.value) || 1)}
              min={1}
              max={48}
              className="w-full rounded-xl bg-transparent px-3 py-2.5 text-sm font-semibold text-foreground outline-none"
            />
            <span className="border-l border-border/60 bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground rounded-r-xl">
              Monate
            </span>
          </div>
        </div>

        {/* Alternative */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground">
            Alternative (monatlich)
          </label>
          <div className="flex items-center rounded-xl border border-border/60 bg-background focus-within:border-foreground/30 transition-colors">
            <input
              type="number"
              value={alternative}
              onChange={(e) => setAlternative(parseFloat(e.target.value) || 0)}
              step="0.01"
              placeholder="0"
              className="w-full rounded-xl bg-transparent px-3 py-2.5 text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
            />
            <span className="border-l border-border/60 bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground rounded-r-xl">
              €/Monat
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-foreground px-4 py-3">
          <span className="text-xs font-semibold text-background/80">
            Sie sparen insgesamt
          </span>
          <span className="text-lg font-bold text-background">
            {fmt(savings)} €
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
          <span className="text-xs font-semibold text-muted-foreground">
            Ersparnis pro Jahr
          </span>
          <span className="text-base font-bold text-foreground">
            {fmt(yearlySavings)} €
          </span>
        </div>
      </div>

      {savings > 0 && (
        <div className="mt-3 rounded-xl bg-green-500/10 px-4 py-2.5 text-center text-xs font-semibold text-green-700 dark:text-green-400">
          ✅ Jetzt kündigen und {Math.round(savings)} € sparen!
        </div>
      )}
    </div>
  )
}