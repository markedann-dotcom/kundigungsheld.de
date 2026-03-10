"use client";
import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 0, key: "deadline",   label: "Fristberechnung",    short: "Frist"     },
  { id: 1, key: "personal",   label: "Ihre Daten",         short: "Daten"     },
  { id: 2, key: "employer",   label: "Arbeitgeber",        short: "AG"        },
  { id: 3, key: "reasons",    label: "Kündigungsgrund",    short: "Grund"     },
  { id: 4, key: "result",     label: "Klageschrift",       short: "Klagschrift"},
];

const REASONS = [
  { id: "sozialauswahl",  title: "Fehlerhafte Sozialauswahl",       desc: "Bei betriebsbedingter Kündigung wurden Sozialdaten nicht korrekt berücksichtigt." },
  { id: "betriebsrat",    title: "Betriebsrat nicht angehört",      desc: "Der Betriebsrat wurde vor der Kündigung nicht ordnungsgemäß konsultiert." },
  { id: "formfehler",     title: "Formfehler",                      desc: "Die Kündigung erfolgte nicht schriftlich oder fehlt eine eigenhändige Unterschrift." },
  { id: "diskriminierung",title: "Diskriminierung (AGG)",           desc: "Verdacht auf Kündigung wegen Geschlecht, Alter, Religion, Herkunft o.ä." },
  { id: "sonderschutz",   title: "Sonderkündigungsschutz",          desc: "Schwangerschaft, Schwerbehinderung, Betriebsratsmitgliedschaft, Elternzeit." },
  { id: "sonstige",       title: "Sonstiger Grund",                 desc: "Ein anderer Grund macht die Kündigung unwirksam." },
];

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────

