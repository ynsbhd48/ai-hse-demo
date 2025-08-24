import React from 'react'
import useAppStore from '../store/appStore'

const RiskPill = ({ level }) => {
  const color = level === 'high' ? 'badge-error' : level === 'medium' ? 'badge-warning' : 'badge-success'
  return <span className={`badge ${color} badge-sm uppercase`}>{level}</span>
}

const RiskAnalysis = React.memo(function RiskAnalysis() {
  const { metrics, suggestions, alerts } = useAppStore()
  const riskLevel = metrics.riskScore > 60 ? 'high' : metrics.riskScore > 40 ? 'medium' : 'low'

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Risk Analysis</h2>
        <RiskPill level={riskLevel} />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Current risk score is <span className="font-semibold">{metrics.riskScore}</span>. AI suggests focusing on permits and gas monitoring.
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium mb-1">AI Suggestions</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {suggestions.map(s => (
            <li key={s.id} className="marker:text-primary">{s.text}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium mb-1">Recent Alerts</h3>
        <div className="max-h-28 overflow-y-auto space-y-2 pr-1">
          {alerts.slice(0, 5).map(a => (
            <div key={a.id} className="flex items-start justify-between gap-2 text-sm">
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-gray-600 dark:text-gray-400">{a.message}</div>
              </div>
              <RiskPill level={a.riskLevel} />
            </div>
          ))}
          {alerts.length === 0 && <div className="text-gray-500">No alerts yet.</div>}
        </div>
      </div>
    </div>
  )
})

export default RiskAnalysis