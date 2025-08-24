import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Clock,
  Activity,
  Zap,
  Eye
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useStore from '../store/useStore';

const MetricCard = ({ title, value, change, icon: Icon, color, trend }) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500 bg-opacity-20`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      
      <motion.div
        className={`mt-3 h-1 bg-${color}-200 rounded-full overflow-hidden`}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className={`h-full bg-${color}-500`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.abs(change) * 10)}%` }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ChartCard = ({ title, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${className}`}
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </motion.div>
);

const RealTimeBadge = () => (
  <motion.div
    animate={{ 
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium"
  >
    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
    <span>LIVE</span>
  </motion.div>
);

function Dashboard() {
  const { metrics, predictions, simulateRealTimeUpdates } = useStore();
  
  // Simulate real-time updates
  useEffect(() => {
    const cleanup = simulateRealTimeUpdates();
    return cleanup;
  }, [simulateRealTimeUpdates]);

  // Chart data
  const trendData = useMemo(() => [
    { month: 'Jan', TRIR: 0.9, Risk: 65, Incidents: 8 },
    { month: 'Feb', TRIR: 0.8, Risk: 68, Incidents: 6 },
    { month: 'Mar', TRIR: 0.7, Risk: 70, Incidents: 7 },
    { month: 'Apr', TRIR: 0.6, Risk: 72, Incidents: 9 },
    { month: 'May', TRIR: 0.85, Risk: 72, Incidents: 12 },
  ], []);

  const riskDistribution = useMemo(() => [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 20, color: '#EF4444' },
  ], []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with Real-time Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Safety Dashboard</h2>
          <p className="text-gray-600">Real-time monitoring and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <RealTimeBadge />
          <div className="text-sm text-gray-500">
            Last updated: {formatTime(metrics.lastUpdated)}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="TRIR"
          value={metrics.trir}
          change={-5.2}
          icon={TrendingDown}
          color="blue"
          trend="down"
        />
        <MetricCard
          title="Near Misses"
          value={metrics.nearMisses}
          change={8.3}
          icon={AlertTriangle}
          color="orange"
          trend="up"
        />
        <MetricCard
          title="Open Permits"
          value={metrics.openPermits}
          change={-12.5}
          icon={Shield}
          color="green"
          trend="down"
        />
        <MetricCard
          title="Risk Score"
          value={metrics.riskScore}
          change={2.1}
          icon={Activity}
          color="red"
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TRIR Trend Chart */}
        <ChartCard title="TRIR Trend Analysis">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="TRIR" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Risk Distribution */}
        <ChartCard title="Risk Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* AI Predictions & Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-500 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">AI Safety Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Risk Trends</h4>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">
                {predictions.riskTrends === 'increasing' ? 'Increasing' : 'Decreasing'} risk levels
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Next incident probability: {(predictions.nextIncidentProbability * 100).toFixed(1)}%
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
            <ul className="space-y-1">
              {predictions.recommendations.slice(0, 2).map((rec, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <Eye className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'New Permit', icon: Shield, color: 'blue' },
            { label: 'Report Incident', icon: AlertTriangle, color: 'red' },
            { label: 'Safety Check', icon: Eye, color: 'green' },
            { label: 'Training', icon: Clock, color: 'purple' }
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg border-2 border-${action.color}-200 hover:border-${action.color}-400 transition-colors duration-200`}
            >
              <action.icon className={`w-6 h-6 text-${action.color}-600 mx-auto mb-2`} />
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;