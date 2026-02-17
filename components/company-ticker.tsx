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

const CATEGORY_COLORS: Record<CompanyCategory, { bg: string; icon: string; dot: string }> = {
  telekommunikation: { bg: "bg-sky-500/10",     icon: "text-sky-500",     dot: "bg-sky-400"     },
  versicherung:      { bg: "bg-emerald-500/10",  icon: "text-emerald-500", dot: "bg-emerald-400" },
  energie:           { bg: "bg-amber-500/10",    icon: "text-amber-500",   dot: "bg-amber-400"   },
  fitness:           { bg: "bg-rose-500/10",     icon: "text-rose-500",    dot: "bg-rose-400"    },
  streaming:         { bg: "bg-indigo-500/10",   icon: "text-indigo-500",  dot: "bg-indigo-400"  },
  bank:              { bg: "bg-teal-500/10",     icon: "text-teal-500",    dot: "bg-teal-400"    },
  internet:          { bg: "bg-cyan-500/10",     icon: "text-cyan-500",    dot: "bg-cyan-400"    },
  mobilfunk:         { bg: "bg-orange-500/10",   icon: "text-orange-500",  dot: "bg-orange-400"  },
  verlag:            { bg: "bg-fuchsia-500/10",  icon: "text-fuchsia-500", dot: "bg-fuchsia-400" },
  mitgliedschaft:    { bg: "bg-lime-500/10",     icon: "text-lime-500",    dot: "bg-lime-400"    },
  sonstiges:         { bg: "bg-slate-500/10",    icon: "text-slate-500",   dot: "bg-slate-400"   },
}

function CompanyCard({ name, category }: { name: string; category: CompanyCategory }) {
  const Icon = CATEGORY_ICONS[category]
  const colors = CATEGORY_COLORS[category]

  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border/40 bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5">
      {/* Icon container */}
      <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`h-4 w-4 ${colors.icon}`} />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground leading-tight">{name}</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${colors.dot} opacity-70`} />
          <p className="text-xs text-muted-foreground/80 truncate">{CATEGORY_LABELS[category]}</p>
        </div>
      </div>
    </div>
  )
}

export function CompanyTicker() {
  const tickerCompanies = useMemo(() => {
    const byCategory = new Map<CompanyCategory, typeof companies>()
    for (const c of companies) {
      const arr = byCategory.get(c.category) || []
      arr.push(c)
      byCategory.set(c.category, arr)
    }
    const selected: typeof companies = []
    for (const [, arr] of byCategory) {
      selected.push(...arr.slice(0, 3))
    }
    return selected.slice(0, 30)
  }, [])

  return (
    <section
      className="relative overflow-hidden border-y border-border/30 py-10"
      aria-label="Unterstützte Unternehmen"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20 pointer-events-none" />

      {/* Header */}
      <div className="relative mb-6 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-border/60" />
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
          Unterstützte Unternehmen
        </p>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-border/60" />
      </div>

      {/* Ticker rows */}
      <div className="relative space-y-3">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-32" />

        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden">
          <div className="flex animate-ticker gap-3 motion-reduce:animate-none">
            <div className="flex shrink-0 gap-3">
              {tickerCompanies.slice(0, 15).map((c) => (
                <CompanyCard key={c.id} name={c.name} category={c.category} />
              ))}
            </div>
            <div className="flex shrink-0 gap-3" aria-hidden>
              {tickerCompanies.slice(0, 15).map((c) => (
                <CompanyCard key={`dup1-${c.id}`} name={c.name} category={c.category} />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — scrolls right (reversed) */}
        <div className="flex overflow-hidden">
          <div className="flex animate-ticker-reverse gap-3 motion-reduce:animate-none">
            <div className="flex shrink-0 gap-3">
              {tickerCompanies.slice(15).map((c) => (
                <CompanyCard key={c.id} name={c.name} category={c.category} />
              ))}
            </div>
            <div className="flex shrink-0 gap-3" aria-hidden>
              {tickerCompanies.slice(15).map((c) => (
                <CompanyCard key={`dup2-${c.id}`} name={c.name} category={c.category} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Counter badge */}
      <div className="relative mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">
            150+ Unternehmen verfügbar
          </span>
        </div>
      </div>
    </section>
  )
}