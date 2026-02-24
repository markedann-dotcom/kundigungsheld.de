import type { MetadataRoute } from "next"
import { blogArticles } from "@/lib/blog-articles"
import { companies } from "@/lib/companies"

const BASE_URL = "https://kundigungsheld.de"

const BUILD_DATE = new Date()

// Slug-генератор — должен совпадать с тем что в app/[provider]/page.tsx
function companyToSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[äöüß]/g, (c) =>
        ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c] ?? c
      )
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + "-kundigen"
  )
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/archiv`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Страницы провайдеров — высокий приоритет для SEO
  const providerRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${BASE_URL}/${companyToSlug(company.name)}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  return [...staticRoutes, ...providerRoutes, ...blogRoutes]
}