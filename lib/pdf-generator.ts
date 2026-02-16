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

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1e293b;
    background: #fff;
    width: 210mm;
    min-height: 297mm;
    padding: 0;
  }

  .page {
    position: relative;
    width: 210mm;
    min-height: 297mm;
    padding: 22mm 24mm 28mm 26mm;
  }

  /* Top accent bar */
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5mm;
    background: linear-gradient(90deg, #1a9a82 0%, #15a58a 40%, #11b693 100%);
  }

  /* Brand header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5mm;
    border-bottom: 0.5pt solid #cbd5e1;
    margin-bottom: 6mm;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 2.5mm;
  }
  .brand-icon {
    width: 8mm;
    height: 8mm;
    background: #1a9a82;
    border-radius: 2mm;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 11pt;
    font-weight: 700;
  }
  .brand-name {
    font-size: 12pt;
    font-weight: 700;
    color: #1e293b;
    letter-spacing: -0.3pt;
  }
  .header-label {
    font-size: 8pt;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    font-weight: 600;
  }

  /* Address blocks */
  .address-row {
    display: flex;
    gap: 14mm;
    margin-bottom: 7mm;
  }
  .address-block {
    flex: 1;
  }
  .address-label {
    font-size: 7.5pt;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.4pt;
    font-weight: 600;
    margin-bottom: 1.5mm;
  }
  .address-text {
    font-size: 10pt;
    line-height: 1.5;
    color: #334155;
    white-space: pre-line;
  }

  /* Date & Betreff */
  .date-line {
    text-align: right;
    font-size: 9.5pt;
    color: #64748b;
    margin-bottom: 6mm;
  }
  .betreff {
    font-size: 11pt;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 5mm;
    padding-bottom: 3mm;
    border-bottom: 0.5pt solid #e2e8f0;
  }

  /* Body */
  .body p {
    margin-bottom: 3mm;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #334155;
  }

  /* Closing */
  .closing {
    margin-top: 8mm;
  }
  .closing p {
    font-size: 10.5pt;
    color: #334155;
    line-height: 1.55;
  }
  .signature-name {
    font-weight: 700;
    color: #1e293b;
    margin-top: 10mm;
    font-size: 11pt;
  }

  /* Footer watermark */
  .footer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 3mm 26mm;
    background: #f8fafc;
    border-top: 0.5pt solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-bar span {
    font-size: 7pt;
    color: #94a3b8;
  }
</style>
</head>
<body>
<div class="page">
  <div class="accent-bar"></div>

  <div class="header">
    <div class="brand">
      <div class="brand-icon">K</div>
      <span class="brand-name">KündigungsHeld</span>
    </div>
    <span class="header-label">Kündigungsschreiben</span>
  </div>

  <div class="address-row">
    <div class="address-block">
      <div class="address-label">Absender</div>
      <div class="address-text">${senderBlock.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    </div>
    <div class="address-block">
      <div class="address-label">Empfänger</div>
      <div class="address-text">${recipientBlock.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    </div>
  </div>

  ${dateLine ? `<div class="date-line">${dateLine.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}

  ${betreffLine ? `<div class="betreff">${betreffLine.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}

  <div class="body">
    ${bodyHtml}
  </div>

  <div class="closing">
    ${closingHtml}
  </div>

  <div class="footer-bar">
    <span>Erstellt mit KündigungsHeld &mdash; kündigungsheld.de</span>
    <span>${new Date().toLocaleDateString("de-DE")}</span>
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
