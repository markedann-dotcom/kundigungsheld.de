"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, ChevronRight, CheckCircle2, Copy, Check, AlertTriangle, Clock } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 0, label: "Fristberechnung" },
  { id: 1, label: "Ihre Daten" },
  { id: 2, label: "Arbeitgeber" },
  { id: 3, label: "Grund" },
  { id: 4, label: "Klageschrift" },
];

const REASONS = [
  { id: "sozialauswahl",   title: "Fehlerhafte Sozialauswahl",     desc: "Bei betriebsbedingter Kündigung wurden Sozialdaten nicht korrekt berücksichtigt." },
  { id: "betriebsrat",     title: "Betriebsrat nicht angehört",    desc: "Der Betriebsrat wurde vor der Kündigung nicht ordnungsgemäß konsultiert." },
  { id: "formfehler",      title: "Formfehler",                    desc: "Kündigung nicht schriftlich oder ohne eigenhändige Unterschrift." },
  { id: "diskriminierung", title: "Diskriminierung (AGG)",         desc: "Verdacht auf Kündigung wegen Geschlecht, Alter, Religion oder Herkunft." },
  { id: "sonderschutz",    title: "Sonderkündigungsschutz",        desc: "Schwangerschaft, Schwerbehinderung, Betriebsratsmitgliedschaft, Elternzeit." },
  { id: "sonstige",        title: "Sonstiger Grund",               desc: "Ein anderer Grund macht die Kündigung unwirksam." },
];

// ─── COUNTDOWN HOOK ──────────────────────────────────────────────────────────

