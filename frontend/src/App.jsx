import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AIChat from './components/AIChat'
import RiskAnalysis from './components/RiskAnalysis'
import PermitForm from './components/PermitForm'
import SafetyAlerts from './components/SafetyAlerts'
import IncidentTracker from './components/IncidentTracker'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [safetyScore, setSafetyScore] = useState(87)
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and initialize data
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Simulate real-time alerts
      setAlerts([
        { id: 1, type: 'warning', message: 'High temperature detected in Zone A', time: '2 min ago' },
        { id: 2, type: 'danger', message: 'Unauthorized access attempt detected', time: '5 min ago' },
        { id: 3, type: 'success', message: 'Safety inspection completed successfully', time: '10 min ago' }
      ])
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'permits', label: 'Work Permits', icon: '📝' },
    { id: 'risks', label: 'Risk Analysis', icon: '⚠️' },
    { id: 'incidents', label: 'Incidents', icon: '🚨' },
    { id: 'ai-chat', label: 'AI Assistant', icon: '🤖' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard safetyScore={safetyScore} setSafetyScore={setSafetyScore} />
      case 'permits':
        return <PermitForm />
      case 'risks':
        return <RiskAnalysis />
      case 'incidents':
        return <IncidentTracker />
      case 'ai-chat':
        return <AIChat />
      default:
        return <Dashboard safetyScore={safetyScore} setSafetyScore={setSafetyScore} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">AI HSE System</h2>
          <p className="text-primary-200">Initializing safety protocols...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
      <Navbar safetyScore={safetyScore} />
      
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className="w-full lg:w-64 bg-dark-800/50 backdrop-blur-sm border-r border-dark-600/30"
        >
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30 shadow-lg shadow-primary-500/10'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Safety Alerts Banner */}
            <SafetyAlerts alerts={alerts} setAlerts={setAlerts} />
            
            {/* Main Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App