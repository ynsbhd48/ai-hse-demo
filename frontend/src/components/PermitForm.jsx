import React, { useState, useCallback } from 'react'
import { useHSEStore } from '../store/useHSEStore'

function PermitForm() {
  const [workType, setWorkType] = useState('Hot Work')
  const [zone, setZone] = useState('A-1')
  const submitPermit = useHSEStore(s => s.submitPermit)

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    submitPermit({ workType, zone })
  }, [submitPermit, workType, zone])

  return (
    <div className="bg-white dark:bg-slate-900 p-4 shadow rounded-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-2">Work Permit Form</h2>
      <form className="grid grid-cols-1 sm:grid-cols-3 gap-3" onSubmit={onSubmit}>
        <input value={workType} onChange={(e) => setWorkType(e.target.value)} type="text" placeholder="Work Type" className="border border-slate-300 dark:border-slate-700 bg-transparent p-2 rounded" />
        <input value={zone} onChange={(e) => setZone(e.target.value)} type="text" placeholder="Zone" className="border border-slate-300 dark:border-slate-700 bg-transparent p-2 rounded" />
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded transition-colors">Submit</button>
      </form>
    </div>
  )
}

export default PermitForm