"use client"

import { useMemo } from "react"
import { companies, CATEGORY_LABELS, type CompanyCategory } from "@/lib/companies"

function CompanyCard({ name, category }: { name: string; category: CompanyCategory }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360

  return (
    <div className={`
      group relative flex shrink-0 items-center gap-3.5
      rounded-2xl border border-border/50 bg-card/60 px-4 py-3
      backdrop-blur-md cursor-default select-none
      shadow-sm hover:shadow-lg transition-all duration-500 ease-out
      hover:-translate-y-1 hover:bg-card/90
    `}>
      {/* Hover shimmer */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Аватар с инициалами */}
      <div
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white text-xs font-black shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 65%, 45%), hsl(${(hue + 40) % 360}, 70%, 35%))`,
        }}
      >
        {initials}
      </div>

      {/* Текст */}
      <div className="relative min-w-0">
        <p className="truncate text-sm font-semibold text-foreground leading-tight tracking-tight">
          {name}
        </p>
        <p className="mt-0.5 text-xs font-medium truncate opacity-50 text-foreground">
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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
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
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/70 to-transparent sm:w-44" />
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

          {/* Separator */}
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
          { value: "2 Min", label: "Ø Dauer" },
          { value: "100%", label: "Kostenlos" },
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