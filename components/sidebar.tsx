"use client"

import type React from "react"
import { Bot, Settings, Search, FileText, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className, ...props }: SidebarProps) {
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    window.location.href = "/"
  }

  return (
    <div
      className={cn(
        "flex h-screen w-72 flex-col border-r border-zinc-800/80 bg-gradient-to-b from-black to-zinc-900 text-white",
        className,
      )}
      {...props}
    >
      <div className="flex h-16 items-center border-b border-zinc-800/80 px-6">
        <h1 className="text-xl font-semibold tracking-tight text-white/95 letter-spacing-wide">ALECOLOR SRL</h1>
      </div>

      <div className="px-4 py-6">
        <h2 className="px-2 text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Herramientas</h2>
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-md bg-zinc-800/40 px-4 py-6 text-sm font-medium text-white hover:bg-zinc-800/80 hover:text-white"
          >
            <Bot className="h-5 w-5 text-zinc-300" />
            <span>Asistente</span>
          </Button>
        </div>
      </div>

      <Separator className="mx-4 bg-zinc-800/80" />

      <div className="flex-1 overflow-auto py-4 px-4">
        <h2 className="px-2 text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Navegación</h2>
        <nav className="grid gap-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
          >
            <Search className="h-4 w-4 opacity-70" />
            <span>Buscar</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
          >
            <FileText className="h-4 w-4 opacity-70" />
            <span>Documentos</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
          >
            <Settings className="h-4 w-4 opacity-70" />
            <span>Configuración</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
          >
            <HelpCircle className="h-4 w-4 opacity-70" />
            <span>Ayuda</span>
          </Button>
        </nav>
      </div>

      <div className="border-t border-zinc-800/80 p-4">
        <div className="rounded-md bg-zinc-800/30 p-3 mb-3">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Sistema de asistencia inteligente para consultas de repuestos y servicios.
          </p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800/40 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 opacity-70" />
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </div>
  )
}
