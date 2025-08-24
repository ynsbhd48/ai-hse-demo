# AI HSE Dashboard

A cutting-edge React + Tailwind CSS + Zustand application for AI-driven Health, Safety, and Environment (HSE) management.

## Stack
- React 18 + Vite
- Tailwind CSS (with `@tailwindcss/postcss`)
- Zustand (global state)
- Recharts (visualizations)
- Framer Motion (animations)
- react-hot-toast (alerts)
- lucide-react (icons)

## Features
- Futuristic dashboard with live metrics: TRIR, Near Misses, Open Permits, Risk Score
- Animated Real-time badge and responsive grid
- Trend charts with Recharts
- Global Zustand store with simulated real-time updates
- Color-coded toasts for alerts and risk indicators
- Predictive heuristics generate risks and actionable suggestions
- Interactive AI Chat with heuristic responses, unread notifications
- Performance optimizations: memoized components, minimal re-renders, lightweight charts

## Development

Install dependencies and run dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Architecture & Rationale

- Dashboard (`src/components/Dashboard.jsx`)
  - Uses `MetricCard`, `RealtimeBadge`, and `TrendChart` for modular layout
  - `MetricCard` shows sparkline-style mini charts with Recharts
  - Trend chart combines TRIR, Near Misses, Open Permits, Risk Score

- State (`src/store/useHSEStore.js`)
  - Holds metrics, alerts, predictions, chat state
  - `startSimulation()` updates metrics every 3s, appends history, emits alerts
  - `computeRiskScore()` heuristic blends metrics into a 0–100 score
  - `generatePredictions()` returns prioritized risk suggestions
  - `generateAIResponse()` provides contextual AI chat replies

- Alerts (`src/components/alerts/AlertToaster.jsx`)
  - Listens for new alerts and shows color-coded toasts

- Chat (`src/components/AIChat.jsx`)
  - Zustand-powered chat with unread badges in `Navbar`
  - Framer Motion animations and dark, futuristic styling

- Performance
  - `React.memo` on heavy visual components
  - Derived/memoized data for charts
  - Responsive, accessible components

## Customization
- Tweak heuristics in `useHSEStore.js` to reflect your domain
- Adjust Tailwind theme via `tailwind.config.js`

## Notes
- This repo includes simulated data for demo purposes; integrate real backends by replacing the simulation with your data streams and actions.
