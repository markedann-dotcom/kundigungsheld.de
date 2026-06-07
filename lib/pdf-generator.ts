"use client"

/* ── Loading Screen ── */

export function showLoading() {
  if (typeof document === "undefined" || document.getElementById("pdf-loading-overlay")) return

  const overlay = document.createElement("div")
  overlay.id = "pdf-loading-overlay"
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    z-index: 99999; display: flex; flex-direction: column;
    align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif;
    opacity: 0; transition: opacity 0.3s ease;
  `

  const spinner = document.createElement("div")
  spinner.style.cssText = `
    width: 48px; height: 48px; border: 3px solid #f1f5f9;
    border-top: 3px solid #0f172a; border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    margin-bottom: 20px;
  `

  const text = document.createElement("div")
  text.id = "pdf-loading-text"
  text.innerText = "Erstelle PDF..."
  text.style.cssText = `
    color: #0f172a; font-weight: 600; font-size: 15px;
    letter-spacing: -0.01em;
  `

  const style = document.createElement("style")
  style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`
  document.head.appendChild(style)

  overlay.appendChild(spinner)
  overlay.appendChild(text)
  document.body.appendChild(overlay)

  if (document.documentElement.classList.contains("dark")) {
    overlay.style.background = "rgba(15, 23, 42, 0.98)"
    spinner.style.borderColor = "#1e293b"
    spinner.style.borderTopColor = "#f8fafc"
    text.style.color = "#f8fafc"
  }

  requestAnimationFrame(() => {
    overlay.style.opacity = "1"
  })
}

export function updateLoadingText(text: string) {
  if (typeof document === "undefined") return
  const el = document.getElementById("pdf-loading-text")
  if (el) el.innerText = text
}

export function hideLoading() {
  if (typeof document === "undefined") return
  const overlay = document.getElementById("pdf-loading-overlay")
  if (overlay) {
    overlay.style.opacity = "0"
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay)
    }, 300)
  }
}

/* ── Helpers ── */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function letterTextToHtml(text: string): string {
  const lines = text.split("\n")
  const blocks: string[][] = []
  let current: string[] = []

  for (const line of lines) {
    if (line.trim() === "") {
      if (current.length > 0) { blocks.push(current); current = [] }
    } else {
      current.push(escapeHtml(line))
    }
  }
  if (current.length > 0) blocks.push(current)

  return blocks.map((b) => `<p>${b.join("<br>")}</p>`).join("")
}

