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
              Stand: Januar 2025
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
                  (localStorage) und nicht an unsere Server übertragen.
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
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  2. Hosting
                </h2>
                <p className="leading-relaxed">
                  Wir hosten die Inhalte unserer Website bei Vercel Inc., 340
                  S Lemon Ave #4133, Walnut, CA 91789, USA. Vercel ist ein
                  Cloud-Plattform-Anbieter, der es ermöglicht, Webseiten zu
                  hosten und bereitzustellen.
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
                  Art. 6 Abs. 1 lit. a DSGVO.
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
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h3>
                <p className="leading-relaxed">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen
                  ein Beschwerderecht bei einer Aufsichtsbehörde zu,
                  insbesondere in dem Mitgliedstaat ihres gewöhnlichen
                  Aufenthalts, ihres Arbeitsplatzes oder des Orts des
                  mutmaßlichen Verstoßes.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Recht auf Datenübertragbarkeit
                </h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
                  Einwilligung oder in Erfüllung eines Vertrags automatisiert
                  verarbeiten, an sich oder an einen Dritten in einem gängigen,
                  maschinenlesbaren Format aushändigen zu lassen.
                </p>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Recht auf Auskunft, Berichtigung und Löschung
                </h3>
                <p className="leading-relaxed">
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                  jederzeit das Recht auf unentgeltliche Auskunft über Ihre
                  gespeicherten personenbezogenen Daten, deren Herkunft und
                  Empfänger und den Zweck der Datenverarbeitung und ggf. ein
                  Recht auf Berichtigung oder Löschung dieser Daten.
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
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in so genannten Server-Log-Dateien, die Ihr
                  Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Lokale Speicherung (localStorage)
                </h3>
                <p className="leading-relaxed">
                  Unsere Website verwendet die localStorage-Funktion Ihres
                  Browsers, um Ihre erstellten Kündigungsschreiben lokal auf
                  Ihrem Gerät zu speichern. Diese Daten werden{" "}
                  <strong className="font-semibold text-foreground">
                    nicht an unsere Server übertragen
                  </strong>
                  . Sie verbleiben ausschließlich auf Ihrem Endgerät und
                  können jederzeit von Ihnen gelöscht werden.
                </p>
                <p className="mt-3 leading-relaxed">
                  In der localStorage werden folgende Daten gespeichert:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-1">
                  <li>Name des gekündigten Unternehmens</li>
                  <li>Kündigungsgrund und -datum</li>
                  <li>Ihr Name (Vor- und Nachname)</li>
                  <li>Der Text des Kündigungsschreibens</li>
                  <li>Status der Kündigung (erstellt/gesendet/bestätigt)</li>
                  <li>Persönliche Notizen</li>
                </ul>

                <h3 className="mb-2 mt-6 font-display text-lg font-medium text-foreground">
                  Besucherzähler
                </h3>
                <p className="leading-relaxed">
                  Wir verwenden einen einfachen, lokal im Browser gespeicherten
                  Besucherzähler. Dieser Zähler speichert keine personenbezogenen
                  Daten und dient ausschließlich der Anzeige einer ungefähren
                  Besucherzahl auf der Website.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  5. Kontakt
                </h2>
                <p className="leading-relaxed">
                  Bei Fragen zum Datenschutz erreichen Sie uns unter:
                </p>
                <p className="mt-3 leading-relaxed">
                  E-Mail:{" "}
                  <a href="mailto:kundigungsheld@gmail.com" className="text-primary underline underline-offset-2 hover:text-primary/80">
                    kundigungsheld@gmail.com
                  </a>
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
