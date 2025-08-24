import React, { useState } from 'react'
import { useHSEStore } from '../store/useHSEStore'

function PermitForm() {
  const [type, setType] = useState('Hot Work')
  const [zone, setZone] = useState('Utilities')
  const pushAlert = useHSEStore(s => s.pushAlert)
  const metrics = useHSEStore(s => s.metrics)
  return (
    <div className="rounded-2xl border border-white/10 bg-white/70 backdrop-blur-md dark:bg-zinc-900/60 shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Work Permit Form</h2>
      <form className="grid grid-cols-1 sm:grid-cols-3 gap-2" onSubmit={(e) => { e.preventDefault(); pushAlert({ type: 'success', title: 'Permit Submitted', message: `${type} in ${zone}. Current risk ${metrics.riskScore}.` }) }}>
        <select value={type} onChange={(e)=>setType(e.target.value)} className="rounded border border-white/10 bg-white/70 dark:bg-zinc-800/70 p-2 text-sm">
          <option>Hot Work</option>
          <option>Confined Space</option>
          <option>Working at Height</option>
          <option>Electrical Isolation</option>
        </select>
        <select value={zone} onChange={(e)=>setZone(e.target.value)} className="rounded border border-white/10 bg-white/70 dark:bg-zinc-800/70 p-2 text-sm">
          <option>Utilities</option>
          <option>Plant West</option>
          <option>Loading Bay</option>
          <option>Tank Farm</option>
        </select>
        <button type="submit" className="rounded bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-500">Submit</button>
      </form>
    </div>
  )
}

export default PermitForm