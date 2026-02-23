import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArchivClient } from "@/components/archiv-client"

export const metadata: Metadata = {
  title: "Mein Kündigungsarchiv – Alle Kündigungen im Überblick | KündigungsHeld",
  description:
    "Verwalten Sie alle Ihre Kündigungsschreiben an einem Ort. Status verfolgen, PDF herunterladen und neue Kündigungen erstellen – kostenlos und DSGVO-konform.",
  keywords: [
    "Kündigungsarchiv",
    "Kündigung verwalten",
    "Kündigungsstatus",
    "Kündigungsschreiben speichern",
  ],
  alternates: {
    canonical: "https://kundigungsheld.de/archiv",
  },
  openGraph: {
    title: "Mein Kündigungsarchiv | KündigungsHeld",
    description:
      "Alle Ihre Kündigungen auf einen Blick – Status verfolgen, PDFs herunterladen, Notizen hinzufügen.",
    url: "https://kundigungsheld.de/archiv",
    siteName: "KündigungsHeld",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function ArchivPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background">
        <ArchivClient />
      </main>
      <Footer />
    </div>
  )
}