"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONSENT_KEY = "kh_cookie_consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY)
      if (!consent) {
        // Short delay so it doesn't flash on load
        const timer = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage not available
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted")
    } catch {
      // ignore
    }
    setVisible(false)
  }

  function decline() {
    try {
      localStorage.setItem(CONSENT_KEY, "declined")
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border/50 bg-card/95 px-4 py-4 shadow-2xl backdrop-blur-sm transition-all duration-500 animate-in slide-in-from-bottom-4 sm:px-6"
      role="dialog"
      aria-label="Cookie-Hinweis"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Datenschutzhinweis
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Diese Website nutzt localStorage, um Ihre Kündigungen lokal in Ihrem Browser zu speichern
              und den Besucherzähler zu betreiben. Es werden keine Daten an Server übertragen und keine
              Tracking-Cookies verwendet.{" "}
              <Link href="/datenschutz" className="text-primary underline underline-offset-2 hover:text-primary/80">
                Mehr erfahren
              </Link>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2 sm:ml-4">
          <Button variant="outline" size="sm" onClick={decline} className="text-xs">
            Ablehnen
          </Button>
          <Button size="sm" onClick={accept} className="text-xs">
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  )
}
