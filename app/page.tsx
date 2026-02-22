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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "KundigungsHeld",
  description: "Erstellen Sie in wenigen Minuten rechtssichere Kundigungsschreiben fur uber 150 deutsche Unternehmen.",
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

        {/* Разделитель перед чёрной секцией */}
        <div className="h-px bg-border/30" />

        <AiAssistantSection />

        {/* Разделитель после чёрной секции */}
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