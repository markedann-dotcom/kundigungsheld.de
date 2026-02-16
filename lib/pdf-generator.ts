import html2canvas from "html2canvas"
import jsPDF from "jspdf"

/* ── HTML Builder (Строитель письма) ── */
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

  // Разбираем текст на блоки
  let section: "sender" | "gap1" | "recipient" | "gap2" | "date" | "betreff" | "body" | "closing" = "sender"

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
      if (line.startsWith("Mit freundlichen Gr") || line.startsWith("Mit freundlichen Grussen")) {
        closingLines.push(line)
        section = "closing"
      } else {
        bodyLines.push(line)
      }
    } else if (section === "closing") {
      closingLines.push(line)
    }
  }

  const bodyHtml = bodyLines
    .join("\n")
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("")

  const closingHtml = closingLines.map((l) => (l.trim() ? `<p>${l}</p>` : "")).join("")
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Возвращаем чистый HTML
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10.5pt; line-height: 1.6; color: #1e293b; background: #fff; width: 210mm; min-height: 297mm; }
  .page { position: relative; width: 210mm; min-height: 297mm; }
  .top-strip { height: 28mm; background: linear-gradient(135deg, #0f7a66 0%, #1a9a82 50%, #23b496 100%); padding: 0 26mm; display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 3mm; }
  .brand-shield { width: 10mm; height: 10mm; background: rgba(255,255,255,0.2); border: 0.6pt solid rgba(255,255,255,0.5); border-radius: 2.5mm; display: flex; align-items: center; justify-content: center; }
  .brand-shield svg { width: 5.5mm; height: 5.5mm; }
  .brand-text { display: flex; flex-direction: column; }
  .brand-name { font-size: 14pt; font-weight: 800; color: #fff; line-height: 1.1; }
  .brand-sub { font-size: 7pt; color: rgba(255,255,255,0.75); text-transform: uppercase; font-weight: 600; }
  .doc-badge { background: rgba(255,255,255,0.15); border: 0.5pt solid rgba(255,255,255,0.3); border-radius: 8pt; padding: 1.5mm 4mm; font-size: 7.5pt; color: #fff; font-weight: 600; text-transform: uppercase; }
  .content { padding: 8mm 26mm 20mm 26mm; }
  .address-row { display: flex; gap: 12mm; margin-bottom: 7mm; }
  .address-block { flex: 1; background: #f8fafc; border: 0.5pt solid #e2e8f0; border-radius: 2.5mm; padding: 4mm 5mm; }
  .address-label { font-size: 6.5pt; color: #1a9a82; text-transform: uppercase; font-weight: 700; margin-bottom: 1.5mm; display: flex; align-items: center; gap: 1mm; }
  .address-label::before { content: ''; display: inline-block; width: 1.5mm; height: 1.5mm; background: #1a9a82; border-radius: 50%; }
  .address-text { font-size: 9.5pt; line-height: 1.45; color: #334155; white-space: pre-line; }
  .meta-row { display: flex; justify-content: flex-end; align-items: center; margin-bottom: 6mm; gap: 3mm; }
  .date-line { font-size: 9pt; color: #64748b; font-weight: 500; }
  .betreff-wrap { margin-bottom: 5mm; padding-bottom: 4mm; border-bottom: 1.5pt solid #1a9a82; }
  .betreff-label { font-size: 7pt; color: #94a3b8; text-transform: uppercase; font-weight: 600; margin-bottom: 1mm; }
  .betreff { font-size: 11.5pt; font-weight: 700; color: #0f172a; }
  .body p { margin-bottom: 3mm; }
  .closing { margin-top: 7mm; }
  .sig-area { margin-top: 12mm; padding-top: 4mm; border-top: 0.5pt dashed #cbd5e1; width: 55mm; }
  .sig-hint { font-size: 7pt; color: #94a3b8; text-transform: uppercase; font-weight: 600; }
  .footer { position: absolute; bottom: 0; left: 0; right: 0; height: 14mm; background: #f1f5f9; border-top: 0.5pt solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 26mm; }
  .footer-left { display: flex; align-items: center; gap: 2mm; }
  .footer-dot { width: 1.5mm; height: 1.5mm; background: #1a9a82; border-radius: 50%; }
  .footer span { font-size: 7pt; color: #94a3b8; font-weight: 500; }
  .footer-right { display: flex; align-items: center; gap: 4mm; }
  .footer-divider { width: 0.5pt; height: 3mm; background: #cbd5e1; }
  @media print { 
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } 
    .page { margin: 0; page-break-after: always; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="top-strip">
    <div class="brand">
      <div class="brand-shield">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7l-9-5z" fill="rgba(255,255,255,0.9)"/><path d="M9.5 12.5l2 2 3.5-4" stroke="#1a9a82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="brand-text"><span class="brand-name">K\u00fcndigungsHeld</span><span class="brand-sub">Rechtssichere K\u00fcndigungsschreiben</span></div>
    </div>
    <span class="doc-badge">K\u00fcndigungsschreiben</span>
  </div>
  <div class="content">
    <div class="address-row">
      <div class="address-block"><div class="address-label">Absender</div><div class="address-text">${esc(senderBlock)}</div></div>
      <div class="address-block"><div class="address-label">Empf\u00e4nger</div><div class="address-text">${esc(recipientBlock)}</div></div>
    </div>
    ${dateLine ? `<div class="meta-row"><span class="date-line">${esc(dateLine)}</span></div>` : ""}
    ${betreffLine ? `<div class="betreff-wrap"><div class="betreff-label">Betreff</div><div class="betreff">${esc(betreffLine)}</div></div>` : ""}
    <div class="body">${bodyHtml}</div>
    <div class="closing">${closingHtml}</div>
    <div class="sig-area"><div class="sig-hint">Unterschrift</div></div>
  </div>
  <div class="footer">
    <div class="footer-left"><div class="footer-dot"></div><span>Erstellt mit K\u00fcndigungsHeld</span><div class="footer-divider"></div><span>kuendigungsheld.de</span></div>
    <div class="footer-right"><span>Dokument-ID: KH-${Date.now().toString(36).toUpperCase()}</span><div class="footer-divider"></div><span>${new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</span></div>
  </div>
</div>
</body>
</html>`
}

/* ── Helpers (Вспомогательные функции) ── */

// 1. Проверяем, с телефона ли зашел пользователь
function isMobile(): boolean {
  if (typeof navigator === "undefined") return false
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent))
  )
}

// 2. Генератор PDF (Делает снимок и сохраняет файл)
async function generateRealPdf(html: string, filename: string): Promise<void> {
  try {
    // Создаем временный контейнер
    const container = document.createElement("div")
    container.style.cssText = "position:fixed;left:-9999px;top:0;width:794px;min-height:1123px;background:#fff;z-index:-1"
    
    // Чистим HTML от лишнего
    container.innerHTML = html.replace(/<!DOCTYPE[^>]*>/i, "").replace(/<\/?html[^>]*>/gi, "").replace(/<head[\s\S]*?<\/head>/gi, "").replace(/<\/?body[^>]*>/gi, "")
    
    document.body.appendChild(container)

    // Возвращаем стили (чтобы было красиво)
    const styleMatch = html.match(/<style[\s\S]*?<\/style>/i)
    if (styleMatch) {
      const styleEl = document.createElement("style")
      styleEl.textContent = styleMatch[0].replace(/<\/?style[^>]*>/gi, "")
      container.prepend(styleEl)
    }

    // Даем браузеру секунду на отрисовку
    await new Promise((r) => requestAnimationFrame(r))

    // Делаем "скриншот" письма
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: 794,
      height: 1123,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/jpeg", 0.95)
    
    // Сохраняем в PDF
    // @ts-ignore
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297)
    pdf.save(`${filename}.pdf`)

    // Удаляем мусор
    document.body.removeChild(container)
  } catch (err) {
    console.error("PDF Fail:", err)
    alert("Ошибка при создании PDF. Попробуйте еще раз.")
  }
}

// 3. Печать для ПК (Создает невидимое окно и вызывает системную печать)
function printViaIframe(html: string): void {
  const iframe = document.createElement("iframe")
  iframe.style.cssText = "position:fixed;left:-9999px;top:-9999px;width:210mm;height:297mm;border:none"
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument || iframe.contentWindow?.document
  if (!doc) return

  doc.open()
  doc.write(html)
  doc.close()

  // Ждем загрузки и печатаем
  requestAnimationFrame(() => {
    setTimeout(() => {
      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()
      // Удаляем iframe через 2 секунды
      setTimeout(() => { if (iframe.parentNode) document.body.removeChild(iframe) }, 2000)
    }, 500)
  })
}

/* ── Экспортируемые функции (То, что вызывает сайт) ── */

/** * Кнопка "PDF Download" 
 * Всегда просто скачивает файл.
 */
export function generatePdf(text: string, companyName: string): void {
  const dateStr = new Date().toISOString().slice(0, 10)
  const safeName = companyName.replace(/[^a-zA-Z0-9]/g, "_")
  const filename = `Kuendigung_${safeName}_${dateStr}`
  const html = buildLetterHtml(text, companyName, filename)

  generateRealPdf(html, filename)
}

/** * Кнопка "Drucken" (Печать)
 * ХИТРОСТЬ: 
 * Если это мобилка -> Скачиваем PDF (потому что печать там глючит).
 * Если это ПК -> Открываем обычное окно печати.
 */
export function printKundigung(text: string): void {
  if (isMobile()) {
    const html = buildLetterHtml(text, "", "Kündigung")
    generateRealPdf(html, "Kuendigungsschreiben_Druck")
  } 
  else {
    const html = buildLetterHtml(text, "", "Drucken")
    printViaIframe(html)
  }
}

/** Отправка по Email */
export function openMailto(text: string, companyName: string, companyEmail?: string): void {
  const subject = encodeURIComponent(`Kündigung - ${companyName}`)
  const body = encodeURIComponent(text)
  const to = companyEmail ? encodeURIComponent(companyEmail) : ""
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
}

/** Календарь */
export function addCalendarReminder(companyName: string, deadlineDate: string, description: string): void {
  const date = new Date(deadlineDate)
  date.setDate(date.getDate() - 7)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const endDate = new Date(date)
  endDate.setHours(endDate.getHours() + 1)
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//KuendigungsHeld//DE", "BEGIN:VEVENT",
    `DTSTART:${fmt(date)}`, `DTEND:${fmt(endDate)}`,
    `SUMMARY:Kündigungsfrist ${companyName} - Erinnerung`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", `DESCRIPTION:Kündigungsfrist läuft bald ab!`, "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n")
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `Erinnerung_${companyName}.ics`
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
}