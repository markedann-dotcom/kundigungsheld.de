"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  FileText, Menu, X, Archive, Clock, Scale,
  Zap, BookOpen, ChevronDown, Calculator,
  HelpCircle, Newspaper, Library, Shield, Euro, ShieldAlert
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/contexts/i18n-context"

const MENU_GROUPS = [
  {
    id: "tools",
    label: "Tools",
    color: "blue",
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
      {
        label: "Widerspruch Generator",
        href: "/widerspruch",
        icon: ShieldAlert,
        desc: "Bußgeld, Jobcenter & mehr",
        isNew: true,
      },
    ],
  },
  {
    id: "wissen",
    label: "Wissen",
    color: "violet",
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

const iconColors: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white",
}

function MegaMenu({
  group,
  onClose,
}: {
  group: (typeof MENU_GROUPS)[0]
  onClose: () => void
}) {
  const colorClass = iconColors[group.color] ?? iconColors.blue

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl border border-border/50 bg-background/98 backdrop-blur-2xl shadow-2xl shadow-black/15 p-2 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-150">
      {/* Arrow */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-border/50 bg-background" />

      {/* Group header */}
      <div className="px-3 pb-1.5 pt-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          {group.label}
        </span>
      </div>

      <div className="grid gap-0.5">
        {group.items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 hover:bg-muted/80"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-150 ${colorClass}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-foreground leading-none">
                    {item.label}
                  </span>
                  {item.isNew && (
                    <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none shadow-sm">
                      NEU
                    </span>
                  )}
                  {item.highlight && !item.isNew && (
                    <Clock className="h-3 w-3 text-amber-500" />
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground/70 truncate leading-none">
                  {item.desc}
                </p>
              </div>
              <ChevronDown className="h-3 w-3 -rotate-90 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
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
  const [scrolled, setScrolled] = useState(false)
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const allMobileLinks = [
    { label: t.nav.features, href: "/#funktionen", icon: Shield },
    { label: t.nav.generator, href: "/#generator", icon: FileText },
    { label: t.nav.fristenrechner, href: "/#fristenrechner", icon: Calculator, highlight: true },
    { label: "Abo-Kosten-Rechner", href: "/#abo-rechner", icon: Euro, isNew: true },
    { label: "Widerspruch Generator", href: "/widerspruch", icon: ShieldAlert, isNew: true },
    { label: "Kiki — Bibliothek", href: "/#kiki", icon: BookOpen, isNew: true },
    { label: "Kündigung anfechten", href: "/kundigung-anfechten", icon: Scale, isNew: true },
    { label: t.nav.blog, href: "/blog", icon: Newspaper },
    { label: t.nav.archive, href: "/archiv", icon: Archive },
    { label: "FAQ", href: "/#faq", icon: HelpCircle },
  ]

  const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      e.preventDefault()
      setMobileOpen(false)
      const hash = href.split("#")[1]
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 300)
    } else {
      setMobileOpen(false)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/90 backdrop-blur-xl shadow-sm shadow-black/5"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <nav
        ref={navRef}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="KündigungsHeld Startseite"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md shadow-blue-500/30 transition-transform duration-200 group-hover:scale-105">
            <FileText className="h-4.5 w-4.5" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-white/10" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-foreground">Kündigungs</span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Held
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          <li>
            <Link
              href="/#funktionen"
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
            >
              {t.nav.features}
            </Link>
          </li>

          {MENU_GROUPS.map((group) => (
            <li key={group.id} className="relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === group.id ? null : group.id)
                }
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150 hover:bg-secondary hover:text-foreground ${
                  activeMenu === group.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {group.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    activeMenu === group.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeMenu === group.id && (
                <MegaMenu group={group} onClose={() => setActiveMenu(null)} />
              )}
            </li>
          ))}

          <li>
            <Link
              href="/#kiki"
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
            >
              <Library className="h-3.5 w-3.5" />
              Kiki
              <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none shadow-sm">
                NEU
              </span>
            </Link>
          </li>
        </ul>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            size="sm"
            className="gap-2 rounded-full px-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-px"
            asChild
          >
            <Link href="/archiv">
              <Archive className="h-4 w-4" />
              {t.nav.archive}
            </Link>
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/40 bg-background/98 backdrop-blur-xl px-4 pb-5 pt-2 lg:hidden animate-in slide-in-from-top-2 fade-in-0 duration-200">
          {/* Section label */}
          <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
            Navigation
          </p>
          <ul className="flex flex-col gap-0.5">
            {allMobileLinks.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 hover:bg-secondary hover:text-foreground ${
                      link.highlight
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground"
                    }`}
                    onClick={(e) => handleMobileNav(e, link.href)}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        link.highlight
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    {link.label}
                    {link.isNew && (
                      <span className="ml-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
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
              className="flex-1 gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20"
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