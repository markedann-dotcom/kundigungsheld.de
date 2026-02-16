"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import Script from "next/script";
import {
  Upload,
  X,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Camera,
  Sparkles,
  User,
  Shirt,
  ImageIcon,
  FileCheck,
  Briefcase,
  Users,
  Clock,
  ShieldAlert,
} from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

type Status = "idle" | "preview" | "loading" | "done" | "error" | "rate-limited";
type PhotoType = "biometric" | "lebenslauf";
type PersonType = "man" | "woman" | "teen_male" | "teen_female";

const personTypeOptions: {
  value: PersonType;
  label: string;
  icon: string;
}[] = [
  { value: "man", label: "Mann", icon: "M" },
  { value: "woman", label: "Frau", icon: "F" },
  { value: "teen_male", label: "Jugendlicher", icon: "Jm" },
  { value: "teen_female", label: "Jugendliche", icon: "Jw" },
];

const photoTypeOptions: {
  value: PhotoType;
  label: string;
  description: string;
  icon: typeof Camera;
}[] = [
  {
    value: "biometric",
    label: "Biometrisches Passfoto",
    description: "Fuer Reisepass, Personalausweis, Fuehrerschein. Bart wird automatisch entfernt.",
    icon: FileCheck,
  },
  {
    value: "lebenslauf",
    label: "Bewerbungsfoto",
    description: "Fuer Lebenslauf & Bewerbungen. Natuerliches, professionelles Erscheinungsbild.",
    icon: Briefcase,
  },
];

const biometricSteps = [
  { icon: User, label: "Gesicht wird erkannt...", duration: 12 },
  { icon: ImageIcon, label: "Hintergrund wird entfernt...", duration: 18 },
  { icon: Sparkles, label: "Gesichtsbehaarung wird entfernt...", duration: 18 },
  { icon: Shirt, label: "Professionelle Kleidung wird hinzugefuegt...", duration: 20 },
  { icon: Camera, label: "Beleuchtung wird optimiert...", duration: 15 },
  { icon: FileCheck, label: "Biometrisches Format wird angepasst...", duration: 15 },
  { icon: CheckCircle2, label: "Qualitaetskontrolle...", duration: 22 },
];

const lebenslaufSteps = [
  { icon: User, label: "Gesicht wird erkannt...", duration: 14 },
  { icon: ImageIcon, label: "Hintergrund wird angepasst...", duration: 18 },
  { icon: Shirt, label: "Professionelle Kleidung wird hinzugefuegt...", duration: 22 },
  { icon: Sparkles, label: "Beleuchtung wird optimiert...", duration: 18 },
  { icon: Camera, label: "Professionelles Framing wird angepasst...", duration: 18 },
  { icon: CheckCircle2, label: "Qualitaetskontrolle...", duration: 30 },
];

const waitingMessages = [
  "Qualitaetskontrolle...",
  "Fast fertig, noch einen Moment...",
  "Feinschliff wird angewendet...",
  "Dein Foto wird finalisiert...",
  "Letzte Optimierungen...",
];

