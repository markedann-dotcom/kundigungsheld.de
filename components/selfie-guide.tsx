"use client";

import {
  Sun,
  Eye,
  Shirt,
  Smartphone,
  Check,
  X,
} from "lucide-react";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";

const tips = [
  {
    icon: Sun,
    title: "Gute Beleuchtung",
    description:
      "Nutze natuerliches Tageslicht oder gleichmaessige Beleuchtung. Vermeide starke Schatten im Gesicht.",
  },
  {
    icon: Eye,
    title: "Direkt in die Kamera",
    description:
      "Schaue frontal in die Kamera. Kopf gerade halten, nicht neigen oder drehen.",
  },
  {
    icon: Shirt,
    title: "Kleidung egal",
    description:
      "Die KI ersetzt dein Outfit durch professionelle Kleidung. Trage, was du moechtest.",
  },
  {
    icon: Smartphone,
    title: "Hochformat bevorzugt",
    description:
      "Ein Portrait-Foto funktioniert am besten. Halte dein Handy senkrecht.",
  },
];

const doList = [
  "Neutraler Gesichtsausdruck",
  "Augen vollstaendig geoeffnet",
  "Gesicht gleichmaessig beleuchtet",
  "Frontal in die Kamera schauen",
];

const dontList = [
  "Sonnenbrille oder getoenste Glaeser",
  "Stark verdecktes Gesicht (Muetze, Tuch)",
  "Starke Filter oder Beauty-Modi",
  "Unscharfe oder pixelige Fotos",
];

export function SelfieGuide() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: tipsRef, isVisible: tipsVisible } = useAnimateOnScroll({
    threshold: 0.05,
  });
  const { ref: examplesRef, isVisible: examplesVisible } = useAnimateOnScroll({
    threshold: 0.1,
  });
  const { ref: listsRef, isVisible: listsVisible } = useAnimateOnScroll({
    threshold: 0.1,
  });

  return (
    <section id="selfie-guide" className="noise-overlay relative px-5 py-24 sm:px-6 md:py-32">
      {/* Subtle section background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-secondary/30" />

      <div className="mx-auto max-w-5xl">
        <div
          ref={headerRef}
          className={`scroll-reveal mb-14 text-center sm:mb-16 ${headerVisible ? "visible" : ""}`}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Vorbereitung
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            So machst du das perfekte Selfie
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Befolge diese einfachen Tipps, damit unsere KI das bestmoegliche
            Passfoto fuer dich erstellen kann.
          </p>
        </div>

        {/* Good vs Bad example photos */}
        <div
          ref={examplesRef}
          className={`scroll-reveal mb-12 grid gap-5 sm:mb-16 sm:grid-cols-2 ${examplesVisible ? "visible" : ""}`}
        >
          {/* Good example */}
          <div className="group overflow-hidden rounded-2xl border-2 border-primary/25 bg-card">
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src="/images/selfie-good.jpg"
                alt="Gutes Beispiel: Gleichmaessig beleuchtetes Selfie frontal in die Kamera"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-md">
                <Check className="h-3.5 w-3.5" />
                Gutes Beispiel
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-center text-sm text-muted-foreground">
                Gleichmaessige Beleuchtung, frontale Aufnahme, neutraler Hintergrund
              </p>
            </div>
          </div>

          {/* Bad example */}
          <div className="group overflow-hidden rounded-2xl border-2 border-destructive/25 bg-card">
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src="/images/selfie-bad.jpg"
                alt="Schlechtes Beispiel: Kopfbedeckung, seitlicher Winkel, schlechte Beleuchtung"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-xl bg-destructive px-3 py-1.5 text-xs font-bold text-destructive-foreground shadow-md">
                <X className="h-3.5 w-3.5" />
                Schlechtes Beispiel
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-center text-sm text-muted-foreground">
                Kopfbedeckung, seitlicher Winkel, starke Schatten
              </p>
            </div>
          </div>
        </div>

        {/* Tips grid */}
        <div
          ref={tipsRef}
          className={`scroll-reveal-stagger mb-12 grid gap-4 sm:mb-16 sm:grid-cols-2 lg:grid-cols-4 ${tipsVisible ? "visible" : ""}`}
        >
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                <tip.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-foreground">
                {tip.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {tip.description}
              </p>
            </div>
          ))}
        </div>

        {/* Do / Don't */}
        <div
          ref={listsRef}
          className={`scroll-reveal-stagger grid gap-5 sm:grid-cols-2 ${listsVisible ? "visible" : ""}`}
        >
          <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-7">
            <h3 className="mb-5 flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-primary">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15">
                <Check className="h-3.5 w-3.5" />
              </div>
              Richtig
            </h3>
            <ul className="flex flex-col gap-3.5">
              {doList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-destructive/15 bg-destructive/[0.04] p-7">
            <h3 className="mb-5 flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-destructive">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-destructive/15">
                <X className="h-3.5 w-3.5" />
              </div>
              Vermeiden
            </h3>
            <ul className="flex flex-col gap-3.5">
              {dontList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-destructive/15">
                    <X className="h-3 w-3 text-destructive" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
