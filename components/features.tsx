"use client";

import {
  Camera,
  Download,
  Image as ImageIcon,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";

const features = [
  {
    icon: Sparkles,
    title: "KI-Optimierung",
    description:
      "Professionelle Beleuchtung, Hintergrund und Koerperposition werden automatisch angepasst.",
  },
  {
    icon: Camera,
    title: "Biometrisch korrekt",
    description:
      "Erfuellt alle deutschen Anforderungen fuer Reisepass, Personalausweis und Fuehrerschein.",
  },
  {
    icon: Zap,
    title: "Blitzschnell",
    description:
      "Ergebnis in weniger als 30 Sekunden. Kein Termin beim Fotografen noetig.",
  },
  {
    icon: Download,
    title: "Sofort herunterladen",
    description:
      "Laden Sie Ihr fertiges Foto in hoher Aufloesung direkt auf Ihr Geraet herunter.",
  },
  {
    icon: Lock,
    title: "Datenschutz garantiert",
    description:
      "Ihre Fotos werden nicht gespeichert und sofort nach der Verarbeitung geloescht.",
  },
  {
    icon: ImageIcon,
    title: "Vielseitig einsetzbar",
    description:
      "Perfekt fuer Reisepass, Personalausweis, Fuehrerschein, Visa und Bewerbungsfotos.",
  },
];

export function Features() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: gridRef, isVisible: gridVisible } = useAnimateOnScroll({ threshold: 0.05 });

  return (
    <section id="features" className="noise-overlay relative px-5 py-24 sm:px-6 md:py-36">
      {/* Subtle section background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-secondary/30" />

      <div className="mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`scroll-reveal mb-14 sm:mb-20 ${headerVisible ? "visible" : ""}`}
        >
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Vorteile
              </span>
              <h2 className="max-w-md font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Warum AmtlyPhoto?
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:text-right">
              Alles was du fuer das perfekte Dokumentenfoto brauchst -- kostenlos
              und sofort.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className={`scroll-reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${gridVisible ? "visible" : ""}`}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/20 hover:shadow-lg sm:p-8"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2.5 font-display text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
