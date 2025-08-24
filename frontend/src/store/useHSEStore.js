import { create } from 'zustand'

// Simple unique id generator for events/messages
const generateId = (prefix = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

// Helper to clamp values within a safe range
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

// Derive an overall risk score from metrics using a heuristic
const computeRiskScore = ({ trir, nearMisses, openPermits }) => {
  const normalizedTrir = clamp(trir, 0, 10) / 10
  const normalizedNearMisses = clamp(nearMisses, 0, 50) / 50
  const normalizedOpenPermits = clamp(openPermits, 0, 100) / 100
  const score = (normalizedTrir * 0.45 + normalizedNearMisses * 0.35 + normalizedOpenPermits * 0.2) * 100
  return Math.round(score)
}

// Basic heuristic predictions based on recent state
const generatePredictions = (state) => {
  const predictions = []
  const { metrics } = state
  const { trir, nearMisses, openPermits, riskScore } = metrics

  if (riskScore >= 75) {
    predictions.push({
      id: generateId('pred'),
      riskType: 'High Overall Risk',
      probability: clamp(0.6 + (riskScore - 75) / 100, 0.6, 0.95),
      severity: 'high',
      message: 'Elevated site-wide risk detected driven by incident and permit load.',
      suggestions: [
        'Conduct immediate toolbox talks across active zones',
        'Increase supervision frequency for high-risk tasks',
        'Pause non-critical permits for 30 minutes',
      ],
      timestamp: Date.now()
    })
  }

  if (nearMisses >= 5) {
    predictions.push({
      id: generateId('pred'),
      riskType: 'Near-Miss Cluster',
      probability: clamp(0.5 + (nearMisses - 5) * 0.05, 0.5, 0.9),
      severity: 'medium',
      message: 'Near-miss frequency suggests potential procedural drift.',
      suggestions: [
        'Perform quick dynamic risk assessments before task restarts',
        'Reinforce PPE checks at access points',
      ],
      timestamp: Date.now()
    })
  }

  if (openPermits >= 20) {
    predictions.push({
      id: generateId('pred'),
      riskType: 'Permit Load Risk',
      probability: clamp(0.4 + (openPermits - 20) * 0.02, 0.4, 0.85),
      severity: 'medium',
      message: 'High number of concurrent permits increases coordination risk.',
      suggestions: [
        'Stagger start times for new permits',
        'Assign a permit coordinator for congested zones',
      ],
      timestamp: Date.now()
    })
  }

  if (trir >= 1.5) {
    predictions.push({
      id: generateId('pred'),
      riskType: 'Incident Rate Trend',
      probability: clamp(0.35 + trir / 10, 0.35, 0.8),
      severity: 'medium',
      message: 'TRIR trend indicates rising incident probability.',
      suggestions: [
        'Re-check isolate/lockout procedures',
        'Increase near-miss reporting incentives for 24 hours',
      ],
      timestamp: Date.now()
    })
  }

  return predictions
}

// Heuristic AI responses based on prompt and current state
const generateAIResponse = (prompt, state) => {
  const { metrics, predictions } = state
  const { trir, nearMisses, openPermits, riskScore } = metrics

  const lower = prompt.toLowerCase()
  if (lower.includes('trir')) {
    return `Current TRIR is ${trir.toFixed(2)}. Keep TRIR under 1.0 by reinforcing daily briefings, verifying permits to work, and escalating housekeeping checks.`
  }
  if (lower.includes('permit')) {
    return `There are ${openPermits} open permits. Consider staggering start times and assigning a permit coordinator during peak hours.`
  }
  if (lower.includes('near') || lower.includes('miss')) {
    return `Near misses recorded in the last interval: ${nearMisses}. Encourage immediate reporting and perform quick dynamic risk assessments before task restarts.`
  }
  if (lower.includes('risk') || lower.includes('danger')) {
    return `Overall risk score is ${riskScore}/100. ${predictions.length ? 'Top predicted risk: ' + predictions[0].riskType + '.' : 'No major predicted risks.'} Focus on supervision frequency and permit load balancing.`
  }
  if (lower.includes('ppe')) {
    return 'Ensure hard hats, eye protection, and gloves are worn at all times. Random PPE spot-checks reduce incidents by up to 20%.'
  }
  return 'Stay vigilant. Maintain clear communication, perform dynamic risk assessments, and escalate any anomalies. Ask me about TRIR, permits, near misses, or risk to get tailored guidance.'
}

export const useHSEStore = create((set, get) => ({
  metrics: {
    trir: 0.98,
    nearMisses: 0,
    openPermits: 8,
    riskScore: 30,
    history: {
      trir: [],
      nearMisses: [],
      openPermits: [],
      riskScore: [],
    }
  },
  alerts: [],
  predictions: [],
  chat: {
    messages: [
      { id: generateId('msg'), role: 'assistant', text: 'Welcome to the AI HSE Assistant. Ask about TRIR, permits, near misses, or risk.', timestamp: Date.now(), read: false }
    ],
    unreadCount: 1,
    isOpen: true
  },
  ui: {
    realtime: true,
    lastAlertId: null
  },

  // Simulation controls
  startSimulation: () => {
    const existing = get()._simHandle
    if (existing) return existing

    const interval = setInterval(() => {
      const state = get()
      const { metrics } = state

      // Random deltas to simulate activity
      const trirDelta = (Math.random() - 0.5) * 0.05
      const nearMissDelta = Math.random() < 0.3 ? Math.floor(Math.random() * 2) : 0
      const permitDelta = Math.random() < 0.5 ? (Math.random() < 0.5 ? 1 : -1) : 0

      const nextTrir = clamp(metrics.trir + trirDelta, 0.5, 2.5)
      const nextNearMisses = clamp(metrics.nearMisses + nearMissDelta, 0, 50)
      const nextOpenPermits = clamp(metrics.openPermits + permitDelta, 0, 50)

      const nextRiskScore = computeRiskScore({ trir: nextTrir, nearMisses: nextNearMisses, openPermits: nextOpenPermits })

      // Potential alert
      const newAlerts = []
      if (nextRiskScore >= 80 && Math.random() < 0.7) {
        newAlerts.push({ id: generateId('alt'), type: 'risk', severity: 'high', message: 'High overall risk detected. Increase supervision and pause non-critical work.', timestamp: Date.now() })
      }
      if (nearMissDelta > 0 && Math.random() < 0.8) {
        newAlerts.push({ id: generateId('alt'), type: 'near-miss', severity: 'medium', message: `${nearMissDelta} near miss${nearMissDelta > 1 ? 'es' : ''} reported. Perform quick DRAs.`, timestamp: Date.now() })
      }
      if (permitDelta > 0 && Math.random() < 0.5) {
        newAlerts.push({ id: generateId('alt'), type: 'permit', severity: 'low', message: 'New permit opened. Verify lock-out/tag-out where applicable.', timestamp: Date.now() })
      }

      const time = Date.now()

      set((prev) => {
        const updatedPredictions = generatePredictions({ metrics: { trir: nextTrir, nearMisses: nextNearMisses, openPermits: nextOpenPermits, riskScore: nextRiskScore } })
        const limitHistory = (arr) => arr.slice(-19) // keep last 19, will push 1 new -> 20
        return {
          metrics: {
            trir: nextTrir,
            nearMisses: nextNearMisses,
            openPermits: nextOpenPermits,
            riskScore: nextRiskScore,
            history: {
              trir: [...limitHistory(prev.metrics.history.trir), { time, value: nextTrir }],
              nearMisses: [...limitHistory(prev.metrics.history.nearMisses), { time, value: nextNearMisses }],
              openPermits: [...limitHistory(prev.metrics.history.openPermits), { time, value: nextOpenPermits }],
              riskScore: [...limitHistory(prev.metrics.history.riskScore), { time, value: nextRiskScore }],
            }
          },
          alerts: newAlerts.length ? [...prev.alerts, ...newAlerts] : prev.alerts,
          predictions: updatedPredictions,
          _simHandle: interval
        }
      })
    }, 3000)

    return interval
  },
  stopSimulation: () => {
    const handle = get()._simHandle
    if (handle) clearInterval(handle)
    set({ _simHandle: null })
  },

  // Chat operations
  addUserMessage: (text) => {
    const state = get()
    const userMessage = { id: generateId('msg'), role: 'user', text, timestamp: Date.now(), read: true }
    const aiText = generateAIResponse(text, state)
    const aiMessage = { id: generateId('msg'), role: 'assistant', text: aiText, timestamp: Date.now() + 200, read: false }

    set((prev) => ({
      chat: {
        ...prev.chat,
        messages: [...prev.chat.messages, userMessage, aiMessage],
        unreadCount: prev.chat.isOpen ? 0 : prev.chat.unreadCount + 1
      }
    }))
  },
  markChatOpen: (isOpen) => set((prev) => ({
    chat: {
      ...prev.chat,
      isOpen,
      unreadCount: isOpen ? 0 : prev.chat.unreadCount
    }
  })),
  markAllMessagesRead: () => set((prev) => ({
    chat: {
      ...prev.chat,
      messages: prev.chat.messages.map(m => ({ ...m, read: true })),
      unreadCount: 0
    }
  })),

  // Permit-related operations
  submitPermit: (permit) => {
    set((prev) => ({
      metrics: {
        ...prev.metrics,
        openPermits: prev.metrics.openPermits + 1
      },
      alerts: [...prev.alerts, { id: generateId('alt'), type: 'permit', severity: 'low', message: `Permit created for ${permit?.workType || 'work'}. Verify controls.`, timestamp: Date.now() }]
    }))
  },
}))

