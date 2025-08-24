import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Activity, BarChart3, Clock, MapPin, Zap, X } from 'lucide-react'

function RiskAnalysis() {
  const [riskData, setRiskData] = useState({
    overallRisk: 72,
    trend: 'increasing',
    lastUpdated: new Date(),
    zones: [],
    riskFactors: [],
    predictions: []
  })

  const [selectedZone, setSelectedZone] = useState(null)
  const [timeRange, setTimeRange] = useState('24h')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Simulate real-time risk data
    const interval = setInterval(() => {
      setRiskData(prev => ({
        ...prev,
        overallRisk: Math.max(30, Math.min(95, prev.overallRisk + (Math.random() - 0.5) * 3)),
        lastUpdated: new Date()
      }))
    }, 10000)

    // Initialize risk data
    setRiskData(prev => ({
      ...prev,
      zones: [
        { name: 'Zone A', riskLevel: 45, trend: 'decreasing', factors: ['Temperature', 'Equipment wear'], status: 'safe' },
        { name: 'Zone B', riskLevel: 78, trend: 'increasing', factors: ['Chemical exposure', 'Ventilation'], status: 'warning' },
        { name: 'Zone C', riskLevel: 32, trend: 'stable', factors: ['Low activity', 'Good maintenance'], status: 'safe' },
        { name: 'Zone D', riskLevel: 89, trend: 'increasing', factors: ['High voltage', 'Confined space'], status: 'danger' }
      ],
      riskFactors: [
        { name: 'Temperature Fluctuations', impact: 'high', probability: 0.7, zone: 'Zone A' },
        { name: 'Chemical Spills', impact: 'critical', probability: 0.3, zone: 'Zone B' },
        { name: 'Equipment Failure', impact: 'medium', probability: 0.5, zone: 'Zone A' },
        { name: 'Human Error', impact: 'high', probability: 0.6, zone: 'All Zones' },
        { name: 'Environmental Hazards', impact: 'medium', probability: 0.4, zone: 'Zone C' }
      ],
      predictions: [
        { factor: 'Temperature', prediction: 'Expected to increase by 15% in next 2 hours', confidence: 85, action: 'Monitor HVAC systems' },
        { factor: 'Chemical Levels', prediction: 'May exceed safe limits in Zone B', confidence: 72, action: 'Increase ventilation' },
        { factor: 'Equipment Stress', prediction: 'Production line 3 showing signs of wear', confidence: 68, action: 'Schedule maintenance' }
      ]
    }))

    return () => clearInterval(interval)
  }, [])

  const getRiskColor = (level) => {
    if (level >= 80) return 'text-danger-400 bg-danger-500/20 border-danger-500/30'
    if (level >= 60) return 'text-warning-400 bg-warning-500/20 border-warning-500/30'
    if (level >= 40) return 'text-primary-400 bg-primary-500/20 border-primary-500/30'
    return 'text-success-400 bg-success-500/20 border-success-500/30'
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'text-danger-400'
      case 'high': return 'text-warning-400'
      case 'medium': return 'text-primary-400'
      case 'low': return 'text-success-400'
      default: return 'text-dark-400'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-danger-400" />
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-success-400" />
      case 'stable': return <Activity className="w-4 h-4 text-primary-400" />
      default: return <Activity className="w-4 h-4 text-dark-400" />
    }
  }

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Generate new predictions
    const newPredictions = [
      { factor: 'AI Analysis', prediction: 'New risk patterns detected in Zone B', confidence: 91, action: 'Immediate inspection required' },
      { factor: 'Historical Data', prediction: 'Similar conditions led to incidents in past', confidence: 78, action: 'Implement preventive measures' },
      { factor: 'Environmental Scan', prediction: 'Weather conditions may affect outdoor operations', confidence: 65, action: 'Review outdoor work schedules' }
    ]
    
    setRiskData(prev => ({
      ...prev,
      predictions: [...newPredictions, ...prev.predictions.slice(0, 2)]
    }))
    
    setIsAnalyzing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Risk Analysis</h2>
          <p className="text-dark-300">Real-time risk assessment and predictive analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500/50"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Run AI Analysis</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Overall Risk Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Overall Risk Assessment</h3>
            <p className="text-dark-300 text-sm">Last updated: {riskData.lastUpdated.toLocaleTimeString()}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              {getTrendIcon(riskData.trend)}
              <span className={`text-sm ${
                riskData.trend === 'increasing' ? 'text-danger-400' :
                riskData.trend === 'decreasing' ? 'text-success-400' : 'text-primary-400'
              }`}>
                {riskData.trend.charAt(0).toUpperCase() + riskData.trend.slice(1)}
              </span>
            </div>
            <p className="text-xs text-dark-400">Risk Trend</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Risk Score */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-8 border-dark-600 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    riskData.overallRisk >= 80 ? 'text-danger-400' :
                    riskData.overallRisk >= 60 ? 'text-warning-400' :
                    riskData.overallRisk >= 40 ? 'text-primary-400' : 'text-success-400'
                  }`}>
                    {riskData.overallRisk}%
                  </div>
                  <div className="text-sm text-dark-400">Risk Level</div>
                </div>
              </div>
              <div 
                className="absolute inset-0 w-32 h-32 rounded-full border-8 border-transparent"
                style={{
                  background: `conic-gradient(${
                    riskData.overallRisk >= 80 ? '#ef4444' :
                    riskData.overallRisk >= 60 ? '#f59e0b' :
                    riskData.overallRisk >= 40 ? '#3b82f6' : '#22c55e'
                  } 0deg, transparent ${riskData.overallRisk * 3.6}deg, transparent 360deg)`
                }}
              ></div>
            </div>
          </div>

          {/* Risk Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-medium mb-3">Risk Categories</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-300">Safety</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-dark-600 rounded-full h-2">
                    <div className="bg-danger-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm text-danger-400">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-300">Environmental</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-dark-600 rounded-full h-2">
                    <div className="bg-warning-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-warning-400">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-300">Operational</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-dark-600 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm text-primary-400">45%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="text-white font-medium mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-danger-600/20 hover:bg-danger-600/30 border border-danger-500/30 rounded-lg text-danger-400 text-sm transition-all duration-200"
              >
                Emergency Response
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-warning-600/20 hover:bg-warning-600/30 border border-warning-500/30 rounded-lg text-warning-400 text-sm transition-all duration-200"
              >
                Safety Inspection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-primary-600/20 hover:bg-primary-600/30 border border-primary-500/30 rounded-lg text-primary-400 text-sm transition-all duration-200"
              >
                Risk Report
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Zone Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary-400" />
            <span>Zone Risk Analysis</span>
          </h3>
          <div className="space-y-3">
            {riskData.zones.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-dark-700/30 rounded-lg border border-dark-600/20 cursor-pointer hover:bg-dark-700/50 transition-all duration-200"
                onClick={() => setSelectedZone(zone)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{zone.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(zone.riskLevel)}`}>
                    {zone.riskLevel}% Risk
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  {getTrendIcon(zone.trend)}
                  <span className="text-sm text-dark-400">
                    {zone.trend.charAt(0).toUpperCase() + zone.trend.slice(1)} trend
                  </span>
                </div>
                <div className="space-y-1">
                  {zone.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-dark-300">
                      <AlertTriangle className="w-3 h-3 text-warning-400" />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Factors */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning-400" />
            <span>Risk Factors</span>
          </h3>
          <div className="space-y-3">
            {riskData.riskFactors.map((factor, index) => (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-dark-700/30 rounded-lg border border-dark-600/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{factor.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(factor.impact)}`}>
                    {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Probability: {Math.round(factor.probability * 100)}%</span>
                  <span className="text-dark-400">{factor.zone}</span>
                </div>
                <div className="w-full bg-dark-600 rounded-full h-2 mt-2">
                  <div 
                    className="bg-warning-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${factor.probability * 100}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary-400" />
          <span>AI Risk Predictions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskData.predictions.map((prediction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-dark-700/30 rounded-lg border border-dark-600/20"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium text-sm">{prediction.factor}</h4>
                <span className="text-xs text-primary-400">{prediction.confidence}% confidence</span>
              </div>
              <p className="text-dark-300 text-sm mb-3">{prediction.prediction}</p>
              <div className="bg-primary-500/20 border border-primary-500/30 rounded-lg p-2">
                <p className="text-primary-400 text-xs font-medium">Recommended Action:</p>
                <p className="text-primary-300 text-xs">{prediction.action}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Zone Detail Modal */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedZone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 border border-dark-600/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedZone.name} Risk Analysis</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedZone(null)}
                  className="text-dark-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Risk Level</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(selectedZone.riskLevel)}`}>
                      {selectedZone.riskLevel}% Risk
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-dark-400 mb-1">Trend</p>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(selectedZone.trend)}
                      <span className="text-white capitalize">{selectedZone.trend}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Risk Factors</h3>
                  <div className="space-y-2">
                    {selectedZone.factors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-warning-400" />
                        <span className="text-dark-300">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Recommended Actions</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 p-3 bg-success-500/20 rounded-lg border border-success-500/30">
                      <Shield className="w-5 h-5 text-success-400 mt-0.5 flex-shrink-0" />
                      <span className="text-success-300 text-sm">Implement additional safety measures</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-warning-500/20 rounded-lg border border-warning-500/30">
                      <Clock className="w-5 h-5 text-warning-400 mt-0.5 flex-shrink-0" />
                      <span className="text-warning-300 text-sm">Schedule immediate inspection</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-primary-500/20 rounded-lg border border-primary-500/30">
                      <Activity className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-primary-300 text-sm">Monitor conditions continuously</span>
                    </div>
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

export default RiskAnalysis