"use client"

import { useEffect, useState } from "react"
import { FileText, ArrowUp, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/contexts/i18n-context"

const VISITOR_KEY = "kh_visitor_count_reset" // Снова сменили ключ для чистого старта
const VISITOR_SESSION_KEY = "kh_visitor_session"
const INITIAL_COUNT = 0
const SERVER_OFFSET = 98547 // Это число мы будем вычитать из ответа сервера

function getVisitorCount(): number {
  if (typeof window === "undefined") return INITIAL_COUNT
  try {
    const stored = localStorage.getItem(VISITOR_KEY)
    return stored ? parseInt(stored, 10) : INITIAL_COUNT
  } catch {
    return INITIAL_COUNT
  }
}

function incrementVisitor(): number {
  if (typeof window === "undefined") return INITIAL_COUNT
  try {
    const alreadyCounted = sessionStorage.getItem(VISITOR_SESSION_KEY)
    let count = getVisitorCount()
    
    if (!alreadyCounted) {
      count = count + 1
      localStorage.setItem(VISITOR_KEY, count.toString())
      sessionStorage.setItem(VISITOR_SESSION_KEY, "1")
      
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track-visitor', JSON.stringify({ 
          timestamp: Date.now(),
          path: window.location.pathname 
        }))
      } else {
        fetch('/api/track-visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            timestamp: Date.now(),
            path: window.location.pathname 
          })
        }).catch(() => {})
      }
    }
    
    return count
  } catch {
    return INITIAL_COUNT
  }
}

async function syncWithServer(setCount: (n: number) => void) {
  try {
    const response = await fetch('/api/visitor-count', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    
    if (response.ok) {
      const data = await response.json()
      
      if (typeof data.count === 'number') {
        const adjustedCount = Math.max(0, data.count - SERVER_OFFSET)
        
        if (adjustedCount > getVisitorCount()) {
          localStorage.setItem(VISITOR_KEY, adjustedCount.toString())
          setCount(adjustedCount)
        }
      }
    }
  } catch (e) {
    // Ignore API errors
  }
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useI18n()
  const [visitorCount, setVisitorCount] = useState(INITIAL_COUNT)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const links = {
    produkt: [
      { label: t.nav.features, href: "/#funktionen" },
      { label: t.nav.archive, href: "/archiv" },
      { label: t.nav.faq, href: "/#faq" },
    ],
    unternehmen: [
      { label: t.nav.blog, href: "/blog" },
      { label: "Kontakt", href: "mailto:kundigungsheld@gmail.com" },
    ],
    rechtliches: [
      { label: t.footer.impressum, href: "/impressum" },
      { label: t.footer.privacy, href: "/datenschutz" },
    ],
  }

  useEffect(() => {
    const count = incrementVisitor()
    setVisitorCount(count)
    
    const timer = setTimeout(() => {
      syncWithServer(setVisitorCount)
    }, 1000)

    const onScroll = () => {
      setShowScrollTop(window.scrollY > 100)

      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      
      if (winHeightPx > 0) {
        setScrollProgress((scrollPx / winHeightPx) * 100)
      } else {
        setScrollProgress(0)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString("de-DE")
  }

  const openChat = () => {
    // Dispatches a custom event that AiChat listens to
    window.dispatchEvent(new CustomEvent("open-ai-chat"))
  }

  const radius = 22
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-muted/30">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background transition-transform duration-300 group-hover:scale-105">
                <FileText className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                KündigungsHeld
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t.footer.aboutText}
            </p>

            {/* Visitor Counter */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 px-4 py-3 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Eye className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  {t.footer.visitorCount}
                </div>
                <div className="text-lg font-bold text-foreground">
                  {formatNumber(visitorCount)}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground transition-all duration-200 hover:border-border hover:bg-foreground hover:text-background"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.footer.resources}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.produkt.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {/* KI-Assistent — opens chat modal */}
                <li>
                  <button
                    onClick={openChat}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    KI-Assistent
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.footer.about}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.unternehmen.map((link) => (
                  <li key={link.href}>
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

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.footer.legal}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.rechtliches.map((link) => (
                  <li key={link.href}>
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
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} KündigungsHeld. {t.footer.rights}.
          </p>
          <div className="text-sm text-muted-foreground">
            Made by{" "}
            <a
              href="https://github.com/markovolchkov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Marko Volchkov
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Nach oben scrollen"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          className="absolute w-14 h-14 -rotate-90 drop-shadow-sm"
          viewBox="0 0 52 52"
        >
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted border-border"
          />
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-150 ease-out"
          />
        </svg>

        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-md transition-colors hover:bg-muted">
          <ArrowUp className="h-5 w-5 text-foreground" />
        </div>
      </button>
    </footer>
  )
}