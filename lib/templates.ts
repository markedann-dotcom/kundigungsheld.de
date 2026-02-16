export type KuendigungsGrund =
  | "ordentlich"
  | "sonderkuendigung"
  | "widerruf"
  | "fristlos"
  | "umzug"
  | "todesfall"

export interface TemplateData {
  anrede: "Herr" | "Frau" | "Divers"
  vorname: string
  nachname: string
  strasse: string
  plz: string
  ort: string
  kundennummer: string
  vertragsnummer: string
  grund: KuendigungsGrund
  kuendigungZum: "naechstmoeglich" | "datum"
  kuendigungsDatum: string
  zusatztext: string
}

export const GRUND_LABELS: Record<KuendigungsGrund, string> = {
  ordentlich: "Ordentliche Kündigung",
  sonderkuendigung: "Sonderkündigung (z.B. Preiserhöhung)",
  widerruf: "Widerruf (innerhalb 14 Tage)",
  fristlos: "Fristlose Kündigung",
  umzug: "Kündigung wegen Umzug",
  todesfall: "Kündigung wegen Todesfall",
}

export function generateKuendigungsschreiben(
  data: TemplateData,
  companyName: string,
  companyAddress: string
): string {
  const today = new Date()
  const dateStr = today.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const anredeText = data.anrede === "Herr" ? "Herrn" : data.anrede === "Frau" ? "Frau" : ""
  const fullName = `${data.vorname} ${data.nachname}`
  const kuendigungZumText =
    data.kuendigungZum === "naechstmoeglich"
      ? "zum nächstmöglichen Zeitpunkt"
      : `zum ${data.kuendigungsDatum}`

  let betreffText = ""
  let bodyText = ""

  switch (data.grund) {
    case "ordentlich":
      betreffText = `Ordentliche Kündigung${data.vertragsnummer ? ` - Vertragsnummer: ${data.vertragsnummer}` : ""}${data.kundennummer ? ` - Kundennummer: ${data.kundennummer}` : ""}`
      bodyText = `hiermit kündige ich meinen bestehenden Vertrag ${kuendigungZumText} ordentlich und fristgerecht.

Bitte senden Sie mir eine schriftliche Bestätigung der Kündigung unter Angabe des Beendigungszeitpunktes zu.

Ich bitte Sie, alle erteilten Einzugsermächtigungen / SEPA-Lastschriftmandate mit Wirkung zum Vertragsende zu löschen.

Einer Kontaktaufnahme zu Werbezwecken oder zur Rückgewinnung widerspreche ich hiermit ausdrücklich.`
      break

    case "sonderkuendigung":
      betreffText = `Sonderkündigung${data.vertragsnummer ? ` - Vertragsnummer: ${data.vertragsnummer}` : ""}${data.kundennummer ? ` - Kundennummer: ${data.kundennummer}` : ""}`
      bodyText = `hiermit mache ich von meinem Sonderkündigungsrecht Gebrauch und kündige meinen Vertrag ${kuendigungZumText}.

Grund für die Sonderkündigung:
${data.zusatztext || "Preiserhöhung / Vertragsänderung zum Nachteil des Kunden."}

Gemäß § 314 BGB bzw. den geltenden Vertragsbedingungen steht mir bei wesentlichen Vertragsänderungen ein Sonderkündigungsrecht zu.

Bitte bestätigen Sie mir die Kündigung und den Beendigungszeitpunkt schriftlich.`
      break

    case "widerruf":
      betreffText = `Widerruf meines Vertrages${data.vertragsnummer ? ` - Vertragsnummer: ${data.vertragsnummer}` : ""}${data.kundennummer ? ` - Kundennummer: ${data.kundennummer}` : ""}`
      bodyText = `hiermit widerrufe ich den mit Ihnen geschlossenen Vertrag innerhalb der gesetzlichen Widerrufsfrist von 14 Tagen.

Gemäß § 355 BGB steht mir als Verbraucher das Recht zu, diesen Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen.

Bitte bestätigen Sie den Widerruf und erstatten Sie bereits geleistete Zahlungen unverzüglich zurück.`
      break

    case "fristlos":
      betreffText = `Fristlose Kündigung${data.vertragsnummer ? ` - Vertragsnummer: ${data.vertragsnummer}` : ""}${data.kundennummer ? ` - Kundennummer: ${data.kundennummer}` : ""}`
      bodyText = `hiermit kündige ich meinen Vertrag aus wichtigem Grund fristlos mit sofortiger Wirkung.

Grund für die fristlose Kündigung:
${data.zusatztext || "(Bitte Grund angeben)"}

Gemäß § 314 BGB ist eine fristlose Kündigung aus wichtigem Grund zulässig, wenn dem Kündigenden unter Berücksichtigung aller Umstände die Fortsetzung des Vertragsverhältnisses nicht zugemutet werden kann.

Bitte bestätigen Sie die Kündigung und die sofortige Vertragsbeendigung schriftlich.`
      break

    case "umzug":
      betreffText = `Kündigung wegen Umzug${data.vertragsnummer ? ` - Vertragsnummer: ${data.vertragsnummer}` : ""}${data.kundennummer ? ` - Kundennummer: ${data.kundennummer}` : ""}`
      bodyText = `hiermit kündige ich meinen Vertrag ${kuendigungZumText} aufgrund eines Umzugs.

${data.zusatztext ? `Neue Adresse: ${data.zusatztext}` : "Meine neue Adresse teile ich Ihnen bei Bedarf gesondert mit."}

Da die vertraglich vereinbarte Leistung an meinem neuen Wohnort nicht erbracht werden kann, mache ich von meinem Sonderkündigungsrecht Gebrauch.

Bitte bestätigen Sie die Kündigung schriftlich und erstatten Sie eventuell bereits im Voraus gezahlte Beträge anteilig.`
      break

    case "todesfall":
      betreffText = `Kündigung wegen Todesfall${data.vertragsnummer ? ` - Vertragsnummer: ${data.vertragsnummer}` : ""}${data.kundennummer ? ` - Kundennummer: ${data.kundennummer}` : ""}`
      bodyText = `hiermit kündige ich den Vertrag der/des Verstorbenen ${data.zusatztext || "(Name des Verstorbenen)"} mit sofortiger Wirkung aufgrund des Todesfalls.

Eine Kopie der Sterbeurkunde liegt diesem Schreiben bei / wird nachgereicht.

Bitte bestätigen Sie die Vertragsbeendigung und stellen Sie sicher, dass keine weiteren Abbuchungen erfolgen. Eventuell zu viel gezahlte Beträge erstatten Sie bitte an folgendes Konto zurück.`
      break
  }

  return `${fullName}
${data.strasse}
${data.plz} ${data.ort}

${companyName}
${companyAddress.replace(/\\n/g, "\n")}

${data.ort}, den ${dateStr}

Betreff: ${betreffText}

Sehr geehrte Damen und Herren,

${bodyText}

Mit freundlichen Grüßen

${fullName}`
}
