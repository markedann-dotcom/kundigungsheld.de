"use client";

import { Upload, Cpu, Download } from "lucide-react";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Selfie hochladen",
    description:
      "Mache ein Selfie oder lade ein vorhandenes Foto hoch. Achte auf gute Beleuchtung und schaue direkt in die Kamera.",
    image: "/images/step-upload.jpg",
  },
  {
    icon: Cpu,
    number: "02",
    title: "KI verarbeitet",
    description:
      "Unsere KI transformiert dein Foto in ein biometrisches Passfoto: professioneller Hintergrund, Beleuchtung und Kleidung.",
    image: "/images/step-process.jpg",
  },
  {
    icon: Download,
    number: "03",
    title: "Herunterladen",
    description:
      "Lade dein fertiges Passfoto in hoher Aufloesung herunter. Bereit fuer Reisepass, Ausweis oder Bewerbung.",
    image: "/images/step-download.jpg",
  },
];

export function HowItWorks() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: gridRef, isVisible: gridVisible } = useAnimateOnScroll({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="relative px-5 py-24 sm:px-6 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div
          ref={headerRef}
          className={`scroll-reveal mb-14 text-center sm:mb-20 ${headerVisible ? "visible" : ""}`}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Anleitung
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {"So funktioniert's"}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            In nur drei einfachen Schritten zum perfekten Passfoto.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`scroll-reveal-stagger grid gap-5 md:grid-cols-3 ${gridVisible ? "visible" : ""}`}
        >
          {steps.map((item) => (
            <div
              key={item.number}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-xl"
            >
              {/* Step image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Number overlay */}
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/80 font-display text-xs font-bold tracking-wide text-background backdrop-blur-md">
                  {item.number}
                </div>
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Text content */}
              <div className="p-6 pt-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
