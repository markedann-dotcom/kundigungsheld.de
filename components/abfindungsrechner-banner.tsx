import Link from "next/link"

export function AbfindungsrechnerBanner() {
  return (
    <section className="bg-background px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-secondary/40 px-6 py-8 lg:px-10 lg:py-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground/5 border border-border text-2xl">
                💶
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Kostenloser Rechner
                </p>
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                  Wie viel Abfindung steht Ihnen zu?
                </h2>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Berechnen Sie Ihre realistische Abfindung in Sekunden — basierend auf Gehalt, Dienstjahren und Ihrer persönlichen Situation.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["§ 1a KSchG", "Sofortergebnis", "3 Szenarien", "Steuerberechnung"].map(tag => (
                    <span key={tag} className="rounded-full border border-border/50 bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex shrink-0 flex-col gap-2 lg:items-end">
              <Link
                href="/abfindungsrechner"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-foreground/90 transition-all shadow-minimal whitespace-nowrap"
              >
                Abfindung berechnen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
              <p className="text-[11px] text-muted-foreground lg:text-right">
                🔒 Anonym · Keine Registrierung
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
