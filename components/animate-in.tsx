"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
  /** Если true — рендерится сразу без анимации (для LCP-элементов) */
  instant?: boolean
}

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
  once = true,
  instant = false,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Если instant или delay=0 — показываем сразу, не ждём IntersectionObserver
  const [isVisible, setIsVisible] = useState(instant || delay === 0)

  useEffect(() => {
    // Если уже видим — не вешаем observer
    if (instant) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, instant])

  const translateMap = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
    none: "none",
  }

  // Для instant-элементов — никаких стилей анимации, чистый рендер
  if (instant) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : translateMap[direction],
        transition: isVisible
          ? `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
          : "none",
        // willChange только когда анимация активна, не всегда
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}