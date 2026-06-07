import { NextRequest, NextResponse } from "next/server"
import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer-core"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: NextRequest) {
  let browser = null
  try {
    const { html } = await req.json()
    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "Missing html" }, { status: 400 })
    }

    const isDev = process.env.NODE_ENV === "development"

    browser = await puppeteer.launch(
      isDev
        ? {
            executablePath:
              process.platform === "win32"
                ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
                : process.platform === "darwin"
                ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
                : "/usr/bin/google-chrome",
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          }
        : {
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: true,
          }
    )

    const page = await browser.newPage()

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
      { waitUntil: "networkidle0", timeout: 15000 }
    )

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=kuendigung.pdf",
      },
    })
  } catch (error) {
    console.error("PDF route error:", error)
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 })
  } finally {
    if (browser) await browser.close()
  }
}