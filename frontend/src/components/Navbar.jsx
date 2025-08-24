import React from 'react'
import { useHSEStore } from '../store/useHSEStore'

function Navbar() {
  const unread = useHSEStore(s => s.chat.unreadCount)
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-white/10 dark:bg-zinc-950/70 text-zinc-900 dark:text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-tight">AI HSE Dashboard</h1>
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="text-sm opacity-80">AI Assistant</span>
          {unread > 0 && (
            <span className="absolute -right-3 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-fuchsia-600 px-1 text-xs font-semibold text-white">{unread}</span>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar