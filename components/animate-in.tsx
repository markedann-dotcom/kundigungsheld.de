"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
}

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
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
  }, [once])

  const translateMap = {
    up: "translateY(24px)",
    down: "translateY(-24px)",
    left: "translateX(24px)",
    right: "translateX(-24px)",
    none: "none",
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : translateMap[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}


