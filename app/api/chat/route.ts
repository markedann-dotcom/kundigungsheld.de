import { NextRequest, NextResponse } from "next/server"

// ВАЖНО: Это увеличит лимит времени работы функции на Vercel до 60 секунд, 
// чтобы сервер не обрывал ответ нейросети на полуслове.
export const maxDuration = 60;

// Максимальная длина сообщения от пользователя (защита от огромных запросов)
const MAX_MESSAGE_LENGTH = 500
const MAX_MESSAGES_PER_DAY = 20

// ВНИМАНИЕ: этот Map работает только в dev-режиме.
// На Vercel (serverless) каждый запрос может попасть в новый инстанс —
// счётчики сбрасываются. Для продакшена используй Upstash Redis.
// Инструкция: https://upstash.com + @upstash/ratelimit
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + dayMs })
    return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - 1 }
  }

  if (record.count >= MAX_MESSAGES_PER_DAY) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: MAX_MESSAGES_PER_DAY - record.count }
}

export async function POST(req: NextRequest) {
  try {
    // Получаем IP — на Vercel с Cloudflare используй cf-connecting-ip
    const ip =
      req.headers.get("cf-connecting-ip") ||           // Cloudflare (самый надёжный)
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    const { allowed, remaining } = getRateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "limit",
          message: `Sie haben Ihr tägliches Limit von ${MAX_MESSAGES_PER_DAY} Fragen erreicht. Bitte versuchen Sie es morgen wieder.`,
        },
        { 
          status: 429,
          headers: {
            "Retry-After": "86400", // подскажем клиенту подождать 24 часа
          }
        }
      )
    }

    // Парсим тело запроса
    let body: { message?: unknown }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: "Ungültige Anfrage" },
        { status: 400 }
      )
    }

    const { message } = body

    // Валидация сообщения
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Nachricht fehlt" },
        { status: 400 }
      )
    }

    // Защита от огромных запросов
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Nachricht zu lang (max ${MAX_MESSAGE_LENGTH} Zeichen)` },
        { status: 400 }
      )
    }

    // Проверяем что API ключ вообще задан
    if (!process.env.FAL_API_KEY) {
      console.error("FAL_API_KEY is not set")
      return NextResponse.json(
        { success: false, error: "Serverfehler" },
        { status: 500 }
      )
    }

    const response = await fetch("https://fal.run/fal-ai/any-llm", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-flash-1.5",
        prompt: message,
        max_tokens: 800,
        system_prompt: `Du bist ein hilfreicher Assistent auf KündigungsHeld.de — einer Webseite, die Menschen hilft, Verträge in Deutschland zu kündigen. 

Beantworte nur Fragen zu:
- Kündigungsfristen und -arten
- Vertragsrecht in Deutschland  
- Wie man Verträge kündigt
- Nutzung des KündigungsHeld-Generators

Halte Antworten kurz (max 3-4 Sätze). Beende deine Sätze immer vollständig und brich niemals mitten im Satz ab. Bei komplexen Rechtsfragen empfehle einen Anwalt.
Antworte immer auf Deutsch.`,
      }),
    })

    if (!response.ok) {
      console.error("FAL API error:", response.status)
      return NextResponse.json(
        { success: false, error: "KI-Dienst nicht verfügbar" },
        { status: 502 }
      )
    }

    const data = await response.json()
    const text = data.output || data.response || "Entschuldigung, ich konnte keine Antwort generieren."

    return NextResponse.json({
      success: true,
      message: text,
      remaining,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ success: false, error: "Fehler" }, { status: 500 })
  }
}