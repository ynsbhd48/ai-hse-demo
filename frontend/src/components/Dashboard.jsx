import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Users, Clock, MapPin, Activity } from 'lucide-react'

function Dashboard({ safetyScore, setSafetyScore }) {
  const [metrics, setMetrics] = useState({
    totalEmployees: 247,
    activePermits: 12,
    pendingInspections: 5,
    daysSinceLastIncident: 23,
    monthlyIncidents: 3,
    safetyTrainingCompletion: 94,
    equipmentUptime: 98.7,
    environmentalCompliance: 100
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [zoneStatus, setZoneStatus] = useState([])

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        safetyScore: Math.max(70, Math.min(100, prev.safetyScore + (Math.random() - 0.5) * 2)),
        equipmentUptime: Math.max(95, Math.min(100, prev.equipmentUptime + (Math.random() - 0.5) * 0.5))
      }))
    }, 5000)

    // Simulate recent activity
    setRecentActivity([
      { id: 1, type: 'safety_check', message: 'Zone A safety inspection completed', time: '2 min ago', status: 'success' },
      { id: 2, type: 'permit_approved', message: 'Hot work permit approved for Zone C', time: '15 min ago', status: 'success' },
      { id: 3, type: 'training_completed', message: 'John Smith completed safety training', time: '1 hour ago', status: 'success' },
      { id: 4, type: 'maintenance', message: 'Equipment maintenance scheduled for tomorrow', time: '2 hours ago', status: 'info' }
    ])

    // Simulate zone status
    setZoneStatus([
      { name: 'Zone A', status: 'safe', riskLevel: 'low', lastInspection: '2 hours ago' },
      { name: 'Zone B', status: 'warning', riskLevel: 'medium', lastInspection: '4 hours ago' },
      { name: 'Zone C', status: 'safe', riskLevel: 'low', lastInspection: '1 hour ago' },
      { name: 'Zone D', status: 'danger', riskLevel: 'high', lastInspection: '6 hours ago' }
    ])

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'text-success-400 bg-success-500/20 border-success-500/30'
      case 'warning': return 'text-warning-400 bg-warning-500/20 border-warning-500/30'
      case 'danger': return 'text-danger-400 bg-danger-500/20 border-danger-500/30'
      default: return 'text-dark-400 bg-dark-500/20 border-dark-500/30'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success-400'
      case 'medium': return 'text-warning-400'
      case 'high': return 'text-danger-400'
      default: return 'text-dark-400'
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'safety_check': return <Shield className="w-4 h-4 text-success-400" />
      case 'permit_approved': return <Activity className="w-4 h-4 text-primary-400" />
      case 'training_completed': return <Users className="w-4 h-4 text-success-400" />
      case 'maintenance': return <Clock className="w-4 h-4 text-warning-400" />
      default: return <Activity className="w-4 h-4 text-dark-400" />
    }
  }

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success-400'
      case 'warning': return 'text-warning-400'
      case 'danger': return 'text-danger-400'
      case 'info': return 'text-primary-400'
      default: return 'text-dark-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Safety Dashboard</h1>
        <p className="text-dark-300">Real-time monitoring of workplace safety and compliance</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-400" />
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {safetyScore >= 90 ? '🟢' : safetyScore >= 75 ? '🟡' : '🔴'}
            </motion.div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{safetyScore}%</h3>
          <p className="text-dark-400 text-sm">Safety Score</p>
          <div className="mt-3 flex items-center space-x-2">
            {safetyScore > 85 ? (
              <TrendingUp className="w-4 h-4 text-success-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-warning-400" />
            )}
            <span className={`text-xs ${safetyScore > 85 ? 'text-success-400' : 'text-warning-400'}`}>
              {safetyScore > 85 ? 'Improving' : 'Needs Attention'}
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-success-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{metrics.totalEmployees}</h3>
          <p className="text-dark-400 text-sm">Total Employees</p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-dark-400">Training</span>
              <span className="text-success-400">{metrics.safetyTrainingCompletion}%</span>
            </div>
            <div className="w-full bg-dark-600 rounded-full h-2 mt-1">
              <div 
                className="bg-success-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${metrics.safetyTrainingCompletion}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <div className="w-12 h-12 bg-warning-500/20 rounded-xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-warning-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{metrics.daysSinceLastIncident}</h3>
          <p className="text-dark-400 text-sm">Days Since Last Incident</p>
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-xs text-success-400">Streak maintained</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{metrics.equipmentUptime}%</h3>
          <p className="text-dark-400 text-sm">Equipment Uptime</p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-dark-400">Active Permits</span>
              <span className="text-primary-400">{metrics.activePermits}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Zone Status and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zone Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary-400" />
            <span>Zone Status</span>
          </h3>
          <div className="space-y-3">
            {zoneStatus.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-dark-700/30 rounded-lg border border-dark-600/20"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    zone.status === 'safe' ? 'bg-success-400' :
                    zone.status === 'warning' ? 'bg-warning-400' : 'bg-danger-400'
                  }`}></div>
                  <span className="text-white font-medium">{zone.name}</span>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getRiskColor(zone.riskLevel)}`}>
                    {zone.riskLevel.charAt(0).toUpperCase() + zone.riskLevel.slice(1)} Risk
                  </p>
                  <p className="text-xs text-dark-400">{zone.lastInspection}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary-400" />
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-dark-700/30 rounded-lg border border-dark-600/20"
              >
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-dark-400 text-xs mt-1">{activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${getActivityStatusColor(activity.status)}`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-primary-600/20 hover:bg-primary-600/30 border border-primary-500/30 rounded-xl text-center transition-all duration-200"
          >
            <Shield className="w-8 h-8 text-primary-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Safety Check</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-success-600/20 hover:bg-success-600/30 border border-success-500/30 rounded-xl text-center transition-all duration-200"
          >
            <Users className="w-8 h-8 text-success-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Training</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-warning-600/20 hover:bg-warning-600/30 border border-warning-500/30 rounded-xl text-center transition-all duration-200"
          >
            <AlertTriangle className="w-8 h-8 text-warning-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Report Issue</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-dark-600/20 hover:bg-dark-600/30 border border-dark-500/30 rounded-xl text-center transition-all duration-200"
          >
            <Activity className="w-8 h-8 text-dark-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Analytics</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard