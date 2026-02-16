"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, ArrowUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = {
  produkt: [
    { label: "Generator", href: "/#generator" },
    { label: "Funktionen", href: "/#funktionen" },
    { label: "Mein Archiv", href: "/archiv" },
    { label: "FAQ", href: "/#faq" },
  ],
  unternehmen: [
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "mailto:kontakt@kundigungsheld.de" },
  ],
  rechtliches: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
}

const VISITOR_KEY = "kh_visitor_count"
const VISITOR_SESSION_KEY = "kh_visitor_session"

function getVisitorCount(): number {
  if (typeof window === "undefined") return 0
  try {
    const stored = localStorage.getItem(VISITOR_KEY)
    return stored ? parseInt(stored, 10) : 0
  } catch {
    return 0
  }
}

function incrementVisitor(): number {
  if (typeof window === "undefined") return 0
  try {
    const alreadyCounted = sessionStorage.getItem(VISITOR_SESSION_KEY)
    let count = getVisitorCount()
    if (!alreadyCounted) {
      count = count + 1
      localStorage.setItem(VISITOR_KEY, count.toString())
      sessionStorage.setItem(VISITOR_SESSION_KEY, "1")
    }
    return count
  } catch {
    return 0
  }
}

export function Footer() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const count = incrementVisitor()
    setVisitorCount(count)
  }, [])

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Floating scroll-to-top button */}
      <button
        onClick={scrollToTop}
        aria-label="Nach oben scrollen"
        data-no-print
        className={`scroll-to-top fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:scale-105 ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <footer className="border-t border-border/50 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2.5" aria-label="KündigungsHeld Startseite">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-foreground">
                  KündigungsHeld
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Deutschlands beliebtester Kündigungsgenerator. Erstellen Sie
                rechtssichere Kündigungsschreiben in Minuten. 100% kostenlos.
              </p>

              {/* Visitor counter */}
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/50 px-3 py-2">
                <Eye className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  <span className="tabular-nums font-semibold text-foreground">
                    {visitorCount.toLocaleString("de-DE")}
                  </span>{" "}
                  Besucher
                </span>
              </div>
            </div>

            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                  {title === "produkt"
                    ? "Produkt"
                    : title === "unternehmen"
                      ? "Unternehmen"
                      : "Rechtliches"}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {items.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} KündigungsHeld. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/impressum" className="text-xs text-muted-foreground/60 transition-colors duration-200 hover:text-muted-foreground">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-xs text-muted-foreground/60 transition-colors duration-200 hover:text-muted-foreground">
                Datenschutz
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="gap-1.5 text-xs text-muted-foreground/60 hover:text-muted-foreground"
              >
                <ArrowUp className="h-3 w-3" />
                Nach oben
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
