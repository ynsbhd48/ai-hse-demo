import React from 'react'
import { Bell } from 'lucide-react'
import { useHSEStore } from '../store/useHSEStore'

function Navbar() {
  const unread = useHSEStore(s => s.chat.unreadCount)
  return (
    <nav className="bg-slate-900 text-slate-100 p-4 flex justify-between items-center border-b border-slate-800 sticky top-0 z-40">
      <h1 className="text-xl font-bold tracking-tight">AI HSE Dashboard</h1>
      <div className="relative">
        <Bell className="w-5 h-5 text-slate-300" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5">
            {unread}
          </span>
        )}
      </div>
    </nav>
  )
}

export default Navbar