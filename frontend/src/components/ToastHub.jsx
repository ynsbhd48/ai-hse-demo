import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHSEStore } from '../store/useHSEStore'

const typeToClasses = {
  danger: 'bg-red-600/90 text-white',
  warning: 'bg-yellow-500/90 text-black',
  info: 'bg-blue-600/90 text-white',
  success: 'bg-green-600/90 text-white',
}

function ToastHub() {
  const alerts = useHSEStore(s => s.alerts)
  const removeAlert = useHSEStore(s => s.removeAlert)

  useEffect(() => {
    const timers = alerts.map(a => setTimeout(() => removeAlert(a.id), 6000))
    return () => { timers.forEach(t => clearTimeout(t)) }
  }, [alerts, removeAlert])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-2 p-4">
      <AnimatePresence>
        {alerts.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.98 }}
            className={`pointer-events-auto w-full max-w-sm rounded-lg shadow-lg ${typeToClasses[a.type || 'info']}`}
          >
            <div className="p-3">
              <div className="text-sm font-semibold">{a.title}</div>
              <div className="text-xs opacity-90">{a.message}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(ToastHub)

