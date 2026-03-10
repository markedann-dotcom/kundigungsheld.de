import { useState, useEffect } from "react";

const STEPS = [
  { id: 0, label: "Frist" },
  { id: 1, label: "Ihre Daten" },
  { id: 2, label: "Arbeitgeber" },
  { id: 3, label: "Grund" },
  { id: 4, label: "Klageschrift" },
];

const REASONS = [
  { id: "sozialauswahl",   title: "Fehlerhafte Sozialauswahl",  desc: "Bei betriebsbedingter Kündigung wurden Sozialdaten nicht korrekt berücksichtigt.", icon: "⚖️" },
  { id: "betriebsrat",     title: "Betriebsrat nicht angehört", desc: "Der Betriebsrat wurde vor der Kündigung nicht ordnungsgemäß konsultiert.", icon: "🏛️" },
  { id: "formfehler",      title: "Formfehler",                 desc: "Kündigung nicht schriftlich oder ohne eigenhändige Unterschrift.", icon: "📄" },
  { id: "diskriminierung", title: "Diskriminierung (AGG)",      desc: "Verdacht auf Kündigung wegen Geschlecht, Alter, Religion oder Herkunft.", icon: "🚫" },
  { id: "sonderschutz",    title: "Sonderkündigungsschutz",     desc: "Schwangerschaft, Schwerbehinderung, Betriebsratsmitgliedschaft, Elternzeit.", icon: "🛡️" },
  { id: "sonstige",        title: "Sonstiger Grund",            desc: "Ein anderer Grund macht die Kündigung unwirksam.", icon: "💬" },
];

