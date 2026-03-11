import { useState, useEffect, useRef } from "react"

// ── Icons ────────────────────────────────────────────────────────────────────
const ArrowRight = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
const Play = ({ style }) => <svg style={style} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
const Shield = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const Zap = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
const CheckCircle = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
const FileText = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
const Lock = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
const Sparkles = ({ style }) => <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
const Star = ({ style }) => <svg style={style} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>

function useCountUp(target, duration = 2000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      let s
      const step = ts => {
        if (!s) s = ts
        const p = Math.min((ts - s) / duration, 1)
        setValue(Math.floor((1 - Math.pow(1 - p, 4)) * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 800)
    return () => clearTimeout(t)
  }, [])
  return value
}

// ── Animated typing demo ─────────────────────────────────────────────────────
function TypingDemo() {
  const steps = [
    { label: "Anbieter wählen", value: "Telekom", done: true },
    { label: "Grund angeben", value: "Vertragsende", done: true },
    { label: "KI generiert...", value: "", generating: true },
  ]
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState("")
  const [showDoc, setShowDoc] = useState(false)
  const fullText = "Sehr geehrte Damen und Herren, hiermit kündige ich meinen Vertrag..."

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => {
        if (s < 2) return s + 1
        return s
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (step === 2) {
      let i = 0
      const t = setInterval(() => {
        setTyped(fullText.slice(0, i))
        i++
        if (i > fullText.length) {
          clearInterval(t)
          setTimeout(() => setShowDoc(true), 300)
        }
      }, 28)
      return () => clearInterval(t)
    }
  }, [step])

  useEffect(() => {
    if (showDoc) {
      const t = setTimeout(() => {
        setStep(0)
        setTyped("")
        setShowDoc(false)
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [showDoc])

  return (
    <div style={{ width: "100%", height: "100%", background: "#0f0f0f", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Window chrome */}
      <div style={{ padding: "14px 18px", background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>kuendigungsheld.de</div>
      </div>

      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Progress steps */}
        <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
          {["Anbieter","Details","Dokument"].map((s, i) => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? "#10b981" : "rgba(255,255,255,0.1)", transition: "background 0.5s" }} />
          ))}
        </div>

        {/* Step cards */}
        {step >= 0 && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px", transition: "all 0.3s" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Anbieter</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#e0c3fc,#8ec5fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>T</div>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Telekom Deutschland</span>
              <div style={{ marginLeft: "auto", color: "#10b981", fontSize: 11 }}>✓</div>
            </div>
          </div>
        )}

        {step >= 1 && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px", animation: "fadeIn 0.4s ease" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Kündigungsgrund</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Vertragsende","Preiserhöhung","Umzug"].map((g, i) => (
                <div key={g} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, border: i === 0 ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)", color: i === 0 ? "#10b981" : "rgba(255,255,255,0.5)", background: i === 0 ? "rgba(16,185,129,0.1)" : "transparent", cursor: "pointer" }}>{g}</div>
              ))}
            </div>
          </div>
        )}

        {step >= 2 && !showDoc && (
          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "12px 14px", flex: 1, animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Sparkles style={{ width: 12, height: 12, color: "#10b981" }} />
              <span style={{ fontSize: 10, color: "#10b981", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>KI schreibt...</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#10b981", animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
              </div>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontFamily: "Georgia, serif" }}>
              {typed}<span style={{ borderRight: "2px solid #10b981", marginLeft: 1, animation: "blink 1s infinite" }}>&nbsp;</span>
            </p>
          </div>
        )}

        {showDoc && (
          <div style={{ background: "#fff", borderRadius: 12, flex: 1, padding: "14px 16px", animation: "scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div style={{ fontSize: 10, color: "#888", textAlign: "right", marginBottom: 8 }}>Berlin, 12.03.2025</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 6 }}>Kündigung — Telekom</div>
            <div style={{ fontSize: 10, color: "#444", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
              Sehr geehrte Damen und Herren,<br />
              hiermit kündige ich meinen Vertrag fristgerecht zum nächstmöglichen Termin.
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, background: "#f0fdf4", borderRadius: 6, padding: "6px 10px" }}>
              <span style={{ fontSize: 11 }}>✓</span>
              <span style={{ fontSize: 10, color: "#15803d", fontWeight: 600 }}>PDF bereit zum Download</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
        @keyframes bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes shimmer { 0% { background-position: -200% center } 100% { background-position: 200% center } }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes pulse2 { 0%,100% { opacity:1; transform: scale(1) } 50% { opacity:.7; transform: scale(1.05) } }
      `}</style>
    </div>
  )
}

export default function HeroModern() {
  const [dark, setDark] = useState(true)
  const countT = useCountUp(100000)
  const countC = useCountUp(300)

  const bg = dark ? "#050505" : "#f8f8f5"
  const fg = dark ? "#ffffff" : "#0a0a0a"
  const muted = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"
  const card = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"
  const cardSolid = dark ? "#111" : "#fff"

  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: fg, transition: "all 0.4s", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,300&display=swap" rel="stylesheet" />

      {/* Theme toggle */}
      <button onClick={() => setDark(v => !v)} style={{ position: "fixed", top: 14, right: 14, zIndex: 999, background: cardSolid, border: `1px solid ${border}`, borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontSize: 12, color: fg, fontFamily: "inherit", fontWeight: 500 }}>
        {dark ? "☀️ Hell" : "🌙 Dunkel"}
      </button>

      {/* ── Noise texture overlay ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, opacity: dark ? 0.035 : 0.025, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />

      {/* ── Gradient mesh ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Top center bloom */}
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: dark ? "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)" : "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 65%)" }} />
        {/* Right violet */}
        <div style={{ position: "absolute", top: "10%", right: -200, width: 600, height: 600, background: dark ? "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 60%)" : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)" }} />
        {/* Bottom left blue */}
        <div style={{ position: "absolute", bottom: 0, left: -100, width: 500, height: 400, background: dark ? "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)" : "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 60%)" }} />
      </div>

      {/* ── Fine grid ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: dark ? "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)" : "linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px", WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, #000 50%, transparent 100%)" }} />

      {/* ── Navbar ── */}
      <nav style={{ position: "relative", zIndex: 10, borderBottom: `1px solid ${border}`, padding: "0 32px", height: 56, display: "flex", alignItems: "center", gap: 12, background: dark ? "rgba(5,5,5,0.7)" : "rgba(248,248,245,0.7)", backdropFilter: "blur(20px)" }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: fg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FileText style={{ width: 14, height: 14, color: bg }} />
        </div>
        <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em" }}>KündigungsHeld</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["Tools","Wissen","Blog"].map(l => <button key={l} style={{ background: "none", border: "none", color: muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, padding: "4px 8px" }}>{l}</button>)}
        </div>
        <button style={{ background: fg, color: bg, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Loslegen →</button>
      </nav>

      {/* ── Hero ── */}
      <div style={{ position: "relative", zIndex: 5, maxWidth: 1200, margin: "0 auto", padding: "72px 32px 80px" }}>

        {/* Top badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 8px", borderRadius: 999, border: `1px solid ${border}`, background: card, backdropFilter: "blur(12px)" }}>
            <div style={{ background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: 999, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>Neu</div>
            <span style={{ fontSize: 12, color: muted, fontWeight: 500 }}>KI-Assistent beantwortet alle Kündigungsfragen sofort</span>
            <ArrowRight style={{ width: 12, height: 12, color: muted }} />
          </div>
        </div>

        {/* ── Main headline — centered ── */}
        <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 56px" }}>
          <h1 style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em", color: fg, margin: "0 0 24px" }}>
            Kündigen war<br />
            <span style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 40%, #34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>nie so einfach.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: muted, margin: "0 0 36px", fontWeight: 400 }}>
            Rechtssichere Kündigungsschreiben in 2 Minuten — für Telekom, Netflix,<br />Fitnessstudio und 300+ weitere Anbieter. Komplett kostenlos.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 8, height: 52, borderRadius: 14, padding: "0 28px", background: "#10b981", color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 0 1px rgba(16,185,129,0.3), 0 8px 32px rgba(16,185,129,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(16,185,129,0.4), 0 12px 40px rgba(16,185,129,0.4)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(16,185,129,0.3), 0 8px 32px rgba(16,185,129,0.3)" }}
            >
              Jetzt kostenlos starten
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 8, height: 52, borderRadius: 14, padding: "0 24px", background: card, color: fg, fontWeight: 600, fontSize: 15, border: `1px solid ${border}`, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(12px)" }}>
              <Play style={{ width: 14, height: 14 }} />
              Demo ansehen
            </button>
          </div>

          {/* Social proof row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex" }}>
                {["47","32","12","25","56"].map((n, i) => (
                  <div key={n} style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${bg}`, overflow: "hidden", marginLeft: i > 0 ? -8 : 0 }}>
                    <img src={`https://i.pravatar.cc/64?img=${n}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex", gap: 1 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 10, height: 10, color: "#fbbf24" }} />)}
                </div>
                <div style={{ fontSize: 11, color: muted }}><strong style={{ color: fg }}>2.400+</strong> diese Woche</div>
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: border }} />
            <div style={{ fontSize: 12, color: muted }}>Keine Registrierung · Keine Kosten · DSGVO</div>
          </div>
        </div>

        {/* ── Browser mockup with animated demo ── */}
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>

          {/* Glow under */}
          <div style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", width: 600, height: 200, background: "radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Browser frame */}
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${border}`, boxShadow: dark ? "0 0 0 1px rgba(255,255,255,0.05), 0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(16,185,129,0.08)" : "0 0 0 1px rgba(0,0,0,0.06), 0 40px 100px rgba(0,0,0,0.15)", animation: "float 6s ease-in-out infinite" }}>

            {/* Browser chrome */}
            <div style={{ background: dark ? "#1a1a1a" : "#f0f0f0", padding: "12px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              </div>
              <div style={{ flex: 1, background: dark ? "#0f0f0f" : "#e8e8e8", borderRadius: 6, padding: "4px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <Lock style={{ width: 10, height: 10, color: "#10b981" }} />
                <span style={{ fontSize: 11, color: muted, fontFamily: "monospace" }}>kuendigungsheld.de/generator</span>
              </div>
            </div>

            {/* App UI inside browser */}
            <div style={{ height: 420, background: dark ? "#0f0f0f" : "#f9f9f9" }}>
              <TypingDemo />
            </div>
          </div>

          {/* ── Floating cards ── */}

          {/* Top left — stat */}
          <div style={{ position: "absolute", left: -48, top: 40, background: cardSolid, border: `1px solid ${border}`, borderRadius: 16, padding: "14px 18px", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.6)" : "0 20px 60px rgba(0,0,0,0.12)", backdropFilter: "blur(20px)", animation: "float 5s 0.5s ease-in-out infinite", minWidth: 160 }}>
            <div style={{ fontSize: 10, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Diese Woche</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: fg, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {countT > 0 ? countT.toLocaleString("de-DE") : "—"}
              <span style={{ fontSize: 18 }}>+</span>
            </div>
            <div style={{ fontSize: 11, color: "#10b981", fontWeight: 600, marginTop: 4 }}>↑ Kündigungen</div>
          </div>

          {/* Top right — time */}
          <div style={{ position: "absolute", right: -48, top: 30, background: cardSolid, border: `1px solid ${border}`, borderRadius: 16, padding: "14px 18px", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.6)" : "0 20px 60px rgba(0,0,0,0.12)", backdropFilter: "blur(20px)", animation: "float 4s 1s ease-in-out infinite" }}>
            <div style={{ fontSize: 10, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Durchschnitt</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: fg, letterSpacing: "-0.03em", lineHeight: 1 }}>2</span>
              <span style={{ fontSize: 14, color: muted, fontWeight: 500 }}>Min.</span>
            </div>
            <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600, marginTop: 4 }}>⚡ Blitzschnell</div>
          </div>

          {/* Bottom left — rating */}
          <div style={{ position: "absolute", left: -32, bottom: -20, background: cardSolid, border: `1px solid ${border}`, borderRadius: 16, padding: "12px 16px", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.6)" : "0 20px 60px rgba(0,0,0,0.12)", backdropFilter: "blur(20px)", animation: "float 5.5s 0.3s ease-in-out infinite", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: fg }}>4.9</div>
            <div>
              <div style={{ display: "flex", gap: 1, marginBottom: 2 }}>
                {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 10, height: 10, color: "#fbbf24" }} />)}
              </div>
              <div style={{ fontSize: 10, color: muted }}>1.200+ Bewertungen</div>
            </div>
          </div>

          {/* Bottom right — KI badge */}
          <div style={{ position: "absolute", right: -32, bottom: -10, background: dark ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 16, padding: "12px 16px", boxShadow: "0 8px 32px rgba(124,58,237,0.2)", backdropFilter: "blur(20px)", animation: "float 4.5s 0.8s ease-in-out infinite", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#8b5cf6,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Sparkles style={{ width: 14, height: 14, color: "#fff" }} />
              <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: "#4ade80", border: "2px solid " + cardSolid }} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: fg }}>KI-Assistent</div>
              <div style={{ fontSize: 10, color: "rgba(139,92,246,0.8)", fontWeight: 500 }}>Online · Bereit</div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{ maxWidth: 700, margin: "80px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
          {[
            { val: countT.toLocaleString("de-DE") + "+", label: "Erfolgreich gekündigt", color: "#10b981" },
            { val: countC + "+", label: "Unterstützte Anbieter", color: "#3b82f6" },
            { val: "4.9★", label: "Nutzerbewertung", color: "#f59e0b" },
            { val: "100%", label: "Kostenlos", color: "#8b5cf6" },
          ].map(({ val, label, color }, i) => (
            <div key={label} style={{ flex: 1, textAlign: "center", padding: "20px 8px", borderLeft: i > 0 ? `1px solid ${border}` : "none" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color, letterSpacing: "-0.02em", lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 11, color: muted, marginTop: 6, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Feature chips */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 48, paddingTop: 32, borderTop: `1px solid ${border}` }}>
          {[
            { Icon: Shield, label: "DSGVO-konform" },
            { Icon: Zap, label: "In 2 Minuten fertig" },
            { Icon: CheckCircle, label: "Keine Registrierung" },
            { Icon: Lock, label: "SSL-verschlüsselt" },
          ].map(({ Icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: muted, fontWeight: 500 }}>
              <Icon style={{ width: 14, height: 14, color: "#10b981" }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}