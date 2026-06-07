"use client"

import { useMemo, useState } from "react"
import { companies, CATEGORY_LABELS, type CompanyCategory } from "@/lib/companies"
import { getLogoUrl } from "@/lib/company-domains"

function CompanyLogo({
  companyId,
  name,
  hue,
}: {
  companyId: string
  name: string
  hue: number
}) {
  const [imgError, setImgError] = useState(false)
  const logoUrl = getLogoUrl(companyId)

  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  if (logoUrl && !imgError) {
    return (
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg overflow-hidden border border-border/20">
        <img
          src={logoUrl}
          alt={`${name} Logo`}
          className="h-7 w-7 object-contain"
          width={28}
          height={28}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white text-xs font-black shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 50) % 360}, 75%, 38%))`,
        boxShadow: `0 4px 14px hsl(${hue}, 60%, 50%, 0.35)`,
      }}
    >
      <span className="relative z-10">{initials}</span>
      <div
        className="absolute inset-0 rounded-xl opacity-40"
        style={{
          background: `radial-gradient(circle at 30% 30%, hsl(${hue}, 100%, 85%), transparent 60%)`,
        }}
      />
    </div>
  )
}

function CompanyCard({ id, name, category }: { id: string; name: string; category: CompanyCategory }) {
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360

  return (
    <div
      className="group relative flex shrink-0 items-center gap-3.5 rounded-2xl border border-border/40 bg-card/70 px-4 py-3 backdrop-blur-md cursor-default select-none shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-border/60 hover:bg-card/95"
      style={{
        ["--card-hue" as string]: hue,
      }}
    >
      {/* Gradient shimmer on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/8 via-transparent to-white/3 pointer-events-none" />
      {/* Colored glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px hsl(${hue}, 60%, 55%, 0.3), 0 8px 32px hsl(${hue}, 50%, 50%, 0.12)`,
        }}
      />

      <CompanyLogo companyId={id} name={name} hue={hue} />

      <div className="relative min-w-0">
        <p className="truncate text-sm font-semibold text-foreground leading-tight tracking-tight">{name}</p>
        <p className="mt-0.5 text-[11px] font-medium truncate text-muted-foreground/60">{CATEGORY_LABELS[category]}</p>
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
      className="relative overflow-hidden py-16 max-w-full"
      style={{ contain: "layout" }}
      aria-label="Unterstützte Unternehmen"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        {/* Ambient glows */}
        <div className="absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-48 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/4 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative mb-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-border/60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground/40">
            Unterstützte Unternehmen
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-border/60" />
        </div>

        <div className="flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/8 px-5 py-2 shadow-sm shadow-primary/10 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_2px_hsl(var(--primary)/0.4)]" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-primary/90">150+ Unternehmen verfügbar</span>
        </div>
      </div>

      {/* Ticker rows */}
      <div className="relative overflow-hidden w-full">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-48" />

        <div className="space-y-3">
          {/* Row 1 — left to right */}
          <div className="flex overflow-hidden w-full">
            <div className="flex animate-ticker gap-3 motion-reduce:animate-none">
              <div className="flex shrink-0 gap-3">
                {row1.map((c) => <CompanyCard key={c.id} id={c.id} name={c.name} category={c.category} />)}
              </div>
              <div className="flex shrink-0 gap-3" aria-hidden>
                {row1.map((c) => <CompanyCard key={`r1-${c.id}`} id={c.id} name={c.name} category={c.category} />)}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center px-6">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
          </div>

          {/* Row 2 — right to left */}
          <div className="flex overflow-hidden w-full">
            <div className="flex animate-ticker-reverse gap-3 motion-reduce:animate-none">
              <div className="flex shrink-0 gap-3">
                {row2.map((c) => <CompanyCard key={c.id} id={c.id} name={c.name} category={c.category} />)}
              </div>
              <div className="flex shrink-0 gap-3" aria-hidden>
                {row2.map((c) => <CompanyCard key={`r2-${c.id}`} id={c.id} name={c.name} category={c.category} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative mt-10 flex items-center justify-center">
        <div className="flex items-center gap-0 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm px-2 py-1 shadow-sm divide-x divide-border/30">
          {[
            { value: "150+", label: "Unternehmen", icon: "🏢" },
            { value: "2 Min", label: "Ø Dauer", icon: "⚡" },
            { value: "100%", label: "Kostenlos", icon: "✨" },
          ].map(({ value, label, icon }) => (
            <div key={label} className="flex flex-col items-center gap-0.5 px-6 py-2">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{icon}</span>
                <span className="text-sm font-bold tabular-nums text-foreground">{value}</span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}