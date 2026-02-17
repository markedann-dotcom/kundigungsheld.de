"use client"

import { useMemo } from "react"
import {
  Phone, Shield, Zap, Dumbbell, Tv,
  Landmark, Wifi, Smartphone, BookOpen, Users, Package,
} from "lucide-react"
import { companies, CATEGORY_LABELS, type CompanyCategory } from "@/lib/companies"
import type { ElementType } from "react"

const CATEGORY_ICONS: Record<CompanyCategory, ElementType> = {
  telekommunikation: Phone,
  versicherung:      Shield,
  energie:           Zap,
  fitness:           Dumbbell,
  streaming:         Tv,
  bank:              Landmark,
  internet:          Wifi,
  mobilfunk:         Smartphone,
  verlag:            BookOpen,
  mitgliedschaft:    Users,
  sonstiges:         Package,
}

const CATEGORY_STYLES: Record<CompanyCategory, {
  gradient: string; glow: string; border: string; label: string
}> = {
  telekommunikation: { gradient:"from-sky-400 to-blue-500",      glow:"shadow-sky-500/30",     border:"border-sky-500/20",     label:"text-sky-500"     },
  versicherung:      { gradient:"from-emerald-400 to-teal-500",  glow:"shadow-emerald-500/30", border:"border-emerald-500/20", label:"text-emerald-500" },
  energie:           { gradient:"from-amber-400 to-orange-500",  glow:"shadow-amber-500/30",   border:"border-amber-500/20",   label:"text-amber-500"   },
  fitness:           { gradient:"from-rose-400 to-pink-500",     glow:"shadow-rose-500/30",    border:"border-rose-500/20",    label:"text-rose-500"    },
  streaming:         { gradient:"from-violet-400 to-indigo-500", glow:"shadow-violet-500/30",  border:"border-violet-500/20",  label:"text-violet-500"  },
  bank:              { gradient:"from-teal-400 to-cyan-500",     glow:"shadow-teal-500/30",    border:"border-teal-500/20",    label:"text-teal-500"    },
  internet:          { gradient:"from-cyan-400 to-sky-500",      glow:"shadow-cyan-500/30",    border:"border-cyan-500/20",    label:"text-cyan-500"    },
  mobilfunk:         { gradient:"from-orange-400 to-red-500",    glow:"shadow-orange-500/30",  border:"border-orange-500/20",  label:"text-orange-500"  },
  verlag:            { gradient:"from-fuchsia-400 to-purple-500",glow:"shadow-fuchsia-500/30", border:"border-fuchsia-500/20", label:"text-fuchsia-500" },
  mitgliedschaft:    { gradient:"from-lime-400 to-green-500",    glow:"shadow-lime-500/30",    border:"border-lime-500/20",    label:"text-lime-500"    },
  sonstiges:         { gradient:"from-slate-400 to-gray-500",    glow:"shadow-slate-500/30",   border:"border-slate-500/20",   label:"text-slate-500"   },
}

function CompanyCard({ name, category }: { name: string; category: CompanyCategory }) {
  const Icon = CATEGORY_ICONS[category]
  const s = CATEGORY_STYLES[category]

  return (
    <div className={`
      group relative flex shrink-0 items-center gap-3.5
      rounded-2xl border bg-card/60 px-4 py-3
      backdrop-blur-md cursor-default select-none
      shadow-sm hover:shadow-lg transition-all duration-500 ease-out
      hover:-translate-y-1 hover:bg-card/90
      ${s.border} ${s.glow}
    `}>
      {/* Hover shimmer overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Gradient icon badge */}
      <div className={`
        relative flex h-9 w-9 shrink-0 items-center justify-center
        rounded-xl bg-gradient-to-br ${s.gradient}
        shadow-md ${s.glow}
        transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
      `}>
        <Icon className="h-4 w-4 text-white drop-shadow-sm" />
      </div>

      {/* Text */}
      <div className="relative min-w-0">
        <p className="truncate text-sm font-semibold text-foreground leading-tight tracking-tight">
          {name}
        </p>
        <p className={`mt-0.5 text-xs font-medium truncate opacity-75 ${s.label}`}>
          {CATEGORY_LABELS[category]}
        </p>
      </div>
    </div>
  )
}

export function CompanyTicker() {
  const { row1, row2 } = useMemo(() => {
    const byCategory = new Map<CompanyCategory, typeof companies>()
    for (const c of companies) {
      const arr = byCategory.get(c.category) ?? []
      arr.push(c)
      byCategory.set(c.category, arr)
    }
    const all: typeof companies = []
    for (const [, arr] of byCategory) all.push(...arr.slice(0, 3))
    const selected = all.slice(0, 30)
    return { row1: selected.slice(0, 15), row2: selected.slice(15) }
  }, [])

  return (
    <section
      className="relative overflow-hidden py-12"
      aria-label="Unterstützte Unternehmen"
    >
      {/* === BACKGROUND === */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
        {/* Top border glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* Bottom border glow */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* Ambient blobs */}
        <div className="absolute left-1/4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* === HEADER === */}
      <div className="relative mb-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-border/80" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/50">
            Unterstützte Unternehmen
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-border/80" />
        </div>

        {/* Pulsing badge */}
        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm shadow-primary/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-semibold text-primary/90">150+ Unternehmen verfügbar</span>
        </div>
      </div>

      {/* === TICKER ROWS === */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/70 to-transparent sm:w-44" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/70 to-transparent sm:w-44" />

        <div className="space-y-3">
          {/* Row 1 → left */}
          <div className="flex overflow-hidden">
            <div className="flex animate-ticker gap-3 motion-reduce:animate-none">
              <div className="flex shrink-0 gap-3">
                {row1.map((c) => <CompanyCard key={c.id} name={c.name} category={c.category} />)}
              </div>
              <div className="flex shrink-0 gap-3" aria-hidden>
                {row1.map((c) => <CompanyCard key={`r1-${c.id}`} name={c.name} category={c.category} />)}
              </div>
            </div>
          </div>

          {/* Thin separator */}
          <div className="flex items-center px-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          </div>

          {/* Row 2 ← right */}
          <div className="flex overflow-hidden">
            <div className="flex animate-ticker-reverse gap-3 motion-reduce:animate-none">
              <div className="flex shrink-0 gap-3">
                {row2.map((c) => <CompanyCard key={c.id} name={c.name} category={c.category} />)}
              </div>
              <div className="flex shrink-0 gap-3" aria-hidden>
                {row2.map((c) => <CompanyCard key={`r2-${c.id}`} name={c.name} category={c.category} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === BOTTOM STATS === */}
      <div className="relative mt-8 flex items-center justify-center gap-8">
        {[
          { value: "150+", label: "Unternehmen" },
          { value: "2 Min", label: "Ø Dauer"     },
          { value: "100%", label: "Kostenlos"    },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            {i > 0 && (
              <div className="absolute -left-4 top-1/2 h-4 w-px -translate-y-1/2 bg-border/50" />
            )}
            <span className="text-sm font-bold tabular-nums text-foreground">{value}</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}