function useCountdown(kuendigungDate) {
  const [state, setState] = useState({ days: 21, hours: 0, minutes: 0, seconds: 0, expired: false, percent: 0, deadline: null });

  useEffect(() => {
    if (!kuendigungDate) return;
    const deadline = new Date(kuendigungDate);
    deadline.setDate(deadline.getDate() + 21);

    const tick = () => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) { setState(s => ({ ...s, expired: true })); return; }
      const total = 21 * 24 * 60 * 60 * 1000;
      const percent = Math.min(((total - diff) / total) * 100, 100);
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

${personal.city}, den ${today}

K L A G E S C H R I F T

Kläger/in:  ${personal.name}, ${personal.address}, ${personal.plz} ${personal.city}

Beklagte/r:  ${employer.name}, ${employer.address}, ${employer.plz} ${employer.city}

wegen: Kündigungsschutzklage gem. § 4 KSchG

─────────────────────────────────────────────

Ich erhebe Klage gegen die Kündigung vom ${new Date(kuendigungDate).toLocaleDateString("de-DE")} und beantrage,

festzustellen, dass das Arbeitsverhältnis durch die Kündigung
nicht aufgelöst worden ist.

B E G R Ü N D U N G

Die Kündigung ist aus folgenden Gründen sozial ungerechtfertigt
und damit rechtsunwirksam:

${reasonTitles.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Ich bitte das Gericht, einen Gütetermin anzuberaumen.

Mit freundlichen Grüßen,


_______________________________
${personal.name}`;
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function KuendigungsschutzPage() {
  const [step, setStep]         = useState(0);
  const [kuendigungDate, setKuendigungDate] = useState("");
  const [personal, setPersonal] = useState({ name: "", address: "", plz: "", city: "" });
  const [employer, setEmployer] = useState({ name: "", address: "", plz: "", city: "" });
  const [reasons, setReasons]   = useState([]);
  const [copied, setCopied]     = useState(false);

  const countdown = useCountdown(kuendigungDate);

  const urgency = countdown.days <= 3 ? "red" : countdown.days <= 7 ? "amber" : "green";

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

  const urgencyBadgeClass = {
    red:   "bg-destructive/10 text-destructive border-destructive/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    green: "bg-foreground/5 text-foreground border-border",
  }[urgency];

  const urgencyBarClass = {
    red:   "bg-destructive",
    amber: "bg-amber-500",
    green: "bg-foreground",
  }[urgency];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO ── */}
      <section className="border-b border-border/50 bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              KündigungsHeld
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm text-foreground font-medium">Kündigung anfechten</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Kündigungsschutzklage
              </h1>
              <p className="mt-2 text-muted-foreground text-base leading-relaxed max-w-xl">
                Wurde Ihnen ungerechtfertigt gekündigt? Erstellen Sie Ihre Klageschrift nach § 4 KSchG — kostenlos, in 5 Minuten.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  Gesetzliche Frist: 21 Tage ab Zugang der Kündigung
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <main className="mx-auto max-w-3xl px-4 py-10 lg:px-8">

        {/* STEPPER */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-4 h-px bg-border -z-0" />
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => i < step && setStep(i)}
                className="flex flex-col items-center gap-1.5 z-10"
                disabled={i >= step}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all duration-200 ${
                  i < step
                    ? "bg-foreground text-background border-foreground"
                    : i === step
                    ? "bg-background text-foreground border-foreground"
                    : "bg-background text-muted-foreground border-border"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`hidden text-[10px] font-medium uppercase tracking-wide sm:block ${
                  i === step ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CARD */}
        <div className="rounded-xl border border-border/50 bg-card shadow-card overflow-hidden">

          {/* ── STEP 0: DEADLINE ── */}
          {step === 0 && (
            <div className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-1">Wann haben Sie die Kündigung erhalten?</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Geben Sie das Datum des Zugangs an. Wir berechnen Ihre verbleibende Klagefrist automatisch.
              </p>

              <input
                type="date"
                value={kuendigungDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={e => setKuendigungDate(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/50 transition-colors"
              />

              {kuendigungDate && !countdown.expired && (
                <div className="mt-6 rounded-xl border border-border/50 bg-secondary/40 p-5">
                  <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold mb-4 ${urgencyBadgeClass}`}>
                    <Clock className="h-3 w-3" />
                    {countdown.days <= 3 ? "Dringend — nur noch" : "Verbleibende Frist"}
                  </div>

                  <div className="flex items-end gap-4 mb-4">
                    {[
                      { v: countdown.days,    u: "Tage"    },
                      { v: countdown.hours,   u: "Std"     },
                      { v: countdown.minutes, u: "Min"     },
                      { v: countdown.seconds, u: "Sek"     },
                    ].map(({ v, u }) => (
                      <div key={u} className="flex flex-col items-center">
                        <span className={`font-display text-3xl font-bold tabular-nums ${
                          urgency === "red" ? "text-destructive" :
                          urgency === "amber" ? "text-amber-600 dark:text-amber-400" :
                          "text-foreground"
                        }`}>
                          {String(v).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{u}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${urgencyBarClass}`}
                      style={{ width: `${countdown.percent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Klagefrist endet am{" "}
                    <span className="font-semibold text-foreground">
                      {countdown.deadline?.toLocaleDateString("de-DE")}
                    </span>
                  </p>
                </div>
              )}

              {countdown.expired && (
                <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-destructive text-sm">Klagefrist abgelaufen</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        Die 21-Tage-Frist ist verstrichen. Bitte wenden Sie sich an einen Fachanwalt für Arbeitsrecht — in Ausnahmefällen ist eine nachträgliche Zulassung möglich (§ 5 KSchG).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 1: PERSONAL ── */}
          {step === 1 && (
            <div className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-1">Ihre persönlichen Daten</h2>
              <p className="text-sm text-muted-foreground mb-6">Diese Angaben erscheinen als Kläger/in in der Klageschrift.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { key: "name",    label: "Vor- und Nachname",   placeholder: "Max Mustermann",  col: "sm:col-span-2" },
                  { key: "address", label: "Straße und Hausnr.",  placeholder: "Musterstraße 1",  col: "sm:col-span-2" },
                  { key: "plz",     label: "PLZ",                 placeholder: "10115",            col: "" },
                  { key: "city",    label: "Stadt",               placeholder: "Berlin",           col: "" },
                ].map(f => (
                  <div key={f.key} className={f.col}>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {f.label}
                    </label>
                    <input
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/50 transition-colors"
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
            <div className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-1">Daten des Arbeitgebers</h2>
              <p className="text-sm text-muted-foreground mb-6">Diese Angaben erscheinen als Beklagte/r in der Klageschrift.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { key: "name",    label: "Firmenname",          placeholder: "Musterfirma GmbH", col: "sm:col-span-2" },
                  { key: "address", label: "Straße und Hausnr.",  placeholder: "Firmenstraße 5",   col: "sm:col-span-2" },
                  { key: "plz",     label: "PLZ",                 placeholder: "10115",             col: "" },
                  { key: "city",    label: "Stadt",               placeholder: "Berlin",            col: "" },
                ].map(f => (
                  <div key={f.key} className={f.col}>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {f.label}
                    </label>
                    <input
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/50 transition-colors"
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
            <div className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-1">Warum ist die Kündigung unwirksam?</h2>
              <p className="text-sm text-muted-foreground mb-6">Wählen Sie alle zutreffenden Gründe aus.</p>
              <div className="flex flex-col gap-2.5">
                {REASONS.map(r => {
                  const active = reasons.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      onClick={() => toggleReason(r.id)}
                      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150 ${
                        active
                          ? "border-foreground bg-foreground/5"
                          : "border-border/50 bg-background hover:border-border hover:bg-secondary/40"
                      }`}
                    >
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        active ? "border-foreground bg-foreground" : "border-border"
                      }`}>
                        {active && <Check className="h-3 w-3 text-background" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{r.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 4: RESULT ── */}
          {step === 4 && (
            <div className="p-6 lg:p-8">
              <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-secondary/30 p-4 mb-6">
                <CheckCircle2 className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Klageschrift erstellt</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    Kopieren Sie den Text, drucken Sie ihn aus und reichen Sie ihn beim zuständigen Arbeitsgericht ein — persönlich oder per Einschreiben.
                  </p>
                </div>
              </div>

              <div className="mb-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                {[
                  { n: "1", t: "Ausdrucken",         d: "Auf weißem Papier" },
                  { n: "2", t: "Arbeitsgericht",      d: "Persönlich einreichen" },
                  { n: "3", t: "Gütetermin",          d: "Gericht lädt beide Parteien" },
                ].map(ns => (
                  <div key={ns.n} className="flex flex-1 items-start gap-2.5 rounded-lg border border-border/50 bg-background p-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                      {ns.n}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{ns.t}</p>
                      <p className="text-xs text-muted-foreground">{ns.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border/50 overflow-hidden">
                <div className="flex items-center justify-between border-b border-border/50 bg-secondary/50 px-4 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Klageschrift gem. § 4 KSchG
                  </span>
                  <button
                    onClick={copyText}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Kopiert" : "Kopieren"}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={klageschrift}
                  className="w-full min-h-72 resize-y bg-background p-4 font-mono text-xs leading-relaxed text-foreground focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* NAV BUTTONS */}
          <div className="flex items-center justify-between border-t border-border/50 px-6 py-4 lg:px-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                ← Zurück
              </button>
            ) : (
              <div />
            )}
            {step < 4 && (
              <button
                disabled={!canAdvance()}
                onClick={() => setStep(s => s + 1)}
                className="rounded-lg bg-foreground px-5 py-2 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {step === 3 ? "Klageschrift erstellen →" : "Weiter →"}
              </button>
            )}
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            "🔒 Daten bleiben in Ihrem Browser",
            "⚖️ Basiert auf § 4 KSchG",
            "🆓 Kostenlos",
          ].map(item => (
            <span key={item} className="text-xs text-muted-foreground">{item}</span>
          ))}
        </div>
      </main>
    </div>
  );
}