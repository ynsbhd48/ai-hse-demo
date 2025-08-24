import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Calendar, MapPin, User, AlertTriangle, CheckCircle, Clock, Shield, X } from 'lucide-react'

function PermitForm() {
  const [permits, setPermits] = useState([])
  const [isAddingPermit, setIsAddingPermit] = useState(false)
  const [selectedPermit, setSelectedPermit] = useState(null)
  const [newPermit, setNewPermit] = useState({
    workType: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    workers: '',
    supervisor: '',
    riskLevel: 'medium',
    safetyMeasures: [],
    equipment: []
  })

  const [aiValidation, setAiValidation] = useState({
    riskScore: 0,
    recommendations: [],
    warnings: [],
    isAnalyzing: false
  })

  useEffect(() => {
    // Simulate initial permits data
    setPermits([
      {
        id: 1,
        workType: 'Hot Work',
        location: 'Zone A - Production Line 1',
        startDate: '2024-01-15T08:00:00',
        endDate: '2024-01-15T17:00:00',
        description: 'Welding operations on production line equipment',
        workers: 'John Smith, Mike Johnson',
        supervisor: 'Sarah Wilson',
        riskLevel: 'high',
        status: 'approved',
        safetyMeasures: ['Fire watch', 'Ventilation', 'PPE required'],
        equipment: ['Welding machine', 'Fire extinguisher', 'Ventilation system'],
        aiRiskScore: 78,
        aiRecommendations: [
          'Ensure fire watch is maintained throughout operation',
          'Verify ventilation system is operational',
          'Check all PPE is properly fitted'
        ],
        createdAt: '2024-01-14T16:30:00'
      },
      {
        id: 2,
        workType: 'Confined Space Entry',
        location: 'Zone B - Storage Tank 3',
        startDate: '2024-01-16T09:00:00',
        endDate: '2024-01-16T15:00:00',
        description: 'Inspection and maintenance of storage tank interior',
        workers: 'David Chen, Lisa Rodriguez',
        supervisor: 'Tom Anderson',
        riskLevel: 'critical',
        status: 'pending',
        safetyMeasures: ['Gas monitoring', 'Rescue equipment', 'Entry permit'],
        equipment: ['Gas detector', 'Ventilation fan', 'Rescue harness'],
        aiRiskScore: 92,
        aiRecommendations: [
          'Continuous gas monitoring required',
          'Ensure rescue team is on standby',
          'Verify all safety equipment is tested'
        ],
        createdAt: '2024-01-15T10:00:00'
      }
    ])
  }, [])

  const safetyMeasuresOptions = [
    'Fire watch', 'Ventilation', 'PPE required', 'Gas monitoring',
    'Rescue equipment', 'Entry permit', 'Lockout/Tagout', 'Barricades',
    'Warning signs', 'Emergency procedures', 'Communication system'
  ]

  const equipmentOptions = [
    'Welding machine', 'Fire extinguisher', 'Ventilation system',
    'Gas detector', 'Rescue harness', 'Safety harness', 'Communication radio',
    'First aid kit', 'Emergency lighting', 'Safety barriers'
  ]

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-success-400 bg-success-500/20 border-success-500/30'
      case 'medium': return 'text-warning-400 bg-warning-500/20 border-warning-500/30'
      case 'high': return 'text-danger-400 bg-danger-500/20 border-danger-500/30'
      case 'critical': return 'text-danger-500 bg-danger-600/20 border-danger-600/30'
      default: return 'text-dark-400 bg-dark-500/20 border-dark-500/30'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success-400 bg-success-500/20'
      case 'pending': return 'text-warning-400 bg-warning-500/20'
      case 'rejected': return 'text-danger-400 bg-danger-500/20'
      case 'expired': return 'text-dark-400 bg-dark-500/20'
      default: return 'text-dark-400 bg-dark-500/20'
    }
  }

  const simulateAIValidation = async () => {
    setAiValidation({ ...aiValidation, isAnalyzing: true })
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const riskScore = Math.floor(Math.random() * 40) + 40
    const recommendations = [
      'Ensure all safety measures are properly implemented',
      'Verify equipment is in good working condition',
      'Confirm all workers have proper training'
    ]
    const warnings = riskScore > 70 ? [
      'High-risk operation requires additional safety measures',
      'Consider postponing work during peak hours',
      'Ensure emergency response team is available'
    ] : []

    setAiValidation({
      riskScore,
      recommendations,
      warnings,
      isAnalyzing: false
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (aiValidation.isAnalyzing) return

    const permit = {
      id: Date.now(),
      ...newPermit,
      status: 'pending',
      createdAt: new Date().toISOString(),
      aiRiskScore: aiValidation.riskScore,
      aiRecommendations: aiValidation.recommendations
    }

    setPermits([permit, ...permits])
    setNewPermit({
      workType: '', location: '', startDate: '', endDate: '', description: '',
      workers: '', supervisor: '', riskLevel: 'medium', safetyMeasures: [], equipment: []
    })
    setAiValidation({ riskScore: 0, recommendations: [], warnings: [], isAnalyzing: false })
    setIsAddingPermit(false)
  }

  const updatePermitStatus = (id, status) => {
    setPermits(permits.map(permit => 
      permit.id === id ? { ...permit, status } : permit
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Work Permit Management</h2>
          <p className="text-dark-300">Create and manage work permits with AI-powered risk assessment</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingPermit(true)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
        >
          <FileText className="w-5 h-5" />
          <span>New Permit</span>
        </motion.button>
      </div>

      {/* Add Permit Form */}
      <AnimatePresence>
        {isAddingPermit && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Create New Work Permit</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Work Type"
                  value={newPermit.workType}
                  onChange={(e) => setNewPermit({...newPermit, workType: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newPermit.location}
                  onChange={(e) => setNewPermit({...newPermit, location: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  value={newPermit.startDate}
                  onChange={(e) => setNewPermit({...newPermit, startDate: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500/50"
                  required
                />
                <input
                  type="datetime-local"
                  value={newPermit.endDate}
                  onChange={(e) => setNewPermit({...newPermit, endDate: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500/50"
                  required
                />
              </div>

              <textarea
                placeholder="Work Description"
                value={newPermit.description}
                onChange={(e) => setNewPermit({...newPermit, description: e.target.value})}
                className="w-full bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 h-24"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Workers"
                  value={newPermit.workers}
                  onChange={(e) => setNewPermit({...newPermit, workers: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
                  required
                />
                <input
                  type="text"
                  placeholder="Supervisor"
                  value={newPermit.supervisor}
                  onChange={(e) => setNewPermit({...newPermit, supervisor: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
                  required
                />
                <select
                  value={newPermit.riskLevel}
                  onChange={(e) => setNewPermit({...newPermit, riskLevel: e.target.value})}
                  className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500/50"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                  <option value="critical">Critical Risk</option>
                </select>
              </div>

              {/* Safety Measures and Equipment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-3">Safety Measures</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {safetyMeasuresOptions.map((measure) => (
                      <label key={measure} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newPermit.safetyMeasures.includes(measure)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewPermit({
                                ...newPermit,
                                safetyMeasures: [...newPermit.safetyMeasures, measure]
                              })
                            } else {
                              setNewPermit({
                                ...newPermit,
                                safetyMeasures: newPermit.safetyMeasures.filter(m => m !== measure)
                              })
                            }
                          }}
                          className="rounded border-dark-600/30 bg-dark-700/50 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-dark-300 text-sm">{measure}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Required Equipment</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {equipmentOptions.map((equipment) => (
                      <label key={equipment} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newPermit.equipment.includes(equipment)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewPermit({
                                ...newPermit,
                                equipment: [...newPermit.equipment, equipment]
                              })
                            } else {
                              setNewPermit({
                                ...newPermit,
                                equipment: newPermit.equipment.filter(e => e !== equipment)
                              })
                            }
                          }}
                          className="rounded border-dark-600/30 bg-dark-700/50 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-dark-300 text-sm">{equipment}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Validation */}
              <div className="bg-dark-700/30 rounded-lg p-4 border border-dark-600/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">AI Risk Assessment</h4>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={simulateAIValidation}
                    disabled={aiValidation.isAnalyzing}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    {aiValidation.isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Analyze Risk</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {aiValidation.riskScore > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-300 text-sm">Risk Score</span>
                      <span className={`text-lg font-bold ${
                        aiValidation.riskScore > 80 ? 'text-danger-400' :
                        aiValidation.riskScore > 60 ? 'text-warning-400' : 'text-success-400'
                      }`}>
                        {aiValidation.riskScore}%
                      </span>
                    </div>
                    <div className="w-full bg-dark-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          aiValidation.riskScore > 80 ? 'bg-danger-500' :
                          aiValidation.riskScore > 60 ? 'bg-warning-500' : 'bg-success-500'
                        }`}
                        style={{ width: `${aiValidation.riskScore}%` }}
                      ></div>
                    </div>

                    {aiValidation.recommendations.length > 0 && (
                      <div>
                        <p className="text-dark-300 text-sm mb-2">AI Recommendations:</p>
                        <ul className="space-y-1">
                          {aiValidation.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                              <span className="text-dark-300">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiValidation.warnings.length > 0 && (
                      <div>
                        <p className="text-warning-400 text-sm mb-2">⚠️ Warnings:</p>
                        <ul className="space-y-1">
                          {aiValidation.warnings.map((warning, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-warning-400 mt-0.5 flex-shrink-0" />
                              <span className="text-warning-300">{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex space-x-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={aiValidation.isAnalyzing}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Submit Permit
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsAddingPermit(false)}
                  className="px-6 py-3 bg-dark-600 hover:bg-dark-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permits List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Active Permits</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {permits.map((permit) => (
            <motion.div
              key={permit.id}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6 cursor-pointer"
              onClick={() => setSelectedPermit(permit)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">{permit.workType}</h4>
                  <p className="text-dark-300 text-sm mb-3">{permit.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(permit.riskLevel)}`}>
                    {permit.riskLevel.charAt(0).toUpperCase() + permit.riskLevel.slice(1)} Risk
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(permit.status)}`}>
                    {permit.status.charAt(0).toUpperCase() + permit.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-dark-400">
                  <MapPin className="w-4 h-4" />
                  <span>{permit.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-dark-400">
                  <User className="w-4 h-4" />
                  <span>{permit.supervisor}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-dark-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(permit.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* AI Risk Score */}
              <div className="mt-4 p-3 bg-dark-700/30 rounded-lg border border-dark-600/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-dark-300">AI Risk Assessment</span>
                  <span className="text-sm font-medium text-primary-400">{permit.aiRiskScore}%</span>
                </div>
                <div className="w-full bg-dark-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      permit.aiRiskScore > 80 ? 'bg-danger-500' :
                      permit.aiRiskScore > 60 ? 'bg-warning-500' : 'bg-success-500'
                    }`}
                    style={{ width: `${permit.aiRiskScore}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Permit Detail Modal */}
      <AnimatePresence>
        {selectedPermit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPermit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 border border-dark-600/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedPermit.workType} Permit</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPermit(null)}
                  className="text-dark-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Permit Details</h3>
                  <p className="text-dark-300">{selectedPermit.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Location</p>
                    <p className="text-white">{selectedPermit.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Supervisor</p>
                    <p className="text-white">{selectedPermit.supervisor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Start Date</p>
                    <p className="text-white">{new Date(selectedPermit.startDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-400 mb-1">End Date</p>
                    <p className="text-white">{new Date(selectedPermit.endDate).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Safety Measures</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPermit.safetyMeasures.map((measure, index) => (
                      <span key={index} className="px-3 py-1 bg-success-500/20 text-success-400 rounded-full text-sm border border-success-500/30">
                        {measure}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Required Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPermit.equipment.map((equipment, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm border border-primary-500/30">
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">AI Recommendations</h3>
                  <div className="space-y-2">
                    {selectedPermit.aiRecommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-dark-700/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-success-400 mt-0.5 flex-shrink-0" />
                        <p className="text-dark-300 text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Update Status</h3>
                  <div className="flex space-x-3">
                    {['pending', 'approved', 'rejected', 'expired'].map((status) => (
                      <motion.button
                        key={status}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updatePermitStatus(selectedPermit.id, status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          selectedPermit.status === status
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

export default PermitForm