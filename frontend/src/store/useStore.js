import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Metrics state
  metrics: {
    trir: 0.85,
    nearMisses: 12,
    openPermits: 8,
    riskScore: 72,
    lastUpdated: new Date(),
  },

  // Alerts state
  alerts: [
    {
      id: 1,
      type: 'high-risk',
      message: 'High-risk activity detected in Zone A',
      timestamp: new Date(),
      isRead: false,
    },
    {
      id: 2,
      type: 'warning',
      message: 'Safety equipment inspection due in 2 days',
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
    },
  ],

  // Chat state
  chat: {
    messages: [
      {
        id: 1,
        type: 'ai',
        content: 'Hello! I\'m your AI safety assistant. How can I help you today?',
        timestamp: new Date(),
      },
    ],
    unreadCount: 0,
    isOpen: false,
  },

  // Predictive AI state
  predictions: {
    riskTrends: 'increasing',
    nextIncidentProbability: 0.23,
    recommendations: [
      'Schedule additional safety training for Zone B workers',
      'Review permit procedures for high-risk activities',
      'Conduct equipment maintenance check this week',
    ],
  },

  // Actions
  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics, lastUpdated: new Date() }
  })),

  addAlert: (alert) => set((state) => ({
    alerts: [{ ...alert, id: Date.now(), timestamp: new Date(), isRead: false }, ...state.alerts]
  })),

  markAlertAsRead: (alertId) => set((state) => ({
    alerts: state.alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    )
  })),

  addChatMessage: (message) => set((state) => ({
    chat: {
      ...state.chat,
      messages: [...state.chat.messages, { ...message, id: Date.now(), timestamp: new Date() }],
      unreadCount: message.type === 'ai' ? state.chat.unreadCount + 1 : state.chat.unreadCount
    }
  })),

  setChatOpen: (isOpen) => set((state) => ({
    chat: { ...state.chat, isOpen }
  })),

  markChatAsRead: () => set((state) => ({
    chat: { ...state.chat, unreadCount: 0 }
  })),

  updatePredictions: (newPredictions) => set((state) => ({
    predictions: { ...state.predictions, ...newPredictions }
  })),

  // Simulate real-time updates
  simulateRealTimeUpdates: () => {
    const interval = setInterval(() => {
      const state = get();
      const randomChange = (Math.random() - 0.5) * 0.1;
      
      // Update metrics with small random changes
      const newTrir = Math.max(0, Math.min(2, state.metrics.trir + randomChange));
      const newNearMisses = Math.max(0, state.metrics.nearMisses + Math.floor(randomChange * 10));
      const newRiskScore = Math.max(0, Math.min(100, state.metrics.riskScore + randomChange * 10));
      
      get().updateMetrics({
        trir: parseFloat(newTrir.toFixed(2)),
        nearMisses: newNearMisses,
        riskScore: Math.round(newRiskScore),
      });

      // Occasionally add new alerts
      if (Math.random() < 0.1) {
        const alertTypes = ['warning', 'info', 'high-risk'];
        const alertMessages = [
          'New safety protocol update available',
          'Equipment maintenance reminder',
          'Weather alert: High winds expected',
          'Training session scheduled for tomorrow',
        ];
        
        get().addAlert({
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
        });
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  },
}));

export default useStore;