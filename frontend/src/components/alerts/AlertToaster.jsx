import React, { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useHSEStore } from '../../store/useHSEStore'

const colorBySeverity = {
  high: {
    bg: 'bg-rose-600/10',
    text: 'text-rose-300',
    border: 'border-rose-500/30',
  },
  medium: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    border: 'border-amber-500/30',
  },
  low: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
  }
}

function AlertToaster() {
  const alerts = useHSEStore(s => s.alerts)
  const lastShownIdRef = useRef(null)

  useEffect(() => {
    if (!alerts?.length) return
    const last = alerts[alerts.length - 1]
    if (lastShownIdRef.current === last.id) return
    lastShownIdRef.current = last.id

    const c = colorBySeverity[last.severity] || colorBySeverity.low
    toast.custom((t) => (
      <div className={`max-w-sm w-full rounded-lg border ${c.border} ${c.bg} p-3 shadow-xl ${c.text}`}>
        <div className="text-xs opacity-70">{new Date(last.timestamp).toLocaleTimeString()}</div>
        <div className="text-sm font-medium">{last.message}</div>
      </div>
    ))
  }, [alerts])

  return null
}

export default AlertToaster

