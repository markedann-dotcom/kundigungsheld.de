"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 0, label: "Fristprüfung" },
  { id: 1, label: "Ihre Daten" },
  { id: 2, label: "Arbeitgeber" },
  { id: 3, label: "Klagegrund" },
  { id: 4, label: "PDF & Fertig" },
];

const REASONS = [
  { id: "sozialauswahl",   icon: "⚖️", title: "Fehlerhafte Sozialauswahl",  desc: "Bei betriebsbedingter Kündigung wurden Sozialdaten nicht korrekt berücksichtigt." },
  { id: "betriebsrat",     icon: "🏛️", title: "Betriebsrat nicht angehört", desc: "Der Betriebsrat wurde vor der Kündigung nicht ordnungsgemäß konsultiert." },
  { id: "formfehler",      icon: "📋", title: "Formfehler",                  desc: "Kündigung nicht schriftlich oder ohne eigenhändige Unterschrift." },
  { id: "diskriminierung", icon: "🚫", title: "Diskriminierung (AGG)",       desc: "Verdacht auf Kündigung wegen Geschlecht, Alter, Religion oder Herkunft." },
  { id: "sonderschutz",    icon: "🛡️", title: "Sonderkündigungsschutz",     desc: "Schwangerschaft, Schwerbehinderung, Betriebsratsmitgliedschaft, Elternzeit." },
  { id: "sonstige",        icon: "💬", title: "Sonstiger Grund",             desc: "Ein anderer Grund macht die Kündigung unwirksam." },
];

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────

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
      setState({ days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), minutes: Math.floor((diff%3600000)/60000), seconds: Math.floor((diff%60000)/1000), expired: false, percent: Math.min(((total-diff)/total)*100,100), deadline });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date]);
  return state;
}

// ─── PDF GENERATOR ───────────────────────────────────────────────────────────

function generateAndPrintPDF({ personal, employer, reasons, date }) {
  const today = new Date().toLocaleDateString("de-DE");
  const kuendigungDatum = new Date(date).toLocaleDateString("de-DE");
  const deadline = new Date(date);
  deadline.setDate(deadline.getDate() + 21);
  const titles = reasons.map(r => REASONS.find(x => x.id === r)?.title).filter(Boolean);
  const docId = "KH-" + Math.random().toString(36).slice(2,8).toUpperCase();

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Kündigungsschutzklage - ${personal.name}</title>
<style>
  @page { margin: 22mm 25mm 20mm 25mm; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Times New Roman", Times, serif; font-size: 11.5pt; color: #111; line-height: 1.55; background: #fff; }
  .doc-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 5mm; border-bottom: 0.5pt solid #ccc; margin-bottom: 7mm; }
  .doc-header-logo { font-family: Arial, Helvetica, sans-serif; font-size: 13pt; font-weight: 800; letter-spacing: -0.3px; }
  .doc-header-logo span { background: #111; color: #fff; padding: 1px 7px 2px; border-radius: 5px; margin-right: 4px; }
  .doc-header-meta { font-family: Arial, sans-serif; font-size: 8pt; color: #888; text-align: right; line-height: 1.6; }
  .sender { margin-bottom: 7mm; }
  .sender-name { font-weight: bold; font-size: 12pt; }
  .sender p { line-height: 1.6; font-size: 11pt; }
  .recipient { margin: 6mm 0 10mm; }
  .recipient p { line-height: 1.6; }
  .place-date { text-align: right; margin-bottom: 10mm; font-size: 11pt; }
  .subject { font-family: Arial, sans-serif; font-weight: 800; font-size: 14pt; letter-spacing: -0.3px; margin-bottom: 7mm; }
  .parties-box { border: 0.5pt solid #ddd; border-radius: 6px; padding: 4mm 5mm; margin-bottom: 8mm; display: grid; grid-template-columns: 28mm 1fr; gap: 3mm 0; }
  .party-label { font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; padding-top: 1mm; }
  .party-value { font-size: 11pt; line-height: 1.5; }
  .party-divider { grid-column: 1/-1; border-top: 0.5pt solid #eee; margin: 1mm 0; }
  .divider { border: none; border-top: 0.5pt solid #ccc; margin: 7mm 0; }
  .section-label { font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 3mm; }
  .body-text { margin-bottom: 5mm; text-align: justify; font-size: 11pt; line-height: 1.6; }
  .petition-box { border-left: 2.5pt solid #111; padding: 3mm 5mm; margin: 5mm 0 6mm; background: #fafafa; font-style: italic; font-size: 11pt; line-height: 1.6; }
  .reason-item { display: flex; gap: 4mm; margin-bottom: 2.5mm; font-size: 11pt; }
  .reason-num { font-weight: bold; min-width: 5mm; }
  .frist-warning { border: 1pt solid #f59e0b; border-radius: 5px; padding: 3mm 4mm; margin: 7mm 0; background: #fffbeb; }
  .frist-warning p { font-family: Arial, sans-serif; font-size: 9pt; color: #92400e; font-weight: 600; }
  .signature-block { margin-top: 18mm; }
  .sig-line { border-bottom: 0.5pt solid #111; width: 65mm; margin-bottom: 2mm; }
  .sig-name { font-family: Arial, sans-serif; font-size: 10pt; font-weight: 600; }
  .sig-place { font-family: Arial, sans-serif; font-size: 9.5pt; color: #666; margin-top: 1mm; }
  .doc-footer { margin-top: 14mm; padding-top: 4mm; border-top: 0.5pt solid #e5e5e5; display: flex; justify-content: space-between; align-items: flex-start; }
  .doc-footer-left { font-family: Arial, sans-serif; font-size: 8pt; color: #aaa; line-height: 1.6; max-width: 110mm; }
  .doc-footer-badge { font-family: Arial, sans-serif; font-size: 7.5pt; background: #f5f5f5; border: 0.5pt solid #e5e5e5; border-radius: 4px; padding: 2mm 3mm; color: #555; text-align: center; white-space: nowrap; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>
<div class="doc-header">
  <div class="doc-header-logo"><span>K</span>ündigungsHeld</div>
  <div class="doc-header-meta">Dokument-ID: ${docId}<br>Erstellt am: ${today}<br>Rechtssicheres Dokument</div>
</div>
<div class="sender">
  <p class="sender-name">${personal.name}</p>
  <p>${personal.address}</p>
  <p>${personal.plz} ${personal.city}</p>
</div>
<div class="recipient">
  <p><strong>An das</strong></p>
  <p><strong>Arbeitsgericht ${employer.city}</strong></p>
  <p>- Eingangsgeschaeftsstelle -</p>
</div>
<p class="place-date">${personal.city}, den ${today}</p>
<p class="subject">Kuendigungsschutzklage</p>
<div class="parties-box">
  <span class="party-label">Klaeger/in</span>
  <span class="party-value"><strong>${personal.name}</strong><br>${personal.address}, ${personal.plz} ${personal.city}</span>
  <div class="party-divider"></div>
  <span class="party-label">Beklagte/r</span>
  <span class="party-value"><strong>${employer.name}</strong><br>${employer.address}, ${employer.plz} ${employer.city}</span>
</div>
<p class="section-label">Rechtsgrundlage</p>
<p class="body-text">§ 4 Kuendigungsschutzgesetz (KSchG) - Frist: 21 Tage ab Zugang der Kuendigung</p>
<hr class="divider">
<p class="section-label">Klageantrag</p>
<p class="body-text">Ich erhebe Klage gegen die Kuendigung vom <strong>${kuendigungDatum}</strong> und beantrage, das Gericht moege feststellen:</p>
<div class="petition-box">Das Arbeitsverhaeltnis zwischen den Parteien ist durch die Kuendigung vom ${kuendigungDatum} nicht aufgeloest worden und besteht unveraendert fort.</div>
<p class="section-label" style="margin-top:7mm">Begruendung</p>
<p class="body-text">Die Kuendigung ist sozial ungerechtfertigt im Sinne des § 1 KSchG und rechtsunwirksam aus folgenden Gruenden:</p>
${titles.map((t, i) => `<div class="reason-item"><span class="reason-num">${i+1}.</span><span>${t}</span></div>`).join("")}
<p class="body-text" style="margin-top:5mm">Ich behalte mir vor, die Begruendung nach Einsicht in die vollstaendigen Kuendigungsunterlagen zu ergaenzen.</p>
<p class="section-label">Beweisangebot</p>
<p class="body-text">Zeugnis: Betriebsrat und weitere benannte Personen. Urkunden: Arbeitsvertrag, Kuendigungsschreiben sowie alle weiteren relevanten Dokumente (werden nachgereicht).</p>
<p class="body-text">Ich bitte das Gericht, gemass § 54 ArbGG einen <strong>Guetetermin</strong> anzuberaumen.</p>
<div class="frist-warning">
  <p>Fristhinweis: Die Klagefrist gem. § 4 KSchG endet am <strong>${deadline.toLocaleDateString("de-DE")}</strong>. Eine Klageerhebung nach diesem Datum ist nur in Ausnahmefaellen moeglich (§ 5 KSchG).</p>
</div>
<div class="signature-block">
  <p style="margin-bottom:14mm; font-size:11pt;">Mit freundlichen Gruessen,</p>
  <div class="sig-line"></div>
  <p class="sig-name">${personal.name}</p>
  <p class="sig-place">${personal.city}, den ${today}</p>
</div>
<div class="doc-footer">
  <div class="doc-footer-left">Erstellt mit KuendigungsHeld (kundigungsheld.de) · Dieses Dokument ersetzt keine anwaltliche Rechtsberatung. Bei Unsicherheiten empfehlen wir die Konsultation eines Fachanwalts fuer Arbeitsrecht.</div>
  <div class="doc-footer-badge">PDF bereit<br>Sofort-Download</div>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => setTimeout(() => { win.print(); URL.revokeObjectURL(url); }, 600);
  }
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function KuendigungsschutzPage() {
  const [step, setStep]         = useState(0);
  const [date, setDate]         = useState("");
  const [personal, setPersonal] = useState({ name: "", address: "", plz: "", city: "" });
  const [employer, setEmployer] = useState({ name: "", address: "", plz: "", city: "" });
  const [reasons, setReasons]   = useState([]);
  const [copied, setCopied]     = useState(false);

  const countdown = useCountdown(date);
  const urgency   = countdown.days <= 3 ? "red" : countdown.days <= 7 ? "amber" : "green";

  const canAdvance = () => {
    if (step === 0) return !!date && !countdown.expired;
    if (step === 1) return personal.name && personal.address && personal.plz && personal.city;
    if (step === 2) return employer.name && employer.address && employer.plz && employer.city;
    if (step === 3) return reasons.length > 0;
    return true;
  };

  const toggle = (id) => setReasons(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);

  const previewText = step === 4 ? [
    personal.name, personal.address, `${personal.plz} ${personal.city}`, "",
    `An das Arbeitsgericht ${employer.city}`, "",
    `${personal.city}, den ${new Date().toLocaleDateString("de-DE")}`, "",
    "KUENDIGUNGSSCHUTZKLAGE gem. § 4 KSchG",
    "─".repeat(44), "",
    `Klaeger/in:  ${personal.name}`,
    `Beklagte/r:  ${employer.name}`, "",
    `Klage gegen Kuendigung vom ${new Date(date).toLocaleDateString("de-DE")}`, "",
    "Begruendung:", "",
    ...reasons.map((r, i) => `${i+1}. ${REASONS.find(x => x.id === r)?.title}`), "",
    "Mit freundlichen Gruessen,", "", "_".repeat(32), personal.name,
  ].join("\n") : "";

  const copy = () => { navigator.clipboard.writeText(previewText); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const inputCls = "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-all";
  const labelCls = "block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5";

  return (
    <div className="min-h-screen bg-background">

      {/* TOP NAV */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">KündigungsHeld</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            Startseite
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="border-b border-border/50 bg-foreground text-background">
        <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6 lg:py-12">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/10 text-2xl">⚖️</div>
            <div>
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-background/15 px-2.5 py-0.5 text-xs font-bold text-background/90">NEU</span>
                <span className="text-xs text-background/40">§ 4 KSchG · Kostenlos</span>
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight lg:text-3xl">Kündigung anfechten</h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-background/55">
                Erstellen Sie Ihre Kündigungsschutzklage — als professionelles PDF, druckfertig, in 5 Minuten.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1">
                <span className="text-xs">⏱</span>
                <span className="text-xs font-semibold text-amber-300">Gesetzliche Frist: 21 Tage ab Zugang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEPPER */}
      <div className="border-b border-border/50 bg-background">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <div className="flex items-center py-3 gap-0 overflow-x-auto scrollbar-hide">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center shrink-0">
                <button onClick={() => i < step && setStep(i)} disabled={i >= step}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 disabled:cursor-default">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                    i < step ? "bg-foreground text-background" :
                    i === step ? "bg-foreground text-background ring-2 ring-foreground/20 ring-offset-1" :
                    "bg-secondary text-muted-foreground"
                  }`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`hidden text-xs font-medium sm:block whitespace-nowrap ${
                    i === step ? "text-foreground" : i < step ? "text-muted-foreground" : "text-muted-foreground/40"
                  }`}>{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-4 mx-1 shrink-0 transition-colors ${i < step ? "bg-foreground" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="h-0.5 bg-secondary">
            <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="mx-auto max-w-3xl px-4 py-6 pb-20 lg:px-6">

        {/* Trust badges */}
        <div className="mb-5 flex flex-wrap gap-2">
          {[
            { icon: "🔒", text: "DSGVO-konform",  sub: "Keine Datenspeicherung" },
            { icon: "⚖️", text: "Rechtssicher",   sub: "§ 4 KSchG" },
            { icon: "🆓", text: "Kostenlos",       sub: "Keine Registrierung" },
          ].map(b => (
            <div key={b.text} className="flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 px-3 py-2">
              <span className="text-sm">{b.icon}</span>
              <div>
                <p className="text-xs font-semibold text-foreground leading-none">{b.text}</p>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CARD */}
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card">

          {/* STEP 0 */}
          {step === 0 && (
            <div className="p-6 lg:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight mb-1">Wann haben Sie die Kündigung erhalten?</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Geben Sie das Eingangsdatum an — wir berechnen automatisch Ihre verbleibende Klagefrist.</p>
              <input type="date" value={date} max={new Date().toISOString().split("T")[0]}
                onChange={e => setDate(e.target.value)} className={inputCls} />

              {date && !countdown.expired && (
                <div className={`mt-5 rounded-2xl border p-5 ${
                  urgency === "red"   ? "border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-950/20" :
                  urgency === "amber" ? "border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/20" :
                  "border-border/50 bg-secondary/30"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-widest ${
                      urgency === "red" ? "text-red-600 dark:text-red-400" :
                      urgency === "amber" ? "text-amber-600 dark:text-amber-400" :
                      "text-muted-foreground"
                    }`}>
                      {urgency === "red" ? "⚠️ Sehr dringend!" : urgency === "amber" ? "⏳ Bald ablaufend" : "⏱ Verbleibende Frist"}
                    </span>
                    <span className="text-xs text-muted-foreground">bis {countdown.deadline?.toLocaleDateString("de-DE")}</span>
                  </div>
                  <div className="flex gap-5 mb-4">
                    {[{ v: countdown.days, u: "Tage" }, { v: countdown.hours, u: "Std" }, { v: countdown.minutes, u: "Min" }, { v: countdown.seconds, u: "Sek" }].map(({ v, u }) => (
                      <div key={u} className="text-center">
                        <div className={`font-display text-3xl font-bold tabular-nums leading-none lg:text-4xl ${
                          urgency === "red" ? "text-red-600 dark:text-red-400" :
                          urgency === "amber" ? "text-amber-600 dark:text-amber-400" : "text-foreground"
                        }`}>{String(v).padStart(2, "0")}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">{u}</div>
                      </div>
                    ))}
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-border/50 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${
                      urgency === "red" ? "bg-red-500" : urgency === "amber" ? "bg-amber-500" : "bg-foreground"
                    }`} style={{ width: `${countdown.percent}%` }} />
                  </div>
                </div>
              )}

              {countdown.expired && (
                <div className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
                  <p className="font-semibold text-destructive text-sm mb-1">⚠️ Klagefrist abgelaufen</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Die 21-Tage-Frist ist verstrichen. In Ausnahmefällen ist nachträgliche Zulassung möglich (§ 5 KSchG) — wenden Sie sich an einen Fachanwalt.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 1 & 2 */}
          {(step === 1 || step === 2) && (
            <div className="p-6 lg:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight mb-1">
                {step === 1 ? "Ihre persönlichen Daten" : "Daten des Arbeitgebers"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {step === 1 ? "Erscheinen als Kläger/in in der Klageschrift." : "Erscheinen als Beklagte/r in der Klageschrift."}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { key: "name",    label: step === 1 ? "Vor- und Nachname" : "Firmenname",  placeholder: step === 1 ? "Max Mustermann" : "Musterfirma GmbH", full: true },
                  { key: "address", label: "Straße und Hausnummer", placeholder: "Musterstraße 1", full: true },
                  { key: "plz",     label: "PLZ",   placeholder: "10115", full: false },
                  { key: "city",    label: "Stadt",  placeholder: "Berlin", full: false },
                ].map(f => {
                  const data = step === 1 ? personal : employer;
                  const setData = step === 1 ? setPersonal : setEmployer;
                  return (
                    <div key={f.key} className={f.full ? "sm:col-span-2" : ""}>
                      <label className={labelCls}>{f.label}</label>
                      <input className={inputCls} placeholder={f.placeholder} value={data[f.key]}
                        onChange={e => setData(p => ({ ...p, [f.key]: e.target.value }))} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="p-6 lg:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight mb-1">Warum ist die Kündigung unwirksam?</h2>
              <p className="text-sm text-muted-foreground mb-6">Mehrfachauswahl möglich.</p>
              <div className="flex flex-col gap-2.5">
                {REASONS.map(r => {
                  const active = reasons.includes(r.id);
                  return (
                    <button key={r.id} onClick={() => toggle(r.id)}
                      className={`flex items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-150 ${
                        active ? "border-foreground bg-foreground/5" : "border-border/50 bg-background hover:border-border hover:bg-secondary/30"
                      }`}>
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        active ? "border-foreground bg-foreground" : "border-border"
                      }`}>
                        {active && <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm">{r.icon}</span>
                          <span className="text-sm font-semibold text-foreground">{r.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 dark:border-green-900/30 dark:bg-green-950/20 p-4 mb-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">✓</div>
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Klageschrift erfolgreich erstellt</p>
                  <p className="text-xs text-green-700 dark:text-green-400 mt-0.5 leading-relaxed">Laden Sie das PDF herunter und reichen Sie es beim zuständigen Arbeitsgericht ein.</p>
                </div>
              </div>

              {/* PDF CTA */}
              <button onClick={() => generateAndPrintPDF({ personal, employer, reasons, date })}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-foreground text-background py-4 text-base font-bold hover:bg-foreground/90 transition-all mb-2 shadow-elegant">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                PDF herunterladen &amp; Drucken
              </button>
              <p className="text-center text-xs text-muted-foreground mb-6">Im Browser öffnen → Als PDF speichern oder direkt drucken</p>

              {/* Steps */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { n: "1", t: "PDF speichern", d: "Druckfertig" },
                  { n: "2", t: "Arbeitsgericht", d: "Einreichen" },
                  { n: "3", t: "Gütetermin", d: "Beide Parteien" },
                ].map(ns => (
                  <div key={ns.n} className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 p-3 text-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">{ns.n}</div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{ns.t}</p>
                    <p className="text-[10px] text-muted-foreground">{ns.d}</p>
                  </div>
                ))}
              </div>

              {/* Text preview */}
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <div className="flex items-center justify-between border-b border-border/50 bg-secondary/50 px-4 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Textvorschau</span>
                  <button onClick={copy} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    copied ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}>
                    {copied ? "✓ Kopiert" : "Kopieren"}
                  </button>
                </div>
                <textarea readOnly value={previewText}
                  className="w-full min-h-48 resize-y bg-background p-4 font-mono text-[11px] leading-relaxed text-foreground focus:outline-none" />
              </div>
            </div>
          )}

          {/* NAV */}
          <div className="flex items-center justify-between border-t border-border/50 bg-secondary/20 px-6 py-4">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                Zurück
              </button>
            ) : <div />}
            {step < 4 && (
              <button disabled={!canAdvance()} onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-1.5 rounded-xl bg-foreground px-5 py-2.5 text-sm font-bold text-background hover:bg-foreground/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                {step === 3 ? "Klageschrift erstellen" : "Weiter"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground/50 leading-relaxed max-w-md mx-auto">
          Dieses Tool ersetzt keine anwaltliche Beratung. Bei komplexen Fällen empfehlen wir einen Fachanwalt für Arbeitsrecht.
        </p>
      </main>
    </div>
  );
}