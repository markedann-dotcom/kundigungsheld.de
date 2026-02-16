"use client";

import { useEffect, useRef, useState } from "react";

interface UseAnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useAnimateOnScroll({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: UseAnimateOnScrollOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
