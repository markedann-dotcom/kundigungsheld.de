export type KuendigungsGrund =
  | "ordentlich"
  | "sonderkuendigung"
  | "widerruf"
  | "fristlos"
  | "umzug"
  | "todesfall"
  | "insolvenz"
  | "mangelhafteLeistung"
  | "gegenseitigesEinvernehmen"
  | "renteneintritt"
  | "elternzeit"
  | "geschaeftsaufgabe"

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
  /** Optional: for Todesfall – name of the deceased */
  verstorbenerName?: string
  /** Optional: Einzugsermächtigung / SEPA mandate reference */
  sepaMandat?: string
}

export const GRUND_LABELS: Record<KuendigungsGrund, string> = {
  ordentlich: "Ordentliche Kündigung",
  sonderkuendigung: "Sonderkündigung (z.B. Preiserhöhung)",
  widerruf: "Widerruf (innerhalb 14 Tage)",
  fristlos: "Fristlose Kündigung (aus wichtigem Grund)",
  umzug: "Kündigung wegen Umzug",
  todesfall: "Kündigung wegen Todesfall",
  insolvenz: "Kündigung wegen Insolvenz",
  mangelhafteLeistung: "Kündigung wegen mangelhafter Leistung",
  gegenseitigesEinvernehmen: "Aufhebungsvereinbarung (gegenseitiges Einvernehmen)",
  renteneintritt: "Kündigung wegen Renteneintritt",
  elternzeit: "Kündigung wegen Elternzeit",
  geschaeftsaufgabe: "Kündigung wegen Geschäftsaufgabe",
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function buildBetreff(
  label: string,
  vertragsnummer: string,
  kundennummer: string
): string {
  const parts = [label]
  if (vertragsnummer) parts.push(`Vertragsnummer: ${vertragsnummer}`)
  if (kundennummer) parts.push(`Kundennummer: ${kundennummer}`)
  return parts.join(" – ")
}

function sepaLine(sepaMandat?: string): string {
  return sepaMandat
    ? `Ich widerrufe hiermit außerdem das erteilte SEPA-Lastschriftmandat (Mandatsreferenz: ${sepaMandat}) mit Wirkung zum Vertragsende.`
    : "Ich widerrufe hiermit außerdem alle erteilten Einzugsermächtigungen und SEPA-Lastschriftmandate mit Wirkung zum Vertragsende."
}

// ---------------------------------------------------------------------------
// Main generator
// ---------------------------------------------------------------------------

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

  const fullName = `${data.vorname} ${data.nachname}`
  const kuendigungZumText =
    data.kuendigungZum === "naechstmoeglich"
      ? "zum nächstmöglichen Termin unter Einhaltung der vertraglich bzw. gesetzlich vorgesehenen Kündigungsfrist"
      : `zum ${data.kuendigungsDatum}`

  let betreffText = ""
  let bodyText = ""

  switch (data.grund) {
    // -----------------------------------------------------------------------
    case "ordentlich":
      betreffText = buildBetreff("Ordentliche Kündigung", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag ordentlich und fristgerecht ${kuendigungZumText}.

Ich bitte Sie, mir den Zugang dieser Kündigung sowie den genauen Beendigungstermin schriftlich zu bestätigen.

${sepaLine(data.sepaMandat)}

Einer Kontaktaufnahme zu Werbezwecken oder zur Kundenrückgewinnung widerspreche ich gemäß § 7 UWG ausdrücklich.${data.zusatztext ? `\n\n${data.zusatztext}` : ""}`
      break

    // -----------------------------------------------------------------------
    case "sonderkuendigung":
      betreffText = buildBetreff("Sonderkündigung", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit mache ich von meinem außerordentlichen Sonderkündigungsrecht Gebrauch und kündige den oben bezeichneten Vertrag ${kuendigungZumText}.

Grund der Sonderkündigung:
${data.zusatztext || "Preiserhöhung bzw. einseitige Vertragsänderung zu meinen Ungunsten."}

Gemäß § 314 BGB sowie den einschlägigen Verbraucherschutzvorschriften (u. a. § 41 Abs. 3 TKG, § 41a EnWG) steht mir bei einer wesentlichen Änderung der Vertragsbedingungen ein Sonderkündigungsrecht zu. Ich übe dieses Recht fristgerecht innerhalb der gesetzlichen bzw. vertraglich vereinbarten Frist aus.

${sepaLine(data.sepaMandat)}

Ich bitte um schriftliche Bestätigung der Kündigung sowie des Beendigungstermins.`
      break

    // -----------------------------------------------------------------------
    case "widerruf":
      betreffText = buildBetreff("Widerruf des Vertrages", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit erkläre ich den Widerruf des oben bezeichneten Vertrages gemäß § 355 BGB in Verbindung mit § 356 BGB.

Der Vertrag wurde am ${data.kuendigungsDatum || "(Abschlussdatum einsetzen)"} geschlossen. Die gesetzliche Widerrufsfrist von 14 Tagen ist noch nicht abgelaufen; der Widerruf erfolgt daher fristgerecht.

Ich fordere Sie auf, bereits geleistete Zahlungen unverzüglich, spätestens jedoch innerhalb von 14 Tagen nach Zugang dieses Widerrufs, gemäß § 357 BGB zurückzuerstatten.

${sepaLine(data.sepaMandat)}${data.zusatztext ? `\n\n${data.zusatztext}` : ""}`
      break

    // -----------------------------------------------------------------------
    case "fristlos":
      betreffText = buildBetreff(
        "Außerordentliche fristlose Kündigung aus wichtigem Grund",
        data.vertragsnummer,
        data.kundennummer
      )
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag außerordentlich und fristlos mit sofortiger Wirkung aus wichtigem Grund gemäß § 314 BGB.

Wichtiger Grund:
${data.zusatztext || "(Bitte konkreten Kündigungsgrund eintragen, z. B. schwerwiegende Vertragsverletzung, unzumutbare Beeinträchtigung etc.)"}

Die Voraussetzungen des § 314 BGB sind erfüllt: Unter Berücksichtigung aller Umstände des Einzelfalls und nach Abwägung der beiderseitigen Interessen ist mir die Fortsetzung des Vertragsverhältnisses bis zu einem ordentlichen Kündigungstermin nicht zuzumuten.

Ich behalte mir ausdrücklich vor, Schadensersatzansprüche geltend zu machen.

${sepaLine(data.sepaMandat)}

Ich bitte um sofortige schriftliche Bestätigung der Vertragsbeendigung.`
      break

    // -----------------------------------------------------------------------
    case "umzug":
      betreffText = buildBetreff("Sonderkündigung wegen Umzug", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag ${kuendigungZumText} aufgrund meines bevorstehenden Wohnsitzwechsels.

${
  data.zusatztext
    ? `Meine neue Anschrift lautet:\n${data.zusatztext}`
    : "Meine neue Anschrift werde ich Ihnen auf Anfrage mitteilen."
}

Da die vertraglich vereinbarte Leistung an meinem neuen Wohnort nachweislich nicht oder nicht in gleichwertiger Weise erbracht werden kann, steht mir ein Sonderkündigungsrecht zu (vgl. u. a. § 60 TKG für Telekommunikationsverträge sowie allgemein § 313 BGB).

Ich bitte um schriftliche Bestätigung der Kündigung sowie um anteilige Erstattung bereits im Voraus geleisteter Zahlungen.

${sepaLine(data.sepaMandat)}`
      break

    // -----------------------------------------------------------------------
    case "todesfall":
      betreffText = buildBetreff("Kündigung wegen Todesfall", data.vertragsnummer, data.kundennummer)
      bodyText = `als Erbe / bevollmächtigte Person kündige ich hiermit den Vertrag von

${data.verstorbenerName || data.zusatztext || "(Name der verstorbenen Person)"}

mit sofortiger Wirkung aufgrund des eingetretenen Todesfalls.

Eine beglaubigte Kopie der Sterbeurkunde ${
        data.zusatztext?.toLowerCase().includes("liegt")
          ? data.zusatztext
          : "füge ich diesem Schreiben bei. Sollten weitere Nachweise erforderlich sein, teilen Sie mir dies bitte umgehend mit."
      }

Ich bitte Sie sicherzustellen, dass ab sofort keine weiteren Abbuchungen vom Konto der verstorbenen Person erfolgen. Zu viel gezahlte Beträge sind an die Erbenmasse bzw. das nachfolgend genannte Konto zu erstatten.

${sepaLine(data.sepaMandat)}`
      break

    // -----------------------------------------------------------------------
    case "insolvenz":
      betreffText = buildBetreff("Kündigung wegen Insolvenz", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag ${kuendigungZumText} aufgrund der eröffneten Insolvenz.

${data.zusatztext ? `Aktenzeichen des Insolvenzverfahrens: ${data.zusatztext}` : "Das Aktenzeichen des Insolvenzverfahrens teile ich Ihnen auf Anfrage mit."}

Gemäß §§ 103 ff. InsO hat der Insolvenzverwalter das Recht, laufende Schuldverhältnisse zu kündigen. Ich bitte Sie, alle weiteren Forderungen ausschließlich zur Insolvenztabelle anzumelden.

${sepaLine(data.sepaMandat)}

Ich bitte um schriftliche Bestätigung der Vertragsbeendigung.`
      break

    // -----------------------------------------------------------------------
    case "mangelhafteLeistung":
      betreffText = buildBetreff(
        "Kündigung wegen dauerhafter Schlechtleistung",
        data.vertragsnummer,
        data.kundennummer
      )
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag ${kuendigungZumText} wegen anhaltender Schlechterfüllung der vertraglich geschuldeten Leistungen.

Mangelbeschreibung:
${data.zusatztext || "(Bitte konkrete Mängel und bisherige Beanstandungen beschreiben, inkl. Datum der Mängelanzeigen.)"}

Trotz wiederholter Mängelanzeige und Fristsetzung zur Nacherfüllung wurden die Mängel nicht behoben. Ich stütze die Kündigung auf §§ 314, 280 Abs. 1 BGB sowie auf die einschlägigen Gewährleistungsvorschriften.

Ich behalte mir vor, Schadensersatzansprüche wegen der bislang erbrachten mangelhaften Leistungen geltend zu machen.

${sepaLine(data.sepaMandat)}

Ich bitte um schriftliche Bestätigung der Kündigung.`
      break

    // -----------------------------------------------------------------------
    case "gegenseitigesEinvernehmen":
      betreffText = buildBetreff(
        "Aufhebungsvereinbarung – Bitte um Vertragsbeendigung im gegenseitigen Einvernehmen",
        data.vertragsnummer,
        data.kundennummer
      )
      bodyText = `ich möchte den oben bezeichneten Vertrag ${kuendigungZumText} im gegenseitigen Einvernehmen beenden und bitte Sie, einer vorzeitigen Aufhebung zuzustimmen.

${data.zusatztext ? `Hintergrund meiner Bitte:\n${data.zusatztext}\n` : ""}
Ich schlage vor, dass mit dem vereinbarten Beendigungstermin alle gegenseitigen Ansprüche aus diesem Vertrag als vollständig erfüllt gelten, sofern nicht ausdrücklich anderes vereinbart wird.

Bitte teilen Sie mir Ihre Zustimmung schriftlich mit, damit eine entsprechende Aufhebungsvereinbarung erstellt werden kann.

${sepaLine(data.sepaMandat)}`
      break

    // -----------------------------------------------------------------------
    case "renteneintritt":
      betreffText = buildBetreff("Kündigung wegen Eintritt in den Ruhestand", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag ${kuendigungZumText}, da ich zum genannten Zeitpunkt in den gesetzlichen Ruhestand eintrete.

${data.zusatztext ? `${data.zusatztext}\n` : ""}
Da die vertragsgegenständliche Leistung aufgrund meines Renteneintritts für mich nicht mehr erforderlich ist, bitte ich Sie, einer vorzeitigen Vertragsbeendigung zuzustimmen bzw. das Sonderkündigungsrecht anzuerkennen.

${sepaLine(data.sepaMandat)}

Ich bitte um schriftliche Bestätigung der Kündigung und des Beendigungstermins.`
      break

    // -----------------------------------------------------------------------
    case "elternzeit":
      betreffText = buildBetreff("Kündigung wegen Elternzeit", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag ${kuendigungZumText} im Zusammenhang mit meiner bevorstehenden Elternzeit.

${data.zusatztext ? `${data.zusatztext}\n` : ""}
Aufgrund der Elternzeit und der damit verbundenen veränderten Lebensumstände ist die weitere Inanspruchnahme der vertragsgegenständlichen Leistung für mich nicht möglich bzw. zumutbar.

${sepaLine(data.sepaMandat)}

Ich bitte um schriftliche Bestätigung der Kündigung sowie um Bestätigung des Beendigungstermins.`
      break

    // -----------------------------------------------------------------------
    case "geschaeftsaufgabe":
      betreffText = buildBetreff("Kündigung wegen Geschäftsaufgabe", data.vertragsnummer, data.kundennummer)
      bodyText = `hiermit kündige ich den oben bezeichneten Vertrag ${kuendigungZumText} aufgrund der Aufgabe meines Geschäftsbetriebes.

${data.zusatztext ? `${data.zusatztext}\n` : ""}
Da der Betrieb zum genannten Datum vollständig eingestellt wird, besteht kein weiterer Bedarf an der vertragsgegenständlichen Leistung. Ich bitte Sie, einem Sonderkündigungsrecht zuzustimmen, sofern die ordentliche Kündigungsfrist über das Datum der Geschäftsaufgabe hinausgeht.

${sepaLine(data.sepaMandat)}

Bitte bestätigen Sie die Kündigung und den Beendigungstermin schriftlich. Ausstehende Guthaben sind auf das Geschäftskonto bzw. an den Insolvenzverwalter zu erstatten (Details auf Anfrage).`
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


___________________________
${fullName}`
}