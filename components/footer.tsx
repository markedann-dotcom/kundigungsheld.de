"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";

export function Footer() {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.2 });

  return (
    <footer
      ref={ref}
      className={`scroll-reveal border-t border-border/50 px-5 py-14 sm:px-6 sm:py-16 ${isVisible ? "visible" : ""}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Camera className="h-4 w-4" />
          </div>
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            Amtly<span className="text-primary">Photo</span>
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="/impressum"
            className="rounded-lg px-3 py-1.5 font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="rounded-lg px-3 py-1.5 font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
          >
            Datenschutzerklaerung
          </Link>
          <a
            href="#faq"
            className="rounded-lg px-3 py-1.5 font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
          >
            FAQ
          </a>
        </nav>

        {/* Divider */}
        <div className="h-px w-full max-w-xs bg-border/50" />

        {/* Copyright */}
        <div className="text-center text-xs leading-relaxed text-muted-foreground">
          <p>
            Kostenloser Service zur Erstellung professioneller Passfotos mit KI.
          </p>
          <p className="mt-1">
            Keine Speicherung persoenlicher Daten. DSGVO-konform.
          </p>
        </div>
      </div>
    </footer>
  );
}
