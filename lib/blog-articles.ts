export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  author: string
  authorRole: string
  date: string
  readTime: string
  category: string
  content: string
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "kundigungsfristen-richtig-berechnen",
    title: "Kündigungsfristen richtig berechnen: So vermeiden Sie teure Fehler",
    excerpt:
      "Erfahren Sie, wie Sie Kündigungsfristen korrekt berechnen und welche gesetzlichen Regelungen in Deutschland gelten. Ein Leitfaden von Rechtsanwalt Dr. Müller.",
    author: "Dr. Thomas Müller",
    authorRole: "Rechtsanwalt, Fachanwalt für Vertragsrecht",
    date: "2025-12-10",
    readTime: "7 Min.",
    category: "Vertragsrecht",
    content: `Die korrekte Berechnung von Kündigungsfristen ist eine der häufigsten Fehlerquellen im deutschen Vertragsrecht. Viele Verbraucher verschenken Geld, weil sie Fristen falsch berechnen oder schlicht verpassen.

## Gesetzliche Grundlagen

Die allgemeinen Kündigungsfristen sind im Bürgerlichen Gesetzbuch (BGB) geregelt. Besonders relevant sind:

- **Paragraph 573c BGB** für Mietverhältnisse
- **Paragraph 621 BGB** für Dienstverhältnisse  
- **Paragraph 489 BGB** für Darlehensverträge

Für die meisten Verbraucherverträge gilt seit der BGB-Reform 2022: Nach Ablauf der Mindestvertragslaufzeit können Verträge mit einer Frist von **einem Monat** gekündigt werden. Die automatische Verlängerung beträgt maximal einen Monat (früher waren es oft 12 Monate).

## Fristberechnung nach Paragraphen 186-193 BGB

Die Fristberechnung folgt klaren Regeln:

1. **Beginn der Frist**: Der Tag, an dem das Ereignis stattfindet (z.B. Zugang der Kündigung), wird nicht mitgerechnet (Paragraph 187 Abs. 1 BGB).

2. **Ende der Frist**: Eine nach Monaten bestimmte Frist endet mit Ablauf des Tages im letzten Monat, der dem Tag entspricht, an dem die Frist begonnen hat (Paragraph 188 Abs. 2 BGB).

3. **Samstage, Sonn- und Feiertage**: Fällt das Fristende auf einen Samstag, Sonntag oder Feiertag, tritt an die Stelle der nächste Werktag (Paragraph 193 BGB).

## Praxisbeispiel

Ihr Mobilfunkvertrag hat eine Kündigungsfrist von einem Monat zum Vertragsende. Das Vertragsende ist der 31. März. Die Kündigung muss also spätestens am 28. Februar beim Anbieter eingehen. Da der Zugangsweg (Post) einige Tage dauern kann, empfehle ich, die Kündigung spätestens eine Woche vorher abzusenden.

## Mein Tipp

Senden Sie Kündigungen immer per **Einschreiben mit Rückschein**. Nur so haben Sie einen rechtssicheren Nachweis über den Zugang. E-Mail-Kündigungen sind zwar oft möglich, aber der Beweis des Zugangs ist schwieriger.

Nutzen Sie den KündigungsHeld-Generator, um fristgerechte Kündigungsschreiben zu erstellen, die alle rechtlichen Anforderungen erfüllen.`,
  },
  {
    slug: "sonderkuendigungsrecht-wann-greift-es",
    title: "Sonderkündigungsrecht: Wann Sie Verträge sofort beenden können",
    excerpt:
      "Das Sonderkündigungsrecht erlaubt es Verbrauchern, Verträge vorzeitig zu beenden. Rechtsanwältin Weber erklärt, in welchen Fällen es greift.",
    author: "Anna Weber",
    authorRole: "Rechtsanwältin, Kanzlei Weber & Partner",
    date: "2025-11-28",
    readTime: "6 Min.",
    category: "Verbraucherrecht",
    content: `Das Sonderkündigungsrecht ist ein mächtiges Instrument für Verbraucher. Es ermöglicht die vorzeitige Beendigung von Verträgen, wenn bestimmte Voraussetzungen erfüllt sind.

## Wann greift das Sonderkündigungsrecht?

### 1. Preiserhöhungen

Erhöht Ihr Anbieter die Preise, haben Sie in der Regel ein Sonderkündigungsrecht. Dies gilt für:
- Mobilfunkverträge
- Internetverträge
- Versicherungen
- Energieversorger

**Wichtig**: Die Kündigung muss innerhalb der vom Anbieter genannten Frist erfolgen, meist innerhalb von 4-6 Wochen nach Zugang der Mitteilung.

### 2. Umzug

Bei einem Umzug besteht ein Sonderkündigungsrecht, wenn der Anbieter die Leistung am neuen Wohnort nicht erbringen kann. Dies ist besonders relevant für:
- Kabelinternet und -fernsehen
- Regionale Energieversorger
- Lokale Fitnessstudios

### 3. Störungen und Leistungsmängel

Erbringt der Anbieter die vertraglich vereinbarte Leistung nicht oder nur mangelhaft, können Sie nach erfolgloser Nachfristsetzung fristlos kündigen (Paragraph 314 BGB).

### 4. Tod des Vertragspartners

Im Todesfall besteht für Erben ein Sonderkündigungsrecht für die meisten Verträge des Verstorbenen. Die Kündigung sollte zeitnah nach dem Todesfall erfolgen und eine Kopie der Sterbeurkunde beigelegt werden.

## Formvorschriften

Auch bei einer Sonderkündigung müssen Sie die Schriftform beachten. Ein formgerechtes Kündigungsschreiben sollte enthalten:
- Ihre persönlichen Daten und Kundennummer
- Den Grund für die Sonderkündigung
- Das gewünschte Beendigungsdatum
- Die Bitte um schriftliche Bestätigung

## Praxistipp

Dokumentieren Sie den Grund für die Sonderkündigung sorgfältig. Bewahren Sie Preiserhöhungsschreiben, Störungsprotokolle oder Umzugsnachweise auf. Im Streitfall müssen Sie den Sonderkündigungsgrund nachweisen können.`,
  },
  {
    slug: "widerrufsrecht-14-tage-frist",
    title: "Widerrufsrecht: So nutzen Sie die 14-Tage-Frist richtig",
    excerpt:
      "Das 14-tägige Widerrufsrecht schützt Verbraucher bei Online-Käufen und Fernabsatzverträgen. Dr. Schulz erklärt die wichtigsten Regeln.",
    author: "Dr. Michael Schulz",
    authorRole: "Fachanwalt für IT-Recht",
    date: "2025-11-15",
    readTime: "5 Min.",
    category: "Verbraucherrecht",
    content: `Das Widerrufsrecht ist eines der wichtigsten Verbraucherrechte in Deutschland. Es gibt Ihnen die Möglichkeit, bestimmte Verträge innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen.

## Wann besteht ein Widerrufsrecht?

Ein Widerrufsrecht besteht bei:
- **Fernabsatzverträgen** (Online-Käufe, Telefon, Katalog)
- **Verträgen, die außerhalb von Geschäftsräumen** geschlossen werden (z.B. Haustürgeschäfte)
- **Verbraucherdarlehensverträgen**
- **Versicherungsverträgen**

## Die 14-Tage-Frist

Die Widerrufsfrist beginnt:
- Bei Kaufverträgen: mit Erhalt der Ware
- Bei Dienstleistungen: mit Vertragsschluss
- In jedem Fall erst, wenn der Händler ordnungsgemäß über das Widerrufsrecht belehrt hat

**Achtung**: Hat der Händler Sie nicht oder fehlerhaft über Ihr Widerrufsrecht belehrt, verlängert sich die Frist auf **12 Monate und 14 Tage**.

## Form des Widerrufs

Der Widerruf muss **eindeutig erklärt** werden. Er kann erfolgen durch:
- Brief oder Fax
- E-Mail
- Nutzung des Muster-Widerrufsformulars
- Jede andere eindeutige Erklärung

Ein Widerruf per Telefon ist ebenfalls möglich, aber schwer zu beweisen. Ich empfehle daher immer die Schriftform.

## Ausnahmen vom Widerrufsrecht

Kein Widerrufsrecht besteht bei:
- Maßanfertigungen und personalisierten Waren
- Verderblichen Waren
- Versiegelten Hygiene- und Gesundheitsprodukten nach Entsiegelung
- Digitalen Inhalten nach Beginn der Ausführung mit Zustimmung

## Rechtsfolgen des Widerrufs

Nach einem wirksamen Widerruf muss der Händler:
1. Den Kaufpreis innerhalb von 14 Tagen erstatten
2. Auch die ursprünglichen Versandkosten übernehmen
3. Die Rücksendekosten muss der Verbraucher nur tragen, wenn der Händler dies vorher vereinbart hat`,
  },
  {
    slug: "fitnessstudio-kundigen-tipps",
    title: "Fitnessstudio kündigen: Die besten Tipps vom Anwalt",
    excerpt:
      "Fitnessstudio-Verträge zu kündigen kann kompliziert sein. Rechtsanwalt Fischer gibt praktische Tipps für eine erfolgreiche Kündigung.",
    author: "Jan Fischer",
    authorRole: "Rechtsanwalt, Verbraucherschutz",
    date: "2025-11-03",
    readTime: "6 Min.",
    category: "Praxistipps",
    content: `Fitnessstudio-Verträge gehören zu den am häufigsten gekündigten Verträgen in Deutschland. Dennoch gibt es viele Fallstricke, die Verbraucher beachten sollten.

## Regelkündigung

Die meisten Fitnessstudio-Verträge haben:
- **Mindestlaufzeit**: Häufig 12 oder 24 Monate
- **Kündigungsfrist**: In der Regel 1-3 Monate zum Vertragsende
- **Automatische Verlängerung**: Seit 2022 maximal um einen Monat

**Wichtig**: Seit der BGB-Reform müssen auch Fitnessstudios die neuen Kündigungsregeln einhalten. Nach Ablauf der Mindestlaufzeit können Sie monatlich kündigen.

## Sonderkündigung beim Fitnessstudio

Sie können vorzeitig kündigen bei:
- **Umzug**: Wenn das nächste Studio des Anbieters mehr als 25-30 km von Ihrem neuen Wohnort entfernt ist
- **Krankheit**: Bei langfristiger, ärztlich bescheinigter Trainingsunfähigkeit
- **Schwangerschaft**: Bei Beschwerden, die das Training unmöglich machen
- **Preiserhöhung**: Innerhalb der vom Studio genannten Frist

## Häufige Probleme und Lösungen

### Das Studio akzeptiert die Kündigung nicht
Viele Studios versuchen, Kündigungen abzulehnen oder erschweren den Prozess. Denken Sie daran:
- Eine Kündigung muss nicht vom Studio "akzeptiert" werden
- Sie wird mit Zugang wirksam
- Senden Sie die Kündigung immer per Einschreiben

### Vertragliche Kündigungsklauseln
Manche Studios verlangen eine Kündigung "nur vor Ort" oder "nur per Fax". Solche Klauseln sind nach aktueller Rechtsprechung **unwirksam**, wenn sie den Verbraucher unangemessen benachteiligen.

### Kein Kündigungsbutton vorhanden
Seit Juli 2022 müssen Anbieter mit Online-Vertragsschluss einen Kündigungsbutton auf ihrer Webseite anbieten. Fehlt dieser, kann das zu Ihrem Vorteil sein.

## Musterformulierung

Eine wirksame Kündigung muss mindestens enthalten:
1. Ihre Mitglieds- oder Kundennummer
2. Ihren vollständigen Namen und Anschrift
3. Die eindeutige Erklärung, dass Sie den Vertrag kündigen
4. Das gewünschte Beendigungsdatum
5. Ihre Unterschrift (bei schriftlicher Kündigung)`,
  },
  {
    slug: "versicherung-kuendigen-worauf-achten",
    title: "Versicherung kündigen: Worauf Sie unbedingt achten müssen",
    excerpt:
      "Versicherungsverträge kündigen ist nicht trivial. Fachanwältin Dr. Hoffmann erklärt die Besonderheiten bei verschiedenen Versicherungsarten.",
    author: "Dr. Claudia Hoffmann",
    authorRole: "Fachanwältin für Versicherungsrecht",
    date: "2025-10-20",
    readTime: "8 Min.",
    category: "Versicherungsrecht",
    content: `Versicherungsverträge unterliegen besonderen Kündigungsregeln, die sich von normalen Verbraucherverträgen unterscheiden. Als Fachanwältin für Versicherungsrecht möchte ich Ihnen die wichtigsten Besonderheiten erklären.

## Grundsätzliche Kündigungsfrist

Die meisten Versicherungsverträge können mit einer Frist von **3 Monaten zum Ende des Versicherungsjahres** gekündigt werden. Das Versicherungsjahr ist nicht immer das Kalenderjahr; es beginnt mit dem im Vertrag genannten Datum.

## Besonderheiten nach Versicherungsart

### Kfz-Versicherung
- Stichtag: **30. November** (Kündigung muss bis dahin zugehen)
- Sonderkündigungsrecht bei Beitragserhöhung oder nach einem Schadensfall
- Wechsel zum neuen Versicherer zum 1. Januar

### Krankenversicherung
- **Gesetzliche KV**: Möglich mit 2 Monaten Frist nach mindestens 12 Monaten Mitgliedschaft
- **Private KV**: Kündigung nur zum Ende des Versicherungsjahres mit 3 Monaten Frist. Achtung: Rückkehr in die GKV ist nur unter bestimmten Voraussetzungen möglich!

### Lebensversicherung
- Jederzeit zum Ende der laufenden Versicherungsperiode
- Bei Kündigung: Nur der Rückkaufswert wird ausgezahlt
- Alternative: Beitragsfreistellung statt Kündigung

### Haftpflichtversicherung
- 3 Monate zum Versicherungsjahresende
- Sonderkündigung bei Beitragserhöhung

## Sonderkündigungsrecht bei Versicherungen

Ein Sonderkündigungsrecht besteht bei:
1. **Beitragserhöhung** ohne Leistungsverbesserung (1 Monat nach Mitteilung)
2. **Nach einem Schadensfall** (1 Monat nach Regulierung)
3. **Risikoänderung** durch den Versicherer

## Wichtige Hinweise

- Prüfen Sie vor der Kündigung, ob Sie nahtlos einen neuen Vertrag abschließen können
- Bei der Kfz-Versicherung: Ohne gültigen Versicherungsschutz wird die Zulassung gelöscht
- Bewahren Sie die Kündigungsbestätigung sorgfältig auf
- Kündigen Sie nie eine Krankenversicherung, ohne zuvor den Anschlussschutz gesichert zu haben`,
  },
  {
    slug: "mietvertrag-kuendigung-mieter",
    title: "Mietvertrag kündigen als Mieter: Rechte und Pflichten",
    excerpt:
      "Was Mieter bei der Kündigung ihres Mietvertrags beachten müssen. Rechtsanwalt Dr. Braun erklärt die gesetzlichen Regelungen und häufige Fallstricke.",
    author: "Dr. Stefan Braun",
    authorRole: "Rechtsanwalt, Fachanwalt für Mietrecht",
    date: "2025-10-05",
    readTime: "9 Min.",
    category: "Mietrecht",
    content: `Als Fachanwalt für Mietrecht erlebe ich täglich, dass Mieter bei der Kündigung ihres Mietvertrags Fehler machen. Hier erfahren Sie, wie Sie es richtig machen.

## Gesetzliche Kündigungsfrist für Mieter

Für Mieter gilt eine einheitliche Kündigungsfrist von **3 Monaten** (Paragraph 573c Abs. 1 BGB). Diese Frist gilt unabhängig davon, wie lange Sie in der Wohnung gewohnt haben.

Die Kündigung muss spätestens am **3. Werktag eines Monats** beim Vermieter eingehen, um zum Ende des übernächsten Monats wirksam zu werden.

## Beispiel zur Fristberechnung

- Kündigung geht am 3. März beim Vermieter ein
- Das Mietverhältnis endet am 31. Mai
- Bei Zugang am 4. März erst zum 30. Juni

## Formvorschriften

Die Kündigung eines Mietvertrags muss **zwingend schriftlich** erfolgen (Paragraph 568 Abs. 1 BGB):
- Eigenhändige Unterschrift erforderlich
- E-Mail oder Fax genügen **nicht**
- Bei mehreren Mietern müssen **alle** unterschreiben
- An **alle** Vermieter adressiert sein

## Sonderkündigungsrecht für Mieter

### Bei Mieterhöhung
Nach einer Mieterhöhung nach Paragraph 558 BGB können Mieter bis zum Ablauf des 2. Monats nach Zugang der Mieterhöhungserklärung zum Ablauf des übernächsten Monats kündigen.

### Bei Modernisierung
Ankündigung einer Modernisierung berechtigt zur Kündigung bis zum Ablauf des Monats nach Zugang der Modernisierungsankündigung.

### Fristlose Kündigung
Möglich bei:
- Gesundheitsgefährdenden Mängeln
- Erheblicher Störung des Hausfriedens
- Vertragsbeschränktem Gebrauch der Mietsache

## Häufige Fehler bei der Kündigung

1. **Nur mündlich gekündigt**: Unwirksam!
2. **Nicht alle Mieter haben unterschrieben**: Unwirksam!
3. **Falsche Fristberechnung**: Kündigung wirkt erst zum nächsten möglichen Termin
4. **Kündigung per E-Mail**: Erfüllt nicht das Schriftformerfordernis

## Mein Rat

Senden Sie die Kündigung immer per Einschreiben und behalten Sie eine Kopie. Berechnen Sie die Frist sorgfältig und planen Sie Pufferzeit ein. Bei Unsicherheiten holen Sie sich anwaltlichen Rat.`,
  },
  {
    slug: "bgb-reform-2022-verbrauchervertrage",
    title: "BGB-Reform 2022: Neue Regeln für Verbraucherverträge",
    excerpt:
      "Die BGB-Reform hat die Kündigungsrechte von Verbrauchern deutlich gestärkt. Rechtsanwältin Schneider fasst die wichtigsten Änderungen zusammen.",
    author: "Katrin Schneider",
    authorRole: "Rechtsanwältin, Verbraucherrecht",
    date: "2025-09-18",
    readTime: "7 Min.",
    category: "Vertragsrecht",
    content: `Seit dem 1. März 2022 gelten neue Regeln für Verbraucherverträge. Die Reform des BGB hat die Rechte von Verbrauchern bei der Kündigung von Verträgen erheblich gestärkt.

## Die wichtigsten Änderungen im Überblick

### 1. Maximale Verlängerung: 1 Monat statt 12

Früher verlängerten sich viele Verträge automatisch um 12 Monate, wenn man die Kündigungsfrist verpasste. Das ist nun vorbei:
- Nach Ablauf der Mindestvertragslaufzeit verlängert sich der Vertrag nur noch um **maximal einen Monat**
- Sie können dann jederzeit mit einer Frist von **einem Monat** kündigen

### 2. Kündigungsbutton für Online-Verträge

Seit Juli 2022 müssen alle Anbieter, bei denen ein Vertrag online abgeschlossen werden kann, einen **Kündigungsbutton** auf ihrer Website bereitstellen:
- Leicht aufzufinden und direkt zugänglich
- Klar beschriftet (z.B. "Verträge hier kündigen")
- Führt zu einer Bestätigungsseite
- Sofortige Bestätigung per E-Mail

### 3. Bessere Kündigungsbestätigung

Anbieter müssen Kündigungen nun auf einem **dauerhaften Datenträger** bestätigen (z.B. E-Mail oder Brief) und das Datum nennen, zu dem die Kündigung wirksam wird.

## Welche Verträge sind betroffen?

Die neuen Regeln gelten für:
- Mobilfunk- und Internetverträge
- Streamingdienste
- Fitnessstudio-Verträge
- Zeitschriften-Abonnements
- Energielieferverträge (Sondertarife)
- Dating-Plattformen
- Alle weiteren Dauerschuldverhältnisse

## Was bedeutet das für Sie?

1. **Verträge prüfen**: Schauen Sie, ob Ihre bestehenden Verträge noch die alten, längeren Verlängerungsklauseln haben. Diese sind unwirksam.
2. **Kündigungsbutton nutzen**: Suchen Sie auf der Website Ihres Anbieters nach dem Kündigungsbutton.
3. **Fristen im Blick behalten**: Auch mit den neuen Regeln müssen Sie die Kündigungsfrist einhalten.

## Fazit

Die BGB-Reform 2022 ist ein großer Fortschritt für den Verbraucherschutz in Deutschland. Verträge loszuwerden ist deutlich einfacher geworden. Nutzen Sie Ihre neuen Rechte!`,
  },
  {
    slug: "handyvertrag-kuendigen-schritt-fuer-schritt",
    title: "Handyvertrag kündigen: Schritt-für-Schritt-Anleitung",
    excerpt:
      "Die vollständige Anleitung zum Kündigen Ihres Handyvertrags. Von der Fristberechnung bis zum neuen Vertrag - alles was Sie wissen müssen.",
    author: "Martin Koch",
    authorRole: "Rechtsanwalt, Telekommunikationsrecht",
    date: "2025-09-02",
    readTime: "6 Min.",
    category: "Praxistipps",
    content: `Der Handyvertrag gehört zu den am häufigsten gekündigten Verträgen in Deutschland. Jedes Jahr wechseln Millionen Deutsche ihren Mobilfunkanbieter. Hier erkläre ich Ihnen Schritt für Schritt, wie Sie vorgehen.

## Schritt 1: Vertragsdaten zusammentragen

Bevor Sie kündigen, benötigen Sie:
- Ihre **Kundennummer** (steht auf jeder Rechnung)
- Die **Vertragsnummer** oder den Vertragsbeginn
- Das **Vertragsende** und die Kündigungsfrist

Diese Informationen finden Sie in Ihrem Online-Kundenkonto oder auf Ihrer monatlichen Rechnung.

## Schritt 2: Kündigungsfrist berechnen

Seit der BGB-Reform 2022 gelten folgende Regeln:
- **Innerhalb der Mindestlaufzeit**: Kündigung mit 1 Monat Frist zum Ende der Mindestlaufzeit
- **Nach der Mindestlaufzeit**: Monatlich kündbar mit 1 Monat Frist
- Die Mindestlaufzeit beträgt maximal 24 Monate

## Schritt 3: Kündigung verfassen

Ein wirksames Kündigungsschreiben muss enthalten:
1. Ihren vollständigen Namen und Anschrift
2. Kundennummer und/oder Vertragsnummer
3. Die Erklärung, dass Sie den Vertrag kündigen
4. Den gewünschten Beendigungszeitpunkt
5. Die Bitte um Bestätigung

## Schritt 4: Kündigung senden

Sie haben mehrere Möglichkeiten:
- **Einschreiben**: Der sicherste Weg
- **Online-Kündigungsbutton**: Schnell und bequem
- **Fax**: Bei manchen Anbietern noch möglich
- **E-Mail**: Wird von den meisten Anbietern akzeptiert

## Schritt 5: Rufnummernmitnahme (Portierung)

Wenn Sie Ihre Rufnummer behalten möchten:
- Stellen Sie den Portierungsantrag beim **neuen** Anbieter
- Die Portierung kostet gesetzlich maximal **6,82 Euro**
- Sie können die Portierung bis zu 123 Tage nach Vertragsende beantragen
- Tipp: Regeln Sie die Portierung vor dem Vertragsende

## Häufige Fragen

**Kann ich während der Mindestlaufzeit kündigen?**
Ja, aber die Kündigung wird erst zum Ende der Mindestlaufzeit wirksam.

**Was passiert, wenn ich die Frist verpasse?**
Der Vertrag verlängert sich um maximal einen Monat und Sie können erneut mit 1 Monat Frist kündigen.

**Muss der Anbieter die Kündigung bestätigen?**
Ja, der Anbieter muss die Kündigung auf einem dauerhaften Datenträger bestätigen.`,
  },
  {
    slug: "energieversorger-wechseln-kundigen",
    title: "Strom- und Gasvertrag kündigen: Sparpotenzial nutzen",
    excerpt:
      "Beim Energieversorger-Wechsel können Sie mehrere hundert Euro pro Jahr sparen. Fachanwalt Richter erklärt die rechtlichen Rahmenbedingungen.",
    author: "Dr. Klaus Richter",
    authorRole: "Fachanwalt für Energierecht",
    date: "2025-08-15",
    readTime: "7 Min.",
    category: "Energierecht",
    content: `Der Wechsel des Energieversorgers kann erhebliche Einsparungen bringen. Doch welche rechtlichen Besonderheiten gibt es bei der Kündigung von Strom- und Gasverträgen?

## Grundversorgung vs. Sondertarif

### Grundversorgung
- Kündigungsfrist: **2 Wochen** (Paragraph 20 Abs. 1 StromGVV/GasGVV)
- Keine Mindestvertragslaufzeit
- Jederzeit kündbar
- Meist teurer als Sondertarife

### Sondertarife
- Kündigungsfrist und Mindestlaufzeit laut Vertrag
- Nach der BGB-Reform: Maximal 1 Monat Verlängerung nach Erstlaufzeit
- Kündigungsfrist maximal 1 Monat nach Erstlaufzeit

## Sonderkündigungsrecht bei Energieverträgen

Sie können vorzeitig kündigen bei:
- **Preiserhöhung**: Innerhalb von 2 Wochen nach Mitteilung
- **Umzug**: Wenn der Versorger am neuen Wohnort nicht liefern kann
- **Mangelhafte Versorgung**: Bei wiederholten Störungen

## Anbieterwechsel: So funktioniert es

1. **Neuen Anbieter wählen**: Vergleichsportale nutzen
2. **Neuen Vertrag abschließen**: Der neue Anbieter übernimmt in der Regel die Kündigung
3. **Zählerstände ablesen**: Am Tag des Wechsels
4. **Endabrechnung prüfen**: Auf korrekte Zählerstände achten

**Wichtig**: Die Energieversorgung ist in Deutschland gesetzlich garantiert. Sie können nie ohne Strom oder Gas dastehen, selbst wenn beim Wechsel etwas schiefgeht, da Sie automatisch in die Grundversorgung fallen.

## Sparpotenzial

Laut Verbraucherzentralen kann ein durchschnittlicher 3-Personen-Haushalt durch einen Anbieterwechsel:
- Beim **Strom**: 200 bis 500 Euro pro Jahr sparen
- Beim **Gas**: 300 bis 800 Euro pro Jahr sparen

## Mein Tipp

Wechseln Sie regelmäßig (alle 1-2 Jahre) den Anbieter, um von Neukundenrabatten zu profitieren. Nutzen Sie dabei die automatische Kündigung durch den neuen Anbieter - das spart Zeit und Aufwand.`,
  },
  {
    slug: "kundigung-per-email-wann-gueltig",
    title: "Kündigung per E-Mail: Wann ist sie rechtsgültig?",
    excerpt:
      "Immer mehr Verbraucher kündigen per E-Mail. Doch ist das rechtlich immer wirksam? Rechtsanwalt Dr. Becker klärt auf.",
    author: "Dr. Henrik Becker",
    authorRole: "Rechtsanwalt, Fachanwalt für IT-Recht",
    date: "2025-07-28",
    readTime: "5 Min.",
    category: "Vertragsrecht",
    content: `Die Kündigung per E-Mail ist bequem und schnell. Doch nicht immer ist sie auch rechtlich wirksam. Hier erfahren Sie, wann eine E-Mail-Kündigung gültig ist und wann nicht.

## Grundsatz: Textform genügt meistens

Seit der Modernisierung des BGB genügt für die meisten Verbraucherverträge die **Textform** (Paragraph 126b BGB). Das bedeutet: Eine E-Mail ist ausreichend, solange:
- Der Absender erkennbar ist
- Der Inhalt dauerhaft gespeichert werden kann
- Die Erklärung auf einem dauerhaften Datenträger abgegeben wird

## Wann reicht eine E-Mail?

Eine E-Mail-Kündigung ist in der Regel gültig bei:
- Mobilfunkverträgen
- Internetverträgen
- Streamingdiensten (Netflix, Spotify etc.)
- Fitnessstudio-Verträgen (sofern keine Schriftform vereinbart)
- Zeitschriften-Abonnements
- Online-Diensten aller Art

## Wann reicht eine E-Mail NICHT?

Die **Schriftform** (Paragraph 126 BGB, eigenhändige Unterschrift) ist zwingend bei:
- **Mietverträgen**: Kündigung muss eigenhändig unterschrieben sein
- **Arbeitsverträgen**: Schriftform gesetzlich vorgeschrieben
- **Bürgschaften**: Schriftform zum Schutz des Bürgen

## Beweisproblem bei E-Mail

Das größte Problem bei E-Mail-Kündigungen ist der **Beweis des Zugangs**. Im Streitfall müssen Sie nachweisen, dass die E-Mail beim Empfänger angekommen ist.

Tipps für den Nachweis:
1. **Lesebestätigung anfordern**: Nicht ideal, da der Empfänger sie ablehnen kann
2. **Antwort aufbewahren**: Wenn der Anbieter antwortet, ist der Zugang bewiesen
3. **Screenshot anfertigen**: Sicherung des Sendevorgangs
4. **Zusätzlich per Post senden**: Doppelte Sicherheit

## Der Kündigungsbutton als Alternative

Seit 2022 müssen Online-Anbieter einen Kündigungsbutton bereitstellen. Dieser Weg ist:
- Rechtlich sicher
- Gut dokumentiert (automatische Bestätigung)
- Schnell und bequem

## Meine Empfehlung

Für maximale Rechtssicherheit empfehle ich:
1. Bei Miet- und Arbeitsverträgen: Immer die Schriftform wahren
2. Bei allen anderen Verträgen: E-Mail ist in der Regel ausreichend
3. Immer eine Bestätigung anfordern
4. Wichtige Kündigungen zusätzlich per Einschreiben senden`,
  },
]

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug)
}
