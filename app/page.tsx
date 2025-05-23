"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Login from "@/components/login"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    if (isAuthenticated) {
      router.push("/dashboard")
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

  return <Login />
}
