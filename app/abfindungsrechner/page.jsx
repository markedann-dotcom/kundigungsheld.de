"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// ─── BERECHNUNG ──────────────────────────────────────────────────────────────

function berechneAbfindung({ bruttoMonat, dienstjahre, alter, kuendigungsart, betriebsgroesse }) {
  if (!bruttoMonat || !dienstjahre) return null;

  // Basis: 0.5 Monatsgehälter pro Dienstjahr (§ 1a KSchG)
  let faktor = 0.5;

  // Alter erhöht Faktor
  if (alter >= 50 && dienstjahre >= 15) faktor += 0.2;
  if (alter >= 55 && dienstjahre >= 20) faktor += 0.2;

  // Kündigungsart
  if (kuendigungsart === "betriebsbedingt") faktor += 0.1;
  if (kuendigungsart === "personenbedingt") faktor -= 0.1;

  // Betriebsgröße — große Firmen zahlen mehr
  if (betriebsgroesse === "gross") faktor += 0.15;
  if (betriebsgroesse === "klein") faktor -= 0.1;

  faktor = Math.max(0.25, Math.min(faktor, 1.5));

  const basis     = bruttoMonat * dienstjahre * 0.5;
  const optimist  = bruttoMonat * dienstjahre * Math.min(faktor + 0.4, 1.5);
  const realist   = bruttoMonat * dienstjahre * faktor;
  const pessimist = bruttoMonat * dienstjahre * Math.max(faktor - 0.2, 0.25);

  // Steuerfreier Anteil (vereinfacht, §§ 24, 34 EStG)
  const steuerfrei = Math.min(realist * 0.3, 7500);
  const netto      = realist - (realist - steuerfrei) * 0.35;

  return { basis, optimist, realist, pessimist, faktor, steuerfrei, netto };
}

function fmt(n) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

// ─── SLIDER ──────────────────────────────────────────────────────────────────

