"use client"

import { useState } from "react"
import { BookOpen, FileText, Scale, Lightbulb, ChevronRight, Copy, Check, Search, ArrowUpRight } from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "vorlagen", label: "Vorlagen", icon: FileText, count: 6 },
  { id: "gesetze", label: "Gesetze", icon: Scale, count: 5 },
  { id: "tipps", label: "Tipps", icon: Lightbulb, count: 5 },
]

const ARTICLES = [
  // ── Vorlagen ──
  {
    id: "v1",
    category: "vorlagen",
    title: "Standardkündigung",
    tag: "Allgemein",
    summary: "Universelles Kündigungsschreiben für alle Vertragsarten — Abo, Mitgliedschaft, Dienstleistung.",
    content: `[Ihr Name]
[Ihre Adresse]
[PLZ Ort]

[Datum]

Kündigung meines Vertrages

Sehr geehrte Damen und Herren,

hiermit kündige ich meinen Vertrag fristgerecht zum nächstmöglichen Termin.

Bitte bestätigen Sie mir die Kündigung sowie den genauen Kündigungstermin schriftlich.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v2",
    category: "vorlagen",
    title: "Außerordentliche Kündigung",
    tag: "Sonderfall",
    summary: "Sofortige Kündigung bei wichtigem Grund — Vertragsbruch, schwerwiegende Mängel, unzumutbare Bedingungen.",
    content: `[Ihr Name]
[Ihre Adresse]

[Datum]

Außerordentliche Kündigung aus wichtigem Grund

Sehr geehrte Damen und Herren,

hiermit kündige ich meinen Vertrag außerordentlich und fristlos gemäß § 314 BGB.

Grund: [Beschreiben Sie den wichtigen Grund — z.B. wiederholte Vertragsverletzung, erhebliche Mängel der Leistung etc.]

Ich fordere Sie auf, die Kündigung unverzüglich zu bestätigen und alle weiteren Zahlungseinzüge einzustellen.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v3",
    category: "vorlagen",
    title: "Kündigung nach Preiserhöhung",
    tag: "Sonderkündigung",
    summary: "Wenn der Anbieter einseitig die Preise erhöht, haben Sie ein Sonderkündigungsrecht.",
    content: `[Ihr Name]
[Ihre Adresse]

[Datum]

Sonderkündigung wegen Preiserhöhung

Sehr geehrte Damen und Herren,

mit Schreiben vom [Datum des Schreibens] haben Sie mir eine Preiserhöhung zum [Datum der Erhöhung] angekündigt.

Diese einseitige Vertragsänderung berechtigt mich zur außerordentlichen Kündigung. Ich kündige meinen Vertrag daher hiermit fristlos zum [Datum der Preiserhöhung].

Ich widerspreche der Preiserhöhung ausdrücklich.

Bitte bestätigen Sie die Kündigung schriftlich.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v4",
    category: "vorlagen",
    title: "Kündigung Fitnessstudio",
    tag: "Sport & Freizeit",
    summary: "Kündigung einer Fitnessstudio-Mitgliedschaft — ordentlich oder bei Umzug / Krankheit.",
    content: `[Ihr Name]
[Ihre Adresse]
Mitgliedsnummer: [Ihre Mitgliedsnummer]

[Datum]

Kündigung meiner Mitgliedschaft

Sehr geehrte Damen und Herren,

hiermit kündige ich meine Mitgliedschaft im [Name des Studios] fristgerecht zum [Kündigungsdatum].

Bitte bestätigen Sie mir die Kündigung sowie das Vertragsende schriftlich.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v5",
    category: "vorlagen",
    title: "Kündigung Mobilfunkvertrag",
    tag: "Telekommunikation",
    summary: "Handyvertrag bei Telekom, Vodafone, o2 & Co. kündigen — mit Rufnummermitnahme.",
    content: `[Ihr Name]
[Ihre Adresse]
Rufnummer: [Ihre Rufnummer]
Kundennummer: [Ihre Kundennummer]

[Datum]

Kündigung meines Mobilfunkvertrages

Sehr geehrte Damen und Herren,

hiermit kündige ich meinen Mobilfunkvertrag fristgerecht zum nächstmöglichen Termin.

Ich bitte um Mitnahme meiner Rufnummer [Rufnummer] zu meinem neuen Anbieter.

Bitte bestätigen Sie Kündigung und Portierungstermin schriftlich.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v6",
    category: "vorlagen",
    title: "Widerspruch gegen Mahnung",
    tag: "Rechtliches",
    summary: "Wenn Sie eine ungerechtfertigte Mahnung erhalten — so widersprechen Sie korrekt.",
    content: `[Ihr Name]
[Ihre Adresse]

[Datum]

Widerspruch gegen Mahnung vom [Datum der Mahnung]

Sehr geehrte Damen und Herren,

mit Schreiben vom [Datum] haben Sie mich gemahnt wegen angeblicher Forderung in Höhe von [Betrag] €.

Dieser Forderung widerspreche ich ausdrücklich. [Begründung: z.B. „Die Kündigung wurde fristgerecht am [Datum] eingereicht und bestätigt." / „Der genannte Betrag wurde bereits am [Datum] bezahlt."]

Ich fordere Sie auf, die Mahnung zurückzunehmen und von weiteren Mahnungen abzusehen.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },

  // ── Gesetze ──
  {
    id: "g1",
    category: "gesetze",
    title: "§ 314 BGB — Außerordentliche Kündigung",
    tag: "BGB",
    summary: "Jeder Vertrag kann bei einem wichtigen Grund sofort gekündigt werden — unabhängig von Fristen.",
    content: `Was bedeutet § 314 BGB?

§ 314 BGB gibt Ihnen das Recht, jeden Dauervertrag sofort zu kündigen, wenn ein „wichtiger Grund" vorliegt.

Ein wichtiger Grund liegt vor, wenn:
• Der Anbieter seine vertraglichen Pflichten erheblich verletzt
• Die Fortsetzung des Vertrages unzumutbar ist
• Wesentliche Vertragsbestandteile einseitig geändert werden

Wie geht das in der Praxis?
Sie müssen den Grund konkret benennen und idealerweise belegen. Die Kündigung muss schriftlich erfolgen.

Beispiele für wichtige Gründe:
• Dauerhafte Störungen / Ausfälle der Leistung
• Unzumutbare Preiserhöhungen
• Vertragsbruch durch den Anbieter
• Schwere Mängel der erbrachten Leistung`,
  },
  {
    id: "g2",
    category: "gesetze",
    title: "Kündigungsfristen — Was gilt wann?",
    tag: "Fristen",
    summary: "Übersicht der gesetzlichen Kündigungsfristen für die häufigsten Vertragsarten in Deutschland.",
    content: `Gesetzliche Kündigungsfristen in Deutschland

Mobilfunk & Internet:
• Mindestlaufzeit meist 24 Monate
• Kündigungsfrist: 1 Monat vor Ablauf
• Danach: monatlich kündbar (seit 2022, § 56 TKG)

Fitnessstudio / Vereine:
• Gesetzliche Mindestfrist: 1 Monat
• Viele Studios: 3 Monate — prüfen Sie Ihren Vertrag!

Streaming (Netflix, Disney+, etc.):
• Monatlich kündbar — meist zum Monatsende

Versicherungen:
• Jahresverträge: 1 Monat vor Verlängerung
• Bei Schadensfall: Sonderkündigungsrecht

Wichtig seit 2022:
Das „Gesetz für faire Verbraucherverträge" begrenzt Erstlaufzeiten auf 24 Monate und automatische Verlängerungen auf 1 Monat.`,
  },
  {
    id: "g3",
    category: "gesetze",
    title: "Sonderkündigungsrecht — Ihre Rechte",
    tag: "Verbraucherrecht",
    summary: "In diesen Situationen dürfen Sie jeden Vertrag sofort kündigen — unabhängig von Laufzeit.",
    content: `Wann haben Sie ein Sonderkündigungsrecht?

1. Preiserhöhung
Der Anbieter erhöht einseitig den Preis → Sie dürfen sofort kündigen, wirksam ab dem Zeitpunkt der Erhöhung.

2. Vertragsänderung (AGB-Änderung)
Ändert der Anbieter die AGB zu Ihrem Nachteil → Sonderkündigung innerhalb von 4 Wochen nach Bekanntgabe.

3. Umzug
Ist die Leistung am neuen Wohnort nicht verfügbar → außerordentliche Kündigung möglich (gilt besonders für Internet, TV-Kabel).

4. Todesfall
Verträge des Verstorbenen können von Erben mit kurzer Frist gekündigt werden.

5. Dauerhafte Störung
Ist die Leistung dauerhaft mangelhaft (z.B. kein Internet über Wochen) → Recht auf fristlose Kündigung nach erfolgloser Abmahnung.`,
  },
  {
    id: "g4",
    category: "gesetze",
    title: "Faire Verbraucherverträge — Gesetz 2022",
    tag: "Neu seit 2022",
    summary: "Seit März 2022 gelten strenge Regeln für Laufzeiten und automatische Verlängerungen.",
    content: `Das Gesetz für faire Verbraucherverträge (seit 01.03.2022)

Was hat sich geändert?

Maximale Erstlaufzeit: 24 Monate
Verträge mit Verbrauchern dürfen maximal 2 Jahre Erstlaufzeit haben.

Automatische Verlängerung: nur noch 1 Monat
Wird ein Vertrag nicht rechtzeitig gekündigt, verlängert er sich nur noch um 1 Monat (früher oft 12 Monate).

Kündigung danach: jederzeit mit 1 Monat Frist
Nach der Erstlaufzeit können Sie monatlich kündigen.

Gilt für: alle neuen Verbraucherverträge ab 01.03.2022
Betroffen: Fitnessstudios, Mobilfunk, Internet, Streaming, Vereine, Zeitschriften-Abos etc.

Ausnahmen: Versicherungen, Mietverträge und Finanzprodukte folgen eigenen Regeln.`,
  },
  {
    id: "g5",
    category: "gesetze",
    title: "Schriftformerfordernis — Wann muss es schriftlich sein?",
    tag: "Formvorschriften",
    summary: "Nicht jede Kündigung muss per Brief. Aber wann reicht E-Mail, wann braucht es Einschreiben?",
    content: `Schriftform bei Kündigungen — was gilt?

Gesetzliche Grundregel:
Eine Kündigung ist formfrei möglich — also auch mündlich oder per E-Mail. Aber: Im Streitfall müssen Sie die Kündigung beweisen können.

Wann Textform (E-Mail, Fax) reicht:
• Streaming-Dienste (Netflix, Spotify)
• Viele Online-Abos
• Wenn im Vertrag „Textform" steht

Wann Schriftform (eigenhändige Unterschrift) nötig ist:
• Mietverträge
• Arbeitsverträge
• Wenn der Vertrag „Schriftform" vorschreibt

Unsere Empfehlung — immer:
Schicken Sie Kündigungen per Einschreiben mit Rückschein. So haben Sie einen Nachweis über Versand und Empfang. Das kostet ~3-4€ und kann im Streitfall sehr viel wert sein.`,
  },

  // ── Tipps ──
  {
    id: "t1",
    category: "tipps",
    title: "Die 5 häufigsten Fehler beim Kündigen",
    tag: "Grundlagen",
    summary: "Diese Fehler kosten Sie Zeit, Geld und Nerven — und wie Sie sie vermeiden.",
    content: `Die 5 häufigsten Kündigungsfehler

1. Fristen verpassen
Viele Verträge verlängern sich automatisch wenn Sie nicht rechtzeitig kündigen. Tragen Sie den Kündigungstermin sofort in Ihren Kalender ein.

2. Keine schriftliche Bestätigung anfordern
Fordern Sie immer eine Bestätigung der Kündigung an. Ohne Bestätigung haben Sie keinen Nachweis.

3. Falsche Adresse
Kündigen Sie immer an die offizielle Adresse des Unternehmens — nicht an eine Support-E-Mail. Prüfen Sie die Adresse auf der Website oder im Vertrag.

4. Kein Einschreiben
Ohne Einschreiben können Anbieter behaupten, nichts erhalten zu haben. Porto für Einschreiben: ~3-4€.

5. Unvollständige Angaben
Vergessen Sie nie: Ihren vollständigen Namen, Adresse, Kundennummer und die Vertragsnummer. Fehlende Angaben können zur Ablehnung führen.`,
  },
  {
    id: "t2",
    category: "tipps",
    title: "Kündigung per Einschreiben — Schritt für Schritt",
    tag: "Anleitung",
    summary: "So versenden Sie Ihre Kündigung rechtssicher per Post — mit Nachweis.",
    content: `Kündigung per Einschreiben versenden

Warum Einschreiben?
Mit einem Einschreiben haben Sie den Beweis, dass die Kündigung beim Empfänger angekommen ist. Das ist entscheidend bei Streitigkeiten.

Schritt für Schritt:

1. Kündigungsschreiben ausdrucken und unterschreiben

2. In einen Umschlag stecken (keine Heftklammern!)

3. Zur Post gehen und sagen: „Einschreiben mit Rückschein"
   → Kosten: ca. 3,90 € + Porto

4. Den Einlieferungsbeleg aufbewahren
   → Nachweis des Versands

5. Den Rückschein aufbewahren wenn er zurückkommt
   → Nachweis des Empfangs

6. Schriftliche Bestätigung vom Anbieter abwarten
   → Innerhalb von 2 Wochen sollte eine Bestätigung kommen

Tipp: Fotografieren Sie das Schreiben vor dem Eintüten als zusätzlichen Nachweis des Inhalts.`,
  },
  {
    id: "t3",
    category: "tipps",
    title: "Was tun wenn der Anbieter nicht antwortet?",
    tag: "Problemlösung",
    summary: "Keine Bestätigung erhalten? So gehen Sie richtig vor.",
    content: `Anbieter antwortet nicht — was nun?

Zunächst: Ruhe bewahren
Eine fehlende Bestätigung bedeutet nicht, dass die Kündigung ungültig ist. Die Kündigung ist wirksam, sobald sie dem Anbieter zugegangen ist.

Schritt 1 — Nachfassen (nach 2 Wochen)
Schreiben Sie erneut und fordern Sie ausdrücklich die Bestätigung Ihrer Kündigung vom [Datum] an.

Schritt 2 — Fristsetzung
Setzen Sie eine konkrete Frist: „Bitte bestätigen Sie die Kündigung bis zum [Datum + 1 Woche]."

Schritt 3 — Verbraucherzentrale einschalten
Die Verbraucherzentrale berät kostenlos und kann im Namen abmahnen. Oft reicht allein die Erwähnung.

Schritt 4 — Lastschrift widerrufen
Wenn trotz Kündigung weiter Geld abgebucht wird: Widerrufen Sie die Lastschrift bei Ihrer Bank (bis 8 Wochen nach Abbuchung möglich).

Schritt 5 — Schlichtung / Klagemöglichkeiten
Bei Telekommunikation: Bundesnetzagentur einschalten (kostenlos).`,
  },
  {
    id: "t4",
    category: "tipps",
    title: "Kündigen und wechseln — So sparen Sie",
    tag: "Sparen",
    summary: "Beim Anbieterwechsel lässt sich oft viel Geld sparen. Diese Tipps helfen.",
    content: `Kündigen und clever wechseln

Wann lohnt sich der Wechsel?
• Mobilfunk: Alle 2 Jahre entstehen Neukunden-Angebote, die oft 30-50% günstiger sind
• Strom & Gas: Jährlicher Wechsel kann 200-400€ sparen
• Internet: Neue Tarife sind oft schneller und günstiger als Ihr Bestandsvertrag

Vorgehen beim Wechsel:

1. Aktuellen Vertrag und Kündigungsfrist prüfen
2. Vergleichsportal nutzen (Verivox, Check24)
3. Neuen Anbieter wählen — viele übernehmen die Kündigung beim Altanbieter
4. Bei Mobilfunk: Rufnummermitnahme beantragen (kostenlos!)
5. Alten Vertrag trotzdem selbst kündigen als Sicherheit

Wichtig: Schließen Sie den neuen Vertrag erst ab, wenn der alte gekündigt ist — außer der neue Anbieter garantiert die Übernahme der Kündigung.`,
  },
  {
    id: "t5",
    category: "tipps",
    title: "Digitale Abos im Überblick behalten",
    tag: "Organisation",
    summary: "Viele zahlen für Abos die sie vergessen haben. So behalten Sie den Überblick.",
    content: `Abos verwalten — so verlieren Sie nichts aus den Augen

Das Problem:
Laut Studien zahlen Deutsche durchschnittlich für 3-5 Abos die sie kaum oder gar nicht nutzen. Das sind schnell 50-100€ pro Monat.

So schaffen Sie Ordnung:

1. Kontoauszug durchgehen
Schauen Sie die letzten 3 Monate durch — markieren Sie alle regelmäßigen Abbuchungen.

2. Liste erstellen
Name des Abos | Betrag | Kündigungsfrist | Nächste Verlängerung

3. Sofort kündigen was Sie nicht nutzen
Nutzen Sie KündigungsHeld — in 2 Minuten erledigt.

4. Kalender-Erinnerungen setzen
Tragen Sie alle Kündigungsfristen 6 Wochen vor Ablauf als Erinnerung ein.

5. Abo-Tracking-Apps nutzen
Apps wie „Treefin" oder „Finanzguru" erkennen Abos automatisch in Ihren Kontodaten.

Faustregel: Haben Sie ein Abo in den letzten 30 Tagen nicht genutzt? Kündigen Sie es.`,
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function KikiSection() {
  const [activeCategory, setActiveCategory] = useState("vorlagen")
  const [activeArticle, setActiveArticle] = useState<typeof ARTICLES[0] | null>(null)
  const [search, setSearch] = useState("")
  const [copied, setCopied] = useState(false)

  const filtered = ARTICLES.filter((a) => {
    const matchCat = a.category === activeCategory
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleCopy = () => {
    if (!activeArticle) return
    navigator.clipboard.writeText(activeArticle.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="kiki" className="py-20 bg-muted/20 border-y border-border/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              Wissensdatenbank
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Kiki
              <span className="ml-3 text-base font-normal text-muted-foreground">— Ihre Kündigungs-Bibliothek</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg">
              Vorlagen, Gesetze und Tipps — alles was Sie zum Thema Kündigung wissen müssen, kompakt und verständlich.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen…"
              className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-colors"
            />
          </div>
        </div>

        {/* Mobile category tabs — above the flex row on mobile */}
        <div className="lg:hidden w-full mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setActiveArticle(null) }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive ? "bg-foreground text-background" : "border border-border/60 bg-background text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="flex gap-6 lg:gap-8">

          {/* Sidebar */}
          <aside className="hidden w-48 shrink-0 lg:block">
            <nav className="sticky top-20 space-y-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setActiveArticle(null) }}
                    className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      {cat.label}
                    </div>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                      isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {!activeArticle ? (
              /* Article list */
              <div className="grid gap-3 sm:grid-cols-2">
                {filtered.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="group flex flex-col items-start gap-2 rounded-xl border border-border/60 bg-background p-5 text-left transition-all duration-200 hover:border-foreground/20 hover:shadow-sm"
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <span className="inline-flex items-center rounded-md border border-border/50 bg-muted/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {article.tag}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{article.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.summary}</p>
                  </button>
                ))}

                {filtered.length === 0 && (
                  <div className="sm:col-span-2 py-16 text-center text-muted-foreground text-sm">
                    Keine Ergebnisse für „{search}"
                  </div>
                )}
              </div>
            ) : (
              /* Article detail */
              <div className="rounded-xl border border-border/60 bg-background overflow-hidden">
                {/* Article header */}
                <div className="flex flex-col gap-3 border-b border-border/40 p-5 sm:p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <span className="inline-flex items-center rounded-md border border-border/50 bg-muted/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      {activeArticle.tag}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{activeArticle.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{activeArticle.summary}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 flex-wrap sm:flex-nowrap">
                    {activeArticle.category === "vorlagen" && (
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {copied ? <><Check className="h-3.5 w-3.5 text-green-500" />Kopiert</> : <><Copy className="h-3.5 w-3.5" />Vorlage kopieren</>}
                      </button>
                    )}
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      ← Zurück
                    </button>
                  </div>
                </div>

                {/* Article body */}
                <div className="p-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground bg-muted/30 rounded-xl border border-border/40 p-4 sm:p-6 overflow-x-auto break-words">
                    {activeArticle.content}
                  </pre>
                </div>

                {/* CTA */}
                {activeArticle.category === "vorlagen" && (
                  <div className="border-t border-border/40 bg-muted/20 px-5 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="text-xs text-muted-foreground">Möchten Sie die Vorlage mit Ihren Daten ausfüllen lassen?</p>
                    <a
                      href="#generator"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                    >
                      Zum Generator <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}