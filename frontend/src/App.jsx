import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AIChat from './components/AIChat'
import RiskAnalysis from './components/RiskAnalysis'
import PermitForm from './components/PermitForm'
import ToastHub from './components/ToastHub'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col md:flex-row p-4 gap-4 bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        <Dashboard />
        <div className="flex flex-col gap-4 w-full">
          <PermitForm />
          <RiskAnalysis />
          <AIChat />
        </div>
      </main>
      <ToastHub />
    </div>
  )
}

export default App