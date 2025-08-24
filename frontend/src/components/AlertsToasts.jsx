import React, { useEffect } from 'react'
import useAppStore from '../store/appStore'

function AlertsToasts() {
  const { alerts, markAlertsRead } = useAppStore()

  useEffect(() => {
    // mark as read when toasts render
    if (alerts.length > 0) markAlertsRead()
  }, [alerts.length])

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {alerts.slice(0, 3).map((a) => (
        <div key={a.id} className={`alert shadow-lg backdrop-blur-sm ${a.type === 'error' ? 'alert-error' : a.type === 'warning' ? 'alert-warning' : a.type === 'success' ? 'alert-success' : 'alert-info'}`}>
          <div>
            <span className="font-medium">{a.title}</span>
            <span className="text-sm opacity-80">{a.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AlertsToasts
