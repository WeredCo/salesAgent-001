"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple timeout to simulate authentication process
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        // Store auth state in localStorage
        localStorage.setItem("isAuthenticated", "true")
        router.push("/dashboard")
      } else if (username === "JavierColor" && password === "alecolor2025") {
        // Store auth state in localStorage
        localStorage.setItem("isAuthenticated", "true")
        router.push("/dashboard")
      } else {
        setError("Usuario o contraseña incorrectos")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white/95">ALECOLOR SRL</h1>
          <p className="mt-2 text-sm text-zinc-400">Inicie sesión para acceder al sistema</p>
        </div>

        <div className="rounded-lg border border-zinc-800/80 bg-black/50 p-6 backdrop-blur-sm shadow-xl">
          {error && (
            <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-400">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">
                Usuario
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700/50 pl-10 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
                  placeholder="Ingrese su usuario"
                  required
                />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700/50 pl-10 pr-10 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-200",
                isLoading && "opacity-70 cursor-not-allowed",
              )}
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-500">
          Sistema de asistencia inteligente para consultas de repuestos y servicios.
        </p>
      </div>
    </div>
  )
}
