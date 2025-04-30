"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Send, Loader2, Bot, User, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Message = {
  role: "user" | "bot"
  content: string
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = crypto.randomUUID()
    setSessionId(id)

    // Focus the input field when the component mounts
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch(
        `https://primary-production-b01f.up.railway.app/webhook/receive-msg?message=${encodeURIComponent(
          input,
        )}&sessionId=${sessionId}`,
      )
      const data = await response.json()

      const botMessage: Message = {
        role: "bot",
        content: data.output || "Sin respuesta de la IA.",
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error al contactar a la IA:", error)
      setMessages((prev) => [...prev, { role: "bot", content: "Error al contactar a la IA." }])
    } finally {
      setLoading(false)
      // Focus the input field after sending a message
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function formatMessage(message: string) {
    if (!message) return ""
    let formatted = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    formatted = formatted.replace(/\n/g, "<br/>")
    return formatted
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-zinc-900 to-black text-white">
      <header className="flex h-16 items-center justify-between border-b border-zinc-800/80 px-6 backdrop-blur-sm bg-black/30">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800/50">
            <Bot className="h-5 w-5 text-zinc-200" />
          </div>
          <div>
            <h1 className="text-base font-medium text-white/95">Asistente de Repuestos</h1>
            <p className="text-xs text-zinc-400">Consultas inteligentes y respuestas precisas</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-zinc-800/50 text-zinc-200 border-zinc-700/50 px-3 py-1">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
          En línea
        </Badge>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && !loading && (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-md space-y-4 px-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-zinc-800/50 flex items-center justify-center">
                <Bot className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-medium text-white/90">Bienvenido al Asistente de Repuestos</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Haz una pregunta sobre repuestos y te ayudaré a encontrar la información que necesitas con precisión y
                rapidez.
              </p>
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-800/20 p-4 mt-6">
                <div className="flex gap-3 items-start">
                  <Info className="h-5 w-5 text-zinc-500 mt-0.5" />
                  <div className="text-xs text-zinc-400 text-left">
                    <p className="font-medium text-zinc-300 mb-1">Sugerencias para comenzar:</p>
                    <ul className="space-y-2 mt-2">
                      <li>• "Necesito repuestos para un Toyota Corolla 2018"</li>
                      <li>• "¿Tienen disponible el filtro de aceite para Chevrolet Cruze?"</li>
                      <li>• "Busco información sobre sistemas de frenos"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn("flex items-start gap-3 group", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            {msg.role === "bot" && (
              <Avatar className="h-9 w-9 border border-zinc-800/50 bg-zinc-800/50 shadow-sm">
                <AvatarFallback className="bg-zinc-800 text-zinc-200">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "rounded-lg px-5 py-3 max-w-[75%] shadow-sm",
                msg.role === "user"
                  ? "bg-zinc-800/80 text-zinc-100 rounded-tr-none"
                  : "bg-zinc-900/80 text-zinc-100 rounded-tl-none border border-zinc-800/50",
              )}
            >
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
              />
            </div>

            {msg.role === "user" && (
              <Avatar className="h-9 w-9 border border-zinc-800/50 bg-zinc-800/50 shadow-sm">
                <AvatarFallback className="bg-zinc-800 text-zinc-200">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9 border border-zinc-800/50 bg-zinc-800/50 shadow-sm">
              <AvatarFallback className="bg-zinc-800 text-zinc-200">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-zinc-900/80 text-zinc-100 rounded-lg rounded-tl-none border border-zinc-800/50 px-5 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 bg-zinc-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-zinc-500 rounded-full animate-pulse"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-zinc-500 rounded-full animate-pulse"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <footer className="border-t border-zinc-800/80 bg-black/50 backdrop-blur-sm p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex w-full items-center gap-3 max-w-4xl mx-auto"
        >
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700 h-12 px-4 rounded-md"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="h-12 w-12 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-200"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </form>
      </footer>
    </div>
  )
}
