// src/lib/generate-pdf.ts (или где у тебя этот файл)

import html2canvas from "html2canvas"
import jsPDF from "jspdf"

/* ── UI Helpers: Экран загрузки ── */

function showLoading() {
  if (document.getElementById("pdf-loading-overlay")) return

  const overlay = document.createElement("div")
  overlay.id = "pdf-loading-overlay"
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(4px);
    z-index: 99999; display: flex; flex-direction: column;
    align-items: center; justify-content: center; font-family: sans-serif;
    opacity: 0; transition: opacity 0.3s ease;
  `

  const spinner = document.createElement("div")
  spinner.style.cssText = `
    width: 50px; height: 50px; border: 4px solid #e2e8f0;
    border-top: 4px solid #1a9a82; border-radius: 50%;
    animation: spin 1s linear infinite; margin-bottom: 20px;
  `

  const text = document.createElement("div")
  text.innerText = "Moment bitte, Dokument wird erstellt..."
  text.style.cssText = "color: #0f172a; font-weight: 600; font-size: 16px;"

  const style = document.createElement("style")
  style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`
  document.head.appendChild(style)

  overlay.appendChild(spinner)
  overlay.appendChild(text)
  document.body.appendChild(overlay)

  requestAnimationFrame(() => {
    overlay.style.opacity = "1"
  })
}

function hideLoading() {
  const overlay = document.getElementById("pdf-loading-overlay")
  if (overlay) {
    overlay.style.opacity = "0"
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay)
    }, 300)
  }
}