function buildFileName(companyName: string): string {
  const safe = companyName.replace(/[^a-zA-Z0-9äöüÄÖÜß\-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "")
  const date = new Date().toISOString().slice(0, 10)
  return `Kuendigung_${safe}_${date}.pdf`
}

/* ── PDF Template ── */

function getPerfectPDFTemplate(letterText: string, companyName: string): string {
  const docId = `KH-${Date.now().toString(36).toUpperCase().slice(0, 4)}${Math.floor(Math.random() * 9000 + 1000)}`
  const today = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })
  const bodyHtml = letterTextToHtml(letterText)

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 210mm;
    background: #fff;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color: #0f172a;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  /* Accent bar top */
  .accent-bar {
    height: 5px;
    background: linear-gradient(90deg, #0f172a 0%, #334155 50%, #0ea5e9 100%);
    width: 100%;
    flex-shrink: 0;
  }

  .inner {
    padding: 14mm 22mm 10mm 22mm;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10mm;
  }

  .logo-block {}
  .logo-wordmark {
    font-size: 22px;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -0.8px;
    line-height: 1;
    margin-bottom: 3px;
  }
  .logo-wordmark span {
    color: #0ea5e9;
  }
  .logo-tagline {
    font-size: 7.5px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .meta-block {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .meta-row {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1px;
  }
  .meta-label {
    font-size: 6.5px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 1.8px;
    text-transform: uppercase;
  }
  .meta-value {
    font-size: 11px;
    font-weight: 700;
    color: #0f172a;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.3px;
  }
  .meta-value.mono {
    font-family: 'Courier New', monospace;
    font-size: 10px;
    color: #0ea5e9;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 40%, #e2e8f0 100%);
    margin-bottom: 9mm;
  }

  /* Betreff badge */
  .subject-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 5px 11px;
    margin-bottom: 7mm;
    width: fit-content;
  }
  .subject-badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0ea5e9;
    flex-shrink: 0;
  }
  .subject-badge-text {
    font-size: 9px;
    font-weight: 700;
    color: #475569;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  /* Letter body */
  .letter-body {
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1e293b;
    flex: 1;
  }
  .letter-body p {
    margin: 0 0 9px 0;
  }
  .letter-body p:last-child {
    margin-bottom: 0;
  }

  /* Signature area */
  .signature-area {
    margin-top: 10mm;
    padding-top: 8mm;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .sig-left {}
  .sig-line {
    width: 52mm;
    height: 1px;
    background: #cbd5e1;
    margin-bottom: 4px;
  }
  .sig-label {
    font-size: 8px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .sig-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  }
  .sig-stamp {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 5px;
    padding: 4px 8px;
  }
  .sig-stamp-icon {
    color: #16a34a;
    font-size: 10px;
  }
  .sig-stamp-text {
    font-size: 7.5px;
    font-weight: 700;
    color: #15803d;
    letter-spacing: 0.3px;
  }

  /* Footer */
  .footer {
    margin-top: auto;
    padding: 5mm 22mm 6mm 22mm;
    border-top: 1px solid #f1f5f9;
    background: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .footer-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .footer-text {
    font-size: 7.5px;
    color: #94a3b8;
    font-weight: 500;
    line-height: 1.4;
    max-width: 90mm;
  }
  .footer-text strong {
    color: #64748b;
    font-weight: 600;
  }

  .footer-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .footer-qr-label {
    text-align: right;
  }
  .footer-qr-label div:first-child {
    font-size: 6.5px;
    color: #cbd5e1;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1px;
  }
  .footer-qr-label div:last-child {
    font-size: 8px;
    font-weight: 700;
    color: #64748b;
  }
  .qr-img {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
    padding: 2px;
    background: white;
  }
</style>
</head>
<body>
<div class="page">

  <div class="accent-bar"></div>

  <div class="inner">

    <!-- Header -->
    <div class="header">
      <div class="logo-block">
        <div class="logo-wordmark">Kündigungs<span>Held</span></div>
        <div class="logo-tagline">Rechtssicheres Dokument</div>
      </div>
      <div class="meta-block">
        <div class="meta-row">
          <div class="meta-label">Dokument-ID</div>
          <div class="meta-value mono">${docId}</div>
        </div>
        <div class="meta-row">
          <div class="meta-label">Erstellt am</div>
          <div class="meta-value">${today}</div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Letter body -->
    <div class="letter-body">${bodyHtml}</div>

    <!-- Signature -->
    <div class="signature-area">
      <div class="sig-left">
        <div class="sig-line"></div>
        <div class="sig-label">Unterschrift (optional)</div>
      </div>
      <div class="sig-right">
        <div class="sig-stamp">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div class="sig-stamp-text">Rechtlich gültig</div>
        </div>
      </div>
    </div>

  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
      <div class="footer-text">
        Erstellt mit <strong>KündigungsHeld.de</strong> · Dieses Dokument ist ohne Unterschrift gültig (abhängig vom Anbieter) · Dokument-ID: ${docId}
      </div>
    </div>
    <div class="footer-right">
      <div class="footer-qr-label">
        <div>Dokument prüfen</div>
        <div>kuendigungsheld.de</div>
      </div>
      <img
        class="qr-img"
        src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://kuendigungsheld.de"
        crossorigin="anonymous"
        alt="QR"
      />
    </div>
  </div>

</div>
</body>
</html>`
}

/* ── PDF Generation (скачивает файл) ── */

export async function generatePdf(
  letterText: string,
  companyName: string,
  fileName?: string
): Promise<void> {
  showLoading()
  try {
    const blob = await generatePdfBlob(letterText, companyName)
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    // Всегда генерируем правильное имя файла
    a.download = fileName && fileName !== "Kuendigung.pdf" ? fileName : buildFileName(companyName)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("PDF generation error:", error)
    alert("Fehler beim Erstellen des PDFs. Bitte versuchen Sie es erneut.")
  } finally {
    hideLoading()
  }
}

/* ── PDF Blob (возвращает Blob для ZIP) ── */

export async function generatePdfBlob(
  letterText: string,
  companyName: string
): Promise<Blob> {
  const html = getPerfectPDFTemplate(letterText, companyName)

  const response = await fetch("/api/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  })

  if (!response.ok) {
    throw new Error(`PDF API error: ${response.status}`)
  }

  return response.blob()
}

/* ── Print ── */

export function printKundigung(letterText: string, companyName: string): void {
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert("Popup wurde blockiert. Bitte erlauben Sie Popups für diese Seite.")
    return
  }

  printWindow.document.write(getPerfectPDFTemplate(letterText, companyName))
  printWindow.document.close()

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 300)
  }
  printWindow.onafterprint = () => printWindow.close()
}

/* ── Email ── */

export function openMailto(
  letterText: string,
  companyName: string,
  companyEmail?: string
): void {
  const subject = encodeURIComponent(`Kündigung - ${companyName}`)
  const body = encodeURIComponent(letterText)
  const mailtoLink = companyEmail
    ? `mailto:${companyEmail}?subject=${subject}&body=${body}`
    : `mailto:?subject=${subject}&body=${body}`
  window.location.href = mailtoLink
}

/* ── Calendar Reminder ── */

export function addCalendarReminder(
  companyName: string,
  terminationDate: string | undefined | null
): void {
  let date = new Date(terminationDate || "")

  if (isNaN(date.getTime())) {
    let parts = null
    if (typeof terminationDate === "string") {
      parts = terminationDate.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
    }
    if (parts) {
      date = new Date(Number(parts[3]), Number(parts[2]) - 1, Number(parts[1]))
    } else {
      date = new Date()
      date.setDate(date.getDate() + 14)
    }
  }

  if (isNaN(date.getTime())) {
    date = new Date()
    date.setDate(date.getDate() + 14)
  }

  const fmt = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`

  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)

  const title = encodeURIComponent(`Kündigung bestätigt: ${companyName}`)
  const details = encodeURIComponent(`Bestätigung der Kündigung bei ${companyName} einholen`)
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${fmt(date)}/${fmt(nextDay)}`

  window.open(url, "_blank")
}