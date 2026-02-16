"use client";

import { ArrowDown, Camera, Shield, Sparkles, Zap } from "lucide-react";

export function Hero({ onScrollToUpload }: { onScrollToUpload: () => void }) {
  return (
    <section className="noise-overlay relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 md:pb-36 md:pt-48">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left - Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="animate-hero-enter mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-md sm:text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Camera className="h-2.5 w-2.5" />
              </span>
              <span>Biometrisch &middot; Kostenlos &middot; DSGVO-konform</span>
            </div>

            {/* Main headline */}
            <h1 className="animate-hero-enter-delay-1 text-balance font-display text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              Professionelles
              <br />
              Passfoto{" "}
              <span className="relative inline-block text-primary">
                in Sekunden
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 80 1 100 3C120 5 160 6 199 2.5" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-hero-enter-delay-2 mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg lg:mx-0">
              Lade ein Selfie hoch und unsere KI erstellt ein biometrisches
              Passfoto nach deutschen Standards -- fuer Reisepass, Ausweis und
              Bewerbungen.
            </p>

            {/* CTA */}
            <div className="animate-hero-enter-delay-3 mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row lg:justify-start">
              <button
                onClick={onScrollToUpload}
                className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] sm:w-auto sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Jetzt Foto erstellen
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </button>
              <span className="text-xs text-muted-foreground">
                Keine Registrierung noetig
              </span>
            </div>

            {/* Stats */}
            <div className="animate-hero-enter-delay-4 mt-14 flex items-center justify-center gap-8 sm:gap-12 lg:justify-start">
              {[
                { icon: Zap, value: "< 30s", label: "Ergebnis" },
                { icon: Shield, value: "DSGVO", label: "Konform" },
                { icon: Sparkles, value: "100%", label: "Kostenlos" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <div className="mb-1.5 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                      <stat.icon className="h-3 w-3 text-primary" />
                    </div>
                    <span className="font-display text-lg font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero image */}
          <div className="animate-hero-enter-delay-2 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Decorative ring */}
              <div className="absolute -inset-6 rounded-[2rem] border border-primary/10" />
              <div className="absolute -inset-3 rounded-3xl bg-primary/[0.06] blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-2xl shadow-foreground/5">
                <img
                  src="/images/hero-preview.jpg"
                  alt="AI-Passfoto Transformation: Von Selfie zum professionellen Passfoto"
                  className="h-auto w-full object-cover"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-2 rounded-2xl border border-border/60 bg-card px-5 py-3.5 shadow-xl sm:-right-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">KI-optimiert</p>
                    <p className="text-[10px] text-muted-foreground">Biometrisch korrekt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