/* ── HTML Builder — НОВЫЙ ДИЗАЙН ИЗ FIGMA ── */
function buildLetterHtml(
  text: string,
  companyName: string,
  title: string
): string {
  const lines = text.split("\n")

  let senderBlock = ""
  let recipientBlock = ""
  let dateLine = ""
  let betreffLine = ""
  const bodyLines: string[] = []
  const closingLines: string[] = []

  let section:
    | "sender"
    | "gap1"
    | "recipient"
    | "gap2"
    | "date"
    | "betreff"
    | "body"
    | "closing" = "sender"

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (section === "sender") {
      if (line.trim() === "") section = "gap1"
      else senderBlock += (senderBlock ? "\n" : "") + line
    } else if (section === "gap1") {
      if (line.trim() !== "") {
        section = "recipient"
        recipientBlock += line
      }
    } else if (section === "recipient") {
      if (line.trim() === "") section = "gap2"
      else recipientBlock += "\n" + line
    } else if (section === "gap2") {
      if (line.trim() !== "") {
        if (line.includes(", den ")) {
          dateLine = line
          section = "date"
        } else {
          section = "body"
          bodyLines.push(line)
        }
      }
    } else if (section === "date") {
      if (line.trim() === "") continue
      else if (line.startsWith("Betreff:")) {
        betreffLine = line.replace("Betreff: ", "")
        section = "betreff"
      } else {
        section = "body"
        bodyLines.push(line)
      }
    } else if (section === "betreff") {
      if (line.trim() === "") section = "body"
    } else if (section === "body") {
      if (
        line.startsWith("Mit freundlichen Grüßen") ||
        line.startsWith("Mit freundlichen Gruessen") ||
        line.startsWith("Mit freundlichen Grussen") ||
        line.startsWith("Hochachtungsvoll") ||
        line.startsWith("Mit besten Grüßen")
      ) {
        closingLines.push(line)
        section = "closing"
      } else {
        bodyLines.push(line)
      }
    } else if (section === "closing") {
      closingLines.push(line)
    }
  }

  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

  const bodyHtml = bodyLines
    .join("\n")
    .split(/\n\n+/)
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br/>")}</p>`)
    .join("")

  const closingHtml = closingLines
    .map((l) => (l.trim() ? `<p>${esc(l)}</p>` : ""))
    .join("")

  // Извлекаем имя отправителя (первая строка sender block)
  const senderName = senderBlock.split("\n")[0] || ""

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>${esc(title)}</title>
<style>
  @page {
    size: A4;
    margin: 0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #1e293b;
    background: #fff;
    width: 210mm;
    min-height: 297mm;
  }

  .page {
    position: relative;
    width: 210mm;
    min-height: 297mm;
    padding: 25mm;
  }

  /* ── HEADER ── */
  .header {
    text-align: center;
    margin-bottom: 0;
  }

  .brand {
    font-weight: bold;
    font-size: 14pt;
    color: #000;
    letter-spacing: 0.3px;
  }

  .tagline {
    font-size: 8pt;
    color: #666;
    margin-top: 2mm;
    line-height: 1.5;
  }

  .divider {
    margin: 5mm 0;
    border: none;
    border-top: 1px solid #000;
  }

  /* ── SENDER + DATE ROW ── */
  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8mm;
  }

  .sender-info {
    font-size: 10pt;
    line-height: 1.7;
    color: #1e293b;
  }

  .sender-info strong {
    font-weight: 700;
  }

  .date-info {
    font-size: 10pt;
    color: #1e293b;
    text-align: right;
    white-space: nowrap;
  }

  /* ── RECIPIENT ── */
  .recipient-info {
    font-size: 10pt;
    line-height: 1.7;
    color: #1e293b;
    margin-bottom: 8mm;
  }

  .recipient-info strong {
    font-weight: 700;
  }

  /* ── SUBJECT ── */
  .subject-line {
    font-size: 11.5pt;
    font-weight: 700;
    color: #000;
    margin: 8mm 0 6mm 0;
  }

  /* ── BODY ── */
  .body-text {
    font-size: 10.5pt;
    line-height: 1.75;
    color: #1e293b;
  }

  .body-text p {
    margin-bottom: 3mm;
  }

  /* ── CLOSING / SIGNATURE ── */
  .closing {
    margin-top: 6mm;
    font-size: 10.5pt;
    line-height: 1.75;
    color: #1e293b;
  }

  .closing p {
    margin-bottom: 1mm;
  }

  .signature-area {
    margin-top: 15mm;
    width: 50mm;
  }

  .signature-line {
    border-top: 1px solid #000;
    padding-top: 2mm;
    font-size: 9pt;
    color: #333;
  }

  /* ── FOOTER ── */
  .footer {
    position: absolute;
    bottom: 8mm;
    left: 25mm;
    right: 25mm;
    text-align: center;
    font-size: 7.5pt;
    color: #999;
    border-top: 0.5pt solid #ddd;
    padding-top: 3mm;
  }

  .footer span {
    margin: 0 2mm;
  }

  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      margin: 0;
      page-break-after: always;
    }
  }
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="brand">kündigungsheld.de</div>
    <div class="tagline">
      Erstellen Sie in wenigen Minuten rechtssichere Kündigungsschreiben.<br>
      Kein Anwalt nötig, keine Kosten, sofortiger Download.
    </div>
  </div>

  <hr class="divider" />

  <!-- SENDER + DATE -->
  <div class="meta-row">
    <div class="sender-info">
      <strong>${esc(senderBlock.split("\n")[0])}</strong><br>
      ${esc(senderBlock.split("\n").slice(1).join("\n")).replace(/\n/g, "<br>")}
    </div>
    ${dateLine ? `<div class="date-info">${esc(dateLine)}</div>` : ""}
  </div>

  <!-- RECIPIENT -->
  <div class="recipient-info">
    <strong>${esc(recipientBlock.split("\n")[0])}</strong><br>
    ${esc(recipientBlock.split("\n").slice(1).join("\n")).replace(/\n/g, "<br>")}
  </div>

  <!-- SUBJECT -->
  ${betreffLine ? `<div class="subject-line">${esc(betreffLine)}</div>` : ""}

  <!-- BODY -->
  <div class="body-text">
    ${bodyHtml}
  </div>

  <!-- CLOSING -->
  <div class="closing">
    ${closingHtml}
  </div>

  <!-- SIGNATURE -->
  <div class="signature-area">
    <div class="signature-line">${esc(senderName)}</div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <span>Erstellt mit kündigungsheld.de</span>
    <span>•</span>
    <span>ID: KH-${Date.now().toString(36).toUpperCase()}</span>
    <span>•</span>
    <span>${new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}</span>
  </div>

