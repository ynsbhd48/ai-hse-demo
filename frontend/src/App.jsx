import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AIChat from './components/AIChat'
import RiskAnalysis from './components/RiskAnalysis'
import PermitForm from './components/PermitForm'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col md:flex-row p-4 gap-4">
        <Dashboard />
        <div className="flex flex-col gap-4 w-full">
          <PermitForm />
          <RiskAnalysis />
          <AIChat />
        </div>
      </main>
    </div>
  )
}

export default App