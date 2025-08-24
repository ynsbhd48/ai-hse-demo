import { create } from 'zustand'

let simulationIntervalId = null

const randomBetween = (min, max) => Math.round(min + Math.random() * (max - min))
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const useHSEStore = create((set, get) => ({
  metrics: {
    trir: 0.9,
    nearMisses: 3,
    openPermits: 5,
    riskScore: 22,
    history: [],
  },
  alerts: [],
  predictedRisks: [],
  chat: {
    messages: [],
    unreadCount: 0,
  },
  // Actions
  setMetrics: (partial) => set((state) => ({
    metrics: { ...state.metrics, ...partial }
  })),
  pushAlert: (alert) => set((state) => ({
    alerts: [
      { id: crypto.randomUUID(), timestamp: Date.now(), ...alert },
      ...state.alerts,
    ].slice(0, 20)
  })),
  removeAlert: (id) => set((state) => ({ alerts: state.alerts.filter(a => a.id !== id) })),
  clearAlerts: () => set({ alerts: [] }),

  computePredictions: () => {
    const { trir, nearMisses, openPermits, riskScore } = get().metrics
    const predictions = []
    if (riskScore > 70 || nearMisses > 7) {
      predictions.push({
        id: 'p-high-'+Date.now(),
        level: 'high',
        area: 'Plant West - Confined Space',
        description: 'Elevated near misses and risk spike suggest increased incident likelihood in confined spaces.',
        suggestion: 'Increase supervision, mandate gas tests, and enforce PPE checks every 30 minutes.'
      })
    }
    if (openPermits > 10) {
      predictions.push({
        id: 'p-medium-'+Date.now(),
        level: 'medium',
        area: 'Utilities - Hot Work',
        description: 'Volume of open permits may dilute oversight.',
        suggestion: 'Throttle new permits, prioritize riskier tasks, and schedule staggered starts.'
      })
    }
    if (trir > 1.2) {
      predictions.push({
        id: 'p-critical-'+Date.now(),
        level: 'critical',
        area: 'Loading Bay',
        description: 'TRIR trending above threshold; potential systemic control degradation.',
        suggestion: 'Trigger stand-down talk, refresh toolbox topics, and perform spot audits.'
      })
    }
    set({ predictedRisks: predictions })
    return predictions
  },

  pushMessage: (msg) => set((state) => ({
    chat: {
      ...state.chat,
      messages: [...state.chat.messages, { id: crypto.randomUUID(), timestamp: Date.now(), read: false, ...msg }],
      unreadCount: msg.sender === 'ai' ? state.chat.unreadCount + 1 : state.chat.unreadCount,
    }
  })),
  markAllRead: () => set((state) => ({
    chat: {
      ...state.chat,
      messages: state.chat.messages.map(m => ({ ...m, read: true })),
      unreadCount: 0,
    }
  })),

  startSimulation: () => {
    if (simulationIntervalId) return
    // Seed some history
    set((state) => ({
      metrics: {
        ...state.metrics,
        history: Array.from({ length: 20 }).map((_, i) => {
          const baseRisk = 20 + i
          return {
            timestamp: Date.now() - (20 - i) * 60000,
            trir: 0.8 + Math.sin(i / 3) * 0.2,
            nearMisses: randomBetween(1, 6),
            openPermits: randomBetween(3, 9),
            riskScore: clamp(baseRisk + randomBetween(-5, 5), 0, 100),
          }
        })
      }
    }))

    simulationIntervalId = setInterval(() => {
      const { metrics } = get()
      const next = {
        trir: clamp(Number((metrics.trir + (Math.random() - 0.5) * 0.1).toFixed(2)), 0.2, 2.0),
        nearMisses: clamp(metrics.nearMisses + randomBetween(-1, 2), 0, 20),
        openPermits: clamp(metrics.openPermits + randomBetween(-1, 2), 0, 50),
        riskScore: clamp(metrics.riskScore + randomBetween(-3, 5), 0, 100),
      }
      const newPoint = {
        timestamp: Date.now(),
        ...next,
      }
      set((state) => ({
        metrics: {
          ...state.metrics,
          ...next,
          history: [...state.metrics.history.slice(-49), newPoint],
        }
      }))

      // Simple probabilistic alerts
      if (next.riskScore > 75 && Math.random() > 0.6) {
        get().pushAlert({
          type: 'danger',
          title: 'High Risk Spike',
          message: 'Risk score exceeded 75. Extra controls recommended.'
        })
      } else if (next.nearMisses > 8 && Math.random() > 0.6) {
        get().pushAlert({ type: 'warning', title: 'Near Miss Cluster', message: 'Near misses trending high.' })
      }

      // Update predictions
      const predictions = get().computePredictions()

      // Occasionally push AI suggestion into chat
      if (predictions.length && Math.random() > 0.75) {
        const top = predictions[0]
        get().pushMessage({
          sender: 'ai',
          text: `Predictive advisory: ${top.description} Suggestion: ${top.suggestion}`
        })
      }
    }, 3000)
  },

  stopSimulation: () => {
    if (simulationIntervalId) {
      clearInterval(simulationIntervalId)
      simulationIntervalId = null
    }
  }
}))

export const generateAIResponse = (text, state) => {
  const q = text.toLowerCase()
  const { metrics, predictedRisks } = state
  if (q.includes('trir')) {
    return `Current TRIR is ${metrics.trir}. Lower is better; focus on controls and permit discipline.`
  }
  if (q.includes('permit')) {
    return `There are ${metrics.openPermits} open permits. Ensure high-risk permits get focused supervision.`
  }
  if (q.includes('risk')) {
    return `Risk score is ${metrics.riskScore}. ${metrics.riskScore > 70 ? 'Elevated' : 'Normal'} based on trend.`
  }
  if (predictedRisks.length) {
    const p = predictedRisks[0]
    return `Predicted ${p.level} risk in ${p.area}. ${p.suggestion}`
  }
  return 'Stay vigilant: verify PPE, validate permits, and communicate near misses promptly.'
}

