import type { Metadata } from "next"
import { BlogClient } from "./blog-client"

export const metadata: Metadata = {
  title: "Blog – Rechtstipps & Ratgeber rund ums Kündigen | KündigungsHeld",
  description:
    "Praxisnahe Artikel zu Kündigungsfristen, Sonderkündigung, Verbraucherrechten und mehr — geprüft von der KündigungsHeld Redaktion. Jetzt kostenlos lesen.",
  keywords: [
    "Kündigung Blog",
    "Kündigungsfrist",
    "Verbraucherrecht",
    "Sonderkündigung",
    "Vertragsrecht",
    "Rechtstipps",
    "Kündigung Ratgeber",
  ],
  alternates: {
    canonical: "https://kundigungsheld.de/blog",
  },
  openGraph: {
    title: "Blog – Rechtstipps & Ratgeber | KündigungsHeld",
    description:
      "Praxisnahe Artikel zu Kündigungen, Vertragsrecht und Verbraucherrechten — kostenlos und verständlich erklärt.",
    url: "https://kundigungsheld.de/blog",
    siteName: "KündigungsHeld",
    locale: "de_DE",
    type: "website",
  },
}

export default function BlogPage() {
  return <BlogClient />
}