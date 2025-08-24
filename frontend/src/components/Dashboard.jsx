import React, { useEffect, useMemo } from 'react'
import useAppStore from '../store/appStore'
import { TrendingDown, Activity, ShieldAlert, ClipboardList } from 'lucide-react'
import { motion } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

const MetricCard = React.memo(function MetricCard({ icon: Icon, label, value, subtext, color }) {
  return (
    <div className="glass-card p-4 flex items-center justify-between">
      <div>
        <div className="metric-label">{label}</div>
        <div className="metric-value">{value}</div>
        {subtext && <div className="text-xs text-gray-500 dark:text-gray-400">{subtext}</div>}
      </div>
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center`} style={{ background: `${color}22`, color }}>
        <Icon size={20} />
      </div>
    </div>
  )
})

const Dashboard = React.memo(function Dashboard() {
  const { metrics, startSimulators } = useAppStore()

  useEffect(() => {
    startSimulators()
  }, [startSimulators])

  const trendData = useMemo(() => {
    // Simple synthetic sparkline
    const base = metrics.riskScore
    return new Array(20).fill(0).map((_, i) => ({ x: i, y: Math.max(10, Math.min(90, base + Math.sin(i / 2) * 8 + (Math.random() - 0.5) * 6)) }))
  }, [metrics.riskScore])

  const riskColor = metrics.riskScore > 60 ? '#ef4444' : metrics.riskScore > 40 ? '#f59e0b' : '#10b981'

  return (
    <section className="w-full md:w-1/2 space-y-4">
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Live Site Overview</h2>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="badge badge-info badge-outline">
            Real-time
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard icon={TrendingDown} label="TRIR" value={metrics.trir.toFixed(2)} subtext="12-mo rolling" color="#22d3ee" />
          <MetricCard icon={Activity} label="Near Misses" value={metrics.nearMissesToday} subtext="today" color="#f97316" />
          <MetricCard icon={ClipboardList} label="Open Permits" value={metrics.openPermits} subtext="active" color="#22c55e" />
          <MetricCard icon={ShieldAlert} label="Risk Score" value={metrics.riskScore} subtext="site-wide" color="#ef4444" />
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Risk Trend</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">last ~20 cycles</div>
        </div>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
              <Line type="monotone" dataKey="y" stroke={riskColor} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
})

export default Dashboard