import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - KündigungsHeld | Rechtstipps & Ratgeber",
  description:
    "Praxisnahe Artikel rund um Kündigungen, Vertragsrecht und Verbraucherschutz — geprüft von der KündigungsHeld Redaktion.",
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}