import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, FileBadge, Activity } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts'

const iconMap = {
  trir: TrendingUp,
  nearMisses: AlertTriangle,
  openPermits: FileBadge,
  riskScore: Activity,
}

function MetricCard({ title, value, history, variant }) {
  const Icon = iconMap[variant] || Activity

  const chartData = useMemo(() => {
    return history.map((p, idx) => ({ idx, value: variant === 'riskScore' ? Math.round(p.value) : Number(p.value.toFixed(2)) }))
  }, [history, variant])

  return (
    <motion.div
      className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-xl p-4 shadow-lg border border-slate-700"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-cyan-400" />
          <span className="text-sm text-slate-300">{title}</span>
        </div>
        <span className="text-xl font-semibold">{variant === 'riskScore' ? Math.round(value) : value.toFixed(2)}</span>
      </div>
      <div className="h-16 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: 'white' }} cursor={{ stroke: '#64748b', strokeDasharray: '3 3' }} />
            <defs>
              <linearGradient id={`color-${variant}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#22d3ee" fillOpacity={1} fill={`url(#color-${variant})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default React.memo(MetricCard)