function useCountdown(date) {
  const [state, setState] = useState({ days: 21, hours: 0, minutes: 0, seconds: 0, expired: false, percent: 0, deadline: null });
  useEffect(() => {
    if (!date) return;
    const deadline = new Date(date);
    deadline.setDate(deadline.getDate() + 21);
    const tick = () => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) { setState(s => ({ ...s, expired: true })); return; }
      const total = 21 * 24 * 60 * 60 * 1000;
      setState({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false,
        percent: Math.min(((total - diff) / total) * 100, 100),
        deadline,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date]);
  return state;
}

function downloadPDF({ personal, employer, reasons, date }) {
  const today = new Date().toLocaleDateString("de-DE");
  const kuendigungDatum = new Date(date).toLocaleDateString("de-DE");
  const titles = reasons.map(r => REASONS.find(x => x.id === r)?.title).filter(Boolean);
  const deadline = new Date(date);
  deadline.setDate(deadline.getDate() + 21);

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
  @page { margin: 2.5cm 2.8cm; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Times New Roman", Times, serif; font-size: 12pt; color: #000; line-height: 1.5; }
  .sender { margin-bottom: 8mm; }
  .sender p { line-height: 1.6; }
  .recipient { margin: 8mm 0 12mm 0; }
  .recipient p { line-height: 1.6; }
  .place-date { text-align: right; margin-bottom: 12mm; }
  .subject { font-weight: bold; font-size: 13pt; margin-bottom: 8mm; text-decoration: underline; }
  .re { margin-bottom: 8mm; }
  .re span { font-weight: bold; }
  .body-text { margin-bottom: 6mm; text-align: justify; }
  .section-title { font-weight: bold; margin: 8mm 0 4mm; text-transform: uppercase; letter-spacing: 1px; font-size: 11pt; }
  .reason-item { margin-bottom: 3mm; padding-left: 5mm; }
  .divider { border: none; border-top: 1px solid #000; margin: 10mm 0; }
  .signature-block { margin-top: 20mm; }
  .signature-line { border-bottom: 1px solid #000; width: 70mm; margin-bottom: 2mm; }
  .footer-note { margin-top: 16mm; font-size: 9pt; color: #555; border-top: 1px solid #ccc; padding-top: 4mm; }
  .header-bar { background: #111; color: #fff; padding: 4mm 6mm; margin-bottom: 10mm; display: flex; justify-content: space-between; align-items: center; }
  .header-bar .logo { font-weight: 800; font-size: 13pt; font-family: Arial, sans-serif; letter-spacing: -0.3px; }
  .header-bar .badge { font-size: 9pt; font-family: Arial, sans-serif; opacity: 0.7; }
  .urgent-box { border: 1.5px solid #dc2626; border-radius: 4px; padding: 3mm 5mm; margin-bottom: 8mm; background: #fef2f2; }
  .urgent-box p { color: #dc2626; font-family: Arial, sans-serif; font-size: 10pt; font-weight: 600; }
  .parties-table { width: 100%; border-collapse: collapse; margin-bottom: 8mm; }
  .parties-table td { padding: 3mm 4mm; vertical-align: top; font-size: 11pt; }
  .parties-table td:first-child { width: 28mm; font-weight: bold; color: #555; font-family: Arial, sans-serif; font-size: 10pt; text-transform: uppercase; letter-spacing: 0.5px; }
  .parties-table tr { border-bottom: 1px solid #eee; }
</style>
</head>
<body>

<div class="header-bar">
  <span class="logo">KündigungsHeld</span>
  <span class="badge">Kündigungsschutzklage · § 4 KSchG</span>
</div>

<div class="sender">
  <p><strong>${personal.name}</strong></p>
  <p>${personal.address}</p>
  <p>${personal.plz} ${personal.city}</p>
</div>

<div class="recipient">
  <p><strong>An das</strong></p>
  <p><strong>Arbeitsgericht ${employer.city}</strong></p>
  <p>– z. Hd. Eingangsgeschäftsstelle –</p>
</div>

<div class="place-date">
  <p>${personal.city}, den ${today}</p>
</div>

<div class="subject">Kündigungsschutzklage gem. § 4 KSchG</div>

<table class="parties-table">
  <tr>
    <td>Kläger/in</td>
    <td>${personal.name}<br>${personal.address}, ${personal.plz} ${personal.city}</td>
  </tr>
  <tr>
    <td>Beklagte/r</td>
    <td>${employer.name}<br>${employer.address}, ${employer.plz} ${employer.city}</td>
  </tr>
</table>

<hr class="divider">

<p class="section-title">Klageantrag</p>

<p class="body-text">
Hiermit erhebe ich Klage gegen die Kündigung vom <strong>${kuendigungDatum}</strong>
und beantrage das Gericht festzustellen:
</p>

<p class="body-text" style="padding-left: 8mm; font-style: italic;">
„Das Arbeitsverhältnis zwischen den Parteien ist durch die Kündigung
vom ${kuendigungDatum} nicht aufgelöst worden und besteht unverändert fort."
</p>

<p class="section-title">Begründung</p>

<p class="body-text">
Die ausgesprochene Kündigung ist sozial ungerechtfertigt im Sinne des
§ 1 KSchG und damit rechtsunwirksam. Sie verletzt folgende gesetzliche
Bestimmungen:
</p>

${titles.map((t, i) => `<p class="reason-item"><strong>${i + 1}.</strong> ${t}</p>`).join("")}

<p class="body-text" style="margin-top: 6mm;">
Ich behalte mir vor, die Begründung nach Einsicht in die Personalakte
und die vollständigen Kündigungsunterlagen zu ergänzen.
</p>

<p class="section-title">Beweisangebot</p>
<p class="body-text">Zeuge: Betriebsrat und alle weiteren benannten Personen. Urkunden: Arbeitsvertrag, Kündigungsschreiben, alle weiteren relevanten Dokumente (werden nachgereicht).</p>

<p class="body-text">Ich bitte das Gericht, einen <strong>Gütetermin</strong> gemäß § 54 ArbGG anzuberaumen.</p>

<hr class="divider">

<div class="urgent-box">
  <p>⚠ Fristhinweis: Die Klagefrist gem. § 4 KSchG endet am ${deadline.toLocaleDateString("de-DE")} (21 Tage ab Zugang der Kündigung).</p>
</div>

<div class="signature-block">
  <p style="margin-bottom: 12mm;">Mit freundlichen Grüßen,</p>
  <div class="signature-line"></div>
  <p style="font-family: Arial, sans-serif; font-size: 10pt;">${personal.name}</p>
  <p style="font-family: Arial, sans-serif; font-size: 10pt; color: #555;">${personal.city}, den ${today}</p>
</div>

<div class="footer-note">
  <p>Erstellt mit KündigungsHeld (kundigungsheld.de) · Dieses Dokument ersetzt keine Rechtsberatung. Bei Unsicherheiten wenden Sie sich an einen Fachanwalt für Arbeitsrecht.</p>
</div>

</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      setTimeout(() => {
        win.print();
        URL.revokeObjectURL(url);
      }, 500);
    };
  }
}

export default function App() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [personal, setPersonal] = useState({ name: "", address: "", plz: "", city: "" });
  const [employer, setEmployer] = useState({ name: "", address: "", plz: "", city: "" });
  const [reasons, setReasons] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const countdown = useCountdown(date);
  const urgency = countdown.days <= 3 ? "red" : countdown.days <= 7 ? "amber" : "green";
  const urgentColor = urgency === "red" ? "#ef4444" : urgency === "amber" ? "#f59e0b" : "#22c55e";

  const canAdvance = () => {
    if (step === 0) return !!date && !countdown.expired;
    if (step === 1) return personal.name && personal.address && personal.plz && personal.city;
    if (step === 2) return employer.name && employer.address && employer.plz && employer.city;
    if (step === 3) return reasons.length > 0;
    return true;
  };

  const toggle = (id) => setReasons(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);

  const klageschriftText = step === 4 ? [
    `${personal.name}`, `${personal.address}`, `${personal.plz} ${personal.city}`, ``,
    `An das Arbeitsgericht ${employer.city}`, ``,
    `${personal.city}, den ${new Date().toLocaleDateString("de-DE")}`, ``,
    `KLAGESCHRIFT gem. § 4 KSchG`, `${"─".repeat(45)}`, ``,
    `Kläger/in:  ${personal.name}, ${personal.address}, ${personal.plz} ${personal.city}`,
    `Beklagte/r: ${employer.name}, ${employer.address}, ${employer.plz} ${employer.city}`, ``,
    `Ich erhebe Klage gegen die Kündigung vom ${new Date(date).toLocaleDateString("de-DE")}`,
    `und beantrage festzustellen, dass das Arbeitsverhältnis nicht aufgelöst wurde.`, ``,
    `BEGRÜNDUNG`, ``,
    ...reasons.map((r, i) => `${i + 1}. ${REASONS.find(x => x.id === r)?.title}`), ``,
    `Mit freundlichen Grüßen,`, ``, `${"_".repeat(30)}`, personal.name,
  ].join("\n") : "";

  const copy = () => {
    navigator.clipboard.writeText(klageschriftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ fontFamily: "system-ui,-apple-system,sans-serif", background: "#fafaf9", minHeight: "100vh", color: "#111" }}>

      {/* NAV */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#111" }}>
            <div style={{ width: 30, height: 30, background: "#111", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>⚖</div>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>KündigungsHeld</span>
          </a>
          <a href="/" style={{ fontSize: 13, color: "#666", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 8, border: "1px solid #e5e5e5" }}>
            ← Startseite
          </a>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "#111", color: "#fff", padding: isMobile ? "24px 16px" : "32px 16px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>⚖️</div>
            <div>
              <h1 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>Kündigung anfechten</h1>
              <p style={{ margin: "5px 0 8px", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Klageschrift nach § 4 KSchG — kostenlos als PDF</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 20, padding: "3px 10px" }}>
                <span style={{ fontSize: 11 }}>⏱</span>
                <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 600 }}>Gesetzliche Frist: 21 Tage ab Zugang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEPPER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "10px 0", gap: 0 }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <button onClick={() => i < step && setStep(i)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: i < step ? "pointer" : "default", padding: "3px 5px", borderRadius: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, background: i < step ? "#111" : i === step ? "#111" : "#f0f0f0", color: i < step ? "#fff" : i === step ? "#fff" : "#999" }}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  {!isMobile && <span style={{ fontSize: 11, fontWeight: i === step ? 600 : 400, color: i === step ? "#111" : "#999", whiteSpace: "nowrap" }}>{s.label}</span>}
                </button>
                {i < STEPS.length - 1 && <div style={{ width: isMobile ? 10 : 16, height: 1, background: i < step ? "#111" : "#e5e5e5", margin: "0 2px" }} />}
              </div>
            ))}
          </div>
          <div style={{ height: 2, background: "#f0f0f0" }}>
            <div style={{ height: "100%", background: "#111", width: `${(step / (STEPS.length - 1)) * 100}%`, transition: "width 0.3s ease" }} />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "14px 12px 80px" : "20px 16px 80px" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e5e5", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>

          {/* STEP 0 */}
          {step === 0 && (
            <div style={{ padding: isMobile ? 18 : 26 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 5px", letterSpacing: "-0.3px" }}>Wann haben Sie die Kündigung erhalten?</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 18px" }}>Wir berechnen automatisch Ihre verbleibende Klagefrist.</p>
              <input type="date" value={date} max={new Date().toISOString().split("T")[0]} onChange={e => setDate(e.target.value)}
                style={{ width: "100%", padding: "11px 13px", fontSize: 14, border: "1.5px solid #e5e5e5", borderRadius: 10, background: "#fafaf9", color: "#111", boxSizing: "border-box", outline: "none" }} />

              {date && !countdown.expired && (
                <div style={{ marginTop: 14, borderRadius: 12, border: `1.5px solid ${urgentColor}33`, background: `${urgentColor}08`, padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: urgentColor, textTransform: "uppercase", letterSpacing: "0.5px" }}>{urgency === "red" ? "⚠️ Dringend!" : "⏱ Verbleibende Frist"}</span>
                    <span style={{ fontSize: 11, color: "#888" }}>bis {countdown.deadline?.toLocaleDateString("de-DE")}</span>
                  </div>
                  <div style={{ display: "flex", gap: isMobile ? 12 : 20, marginBottom: 10 }}>
                    {[{ v: countdown.days, u: "Tage" }, { v: countdown.hours, u: "Std" }, { v: countdown.minutes, u: "Min" }, { v: countdown.seconds, u: "Sek" }].map(({ v, u }) => (
                      <div key={u} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: isMobile ? 26 : 32, fontWeight: 800, letterSpacing: "-1px", color: urgentColor, lineHeight: 1 }}>{String(v).padStart(2, "0")}</div>
                        <div style={{ fontSize: 9, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 2 }}>{u}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 3, background: `${urgentColor}22`, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: urgentColor, width: `${countdown.percent}%`, transition: "width 1s linear" }} />
                  </div>
                </div>
              )}
              {countdown.expired && (
                <div style={{ marginTop: 14, borderRadius: 12, border: "1.5px solid #fecaca", background: "#fef2f2", padding: 14 }}>
                  <p style={{ fontWeight: 700, color: "#dc2626", margin: "0 0 5px", fontSize: 13 }}>⚠️ Klagefrist abgelaufen</p>
                  <p style={{ fontSize: 12, color: "#7f1d1d", margin: 0, lineHeight: 1.6 }}>Die 21-Tage-Frist ist verstrichen. Wenden Sie sich an einen Fachanwalt — in Ausnahmefällen ist nachträgliche Zulassung möglich (§ 5 KSchG).</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 1 & 2 */}
          {(step === 1 || step === 2) && (
            <div style={{ padding: isMobile ? 18 : 26 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 5px", letterSpacing: "-0.3px" }}>{step === 1 ? "Ihre persönlichen Daten" : "Daten des Arbeitgebers"}</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 18px" }}>{step === 1 ? "Erscheinen als Kläger/in in der Klageschrift." : "Erscheinen als Beklagte/r in der Klageschrift."}</p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                {[
                  { key: "name",    label: step === 1 ? "Vor- und Nachname" : "Firmenname",  placeholder: step === 1 ? "Max Mustermann" : "Musterfirma GmbH", full: true },
                  { key: "address", label: "Straße und Hausnr.", placeholder: "Musterstraße 1", full: true },
                  { key: "plz",     label: "PLZ",  placeholder: "10115", full: false },
                  { key: "city",    label: "Stadt", placeholder: "Berlin", full: false },
                ].map(f => {
                  const data = step === 1 ? personal : employer;
                  const setData = step === 1 ? setPersonal : setEmployer;
                  return (
                    <div key={f.key} style={{ gridColumn: f.full || isMobile ? "1 / -1" : "auto" }}>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{f.label}</label>
                      <input style={{ width: "100%", padding: "10px 12px", fontSize: 14, border: "1.5px solid #e5e5e5", borderRadius: 9, background: "#fafaf9", color: "#111", boxSizing: "border-box", outline: "none" }}
                        placeholder={f.placeholder} value={data[f.key]} onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ padding: isMobile ? 18 : 26 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 5px", letterSpacing: "-0.3px" }}>Warum ist die Kündigung unwirksam?</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 18px" }}>Mehrfachauswahl möglich.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {REASONS.map(r => {
                  const active = reasons.includes(r.id);
                  return (
                    <button key={r.id} onClick={() => toggle(r.id)}
                      style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "12px 13px", borderRadius: 10, border: `1.5px solid ${active ? "#111" : "#e5e5e5"}`, background: active ? "#f5f5f5" : "#fff", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", border: `2px solid ${active ? "#111" : "#ddd"}`, background: active ? "#111" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {active && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 13 }}>{r.icon}</span>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</span>
                        </div>
                        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#888", lineHeight: 1.5 }}>{r.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div style={{ padding: isMobile ? 18 : 26 }}>
              {/* Success */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 11, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: 13, marginBottom: 18 }}>
                <span style={{ fontSize: 18 }}>✅</span>
                <div>
                  <p style={{ fontWeight: 700, color: "#15803d", margin: "0 0 2px", fontSize: 13 }}>Klageschrift erstellt</p>
                  <p style={{ fontSize: 12, color: "#166534", margin: 0, lineHeight: 1.5 }}>Laden Sie das PDF herunter und reichen Sie es beim Arbeitsgericht ein.</p>
                </div>
              </div>

              {/* PDF DOWNLOAD — main CTA */}
              <button
                onClick={() => downloadPDF({ personal, employer, reasons, date })}
                style={{ width: "100%", padding: isMobile ? "14px" : "16px", borderRadius: 12, border: "none", background: "#111", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginBottom: 12, letterSpacing: "-0.2px" }}>
                <span style={{ fontSize: 18 }}>📄</span>
                Als PDF herunterladen / Drucken
              </button>

              {/* Next steps */}
              <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
                {[{ n: "1", t: "PDF speichern", d: "Oder direkt drucken" }, { n: "2", t: "Arbeitsgericht", d: "Persönlich einreichen" }, { n: "3", t: "Gütetermin", d: "Beide Parteien geladen" }].map(ns => (
                  <div key={ns.n} style={{ flex: 1, minWidth: 90, display: "flex", alignItems: "center", gap: 8, padding: "9px 11px", borderRadius: 9, border: "1px solid #e5e5e5", background: "#fafaf9" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{ns.n}</div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, margin: 0 }}>{ns.t}</p>
                      <p style={{ fontSize: 10, color: "#888", margin: 0 }}>{ns.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Text preview collapsible */}
              <div style={{ borderRadius: 11, border: "1.5px solid #e5e5e5", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 13px", background: "#f5f5f5", borderBottom: "1px solid #e5e5e5" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Vorschau — Textversion</span>
                  <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6, border: "1px solid #e5e5e5", background: copied ? "#111" : "#fff", color: copied ? "#fff" : "#111", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                    {copied ? "✓ Kopiert" : "Kopieren"}
                  </button>
                </div>
                <textarea readOnly value={klageschriftText}
                  style={{ width: "100%", minHeight: 220, padding: 14, fontFamily: "monospace", fontSize: 11, lineHeight: 1.8, border: "none", background: "#fff", resize: "vertical", boxSizing: "border-box", color: "#111" }} />
              </div>
            </div>
          )}

          {/* BOTTOM NAV */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 18px", borderTop: "1px solid #e5e5e5", background: "#fafaf9" }}>
            {step > 0
              ? <button onClick={() => setStep(s => s - 1)} style={{ padding: "8px 15px", borderRadius: 8, border: "1.5px solid #e5e5e5", background: "#fff", color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>← Zurück</button>
              : <div />}
            {step < 4 && (
              <button disabled={!canAdvance()} onClick={() => setStep(s => s + 1)}
                style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: canAdvance() ? "#111" : "#e5e5e5", color: canAdvance() ? "#fff" : "#aaa", fontSize: 13, fontWeight: 600, cursor: canAdvance() ? "pointer" : "not-allowed", transition: "all 0.15s" }}>
                {step === 3 ? "Klageschrift erstellen →" : "Weiter →"}
              </button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
          {["🔒 Daten bleiben im Browser", "⚖️ Basis: § 4 KSchG", "🆓 Kostenlos"].map(t => (
            <span key={t} style={{ fontSize: 11, color: "#aaa" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}