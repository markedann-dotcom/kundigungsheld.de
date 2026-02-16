import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArchivClient } from "@/components/archiv-client"

export const metadata: Metadata = {
  title: "Mein Archiv - KündigungsHeld",
  description:
    "Behalten Sie den Überblick über alle Ihre Kündigungen. Sehen Sie den Status und verwalten Sie Ihre Kündigungsschreiben.",
}

export default function ArchivPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-[hsl(210,40%,98%)]">
        <ArchivClient />
      </main>
      <Footer />
    </div>
  )
}
