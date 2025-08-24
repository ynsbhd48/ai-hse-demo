import React, { useMemo } from 'react'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts'

function TrendChart({ data, dataKey, stroke = '#4FD1FF' }) {
  const processed = useMemo(() => (data || []).map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: d[dataKey]
  })), [data, dataKey])

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={processed} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="time" hide tick={{ fontSize: 10 }} />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip contentStyle={{ fontSize: 12 }} labelClassName="text-xs" />
          <Line type="monotone" dataKey="value" stroke={stroke} strokeWidth={2} dot={false} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(TrendChart)

