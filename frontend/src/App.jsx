import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AIChat from './components/AIChat'
import RiskAnalysis from './components/RiskAnalysis'
import PermitForm from './components/PermitForm'
import { Toaster } from 'react-hot-toast'
import AlertToaster from './components/alerts/AlertToaster'
import { useHSEStore } from './store/useHSEStore'

function App() {
  const startSimulation = useHSEStore(s => s.startSimulation)
  useEffect(() => {
    const handle = startSimulation()
    return () => {
      if (handle) clearInterval(handle)
    }
  }, [startSimulation])

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex flex-col lg:flex-row p-4 gap-4 max-w-7xl w-full mx-auto">
        <Dashboard />
        <div className="flex flex-col gap-4 w-full">
          <PermitForm />
          <RiskAnalysis />
          <AIChat />
        </div>
      </main>
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      <AlertToaster />
    </div>
  )
}

export default App