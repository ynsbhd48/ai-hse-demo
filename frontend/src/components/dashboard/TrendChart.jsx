import React, { useMemo } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, Tooltip, YAxis } from 'recharts'

function TrendChart({ title, series, color = '#60a5fa' }) {
  const data = useMemo(() => {
    const maxLen = Math.max(series.trir?.length || 0, series.nearMisses?.length || 0, series.openPermits?.length || 0, series.riskScore?.length || 0)
    return Array.from({ length: maxLen }).map((_, idx) => ({
      idx,
      trir: series.trir?.[idx]?.value ?? null,
      nearMisses: series.nearMisses?.[idx]?.value ?? null,
      openPermits: series.openPermits?.[idx]?.value ?? null,
      riskScore: series.riskScore?.[idx]?.value ?? null,
    }))
  }, [series])

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#33415520" />
            <XAxis dataKey="idx" tick={{ fill: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: 'white' }} />
            <Line type="monotone" dataKey="trir" stroke="#22d3ee" dot={false} name="TRIR" />
            <Line type="monotone" dataKey="nearMisses" stroke="#f59e0b" dot={false} name="Near Misses" />
            <Line type="monotone" dataKey="openPermits" stroke="#10b981" dot={false} name="Open Permits" />
            <Line type="monotone" dataKey="riskScore" stroke={color} dot={false} name="Risk Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default React.memo(TrendChart)

