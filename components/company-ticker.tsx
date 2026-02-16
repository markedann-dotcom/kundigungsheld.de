"use client"

import { useMemo } from "react"
import {
  Phone,
  Shield,
  Zap,
  Dumbbell,
  Tv,
  Landmark,
  Wifi,
  Smartphone,
  BookOpen,
  Users,
  Package,
} from "lucide-react"
import { companies, CATEGORY_LABELS, type CompanyCategory } from "@/lib/companies"
import type { ElementType } from "react"

const CATEGORY_ICONS: Record<CompanyCategory, ElementType> = {
  telekommunikation: Phone,
  versicherung: Shield,
  energie: Zap,
  fitness: Dumbbell,
  streaming: Tv,
  bank: Landmark,
  internet: Wifi,
  mobilfunk: Smartphone,
  verlag: BookOpen,
  mitgliedschaft: Users,
  sonstiges: Package,
}

const CATEGORY_COLORS: Record<CompanyCategory, string> = {
  telekommunikation: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  versicherung: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  energie: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  fitness: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  streaming: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  bank: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  internet: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  mobilfunk: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  verlag: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
  mitgliedschaft: "bg-lime-500/15 text-lime-600 dark:text-lime-400",
  sonstiges: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
}

function CompanyCard({ name, category }: { name: string; category: CompanyCategory }) {
  const Icon = CATEGORY_ICONS[category]
  const color = CATEGORY_COLORS[category]

  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border/50 bg-card px-4 py-3 shadow-sm">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[category]}</p>
      </div>
    </div>
  )
}

export function CompanyTicker() {
  // Pick a diverse sample of companies for the ticker
  const tickerCompanies = useMemo(() => {
    const byCategory = new Map<CompanyCategory, typeof companies>()
    for (const c of companies) {
      const arr = byCategory.get(c.category) || []
      arr.push(c)
      byCategory.set(c.category, arr)
    }
    const selected: typeof companies = []
    // Take up to 3 from each category for diversity
    for (const [, arr] of byCategory) {
      selected.push(...arr.slice(0, 3))
    }
    return selected.slice(0, 30)
  }, [])

  return (
    <section className="overflow-hidden border-y border-border/40 bg-background py-6" aria-label="Unterstützte Unternehmen">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Unterstützte Unternehmen
      </p>
      <div className="relative">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

        {/* Scrolling row */}
        <div className="flex animate-ticker gap-4 motion-reduce:animate-none motion-reduce:[&>*]:flex-wrap motion-reduce:[&>*]:justify-center">
          <div className="flex shrink-0 gap-4">
            {tickerCompanies.map((c) => (
              <CompanyCard key={c.id} name={c.name} category={c.category} />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0 gap-4" aria-hidden>
            {tickerCompanies.map((c) => (
              <CompanyCard key={`dup-${c.id}`} name={c.name} category={c.category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