function useCountdown(kuendigungDate) {
  const [state, setState] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false, percent: 0 });

  useEffect(() => {
    if (!kuendigungDate) return;
    const deadline = new Date(kuendigungDate);
    deadline.setDate(deadline.getDate() + 21);

    const tick = () => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) { setState(s => ({ ...s, expired: true })); return; }
      const total = 21 * 24 * 60 * 60 * 1000;
      const elapsed = total - diff;
      const percent = Math.min((elapsed / total) * 100, 100);
      setState({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false,
        percent,
        deadline,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [kuendigungDate]);

  return state;
}

// ─── TEMPLATE ────────────────────────────────────────────────────────────────

function generateKlageschrift({ personal, employer, reasons, kuendigungDate }) {
  const today = new Date().toLocaleDateString("de-DE");
  const reasonTitles = reasons.map(r => REASONS.find(x => x.id === r)?.title).filter(Boolean);

  return `${personal.name}
${personal.address}
${personal.plz} ${personal.city}

An das
Arbeitsgericht ${employer.city || "[Stadt]"}
– Klageschrift –

${personal.city}, den ${today}

Klage
des/der ${personal.name}, wohnhaft ${personal.address}, ${personal.plz} ${personal.city}
– Kläger/in –

gegen

${employer.name}, vertreten durch die Geschäftsführung,
${employer.address}, ${employer.plz} ${employer.city}
– Beklagte –

wegen: Kündigungsschutzklage gem. § 4 KSchG

──────────────────────────────────────────

Ich erhebe Klage gegen die Kündigung vom ${new Date(kuendigungDate).toLocaleDateString("de-DE")} und beantrage festzustellen, dass das Arbeitsverhältnis durch die Kündigung nicht aufgelöst worden ist.

Begründung:

Die Kündigung ist aus folgenden Gründen sozial ungerechtfertigt und damit unwirksam:

${reasonTitles.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Ich bitte das Gericht, einen Gütetermin anzuberaumen.

Mit freundlichen Grüßen,

_______________________________
${personal.name}`;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function KuendigungsschutzPage() {
  const [step, setStep] = useState(0);
  const [kuendigungDate, setKuendigungDate] = useState("");
  const [personal, setPersonal]   = useState({ name: "", address: "", plz: "", city: "" });
  const [employer, setEmployer]   = useState({ name: "", address: "", plz: "", city: "" });
  const [reasons, setReasons]     = useState([]);
  const [copied, setCopied]       = useState(false);

  const countdown = useCountdown(kuendigungDate);

  const urgencyColor = countdown.days <= 3
    ? "#ef4444"
    : countdown.days <= 7
    ? "#f59e0b"
    : "#22c55e";

  const toggleReason = (id) =>
    setReasons(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);

  const canAdvance = () => {
    if (step === 0) return !!kuendigungDate && !countdown.expired;
    if (step === 1) return personal.name && personal.address && personal.plz && personal.city;
    if (step === 2) return employer.name && employer.address && employer.plz && employer.city;
    if (step === 3) return reasons.length > 0;
    return true;
  };

  const klageschrift = step === 4
    ? generateKlageschrift({ personal, employer, reasons, kuendigungDate })
    : "";

  const copyText = () => {
    navigator.clipboard.writeText(klageschrift);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.page}>
      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚖</span>
            <span style={styles.logoText}>Kündigungs<strong>held</strong></span>
          </div>
          <div style={styles.badge}>Kostenlose Klageschrift</div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <p style={styles.heroEyebrow}>Wurden Sie ungerechtfertigt gekündigt?</p>
          <h1 style={styles.heroTitle}>
            Kündigungsschutzklage<br />
            <span style={styles.heroAccent}>in 5 Minuten</span>
          </h1>
          <p style={styles.heroSub}>
            Erstellen Sie Ihre Klageschrift nach § 4 KSchG — kostenlos, sicher, gerichtsfähig.
            <br />Die gesetzliche Frist beträgt <strong>21 Tage</strong> ab Zugang der Kündigung.
          </p>
        </div>
        <div style={styles.heroPattern} aria-hidden="true">
          {"§ ".repeat(80)}
        </div>
      </section>

      {/* ── MAIN ── */}
      <main style={styles.main}>

        {/* STEPPER */}
        <nav style={styles.stepper}>
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              style={{
                ...styles.stepItem,
                ...(i === step ? styles.stepActive : {}),
                ...(i < step  ? styles.stepDone  : {}),
              }}
              onClick={() => i < step && setStep(i)}
            >
              <div style={{
                ...styles.stepDot,
                background: i < step ? "#1a1a2e" : i === step ? "#c8a84b" : "#e5e7eb",
                color:      i < step ? "#fff"    : i === step ? "#1a1a2e" : "#9ca3af",
              }}>
                {i < step ? "✓" : i + 1}
              </div>
              <span style={styles.stepLabel}>{s.short}</span>
            </div>
          ))}
          <div style={styles.stepLine} />
        </nav>

        {/* CARD */}
        <div style={styles.card}>

          {/* ── STEP 0: DEADLINE ── */}
          {step === 0 && (
            <div style={styles.stepContent}>
              <h2 style={styles.cardTitle}>Wann haben Sie die Kündigung erhalten?</h2>
              <p style={styles.cardDesc}>
                Geben Sie das Datum des Zugangs der Kündigung ein. Wir berechnen Ihre verbleibende Klagefrist.
              </p>
              <input
                type="date"
                value={kuendigungDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={e => setKuendigungDate(e.target.value)}
                style={styles.dateInput}
              />

              {kuendigungDate && !countdown.expired && (
                <div style={styles.timerCard}>
                  <p style={{ ...styles.timerLabel, color: urgencyColor }}>
                    {countdown.days <= 3 ? "⚠ Dringlich! Nur noch" : "Verbleibende Frist"}
                  </p>
                  <div style={styles.timerDigits}>
                    {[
                      { v: countdown.days,    u: "Tage"    },
                      { v: countdown.hours,   u: "Stunden" },
                      { v: countdown.minutes, u: "Min"     },
                      { v: countdown.seconds, u: "Sek"     },
                    ].map(({ v, u }) => (
                      <div key={u} style={styles.timerUnit}>
                        <span style={{ ...styles.timerNumber, color: urgencyColor }}>
                          {String(v).padStart(2, "0")}
                        </span>
                        <span style={styles.timerUnitLabel}>{u}</span>
                      </div>
                    ))}
                  </div>
                  {/* Progress bar */}
                  <div style={styles.progressTrack}>
                    <div style={{ ...styles.progressFill, width: `${countdown.percent}%`, background: urgencyColor }} />
                  </div>
                  <p style={styles.timerDeadlineText}>
                    Klagefrist endet am: <strong>{countdown.deadline?.toLocaleDateString("de-DE")}</strong>
                  </p>
                </div>
              )}

              {countdown.expired && (
                <div style={styles.expiredBox}>
                  <p style={styles.expiredTitle}>⚠ Klagefrist abgelaufen</p>
                  <p style={styles.expiredDesc}>
                    Die 21-Tage-Frist ist leider verstrichen. Bitte wenden Sie sich umgehend an einen Fachanwalt für Arbeitsrecht — in Ausnahmefällen ist eine nachträgliche Zulassung der Klage möglich (§ 5 KSchG).
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 1: PERSONAL ── */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <h2 style={styles.cardTitle}>Ihre persönlichen Daten</h2>
              <p style={styles.cardDesc}>Diese Angaben erscheinen als Kläger/in in der Klageschrift.</p>
              <div style={styles.formGrid}>
                {[
                  { key: "name",    label: "Vor- und Nachname",  placeholder: "Max Mustermann",  full: true  },
                  { key: "address", label: "Straße und Hausnr.", placeholder: "Musterstr. 1",    full: true  },
                  { key: "plz",     label: "PLZ",                placeholder: "10115",            full: false },
                  { key: "city",    label: "Stadt",              placeholder: "Berlin",           full: false },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
                    <label style={styles.fieldLabel}>{f.label}</label>
                    <input
                      style={styles.input}
                      placeholder={f.placeholder}
                      value={personal[f.key]}
                      onChange={e => setPersonal(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: EMPLOYER ── */}
          {step === 2 && (
            <div style={styles.stepContent}>
              <h2 style={styles.cardTitle}>Daten des Arbeitgebers</h2>
              <p style={styles.cardDesc}>Diese Angaben erscheinen als Beklagte/r in der Klageschrift.</p>
              <div style={styles.formGrid}>
                {[
                  { key: "name",    label: "Firmenname",         placeholder: "Musterfirma GmbH", full: true  },
                  { key: "address", label: "Straße und Hausnr.", placeholder: "Firmenstr. 5",     full: true  },
                  { key: "plz",     label: "PLZ",                placeholder: "10115",             full: false },
                  { key: "city",    label: "Stadt",              placeholder: "Berlin",            full: false },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
                    <label style={styles.fieldLabel}>{f.label}</label>
                    <input
                      style={styles.input}
                      placeholder={f.placeholder}
                      value={employer[f.key]}
                      onChange={e => setEmployer(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: REASONS ── */}
          {step === 3 && (
            <div style={styles.stepContent}>
              <h2 style={styles.cardTitle}>Warum ist die Kündigung unwirksam?</h2>
              <p style={styles.cardDesc}>Wählen Sie alle zutreffenden Gründe aus (Mehrfachauswahl möglich).</p>
              <div style={styles.reasonsGrid}>
                {REASONS.map(r => {
                  const active = reasons.includes(r.id);
                  return (
                    <div
                      key={r.id}
                      style={{ ...styles.reasonCard, ...(active ? styles.reasonCardActive : {}) }}
                      onClick={() => toggleReason(r.id)}
                    >
                      <div style={styles.reasonCheck}>
                        {active ? "✓" : "○"}
                      </div>
                      <div>
                        <p style={styles.reasonTitle}>{r.title}</p>
                        <p style={styles.reasonDesc}>{r.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 4: RESULT ── */}
          {step === 4 && (
            <div style={styles.stepContent}>
              <div style={styles.successBanner}>
                <span style={styles.successIcon}>✓</span>
                <div>
                  <p style={styles.successTitle}>Ihre Klageschrift ist fertig</p>
                  <p style={styles.successDesc}>Kopieren Sie den Text, drucken Sie ihn aus und reichen Sie ihn beim zuständigen Arbeitsgericht ein.</p>
                </div>
              </div>
              <div style={styles.nextSteps}>
                {[
                  { n: "1", t: "Klageschrift ausdrucken",    d: "Text kopieren und auf weißem Papier ausdrucken" },
                  { n: "2", t: "Zum Arbeitsgericht",          d: "Persönlich einreichen oder per Einschreiben senden" },
                  { n: "3", t: "Gütetermin abwarten",         d: "Das Gericht lädt beide Parteien zum Gütegespräch" },
                ].map(ns => (
                  <div key={ns.n} style={styles.nextStep}>
                    <div style={styles.nextStepNum}>{ns.n}</div>
                    <div>
                      <p style={styles.nextStepTitle}>{ns.t}</p>
                      <p style={styles.nextStepDesc}>{ns.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.textareaWrap}>
                <div style={styles.textareaHeader}>
                  <span style={styles.textareaHeaderLabel}>Klageschrift gem. § 4 KSchG</span>
                  <button style={styles.copyBtn} onClick={copyText}>
                    {copied ? "✓ Kopiert" : "Kopieren"}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={klageschrift}
                  style={styles.textarea}
                />
              </div>
            </div>
          )}

          {/* NAV BUTTONS */}
          <div style={styles.navRow}>
            {step > 0 && (
              <button style={styles.btnSecondary} onClick={() => setStep(s => s - 1)}>
                ← Zurück
              </button>
            )}
            {step < 4 && (
              <button
                style={{ ...styles.btnPrimary, ...(canAdvance() ? {} : styles.btnDisabled) }}
                disabled={!canAdvance()}
                onClick={() => setStep(s => s + 1)}
              >
                {step === 3 ? "Klageschrift erstellen →" : "Weiter →"}
              </button>
            )}
          </div>
        </div>

        {/* INFO STRIP */}
        <div style={styles.infoStrip}>
          {[
            { icon: "🔒", text: "Ihre Daten verlassen nicht diesen Browser" },
            { icon: "⚖️", text: "Basierend auf § 4 KSchG" },
            { icon: "🆓", text: "100% kostenlos" },
          ].map(i => (
            <div key={i.text} style={styles.infoItem}>
              <span>{i.icon}</span>
              <span style={styles.infoText}>{i.text}</span>
            </div>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Kündigungsheld · Kein Rechtsanwalt · Kein Rechtsbeistand</p>
      </footer>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const C = {
  bg:       "#f7f5f0",
  surface:  "#ffffff",
  dark:     "#1a1a2e",
  gold:     "#c8a84b",
  goldDim:  "#e8d5a0",
  text:     "#1a1a2e",
  muted:    "#6b7280",
  border:   "#e5e0d5",
  red:      "#ef4444",
};

const styles = {
  page:    { fontFamily: "'Georgia', 'Times New Roman', serif", background: C.bg, minHeight: "100vh", color: C.text },
  header:  { background: C.dark, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" },
  headerInner: { maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 },
  logo:    { display: "flex", alignItems: "center", gap: 10 },
  logoIcon:{ fontSize: 22, color: C.gold },
  logoText:{ fontSize: 20, color: "#fff", letterSpacing: "-0.3px" },
  badge:   { fontSize: 11, background: C.gold, color: C.dark, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: "0.5px" },

  hero:     { background: C.dark, color: "#fff", padding: "60px 24px 50px", position: "relative", overflow: "hidden" },
  heroInner:{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 },
  heroEyebrow:{ fontFamily: "sans-serif", fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", color: C.goldDim, marginBottom: 12 },
  heroTitle:{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "normal", lineHeight: 1.15, margin: "0 0 16px" },
  heroAccent:{ color: C.gold, fontStyle: "italic" },
  heroSub:  { fontSize: 16, lineHeight: 1.7, color: "#c9c9c9", fontFamily: "sans-serif", maxWidth: 540 },
  heroPattern:{ position: "absolute", top: 0, right: 0, width: 400, height: "100%", fontSize: 13, lineHeight: 2, color: "rgba(200,168,75,0.07)", wordBreak: "break-all", overflow: "hidden", zIndex: 1, fontFamily: "monospace" },

  main:    { maxWidth: 780, margin: "0 auto", padding: "40px 20px 60px" },

  stepper: { display: "flex", justifyContent: "center", alignItems: "center", gap: 0, marginBottom: 32, position: "relative" },
  stepLine:{ position: "absolute", top: 16, left: "10%", right: "10%", height: 2, background: C.border, zIndex: 0 },
  stepItem:{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "default", zIndex: 1, flex: 1 },
  stepDot: { width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, transition: "all 0.3s" },
  stepLabel:{ fontSize: 10, fontFamily: "sans-serif", color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px" },
  stepActive:{ "& $stepLabel": { color: C.gold } },
  stepDone:  { cursor: "pointer" },

  card:    { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "36px 40px", boxShadow: "0 4px 24px rgba(26,26,46,0.06)" },
  stepContent:{ minHeight: 320 },
  cardTitle:{ fontSize: "1.5rem", fontWeight: "normal", margin: "0 0 8px", letterSpacing: "-0.3px" },
  cardDesc: { fontFamily: "sans-serif", fontSize: 14, color: C.muted, margin: "0 0 28px", lineHeight: 1.6 },

  dateInput:{ width: "100%", padding: "14px 16px", fontSize: 16, fontFamily: "sans-serif", border: `2px solid ${C.border}`, borderRadius: 8, background: C.bg, color: C.text, boxSizing: "border-box", outline: "none" },

  timerCard:   { marginTop: 28, background: C.dark, borderRadius: 10, padding: "24px 28px" },
  timerLabel:  { fontFamily: "sans-serif", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 16px" },
  timerDigits: { display: "flex", gap: 20, marginBottom: 20 },
  timerUnit:   { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  timerNumber: { fontFamily: "monospace", fontSize: 36, fontWeight: 700, lineHeight: 1 },
  timerUnitLabel:{ fontFamily: "sans-serif", fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "1px" },
  progressTrack:{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", marginBottom: 12 },
  progressFill: { height: "100%", borderRadius: 4, transition: "width 1s linear" },
  timerDeadlineText:{ fontFamily: "sans-serif", fontSize: 13, color: "#aaa", margin: 0 },

  expiredBox:  { marginTop: 24, border: `2px solid ${C.red}`, borderRadius: 10, padding: "20px 24px", background: "#fff5f5" },
  expiredTitle:{ fontFamily: "sans-serif", fontWeight: 700, color: C.red, margin: "0 0 8px" },
  expiredDesc: { fontFamily: "sans-serif", fontSize: 14, color: "#7f1d1d", margin: 0, lineHeight: 1.6 },

  formGrid:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" },
  fieldLabel:{ display: "block", fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 },
  input:     { width: "100%", padding: "12px 14px", fontFamily: "sans-serif", fontSize: 15, border: `2px solid ${C.border}`, borderRadius: 8, background: C.bg, color: C.text, boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" },

  reasonsGrid:    { display: "flex", flexDirection: "column", gap: 10 },
  reasonCard:     { display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", border: `2px solid ${C.border}`, borderRadius: 10, cursor: "pointer", transition: "all 0.15s", background: C.bg },
  reasonCardActive:{ borderColor: C.gold, background: "#fffbf0" },
  reasonCheck:    { width: 22, height: 22, borderRadius: "50%", border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.gold, flexShrink: 0, marginTop: 2, fontWeight: 700 },
  reasonTitle:    { fontFamily: "sans-serif", fontWeight: 600, fontSize: 14, margin: "0 0 3px" },
  reasonDesc:     { fontFamily: "sans-serif", fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 },

  successBanner:  { display: "flex", gap: 16, alignItems: "flex-start", background: "#f0fdf4", border: "2px solid #22c55e", borderRadius: 10, padding: "16px 20px", marginBottom: 24 },
  successIcon:    { width: 28, height: 28, background: "#22c55e", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 },
  successTitle:   { fontFamily: "sans-serif", fontWeight: 700, fontSize: 15, margin: "0 0 4px" },
  successDesc:    { fontFamily: "sans-serif", fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 },

  nextSteps:   { display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 },
  nextStep:    { display: "flex", gap: 14, alignItems: "flex-start" },
  nextStepNum: { width: 26, height: 26, background: C.dark, color: C.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, fontFamily: "sans-serif" },
  nextStepTitle:{ fontFamily: "sans-serif", fontWeight: 600, fontSize: 14, margin: "0 0 2px" },
  nextStepDesc: { fontFamily: "sans-serif", fontSize: 13, color: C.muted, margin: 0 },

  textareaWrap:   { border: `2px solid ${C.border}`, borderRadius: 10, overflow: "hidden" },
  textareaHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: C.dark },
  textareaHeaderLabel:{ fontFamily: "sans-serif", fontSize: 12, color: C.goldDim, letterSpacing: "1px", textTransform: "uppercase" },
  copyBtn:        { fontFamily: "sans-serif", fontSize: 12, fontWeight: 700, background: C.gold, color: C.dark, border: "none", padding: "6px 16px", borderRadius: 6, cursor: "pointer" },
  textarea:       { width: "100%", minHeight: 320, padding: 20, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8, border: "none", background: "#fafaf7", resize: "vertical", boxSizing: "border-box", color: C.text },

  navRow:      { display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` },
  btnPrimary:  { fontFamily: "sans-serif", fontWeight: 700, fontSize: 15, background: C.dark, color: "#fff", border: "none", padding: "13px 28px", borderRadius: 8, cursor: "pointer", transition: "background 0.2s" },
  btnSecondary:{ fontFamily: "sans-serif", fontSize: 14, background: "transparent", color: C.muted, border: `2px solid ${C.border}`, padding: "12px 20px", borderRadius: 8, cursor: "pointer" },
  btnDisabled: { opacity: 0.4, cursor: "not-allowed" },

  infoStrip:  { display: "flex", justifyContent: "center", gap: 32, marginTop: 28, flexWrap: "wrap" },
  infoItem:   { display: "flex", alignItems: "center", gap: 8 },
  infoText:   { fontFamily: "sans-serif", fontSize: 13, color: C.muted },

  footer:  { textAlign: "center", padding: "20px 24px", fontFamily: "sans-serif", fontSize: 12, color: C.muted, borderTop: `1px solid ${C.border}` },
};
```

---

## Как интегрировать в Next.js — пошагово

**Шаг 1 — создай файл страницы**
```
/pages/kundigung-anfechten.jsx
# или если App Router:
/app/kundigung-anfechten/page.jsx