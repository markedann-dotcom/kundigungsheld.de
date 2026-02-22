import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const rateLimitMap = new Map<string, number>()

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown"

    // Rate limit: 1 запрос в 5 минут с одного IP
    const lastRequest = rateLimitMap.get(ip) ?? 0
    const now = Date.now()

    if (now - lastRequest < 5 * 60 * 1000) {
      return NextResponse.json(
        { success: false, error: "Bitte warten Sie einige Minuten zwischen Vorschlägen." },
        { status: 429 }
      )
    }
    rateLimitMap.set(ip, now)

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

    const date = new Date().toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    await resend.emails.send({
      from: "KündigungsHeld <onboarding@resend.dev>",
      to: "kundigungsheld@gmail.com",
      subject: `🏢 Neuer Anbieter-Vorschlag: ${companyName.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px;">
          <h2 style="color: #0f172a; margin: 0 0 20px 0;">Neuer Anbieter-Vorschlag</h2>
          
          <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Firmenname</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold;">${companyName.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Kategorie</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${category || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Website</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${website || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Kommentar</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${comment || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">IP</td>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; font-family: monospace;">${ip}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Datum</td>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 12px;">${date}</td>
              </tr>
            </table>
          </div>

          <p style="color: #94a3b8; font-size: 12px; margin-top: 16px; text-align: center;">
            KündigungsHeld.de — Automatische Benachrichtigung
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Suggest company error:", error)
    return NextResponse.json(
      { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    )
  }
}