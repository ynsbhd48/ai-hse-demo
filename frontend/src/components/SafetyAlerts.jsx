import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, CheckCircle, Info, AlertCircle } from 'lucide-react'

function SafetyAlerts({ alerts, setAlerts }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-400" />
      case 'danger':
        return <AlertCircle className="w-5 h-5 text-danger-400" />
      default:
        return <Info className="w-5 h-5 text-primary-400" />
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-success-500/30 bg-success-500/10'
      case 'warning':
        return 'border-warning-500/30 bg-warning-500/10'
      case 'danger':
        return 'border-danger-500/30 bg-danger-500/10'
      default:
        return 'border-primary-500/30 bg-primary-500/10'
    }
  }

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const criticalAlerts = alerts.filter(alert => alert.type === 'danger')
  const hasCriticalAlerts = criticalAlerts.length > 0

  return (
    <div className="space-y-4">
      {/* Critical Alert Banner */}
      {hasCriticalAlerts && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-danger-600/20 to-danger-800/20 border border-danger-500/50 rounded-xl p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-danger-400 animate-pulse" />
              <div>
                <h3 className="text-lg font-bold text-danger-300">Critical Safety Alert</h3>
                <p className="text-danger-200 text-sm">
                  {criticalAlerts.length} critical issue{criticalAlerts.length > 1 ? 's' : ''} requiring immediate attention
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2 bg-danger-600/30 hover:bg-danger-600/50 text-danger-200 rounded-lg border border-danger-500/50 transition-all duration-200"
            >
              {isExpanded ? 'Hide Details' : 'View Details'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* All Alerts Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-4 rounded-xl border ${getAlertColor(alert.type)} backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{alert.message}</p>
                      <p className="text-dark-400 text-xs mt-1">{alert.time}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dismissAlert(alert.id)}
                    className="text-dark-400 hover:text-white transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-danger-400">{criticalAlerts.length}</p>
          <p className="text-dark-400 text-sm">Critical</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-warning-400">
            {alerts.filter(a => a.type === 'warning').length}
          </p>
          <p className="text-dark-400 text-sm">Warnings</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-success-400">
            {alerts.filter(a => a.type === 'success').length}
          </p>
          <p className="text-dark-400 text-sm">Resolved</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-primary-400">{alerts.length}</p>
          <p className="text-dark-400 text-sm">Total</p>
        </motion.div>
      </div>
    </div>
  )
}

export default SafetyAlerts