function GenerationTimer({ steps }: { steps: typeof biometricSteps }) {
  const [elapsed, setElapsed] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [waitMsgIndex, setWaitMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 0.1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < steps.length; i++) {
      accumulated += steps[i].duration;
      if (elapsed < accumulated) {
        setCurrentStep(i);
        return;
      }
    }
    setCurrentStep(steps.length - 1);
  }, [elapsed, steps]);

  const isLastStep = currentStep === steps.length - 1;
  useEffect(() => {
    if (!isLastStep) return;
    const interval = setInterval(() => {
      setWaitMsgIndex((prev) => (prev + 1) % waitingMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLastStep]);

  const totalDuration = steps.reduce((s, step) => s + step.duration, 0);
  const rawPercent = (elapsed / totalDuration) * 100;
  const progressPercent = rawPercent <= 90
    ? rawPercent
    : 90 + (10 * (1 - Math.exp(-(rawPercent - 90) / 30)));

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="flex flex-col items-center px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
      {/* Animated circle */}
      <div className="relative mb-8 sm:mb-10">
        <svg className="h-28 w-28 sm:h-32 sm:w-32" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="5"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - progressPercent / 100)}`}
            transform="rotate(-90 60 60)"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <StepIcon className="h-6 w-6 text-primary" />
          <span className="mt-1.5 text-xs font-semibold text-muted-foreground">
            {Math.round(progressPercent)}%
          </span>
        </div>
      </div>

      {/* Current step label */}
      <p className="mb-2 text-center text-sm font-semibold text-foreground animate-fade-in-up sm:text-base" key={isLastStep ? waitMsgIndex : currentStep}>
        {isLastStep ? waitingMessages[waitMsgIndex] : steps[currentStep].label}
      </p>
      <p className="mb-8 text-center text-xs text-muted-foreground sm:mb-10 sm:text-sm">
        {Math.round(elapsed)} Sek. vergangen
      </p>

      {/* Steps list */}
      <div className="flex w-full max-w-xs flex-col gap-2">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-primary/10 text-foreground font-medium"
                  : isCompleted
                  ? "text-muted-foreground/60"
                  : "text-muted-foreground/40"
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all ${
                  isCompleted
                    ? "bg-accent text-accent-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <span className="text-[10px] font-bold">{i + 1}</span>
                )}
              </div>
              <span className={isCompleted ? "line-through" : ""}>
                {step.label.replace("...", "")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const PhotoUpload = forwardRef<HTMLDivElement>(function PhotoUpload(
  _,
  ref
) {
  const { ref: headerAnimRef, isVisible: headerVisible } = useAnimateOnScroll();
  const [status, setStatus] = useState<Status>("idle");
  const [photoType, setPhotoType] = useState<PhotoType>("biometric");
  const [personType, setPersonType] = useState<PersonType>("man");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [resetCountdown, setResetCountdown] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);

  // Turnstile
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileToken = useRef<string | null>(null);
  const turnstileReady = useRef(false);

  const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const initTurnstile = useCallback(() => {
    if (
      !window.turnstile ||
      !turnstileContainerRef.current ||
      turnstileWidgetId.current ||
      !SITE_KEY
    )
      return;
    turnstileReady.current = true;
    turnstileWidgetId.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: SITE_KEY,
        size: "invisible",
        callback: (token: string) => {
          turnstileToken.current = token;
        },
        "error-callback": () => {
          turnstileToken.current = null;
        },
        "expired-callback": () => {
          turnstileToken.current = null;
        },
      }
    );
  }, [SITE_KEY]);

  useEffect(() => {
    fetch("/api/rate-limit")
      .then((r) => r.json())
      .then((data) => {
        if (!data.allowed && data.resetInSeconds > 0) {
          setResetCountdown(data.resetInSeconds);
          setStatus("rate-limited");
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (resetCountdown <= 0) return;
    const timer = setInterval(() => {
      setResetCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus("idle");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resetCountdown]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Bitte lade eine Bilddatei hoch.");
      setStatus("error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Das Bild darf maximal 10 MB gross sein.");
      setStatus("error");
      return;
    }
    fileRef.current = file;
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setResultUrl(null);
    setError(null);
    setStatus("preview");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const compressImage = (file: File, maxSize = 2048): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => resolve(blob || file),
          "image/jpeg",
          0.92
        );
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleGenerate = async () => {
    if (!fileRef.current) return;
    setStatus("loading");
    setError(null);

    try {
      const compressed = await compressImage(fileRef.current);
      const formData = new FormData();
      formData.append("image", compressed, "photo.jpg");
      formData.append("photoType", photoType);
      formData.append("personType", personType);

      if (turnstileToken.current) {
        formData.append("turnstileToken", turnstileToken.current);
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.status === 429 && data.rateLimited) {
        setResetCountdown(data.resetInSeconds || 86400);
        setStatus("rate-limited");
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
          turnstileToken.current = null;
        }
        return;
      }

      if (res.status === 403) {
        setError(data.error || "Sicherheitspruefung fehlgeschlagen.");
        setStatus("error");
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
          turnstileToken.current = null;
        }
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Fehler bei der Verarbeitung.");
      }

      if (!data.image) {
        throw new Error("Kein Bild erhalten. Bitte versuchen Sie es erneut.");
      }

      setResultUrl(data.image);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setError(null);
    fileRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    const filename = photoType === "biometric" ? "passfoto-biometrisch.png" : "bewerbungsfoto.png";
    try {
      const response = await fetch(resultUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = filename;
      a.target = "_blank";
      a.click();
    }
  };

  return (
    <section id="upload" className="relative px-5 py-24 sm:px-6 md:py-32" ref={ref}>
      {/* Cloudflare Turnstile invisible widget */}
      {SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
          strategy="afterInteractive"
          onReady={initTurnstile}
        />
      )}
      <div ref={turnstileContainerRef} className="hidden" />

      <div className="mx-auto max-w-2xl">
        <div
          ref={headerAnimRef}
          className={`scroll-reveal mb-12 text-center sm:mb-14 ${headerVisible ? "visible" : ""}`}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Upload
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Foto hochladen
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Lade dein Selfie hoch und erhalte ein professionelles Passfoto.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl transition-shadow duration-500 hover:shadow-2xl">
          {/* Idle / Drop Zone */}
          {status === "idle" && (
            <div className="flex flex-col">
              {/* Photo Type Selector */}
              <div className="border-b border-border/50 px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7">
                <p className="mb-3.5 text-sm font-semibold text-foreground">
                  Welches Foto brauchst du?
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {photoTypeOptions.map((option) => {
                    const isSelected = photoType === option.value;
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPhotoType(option.value)}
                        className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border/60 bg-card hover:border-muted-foreground/25 hover:bg-secondary/40"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-semibold leading-tight ${
                              isSelected ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {option.label}
                          </p>
                          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                        <div
                          className={`ml-auto mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/25 bg-card"
                          }`}
                        >
                          {isSelected && (
                            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {photoType === "biometric" && (
                  <div className="mt-3.5 flex items-start gap-2.5 rounded-xl bg-accent/10 px-4 py-3">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <p className="text-xs leading-relaxed text-accent">
                      <span className="font-semibold">Hinweis:</span> Bei biometrischen Fotos wird Gesichtsbehaarung (Bart) automatisch entfernt, um den offiziellen Anforderungen zu entsprechen.
                    </p>
                  </div>
                )}
              </div>

              {/* Person Type Selector */}
              <div className="border-b border-border/50 px-5 py-4 sm:px-7 md:px-8 md:py-5">
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-sm font-semibold text-foreground">
                    Wer ist auf dem Foto?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {personTypeOptions.map((option) => {
                    const isSelected = personType === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPersonType(option.value)}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-center transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border/60 bg-card hover:border-muted-foreground/25 hover:bg-secondary/40"
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200 ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {option.icon}
                        </div>
                        <span
                          className={`text-xs font-medium leading-tight ${
                            isSelected ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center px-5 py-12 transition-all duration-200 sm:px-8 sm:py-16 ${
                  dragActive
                    ? "bg-primary/5"
                    : "hover:bg-secondary/30"
                }`}
              >
                <div className={`mb-6 flex h-18 w-18 items-center justify-center rounded-3xl transition-all duration-300 ${
                  dragActive ? "bg-primary/15 text-primary scale-110" : "bg-primary/10 text-primary"
                }`}>
                  <Upload className="h-8 w-8" />
                </div>
                <p className="mb-2 text-base font-semibold text-foreground">
                  Foto hierher ziehen oder klicken
                </p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG oder WebP &mdash; max. 10 MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>
            </div>
          )}

          {/* Preview */}
          {status === "preview" && originalUrl && (
            <div className="p-5 sm:p-7 md:p-8">
              {/* Selected type badge */}
              <div className="mb-5 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                  {photoType === "biometric" ? (
                    <><FileCheck className="h-3 w-3" /> Biometrisches Passfoto</>
                  ) : (
                    <><Briefcase className="h-3 w-3" /> Bewerbungsfoto</>
                  )}
                </span>
              </div>
              <div className="relative mx-auto mb-7 aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border border-border/60 bg-secondary shadow-lg">
                <img
                  src={originalUrl}
                  alt="Hochgeladenes Foto"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={handleReset}
                  className="absolute right-3 top-3 rounded-xl bg-card/80 p-2 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-card hover:text-foreground"
                  aria-label="Entfernen"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleGenerate}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
              >
                <Sparkles className="h-4.5 w-4.5" />
                {photoType === "biometric" ? "Passfoto generieren" : "Bewerbungsfoto generieren"}
              </button>
            </div>
          )}

          {/* Loading - Interactive Timer */}
          {status === "loading" && (
            <GenerationTimer steps={photoType === "biometric" ? biometricSteps : lebenslaufSteps} />
          )}

          {/* Done */}
          {status === "done" && resultUrl && (
            <div className="p-5 sm:p-7 md:p-8">
              <div className="mb-2 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                  {photoType === "biometric" ? (
                    <><FileCheck className="h-3 w-3" /> Biometrisches Passfoto</>
                  ) : (
                    <><Briefcase className="h-3 w-3" /> Bewerbungsfoto</>
                  )}
                </span>
              </div>
              <div className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold text-accent">
                <CheckCircle2 className="h-4.5 w-4.5" />
                {photoType === "biometric" ? "Dein Passfoto ist fertig!" : "Dein Bewerbungsfoto ist fertig!"}
              </div>

              <div className="mb-7 grid grid-cols-2 gap-4">
                {originalUrl && (
                  <div>
                    <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Vorher
                    </p>
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-border/60 bg-secondary">
                      <img
                        src={originalUrl}
                        alt="Originalbild"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Nachher
                  </p>
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-accent/25 bg-accent/5 shadow-md">
                    <img
                      src={resultUrl}
                      alt="Generiertes Passfoto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleDownload}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  Herunterladen
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border/60 px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Neu
                </button>
              </div>
            </div>
          )}

          {/* Rate Limited */}
          {status === "rate-limited" && (
            <div className="flex flex-col items-center justify-center px-6 py-20 md:px-8">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <p className="mb-2 text-base font-semibold text-foreground">
                Tageslimit erreicht
              </p>
              <p className="mb-6 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
                Sie haben Ihr kostenloses Foto fuer heute bereits generiert. Versuchen Sie es morgen erneut.
              </p>
              {resetCountdown > 0 && (
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-secondary/50 px-5 py-3.5 sm:flex-row sm:gap-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      {String(Math.floor(resetCountdown / 3600)).padStart(2, "0")}:
                      {String(Math.floor((resetCountdown % 3600) / 60)).padStart(2, "0")}:
                      {String(resetCountdown % 60).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    bis zur naechsten Generierung
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex flex-col items-center justify-center px-6 py-20 md:px-8">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-destructive/10 text-destructive">
                <AlertCircle className="h-7 w-7" />
              </div>
              <p className="mb-2 text-base font-semibold text-foreground">
                Fehler aufgetreten
              </p>
              <p className="mb-7 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
                {error}
              </p>
              <button
                onClick={handleReset}
                className="rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]"
              >
                Erneut versuchen
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
