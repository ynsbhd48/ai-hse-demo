import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Clock, MapPin, User, TrendingUp, BarChart3, FileText, X } from 'lucide-react'

function IncidentTracker() {
  const [incidents, setIncidents] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [isAddingIncident, setIsAddingIncident] = useState(false)
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'medium',
    type: 'safety'
  })

  useEffect(() => {
    // Simulate initial incidents data
    setIncidents([
      {
        id: 1,
        title: 'Slip and Fall Incident',
        description: 'Employee slipped on wet surface in Zone B',
        location: 'Zone B - Manufacturing Floor',
        severity: 'high',
        type: 'safety',
        reportedBy: 'John Smith',
        reportedAt: '2024-01-15T10:30:00',
        status: 'investigating',
        aiRiskScore: 78,
        aiRecommendations: [
          'Implement immediate wet floor signage',
          'Review floor cleaning procedures',
          'Consider anti-slip flooring in high-risk areas'
        ]
      },
      {
        id: 2,
        title: 'Equipment Malfunction',
        description: 'Conveyor belt stopped unexpectedly',
        location: 'Zone A - Production Line 3',
        severity: 'medium',
        type: 'equipment',
        reportedBy: 'Sarah Johnson',
        reportedAt: '2024-01-15T09:15:00',
        status: 'resolved',
        aiRiskScore: 45,
        aiRecommendations: [
          'Schedule preventive maintenance',
          'Install equipment monitoring sensors',
          'Update maintenance checklist'
        ]
      },
      {
        id: 3,
        title: 'Chemical Spill',
        description: 'Minor chemical spill in laboratory',
        location: 'Zone C - Laboratory',
        severity: 'critical',
        type: 'chemical',
        reportedBy: 'Mike Chen',
        reportedAt: '2024-01-15T08:45:00',
        status: 'investigating',
        aiRiskScore: 92,
        aiRecommendations: [
          'Immediate containment and cleanup',
          'Review chemical handling procedures',
          'Implement spill response training',
          'Install automatic spill detection system'
        ]
      }
    ])
  }, [])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-danger-400 bg-danger-500/20 border-danger-500/30'
      case 'high': return 'text-warning-400 bg-warning-500/20 border-warning-500/30'
      case 'medium': return 'text-primary-400 bg-primary-500/20 border-primary-500/30'
      case 'low': return 'text-success-400 bg-success-500/20 border-success-500/30'
      default: return 'text-dark-400 bg-dark-500/20 border-dark-500/30'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating': return 'text-warning-400 bg-warning-500/20'
      case 'resolved': return 'text-success-400 bg-success-500/20'
      case 'pending': return 'text-primary-400 bg-primary-500/20'
      default: return 'text-dark-400 bg-dark-500/20'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const incident = {
      id: Date.now(),
      ...newIncident,
      reportedBy: 'Current User',
      reportedAt: new Date().toISOString(),
      status: 'pending',
      aiRiskScore: Math.floor(Math.random() * 40) + 60,
      aiRecommendations: [
        'Immediate safety assessment required',
        'Review similar incidents in database',
        'Update safety protocols if needed'
      ]
    }
    setIncidents([incident, ...incidents])
    setNewIncident({ title: '', description: '', location: '', severity: 'medium', type: 'safety' })
    setIsAddingIncident(false)
  }

  const updateIncidentStatus = (id, status) => {
    setIncidents(incidents.map(incident => 
      incident.id === id ? { ...incident, status } : incident
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Incident Tracker</h2>
          <p className="text-dark-300">Monitor and manage safety incidents with AI-powered insights</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingIncident(true)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
        >
          <AlertTriangle className="w-5 h-5" />
          <span>Report Incident</span>
        </motion.button>
      </div>

      {/* Add Incident Form */}
      <AnimatePresence>
        {isAddingIncident && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Report New Incident</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Incident Title"
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newIncident.location}
                  onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={newIncident.description}
                onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                className="w-full bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 h-24"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={newIncident.severity}
                  onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500/50"
                >
                  <option value="low">Low Severity</option>
                  <option value="medium">Medium Severity</option>
                  <option value="high">High Severity</option>
                  <option value="critical">Critical Severity</option>
                </select>
                <select
                  value={newIncident.type}
                  onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500/50"
                >
                  <option value="safety">Safety</option>
                  <option value="equipment">Equipment</option>
                  <option value="chemical">Chemical</option>
                  <option value="environmental">Environmental</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Submit Report
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsAddingIncident(false)}
                  className="px-6 py-3 bg-dark-600 hover:bg-dark-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {incidents.map((incident) => (
          <motion.div
            key={incident.id}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6 cursor-pointer"
            onClick={() => setSelectedIncident(incident)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{incident.title}</h3>
                <p className="text-dark-300 text-sm mb-3">{incident.description}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                  {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-dark-400">
                <MapPin className="w-4 h-4" />
                <span>{incident.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-dark-400">
                <User className="w-4 h-4" />
                <span>{incident.reportedBy}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-dark-400">
                <Clock className="w-4 h-4" />
                <span>{new Date(incident.reportedAt).toLocaleString()}</span>
              </div>
            </div>

            {/* AI Risk Score */}
            <div className="mt-4 p-3 bg-dark-700/30 rounded-lg border border-dark-600/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-300">AI Risk Assessment</span>
                <span className="text-sm font-medium text-primary-400">{incident.aiRiskScore}%</span>
              </div>
              <div className="w-full bg-dark-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    incident.aiRiskScore > 80 ? 'bg-danger-500' :
                    incident.aiRiskScore > 60 ? 'bg-warning-500' : 'bg-success-500'
                  }`}
                  style={{ width: `${incident.aiRiskScore}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Incident Detail Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedIncident(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 border border-dark-600/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedIncident.title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedIncident(null)}
                  className="text-dark-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Incident Details</h3>
                  <p className="text-dark-300">{selectedIncident.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Location</p>
                    <p className="text-white">{selectedIncident.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Reported By</p>
                    <p className="text-white">{selectedIncident.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Severity</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(selectedIncident.severity)}`}>
                      {selectedIncident.severity.charAt(0).toUpperCase() + selectedIncident.severity.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                      {selectedIncident.status.charAt(0).toUpperCase() + selectedIncident.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">AI Recommendations</h3>
                  <div className="space-y-2">
                    {selectedIncident.aiRecommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-dark-700/30 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                        <p className="text-dark-300 text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Update Status</h3>
                  <div className="flex space-x-3">
                    {['pending', 'investigating', 'resolved'].map((status) => (
                      <motion.button
                        key={status}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateIncidentStatus(selectedIncident.id, status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          selectedIncident.status === status
                            ? 'bg-primary-600 text-white'
                            : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default IncidentTracker