</div>
</body>
</html>`
}

/* ── Helpers ── */

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false
  const mobileUA =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  const touchDevice =
    navigator.maxTouchPoints > 0 &&
    /iPad|Macintosh/.test(navigator.userAgent)
  return mobileUA || touchDevice
}

async function generateRealPdf(
  html: string,
  filename: string
): Promise<void> {
  showLoading()

  try {
    const styleMatch = html.match(/<style[\s\S]*?<\/style>/i)

    const container = document.createElement("div")
    container.style.cssText =
      "position:fixed;left:-9999px;top:0;width:794px;min-height:1123px;background:#fff;z-index:-1"

    const cleanHtml = html
      .replace(/<!DOCTYPE[^>]*>/i, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "")

    container.innerHTML = cleanHtml

    if (styleMatch) {
      const styleEl = document.createElement("style")
      styleEl.textContent = styleMatch[0].replace(/<\/?style[^>]*>/gi, "")
      container.prepend(styleEl)
    }

    document.body.appendChild(container)

    await new Promise((r) => setTimeout(r, 100))

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: 794,
      height: 1123,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/jpeg", 0.95)

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })
    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297)
    pdf.save(`${filename}.pdf`)

    document.body.removeChild(container)
  } catch (err) {
    console.error("PDF generation error:", err)
    alert("Fehler beim Erstellen des PDF. Bitte versuchen Sie es erneut.")
  } finally {
    hideLoading()
  }
}

function printViaIframe(html: string): void {
  showLoading()

  const iframe = document.createElement("iframe")
  iframe.style.cssText =
    "position:fixed;left:-9999px;top:-9999px;width:210mm;height:297mm;border:none"
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument || iframe.contentWindow?.document
  if (!doc) {
    hideLoading()
    alert("Drucken fehlgeschlagen. Bitte verwenden Sie PDF-Export.")
    return
  }

  doc.open()
  doc.write(html)
  doc.close()

  requestAnimationFrame(() => {
    setTimeout(() => {
      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()

      hideLoading()

      setTimeout(() => {
        if (iframe.parentNode) document.body.removeChild(iframe)
      }, 2000)
    }, 500)
  })
}

/* ── Exported Functions ── */

export function generatePdf(text: string, companyName: string): void {
  const dateStr = new Date().toISOString().slice(0, 10)
  const safeName = companyName.replace(/[^a-zA-Z0-9]/g, "_")
  const filename = `Kuendigung_${safeName}_${dateStr}`
  const html = buildLetterHtml(text, companyName, filename)

  generateRealPdf(html, filename)
}

export function printKundigung(text: string): void {
  if (isMobile()) {
    const html = buildLetterHtml(text, "", "Kündigung")
    generateRealPdf(html, "Kuendigungsschreiben_Druck")
  } else {
    const html = buildLetterHtml(text, "", "Drucken")
    printViaIframe(html)
  }
}

export function openMailto(
  text: string,
  companyName: string,
  companyEmail?: string
): void {
  const MAX_URL_LENGTH = 2000

  const subject = encodeURIComponent(`Kündigung - ${companyName}`)
  const body = encodeURIComponent(text)
  const to = companyEmail ? encodeURIComponent(companyEmail) : ""

  const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`

  if (mailtoUrl.length > MAX_URL_LENGTH) {
    alert(
      "Der Kündigungstext ist zu lang für eine E-Mail.\n\n" +
        "Bitte verwenden Sie stattdessen:\n" +
        "• PDF-Export und versenden Sie das PDF als Anhang\n" +
        "• Oder kopieren Sie den Text manuell in Ihr E-Mail-Programm"
    )
    return
  }

  try {
    window.location.href = mailtoUrl
  } catch (err) {
    console.error("Mailto error:", err)
    alert(
      "E-Mail-Programm konnte nicht geöffnet werden. Bitte kopieren Sie den Text manuell."
    )
  }
}

export function addCalendarReminder(
  companyName: string,
  deadlineDate: string,
  description: string
): void {
  const date = new Date(deadlineDate)

  if (isNaN(date.getTime())) {
    console.error("Invalid deadline date:", deadlineDate)
    alert("Ungültiges Datum für die Kalendererinnerung.")
    return
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (date < today) {
    alert(
      "Das Kündigungsdatum liegt in der Vergangenheit. Bitte überprüfen Sie das Datum."
    )
    return
  }

  date.setDate(date.getDate() - 7)

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const endDate = new Date(date)
  endDate.setHours(endDate.getHours() + 1)

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//KuendigungsHeld//DE",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(date)}`,
    `DTEND:${fmt(endDate)}`,
    `SUMMARY:Kündigungsfrist ${companyName} - Erinnerung`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:Kündigungsfrist läuft bald ab!`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  try {
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Erinnerung_${companyName.replace(/[^a-zA-Z0-9]/g, "_")}.ics`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error("Calendar export error:", err)
    alert("Fehler beim Erstellen der Kalendererinnerung.")
  }
}