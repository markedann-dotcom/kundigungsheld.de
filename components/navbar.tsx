"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Menu, X, Archive, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/contexts/i18n-context"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useI18n()

  const navLinks = [
    { label: "Funktionen", href: "/#funktionen" },
    { label: "So geht's", href: "/#so-gehts" },
    { label: "Generator", href: "/#generator" },
    { label: "Fristenrechner", href: "/#fristenrechner", highlight: true },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.archive, href: "/archiv" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="KündigungsHeld Startseite">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
            <FileText className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            KündigungsHeld
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                  link.highlight
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <Button size="sm" className="gap-2 rounded-full px-5 bg-foreground text-background hover:bg-foreground/90" asChild>
            <Link href="/archiv">
              <Archive className="h-4 w-4" />
              Archiv
            </Link>
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-4 pb-4 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                    link.highlight ? "text-foreground font-semibold" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.highlight && <Clock className="h-3.5 w-3.5 text-amber-500" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button size="sm" className="flex-1 gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90" asChild>
              <Link href="/archiv">
                <Archive className="h-4 w-4" />
                Archiv
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}