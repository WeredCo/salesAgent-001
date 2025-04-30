"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ChatWindow from "@/components/chat-window"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    if (!isAuthenticated) {
      router.push("/")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-zinc-300"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  )
}
