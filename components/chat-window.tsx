"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Send, Loader2, Bot, User } from "lucide-react"
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
    <div className="flex h-screen flex-col bg-zinc-900 text-white">
      <header className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h1 className="text-lg font-medium">Asistente de Repuestos</h1>
        </div>
        <Badge variant="outline" className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
          En línea
        </Badge>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="h-full flex items-center justify-center text-center p-8">
            <div className="max-w-md space-y-2">
              <Bot className="h-12 w-12 mx-auto text-zinc-500" />
              <h3 className="text-lg font-medium text-zinc-300">Bienvenido al Asistente de Repuestos</h3>
              <p className="text-sm text-zinc-400">
                Haz una pregunta sobre repuestos y te ayudaré a encontrar la información que necesitas.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn("flex items-start gap-2.5 group", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            {msg.role === "bot" && (
              <Avatar className="h-8 w-8 border border-zinc-800 bg-zinc-800">
                <AvatarFallback className="bg-zinc-700 text-zinc-200">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                msg.role === "user"
                  ? "bg-zinc-800 text-zinc-100 rounded-tr-none"
                  : "bg-zinc-900 text-zinc-100 rounded-tl-none border border-zinc-800",
              )}
            >
              <div
                className="text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
              />
            </div>

            {msg.role === "user" && (
              <Avatar className="h-8 w-8 border border-zinc-800 bg-zinc-800">
                <AvatarFallback className="bg-zinc-700 text-zinc-200">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-2.5">
            <Avatar className="h-8 w-8 border border-zinc-800 bg-zinc-800">
              <AvatarFallback className="bg-zinc-700 text-zinc-200">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-zinc-900 text-zinc-100 rounded-lg rounded-tl-none border border-zinc-800 px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <footer className="border-t border-zinc-800 bg-black p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex w-full items-center gap-2"
        >
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-zinc-600"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </form>
      </footer>
    </div>
  )
}