function Slider({ label, value, onChange, min, max, step = 1, format, hint }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
        <span className="font-display text-base font-bold text-foreground tabular-nums">{format ? format(value) : value}</span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-secondary">
        <div className="absolute left-0 top-0 h-full rounded-full bg-foreground transition-all" style={{ width: `${pct}%` }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0 h-full"
        />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-foreground bg-background shadow-sm transition-all pointer-events-none"
          style={{ left: `${pct}%` }} />
      </div>
      {hint && <p className="mt-1.5 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function AbfindungsrechnerPage() {
  const [bruttoMonat,    setBruttoMonat]    = useState(3500);
  const [dienstjahre,    setDienstjahre]    = useState(5);
  const [alter,          setAlter]          = useState(38);
  const [kuendigungsart, setKuendigungsart] = useState("betriebsbedingt");
  const [betriebsgroesse,setBetriebsgroesse]= useState("mittel");
  const [showDetails,    setShowDetails]    = useState(false);

  const result = useMemo(() =>
    berechneAbfindung({ bruttoMonat, dienstjahre, alter, kuendigungsart, betriebsgroesse }),
    [bruttoMonat, dienstjahre, alter, kuendigungsart, betriebsgroesse]
  );

  const selectCls = "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-all appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-background">

      {/* NAV */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 lg:px-6">
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
        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6 lg:py-12">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/10 text-2xl">💶</div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-background/15 px-2.5 py-0.5 text-xs font-bold text-background/90">KOSTENLOS</span>
                <span className="text-xs text-background/40">§ 1a KSchG · Sofortergebnis</span>
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight lg:text-3xl">Abfindungsrechner</h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-background/55">
                Berechnen Sie Ihre realistische Abfindung bei Kündigung — basierend auf Gehalt, Dienstjahren und Ihrer persönlichen Situation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-8 pb-20 lg:px-6">

        {/* Trust */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { icon: "📊", text: "Basiert auf § 1a KSchG",  sub: "Gesetzliche Grundlage" },
            { icon: "⚡", text: "Sofortberechnung",         sub: "Keine Registrierung" },
            { icon: "🔒", text: "100% anonym",              sub: "Keine Datenspeicherung" },
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

        <div className="grid gap-5 lg:grid-cols-5">

          {/* ── LEFT: INPUTS ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Gehalt & Dienstjahre */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-card p-6 flex flex-col gap-6">
              <h2 className="font-display text-base font-bold tracking-tight">Ihre Situation</h2>

              <Slider
                label="Bruttomonatsgehalt"
                value={bruttoMonat}
                onChange={setBruttoMonat}
                min={1000} max={15000} step={100}
                format={v => fmt(v)}
                hint="Ihr durchschnittliches Bruttogehalt der letzten 3 Monate"
              />
              <Slider
                label="Betriebszugehörigkeit"
                value={dienstjahre}
                onChange={setDienstjahre}
                min={1} max={40}
                format={v => `${v} ${v === 1 ? "Jahr" : "Jahre"}`}
                hint="Anzahl der vollen Beschäftigungsjahre"
              />
              <Slider
                label="Ihr Alter"
                value={alter}
                onChange={setAlter}
                min={18} max={65}
                format={v => `${v} Jahre`}
                hint="Ab 50 Jahren mit 15+ Jahren Betriebszugehörigkeit erhöht sich die Abfindung"
              />
            </div>

            {/* Kündigungsart */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-card p-6 flex flex-col gap-4">
              <h2 className="font-display text-base font-bold tracking-tight">Kündigung & Betrieb</h2>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Art der Kündigung</label>
                <div className="relative">
                  <select value={kuendigungsart} onChange={e => setKuendigungsart(e.target.value)} className={selectCls}>
                    <option value="betriebsbedingt">Betriebsbedingt (Stellenabbau)</option>
                    <option value="verhaltensbedingt">Verhaltensbedingt</option>
                    <option value="personenbedingt">Personenbedingt (Krankheit etc.)</option>
                    <option value="aufhebungsvertrag">Aufhebungsvertrag</option>
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Betriebsgröße</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "klein",  label: "Klein",  sub: "< 50 MA" },
                    { v: "mittel", label: "Mittel", sub: "50–500 MA" },
                    { v: "gross",  label: "Groß",   sub: "> 500 MA" },
                  ].map(o => (
                    <button key={o.v} onClick={() => setBetriebsgroesse(o.v)}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        betriebsgroesse === o.v
                          ? "border-foreground bg-foreground/5"
                          : "border-border/50 bg-background hover:border-border"
                      }`}>
                      <p className="text-xs font-bold text-foreground">{o.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{o.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="rounded-2xl border border-border/50 bg-secondary/20 p-5">
              <p className="text-xs font-semibold text-foreground mb-2">💡 Wussten Sie?</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Die Abfindung ist gesetzlich nicht verpflichtend — aber bei betriebsbedingter Kündigung haben Sie nach § 1a KSchG Anspruch, wenn Sie auf die Kündigungsschutzklage verzichten. Im Streitfall entscheidet das Arbeitsgericht.
              </p>
            </div>
          </div>

          {/* ── RIGHT: RESULT ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Main result */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground text-background p-6 shadow-premium">
              <p className="text-xs font-semibold uppercase tracking-widest text-background/40 mb-1">Realistische Abfindung</p>
              <div className="font-display text-4xl font-bold tracking-tight text-background lg:text-5xl">
                {result ? fmt(result.realist) : "—"}
              </div>
              <p className="mt-1 text-xs text-background/40">Brutto · Faktor {result ? result.faktor.toFixed(2) : "0.50"} × {dienstjahre} Jahre</p>

              <div className="mt-5 space-y-2.5">
                {result && [
                  { label: "Optimistisch",  value: result.optimist,  color: "bg-green-400" },
                  { label: "Realistisch",   value: result.realist,   color: "bg-background/80" },
                  { label: "Pessimistisch", value: result.pessimist, color: "bg-background/30" },
                ].map(r => {
                  const maxVal = result.optimist;
                  const pct = Math.min((r.value / maxVal) * 100, 100);
                  return (
                    <div key={r.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] text-background/50">{r.label}</span>
                        <span className="text-[11px] font-bold text-background/80">{fmt(r.value)}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-background/10 overflow-hidden">
                        <div className={`h-full rounded-full ${r.color} transition-all duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {result && (
                <div className="mt-5 border-t border-background/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-background/50">Ca. Netto (nach Steuer)</span>
                    <span className="text-sm font-bold text-background">{fmt(result.netto)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Formel */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-card p-5">
              <button onClick={() => setShowDetails(!showDetails)}
                className="flex w-full items-center justify-between text-left">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Berechnung anzeigen</span>
                <svg className={`h-4 w-4 text-muted-foreground transition-transform ${showDetails ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              {showDetails && result && (
                <div className="mt-4 space-y-2.5 border-t border-border/50 pt-4">
                  {[
                    { label: "Bruttogehalt",          value: fmt(bruttoMonat) },
                    { label: "× Dienstjahre",         value: `× ${dienstjahre}` },
                    { label: "× Faktor",              value: `× ${result.faktor.toFixed(2)}` },
                    { label: "= Abfindung (brutto)",  value: fmt(result.realist), bold: true },
                    { label: "Steuerfreier Anteil",   value: fmt(result.steuerfrei) },
                    { label: "Ca. Netto",             value: fmt(result.netto), bold: true },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center">
                      <span className={`text-xs ${row.bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{row.label}</span>
                      <span className={`text-xs font-bold ${row.bold ? "text-foreground" : "text-muted-foreground"}`}>{row.value}</span>
                    </div>
                  ))}
                  <p className="pt-2 text-[10px] text-muted-foreground/60 leading-relaxed border-t border-border/50">
                    Formel: 0,5 × Monatsgehalt × Dienstjahre × Korrekturfaktor. Steuern vereinfacht berechnet.
                  </p>
                </div>
              )}
            </div>

            {/* Faktoren */}
            <div className="rounded-2xl border border-border/50 bg-card shadow-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Was Ihre Abfindung erhöht</p>
              <div className="space-y-2">
                {[
                  { icon: "✅", text: "Betriebsbedingte Kündigung", active: kuendigungsart === "betriebsbedingt" },
                  { icon: "✅", text: "Alter 50+ mit 15 Jahren",    active: alter >= 50 && dienstjahre >= 15 },
                  { icon: "✅", text: "Großes Unternehmen",          active: betriebsgroesse === "gross" },
                  { icon: "✅", text: "Lange Betriebszugehörigkeit", active: dienstjahre >= 15 },
                ].map(f => (
                  <div key={f.text} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors ${
                    f.active ? "bg-foreground/5 border border-foreground/10" : "opacity-35"
                  }`}>
                    <span className="text-xs">{f.active ? "✅" : "○"}</span>
                    <span className="text-xs text-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-border/50 bg-secondary/30 p-5">
              <p className="text-xs font-semibold text-foreground mb-1">Wurden Sie gekündigt?</p>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">Fechten Sie die Kündigung an und erhöhen Sie Ihre Verhandlungsposition.</p>
              <Link href="/kundigung-anfechten"
                className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-bold text-background hover:bg-foreground/90 transition-colors">
                Kündigung anfechten →
              </Link>
            </div>

          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 rounded-2xl border border-border/50 bg-card shadow-card overflow-hidden">
          <div className="border-b border-border/50 px-6 py-4">
            <h2 className="font-display text-base font-bold tracking-tight">Häufige Fragen zur Abfindung</h2>
          </div>
          <div className="divide-y divide-border/50">
            {[
              { q: "Habe ich einen gesetzlichen Anspruch auf Abfindung?", a: "Nein — eine gesetzliche Pflicht zur Abfindung gibt es in Deutschland nicht. Ausnahme: § 1a KSchG erlaubt dem Arbeitgeber, eine Abfindung von 0,5 Monatsgehältern pro Dienstjahr anzubieten, wenn der Arbeitnehmer auf die Kündigungsschutzklage verzichtet." },
              { q: "Wie wird die Abfindung versteuert?", a: "Abfindungen sind grundsätzlich steuerpflichtig. Es gibt jedoch die sogenannte Fünftelregelung (§ 34 EStG), die die Steuerlast erheblich reduzieren kann, da die Abfindung rechnerisch auf 5 Jahre verteilt wird." },
              { q: "Wann sollte ich eine Kündigungsschutzklage einreichen?", a: "Wenn Sie die Kündigung für ungerechtfertigt halten — unabhängig von der Abfindung. Die Klage stärkt Ihre Verhandlungsposition erheblich. Frist: 3 Wochen ab Zugang der Kündigung (§ 4 KSchG)." },
              { q: "Was zählt als Bruttomonatsgehalt?", a: "Alle regelmäßigen Vergütungsbestandteile: Grundgehalt, regelmäßige Boni, Sachleistungen. Einmalige Sonderzahlungen und Überstundenvergütungen werden in der Regel nicht berücksichtigt." },
            ].map((faq, i) => (
              <details key={i} className="group px-6 py-4">
                <summary className="flex cursor-pointer items-center justify-between list-none">
                  <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                  <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/50 leading-relaxed max-w-lg mx-auto">
          Diese Berechnung ist eine Schätzung und ersetzt keine Rechtsberatung. Für eine genaue Einschätzung empfehlen wir einen Fachanwalt für Arbeitsrecht.
        </p>
      </main>
    </div>
  );
}
