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
              Stand: Februar 2025
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
                  Sofern eine entsprechende Einwilligung abgefragt wurde,
                  erfolgt die Verarbeitung ausschließlich auf Grundlage von
                  Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.
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
                  Der Besucherzähler dient ausschließlich statistischen Zwecken
                  und erlaubt keine Rückschlüsse auf einzelne Besucher. Es
                  werden lediglich anonyme Gesamtzahlen erfasst, um einen
                  Überblick über die Nutzung der Website zu erhalten.
                </p>
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
                  Die Verwendung von Upstash erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an
                  der anonymen Analyse des Nutzerverhaltens, um unsere Website
                  und unsere Angebote zu optimieren.
                </p>
                <p className="mt-3 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Datenübermittlung in die USA:
                  </strong>{" "}
                  Sowohl Vercel als auch Upstash haben ihren Sitz in den USA.
                  Die Datenübermittlung erfolgt auf Grundlage von
                  Standardvertragsklauseln gemäß Art. 46 DSGVO. Diese
                  gewährleisten ein angemessenes Datenschutzniveau, das dem
                  europäischen Standard entspricht.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  3. Allgemeine Hinweise und Pflichtinformationen
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
                <p className="mt-3 leading-relaxed">
                  Verantwortliche Stelle ist die natürliche oder juristische
                  Person, die allein oder gemeinsam mit anderen über die Zwecke
                  und Mittel der Verarbeitung von personenbezogenen Daten (z.B.
                  Namen, E-Mail-Adressen o. Ä.) entscheidet.
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
                  Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer-
                  oder handelsrechtliche Aufbewahrungsfristen); im
                  letztgenannten Fall erfolgt die Löschung nach Fortfall dieser
                  Gründe.
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
                  Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die
                  Speicherung von Cookies oder in den Zugriff auf Informationen
                  in Ihr Endgerät (z.B. via Device-Fingerprinting) eingewilligt
                  haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage
                  von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit
                  widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur
                  Durchführung vorvertraglicher Maßnahmen erforderlich,
                  verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1
                  lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern
                  diese zur Erfüllung einer rechtlichen Verpflichtung
                  erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c
                  DSGVO. Die Datenverarbeitung kann ferner auf Grundlage
                  unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f
                  DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen
                  Rechtsgrundlagen wird in den folgenden Absätzen dieser
                  Datenschutzerklärung informiert.
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
                  BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE
                  RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT,
                  ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE
                  WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN
                  PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN,
                  WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE
                  VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
                  FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER
                  GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON
                  RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
                </p>
                <p className="mt-3 leading-relaxed">
                  WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM
                  DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT
                  WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER
                  PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG
                  EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT
                  SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
                  WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN
                  ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG
                  VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h3>
                <p className="leading-relaxed">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen
                  ein Beschwerderecht bei einer Aufsichtsbehörde zu,
                  insbesondere in dem Mitgliedstaat ihres gewöhnlichen
                  Aufenthalts, ihres Arbeitsplatzes oder des Orts des
                  mutmaßlichen Verstoßes. Das Beschwerderecht besteht
                  unbeschadet anderweitiger verwaltungsrechtlicher oder
                  gerichtlicher Rechtsbehelfe.
                </p>
                <p className="mt-3 leading-relaxed">
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
                  Recht auf Datenübertragbarkeit
                </h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
                  Einwilligung oder in Erfüllung eines Vertrags automatisiert
                  verarbeiten, an sich oder an einen Dritten in einem gängigen,
                  maschinenlesbaren Format aushändigen zu lassen. Sofern Sie
                  die direkte Übertragung der Daten an einen anderen
                  Verantwortlichen verlangen, erfolgt dies nur, soweit es
                  technisch machbar ist.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Recht auf Auskunft, Berichtigung und Löschung
                </h3>
                <p className="leading-relaxed">
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                  jederzeit das Recht auf unentgeltliche Auskunft über Ihre
                  gespeicherten personenbezogenen Daten, deren Herkunft und
                  Empfänger und den Zweck der Datenverarbeitung und ggf. ein
                  Recht auf Berichtigung oder Löschung dieser Daten. Hierzu
                  sowie zu weiteren Fragen zum Thema personenbezogene Daten
                  können Sie sich jederzeit an uns wenden.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Recht auf Einschränkung der Verarbeitung
                </h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen. Hierzu können Sie sich
                  jederzeit an uns wenden. Das Recht auf Einschränkung der
                  Verarbeitung besteht in folgenden Fällen:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>
                    Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
                    personenbezogenen Daten bestreiten, benötigen wir in der
                    Regel Zeit, um dies zu überprüfen. Für die Dauer der
                    Prüfung haben Sie das Recht, die Einschränkung der
                    Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    Wenn die Verarbeitung Ihrer personenbezogenen Daten
                    unrechtmäßig geschah/geschieht, können Sie statt der
                    Löschung die Einschränkung der Datenverarbeitung verlangen.
                  </li>
                  <li>
                    Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen,
                    Sie sie jedoch zur Ausübung, Verteidigung oder
                    Geltendmachung von Rechtsansprüchen benötigen, haben Sie
                    das Recht, statt der Löschung die Einschränkung der
                    Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO
                    eingelegt haben, muss eine Abwägung zwischen Ihren und
                    unseren Interessen vorgenommen werden. Solange noch nicht
                    feststeht, wessen Interessen überwiegen, haben Sie das
                    Recht, die Einschränkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.
                  </li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
                  eingeschränkt haben, dürfen diese Daten – von ihrer
                  Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur
                  Geltendmachung, Ausübung oder Verteidigung von
                  Rechtsansprüchen oder zum Schutz der Rechte einer anderen
                  natürlichen oder juristischen Person oder aus Gründen eines
                  wichtigen öffentlichen Interesses der Europäischen Union oder
                  eines Mitgliedstaats verarbeitet werden.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  SSL- bzw. TLS-Verschlüsselung
                </h3>
                <p className="leading-relaxed">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                  Übertragung vertraulicher Inhalte, wie zum Beispiel
                  Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber
                  senden, eine SSL- bzw. TLS-Verschlüsselung. Eine
                  verschlüsselte Verbindung erkennen Sie daran, dass die
                  Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot;
                  wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p className="mt-3 leading-relaxed">
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können
                  die Daten, die Sie an uns übermitteln, nicht von Dritten
                  mitgelesen werden.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  4. Datenerfassung auf dieser Website
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
                <p className="mt-3 leading-relaxed">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen
                  wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf
                  Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber
                  hat ein berechtigtes Interesse an der technisch fehlerfreien
                  Darstellung und der Optimierung seiner Website – hierzu müssen
                  die Server-Log-Files erfasst werden.
                </p>

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
                  . Sie verbleiben zu 100% auf Ihrem Endgerät und können
                  jederzeit von Ihnen gelöscht werden.
                </p>
                <p className="mt-3 leading-relaxed">
                  In der localStorage werden folgende Daten gespeichert:
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
                <p className="mt-3 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    So löschen Sie Ihre lokal gespeicherten Daten:
                  </strong>
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>In der App: Nutzen Sie die &quot;Alle Daten löschen&quot;-Funktion</li>
                  <li>Im Browser: Löschen Sie den localStorage über die Browser-Einstellungen</li>
                  <li>Cookies löschen: Wählen Sie &quot;Alle Daten löschen&quot; in Ihrem Browser</li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  Rechtsgrundlage: Die Speicherung erfolgt auf Grundlage Ihrer
                  Einwilligung durch aktive Nutzung der Kündigungsgenerator-Funktion
                  (Art. 6 Abs. 1 lit. a DSGVO).
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Besucherzähler (Upstash)
                </h3>
                <p className="leading-relaxed">
                  Wir verwenden einen anonymen Besucherzähler über Upstash, um
                  eine ungefähre Statistik über die Nutzung unserer Website zu
                  erhalten. Dieser Zähler erfasst:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>
                    <strong className="font-semibold text-foreground">Nur</strong> die
                    Gesamtzahl der Seitenaufrufe (aggregiert)
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Keine</strong>{" "}
                    IP-Adressen
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Keine</strong>{" "}
                    personenbezogenen Daten
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Keine</strong>{" "}
                    Cookies oder Tracking-IDs
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Keine</strong>{" "}
                    Möglichkeit zur Identifizierung einzelner Besucher
                  </li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  Der Besucherzähler ist vollständig anonym und dient
                  ausschließlich statistischen Zwecken. Es findet kein Tracking,
                  keine Profilbildung und keine Weitergabe von Daten an Dritte
                  statt.
                </p>
                <p className="mt-3 leading-relaxed">
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                  Interesse an anonymer Statistik zur Verbesserung des Angebots).
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Kontaktformular / E-Mail-Kontakt
                </h3>
                <p className="leading-relaxed">
                  Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben
                  inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen
                  bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                  Einwilligung weiter.
                </p>
                <p className="mt-3 leading-relaxed">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung
                  eines Vertrags zusammenhängt oder zur Durchführung
                  vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen
                  Fällen beruht die Verarbeitung auf unserem berechtigten
                  Interesse an der effektiven Bearbeitung der an uns gerichteten
                  Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                  Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese
                  abgefragt wurde.
                </p>
                <p className="mt-3 leading-relaxed">
                  Die von Ihnen im Kontaktformular bzw. per E-Mail eingegebenen
                  Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern,
                  Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
                  für die Datenspeicherung entfällt (z.B. nach abgeschlossener
                  Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen
                  – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  5. Keine Analyse-Tools und Werbung
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
                <p className="mt-3 leading-relaxed">
                  Ihre Privatsphäre ist uns wichtig. Wir beschränken uns auf die
                  absolut notwendige Datenverarbeitung für den Betrieb der
                  Website.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  6. Ihre Datenschutzrechte im Überblick
                </h2>
                <p className="leading-relaxed">
                  Sie haben folgende Rechte bezüglich Ihrer personenbezogenen
                  Daten:
                </p>
                <ul className="mt-3 ml-6 space-y-2">
                  <li>
                    <strong className="font-semibold text-foreground">
                      Recht auf Auskunft:
                    </strong>{" "}
                    Sie können jederzeit Auskunft über Ihre gespeicherten Daten
                    verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Recht auf Berichtigung:
                    </strong>{" "}
                    Sie können die Korrektur falscher Daten verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Recht auf Löschung:
                    </strong>{" "}
                    Sie können die Löschung Ihrer Daten verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Recht auf Einschränkung:
                    </strong>{" "}
                    Sie können die Einschränkung der Verarbeitung verlangen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Recht auf Datenübertragbarkeit:
                    </strong>{" "}
                    Sie können Ihre Daten in einem strukturierten Format
                    erhalten.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Widerspruchsrecht:
                    </strong>{" "}
                    Sie können der Verarbeitung Ihrer Daten widersprechen.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Beschwerderecht:
                    </strong>{" "}
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
                  7. Kontakt und Fragen
                </h2>
                <p className="leading-relaxed">
                  Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte
                  erreichen Sie uns unter:
                </p>
                <p className="mt-3 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Verantwortlicher:
                  </strong>
                  <br />
                  Marko Volchkov<br />
                  Eugen-Adolf-Straße 30<br />
                  71522 Backnang<br />
                  Deutschland
                </p>
                <p className="mt-3 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    Kontakt:
                  </strong>
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:kundigungsheld@gmail.com"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    kundigungsheld@gmail.com
                  </a>
                </p>
                <p className="mt-4 leading-relaxed">
                  Wir bemühen uns, Ihre Anfragen innerhalb von 30 Tagen zu
                  beantworten.
                </p>
              </section>

              <section>
                <p className="mt-8 text-sm text-muted-foreground italic">
                  Diese Datenschutzerklärung wurde zuletzt am 17. Februar 2026
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