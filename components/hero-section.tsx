import { useState, useEffect, useRef } from "react"

// ── Icons ──────────────────────────────────────────────────────────────────
const ArrowRight = ({ style, className }) => <svg style={style} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
const Shield = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const Zap = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
const Check = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
const FileText = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
const Lock = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
const Sparkles = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
const Star = ({ style }) => <svg style={style} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
const ChevronRight = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>

// ── Hooks ──────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 2200) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      let s
      const step = ts => {
        if (!s) s = ts
        const p = Math.min((ts - s) / duration, 1)
        setV(Math.floor((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 600)
    return () => clearTimeout(t)
  }, [])
  return v
}

function useVisible(delay = 0) {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t) }, [])
  return vis
}

// ── Live Demo Component ────────────────────────────────────────────────────
function LiveDemo() {
  const [phase, setPhase] = useState(0) // 0=idle, 1=step1, 2=step2, 3=typing, 4=done
  const [typed, setTyped] = useState("")
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [selectedReason, setSelectedReason] = useState(null)
  const full = "Hiermit kündige ich meinen Mobilfunkvertrag (Nr. 1234567890) fristgerecht zum nächstmöglichen Termin. Ich bitte um schriftliche Bestätigung."

  useEffect(() => {
    const seq = [
      () => { setTimeout(() => { setPhase(1); setSelectedProvider("Telekom") }, 900) },
      () => { setTimeout(() => { setPhase(2); setSelectedReason("Vertragsende") }, 1800) },
      () => {
        setTimeout(() => {
          setPhase(3)
          let i = 0
          const iv = setInterval(() => {
            setTyped(full.slice(0, i))
            i++
            if (i > full.length) {
              clearInterval(iv)
              setTimeout(() => setPhase(4), 400)
            }
          }, 22)
        }, 2800)
      },
    ]
    seq.forEach(fn => fn())
    const reset = setTimeout(() => {
      setPhase(0); setTyped(""); setSelectedProvider(null); setSelectedReason(null)
      setTimeout(() => { seq.forEach(fn => fn()) }, 500)
    }, 9000)
    return () => clearTimeout(reset)
  }, [])

  const providers = ["Telekom", "Netflix", "Fitnessstudio", "Spotify"]
  const reasons = ["Vertragsende", "Preiserhöhung", "Umzug", "Unzufrieden"]

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", height: "100%", display: "flex", flexDirection: "column", background: "#fff", borderRadius: 16, overflow: "hidden" }}>
      {/* App header */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #059669, #10b981)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FileText style={{ width: 14, height: 14, color: "#fff" }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#111", letterSpacing: "-0.02em" }}>KündigungsHeld</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${s <= (phase >= 4 ? 3 : phase >= 3 ? 2 : phase >= 2 ? 2 : phase >= 1 ? 1 : 0) ? "#10b981" : "#e5e7eb"}`, background: s <= (phase >= 4 ? 3 : phase >= 3 ? 2 : phase >= 2 ? 2 : phase >= 1 ? 1 : 0) ? "#10b981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s" }}>
              {s <= (phase >= 4 ? 3 : phase >= 2 ? 2 : phase >= 1 ? 1 : 0) && <Check style={{ width: 10, height: 10, color: "#fff" }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        {/* Step 1 — Provider */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>1. Anbieter wählen</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {providers.map(p => (
              <div key={p} style={{ padding: "8px 12px", borderRadius: 10, border: selectedProvider === p ? "1.5px solid #10b981" : "1.5px solid #e5e7eb", background: selectedProvider === p ? "#f0fdf4" : "#fafafa", fontSize: 12, fontWeight: 500, color: selectedProvider === p ? "#059669" : "#6b7280", cursor: "pointer", transition: "all 0.25s", display: "flex", alignItems: "center", gap: 6 }}>
                {selectedProvider === p && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />}
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Step 2 — Reason */}
        {phase >= 2 && (
          <div style={{ animation: "apple-up 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>2. Kündigungsgrund</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {reasons.map(r => (
                <div key={r} style={{ padding: "6px 12px", borderRadius: 8, border: selectedReason === r ? "1.5px solid #10b981" : "1.5px solid #e5e7eb", background: selectedReason === r ? "#f0fdf4" : "#fafafa", fontSize: 12, fontWeight: 500, color: selectedReason === r ? "#059669" : "#6b7280", cursor: "pointer", transition: "all 0.25s" }}>
                  {r}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — AI writing */}
        {phase >= 3 && phase < 4 && (
          <div style={{ animation: "apple-up 0.5s cubic-bezier(0.16,1,0.3,1) both", flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", animation: "apple-pulse 1s infinite" }} />
              KI generiert...
            </div>
            <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 14px", border: "1px solid #e5e7eb", minHeight: 80 }}>
              <p style={{ fontSize: 12, lineHeight: 1.7, color: "#374151", margin: 0, fontFamily: "Georgia, serif" }}>
                {typed}
                <span style={{ borderRight: "1.5px solid #10b981", marginLeft: 1, animation: "apple-blink 0.8s infinite" }}>&nbsp;</span>
              </p>
            </div>
          </div>
        )}

        {/* Step 4 — Done */}
        {phase === 4 && (
          <div style={{ animation: "apple-scale 0.6s cubic-bezier(0.16,1,0.3,1) both", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)", borderRadius: 12, border: "1px solid #bbf7d0", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check style={{ width: 12, height: 12, color: "#fff" }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#065f46" }}>Kündigung erstellt!</span>
              </div>
              <p style={{ fontSize: 11, color: "#047857", lineHeight: 1.6, margin: 0, fontFamily: "Georgia, serif" }}>
                Sehr geehrte Damen und Herren, hiermit kündige ich meinen Mobilfunkvertrag fristgerecht...
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "#111", borderRadius: 10, padding: "10px 14px", textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>📄 PDF laden</div>
              </div>
              <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 10, padding: "10px 14px", textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>✉️ Per E‑Mail</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Hero ──────────────────────────────────────────────────────────────
export default function HeroApple() {
  const countT = useCountUp(100000)
  const countC = useCountUp(300)

  const vis0 = useVisible(0)
  const vis1 = useVisible(150)
  const vis2 = useVisible(280)
  const vis3 = useVisible(420)
  const vis4 = useVisible(560)
  const vis5 = useVisible(700)

  const anim = (v, extra = {}) => ({
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
    ...extra
  })

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif", color: "#111" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ── Subtle top gradient ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 400, pointerEvents: "none", background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.07) 0%, transparent 70%)", zIndex: 0 }} />

      {/* ── Navbar ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(24px) saturate(200%)", WebkitBackdropFilter: "blur(24px) saturate(200%)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "0 40px", height: 52, display: "flex", alignItems: "center", gap: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText style={{ width: 13, height: 13, color: "#fff" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em", color: "#111" }}>KündigungsHeld</span>
        </div>
        <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
          {["Tools", "Wissen", "Preise", "Blog"].map(l => (
            <button key={l} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "4px 10px", borderRadius: 7, fontFamily: "inherit" }}>{l}</button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button style={{ background: "none", border: "none", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Anmelden</button>
          <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.01em" }}>
            Kostenlos starten
          </button>
        </div>
      </nav>

      {/* ── Hero content ── */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 40px 100px" }}>

        {/* Eyebrow */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, ...anim(vis0) }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 999, padding: "5px 14px 5px 8px" }}>
            <div style={{ background: "#10b981", borderRadius: 999, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.04em", textTransform: "uppercase" }}>Neu</div>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#059669" }}>KI-Assistent — Fragen sofort beantwortet</span>
            <ChevronRight style={{ width: 12, height: 12, color: "#059669" }} />
          </div>
        </div>

        {/* ── Headline ── */}
        <div style={{ textAlign: "center", marginBottom: 56, ...anim(vis1) }}>
          <h1 style={{ fontSize: "clamp(44px, 6.5vw, 88px)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 1.0, color: "#111", margin: "0 0 24px" }}>
            Verträge kündigen.
            <br />
            <span style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Einfach. Kostenlos.
            </span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "#6b7280", maxWidth: 560, margin: "0 auto 40px", fontWeight: 400, letterSpacing: "-0.01em" }}>
            Rechtssichere Kündigungsschreiben in&nbsp;2&nbsp;Minuten — für Telekom, Netflix, Fitnessstudio und über&nbsp;300 weitere Anbieter.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 48 }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 52, borderRadius: 14, padding: "0 30px", background: "#111", color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em", boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.12)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.18)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.12)" }}
            >
              Jetzt kündigen
              <ArrowRight style={{ width: 15, height: 15 }} />
            </button>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 52, borderRadius: 14, padding: "0 26px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15, border: "1.5px solid #e5e7eb", cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "" }}
            >
              <FileText style={{ width: 15, height: 15 }} />
              So funktioniert's
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ display: "flex" }}>
              {["47","32","12","25","56"].map((n, i) => (
                <div key={n} style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid #fff", overflow: "hidden", marginLeft: i > 0 ? -9 : 0, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                  <img src={`https://i.pravatar.cc/64?img=${n}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", gap: 1 }}>
                {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 12, height: 12, color: "#fbbf24" }} />)}
              </div>
              <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>
                <strong style={{ color: "#111" }}>4.9</strong> · 2.400+ Nutzer diese Woche
              </span>
            </div>
          </div>
        </div>

        {/* ── Mockup section ── */}
        <div style={{ position: "relative", ...anim(vis2) }}>

          {/* Glow */}
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 300, background: "radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 20, alignItems: "start", position: "relative", zIndex: 1 }}>

            {/* LEFT side cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 40 }}>

              {/* Stat card */}
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", padding: "20px 22px", boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)", animation: "apple-float 5s 0.3s ease-in-out infinite" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Kündigungen</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#111", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>
                  {countT > 0 ? (countT / 1000).toFixed(0) : "—"}k<span style={{ fontSize: 20 }}>+</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", borderRadius: 8, padding: "4px 10px", width: "fit-content" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: 11, color: "#059669", fontWeight: 600 }}>↑ 12% diese Woche</span>
                </div>
              </div>

              {/* Trust card */}
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", padding: "18px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", animation: "apple-float 6s 1s ease-in-out infinite" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Vertraut von</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "DSGVO-konform", icon: Shield, color: "#10b981" },
                    { label: "SSL 256-Bit", icon: Lock, color: "#3b82f6" },
                    { label: "Rechtssicher", icon: Sparkles, color: "#8b5cf6" },
                  ].map(({ label, icon: Icon, color }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 8, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon style={{ width: 12, height: 12, color }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER — main demo */}
            <div style={{ position: "relative" }}>
              {/* Browser shell */}
              <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08), 0 32px 80px rgba(0,0,0,0.08)", animation: "apple-float 7s ease-in-out infinite" }}>
                {/* Browser bar */}
                <div style={{ background: "#f7f7f7", borderBottom: "1px solid #e5e7eb", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                  </div>
                  <div style={{ flex: 1, background: "#efefef", borderRadius: 7, padding: "4px 12px", display: "flex", alignItems: "center", gap: 5 }}>
                    <Lock style={{ width: 9, height: 9, color: "#10b981" }} />
                    <span style={{ fontSize: 10.5, color: "#9ca3af", fontFamily: "monospace" }}>kuendigungsheld.de</span>
                  </div>
                </div>
                {/* Demo */}
                <div style={{ height: 380 }}>
                  <LiveDemo />
                </div>
              </div>
            </div>

            {/* RIGHT side cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 60 }}>

              {/* Speed */}
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", padding: "18px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", animation: "apple-float 5.5s 0.7s ease-in-out infinite" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Ø Dauer</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: "#111", letterSpacing: "-0.04em", lineHeight: 1 }}>2</span>
                  <span style={{ fontSize: 15, color: "#9ca3af", fontWeight: 500 }}>Min.</span>
                </div>
                <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>⚡ Blitzschnell</div>
              </div>

              {/* Rating */}
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", padding: "18px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", animation: "apple-float 4.5s 1.3s ease-in-out infinite" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Bewertung</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#111", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>4.9</div>
                <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 13, height: 13, color: "#fbbf24" }} />)}
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>1.200+ Rezensionen</div>
              </div>

              {/* KI */}
              <div style={{ background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", borderRadius: 20, border: "1px solid #ddd6fe", padding: "16px 18px", boxShadow: "0 4px 24px rgba(139,92,246,0.1)", animation: "apple-float 6s 0.5s ease-in-out infinite", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ position: "relative", width: 30, height: 30, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles style={{ width: 14, height: 14, color: "#fff" }} />
                    <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#4ade80", border: "2px solid #f5f3ff" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6" }}>KI-Assistent</div>
                    <div style={{ fontSize: 10, color: "#7c3aed" }}>Jetzt online</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#6d28d9", lineHeight: 1.5 }}>Fragen zur Kündigung? Sofort beantwortet.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{ marginTop: 80, ...anim(vis3) }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "1px solid #e5e7eb", borderRadius: 20, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            {[
              { val: countT > 0 ? Math.floor(countT / 1000) + "k+" : "—", label: "Kündigungen", sub: "erfolgreich versendet", color: "#10b981" },
              { val: countC + "+", label: "Anbieter", sub: "werden unterstützt", color: "#3b82f6" },
              { val: "4.9★", label: "Bewertung", sub: "von 1.200+ Nutzern", color: "#f59e0b" },
              { val: "100%", label: "Kostenlos", sub: "keine versteckten Kosten", color: "#8b5cf6" },
            ].map(({ val, label, sub, color }, i) => (
              <div key={i} style={{ padding: "28px 24px", borderLeft: i > 0 ? "1px solid #f3f4f6" : "none", textAlign: "center" }}>
                <div style={{ fontSize: 30, fontWeight: 900, color, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6 }}>{val}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 3, letterSpacing: "-0.01em" }}>{label}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Feature pills ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 48, flexWrap: "wrap", ...anim(vis4) }}>
          {[
            { icon: Shield, label: "DSGVO & SSL gesichert" },
            { icon: Zap, label: "In 2 Minuten fertig" },
            { icon: Check, label: "Keine Registrierung" },
            { icon: FileText, label: "300+ Anbieter" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 500, color: "#374151" }}>
              <Icon style={{ width: 14, height: 14, color: "#10b981" }} />
              {label}
            </div>
          ))}
        </div>

        {/* ── Logos strip ── */}
        <div style={{ marginTop: 64, textAlign: "center", ...anim(vis5) }}>
          <div style={{ fontSize: 12, color: "#c4c4c4", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>Funktioniert für alle großen Anbieter</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {["Telekom", "Vodafone", "Netflix", "Spotify", "ADAC", "Sky", "O₂", "Amazon"].map(name => (
              <div key={name} style={{ fontSize: 15, fontWeight: 700, color: "#d1d5db", letterSpacing: "-0.02em", transition: "color 0.2s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = "#6b7280"}
                onMouseLeave={e => e.currentTarget.style.color = "#d1d5db"}
              >{name}</div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes apple-float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        @keyframes apple-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes apple-scale { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
        @keyframes apple-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes apple-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}

export { HeroApple as HeroSection }