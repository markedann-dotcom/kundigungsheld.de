"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { SuggestCompanyModal } from "@/components/suggest-company-modal"

export function SuggestCompanyButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm transition-all duration-200 hover:border-foreground/30 hover:text-foreground hover:shadow-md"
      >
        <Plus className="h-4 w-4" />
        Anbieter vorschlagen
      </button>

      <SuggestCompanyModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}