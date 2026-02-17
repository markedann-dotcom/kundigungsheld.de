import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Mail, MapPin, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Impressum - KündigungsHeld",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG und § 55 RStV.",
  robots: {
    index: true,
    follow: true,
  },
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
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Impressum
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Angaben gemäß § 5 TMG
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-8 text-foreground/80">
              <section>
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                  Anbieter und Betreiber
                </h2>
                <div className="rounded-lg bg-muted/30 p-5 border border-border/40">
                  <p className="leading-relaxed text-foreground font-medium">
                    Marko Volchkov
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="leading-relaxed">
                          Eugen-Adolf-Straße 30<br />
                          71522 Backnang<br />
                          Deutschland
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                      <a 
                        href="mailto:kundigungsheld@gmail.com" 
                        className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium"
                      >
                        kundigungsheld@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
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
                  Hinweis zum Service
                </h2>
                <p className="leading-relaxed">
                  KündigungsHeld ist ein kostenloser Online-Service zur
                  Erstellung rechtssicherer Kündigungsschreiben. Der Service
                  dient ausschließlich der Bereitstellung von Vorlagen und
                  Mustern. Wir übernehmen keine Rechtsberatung. Für rechtliche
                  Fragen wenden Sie sich bitte an einen Rechtsanwalt oder eine
                  Verbraucherzentrale.
                </p>
                <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
                  <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                    <strong className="font-semibold">Wichtig:</strong> Die von
                    unserem Service generierten Kündigungsschreiben sind als
                    Muster zu verstehen. Wir empfehlen, diese vor Verwendung zu
                    überprüfen und ggf. anzupassen. Für die Rechtswirksamkeit
                    Ihrer Kündigung können wir keine Gewähr übernehmen.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Urheberrecht und Markenrechte
                </h2>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke
                  auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers. Downloads und Kopien dieser Seite sind nur für
                  den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="mt-3 leading-relaxed">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                  erstellt wurden, werden die Urheberrechte Dritter beachtet.
                  Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                  Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                  aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
                  Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                  Inhalte umgehend entfernen.
                </p>
                <p className="mt-3 leading-relaxed">
                  Der Name &quot;KündigungsHeld&quot; sowie das Logo sind
                  geschützt. Eine Verwendung ohne ausdrückliche Genehmigung ist
                  nicht gestattet.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Haftung für Inhalte
                </h2>
                <p className="leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
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
                <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
                  <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-200">
                    <strong className="font-semibold">Haftungsausschluss:</strong>{" "}
                    Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir
                    keine Haftung für die Richtigkeit, Vollständigkeit und
                    Aktualität der von uns bereitgestellten Mustervorlagen.
                    Die Nutzung der Inhalte der Website erfolgt auf eigene
                    Gefahr des Nutzers.
                  </p>
                </div>
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
                <p className="mt-3 leading-relaxed">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten
                  ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
                  nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
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
                </p>
                <p className="mt-3 leading-relaxed">
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
                  Hosting und technische Infrastruktur
                </h2>
                <p className="leading-relaxed">
                  Diese Website wird gehostet bei:
                </p>
                <div className="mt-3 rounded-lg bg-muted/30 p-4 border border-border/40">
                  <p className="leading-relaxed">
                    <strong className="font-semibold text-foreground">Vercel Inc.</strong><br />
                    340 S Lemon Ave #4133<br />
                    Walnut, CA 91789<br />
                    USA
                  </p>
                  <p className="mt-3 text-sm">
                    Weitere Informationen finden Sie in unserer{" "}
                    <Link 
                      href="/datenschutz" 
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      Datenschutzerklärung
                    </Link>
                    .
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Keine Abmahnung ohne vorherigen Kontakt
                </h2>
                <p className="leading-relaxed">
                  Sollte der Inhalt oder die Aufmachung dieser Seiten fremde
                  Rechte Dritter oder gesetzliche Bestimmungen verletzen, bitten
                  wir um eine entsprechende Nachricht ohne Kostennote. Wir
                  garantieren, dass die zu Recht beanstandeten Passagen
                  unverzüglich entfernt werden, ohne dass von Ihrer Seite die
                  Einschaltung eines Rechtsbeistandes erforderlich ist.
                </p>
                <p className="mt-3 leading-relaxed">
                  Dennoch von Ihnen ohne vorherige Kontaktaufnahme ausgelöste
                  Kosten werden wir vollumfänglich zurückweisen und
                  gegebenenfalls Gegenklage wegen Verletzung vorgenannter
                  Bestimmungen einreichen.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Bildnachweise und Designelemente
                </h2>
                <p className="leading-relaxed">
                  Auf dieser Website werden folgende Ressourcen verwendet:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-2">
                  <li>Icons: Lucide Icons (MIT Lizenz)</li>
                  <li>Schriftarten: System-Schriften und Open Source Fonts</li>
                  <li>UI-Komponenten: shadcn/ui (MIT Lizenz)</li>
                  <li>Framework: Next.js von Vercel (MIT Lizenz)</li>
                </ul>
                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
                  Alle verwendeten Grafiken und Designelemente sind entweder
                  selbst erstellt oder stehen unter freien Lizenzen, die eine
                  kommerzielle Nutzung erlauben.
                </p>
              </section>

              <section className="border-t border-border/60 pt-6">
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Kontakt für rechtliche Anfragen
                </h2>
                <p className="leading-relaxed">
                  Für rechtliche Anfragen, Löschbegehren oder andere
                  juristische Anliegen kontaktieren Sie uns bitte ausschließlich
                  per E-Mail:
                </p>
                <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <a 
                      href="mailto:kundigungsheld@gmail.com" 
                      className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium text-lg"
                    >
                      kundigungsheld@gmail.com
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Wir bemühen uns, Ihre Anfrage innerhalb von 48 Stunden zu
                    beantworten.
                  </p>
                </div>
              </section>

              <section className="border-t border-border/60 pt-6">
                <p className="text-sm text-muted-foreground italic">
                  Dieses Impressum wurde zuletzt am 17. Februar 2025
                  aktualisiert und gilt für die Website kuendigungsheld.de sowie
                  alle zugehörigen Subdomains.
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