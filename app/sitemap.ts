import type { MetadataRoute } from "next"
import { blogArticles } from "@/lib/blog-articles"

const BASE_URL = "https://kundigungsheld.de"

// дата билда (один раз на деплой)
const BUILD_DATE = new Date()

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

  return [...staticRoutes, ...blogRoutes]
}