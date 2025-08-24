import React, { useMemo } from 'react'
import { useHSEStore } from '../store/useHSEStore'
import MetricCard from './dashboard/MetricCard'
import RealtimeBadge from './dashboard/RealtimeBadge'
import TrendChart from './dashboard/TrendChart'

function Dashboard() {
  const metrics = useHSEStore(s => s.metrics)
  const series = metrics.history

  const riskTone = useMemo(() => {
    if (metrics.riskScore >= 80) return 'text-rose-400'
    if (metrics.riskScore >= 60) return 'text-amber-400'
    return 'text-emerald-400'
  }, [metrics.riskScore])

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Site Safety Overview</h2>
        <RealtimeBadge />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard title="TRIR" value={metrics.trir} history={series.trir} variant="trir" />
        <MetricCard title="Near Misses" value={metrics.nearMisses} history={series.nearMisses} variant="nearMisses" />
        <MetricCard title="Open Permits" value={metrics.openPermits} history={series.openPermits} variant="openPermits" />
        <MetricCard title="Risk Score" value={metrics.riskScore} history={series.riskScore} variant="riskScore" />
      </div>
      <div>
        <TrendChart title="Trends" series={series} />
      </div>
      <div className={`text-sm ${riskTone}`}>Current risk score: {metrics.riskScore}/100</div>
    </div>
  )
}

export default Dashboard