"use client"

import { useEffect, useRef, useState } from "react"

interface PdfPreviewProps {
  url: string
  className?: string
  /** Статичный PNG/WebP скриншот первой страницы PDF для мгновенного показа */
  previewImageUrl?: string
}

export function PdfPreview({ url, className = "", previewImageUrl = "/preview/kuendigung-muster-preview.webp" }: PdfPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState<"image" | "loading" | "pdf" | "error">("image")

  // Загружаем PDF только когда элемент виден (IntersectionObserver)
  // и только после того как страница полностью загрузилась
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    const loadPdf = async () => {
      if (cancelled) return
      setStage("loading")

      try {
        const pdfjsLib = await import("pdfjs-dist")
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

        const pdf = await pdfjsLib.getDocument(url).promise
        const page = await pdf.getPage(1)

        if (cancelled || !canvasRef.current || !containerRef.current) return

        const containerWidth = containerRef.current.clientWidth || 600
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2) // max 2x для экономии памяти

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

        if (!cancelled) setStage("pdf")
      } catch (err) {
        console.error("PDF render error:", err)
        if (!cancelled) setStage("error")
      }
    }

    // Ждём load события страницы, потом IntersectionObserver
    const onPageLoad = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect()
            loadPdf()
          }
        },
        { threshold: 0.1, rootMargin: "200px" }
      )
      observer.observe(container)
    }

    if (document.readyState === "complete") {
      // Небольшая задержка чтобы не конкурировать с LCP
      setTimeout(onPageLoad, 1000)
    } else {
      window.addEventListener("load", () => setTimeout(onPageLoad, 1000), { once: true })
    }

    return () => { cancelled = true }
  }, [url])

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden bg-white ${className}`}>

      {/* Статичный preview — показывается мгновенно */}
      {(stage === "image" || stage === "loading") && (
        <img
          src={previewImageUrl}
          alt="Kündigungsschreiben Vorschau"
          className="w-full h-full object-cover object-top"
          // Это изображение на первом экране — грузим с приоритетом
          fetchPriority="high"
          decoding="async"
        />
      )}

      {/* Спиннер поверх картинки пока грузится PDF */}
      {stage === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        </div>
      )}

      {/* Canvas с настоящим PDF */}
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ display: stage === "pdf" ? "block" : "none" }}
      />

      {/* Градиент снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

      {/* Бейдж */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className="flex items-center gap-2 rounded-full bg-foreground/90 backdrop-blur-sm px-4 py-2 shadow-lg">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-background">Rechtssicheres Dokument</span>
        </div>
      </div>
    </div>
  )
}