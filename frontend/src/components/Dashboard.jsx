import React, { useEffect } from 'react'
import MetricCard from './MetricCard'
import TrendChart from './TrendChart'
import { useHSEStore } from '../store/useHSEStore'

function Dashboard() {
  const metrics = useHSEStore(s => s.metrics)
  const startSimulation = useHSEStore(s => s.startSimulation)

  useEffect(() => {
    startSimulation()
  }, [startSimulation])

  return (
    <div className="w-full md:w-1/3">
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white to-white/70 dark:from-zinc-900 dark:to-zinc-900/60 backdrop-blur-md shadow p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Real-time HSE Metrics</h2>
          <span className="relative inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-xs text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Live
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MetricCard title="TRIR" value={metrics.trir} unit="" subtext="Total Recordable Incident Rate" />
          <MetricCard title="Near Misses" value={metrics.nearMisses} />
          <MetricCard title="Open Permits" value={metrics.openPermits} />
          <MetricCard title="Risk Score" value={metrics.riskScore} subtext="0-100 heuristic risk" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">Risk Trend</div>
            <TrendChart data={metrics.history} dataKey="riskScore" stroke="#FF6BDB" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">TRIR Trend</div>
              <TrendChart data={metrics.history} dataKey="trir" stroke="#4FD1FF" />
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1">Near Misses</div>
              <TrendChart data={metrics.history} dataKey="nearMisses" stroke="#FFE866" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard