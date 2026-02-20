import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const VISITORS_FILE = path.join(process.cwd(), "data", "visitors.json")

// Создаем директорию data если её нет
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Получаем текущий счетчик
function getCount(): number {
  ensureDataDir()
  try {
    if (fs.existsSync(VISITORS_FILE)) {
      const data = JSON.parse(fs.readFileSync(VISITORS_FILE, "utf-8"))
      return data.count || 98547
    }
  } catch (e) {
    console.error("Error reading visitors file:", e)
  }
  return 98547 // Стартовое значение
}

// Сохраняем счетчик
function saveCount(count: number) {
  ensureDataDir()
  try {
    const data = {
      count,
      lastUpdated: new Date().toISOString(),
    }
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(data, null, 2), "utf-8")
  } catch (e) {
    console.error("Error saving visitors file:", e)
  }
}

// GET - получить счетчик
export async function GET() {
  try {
    const count = getCount()
    return NextResponse.json({ count, success: true })
  } catch (error) {
    console.error("Error in GET /api/visitor-count:", error)
    return NextResponse.json({ count: 98547, success: false }, { status: 500 })
  }
}

// POST - инкрементировать счетчик
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { timestamp, path: visitPath } = body

    // Простая валидация
    if (!timestamp || !visitPath) {
      return NextResponse.json({ success: false, error: "Missing data" }, { status: 400 })
    }

    // Получаем IP для защиты от спама (опционально)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    
    // Инкрементируем счетчик
    const currentCount = getCount()
    const newCount = currentCount + 1
    saveCount(newCount)

    // Логируем визит (опционально - для аналитики)
    console.log(`[Visitor] ${new Date(timestamp).toISOString()} - ${visitPath} - IP: ${ip.split(',')[0]} - Count: ${newCount}`)

    return NextResponse.json({ 
      success: true, 
      count: newCount 
    })
  } catch (error) {
    console.error("Error in POST /api/visitor-count:", error)
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 })
  }
}
