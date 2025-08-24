import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  Eye,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  BarChart3,
  Target,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import useStore from '../store/useStore';
import { assessRiskLevel, generatePredictiveAlert } from '../utils/aiHelpers';

const RiskIndicator = ({ level, value, trend }) => {
  const getColor = (level) => {
    switch (level) {
      case 'low': return 'green';
      case 'medium': return 'yellow';
      case 'high': return 'red';
      default: return 'gray';
    }
  };

  const color = getColor(level);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-r from-${color}-50 to-${color}-100 border border-${color}-200 rounded-xl p-4`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg bg-${color}-500 bg-opacity-20`}>
          <AlertTriangle className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-red-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-green-500" />
          )}
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-gray-600 mb-1">Risk Level</h3>
      <div className="flex items-center space-x-2">
        <span className={`text-2xl font-bold text-${color}-700 capitalize`}>{level}</span>
        <span className="text-sm text-gray-500">({value}%)</span>
      </div>
      
      <div className={`mt-3 h-2 bg-${color}-200 rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-${color}-500`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const PredictiveAlert = ({ alert, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className={`bg-gradient-to-r ${
      alert.type === 'high-risk' 
        ? 'from-red-50 to-pink-50 border-red-200' 
        : alert.type === 'warning'
        ? 'from-yellow-50 to-orange-50 border-yellow-200'
        : 'from-blue-50 to-indigo-50 border-blue-200'
    } border rounded-xl p-4 relative`}
  >
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg ${
        alert.type === 'high-risk' 
          ? 'bg-red-500' 
          : alert.type === 'warning'
          ? 'bg-yellow-500'
          : 'bg-blue-500'
      }`}>
        <AlertTriangle className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <h4 className={`font-medium ${
          alert.type === 'high-risk' 
            ? 'text-red-800' 
            : alert.type === 'warning'
            ? 'text-yellow-800'
            : 'text-blue-800'
        }`}>
          {alert.message}
        </h4>
        <p className={`text-sm ${
          alert.type === 'high-risk' 
            ? 'text-red-600' 
            : alert.type === 'warning'
            ? 'text-yellow-600'
            : 'text-blue-600'
        }`}>
          Priority: {alert.priority}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors duration-200"
      >
        <XCircle className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  </motion.div>
);

const RiskAssessmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    activity: '',
    conditions: '',
    duration: '',
    workers: 1,
    equipment: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const riskLevel = assessRiskLevel(formData.activity, formData.conditions);
    onSubmit({ ...formData, riskLevel });
  };

  const equipmentOptions = [
    'PPE Required', 'Safety Harness', 'Confined Space Equipment', 
    'Hot Work Equipment', 'Electrical Safety Gear'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <Target className="w-5 h-5 text-blue-600" />
        <span>Risk Assessment</span>
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Type
          </label>
          <input
            type="text"
            value={formData.activity}
            onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
            placeholder="e.g., Working at height, confined space entry..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Working Conditions
          </label>
          <input
            type="text"
            value={formData.conditions}
            onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
            placeholder="e.g., Weather, lighting, time pressure..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              min="0.5"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workers Involved
            </label>
            <input
              type="number"
              value={formData.workers}
              onChange={(e) => setFormData({ ...formData, workers: parseInt(e.target.value) })}
              min="1"
              max="20"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Safety Equipment Required
          </label>
          <div className="grid grid-cols-2 gap-2">
            {equipmentOptions.map((equipment) => (
              <label key={equipment} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.equipment.includes(equipment)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, equipment: [...formData.equipment, equipment] });
                    } else {
                      setFormData({ ...formData, equipment: formData.equipment.filter(eq => eq !== equipment) });
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{equipment}</span>
              </label>
            ))}
          </div>
        </div>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
        >
          Assess Risk
        </motion.button>
      </form>
    </motion.div>
  );
};

function RiskAnalysis() {
  const { metrics, predictions, addAlert } = useStore();
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [predictiveAlerts, setPredictiveAlerts] = useState([]);

  // Generate predictive alerts based on metrics
  useMemo(() => {
    const alerts = generatePredictiveAlert(metrics, predictions.riskTrends);
    setPredictiveAlerts(alerts);
    
    // Add new alerts to global store
    alerts.forEach(alert => {
      addAlert(alert);
    });
  }, [metrics, predictions.riskTrends, addAlert]);

  const handleRiskAssessment = (data) => {
    setAssessmentResult(data);
  };

  const dismissAlert = (alertId) => {
    setPredictiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  // Risk radar chart data
  const riskRadarData = useMemo(() => [
    { subject: 'Equipment', A: 85, B: 70, fullMark: 100 },
    { subject: 'Environment', A: 65, B: 80, fullMark: 100 },
    { subject: 'Procedures', A: 90, B: 75, fullMark: 100 },
    { subject: 'Training', A: 75, B: 85, fullMark: 100 },
    { subject: 'Communication', A: 80, B: 70, fullMark: 100 },
    { subject: 'Supervision', A: 70, B: 90, fullMark: 100 },
  ], []);

  // Risk trend data
  const riskTrendData = useMemo(() => [
    { week: 'W1', Current: 72, Target: 65, Previous: 75 },
    { week: 'W2', Current: 70, Target: 65, Previous: 72 },
    { week: 'W3', Current: 68, Target: 65, Previous: 70 },
    { week: 'W4', Current: 72, Target: 65, Previous: 68 },
  ], []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Risk Analysis & AI Predictions</h2>
          <p className="text-gray-600">Advanced risk assessment and predictive safety analytics</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1 rounded-full">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </motion.div>

      {/* Risk Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskIndicator level="low" value={25} trend="down" />
        <RiskIndicator level="medium" value={45} trend="up" />
        <RiskIndicator level="high" value={30} trend="up" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Risk Trend Analysis</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="Current" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Target" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Previous" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span>Risk Factor Analysis</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={riskRadarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" stroke="#6B7280" />
              <PolarRadiusAxis stroke="#6B7280" />
              <Radar
                name="Current Week"
                dataKey="A"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Radar
                name="Previous Week"
                dataKey="B"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.3}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Predictions & Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">AI Predictive Alerts</h3>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence>
            {predictiveAlerts.map((alert) => (
              <PredictiveAlert
                key={alert.id || Math.random()}
                alert={alert}
                onDismiss={() => dismissAlert(alert.id)}
              />
            ))}
          </AnimatePresence>
          
          {predictiveAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <p>No active alerts. All systems operating normally.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Risk Assessment Form */}
      <RiskAssessmentForm onSubmit={handleRiskAssessment} />

      {/* Assessment Result */}
      {assessmentResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>Assessment Result</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Activity Details</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Activity:</strong> {assessmentResult.activity}</p>
                <p><strong>Conditions:</strong> {assessmentResult.conditions}</p>
                <p><strong>Duration:</strong> {assessmentResult.duration} hours</p>
                <p><strong>Workers:</strong> {assessmentResult.workers}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Risk Assessment</h4>
              <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg ${
                assessmentResult.riskLevel === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : assessmentResult.riskLevel === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium capitalize">{assessmentResult.riskLevel} Risk</span>
              </div>
              
              <div className="mt-3">
                <h5 className="font-medium text-gray-700 mb-2">Required Safety Measures:</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  {assessmentResult.equipment.map((eq, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default RiskAnalysis;