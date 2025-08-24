import React from 'react'
import { useHSEStore } from '../store/useHSEStore'

function RiskAnalysis() {
  const predictions = useHSEStore(s => s.predictedRisks)
  const metrics = useHSEStore(s => s.metrics)
  return (
    <div className="rounded-2xl border border-white/10 bg-white/70 backdrop-blur-md dark:bg-zinc-900/60 shadow p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Predictive Risk Analysis</h2>
        <span className={`rounded-full px-2 py-0.5 text-xs ${metrics.riskScore > 70 ? 'bg-red-600/20 text-red-700 dark:text-red-300' : 'bg-emerald-600/20 text-emerald-700 dark:text-emerald-300'}`}>
          Risk: {metrics.riskScore}
        </span>
      </div>
      <div className="mt-3 grid gap-3">
        {predictions.length === 0 && (
          <div className="text-sm text-zinc-600 dark:text-zinc-300">No elevated risks predicted. Maintain routine controls and observation rounds.</div>
        )}
        {predictions.map((p) => (
          <div key={p.id} className={`rounded-lg border p-3 ${p.level === 'critical' ? 'border-red-500/40 bg-red-500/5' : p.level === 'high' ? 'border-amber-500/40 bg-amber-500/5' : 'border-blue-500/40 bg-blue-500/5'}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{p.area}</div>
              <span className={`text-xs font-medium ${p.level === 'critical' ? 'text-red-600' : p.level === 'high' ? 'text-amber-600' : 'text-blue-600'}`}>{p.level.toUpperCase()}</span>
            </div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{p.description}</div>
            <div className="mt-2 text-xs font-medium text-zinc-800 dark:text-zinc-100">Action: {p.suggestion}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiskAnalysis