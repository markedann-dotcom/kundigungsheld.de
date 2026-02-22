"use client"

import { Sparkles, ArrowRight } from "lucide-react"

interface AdBannerProps {
  size?: "leaderboard" | "rectangle" | "square"
  className?: string
}

export function AdBanner({ size = "leaderboard", className = "" }: AdBannerProps) {
  const isHorizontal = size === "leaderboard"

  return (
    <div
      className={`relative mx-auto overflow-hidden ${className}`}
      style={{ maxWidth: isHorizontal ? "860px" : "300px" }}
      aria-label="Werbefläche"
      role="complementary"
    >
      {/* Outer glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-foreground/20 via-foreground/10 to-foreground/20 blur-sm" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden px-5 py-4 sm:px-8 sm:py-6">
        {/* Gradient background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, hsl(var(--foreground)) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsl(var(--foreground)) 0%, transparent 60%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Content — вертикально на мобиле, горизонтально на sm+ */}
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Left: badge + text */}
          <div className="flex items-center gap-3">
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1">
              <Sparkles className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Anzeige
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-tight sm:text-base">
                Hier könnte Ihre Werbung stehen
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                Erreichen Sie tausende Nutzer, die aktiv Verträge kündigen
              </p>
            </div>
          </div>

          {/* Divider — только на десктопе */}
          <div className="hidden sm:block h-10 w-px shrink-0 bg-border/40" />

          {/* Right: CTA */}
          <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
            <a
              href="mailto:kundigungsheld@gmail.com?subject=Werbung%20auf%20KündigungsHeld"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-200 hover:bg-foreground/85 hover:shadow-lg"
            >
              Jetzt anfragen
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <span className="text-[10px] text-muted-foreground/60 whitespace-nowrap">
              {isHorizontal ? "Banner · 860 × 100" : "Rectangle · 300 × 250"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}