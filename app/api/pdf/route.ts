import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json()
    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "Missing html" }, { status: 400 })
    }

    const isDev = process.env.NODE_ENV === "development"
    let browser: import("puppeteer-core").Browser

    if (isDev) {
      const puppeteer = await import("puppeteer-core")
      const executablePath =
        process.platform === "win32"
          ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
          : process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
          : "/usr/bin/google-chrome"

      browser = await puppeteer.default.launch({
        executablePath,
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      })
    } else {
      // Production: Vercel
      const chromium = await import("@sparticuz/chromium")
      const puppeteer = await import("puppeteer-core")

      const executablePath = await chromium.default.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
      )

      browser = await puppeteer.default.launch({
        args: chromium.default.args,
        executablePath,
        headless: true,
      })
    }

    const page = await browser.newPage()
    await page.setViewport({ width: 794, height: 1123 })

    await page.setContent(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: white; }
          </style>
        </head>
        <body>${html}</body>
      </html>`,
      { waitUntil: "load", timeout: 15000 }
    )

    // Wait for external images (QR code)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    await browser.close()

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=kuendigung.pdf",
      },
    })
  } catch (error) {
    console.error("PDF route error:", error)
    return NextResponse.json(
      { error: "PDF generation failed", details: String(error) },
      { status: 500 }
    )
  }
}