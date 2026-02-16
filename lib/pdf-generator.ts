/**
 * Shared HTML builder for styled Kündigung letter.
 * Parses the generated plain text into structured sections and renders a professional design.
 */
function buildLetterHtml(text: string, companyName: string, title: string): string {
  // Parse the letter structure from the template output
  const lines = text.split("\n")

  // Find key sections by scanning lines
  let senderBlock = ""
  let recipientBlock = ""
  let dateLine = ""
  let betreffLine = ""
  let bodyLines: string[] = []
  let closingLines: string[] = []

  let section: "sender" | "gap1" | "recipient" | "gap2" | "date" | "betreff" | "body" | "closing" = "sender"
  let gapCount = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (section === "sender") {
      if (line.trim() === "") {
        section = "gap1"
        gapCount = 0
      } else {
        senderBlock += (senderBlock ? "\n" : "") + line
      }
    } else if (section === "gap1") {
      if (line.trim() === "") {
        gapCount++
      } else {
        section = "recipient"
        recipientBlock += line
      }
    } else if (section === "recipient") {
      if (line.trim() === "") {
        section = "gap2"
        gapCount = 0
      } else {
        recipientBlock += "\n" + line
      }
    } else if (section === "gap2") {
      if (line.trim() !== "") {
        // Check if this line looks like a date line (contains "den" and a date pattern)
        if (line.includes(", den ")) {
          dateLine = line
          section = "date"
        } else {
          section = "body"
          bodyLines.push(line)
        }
      }
    } else if (section === "date") {
      if (line.trim() === "") {
        continue
      } else if (line.startsWith("Betreff:")) {
        betreffLine = line.replace("Betreff: ", "")
        section = "betreff"
      } else {
        section = "body"
        bodyLines.push(line)
      }
    } else if (section === "betreff") {
      if (line.trim() === "") {
        section = "body"
      }
    } else if (section === "body") {
      // Detect closing: "Mit freundlichen Grüßen" signals the end
      if (line.startsWith("Mit freundlichen Grüßen") || line.startsWith("Mit freundlichen Grussen")) {
        closingLines.push(line)
        section = "closing"
      } else {
        bodyLines.push(line)
      }
    } else if (section === "closing") {
      closingLines.push(line)
    }
  }

  // Build body paragraphs: join lines into <p> blocks separated by empty lines
  const bodyHtml = bodyLines
    .join("\n")
    .split(/\n\n+/)
    .map(p => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("")

  const closingHtml = closingLines.map(l => l.trim() ? `<p>${l}</p>` : "").join("")

  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;")

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
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
    padding: 0;
  }

  /* ── Top branded strip ── */
  .top-strip {
    height: 28mm;
    background: linear-gradient(135deg, #0f7a66 0%, #1a9a82 50%, #23b496 100%);
    padding: 0 26mm;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 3mm;
  }
  .brand-shield {
    width: 10mm;
    height: 10mm;
    background: rgba(255,255,255,0.2);
    border: 0.6pt solid rgba(255,255,255,0.5);
    border-radius: 2.5mm;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .brand-shield svg {
    width: 5.5mm;
    height: 5.5mm;
  }
  .brand-text {
    display: flex;
    flex-direction: column;
  }
  .brand-name {
    font-size: 14pt;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.4pt;
    line-height: 1.1;
  }
  .brand-sub {
    font-size: 7pt;
    color: rgba(255,255,255,0.75);
    letter-spacing: 0.6pt;
    text-transform: uppercase;
    font-weight: 600;
  }
  .doc-badge {
    background: rgba(255,255,255,0.15);
    border: 0.5pt solid rgba(255,255,255,0.3);
    border-radius: 8pt;
    padding: 1.5mm 4mm;
    font-size: 7.5pt;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.3pt;
    text-transform: uppercase;
  }

  /* ── Content area ── */
  .content {
    padding: 8mm 26mm 20mm 26mm;
  }

  /* Address blocks */
  .address-row {
    display: flex;
    gap: 12mm;
    margin-bottom: 7mm;
  }
  .address-block {
    flex: 1;
    background: #f8fafc;
    border: 0.5pt solid #e2e8f0;
    border-radius: 2.5mm;
    padding: 4mm 5mm;
  }
  .address-label {
    font-size: 6.5pt;
    color: #1a9a82;
    text-transform: uppercase;
    letter-spacing: 0.6pt;
    font-weight: 700;
    margin-bottom: 1.5mm;
    display: flex;
    align-items: center;
    gap: 1mm;
  }
  .address-label::before {
    content: '';
    display: inline-block;
    width: 1.5mm;
    height: 1.5mm;
    background: #1a9a82;
    border-radius: 50%;
  }
  .address-text {
    font-size: 9.5pt;
    line-height: 1.45;
    color: #334155;
    white-space: pre-line;
  }

  /* Date */
  .meta-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 6mm;
    gap: 3mm;
  }
  .date-line {
    font-size: 9pt;
    color: #64748b;
    font-weight: 500;
  }

  /* Betreff */
  .betreff-wrap {
    margin-bottom: 5mm;
    padding-bottom: 4mm;
    border-bottom: 1.5pt solid #1a9a82;
  }
  .betreff-label {
    font-size: 7pt;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    font-weight: 600;
    margin-bottom: 1mm;
  }
  .betreff {
    font-size: 11.5pt;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.2pt;
  }

  /* Body */
  .body p {
    margin-bottom: 3mm;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #334155;
  }

  /* Closing */
  .closing {
    margin-top: 7mm;
  }
  .closing p {
    font-size: 10.5pt;
    color: #334155;
    line-height: 1.6;
  }

  /* Signature area */
  .sig-area {
    margin-top: 12mm;
    padding-top: 4mm;
    border-top: 0.5pt dashed #cbd5e1;
    width: 55mm;
  }
  .sig-hint {
    font-size: 7pt;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.4pt;
    font-weight: 600;
  }

  /* ── Footer ── */
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 14mm;
    background: #f1f5f9;
    border-top: 0.5pt solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 26mm;
  }
  .footer-left {
    display: flex;
    align-items: center;
    gap: 2mm;
  }
  .footer-dot {
    width: 1.5mm;
    height: 1.5mm;
    background: #1a9a82;
    border-radius: 50%;
  }
  .footer span {
    font-size: 7pt;
    color: #94a3b8;
    font-weight: 500;
  }
  .footer-right {
    display: flex;
    align-items: center;
    gap: 4mm;
  }
  .footer-divider {
    width: 0.5pt;
    height: 3mm;
    background: #cbd5e1;
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="page">

  <div class="top-strip">
    <div class="brand">
      <div class="brand-shield">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7l-9-5z" fill="rgba(255,255,255,0.9)"/>
          <path d="M9.5 12.5l2 2 3.5-4" stroke="#1a9a82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="brand-text">
        <span class="brand-name">KündigungsHeld</span>
        <span class="brand-sub">Rechtssichere Kündigungsschreiben</span>
      </div>
    </div>
    <span class="doc-badge">Kündigungsschreiben</span>
  </div>

  <div class="content">

    <div class="address-row">
      <div class="address-block">
        <div class="address-label">Absender</div>
        <div class="address-text">${esc(senderBlock)}</div>
      </div>
      <div class="address-block">
        <div class="address-label">Empfänger</div>
        <div class="address-text">${esc(recipientBlock)}</div>
      </div>
    </div>

    ${dateLine ? `<div class="meta-row"><span class="date-line">${esc(dateLine)}</span></div>` : ""}

    ${betreffLine ? `
    <div class="betreff-wrap">
      <div class="betreff-label">Betreff</div>
      <div class="betreff">${esc(betreffLine)}</div>
    </div>` : ""}

    <div class="body">
      ${bodyHtml}
    </div>

    <div class="closing">
      ${closingHtml}
    </div>

    <div class="sig-area">
      <div class="sig-hint">Unterschrift</div>
    </div>

  </div>

  <div class="footer">
    <div class="footer-left">
      <div class="footer-dot"></div>
      <span>Erstellt mit KündigungsHeld</span>
      <div class="footer-divider"></div>
      <span>kuendigungsheld.de</span>
    </div>
    <div class="footer-right">
      <span>Dokument-ID: KH-${Date.now().toString(36).toUpperCase()}</span>
      <div class="footer-divider"></div>
      <span>${new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</span>
    </div>
  </div>

</div>
</body>
</html>`
}

/**
 * Create a hidden iframe, write HTML to it, trigger action, and clean up.
 * This avoids opening a blank new tab.
 */
function withHiddenIframe(html: string, action: "print" | "pdf"): void {
  const iframe = document.createElement("iframe")
  iframe.style.position = "fixed"
  iframe.style.left = "-9999px"
  iframe.style.top = "-9999px"
  iframe.style.width = "210mm"
  iframe.style.height = "297mm"
  iframe.style.border = "none"
  document.body.appendChild(iframe)

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
  if (!iframeDoc) {
    document.body.removeChild(iframe)
    return
  }

  iframeDoc.open()
  iframeDoc.write(html)
  iframeDoc.close()

  // Wait for content to render, then trigger print/save
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()
    } catch {
      // Fallback: download as HTML if print not available
      const blob = new Blob([html], { type: "text/html;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "Kuendigung.html"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    // Clean up iframe after a delay (give print dialog time)
    setTimeout(() => {
      if (iframe.parentNode) {
        document.body.removeChild(iframe)
      }
    }, 1000)
  }, 400)
}

/**
 * Generate a styled PDF. Uses browser "Save as PDF" via print dialog in a hidden iframe.
 */
export function generatePdf(text: string, companyName: string): void {
  const dateStr = new Date().toISOString().slice(0, 10)
  const filename = `Kuendigung_${companyName.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_")}_${dateStr}`
  const html = buildLetterHtml(text, companyName, filename)
  withHiddenIframe(html, "pdf")
}

/**
 * Print the Kündigung directly via a hidden iframe (no blank window).
 */
export function printKundigung(text: string): void {
  const html = buildLetterHtml(text, "", "Kündigungsschreiben drucken")
  withHiddenIframe(html, "print")
}

/**
 * Open the default mail client with a prefilled Kündigung email.
 */
export function openMailto(
  text: string,
  companyName: string,
  companyEmail?: string
): void {
  const subject = encodeURIComponent(`Kündigung - ${companyName}`)
  const body = encodeURIComponent(text)
  const to = companyEmail ? encodeURIComponent(companyEmail) : ""
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
}

/**
 * Generate an .ics calendar file for a deadline reminder.
 */
export function addCalendarReminder(
  companyName: string,
  deadlineDate: string,
  description: string
): void {
  const date = new Date(deadlineDate)
  date.setDate(date.getDate() - 7)

  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  const endDate = new Date(date)
  endDate.setHours(endDate.getHours() + 1)

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KuendigungsHeld//DE
BEGIN:VEVENT
DTSTART:${formatDate(date)}
DTEND:${formatDate(endDate)}
SUMMARY:Kündigungsfrist ${companyName} - Erinnerung
DESCRIPTION:${description.replace(/\n/g, "\\n")}
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Kündigungsfrist für ${companyName} läuft bald ab!
END:VALARM
END:VEVENT
END:VCALENDAR`

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `Kuendigung_${companyName.replace(/[^a-zA-Z0-9]/g, "_")}_Erinnerung.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
