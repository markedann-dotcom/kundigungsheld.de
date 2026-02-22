"use client"

import { useEffect, useRef, useState } from "react"

interface PdfPreviewProps {
  url: string
  className?: string
}

export function PdfPreview({ url, className = "" }: PdfPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist")
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

        const pdf = await pdfjsLib.getDocument(url).promise
        const page = await pdf.getPage(1)

        if (cancelled || !canvasRef.current || !containerRef.current) return

        const containerWidth = containerRef.current.clientWidth || 600
        const pixelRatio = window.devicePixelRatio || 1

        // Масштабируем PDF под ширину контейнера
        const baseViewport = page.getViewport({ scale: 1 })
        const scale = (containerWidth / baseViewport.width) * pixelRatio

        const viewport = page.getViewport({ scale })

        const canvas = canvasRef.current
        canvas.width = viewport.width
        canvas.height = viewport.height
        canvas.style.width = `${containerWidth}px`
        canvas.style.height = `${viewport.height / pixelRatio}px`

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        await page.render({ canvasContext: ctx, viewport }).promise

        if (!cancelled) setLoading(false)
      } catch (err) {
        console.error("PDF render error:", err)
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [url])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted/20 h-full ${className}`}>
        <p className="text-xs text-muted-foreground">Vorschau nicht verfügbar</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
      {/* Спиннер */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10 z-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        </div>
      )}

      {/* Canvas с PDF */}
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ display: loading ? "none" : "block" }}
      />

      {/* Градиент снизу — эффект "превью" */}
      {!loading && (
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      )}

      {/* Бейдж снизу по центру */}
      {!loading && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-2 rounded-full bg-foreground/90 backdrop-blur-sm px-4 py-2 shadow-lg">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-background">Rechtssicheres Dokument</span>
          </div>
        </div>
      )}
    </div>
  )
}