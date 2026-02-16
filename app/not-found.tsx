import Link from "next/link"
import { FileQuestion, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-[hsl(210,40%,98%)]">
        <section className="flex min-h-[60vh] items-center justify-center py-20">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
              <FileQuestion className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              404
            </h1>
            <p className="mt-2 font-display text-xl font-semibold text-foreground">
              Seite nicht gefunden
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
              Prüfen Sie die URL oder kehren Sie zur Startseite zurück.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button className="gap-2 rounded-full px-6" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Zur Startseite
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 rounded-full px-6" asChild>
                <Link href="/#generator">
                  <ArrowLeft className="h-4 w-4" />
                  Zum Generator
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
