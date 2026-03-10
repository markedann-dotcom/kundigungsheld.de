"use client"

import { useState } from "react"
import { BookOpen, FileText, Scale, Lightbulb, ChevronRight, Copy, Check, Search, ArrowUpRight, Home, Shield } from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "vorlagen",      label: "Vorlagen",      icon: FileText, count: 12 },
  { id: "gesetze",       label: "Gesetze",        icon: Scale,    count: 10 },
  { id: "tipps",         label: "Tipps",          icon: Lightbulb,count: 10 },
  { id: "wohnen",        label: "Wohnen",         icon: Home,     count: 8  },
  { id: "versicherungen",label: "Versicherungen", icon: Shield,   count: 7  },
]

const ARTICLES = [

  // ──────────────────────────────────────────────────────────────────────────
  // VORLAGEN
  // ──────────────────────────────────────────────────────────────────────────
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

Betreff: Kündigung meines Vertrages

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
[PLZ Ort]

[Datum]

Betreff: Außerordentliche Kündigung aus wichtigem Grund

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
[PLZ Ort]

[Datum]

Betreff: Sonderkündigung wegen Preiserhöhung

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
[PLZ Ort]
Mitgliedsnummer: [Ihre Mitgliedsnummer]

[Datum]

Betreff: Kündigung meiner Mitgliedschaft

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
[PLZ Ort]
Rufnummer: [Ihre Rufnummer]
Kundennummer: [Ihre Kundennummer]

[Datum]

Betreff: Kündigung meines Mobilfunkvertrages

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
[PLZ Ort]

[Datum]

Betreff: Widerspruch gegen Mahnung vom [Datum der Mahnung]

Sehr geehrte Damen und Herren,

mit Schreiben vom [Datum] haben Sie mich gemahnt wegen angeblicher Forderung in Höhe von [Betrag] €.

Dieser Forderung widerspreche ich ausdrücklich. [Begründung: z.B. „Die Kündigung wurde fristgerecht am [Datum] eingereicht und bestätigt." / „Der genannte Betrag wurde bereits am [Datum] bezahlt."]

Ich fordere Sie auf, die Mahnung zurückzunehmen und von weiteren Mahnungen abzusehen.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v7",
    category: "vorlagen",
    title: "Kündigung Internetvertrag",
    tag: "Telekommunikation",
    summary: "DSL- oder Kabelvertrag bei Telekom, Vodafone, 1&1 o.ä. fristgerecht kündigen.",
    content: `[Ihr Name]
[Ihre Adresse]
[PLZ Ort]
Kundennummer: [Ihre Kundennummer]
Vertragsnummer: [Ihre Vertragsnummer]

[Datum]

Betreff: Kündigung meines Internetvertrages

Sehr geehrte Damen und Herren,

hiermit kündige ich meinen Internetvertrag (Kundennummer: [Kundennummer]) fristgerecht zum nächstmöglichen Termin.

Bitte teilen Sie mir den genauen Kündigungstermin schriftlich mit und veranlassen Sie die Rückgabe bzw. Abholung des Routers.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v8",
    category: "vorlagen",
    title: "Kündigung Stromvertrag",
    tag: "Energie",
    summary: "Stromvertrag kündigen und zu einem günstigeren Anbieter wechseln.",
    content: `[Ihr Name]
[Ihre Adresse]
[PLZ Ort]
Kundennummer: [Ihre Kundennummer]
Zählernummer: [Ihre Zählernummer]

[Datum]

Betreff: Kündigung meines Stromliefervertrages

Sehr geehrte Damen und Herren,

hiermit kündige ich meinen Stromliefervertrag fristgerecht zum nächstmöglichen Termin.

Bitte bestätigen Sie mir den genauen Kündigungstermin schriftlich.

Den aktuellen Zählerstand zum Kündigungstermin werde ich Ihnen rechtzeitig mitteilen.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v9",
    category: "vorlagen",
    title: "Kündigung Streaming-Dienst",
    tag: "Digital",
    summary: "Netflix, Disney+, Spotify, Amazon Prime & Co. per Brief oder E-Mail kündigen.",
    content: `[Ihr Name]
[Ihre E-Mail-Adresse / Kontoname]

[Datum]

Betreff: Kündigung meines Abonnements

Sehr geehrte Damen und Herren,

hiermit kündige ich mein Abonnement bei [Name des Dienstes] zum nächstmöglichen Termin.

Bitte bestätigen Sie die Kündigung und das genaue Vertragsende per E-Mail.

Hinweis: Die meisten Streaming-Dienste lassen sich auch direkt im Konto-Bereich der App oder Website kündigen. Ein Nachweis per E-Mail ist dennoch empfehlenswert.

Mit freundlichen Grüßen

[Ihr Name]`,
  },
  {
    id: "v10",
    category: "vorlagen",
    title: "Kündigung Zeitschriften-Abo",
    tag: "Medien",
    summary: "Zeitschriften- oder Zeitungsabo kündigen — auch bei automatischer Verlängerung.",
    content: `[Ihr Name]
[Ihre Adresse]
[PLZ Ort]
Abonnementnummer: [Ihre Abonummer]

[Datum]

Betreff: Kündigung meines Abonnements

Sehr geehrte Damen und Herren,

hiermit kündige ich mein Abonnement [Name der Zeitschrift / Zeitung] mit der Abonnementnummer [Abonummer] fristgerecht zum nächstmöglichen Termin.

Ich widerspreche ausdrücklich einer automatischen Verlängerung des Abonnements.

Bitte bestätigen Sie mir das Vertragsende schriftlich.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v11",
    category: "vorlagen",
    title: "Kündigung Fitnessstudio bei Krankheit",
    tag: "Sonderkündigung",
    summary: "Bei dauerhafter Krankheit oder Verletzung besteht ein Sonderkündigungsrecht.",
    content: `[Ihr Name]
[Ihre Adresse]
[PLZ Ort]
Mitgliedsnummer: [Ihre Mitgliedsnummer]

[Datum]

Betreff: Außerordentliche Kündigung aus gesundheitlichen Gründen

Sehr geehrte Damen und Herren,

hiermit kündige ich meine Mitgliedschaft im [Name des Studios] außerordentlich zum [Datum].

Aufgrund meiner gesundheitlichen Einschränkungen (ärztliches Attest liegt bei / wird nachgereicht) ist mir die Nutzung des Studios dauerhaft nicht mehr möglich.

Ich bitte um schriftliche Bestätigung der Kündigung sowie um Rückerstattung bereits geleisteter Zahlungen ab dem Kündigungsdatum.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },
  {
    id: "v12",
    category: "vorlagen",
    title: "Kündigung Vereinsmitgliedschaft",
    tag: "Verein",
    summary: "Mitgliedschaft in einem Verein — Sport, Kultur, ADAC etc. — sauber kündigen.",
    content: `[Ihr Name]
[Ihre Adresse]
[PLZ Ort]
Mitgliedsnummer: [Ihre Mitgliedsnummer]

[Datum]

Betreff: Kündigung meiner Vereinsmitgliedschaft

Sehr geehrte Damen und Herren,

hiermit kündige ich meine Mitgliedschaft im [Name des Vereins] fristgerecht zum [nächstmöglichen Termin / 31.12.XXXX].

Bitte bestätigen Sie mir den Austritt sowie die Einstellung der Beitragszahlungen schriftlich.

Mit freundlichen Grüßen

[Unterschrift]
[Ihr Name]`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // GESETZE
  // ──────────────────────────────────────────────────────────────────────────
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
• Schwere Mängel der erbrachten Leistung

Frist:
Die Kündigung muss innerhalb einer „angemessenen Frist" nach Bekanntwerden des Grundes erfolgen. Warten Sie nicht länger als 2–4 Wochen.`,
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

Mietverträge (Mieter):
• 3 Monate Kündigungsfrist (§ 573c BGB)
• Zum dritten Werktag eines Monats schriftlich einreichen

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
Ist die Leistung dauerhaft mangelhaft (z.B. kein Internet über Wochen) → Recht auf fristlose Kündigung nach erfolgloser Abmahnung.

6. Insolvenz des Anbieters
Bei Insolvenz des Vertragspartners besteht in vielen Fällen ein Sonderkündigungsrecht.`,
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

Kündigungsbutton Pflicht (seit Juli 2022)
Alle Unternehmen mit Online-Abschlüssen müssen einen gut sichtbaren „Kündigungsbutton" auf ihrer Website anbieten.

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
  {
    id: "g6",
    category: "gesetze",
    title: "§ 626 BGB — Kündigung Arbeitsverhältnis",
    tag: "Arbeitsrecht",
    summary: "Fristlose Kündigung im Arbeitsrecht — Voraussetzungen für Arbeitnehmer und Arbeitgeber.",
    content: `§ 626 BGB — Fristlose Kündigung aus wichtigem Grund

Was regelt § 626 BGB?
Sowohl Arbeitnehmer als auch Arbeitgeber können ein Arbeitsverhältnis ohne Einhalten der Kündigungsfrist kündigen, wenn ein wichtiger Grund vorliegt.

Wichtige Gründe für Arbeitnehmer:
• Monatelanger Lohnrückstand
• Schwere Beleidigung oder Übergriffe durch Vorgesetzte
• Zumutbarer Arbeitsschutzverstoß
• Falschangaben bei Vertragsschluss durch den Arbeitgeber

Wichtige Gründe für Arbeitgeber:
• Diebstahl / Unterschlagung
• Arbeitsverweigerung
• Schwere Verletzung der Treuepflicht
• Straftaten im Betrieb

Frist:
Die Kündigung muss innerhalb von 2 Wochen nach Kenntnis des Kündigungsgrundes erfolgen (§ 626 Abs. 2 BGB).

Wichtig: Vor einer fristlosen Kündigung ist in vielen Fällen eine Abmahnung erforderlich.`,
  },
  {
    id: "g7",
    category: "gesetze",
    title: "Widerrufsrecht — 14 Tage ohne Angabe von Gründen",
    tag: "Verbraucherrecht",
    summary: "Bei Online- und Telefon-Vertragsabschlüssen haben Sie 14 Tage Widerrufsrecht.",
    content: `Das Widerrufsrecht — Ihre 14 Tage Bedenkzeit

Was ist das Widerrufsrecht?
Bei Verträgen, die außerhalb von Geschäftsräumen oder online abgeschlossen wurden, haben Sie das Recht, innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen (§ 355 BGB).

Wann beginnt die Frist?
• Bei Dienstleistungen: ab Vertragsschluss
• Bei Waren: ab Erhalt der Ware

Was ist kein Widerrufsrecht?
• Im Ladengeschäft abgeschlossene Verträge (außer Haustürgeschäfte)
• Individuell angefertigte Waren
• Digitale Inhalte (wenn Download bereits begonnen)

So widerrufen Sie:
Schriftlich per E-Mail oder Brief an den Anbieter. Formulierung: „Hiermit widerrufe ich meinen Vertrag vom [Datum]."

Wichtig: Wenn der Anbieter Sie nicht ordnungsgemäß über das Widerrufsrecht informiert hat, verlängert sich die Frist auf 12 Monate + 14 Tage.`,
  },
  {
    id: "g8",
    category: "gesetze",
    title: "§ 56 TKG — Telekommunikationsgesetz 2022",
    tag: "TKG",
    summary: "Das neue TKG stärkt Verbraucherrechte bei Mobilfunk und Internet erheblich.",
    content: `§ 56 TKG — Neue Rechte bei Telekommunikationsverträgen

Was hat sich seit Dezember 2021 geändert?

Maximale Erstlaufzeit: 24 Monate
Kein Anbieter darf mehr als 2 Jahre Mindestlaufzeit verlangen.

Automatische Verlängerung: nur 1 Monat
Nach der Erstlaufzeit verlängert sich der Vertrag nur noch monatlich.

Monatliche Kündbarkeit nach Erstlaufzeit
Jederzeit mit 1 Monat Frist kündbar — keine langen Bindungen mehr.

Recht auf Entstörung
Bei dauerhaften Störungen haben Sie Anspruch auf Entstörung innerhalb angemessener Frist, andernfalls Sonderkündigungsrecht.

Minderungsrecht bei Störungen
Ist die vereinbarte Geschwindigkeit dauerhaft nicht erreichbar, können Sie den Preis mindern.

Portierungsrecht
Rufnummermitnahme muss kostenlos und innerhalb von 1 Werktag erfolgen.`,
  },
  {
    id: "g9",
    category: "gesetze",
    title: "DSGVO — Ihre Datenschutzrechte",
    tag: "Datenschutz",
    summary: "Nach Kündigung können Sie die Löschung Ihrer Daten verlangen — so geht's.",
    content: `DSGVO — Datenschutz nach der Kündigung

Recht auf Löschung (Art. 17 DSGVO)
Nach Beendigung eines Vertragsverhältnisses können Sie die Löschung Ihrer personenbezogenen Daten verlangen, sobald diese nicht mehr für den ursprünglichen Zweck benötigt werden.

Ausnahmen:
• Gesetzliche Aufbewahrungspflichten (z.B. 10 Jahre für Rechnungen)
• Laufende Rechtsstreitigkeiten

So fordern Sie die Löschung:
Schreiben Sie an den Datenschutzbeauftragten des Unternehmens: „Hiermit beantrage ich gemäß Art. 17 DSGVO die unverzügliche Löschung aller mich betreffenden personenbezogenen Daten."

Reaktionsfrist: 1 Monat (kann auf 3 Monate verlängert werden)

Bei Verstößen:
Beschwerde bei der zuständigen Datenschutzbehörde (in DE: Landesbehörde je nach Bundesland).`,
  },
  {
    id: "g10",
    category: "gesetze",
    title: "AGB-Kontrolle — Unwirksame Klauseln erkennen",
    tag: "AGB",
    summary: "Nicht alle AGB-Klauseln sind rechtlich wirksam — das sollten Sie wissen.",
    content: `Wann sind AGB-Klauseln unwirksam?

Grundsatz (§ 307 BGB):
AGB-Klauseln sind unwirksam, wenn sie den Vertragspartner unangemessen benachteiligen oder gegen wesentliche Grundgedanken des Gesetzes verstoßen.

Typisch unwirksame Klauseln:
• Laufzeiten über 24 Monate bei Verbraucherverträgen
• Automatische Verlängerung um mehr als 1 Jahr
• Ausschluss des gesetzlichen Widerrufsrechts
• Übermäßige Vertragsstrafen
• Einseitige Preiserhöhungsrechte ohne Sonderkündigungsrecht

Was bedeutet das für Sie?
Wenn eine Klausel unwirksam ist, gilt stattdessen das Gesetz — oft zu Ihren Gunsten. Eine Kündigung, die wegen einer unwirksamen Fristklausel „zu früh" wäre, kann dennoch wirksam sein.

Wo prüfen?
Verbraucherzentrale.de oder abmahnungsschutz.de listen bekannte unwirksame Klauseln.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TIPPS
  // ──────────────────────────────────────────────────────────────────────────
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
Mit einem Einschreiben haben Sie den Beweis, dass die Kündigung beim Empfänger angekommen ist.

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
Schreiben Sie erneut und fordern Sie die Bestätigung Ihrer Kündigung an.

Schritt 2 — Fristsetzung
Setzen Sie eine konkrete Frist: „Bitte bestätigen Sie die Kündigung bis zum [Datum + 1 Woche]."

Schritt 3 — Verbraucherzentrale einschalten
Die Verbraucherzentrale berät kostenlos und kann im Namen abmahnen.

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
  {
    id: "t6",
    category: "tipps",
    title: "Kündigung per E-Mail — Was muss rein?",
    tag: "Anleitung",
    summary: "E-Mail-Kündigung ist oft möglich — aber nur wenn Sie diese Punkte beachten.",
    content: `Kündigung per E-Mail — So geht's richtig

Wann ist E-Mail erlaubt?
• Wenn der Vertrag keine Schriftform vorschreibt
• Bei den meisten Streaming-Diensten, Online-Abos, Vereinsmitgliedschaften

Was muss in die E-Mail?
✓ Vollständiger Name
✓ Vollständige Adresse
✓ Kundennummer / Vertragsnummer
✓ Klare Aussage: „Ich kündige hiermit..."
✓ Gewünschtes Kündigungsdatum
✓ Bitte um schriftliche Bestätigung

Betreff: „Kündigung meines Vertrages – [Kundennummer]"

Empfehlung:
Fordern Sie immer eine Lesebestätigung an und speichern Sie die gesendete E-Mail. Drucken Sie die Bestätigungs-E-Mail aus und heben Sie sie auf.

Achtung bei Mietverträgen und Arbeitsverträgen:
Hier ist gesetzlich Schriftform (eigenhändige Unterschrift) erforderlich — E-Mail reicht nicht!`,
  },
  {
    id: "t7",
    category: "tipps",
    title: "Rückforderung zu viel gezahlter Beträge",
    tag: "Geld zurück",
    summary: "Wenn der Anbieter nach Kündigung weiter Geld abbucht, können Sie es zurückfordern.",
    content: `Zu viel gezahlt — so fordern Sie Ihr Geld zurück

Situation: Anbieter zieht nach Kündigung weiter Geld ein

Schritt 1: Lastschrift zurückbuchen lassen
Bis zu 8 Wochen nach Abbuchung können Sie der Lastschrift bei Ihrer Bank widersprechen. Das ist kostenlos und unkompliziert.

Schritt 2: Rückforderungsschreiben
Fordern Sie die zu viel gezahlten Beträge schriftlich zurück:
„Hiermit fordere ich die widerrechtlich eingezogenen Beträge von insgesamt [Betrag] € zurück. Bitte überweisen Sie den Betrag bis zum [Datum] auf mein Konto."

Schritt 3: Frist setzen
Setzen Sie eine Frist von 14 Tagen. Mahnen Sie danach schriftlich.

Schritt 4: Verbraucherzentrale / Inkasso
Bei Weigerung: Verbraucherzentrale einschalten oder Inkasso beauftragen (lohnt sich ab ca. 50 €).

Verjährungsfrist: 3 Jahre (Ende des jeweiligen Jahres)`,
  },
  {
    id: "t8",
    category: "tipps",
    title: "Kündigung dokumentieren — Checkliste",
    tag: "Checkliste",
    summary: "Diese Unterlagen sollten Sie nach jeder Kündigung aufbewahren.",
    content: `Kündigung dokumentieren — Ihre Checkliste

Nach jeder Kündigung aufbewahren:

□ Kopie des Kündigungsschreibens
□ Einlieferungsbeleg vom Einschreiben (oder gesendete E-Mail)
□ Rückschein / Lesebestätigung
□ Schriftliche Bestätigung des Anbieters
□ Letzter Kontoauszug mit Abbuchung

Digital sichern:
• Fotografieren Sie alle Belege und speichern Sie sie in einem Ordner „Kündigungen/[Anbietername]/[Jahr]"
• Verwenden Sie eine Cloud (Google Drive, iCloud) als Backup

Aufbewahrungsdauer:
• Mindestens 3 Jahre (Verjährungsfrist)
• Bei Miet- und Arbeitsverträgen: 10 Jahre empfohlen

Tipp: Legen Sie einen E-Mail-Ordner „Kündigungen" an und verschieben Sie alle Bestätigungen dorthin sofort.`,
  },
  {
    id: "t9",
    category: "tipps",
    title: "Kündigung verweigert — Was nun?",
    tag: "Problemlösung",
    summary: "Der Anbieter akzeptiert Ihre Kündigung nicht. Diese Schritte helfen.",
    content: `Kündigung wird abgelehnt — Ihre Optionen

Warum lehnen Anbieter Kündigungen ab?
• Angeblich fehlende Angaben (Kundennummer, Unterschrift)
• Behauptung, Frist sei nicht eingehalten
• Interne Fehler / Verzögerungen

Schritt 1: Nachweise prüfen
Haben Sie alle Pflichtangaben gemacht? Waren Sie fristgerecht? Prüfen Sie Ihren Vertrag.

Schritt 2: Erneut schriftlich kündigen
Kündigen Sie erneut — diesmal per Einschreiben mit explizitem Verweis auf die erste Kündigung: „Hiermit wiederhole ich vorsorglich meine Kündigung vom [Datum]."

Schritt 3: Verbraucherzentrale einschalten
Kostenlose Erstberatung. Oft reicht ein Schreiben der Verbraucherzentrale.

Schritt 4: Schlichtungsstelle
• Telekommunikation: Bundesnetzagentur (bundesnetzagentur.de)
• Energie: Schlichtungsstelle Energie (schlichtungsstelle-energie.de)
• Allgemein: Universalschlichtungsstelle des Bundes

Schritt 5: Anwalt / Klagemöglichkeit
Bei kleineren Beträgen: Amtsgericht (ohne Anwalt möglich bis 5.000 €).`,
  },
  {
    id: "t10",
    category: "tipps",
    title: "Kündigung als Druckmittel — Retention-Angebote",
    tag: "Verhandlung",
    summary: "Viele Anbieter machen beim Kündigen bessere Angebote. So verhandeln Sie richtig.",
    content: `Retention-Angebote — Kündigung als Verhandlungsstrategie

Was sind Retention-Angebote?
Wenn Sie kündigen, versuchen Anbieter Sie mit Sonderangeboten zu halten — oft deutlich günstiger als Ihr aktueller Tarif.

Wann funktioniert das?
• Mobilfunk & Internet: fast immer
• Fitnessstudios: häufig (Beitragspause, Beitragsreduzierung)
• Streaming: selten, aber möglich

So gehen Sie vor:
1. Kündigen Sie offiziell und fristgerecht
2. Warten Sie auf den Rückruf / die Retentions-E-Mail
3. Verhandeln Sie: „Was können Sie mir anbieten, damit ich bleibe?"
4. Vergleichen Sie das Angebot mit Marktpreisen (Check24, Verivox)
5. Nehmen Sie nur an, wenn das Angebot wirklich gut ist

Wichtig:
Nehmen Sie mündliche Angebote nie an ohne schriftliche Bestätigung. Lassen Sie sich das neue Angebot immer schriftlich schicken, bevor Sie die Kündigung zurückziehen.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // WOHNEN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "w1",
    category: "wohnen",
    title: "Mietkündigung durch den Mieter",
    tag: "Mietrecht",
    summary: "Als Mieter können Sie mit 3 Monaten Frist kündigen — so geht es rechtssicher.",
    content: `Mietkündigung — Grundlagen für Mieter

Gesetzliche Kündigungsfrist (§ 573c BGB):
3 Monate — immer zum Ende eines Kalendermonats

Wichtige Frist:
Die Kündigung muss spätestens am 3. Werktag des Monats beim Vermieter eingehen, damit sie zum Ende dieses Monats + 3 Monate gilt.

Beispiel:
Kündigung eingeht am 3. Januar → Mietende: 30. April

Formvorschrift: Schriftform zwingend!
• Eigenhändige Unterschrift aller Mieter erforderlich
• Per Einschreiben mit Rückschein versenden
• E-Mail oder mündlich reicht NICHT

Inhalt der Kündigung:
✓ Namen aller Mieter
✓ Vollständige Anschrift der Wohnung
✓ Klare Kündigungserklärung
✓ Gewünschtes Mietende
✓ Bitte um schriftliche Bestätigung

Tipp: Kein Kündigungsgrund erforderlich — Mieter müssen nicht erklären warum sie ausziehen.`,
  },
  {
    id: "w2",
    category: "wohnen",
    title: "Kündigung durch den Vermieter",
    tag: "Mietrecht",
    summary: "Vermieter können nur bei berechtigtem Interesse kündigen — Ihre Rechte als Mieter.",
    content: `Vermieterkündigung — was ist erlaubt?

Vermieter brauchen einen Grund!
Anders als Mieter können Vermieter nicht einfach so kündigen. Sie brauchen ein „berechtigtes Interesse" (§ 573 BGB).

Anerkannte Gründe:
1. Eigenbedarf — Vermieter oder nahe Angehörige wollen einziehen
2. Erhebliche Pflichtverletzung des Mieters (z.B. mehrfache Nichtzahlung)
3. Hinderung an wirtschaftlicher Verwertung (selten anerkannt)

Kündigungsfristen für Vermieter (länger als für Mieter!):
• Mietdauer bis 5 Jahre: 3 Monate
• 5–8 Jahre: 6 Monate
• Über 8 Jahre: 9 Monate

Schutz gegen Eigenbedarfskündigung:
• Soziale Härte geltend machen (Alter, Krankheit, kein Ersatzwohnraum)
• Widerspruch innerhalb von 2 Monaten nach Erhalt der Kündigung

Bei unberechtigter Kündigung:
Mieter müssen nicht ausziehen. Im Zweifel: Mieterverein oder Anwalt einschalten.`,
  },
  {
    id: "w3",
    category: "wohnen",
    title: "Mietkündigung Vorlage",
    tag: "Vorlage",
    summary: "Fertige Vorlage für die Kündigung eines Mietvertrages — einfach ausfüllen.",
    content: `[Ihr vollständiger Name]
[Ihre aktuelle Adresse — also die Wohnung die Sie kündigen]
[PLZ Ort]

[Name / Firma des Vermieters]
[Adresse des Vermieters]
[PLZ Ort]

[Datum]

Betreff: Kündigung des Mietverhältnisses — [Adresse der Wohnung]

Sehr geehrte(r) [Name des Vermieters],

hiermit kündige ich das Mietverhältnis für die Wohnung [vollständige Adresse] fristgerecht zum [Datum — 3 Monate ab 3. des laufenden Monats].

Ich bitte um schriftliche Bestätigung der Kündigung sowie des genauen Auszugstermins.

Mit freundlichen Grüßen

[Unterschriften aller Mieter]
[Namen aller Mieter in Druckschrift]`,
  },
  {
    id: "w4",
    category: "wohnen",
    title: "Kaution zurückfordern",
    tag: "Kaution",
    summary: "Nach dem Auszug steht Ihnen die Kaution zu — so fordern Sie sie zurück.",
    content: `Kaution zurückfordern — Ihre Rechte

Wann muss der Vermieter zurückzahlen?
Der Vermieter hat nach Ihrem Auszug eine angemessene Frist zur Prüfung — in der Regel 3–6 Monate. Danach muss er zahlen oder begründen, warum er einbehält.

Maximale Kaution:
3 Kaltmieten (§ 551 BGB) — mehr ist unzulässig.

Was darf einbehalten werden?
• Tatsächliche Schäden (nicht normale Abnutzung)
• Ausstehende Mieten
• Betriebskostennachzahlung (wenn noch ausstehend)

Was darf NICHT einbehalten werden:
• Normale Abnutzung (Kratzer im Laminat, vergilbte Tapeten)
• Schönheitsreparaturen, wenn die entsprechenden Klauseln im Mietvertrag unwirksam sind

So fordern Sie zurück:
Setzen Sie dem Vermieter eine Frist von 2 Wochen: „Ich fordere Sie auf, meine Kaution von [Betrag] € bis zum [Datum] auf mein Konto zu überweisen."

Bei Weigerung: Mieterverein oder Anwaltliche Beratung (Streitwert für Klage lohnt sich meist).`,
  },
  {
    id: "w5",
    category: "wohnen",
    title: "Schönheitsreparaturen — Was muss ich wirklich?",
    tag: "Renovierung",
    summary: "Viele Renovierungsklauseln in Mietverträgen sind unwirksam — das sollten Sie wissen.",
    content: `Schönheitsreparaturen — Was gilt wirklich?

Grundsatz:
Gesetzlich muss der Vermieter renovieren. Durch Mietvertrag kann er das auf den Mieter übertragen — aber nur mit wirksamen Klauseln.

Häufig unwirksame Klauseln:
• Starre Fristen ohne Rücksicht auf tatsächlichen Zustand
  (z.B. „alle 3 Jahre Küche, alle 5 Jahre Zimmer")
• Endrenovierungspflicht unabhängig vom Zustand
• Pflicht zur Renovierung beim Einzug in unrenovierte Wohnung
• Vorgabe bestimmter Farben für den Auszug

Wenn die Klausel unwirksam ist:
→ Sie müssen gar nicht renovieren!

Wie prüfen?
Lassen Sie Ihren Mietvertrag vom Mieterverein prüfen. Kosten: ~60-100 € im Jahr für Mitgliedschaft — oft günstiger als eine Renovierung.

Tipp: Machen Sie beim Einzug und Auszug ein ausführliches Protokoll mit Fotos. Das schützt vor falschen Vorwürfen.`,
  },
  {
    id: "w6",
    category: "wohnen",
    title: "Kündigung Hausrat- und Haftpflichtversicherung bei Umzug",
    tag: "Umzug",
    summary: "Bei einem Umzug können Sie viele Versicherungen zum günstigen Zeitpunkt kündigen.",
    content: `Versicherungen kündigen beim Umzug

Hausratversicherung:
• Folgt automatisch mit an die neue Adresse (3 Monate Schutz)
• Muss innerhalb von 3 Monaten nach Umzug an neues Objekt angepasst oder neu abgeschlossen werden
• Sonderkündigungsrecht: Wenn sich Beitrag durch Umzug erhöht

Haftpflichtversicherung:
• Besteht weiter — kein Anpassungsbedarf bei Umzug
• Aber: Guter Zeitpunkt für Vergleich mit anderen Anbietern

Internet & TV-Kabel:
• Sonderkündigungsrecht wenn Anbieter am neuen Ort nicht verfügbar
• Einfach schriftlich mitteilen: „Ich ziehe um zu [Datum]. Der Dienst ist am neuen Ort nicht verfügbar."

Strom & Gas:
• Alten Vertrag zum Umzugstermin kündigen
• Neuen Anbieter am Zielort direkt beauftragen

Checkliste Umzug:
□ Adresse beim Einwohnermeldeamt ummelden (2 Wochen)
□ Bank, Arbeitgeber, Versicherungen informieren
□ Alle Verträge auf neue Adresse umschreiben oder kündigen`,
  },
  {
    id: "w7",
    category: "wohnen",
    title: "Betriebskostenabrechnung prüfen",
    tag: "Nebenkosten",
    summary: "Viele Betriebskostenabrechnungen enthalten Fehler — so überprüfen Sie diese.",
    content: `Betriebskostenabrechnung — so prüfen Sie richtig

Fristen:
• Vermieter muss spätestens 12 Monate nach Ende des Abrechnungszeitraums abrechnen
• Danach verfällt sein Nachzahlungsanspruch (nicht aber Ihr Rückzahlungsanspruch)

Was darf abgerechnet werden?
Nur umlagefähige Betriebskosten laut BetrKV:
✓ Grundsteuer, Wasser, Abwasser, Heizung
✓ Müllabfuhr, Straßenreinigung
✓ Gebäudeversicherung, Hausmeister, Gartenpflege

Was ist NICHT umlagefähig:
✗ Verwaltungskosten
✗ Reparaturen und Instandhaltung
✗ Leerstandskosten bei Mischnutzung

Wie widersprechen?
Schriftlich innerhalb von 12 Monaten nach Erhalt der Abrechnung.

Belegeinsicht:
Sie haben das Recht, alle Belege einzusehen (nicht unbedingt Kopien zu erhalten).

Tipp: Lassen Sie die Abrechnung vom Mieterverein prüfen — oft werden 200-500 € zurückgeholt.`,
  },
  {
    id: "w8",
    category: "wohnen",
    title: "Kündigung wegen Eigenbedarf widersprechen",
    tag: "Eigenbedarfskündigung",
    summary: "So wehren Sie sich gegen eine Eigenbedarfskündigung des Vermieters.",
    content: `Eigenbedarfskündigung — So schützen Sie sich

Wann ist Eigenbedarf rechtmäßig?
Der Vermieter muss konkrete Personen nennen und deren Bedarf glaubhaft machen. Vage Angaben reichen nicht.

Ihr Widerspruchsrecht (§ 574 BGB):
Sie können der Kündigung widersprechen, wenn die Beendigung des Mietverhältnisses für Sie eine unzumutbare Härte darstellt.

Härtegründe:
• Hohes Alter (Umzug gesundheitsschädlich)
• Schwere Krankheit
• Schwangerschaft
• Kein zumutbarer Ersatzwohnraum am Ort verfügbar
• Kinder in Schule / Ausbildung
• Lange Mietdauer (20+ Jahre)

Widerspruchsfrist:
Spätestens 2 Monate vor dem Kündigungstermin schriftlich beim Vermieter einlegen.

Vorgetäuschter Eigenbedarf:
Wenn der Vermieter nach Auszug die Wohnung vermietet (und nicht selbst nutzt), haben Sie Schadensersatzansprüche.

Mieterverein einschalten:
Eigenbedarfskündigung sind komplex — lassen Sie sich professionell beraten.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // VERSICHERUNGEN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "i1",
    category: "versicherungen",
    title: "Kündigung Kfz-Versicherung",
    tag: "Auto",
    summary: "Auto-Haftpflicht und Kaskoversicherung fristgerecht kündigen — Termine beachten!",
    content: `Kfz-Versicherung kündigen

Wichtiger Stichtag: 30. November!
Die meisten Kfz-Versicherungen laufen zum 31.12. ab. Kündigung muss bis spätestens 30. November beim Versicherer eingehen.

Ordentliche Kündigung:
• Frist: 1 Monat vor Vertragsende (meist 30. November)
• Schriftlich per Einschreiben

Sonderkündigungsrecht:
• Nach einem Schadensfall (innerhalb 1 Monat nach Regulierung)
• Nach Beitragserhöhung (innerhalb 1 Monat nach Bekanntgabe)
• Bei Fahrzeugverkauf (sofortige Kündigung möglich)
• Bei Fahrzeugwechsel

Bei Fahrzeugverkauf:
Kündigen Sie die Versicherung sofort nach Abmeldung des Fahrzeugs. Sie erhalten anteilige Beiträge zurück.

Neue Versicherung zuerst!
Schließen Sie die neue Versicherung ab, bevor Sie die alte kündigen. Das Fahrzeug muss immer versichert sein.

Beitrag vergleichen:
Bis zu 50% Ersparnis möglich durch Vergleich (Check24, Verivox). Besonders bei Schadensfreiheitsrabatt > 50% lohnt sich ein Wechsel.`,
  },
  {
    id: "i2",
    category: "versicherungen",
    title: "Kündigung Krankenversicherung (GKV)",
    tag: "Krankenversicherung",
    summary: "Gesetzliche Krankenkasse wechseln — so geht die Kündigung rechtssicher.",
    content: `Gesetzliche Krankenversicherung kündigen

Mindestbindung: 12 Monate
Sie können die Kasse nach mindestens 12 Monaten Mitgliedschaft kündigen.

Kündigungsfrist: 2 Monate
Zum Ende des übernächsten Monats nach Eingang der Kündigung.

Voraussetzung:
Nachweis der Anschlussmitgliedschaft bei einer anderen Kasse erforderlich.

So läuft der Wechsel:
1. Neue Krankenkasse aussuchen (Beitragsvergleich: krankenkasseninfo.de)
2. Antrag bei neuer Kasse stellen
3. Neue Kasse kündigt automatisch die alte — oder Sie kündigen selbst
4. Bestätigung abwarten

Sonderkündigungsrecht bei Zusatzbeitrag:
Erhöht die Kasse den Zusatzbeitrag, haben Sie ein Sonderkündigungsrecht — sofort, auch vor Ablauf der 12 Monate.

Wichtig:
Niemals zuerst kündigen ohne gesicherte Anschlussversicherung — es besteht Versicherungspflicht in Deutschland!`,
  },
  {
    id: "i3",
    category: "versicherungen",
    title: "Kündigung Lebens- und Rentenversicherung",
    tag: "Lebensversicherung",
    summary: "Lebensversicherung kündigen oder beitragsfrei stellen — was ist sinnvoller?",
    content: `Lebensversicherung kündigen — Das sollten Sie wissen

Optionen:
1. Kündigung (Rückkaufswert auszahlen lassen)
2. Beitragsfreistellung (keine weiteren Zahlungen, Versicherung läuft weiter)
3. Verkauf der Versicherung (oft besser als Kündigung)
4. Beleihen (kurzfristig Liquidität)

Wann lohnt sich Kündigung?
• In den ersten Jahren: meist Verlust (Abschlusskosten bereits verrechnet)
• Nach 10+ Jahren: Rückkaufswert oft akzeptabel
• Wenn bessere Altersvorsorge vorhanden

Rückkaufswert:
Oft deutlich unter den eingezahlten Beiträgen, besonders in den ersten Jahren. Fragen Sie nach dem aktuellen Rückkaufswert vor der Entscheidung.

Steuerliche Hinweise:
Erträge aus Lebensversicherungen können steuerpflichtig sein (25% Abgeltungssteuer). Bei Verträgen vor 2005 mit 12+ Jahren Laufzeit: Halbeinkünfteverfahren.

Empfehlung:
Sprechen Sie vor Kündigung mit einem unabhängigen Finanzberater oder der Verbraucherzentrale.`,
  },
  {
    id: "i4",
    category: "versicherungen",
    title: "Kündigung Hausratversicherung",
    tag: "Hausrat",
    summary: "Hausratversicherung wechseln und bis zu 40% sparen.",
    content: `Hausratversicherung kündigen

Kündigungsfrist:
1 Monat vor Vertragsablauf (meist zum 31.12.)

Sonderkündigungsrecht:
• Nach einem Schadensfall (innerhalb 1 Monat nach Regulierung / Ablehnung)
• Bei Beitragserhöhung
• Bei Umzug (wenn neues Risiko grundlegend anders)

Was tun beim Umzug?
• Versicherungsschutz bleibt 3 Monate am alten und neuen Ort bestehen
• Danach Vertrag anpassen oder neu abschließen
• Wenn Beitrag steigt: Sonderkündigungsrecht nutzen

Versicherungssumme prüfen:
Viele sind unterversichert — Richtwert: 650 € pro m² Wohnfläche.

Kündigung Vorlage:
„Ich kündige meine Hausratversicherung (Vertragsnummer: [Nr.]) fristgerecht zum [Datum]. Bitte bestätigen Sie die Kündigung schriftlich."`,
  },
  {
    id: "i5",
    category: "versicherungen",
    title: "Kündigung Haftpflichtversicherung",
    tag: "Haftpflicht",
    summary: "Private Haftpflichtversicherung kündigen oder wechseln — das Wichtigste.",
    content: `Private Haftpflichtversicherung kündigen

Kündigungsfrist:
3 Monate vor Vertragsablauf (meist zum 31.12.)
Bei neueren Verträgen: 1 Monat (seit 2022)

Prüfen Sie Ihren Vertrag!

Sonderkündigungsrecht:
• Nach Schadensfall
• Bei Beitragserhöhung
• Bei wesentlicher Leistungsänderung

Tipp — immer versichert bleiben!
Kündigen Sie erst, wenn die neue Versicherung bestätigt ist. Ein einziger unversicherter Tag kann sehr teuer werden.

Was kostet eine gute Haftpflicht?
Für Singlehaushalte: 30-60 € / Jahr
Für Familien: 60-100 € / Jahr

Viele zahlen deutlich mehr — Wechsel lohnt sich fast immer.

Neue Empfehlungen prüfen:
Wichtige Leistungen in modernen Tarifen:
✓ Schlüsselverlust (10.000 € und mehr)
✓ Mietsachschäden (mind. 3 Mio. €)
✓ Auslandsschäden weltweit`,
  },
  {
    id: "i6",
    category: "versicherungen",
    title: "Kündigung nach Schadensfall",
    tag: "Schadensfall",
    summary: "Nach einem Schaden haben Sie und der Versicherer ein Sonderkündigungsrecht.",
    content: `Kündigung nach Schadensfall — Ihre Rechte

Das Sonderkündigungsrecht nach Schadensfall
Sowohl Versicherungsnehmer als auch Versicherer können nach einem gemeldeten Schadenfall kündigen.

Frist: 1 Monat
• Nach Schadensregulierung (Zahlung oder Ablehnung)
• Schriftlich

Wer darf kündigen?
• Sie (wenn Sie mit der Regulierung unzufrieden sind)
• Der Versicherer (wenn er das Risiko neu bewerten möchte)

Wenn der Versicherer kündigt:
• Sie haben Anspruch auf Anschlussversicherung bei einem anderen Anbieter
• Der Versicherer muss 1 Monat Frist einhalten
• Sie müssen den Schaden beim neuen Antrag angeben

Kündigung durch Versicherer nach Schadensfall:
Das kann die Prämien bei Neuabschluss erhöhen. Vergleichen Sie dennoch — Unterschiede sind oft kleiner als befürchtet.

Tipp: Kleine Schäden selbst zahlen
Bei Schäden unter 500 € often lohnt sich keine Meldung wegen möglicher Kündigung und Prämienerhöhung.`,
  },
  {
    id: "i7",
    category: "versicherungen",
    title: "Welche Versicherungen sind wirklich nötig?",
    tag: "Überblick",
    summary: "Diese Versicherungen braucht jeder — alles andere ist meistens optional.",
    content: `Versicherungs-Check — Was ist wirklich nötig?

PFLICHT / UNVERZICHTBAR:
✓ Krankenversicherung (gesetzlich verpflichtend)
✓ Kfz-Haftpflicht (gesetzlich verpflichtend, wenn Auto vorhanden)
✓ Private Haftpflichtversicherung (günstiger Basisschutz, sehr wichtig)

SEHR EMPFEHLENSWERT:
✓ Berufsunfähigkeitsversicherung (besonders für Hauptverdiener)
✓ Hausratversicherung (wenn wertvoller Hausrat vorhanden)
✓ Risikolebensversicherung (wenn Familie / Kredit vorhanden)

SITUATIONSABHÄNGIG:
~ Rechtsschutzversicherung (sinnvoll bei Mietstreitigkeiten, Arbeitsrecht)
~ Unfallversicherung (wenn keine BU möglich)
~ Reisekrankenversicherung (bei Reisen außerhalb Europa)

MEISTENS ÜBERFLÜSSIG:
✗ Handyversicherung (zu teuer im Verhältnis zum Nutzen)
✗ Reisegepäckversicherung (Hausrat deckt oft ab)
✗ Brillenversicherung
✗ Sterbegeldversicherung
✗ Restschuldversicherung (oft unnötig teuer)`,
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
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleCopy = () => {
    if (!activeArticle) return
    navigator.clipboard.writeText(activeArticle.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isTemplate = activeArticle?.category === "vorlagen" || activeArticle?.id === "w3"

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
              Vorlagen, Gesetze, Tipps, Wohnen & Versicherungen — alles was Sie zum Thema Kündigung wissen müssen.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveArticle(null) }}
              placeholder="Suchen…"
              className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-colors"
            />
          </div>
        </div>

        {/* Mobile category tabs — above the flex row on mobile */}
        <div className="lg:hidden w-full mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
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
                  <span className={`rounded-full px-1.5 text-[10px] font-semibold ${isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"}`}>
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="flex gap-6 lg:gap-8">

          {/* Sidebar — desktop only */}
          <aside className="hidden w-52 shrink-0 lg:block">
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
                    {isTemplate && (
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
                <div className="p-5 sm:p-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground bg-muted/30 rounded-xl border border-border/40 p-4 sm:p-6 overflow-x-auto break-words">
                    {activeArticle.content}
                  </pre>
                </div>

                {/* CTA */}
                {isTemplate && (
                  <div className="border-t border-border/40 bg-muted/20 px-5 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="text-xs text-muted-foreground">Möchten Sie die Vorlage mit Ihren Daten ausfüllen lassen?</p>
                    <a
                      href="#generator"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90 whitespace-nowrap"
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