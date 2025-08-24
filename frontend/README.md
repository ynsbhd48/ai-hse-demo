# AI HSE Dashboard (Futuristic HSE Management UI)
A modern React + Tailwind CSS app for AI-driven Health, Safety, and Environment management.

## What’s new

- Futuristic, responsive dashboard layout with animated Live badge
- Metric cards: TRIR, Near Misses, Open Permits, Risk Score
- Trend charts (Recharts) for risk, TRIR, near misses
- Global state using Zustand with real-time simulation
- Predictive risk logic with actionable suggestions
- Floating color-coded toasts for alerts
- AI Chat assistant with heuristic replies and unread badges
- Dark theme support and smooth animations

## Architecture

- `src/store/useHSEStore.js`: global metrics, alerts, predictions, chat; simulation loop
- `src/components/Dashboard.jsx`: metric grid and charts
- `src/components/TrendChart.jsx`: memoized Recharts wrapper
- `src/components/MetricCard.jsx`: reusable metric tile
- `src/components/ToastHub.jsx`: animated alert toasts
- `src/components/RiskAnalysis.jsx`: predicted risks and actions
- `src/components/AIChat.jsx`: chat UI integrated with store
- `src/components/Navbar.jsx`: sticky navbar with unread badge

## Design rationale

- Emphasis on clarity of critical indicators with neon accent colors
- Subtle glassmorphism (backdrop blur) and dark theme for control rooms
- Lightweight heuristics for predictions to demonstrate AI UX patterns
- Memoized components and derived data to minimize re-renders

## Scripts

```
npm run dev
npm run build
npm run preview
```

