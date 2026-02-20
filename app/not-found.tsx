import Link from "next/link"
import { FileText, Home, BookOpen, Archive, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const QUICK_LINKS = [
  {
    href: "/",
    icon: Home,
    label: "Startseite",
    desc: "Zurück zur Hauptseite",
  },
  {
    href: "/#generator",
    icon: FileText,
    label: "Generator",
    desc: "Kündigung erstellen",
  },
  {
    href: "/blog",
    icon: BookOpen,
    label: "Blog",
    desc: "Tipps & Ratgeber",
  },
  {
    href: "/archiv",
    icon: Archive,
    label: "Archiv",
    desc: "Meine Kündigungen",
  },
]

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background">
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20">

          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-3xl" />
            <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/3 blur-2xl" />
          </div>

          {/* Giant 404 background text */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <span
              className="font-display font-black text-foreground/[0.03]"
              style={{ fontSize: "clamp(180px, 30vw, 400px)", lineHeight: 1 }}
            >
              404
            </span>
          </div>

          <div className="relative mx-auto max-w-2xl px-4 text-center">

            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-border/60 bg-card shadow-sm">
              <FileText className="h-9 w-9 text-primary" />
            </div>

            {/* Heading */}
            <h1 className="mt-8 font-display text-5xl font-black tracking-tight text-foreground sm:text-6xl">
              Seite nicht{" "}
              <span className="relative">
                gefunden
                <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-primary/40" />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Diese Seite existiert leider nicht oder wurde verschoben. Vielleicht hilft Ihnen einer der folgenden Links weiter.
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button className="gap-2 rounded-full px-8 py-5 text-base" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Zur Startseite
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 rounded-full px-8 py-5 text-base" asChild>
                <Link href="/#generator">
                  Kündigung erstellen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Quick links grid */}
            <div className="mt-14">
              <p className="mb-5 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Schnellnavigation
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {QUICK_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card p-4 text-center transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
                        <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {link.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {link.desc}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}