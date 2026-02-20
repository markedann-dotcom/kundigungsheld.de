import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { TemplateData } from "./templates"

/* ── Minimal Loading Screen ── */

function showLoading() {
  if (document.getElementById("pdf-loading-overlay")) return

  const overlay = document.createElement("div")
  overlay.id = "pdf-loading-overlay"
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    z-index: 99999; display: flex; flex-direction: column;
    align-items: center; justify-content: center; font-family: 'Inter', sans-serif;
    opacity: 0; transition: opacity 0.3s ease;
  `

  const spinner = document.createElement("div")
  spinner.style.cssText = `
    width: 48px; height: 48px; border: 2px solid #f1f5f9;
    border-top: 2px solid #171717; border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    margin-bottom: 20px;
  `

  const text = document.createElement("div")
  text.innerText = "Erstelle PDF..."
  text.style.cssText = `
    color: #171717; font-weight: 600; font-size: 15px;
    letter-spacing: -0.01em;
  `

  const style = document.createElement("style")
  style.innerHTML = `
    @keyframes spin { 
      0% { transform: rotate(0deg); } 
      100% { transform: rotate(360deg); } 
    }
  `
  document.head.appendChild(style)

  overlay.appendChild(spinner)
  overlay.appendChild(text)
  document.body.appendChild(overlay)

  // Dark mode support
  if (document.documentElement.classList.contains('dark')) {
    overlay.style.background = 'rgba(23, 23, 23, 0.98)'
    spinner.style.borderColor = '#27272a'
    spinner.style.borderTopColor = '#fafafa'
    text.style.color = '#fafafa'
  }

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

/* ── Premium PDF Templates ── */

// Вариант 1: Swiss Precision - ультра-минималистичный
function getSwissPrecisionTemplate(letterText: string, companyName: string): string {
  const docId = `KH${Date.now().toString(36).toUpperCase().substring(0, 8)}`
  const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  
  return `
    <div style="
      min-height: 297mm; 
      display: flex; 
      flex-direction: column;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #171717;
      position: relative;
    ">
      
      <!-- Vertical Line - Swiss Design Element -->
      <div style="
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: #171717;
      "></div>

      <!-- Header - Ultra Minimal -->
      <div style="
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 32px;
        margin-bottom: 56px;
        padding-bottom: 24px;
        border-bottom: 1px solid #E5E5E5;
      ">
        <div>
          <div style="
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #737373;
            margin-bottom: 12px;
          ">Kündigungsschreiben</div>
          <div style="
            font-size: 32px;
            font-weight: 900;
            letter-spacing: -0.04em;
            line-height: 1;
            margin-bottom: 8px;
          ">KündigungsHeld</div>
          <div style="
            font-size: 11px;
            color: #737373;
            font-weight: 500;
          ">Rechtssicher · Professionell · Einfach</div>
        </div>
        
        <!-- Document Info Grid -->
        <div style="
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: right;
        ">
          <div>
            <div style="font-size: 9px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Dokument-ID</div>
            <div style="font-size: 12px; font-weight: 700; font-family: 'Courier New', monospace;">${docId}</div>
          </div>
          <div>
            <div style="font-size: 9px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Datum</div>
            <div style="font-size: 12px; font-weight: 600;">${today}</div>
          </div>
        </div>
      </div>

      <!-- Company Badge -->
      <div style="
        background: #FAFAFA;
        border: 1px solid #E5E5E5;
        border-radius: 4px;
        padding: 16px 20px;
        margin-bottom: 40px;
        display: inline-block;
        align-self: flex-start;
      ">
        <div style="font-size: 9px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">Empfänger</div>
        <div style="font-size: 15px; font-weight: 700; color: #171717;">${companyName}</div>
      </div>

      <!-- Letter Content -->
      <div style="
        flex: 1;
        font-size: 12px;
        line-height: 1.9;
        color: #262626;
        white-space: pre-wrap;
        font-weight: 400;
        letter-spacing: -0.01em;
      ">${letterText}</div>

      <!-- Footer -->
      <div style="
        margin-top: 56px;
        padding-top: 20px;
        border-top: 1px solid #E5E5E5;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 20px;
        align-items: center;
      ">
        <!-- Checkmark -->
        <div style="
          width: 36px;
          height: 36px;
          background: #171717;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        
        <!-- Info -->
        <div style="font-size: 9px; color: #737373; font-weight: 500;">
          Rechtlich geprüft · Erstellt mit KündigungsHeld.de
        </div>

        <!-- Page Number -->
        <div style="
          font-size: 9px;
          color: #A3A3A3;
          font-weight: 600;
          text-align: right;
        ">01/01</div>
      </div>

    </div>
  `
}

// Вариант 2: Modern Executive - современный с акцентами
function getModernExecutiveTemplate(letterText: string, companyName: string): string {
  const docId = `KH${Date.now().toString(36).toUpperCase().substring(0, 8)}`
  const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
  
  return `
    <div style="
      min-height: 297mm;
      display: flex;
      flex-direction: column;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #171717;
    ">

      <!-- Header with Accent -->
      <div style="
        background: linear-gradient(135deg, #171717 0%, #262626 100%);
        margin: -24mm -24mm 0 -24mm;
        padding: 32px 24mm 24px 24mm;
        position: relative;
        overflow: hidden;
      ">
        <!-- Decorative Element -->
        <div style="
          position: absolute;
          right: -40px;
          top: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
        "></div>
        
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="
                font-size: 28px;
                font-weight: 900;
                color: white;
                letter-spacing: -0.03em;
                margin-bottom: 6px;
              ">KündigungsHeld</div>
              <div style="
                font-size: 11px;
                color: rgba(255, 255, 255, 0.7);
                font-weight: 500;
                letter-spacing: 0.02em;
              ">PROFESSIONELLES KÜNDIGUNGSSCHREIBEN</div>
            </div>
            
            <!-- Shield Icon -->
            <div style="
              width: 52px;
              height: 52px;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 32px;
        margin-bottom: 40px;
      ">
        <div style="
          background: #FAFAFA;
          border: 1px solid #E5E5E5;
          border-radius: 8px;
          padding: 14px 16px;
        ">
          <div style="font-size: 9px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; font-weight: 600;">Empfänger</div>
          <div style="font-size: 13px; font-weight: 700; color: #171717; line-height: 1.3;">${companyName}</div>
        </div>
        
        <div style="
          background: #FAFAFA;
          border: 1px solid #E5E5E5;
          border-radius: 8px;
          padding: 14px 16px;
        ">
          <div style="font-size: 9px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; font-weight: 600;">Datum</div>
          <div style="font-size: 13px; font-weight: 700; color: #171717;">${today}</div>
        </div>
        
        <div style="
          background: #FAFAFA;
          border: 1px solid #E5E5E5;
          border-radius: 8px;
          padding: 14px 16px;
        ">
          <div style="font-size: 9px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; font-weight: 600;">Dokument-ID</div>
          <div style="font-size: 13px; font-weight: 700; color: #171717; font-family: 'Courier New', monospace;">${docId}</div>
        </div>
      </div>

      <!-- Letter Content -->
      <div style="
        flex: 1;
        font-size: 12px;
        line-height: 1.9;
        color: #262626;
        white-space: pre-wrap;
        font-weight: 400;
      ">${letterText}</div>

      <!-- Footer -->
      <div style="
        margin-top: 48px;
        padding: 20px;
        background: #FAFAFA;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="
            width: 40px;
            height: 40px;
            background: #171717;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <div style="font-size: 11px; font-weight: 700; color: #171717;">Rechtlich geprüft</div>
            <div style="font-size: 9px; color: #737373; margin-top: 2px;">Erstellt mit KündigungsHeld.de</div>
          </div>
        </div>
        
        <div style="text-align: right;">
          <div style="font-size: 9px; color: #A3A3A3; font-weight: 600;">© 2026 KündigungsHeld</div>
          <div style="font-size: 9px; color: #A3A3A3; margin-top: 2px;">Seite 1 von 1</div>
        </div>
      </div>

    </div>
  `
}

// Вариант 3: Legal Professional - классический юридический
function getLegalProfessionalTemplate(letterText: string, companyName: string): string {
  const docId = `KH-${Date.now().toString(36).toUpperCase().substring(0, 4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
  
  return `
    <div style="
      min-height: 297mm;
      display: flex;
      flex-direction: column;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #171717;
    ">

      <!-- Classic Header -->
      <div style="
        text-align: center;
        padding-bottom: 28px;
        border-bottom: 2px solid #171717;
        margin-bottom: 40px;
      ">
        <div style="
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        ">KündigungsHeld</div>
        <div style="
          font-size: 11px;
          color: #737373;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
        ">Rechtssicheres Kündigungsschreiben</div>
      </div>

      <!-- Document Header Table -->
      <table style="
        width: 100%;
        margin-bottom: 36px;
        border-collapse: collapse;
        border: 2px solid #171717;
      ">
        <tr>
          <td style="
            padding: 14px 18px;
            background: #171717;
            color: white;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-right: 1px solid white;
          ">Empfänger</td>
          <td style="
            padding: 14px 18px;
            background: #171717;
            color: white;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-right: 1px solid white;
          ">Erstellt am</td>
          <td style="
            padding: 14px 18px;
            background: #171717;
            color: white;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          ">Dokument-ID</td>
        </tr>
        <tr>
          <td style="
            padding: 14px 18px;
            font-size: 13px;
            font-weight: 600;
            border-right: 1px solid #E5E5E5;
          ">${companyName}</td>
          <td style="
            padding: 14px 18px;
            font-size: 13px;
            font-weight: 600;
            border-right: 1px solid #E5E5E5;
          ">${today}</td>
          <td style="
            padding: 14px 18px;
            font-size: 13px;
            font-weight: 600;
            font-family: 'Courier New', monospace;
          ">${docId}</td>
        </tr>
      </table>

      <!-- Status Badge -->
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: #F0FDF4;
        border: 1.5px solid #22C55E;
        border-radius: 6px;
        padding: 10px 16px;
        margin-bottom: 40px;
        align-self: flex-start;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span style="
          font-size: 11px;
          font-weight: 700;
          color: #166534;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        ">Rechtlich geprüft</span>
      </div>

      <!-- Letter Content -->
      <div style="
        flex: 1;
        font-size: 12px;
        line-height: 2;
        color: #262626;
        white-space: pre-wrap;
        font-weight: 400;
        text-align: justify;
      ">${letterText}</div>

      <!-- Footer -->
      <div style="
        margin-top: 56px;
        padding-top: 20px;
        border-top: 2px solid #171717;
      ">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 50%; vertical-align: top;">
              <div style="font-size: 10px; color: #737373; line-height: 1.6;">
                <div style="font-weight: 700; color: #171717; margin-bottom: 4px;">KündigungsHeld.de</div>
                <div>Professionelle Kündigungen</div>
                <div>Rechtlich geprüft & sicher</div>
              </div>
            </td>
            <td style="width: 50%; text-align: right; vertical-align: top;">
              <div style="font-size: 10px; color: #737373; line-height: 1.6;">
                <div style="font-weight: 600; color: #171717;">© 2026 KündigungsHeld</div>
                <div>Seite 1 von 1</div>
                <div style="margin-top: 4px; font-size: 9px;">Alle Rechte vorbehalten</div>
              </div>
            </td>
          </tr>
        </table>
      </div>

    </div>
  `
}

/* ── PDF Generation with Template Selection ── */

export async function generatePdf(
  letterText: string,
  companyName: string,
  formData: TemplateData,
  templateStyle: 'swiss' | 'modern' | 'legal' = 'modern' // Default: Modern Executive
) {
  showLoading()

  try {
    const container = document.createElement("div")
    container.style.cssText = `
      position: absolute; left: -9999px; top: 0; 
      width: 210mm; padding: 24mm; background: white;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    `

    // Select template based on style
    let templateHTML = ''
    switch (templateStyle) {
      case 'swiss':
        templateHTML = getSwissPrecisionTemplate(letterText, companyName)
        break
      case 'modern':
        templateHTML = getModernExecutiveTemplate(letterText, companyName)
        break
      case 'legal':
        templateHTML = getLegalProfessionalTemplate(letterText, companyName)
        break
      default:
        templateHTML = getModernExecutiveTemplate(letterText, companyName)
    }

    container.innerHTML = templateHTML

    document.body.appendChild(container)
    await new Promise((resolve) => setTimeout(resolve, 100))

    const canvas = await html2canvas(container, {
      scale: 3, // Увеличил для лучшего качества
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    document.body.removeChild(container)

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

    const fileName = `Kuendigung_${companyName.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")}_${new Date().toISOString().slice(0, 10)}.pdf`
    pdf.save(fileName)

    hideLoading()
  } catch (error) {
    hideLoading()
    console.error("PDF Generation Error:", error)
    alert("Fehler beim Erstellen des PDFs. Bitte versuchen Sie es erneut.")
  }
}

/* ── Other Helper Functions ── */

export function openMailto(letterText: string, companyName: string) {
  const subject = encodeURIComponent(`Kündigung - ${companyName}`)
  const body = encodeURIComponent(letterText)
  window.location.href = `mailto:?subject=${subject}&body=${body}`
}

export function printKundigung(letterText: string, companyName?: string) {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const docId = `KH${Date.now().toString(36).toUpperCase().substring(0, 8)}`
  const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Kündigung - Druckvorschau</title>
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
          }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #171717;
          background: white;
          width: 210mm;
          min-height: 297mm;
          padding: 24mm;
          margin: 0 auto;
          position: relative;
        }
        
        .page-content {
          min-height: 249mm;
          display: flex;
          flex-direction: column;
        }
        
        /* Header with dark background */
        .header {
          background: linear-gradient(135deg, #171717 0%, #262626 100%);
          margin: -24mm -24mm 0 -24mm;
          padding: 32px 24mm 24px 24mm;
          position: relative;
          overflow: hidden;
        }
        
        .header-decoration {
          position: absolute;
          right: -40px;
          top: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
        }
        
        .header-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .logo {
          font-size: 28px;
          font-weight: 900;
          color: white;
          letter-spacing: -0.03em;
          margin-bottom: 6px;
        }
        
        .tagline {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        
        .shield-icon {
          width: 52px;
          height: 52px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Info Cards */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 32px;
          margin-bottom: 40px;
        }
        
        .info-card {
          background: #FAFAFA;
          border: 1px solid #E5E5E5;
          border-radius: 8px;
          padding: 14px 16px;
        }
        
        .info-card-label {
          font-size: 9px;
          color: #A3A3A3;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
          font-weight: 600;
        }
        
        .info-card-value {
          font-size: 13px;
          font-weight: 700;
          color: #171717;
          line-height: 1.3;
          word-wrap: break-word;
        }
        
        /* Letter Content */
        .letter-content {
          flex: 1;
          font-size: 12px;
          line-height: 1.9;
          color: #262626;
          white-space: pre-wrap;
          font-weight: 400;
          page-break-inside: avoid;
        }
        
        /* Footer */
        .footer {
          margin-top: 48px;
          padding: 20px;
          background: #FAFAFA;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .footer-icon {
          width: 40px;
          height: 40px;
          background: #171717;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .footer-title {
          font-size: 11px;
          font-weight: 700;
          color: #171717;
        }
        
        .footer-text {
          font-size: 9px;
          color: #737373;
          margin-top: 2px;
        }
        
        .footer-right {
          text-align: right;
        }
        
        .footer-copyright {
          font-size: 9px;
          color: #A3A3A3;
          font-weight: 600;
        }
        
        .footer-page {
          font-size: 9px;
          color: #A3A3A3;
          margin-top: 2px;
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="page-content">
        <!-- Header -->
        <div class="header">
          <div class="header-decoration"></div>
          <div class="header-content">
            <div>
              <div class="logo">KündigungsHeld</div>
              <div class="tagline">PROFESSIONELLES KÜNDIGUNGSSCHREIBEN</div>
            </div>
            <div class="shield-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Info Cards -->
        <div class="info-cards">
          <div class="info-card">
            <div class="info-card-label">Empfänger</div>
            <div class="info-card-value">${companyName || 'Unternehmen'}</div>
          </div>
          <div class="info-card">
            <div class="info-card-label">Datum</div>
            <div class="info-card-value">${today}</div>
          </div>
          <div class="info-card">
            <div class="info-card-label">Dokument-ID</div>
            <div class="info-card-value" style="font-family: 'Courier New', monospace;">${docId}</div>
          </div>
        </div>

        <!-- Letter Content -->
        <div class="letter-content">${letterText}</div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-left">
            <div class="footer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <div class="footer-title">Rechtlich geprüft</div>
              <div class="footer-text">Erstellt mit KündigungsHeld.de</div>
            </div>
          </div>
          <div class="footer-right">
            <div class="footer-copyright">© 2026 KündigungsHeld</div>
            <div class="footer-page">Seite 1 von 1</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
  }, 250)
}

export function addCalendarReminder(companyName: string, formData: TemplateData) {
  const title = `Kündigungsfrist: ${companyName}`
  const details = `Kündigung wurde erstellt für ${companyName}`
  
  const reminderDate = new Date()
  reminderDate.setDate(reminderDate.getDate() + 30)
  
  const dateStr = reminderDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${dateStr}/${dateStr}`
  
  window.open(googleCalendarUrl, "_blank")
}
