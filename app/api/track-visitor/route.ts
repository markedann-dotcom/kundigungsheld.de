import { NextRequest, NextResponse } from "next/server"

// Простой endpoint для трекинга через sendBeacon
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { timestamp, path: visitPath } = body

    // Перенаправляем на основной API
    const baseUrl = request.nextUrl.origin
    const response = await fetch(`${baseUrl}/api/visitor-count`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp, path: visitPath })
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in POST /api/track-visitor:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
