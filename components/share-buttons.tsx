"use client"

import { useState } from "react"
import { Link2, Check, Twitter, Facebook, Linkedin, Mail, MessageCircle } from "lucide-react"

interface ShareButtonsProps {
  title: string
  slug: string
  excerpt?: string
}

export function ShareButtons({ title, slug, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // Build absolute URL — works in both browser and SSR fallback
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://kuendigungsheld.de"

  const url = `${baseUrl}/blog/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedExcerpt = encodeURIComponent(excerpt ?? title)

  const shareLinks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366]/10 hover:border-[#25D366]/40 hover:text-[#25D366]",
    },
    {
      id: "twitter",
      label: "X / Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-black/5 hover:border-black/20 hover:text-black dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:text-white",
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 hover:text-[#1877F2]",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
      color: "hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 hover:text-[#0A66C2]",
    },
    {
      id: "email",
      label: "E-Mail",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
      color: "hover:bg-foreground/5 hover:border-foreground/30 hover:text-foreground",
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select input
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-border/50">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Artikel teilen
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {/* Social buttons */}
        {shareLinks.map(({ id, label, icon: Icon, href, color }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Auf ${label} teilen`}
            title={`Auf ${label} teilen`}
            className={[
              "flex items-center gap-2 rounded-full border border-border/60",
              "px-4 py-2 text-sm font-medium text-muted-foreground",
              "transition-all duration-200",
              color,
            ].join(" ")}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}

        {/* Copy link button */}
        <button
          onClick={handleCopy}
          aria-label="Link kopieren"
          title="Link kopieren"
          className={[
            "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
            "transition-all duration-200",
            copied
              ? "border-green-500/40 bg-green-500/10 text-green-600"
              : "border-border/60 text-muted-foreground hover:bg-foreground/5 hover:border-foreground/30 hover:text-foreground",
          ].join(" ")}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Kopiert!</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Link kopieren</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}