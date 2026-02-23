import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { KundigungGenerator } from "@/components/kundigung-generator"
import { Fristenrechner } from "@/components/fristenrechner"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BlogPreviewSection } from "@/components/blog-preview-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { CompanyTicker } from "@/components/company-ticker"
import { AiChat } from "@/components/ai-chat"
import { AiAssistantSection } from "@/components/ai-assistant-section"
import { AdBanner } from "@/components/ad-banner"
import { SuggestCompanyButton } from "@/components/suggest-company-button"

export const metadata: Metadata = {
  title: "KündigungsHeld – Verträge kostenlos & rechtssicher kündigen",
  description:
    "Erstellen Sie rechtssichere Kündigungsschreiben in 2 Minuten – für Telekom, Netflix, Fitnessstudio und 300+ weitere Anbieter. Kostenlos, ohne Registrierung, DSGVO-konform.",
  keywords: [
    "Kündigung",
    "Kündigungsschreiben",
    "Vertrag kündigen",
    "Kündigung Vorlage",
    "Telekom kündigen",
    "Fitnessstudio kündigen",
    "Netflix kündigen",
    "Sonderkündigung",
    "kostenlos kündigen",
  ],
  alternates: {
    canonical: "https://kundigungsheld.de",
  },
  openGraph: {
    title: "KündigungsHeld – Verträge kostenlos & rechtssicher kündigen",
    description:
      "Rechtssichere Kündigungsschreiben in 2 Minuten erstellen. 300+ Anbieter, kostenlos, ohne Registrierung.",
    url: "https://kundigungsheld.de",
    siteName: "KündigungsHeld",
    locale: "de_DE",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "KündigungsHeld",
  description:
    "Erstellen Sie in wenigen Minuten rechtssichere Kündigungsschreiben für über 300 deutsche Unternehmen.",
  url: "https://kundigungsheld.de",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  author: {
    "@type": "Person",
    name: "Marko Volchkov",
  },
  inLanguage: "de",
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <CompanyTicker />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <KundigungGenerator />

        <div className="flex justify-center pb-6 bg-background">
          <SuggestCompanyButton />
        </div>

        <div className="py-4 bg-background">
          <AdBanner size="leaderboard" />
        </div>

        <Fristenrechner />
        <TestimonialsSection />

        <div className="h-px bg-border/30" />

        <AiAssistantSection />

        <div className="h-px bg-border/30" />

        <BlogPreviewSection />

        <div className="py-4 bg-background">
          <AdBanner size="leaderboard" />
        </div>

        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      <AiChat />
    </div>
  )
}