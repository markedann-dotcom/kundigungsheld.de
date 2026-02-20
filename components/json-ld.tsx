// components/json-ld.tsx
// Универсальный компонент для JSON-LD разметки

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ── Готовые схемы ─────────────────────────────────────────────────────────

const BASE_URL = "https://kuendigungsheld.de"

/** Схема для главной страницы */
export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "KündigungsHeld",
        url: BASE_URL,
        description:
          "Kostenloser Kündigungsschreiben-Generator für deutsche Verbraucher. Erstellen Sie rechtssichere Kündigungen in wenigen Minuten.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@type": "Organization",
          name: "KündigungsHeld",
          url: BASE_URL,
          contactPoint: {
            "@type": "ContactPoint",
            email: "kundigungsheld@gmail.com",
            contactType: "customer support",
            availableLanguage: "German",
          },
        },
      }}
    />
  )
}

/** Схема для статьи блога */
export function BlogArticleJsonLd({
  slug,
  title,
  excerpt,
  date,
  author,
}: {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: excerpt,
        url: `${BASE_URL}/blog/${slug}`,
        datePublished: date,
        dateModified: date,
        author: {
          "@type": "Organization",
          name: author,
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "KündigungsHeld",
          url: BASE_URL,
        },
        inLanguage: "de-DE",
        isAccessibleForFree: true,
      }}
    />
  )
}

/** Схема для FAQ-блока */
export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

/** Схема Organization для Impressum/Footer */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "KündigungsHeld",
        url: BASE_URL,
        email: "kundigungsheld@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Eugen-Adolf-Straße 30",
          addressLocality: "Backnang",
          postalCode: "71522",
          addressCountry: "DE",
        },
      }}
    />
  )
}