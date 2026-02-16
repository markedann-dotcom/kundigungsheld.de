import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Impressum - KündigungsHeld",
  description: "Impressum und Anbieterkennzeichnung gemäß Paragraph 5 TMG.",
}

export default function ImpressumPage() {
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
              Impressum
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Angaben gemäß Paragraph 5 TMG
            </p>

            <div className="mt-10 space-y-8 text-foreground/80">
              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Anbieter
                </h2>
                <p className="leading-relaxed">
                  Marko Volchkov<br />
                  Eugen-Adolf-Straße 30<br />
                  71522 Backnang<br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Kontakt
                </h2>
                <p className="leading-relaxed">
                  E-Mail:{" "}
                  <a href="mailto:kundigungsheld@gmail.com" className="text-primary underline underline-offset-2 hover:text-primary/80">
                    kundigungsheld@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Verantwortlich für den Inhalt nach Paragraph 55 Abs. 2 RStV
                </h2>
                <p className="leading-relaxed">
                  Marko Volchkov<br />
                  Eugen-Adolf-Straße 30<br />
                  71522 Backnang
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  EU-Streitschlichtung
                </h2>
                <p className="leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  <br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle
                </h2>
                <p className="leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Haftung für Inhalte
                </h2>
                <p className="leading-relaxed">
                  Als Diensteanbieter sind wir gemäß Paragraph 7 Abs. 1 TMG
                  für eigene Inhalte auf diesen Seiten nach den allgemeinen
                  Gesetzen verantwortlich. Nach Paragraphen 8 bis 10 TMG sind
                  wir als Diensteanbieter jedoch nicht verpflichtet,
                  übermittelte oder gespeicherte fremde Informationen zu
                  überwachen oder nach Umständen zu forschen, die auf eine
                  rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="mt-3 leading-relaxed">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Haftung für Links
                </h2>
                <p className="leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die
                  verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                  mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
                  waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Urheberrecht
                </h2>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke
                  auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                  bzw. Erstellers. Downloads und Kopien dieser Seite sind nur
                  für den privaten, nicht kommerziellen Gebrauch gestattet.
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
