import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'
import { CookieBanner } from '@/components/cookie-banner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'KündigungsHeld - Verträge einfach kündigen | 100% kostenlos',
  description:
    'Erstellen Sie in wenigen Minuten rechtssichere Kündigungsschreiben für über 120 deutsche Unternehmen. 100% kostenlos, schnell und zuverlässig.',
  keywords: 'Kündigung, Kündigungsschreiben, Vertrag kündigen, Deutschland, Vorlage, kostenlos',
  openGraph: {
    title: 'KündigungsHeld - Verträge einfach kündigen',
    description: 'Rechtssichere Kündigungsschreiben in 2 Minuten erstellen. Über 120 Unternehmen, 100% kostenlos.',
    type: 'website',
    locale: 'de_DE',
    siteName: 'KündigungsHeld',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KündigungsHeld - Verträge einfach kündigen',
    description: 'Rechtssichere Kündigungsschreiben in 2 Minuten erstellen. 100% kostenlos.',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a9a82',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
