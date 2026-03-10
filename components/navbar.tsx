"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  FileText, Menu, X, Archive, Clock, Scale,
  Zap, BookOpen, ChevronDown, Calculator,
  HelpCircle, Newspaper, Library, Shield, Euro
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/contexts/i18n-context"

const MENU_GROUPS = [
  {
    id: "tools",
    label: "Tools",
    items: [
      {
        label: "Kündigung Generator",
        href: "/#generator",
        icon: FileText,
        desc: "Schreiben in 2 Minuten",
      },
      {
        label: "Fristenrechner",
        href: "/#fristenrechner",
        icon: Calculator,
        desc: "Kündigungsfrist berechnen",
        highlight: true,
      },
      {
        label: "Kündigung anfechten",
        href: "/kundigung-anfechten",
        icon: Scale,
        desc: "Rechtlich vorgehen",
        isNew: true,
      },
      {
        label: "Archiv",
        href: "/archiv",
        icon: Archive,
        desc: "Alle Anbieter durchsuchen",
      },
      {
        label: "Abo-Kosten-Rechner",
        href: "/#abo-rechner",
        icon: Euro,
        desc: "Was kosten Ihre Abos?",
        isNew: true,
      },
    ],
  },
  {
    id: "wissen",
    label: "Wissen",
    items: [
      {
        label: "Kiki",
        href: "/#kiki",
        icon: BookOpen,
        desc: "Vorlagen & Gesetze",
        isNew: true,
      },
      {
        label: "So funktioniert's",
        href: "/#so-gehts",
        icon: Zap,
        desc: "Schritt für Schritt",
      },
      {
        label: "FAQ",
        href: "/#faq",
        icon: HelpCircle,
        desc: "Häufige Fragen",
      },
      {
        label: "Blog",
        href: "/blog",
        icon: Newspaper,
        desc: "Tipps & Ratgeber",
      },
    ],
  },
]

function MegaMenu({ group, onClose }: { group: typeof MENU_GROUPS[0]; onClose: () => void }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/10 p-2 z-50">
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-border/60 bg-background" />
      <div className="grid gap-0.5">
        {group.items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background transition-colors group-hover:border-foreground/20 group-hover:bg-foreground group-hover:text-background">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  {item.isNew && (
                    <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
                      NEU
                    </span>
                  )}
                  {item.highlight && !item.isNew && (
                    <Clock className="h-3 w-3 text-amber-500" />
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{item.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const allMobileLinks = [
    { label: t.nav.features, href: "/#funktionen", icon: Shield },
    { label: t.nav.generator, href: "/#generator", icon: FileText },
    { label: t.nav.fristenrechner, href: "/#fristenrechner", icon: Calculator, highlight: true },
    { label: "Abo-Kosten-Rechner", href: "/#abo-rechner", icon: Euro, isNew: true },
    { label: "Kiki — Bibliothek", href: "/#kiki", icon: BookOpen, isNew: true },
    { label: "Kündigung anfechten", href: "/kundigung-anfechten", icon: Scale, isNew: true },
    { label: t.nav.blog, href: "/blog", icon: Newspaper },
    { label: t.nav.archive, href: "/archiv", icon: Archive },
    { label: "FAQ", href: "/#faq", icon: HelpCircle },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <nav ref={navRef} className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">

        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="KündigungsHeld Startseite">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
            <FileText className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            KündigungsHeld
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          <li>
            <Link
              href="/#funktionen"
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t.nav.features}
            </Link>
          </li>

          {MENU_GROUPS.map((group) => (
            <li key={group.id} className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === group.id ? null : group.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                  activeMenu === group.id ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                {group.label}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMenu === group.id ? "rotate-180" : ""}`} />
              </button>
              {activeMenu === group.id && (
                <MegaMenu group={group} onClose={() => setActiveMenu(null)} />
              )}
            </li>
          ))}

          <li>
            <Link
              href="/#kiki"
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Library className="h-3.5 w-3.5" />
              Kiki
              <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">NEU</span>
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            size="sm"
            className="gap-2 rounded-full px-5 bg-foreground text-background hover:bg-foreground/90"
            asChild
          >
            <Link href="/archiv">
              <Archive className="h-4 w-4" />
              {t.nav.archive}
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
          <ul className="flex flex-col gap-0.5">
            {allMobileLinks.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                      link.highlight ? "text-foreground font-semibold" : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {link.label}
                    {link.isNew && (
                      <span className="ml-auto rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
                        NEU
                      </span>
                    )}
                    {link.highlight && !link.isNew && (
                      <Clock className="ml-auto h-3.5 w-3.5 text-amber-500" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-3 flex items-center gap-2 border-t border-border/40 pt-3">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              size="sm"
              className="flex-1 gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
              asChild
            >
              <Link href="/archiv" onClick={() => setMobileOpen(false)}>
                <Archive className="h-4 w-4" />
                {t.nav.archive}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}