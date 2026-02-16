import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklaerung - AmtlyPhoto",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm transition-all hover:border-primary/30 hover:shadow-md sm:mb-10 sm:px-5 sm:py-2.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurueck zur Startseite
        </Link>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-lg sm:p-8 md:p-12">
          <h1 className="mb-6 font-display text-2xl font-extrabold tracking-tight text-foreground sm:mb-8 sm:text-4xl">
            Datenschutzerklaerung
          </h1>

          <div className="space-y-6 leading-relaxed text-muted-foreground">
            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                1. Datenschutz auf einen Blick
              </h2>
              <p className="text-sm">
                Die folgenden Hinweise geben einen einfachen Ueberblick darueber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
                Sie persoenlich identifiziert werden koennen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                2. Datenerfassung auf dieser Website
              </h2>
              <h3 className="mb-1 font-semibold text-foreground/80">
                Wer ist verantwortlich fuer die Datenerfassung?
              </h3>
              <p className="mb-3 text-sm">
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten koennen Sie dem Impressum
                dieser Website entnehmen.
              </p>
              <h3 className="mb-1 font-semibold text-foreground/80">
                Wie erfassen wir Ihre Daten?
              </h3>
              <p className="text-sm">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                mitteilen (z.B. durch das Hochladen eines Fotos). Andere Daten
                werden automatisch beim Besuch der Website durch unsere IT-Systeme
                erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
                Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                3. Verarbeitung hochgeladener Fotos
              </h2>
              <p className="text-sm">
                Wenn Sie ein Foto zur Erstellung eines Passfotos hochladen, wird
                dieses Bild ausschliesslich zur einmaligen Verarbeitung an unseren
                KI-Dienstleister uebermittelt. Das Foto wird{" "}
                <strong className="text-foreground">nicht dauerhaft gespeichert</strong> und nach der
                Verarbeitung sofort geloescht. Es findet keine Speicherung auf
                unseren Servern statt. Der generierte Passfoto-Download wird
                ausschliesslich in Ihrem Browser verarbeitet.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                4. Hosting
              </h2>
              <p className="text-sm">
                Diese Website wird bei einem externen Dienstleister gehostet
                (Hoster). Die personenbezogenen Daten, die auf dieser Website
                erfasst werden, werden auf den Servern des Hosters gespeichert.
                Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta-
                und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
                Webseitenzugriffe und sonstige Daten, die ueber eine Website
                generiert werden, handeln.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                5. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <h3 className="mb-1 font-semibold text-foreground/80">Datenschutz</h3>
              <p className="mb-3 text-sm">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persoenlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklaerung.
              </p>
              <h3 className="mb-1 font-semibold text-foreground/80">
                Hinweis zur verantwortlichen Stelle
              </h3>
              <p className="text-sm">
                Die verantwortliche Stelle fuer die Datenverarbeitung auf dieser
                Website ist im Impressum angegeben.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                6. Ihre Rechte
              </h2>
              <p className="text-sm">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft ueber
                Herkunft, Empfaenger und Zweck Ihrer gespeicherten
                personenbezogenen Daten zu erhalten. Sie haben ausserdem ein Recht,
                die Berichtigung oder Loeschung dieser Daten zu verlangen. Wenn Sie
                eine Einwilligung zur Datenverarbeitung erteilt haben, koennen Sie
                diese Einwilligung jederzeit fuer die Zukunft widerrufen. Ausserdem
                haben Sie das Recht, unter bestimmten Umstaenden die Einschraenkung
                der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                7. Cookies
              </h2>
              <p className="text-sm">
                Diese Website verwendet keine Tracking-Cookies. Es werden lediglich
                technisch notwendige Cookies verwendet, die fuer den Betrieb der
                Website erforderlich sind.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
