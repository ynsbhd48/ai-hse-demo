import { create } from 'zustand'
import { nanoid } from 'nanoid/non-secure'

const generateInitialMetrics = () => ({
  totalIncidentsYtd: 3,
  trir: 0.82,
  nearMissesToday: 2,
  openPermits: 7,
  compliance: 92,
  riskScore: 38,
})

const randomBetween = (min, max) => Math.random() * (max - min) + min
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

const randomAlert = () => {
  const types = [
    { type: 'warning', riskLevel: 'medium', title: 'PPE Non-Compliance', message: '2 workers missing eye protection in Zone C' },
    { type: 'error', riskLevel: 'high', title: 'Gas Sensor Spike', message: 'H2S levels elevated in Tank Farm B' },
    { type: 'info', riskLevel: 'low', title: 'Toolbox Talk Completed', message: 'Morning briefing done for Crew A' },
    { type: 'success', riskLevel: 'low', title: 'Permit Closed', message: 'Hot work permit #HW-102 closed successfully' },
  ]
  const base = types[Math.floor(Math.random() * types.length)]
  return {
    id: nanoid(),
    ...base,
    timestamp: Date.now(),
  }
}

const heuristicReply = (prompt) => {
  const lower = prompt.toLowerCase()
  if (lower.includes('risk') || lower.includes('danger')) {
    return 'Current site-wide risk score is 38 (low). Focus on gas monitoring in Tank Farm B.'
  }
  if (lower.includes('permit')) {
    return 'There are 7 open permits. Ensure hot work permits include gas checks every 2 hours.'
  }
  if (lower.includes('ppe')) {
    return '2 PPE issues flagged today. Recommend spot-check in Zone C with a quick refresher.'
  }
  if (lower.includes('compliance')) {
    return 'Compliance is trending at 92%. Consider micro-training on lockout/tagout for a quick uplift.'
  }
  return 'I recommend reviewing today’s near-miss patterns and scheduling a 10-min safety stand-down.'
}

const useAppStore = create((set, get) => ({
  // UI state
  theme: 'dark',
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  // Alerts
  alerts: [],
  unreadAlerts: 0,
  addAlert: (alert) => set((s) => ({ alerts: [alert, ...s.alerts].slice(0, 50), unreadAlerts: s.unreadAlerts + 1 })),
  markAlertsRead: () => set({ unreadAlerts: 0 }),

  // Metrics & suggestions
  metrics: generateInitialMetrics(),
  suggestions: [
    { id: nanoid(), text: 'Schedule mid-shift gas calibration check for Tank Farm sensors', category: 'safety' },
    { id: nanoid(), text: 'Auto-remind crews to attach PPE photos in permit flow', category: 'compliance' },
  ],
  updateMetrics: () => set((s) => {
    const m = s.metrics
    const drift = {
      trir: clamp(m.trir + randomBetween(-0.05, 0.05), 0.4, 1.2),
      nearMissesToday: Math.max(0, Math.round(m.nearMissesToday + randomBetween(-1, 2))),
      openPermits: Math.max(0, Math.round(m.openPermits + randomBetween(-1, 2))),
      compliance: clamp(Math.round(m.compliance + randomBetween(-2, 2)), 84, 98),
      riskScore: clamp(Math.round(m.riskScore + randomBetween(-4, 4)), 12, 72),
    }
    return { metrics: { ...m, ...drift } }
  }),

  // Chat
  chat: [],
  sendPrompt: (text) => {
    const userMsg = { id: nanoid(), role: 'user', content: text, timestamp: Date.now() }
    const reply = { id: nanoid(), role: 'assistant', content: heuristicReply(text), timestamp: Date.now() + 200 }
    set((s) => ({ chat: [...s.chat, userMsg] }))
    // Simulate slight delay
    setTimeout(() => set((s) => ({ chat: [...s.chat, reply] })), 250)
  },

  // Simulators
  _simRunning: false,
  _intervals: [],
  startSimulators: () => {
    if (get()._simRunning) return
    const id1 = setInterval(() => get().updateMetrics(), 3000)
    const id2 = setInterval(() => get().addAlert(randomAlert()), 15000 + Math.random() * 10000)
    set({ _simRunning: true, _intervals: [id1, id2] })
  },
  stopSimulators: () => {
    const ints = get()._intervals
    ints.forEach(clearInterval)
    set({ _simRunning: false, _intervals: [] })
  }
}))

export default useAppStore
