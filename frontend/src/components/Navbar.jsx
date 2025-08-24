import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Bell, Settings, User, LogOut } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

function Navbar({ safetyScore }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notifications, setNotifications] = useState(3)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getSafetyColor = (score) => {
    if (score >= 90) return 'text-success-400'
    if (score >= 75) return 'text-warning-400'
    return 'text-danger-400'
  }

  const getSafetyIcon = (score) => {
    if (score >= 90) return '🟢'
    if (score >= 75) return '🟡'
    return '🔴'
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-dark-800/80 backdrop-blur-md border-b border-dark-600/30 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Safety Score */}
          <div className="flex items-center space-x-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI HSE System</h1>
                <p className="text-xs text-dark-400">Next-Gen Safety Management</p>
              </div>
            </motion.div>

            {/* Real-time Safety Score */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-3 bg-dark-700/50 rounded-xl px-4 py-2 border border-dark-600/30"
            >
              <span className="text-2xl">{getSafetyIcon(safetyScore)}</span>
              <div>
                <p className="text-xs text-dark-400">Safety Score</p>
                <p className={`text-lg font-bold ${getSafetyColor(safetyScore)}`}>
                  {safetyScore}%
                </p>
              </div>
            </motion.div>
          </div>

          {/* Center Section - Current Time and Status */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-dark-400">Current Time</p>
              <p className="text-lg font-mono font-bold text-white">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-dark-400">Date</p>
              <p className="text-lg font-bold text-white">
                {currentTime.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Right Section - Actions and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-dark-300 hover:text-white hover:bg-dark-700/50 rounded-lg transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-dark-300 hover:text-white hover:bg-dark-700/50 rounded-lg transition-all duration-200"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 bg-dark-700/50 hover:bg-dark-700 px-3 py-2 rounded-lg border border-dark-600/30 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium hidden sm:block">Admin</span>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-600/30 rounded-xl shadow-xl backdrop-blur-sm"
                  >
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-dark-300 hover:text-white hover:bg-dark-700/50 rounded-lg transition-all duration-200">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-dark-300 hover:text-white hover:bg-dark-700/50 rounded-lg transition-all duration-200">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <hr className="border-dark-600/30 my-2" />
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-danger-400 hover:text-danger-300 hover:bg-danger-500/10 rounded-lg transition-all duration-200">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar