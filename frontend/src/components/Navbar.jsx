import React from 'react'
import { Sun, Moon, Bell } from 'lucide-react'
import useAppStore from '../store/appStore'

const Navbar = React.memo(function Navbar() {
  const { theme, toggleTheme, unreadAlerts } = useAppStore()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center animate-pulseGlow">
            <span className="font-bold">AI</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold">AI HSE Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-sm relative" aria-label="Notifications" onClick={() => {}}>
            <Bell size={18} />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 badge badge-error badge-xs">{unreadAlerts}</span>
            )}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  )
})

export default Navbar