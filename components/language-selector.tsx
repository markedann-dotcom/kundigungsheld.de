"use client"

import { useState } from 'react'
import { Languages, Check } from 'lucide-react'
import { useLocale } from './locale-provider'
import { SUPPORTED_LOCALES, Locale } from '@/lib/i18n'

export function LanguageSelector() {
  const { locale, setLocale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const currentLocale = SUPPORTED_LOCALES.find(l => l.code === locale) || SUPPORTED_LOCALES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Select language"
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLocale.flag}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-border/50 bg-card shadow-card overflow-hidden animate-in fade-in slide-in-from-top-2">
            {SUPPORTED_LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => {
                  setLocale(loc.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  locale === loc.code
                    ? 'bg-foreground/5 font-semibold'
                    : 'hover:bg-muted/50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{loc.flag}</span>
                  <span>{loc.name}</span>
                </span>
                {locale === loc.code && (
                  <Check className="h-4 w-4 text-foreground" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
