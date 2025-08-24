import React from 'react'

function MetricCard({ title, value, unit, accentClass, subtext, children }) {
  return (
    <div className={`relative rounded-xl border border-white/10 bg-white/70 backdrop-blur-md dark:bg-zinc-900/60 shadow-sm p-4 ${accentClass || ''}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">{title}</div>
        {children}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        {value}
        {unit ? <span className="ml-1 text-base font-medium text-zinc-500 dark:text-zinc-400">{unit}</span> : null}
      </div>
      {subtext ? (
        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{subtext}</div>
      ) : null}
    </div>
  )
}

export default React.memo(MetricCard)

