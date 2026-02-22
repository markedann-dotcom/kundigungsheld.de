import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

const rateLimitMap = new Map<string, number>()

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown"

    // Rate limit: max 3 suggestions per IP per day
    const rateKey = `suggest_rl_${ip}`
    const lastRequest = rateLimitMap.get(rateKey) ?? 0
    const now = Date.now()

    if (now - lastRequest < 5 * 60 * 1000) {
      return NextResponse.json(
        { success: false, error: "Bitte warten Sie einige Minuten zwischen Vorschlägen." },
        { status: 429 }
      )
    }
    rateLimitMap.set(rateKey, now)

    const { companyName, category, website, comment } = await req.json()

    if (!companyName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Firmenname ist erforderlich." },
        { status: 400 }
      )
    }

    if (companyName.trim().length < 2 || companyName.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Firmenname muss zwischen 2 und 100 Zeichen lang sein." },
        { status: 400 }
      )
    }

    const suggestion = {
      id: `sugg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      companyName: companyName.trim(),
      category: category?.trim() || "Sonstiges",
      website: website?.trim() || "",
      comment: comment?.trim() || "",
      ip,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    // Save to Redis list
    await redis.lpush("company_suggestions", JSON.stringify(suggestion))

    // Also save as hash for easy lookup
    await redis.hset(`suggestion:${suggestion.id}`, suggestion)

    return NextResponse.json({ success: true, id: suggestion.id })
  } catch (error) {
    console.error("Suggest company error:", error)
    return NextResponse.json(
      { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    )
  }
}

// GET — список всех предложений (для тебя как админа)
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")
    const adminKey = process.env.ADMIN_SECRET_KEY

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const raw = await redis.lrange("company_suggestions", 0, 99)
    const suggestions = raw.map((item) =>
      typeof item === "string" ? JSON.parse(item) : item
    )

    return NextResponse.json({ success: true, suggestions, total: suggestions.length })
  } catch (error) {
    console.error("Get suggestions error:", error)
    return NextResponse.json({ error: "Fehler" }, { status: 500 })
  }
}