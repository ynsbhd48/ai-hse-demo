import React from 'react'
import { useHSEStore } from '../store/useHSEStore'
import { ShieldAlert } from 'lucide-react'

function RiskAnalysis() {
  const predictions = useHSEStore(s => s.predictions)
  return (
    <div className="bg-white dark:bg-slate-900 p-4 shadow rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Predictive Risk Insights</h2>
        <ShieldAlert className="w-5 h-5 text-rose-400" />
      </div>
      <div className="grid gap-3">
        {predictions.length === 0 && (
          <div className="text-sm text-slate-500">No significant predicted risks at the moment.</div>
        )}
        {predictions.map((p) => (
          <div key={p.id} className="rounded-lg p-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div className="font-medium">{p.riskType}</div>
              <div className="text-xs text-slate-500">{Math.round(p.probability * 100)}% probability</div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{p.message}</div>
            <ul className="list-disc pl-5 mt-2 text-sm text-slate-500 dark:text-slate-400">
              {p.suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiskAnalysis