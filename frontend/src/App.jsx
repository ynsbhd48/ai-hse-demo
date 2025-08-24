import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AIChat from './components/AIChat'
import RiskAnalysis from './components/RiskAnalysis'
import PermitForm from './components/PermitForm'
import useAppStore from './store/appStore'
import AlertsToasts from './components/AlertsToasts'

function App() {
  const { theme } = useAppStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  return (
    <div data-theme={theme === 'dark' ? 'hse' : 'light'} className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0b1020] text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row p-4 gap-4 w-full">
        <Dashboard />
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <PermitForm />
          <RiskAnalysis />
          <AIChat />
        </div>
      </main>
      <AlertsToasts />
    </div>
  )
}

export default App