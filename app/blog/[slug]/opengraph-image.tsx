// app/blog/[slug]/opengraph-image.tsx
// Next.js автоматически использует этот файл для генерации OG-изображений
// Доступно по адресу: /blog/[slug]/opengraph-image

import { ImageResponse } from "next/og"
import { getArticleBySlug } from "@/lib/blog-articles"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const CATEGORY_COLORS: Record<string, string[]> = {
  Vertragsrecht:    ["#0d9488", "#0f766e"],
  Verbraucherrecht: ["#3b82f6", "#2563eb"],
  Praxistipps:      ["#f59e0b", "#f97316"],
  Mietrecht:        ["#10b981", "#059669"],
  Versicherungsrecht:["#6366f1", "#4f46e5"],
  Energierecht:     ["#ef4444", "#dc2626"],
  Finanzen:         ["#8b5cf6", "#7c3aed"],
}

export default async function Image({
  params,
}: {
  params: { slug: string }
}) {
  const article = getArticleBySlug(params.slug)

  const title = article?.title ?? "KündigungsHeld Blog"
  const category = article?.category ?? "Ratgeber"
  const excerpt = article?.excerpt ?? ""
  const colors = CATEGORY_COLORS[category] ?? ["#1d4ed8", "#1e40af"]

  // Обрезаем excerpt если слишком длинный
  const shortExcerpt = excerpt.length > 120 ? excerpt.slice(0, 117) + "…" : excerpt

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "#0f172a",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
          }}
        />

        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors[0]}22, transparent 70%)`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 72px",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Top: logo + category */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                📄
              </div>
              <span style={{ color: "#ffffff", fontSize: 22, fontWeight: 700 }}>
                KündigungsHeld
              </span>
            </div>

            {/* Category pill */}
            <div
              style={{
                background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
                borderRadius: 999,
                padding: "8px 20px",
                fontSize: 15,
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              {category}
            </div>
          </div>

          {/* Middle: title + excerpt */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 960 }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            {shortExcerpt && (
              <div
                style={{
                  fontSize: 22,
                  color: "#94a3b8",
                  lineHeight: 1.5,
                }}
              >
                {shortExcerpt}
              </div>
            )}
          </div>

          {/* Bottom: author + domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `linear-gradient(to br, ${colors[0]}, ${colors[1]})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                ✍️
              </div>
              <span style={{ color: "#64748b", fontSize: 16 }}>
                KündigungsHeld Redaktion
              </span>
            </div>
            <span style={{ color: "#334155", fontSize: 16 }}>
              kuendigungsheld.de
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}