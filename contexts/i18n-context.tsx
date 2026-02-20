'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, DEFAULT_LANGUAGE, translations, TranslationKeys } from '@/lib/i18n'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY = 'kundigungsheld-language'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)
  const [mounted, setMounted] = useState(false)

  // Load language from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && translations[stored]) {
      setLanguageState(stored)
    }
    setMounted(true)
  }, [])

  // Save language to localStorage when changed
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  // Prevent hydration mismatch by showing default until mounted
  const currentTranslations = mounted ? translations[language] : translations[DEFAULT_LANGUAGE]

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: currentTranslations }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
