import ChatWindow from "@/components/chat-window"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  )
}
