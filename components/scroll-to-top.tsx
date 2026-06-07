"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setScrollPct(total > 0 ? Math.min(scrolled / total, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // SVG circle progress
  const size = 48;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * scrollPct;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Nach oben scrollen"
      className={`group fixed bottom-5 right-5 z-50 flex items-center justify-center transition-all duration-500 sm:bottom-7 sm:right-7 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90 transition-all duration-300"
        aria-hidden
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border/40"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scrollGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className="transition-all duration-150"
        />
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.2 258)" />
            <stop offset="100%" stopColor="oklch(0.58 0.22 280)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Button core */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border/50 bg-card/90 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:border-primary/30 group-active:scale-95">
        {/* Gradient glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <ArrowUp className="relative h-4 w-4 text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
}