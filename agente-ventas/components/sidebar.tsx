import type React from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div
      className={cn("flex h-screen w-64 flex-col border-r border-zinc-800 bg-black text-white", className)}
      {...props}
    >
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <h1 className="text-lg font-bold tracking-tight">ALECOLOR SRL</h1>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Button
            variant="ghost"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Bot className="h-4 w-4" />
            Asistente
          </Button>
        </nav>
      </div>
    </div>
  )
}
