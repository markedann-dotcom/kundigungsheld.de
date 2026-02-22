"use client"

import html2canvas from "html2canvas"
import jsPDF from "jspdf"

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

/**
 * Escape HTML entities so that raw letter text is safe inside innerHTML.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * Convert plain-text letter (with \n line breaks) into HTML paragraphs.
 *
 * Rules:
 *  - Empty lines become paragraph separators (margin between blocks).
 *  - Non-empty lines within the same block are joined with <br>.
 *
 * This replaces `white-space: pre-wrap` which causes every line to be rendered
 * at full line-height — even short lines still consume a full row, making it
 * impossible to keep the letter on one page without extreme font-size reduction.
 *
 * With proper <p> blocks we can use compact paragraph spacing instead.
 */
function letterTextToHtml(text: string): string {
  const lines = text.split("\n")
  const blocks: string[][] = []
  let current: string[] = []

  for (const line of lines) {
    if (line.trim() === "") {
      if (current.length > 0) {
        blocks.push(current)
        current = []
      }
    } else {
      current.push(escapeHtml(line))
    }
  }
  if (current.length > 0) blocks.push(current)

  return blocks
    .map((block) => `<p>${block.join("<br>")}</p>`)
    .join("")
}

/* ── PDF Template ── */

function getPerfectPDFTemplate(letterText: string, companyName: string): string {
  const docId = `KH-${Date.now().toString(36).toUpperCase().substring(0, 6)}-${Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0")}`
  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const bodyHtml = letterTextToHtml(letterText)

  return `
    <div style="
      width: 210mm;
      min-height: 297mm;
      padding: 18mm 22mm 18mm 22mm;
      font-family: Arial, Helvetica, sans-serif;
      color: #000000;
      background: #ffffff;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: relative;
    ">

      <!-- Header -->
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 16px;
        border-bottom: 2px solid #0f172a;
        margin-bottom: 28px;
      ">
        <div>
          <h1 style="
            margin: 0 0 3px 0;
            font-size: 26px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
          ">KündigungsHeld</h1>
          <div style="
            font-size: 9px;
            font-weight: 700;
            color: #64748b;
            letter-spacing: 1.5px;
            text-transform: uppercase;
          ">Rechtssicheres Dokument</div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 8px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Dokument-ID</div>
          <div style="
            font-size: 12px;
            font-family: 'Courier New', Courier, monospace;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 10px;
          ">${docId}</div>
          <div style="font-size: 8px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Erstellt am</div>
          <div style="font-size: 12px; font-weight: bold; color: #0f172a;">${today}</div>
        </div>
      </div>

      <!-- Letter Body -->
      <div style="
        flex-grow: 1;
        font-size: 10.5pt;
        line-height: 1.45;
        color: #1e293b;
        margin-bottom: 24px;
        word-wrap: break-word;
        overflow-wrap: break-word;
      ">
        <!--
          p  = Absatz  → margin-bottom schafft Luft zwischen Abschnitten
          br = Zeilenumbruch innerhalb eines Absatzes (Adressblock, Betreff etc.)
        -->
        <style>
          .letter-body p {
            margin: 0 0 8px 0;
            padding: 0;
          }
          .letter-body p:last-child {
            margin-bottom: 0;
          }
        </style>
        <div class="letter-body">${bodyHtml}</div>
      </div>

      <!-- Footer -->
      <div style="
        margin-top: auto;
        padding-top: 14px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div style="display: flex; align-items: center; gap: 7px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div style="font-size: 8.5px; color: #64748b; font-weight: 500;">
            Erstellt mit KündigungsHeld.de — Gültig auch ohne Unterschrift (abhängig vom Anbieter)
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="text-align: right;">
            <div style="font-size: 7px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Dokument prüfen</div>
            <div style="font-size: 8.5px; color: #0f172a; font-weight: 600;">kuendigungsheld.de</div>
          </div>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://kuendigungsheld.de"
            crossorigin="anonymous"
            style="width: 32px; height: 32px; border-radius: 3px; border: 1px solid #e2e8f0; padding: 2px; background: white;"
            alt="QR Code"
          />
        </div>
      </div>

    </div>
  `
}

/* ── PDF Generation (скачивает файл) ── */

export async function generatePdf(
  letterText: string,
  companyName: string,
  fileName: string = "Kuendigung.pdf"
): Promise<void> {
  showLoading()
  try {
    const blob = await generatePdfBlob(letterText, companyName)
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
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
  const container = document.createElement("div")
  container.style.cssText = `
    position: fixed;
    left: -99999px;
    top: 0;
    width: 210mm;
    background: white;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  `
  container.innerHTML = getPerfectPDFTemplate(letterText, companyName)
  document.body.appendChild(container)

  // Wait for QR image + layout
  await new Promise((resolve) => setTimeout(resolve, 800))

  const canvas = await html2canvas(container, {
    scale: 3,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    width: container.offsetWidth,
    height: container.offsetHeight,
    windowWidth: container.offsetWidth,
  })

  const imgData = canvas.toDataURL("image/jpeg", 1.0)
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  })

  const pdfWidth = 210
  const pageHeight = 297
  const imgHeight = (canvas.height * pdfWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST")
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST")
    heightLeft -= pageHeight
  }

  document.body.removeChild(container)
  return pdf.output("blob")
}

/* ── Print ── */

export function printKundigung(letterText: string, companyName: string): void {
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert("Popup wurde blockiert. Bitte erlauben Sie Popups für diese Seite.")
    return
  }

  const content = getPerfectPDFTemplate(letterText, companyName)

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Kündigung - ${companyName}</title>
      <style>
        @page { size: A4; margin: 0; }
        body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white; }
        * { box-sizing: border-box; }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() { setTimeout(function() { window.print(); }, 250); };
        window.onafterprint = function() { window.close(); };
      </script>
    </body>
    </html>
  `)
  printWindow.document.close()
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