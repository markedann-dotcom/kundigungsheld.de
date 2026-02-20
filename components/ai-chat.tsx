"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  text: string
}

const QUICK_QUESTIONS = [
  "Wie lange ist die Kündigungsfrist?",
  "Was ist eine Sonderkündigung?",
  "Muss ich schriftlich kündigen?",
  "Was tun wenn keine Bestätigung kommt?",
]

const MAX = 20

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hallo! Ich bin Ihr KI-Assistent für Kündigungsfragen. Wie kann ich Ihnen helfen? 😊",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [isLimited, setIsLimited] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  // Listen for open event dispatched from Footer
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    window.addEventListener("open-ai-chat", handleOpen)
    return () => window.removeEventListener("open-ai-chat", handleOpen)
  }, [])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading || isLimited) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      })

      const data = await res.json()

      if (res.status === 429) {
        setIsLimited(true)
        setRemaining(0)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-limit",
            role: "assistant",
            text: `⚠️ Sie haben Ihr tägliches Limit von ${MAX} Fragen erreicht. Bitte versuchen Sie es morgen wieder.`,
          },
        ])
        return
      }

      if (data.remaining !== undefined) setRemaining(data.remaining)

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-ai",
          role: "assistant",
          text: data.success
            ? data.message
            : "Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-err",
          role: "assistant",
          text: "Verbindungsfehler. Bitte erneut versuchen.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-6 z-50 flex items-center gap-2.5 rounded-full bg-foreground text-background px-5 py-3.5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-semibold">KI-Assistent</span>
        <span className="flex h-2 w-2 relative">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-background opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-background" />
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl border border-border/50 bg-card shadow-2xl transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        style={{ maxHeight: "580px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 rounded-t-2xl bg-foreground text-background">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-background/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold">KI-Assistent</div>
              <div className="text-[11px] opacity-70 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
          style={{ maxHeight: "380px" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                msg.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-muted border border-border/50"
              }`}>
                {msg.role === "user"
                  ? <User className="h-3.5 w-3.5" />
                  : <Bot className="h-3.5 w-3.5 text-foreground" />
                }
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-foreground text-background rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-2.5">
              <div className="h-7 w-7 rounded-full bg-muted border border-border/50 flex items-center justify-center shrink-0">
                <Bot className="h-3.5 w-3.5 text-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && !isLimited && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-border/50">
          {isLimited ? (
            <div className="text-center py-3 text-xs text-muted-foreground bg-muted/30 rounded-xl">
              ⚠️ Tageslimit erreicht — morgen wieder verfügbar
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-4 py-2 focus-within:border-foreground/20 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                placeholder="Frage stellen..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center disabled:opacity-30 hover:bg-foreground/80 transition-all"
              >
                {isLoading
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <Send className="h-4 w-4" />
                }
              </button>
            </div>
          )}
          <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
            {remaining !== null && !isLimited
              ? `Noch ${remaining} von ${MAX} Fragen heute verfügbar`
              : "KI-Assistent · Kein Ersatz für Rechtsberatung"}
          </p>
        </div>
      </div>
    </>
  )
}