import Link from "next/link"

export function KundigungAnfechtenBanner() {
  return (
    <section className="bg-background px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-foreground px-6 py-8 shadow-premium lg:px-10 lg:py-10">

          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

          {/* NEU badge */}
          <div className="absolute right-5 top-5">
            <span className="rounded-full bg-amber-400/20 border border-amber-400/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-300">
              NEU
            </span>
          </div>

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/10 text-2xl">
                ⚖️
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-background/40">
                  Wurden Sie ungerechtfertigt gekündigt?
                </p>
                <h2 className="font-display text-xl font-bold tracking-tight text-background lg:text-2xl">
                  Kündigung anfechten — kostenlos
                </h2>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-background/55">
                  Erstellen Sie Ihre Kündigungsschutzklage nach § 4 KSchG als professionelles PDF — in 5 Minuten, ohne Anwalt.
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {["21 Tage Frist", "§ 4 KSchG", "PDF-Download", "Keine Registrierung"].map(tag => (
                    <span key={tag} className="rounded-full bg-background/10 px-2.5 py-0.5 text-[11px] font-medium text-background/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — CTA */}
            <div className="flex shrink-0 flex-col gap-2 lg:items-end">
              <Link
                href="/kundigung-anfechten"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-bold text-foreground hover:bg-background/90 transition-all shadow-minimal whitespace-nowrap"
              >
                Jetzt Klageschrift erstellen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
              <p className="text-[11px] text-background/35 lg:text-right">
                🔒 Daten verlassen nicht Ihren Browser
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}