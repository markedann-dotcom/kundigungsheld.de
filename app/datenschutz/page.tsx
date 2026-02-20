import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Datenschutzerklärung - KündigungsHeld",
  description:
    "Datenschutzerklärung von KündigungsHeld gemäß der Datenschutz-Grundverordnung (DSGVO).",
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Zur Startseite
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Datenschutzerklärung
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Stand: Februar 2026
            </p>

            <div className="mt-10 space-y-8 text-foreground/80">
              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="mb-2 font-display text-lg font-medium text-foreground">
                  Allgemeine Hinweise
                </h3>
                <p className="leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick
                  darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                  Sie diese Website besuchen. Personenbezogene Daten sind alle
                  Daten, mit denen Sie persönlich identifiziert werden können.
                  Ausführliche Informationen zum Thema Datenschutz entnehmen
                  Sie unserer unter diesem Text aufgeführten
                  Datenschutzerklärung.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Datenerfassung auf dieser Website
                </h3>
                <p className="leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Wer ist verantwortlich für die Datenerfassung auf dieser
                    Website?
                  </strong>
                  <br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den
                  Websitebetreiber. Dessen Kontaktdaten können Sie dem
                  Abschnitt &quot;Hinweis zur verantwortlichen Stelle&quot; in dieser
                  Datenschutzerklärung entnehmen.
                </p>

                <p className="mt-4 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Wie erfassen wir Ihre Daten?
                  </strong>
                  <br />
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns
                  diese mitteilen. Hierbei kann es sich z.B. um Daten handeln,
                  die Sie in ein Kontaktformular eingeben. Andere Daten werden
                  automatisch oder nach Ihrer Einwilligung beim Besuch der
                  Website durch unsere IT-Systeme erfasst. Das sind vor allem
                  technische Daten (z.B. Internetbrowser, Betriebssystem oder
                  Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten
                  erfolgt automatisch, sobald Sie diese Website betreten.
                </p>

                <p className="mt-4 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Wofür nutzen wir Ihre Daten?
                  </strong>
                  <br />
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie
                  Bereitstellung der Website zu gewährleisten. Andere Daten
                  können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                  Die Kündigungsdaten, die Sie in unseren Generator eingeben,
                  werden ausschließlich lokal in Ihrem Browser gespeichert
                  (localStorage) und nicht an unsere Server übertragen. Lediglich
                  anonyme Statistikdaten (Besucherzähler) werden zur Verbesserung
                  unseres Angebots erfasst.
                </p>

                <p className="mt-4 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Welche Rechte haben Sie bezüglich Ihrer Daten?
                  </strong>
                  <br />
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                  Herkunft, Empfänger und Zweck Ihrer gespeicherten
                  personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                  Recht, die Berichtigung oder Löschung dieser Daten zu
                  verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
                  erteilt haben, können Sie diese Einwilligung jederzeit für
                  die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                  bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen. Des Weiteren steht
                  Ihnen ein Beschwerderecht bei der zuständigen
                  Aufsichtsbehörde zu.
                </p>

                <p className="mt-4 leading-relaxed">
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
                  Sie sich jederzeit an uns wenden.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  2. Hosting und technische Dienstleister
                </h2>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Vercel (Website-Hosting)
                </h3>
                <p className="leading-relaxed">
                  Wir hosten die Inhalte unserer Website bei Vercel Inc., 340
                  S Lemon Ave #4133, Walnut, CA 91789, USA. Vercel ist ein
                  Cloud-Plattform-Anbieter, der es ermöglicht, Webseiten zu
                  hosten und bereitzustellen.
                </p>
                <p className="mt-3 leading-relaxed">
                  Bei jedem Besuch unserer Website erfasst Vercel automatisch
                  folgende Informationen:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>IP-Adresse (anonymisiert)</li>
                  <li>Browsertyp und -version</li>
                  <li>Betriebssystem</li>
                  <li>Referrer URL (zuvor besuchte Seite)</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  Diese Daten werden für maximal 30 Tage gespeichert und dienen
                  ausschließlich der Fehlerdiagnose, Sicherheit und
                  Bereitstellung der Website.
                </p>
                <p className="mt-3 leading-relaxed">
                  Details entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    https://vercel.com/legal/privacy-policy
                  </a>
                </p>
                <p className="mt-3 leading-relaxed">
                  Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an
                  einer möglichst zuverlässigen Darstellung unserer Website.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Upstash (Besucherzähler)
                </h3>
                <p className="leading-relaxed">
                  Zur Erfassung anonymer Besucherstatistiken nutzen wir Upstash,
                  eine serverlose Datenbank-Plattform von Upstash, Inc., 548
                  Market St PMB 45919, San Francisco, CA 94104, USA.
                </p>
                <p className="mt-3 leading-relaxed">
                  Upstash speichert folgende Daten:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>Anonyme Besucherzahl (aggregierter Zähler)</li>
                  <li>Keine personenbezogenen Daten</li>
                  <li>Keine IP-Adressen</li>
                  <li>Keine Tracking-Cookies</li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  Details entnehmen Sie der Datenschutzerklärung von Upstash:{" "}
                  <a
                    href="https://upstash.com/docs/common/help/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    https://upstash.com/docs/common/help/privacy
                  </a>
                </p>
                <p className="mt-3 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Datenübermittlung in die USA:
                  </strong>{" "}
                  Sowohl Vercel als auch Upstash haben ihren Sitz in den USA.
                  Die Datenübermittlung erfolgt auf Grundlage von
                  Standardvertragsklauseln gemäß Art. 46 DSGVO.
                </p>
              </section>

              {/* ── НОВЫЙ РАЗДЕЛ: KI-Assistent ── */}
              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  3. KI-Assistent (fal.ai)
                </h2>

                <p className="leading-relaxed">
                  Auf unserer Website bieten wir einen KI-gestützten Assistenten an,
                  der Ihre Fragen rund um das Thema Kündigung beantwortet. Dieser
                  Assistent wird über die KI-Plattform{" "}
                  <strong className="font-semibold text-foreground">fal.ai</strong>{" "}
                  (Fal, Inc., USA) betrieben.
                </p>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Welche Daten werden verarbeitet?
                </h3>
                <p className="leading-relaxed">
                  Wenn Sie den KI-Assistenten nutzen, werden folgende Daten
                  an fal.ai übertragen:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>Der Text Ihrer Chatnachricht (Ihre Frage)</li>
                  <li>Ihre IP-Adresse (zur Verarbeitung der Anfrage)</li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  Wir übertragen{" "}
                  <strong className="font-semibold text-foreground">keine</strong>{" "}
                  persönlichen Daten aus Ihrem Kündigungsschreiben oder Ihrem
                  Profil an den KI-Assistenten. Die Chatverläufe werden
                  ausschließlich lokal in Ihrem Browser gespeichert und nach dem
                  Schließen des Chats gelöscht.
                </p>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Nutzungslimit
                </h3>
                <p className="leading-relaxed">
                  Zur Missbrauchsprävention und Kostenkontrolle speichern wir
                  Ihre IP-Adresse temporär im Arbeitsspeicher unseres Servers,
                  um die Anzahl der Anfragen pro Tag zu begrenzen (maximal 20
                  Anfragen pro IP-Adresse pro Tag). Diese Daten werden
                  ausschließlich im RAM gehalten und{" "}
                  <strong className="font-semibold text-foreground">
                    nicht dauerhaft gespeichert
                  </strong>
                  . Sie werden spätestens beim Neustart des Servers gelöscht.
                </p>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Verwendetes KI-Modell
                </h3>
                <p className="leading-relaxed">
                  Wir verwenden das Sprachmodell{" "}
                  <strong className="font-semibold text-foreground">
                    Google Gemini Flash 1.5
                  </strong>
                  , das über die fal.ai-Plattform bereitgestellt wird. Die
                  Verarbeitung Ihrer Anfragen erfolgt auf Servern von fal.ai
                  in den USA.
                </p>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Kein Ersatz für Rechtsberatung
                </h3>
                <p className="leading-relaxed">
                  Der KI-Assistent dient ausschließlich zur allgemeinen
                  Information und ist{" "}
                  <strong className="font-semibold text-foreground">
                    kein Ersatz für eine professionelle Rechtsberatung
                  </strong>
                  . Für rechtlich verbindliche Auskünfte wenden Sie sich bitte
                  an einen zugelassenen Rechtsanwalt.
                </p>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Rechtsgrundlage
                </h3>
                <p className="leading-relaxed">
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
                  lit. f DSGVO (berechtigtes Interesse an der Bereitstellung
                  eines hilfreichen KI-Assistenten) sowie Art. 6 Abs. 1 lit. a
                  DSGVO (Einwilligung durch aktive Nutzung des Chats).
                </p>

                <p className="mt-3 leading-relaxed">
                  Details zur Datenverarbeitung durch fal.ai entnehmen Sie
                  deren Datenschutzerklärung:{" "}
                  <a
                    href="https://fal.ai/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    https://fal.ai/privacy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  4. Allgemeine Hinweise und Pflichtinformationen
                </h2>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Datenschutz
                </h3>
                <p className="leading-relaxed">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                  persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend den
                  gesetzlichen Datenschutzvorschriften sowie dieser
                  Datenschutzerklärung.
                </p>
                <p className="mt-3 leading-relaxed">
                  Wenn Sie diese Website benutzen, werden verschiedene
                  personenbezogene Daten erhoben. Personenbezogene Daten sind
                  Daten, mit denen Sie persönlich identifiziert werden können.
                  Die vorliegende Datenschutzerklärung erläutert, welche Daten
                  wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie
                  und zu welchem Zweck das geschieht.
                </p>
                <p className="mt-3 leading-relaxed">
                  Wir weisen darauf hin, dass die Datenübertragung im Internet
                  (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken
                  aufweisen kann. Ein lückenloser Schutz der Daten vor dem
                  Zugriff durch Dritte ist nicht möglich.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Hinweis zur verantwortlichen Stelle
                </h3>
                <p className="leading-relaxed">
                  Die verantwortliche Stelle für die Datenverarbeitung auf
                  dieser Website ist:
                </p>
                <p className="mt-3 leading-relaxed">
                  Marko Volchkov<br />
                  Eugen-Adolf-Straße 30<br />
                  71522 Backnang<br />
                  Deutschland
                </p>
                <p className="mt-3 leading-relaxed">
                  E-Mail:{" "}
                  <a href="mailto:kundigungsheld@gmail.com" className="text-primary underline underline-offset-2 hover:text-primary/80">
                    kundigungsheld@gmail.com
                  </a>
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Speicherdauer
                </h3>
                <p className="leading-relaxed">
                  Soweit innerhalb dieser Datenschutzerklärung keine
                  speziellere Speicherdauer genannt wurde, verbleiben Ihre
                  personenbezogenen Daten bei uns, bis der Zweck für die
                  Datenverarbeitung entfällt. Wenn Sie ein berechtigtes
                  Löschverlangen geltend machen oder eine Einwilligung zur
                  Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
                  sofern wir keine anderen rechtlich zulässigen Gründe für die
                  Speicherung Ihrer personenbezogenen Daten haben.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Allgemeine Hinweise zu den Rechtsgrundlagen
                </h3>
                <p className="leading-relaxed">
                  Sofern Sie in die Datenverarbeitung eingewilligt haben,
                  verarbeiten wir Ihre personenbezogenen Daten auf Grundlage
                  von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a
                  DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1
                  DSGVO verarbeitet werden. Im Falle einer ausdrücklichen
                  Einwilligung in die Übertragung personenbezogener Daten in
                  Drittstaaten erfolgt die Datenverarbeitung außerdem auf
                  Grundlage von Art. 49 Abs. 1 lit. a DSGVO.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Widerruf Ihrer Einwilligung zur Datenverarbeitung
                </h3>
                <p className="leading-relaxed">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer
                  ausdrücklichen Einwilligung möglich. Sie können eine bereits
                  erteilte Einwilligung jederzeit widerrufen. Die
                  Rechtmäßigkeit der bis zum Widerruf erfolgten
                  Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Widerspruchsrecht gegen die Datenerhebung in besonderen
                  Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
                </h3>
                <p className="leading-relaxed">
                  WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1
                  LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT,
                  AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN,
                  GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN
                  WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE
                  BESTIMMUNGEN GESTÜTZTES PROFILING.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h3>
                <p className="leading-relaxed">
                  Zuständige Aufsichtsbehörde für Baden-Württemberg:<br />
                  Der Landesbeauftragte für den Datenschutz und die
                  Informationsfreiheit Baden-Württemberg<br />
                  Lautenschlagerstraße 20<br />
                  70173 Stuttgart<br />
                  Telefon: 0711/615541-0<br />
                  E-Mail:{" "}
                  <a
                    href="mailto:poststelle@lfdi.bwl.de"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    poststelle@lfdi.bwl.de
                  </a>
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  SSL- bzw. TLS-Verschlüsselung
                </h3>
                <p className="leading-relaxed">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                  Übertragung vertraulicher Inhalte eine SSL- bzw.
                  TLS-Verschlüsselung.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  5. Datenerfassung auf dieser Website
                </h2>

                <h3 className="mb-2 mt-4 font-display text-lg font-medium text-foreground">
                  Server-Log-Dateien
                </h3>
                <p className="leading-relaxed">
                  Der Provider der Seiten (Vercel) erhebt und speichert
                  automatisch Informationen in so genannten Server-Log-Dateien,
                  die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse (anonymisiert)</li>
                </ul>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Lokale Speicherung (localStorage)
                </h3>
                <p className="leading-relaxed">
                  Unsere Website verwendet die localStorage-Funktion Ihres
                  Browsers, um Ihre erstellten Kündigungsschreiben lokal auf
                  Ihrem Gerät zu speichern. Diese Daten werden{" "}
                  <strong className="font-semibold text-foreground">
                    ausschließlich lokal gespeichert und niemals an unsere
                    Server oder Dritte übertragen
                  </strong>
                  .
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>Name des gekündigten Unternehmens</li>
                  <li>Kündigungsgrund und -datum</li>
                  <li>Ihr Name (Vor- und Nachname)</li>
                  <li>Ihre Adresse</li>
                  <li>Der vollständige Text des Kündigungsschreibens</li>
                  <li>Status der Kündigung (erstellt/gesendet/bestätigt)</li>
                  <li>Persönliche Notizen und Erinnerungen</li>
                </ul>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Besucherzähler (Upstash)
                </h3>
                <p className="leading-relaxed">
                  Wir verwenden einen anonymen Besucherzähler über Upstash.
                  Dieser Zähler erfasst ausschließlich die Gesamtzahl der
                  Seitenaufrufe — keine IP-Adressen, keine personenbezogenen
                  Daten, keine Cookies oder Tracking-IDs.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Kontaktformular / E-Mail-Kontakt
                </h3>
                <p className="leading-relaxed">
                  Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben
                  inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                  Bearbeitung der Anfrage bei uns gespeichert. Diese Daten geben
                  wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  6. Keine Analyse-Tools und Werbung
                </h2>
                <p className="leading-relaxed">
                  Wir verwenden bewusst{" "}
                  <strong className="font-semibold text-foreground">
                    keine Tracking-Tools, Analyse-Software oder Werbedienste
                  </strong>
                  . Das bedeutet konkret:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>Kein Google Analytics</li>
                  <li>Kein Facebook Pixel</li>
                  <li>Keine Google Ads oder andere Werbenetzwerke</li>
                  <li>Keine Marketing-Cookies</li>
                  <li>Keine Verhaltensanalyse oder Profiling</li>
                  <li>Keine Weitergabe von Daten an Werbepartner</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  7. Ihre Datenschutzrechte im Überblick
                </h2>
                <ul className="mt-3 ml-6 space-y-2">
                  <li>
                    <strong className="font-semibold text-foreground">Recht auf Auskunft:</strong>{" "}
                    Sie können jederzeit Auskunft über Ihre gespeicherten Daten verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Recht auf Berichtigung:</strong>{" "}
                    Sie können die Korrektur falscher Daten verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Recht auf Löschung:</strong>{" "}
                    Sie können die Löschung Ihrer Daten verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Recht auf Einschränkung:</strong>{" "}
                    Sie können die Einschränkung der Verarbeitung verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Recht auf Datenübertragbarkeit:</strong>{" "}
                    Sie können Ihre Daten in einem strukturierten Format erhalten.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Widerspruchsrecht:</strong>{" "}
                    Sie können der Verarbeitung Ihrer Daten widersprechen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Beschwerderecht:</strong>{" "}
                    Sie können sich bei der Datenschutzbehörde beschweren.
                  </li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter:{" "}
                  <a
                    href="mailto:kundigungsheld@gmail.com"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    kundigungsheld@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  8. Kontakt und Fragen
                </h2>
                <p className="leading-relaxed">
                  Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte
                  erreichen Sie uns unter:
                </p>
                <p className="mt-3 leading-relaxed">
                  <strong className="font-semibold text-foreground">Verantwortlicher:</strong>
                  <br />
                  Marko Volchkov<br />
                  Eugen-Adolf-Straße 30<br />
                  71522 Backnang<br />
                  Deutschland
                </p>
                <p className="mt-3 leading-relaxed">
                  E-Mail:{" "}
                  <a
                    href="mailto:kundigungsheld@gmail.com"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    kundigungsheld@gmail.com
                  </a>
                </p>
                <p className="mt-4 leading-relaxed">
                  Wir bemühen uns, Ihre Anfragen innerhalb von 30 Tagen zu beantworten.
                </p>
              </section>

              <section>
                <p className="mt-8 text-sm text-muted-foreground italic">
                  Diese Datenschutzerklärung wurde zuletzt am 20. Februar 2026
                  aktualisiert und gilt für alle Nutzer der Website
                  kuendigungsheld.de
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}