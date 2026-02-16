"use client";

import { ArrowRight } from "lucide-react";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";

const examples = [
  {
    before: "/images/example-before-1.jpg",
    after: "/images/example-after-1.jpg",
    label: "Bewerbungsfoto",
  },
  {
    before: "/images/example-before-2.jpg",
    after: "/images/example-after-2.jpg",
    label: "Passfoto",
  },
  {
    before: "/images/example-before-3.jpg",
    after: "/images/example-after-3.jpg",
    label: "Ausweisfoto",
  },
];

export function BeforeAfter() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: gridRef, isVisible: gridVisible } = useAnimateOnScroll({ threshold: 0.1 });

  return (
    <section id="before-after" className="relative px-5 py-24 sm:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`scroll-reveal mb-14 text-center sm:mb-20 ${headerVisible ? "visible" : ""}`}
        >
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Ergebnisse
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Vorher & Nachher
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sieh dir an, wie unsere KI aus einem einfachen Selfie ein
            professionelles Passfoto erstellt.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`scroll-reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${gridVisible ? "visible" : ""}`}
        >
          {examples.map((example, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-xl"
            >
              <div className="flex items-stretch">
                {/* Before */}
                <div className="relative flex-1">
                  <div className="absolute left-3 top-3 z-10 rounded-lg bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur-md">
                    Vorher
                  </div>
                  <div className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={example.before}
                      alt={`Vorher - ${example.label}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center px-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 sm:h-10 sm:w-10">
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </div>

                {/* After */}
                <div className="relative flex-1">
                  <div className="absolute right-3 top-3 z-10 rounded-lg bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Nachher
                  </div>
                  <div className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={example.after}
                      alt={`Nachher - ${example.label}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 px-5 py-4">
                <p className="text-center text-sm font-semibold text-foreground">
                  {example.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
