import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        risk: {
          low: '#10b981',
          medium: '#f59e0b',
          high: '#ef4444'
        }
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 2s infinite'
      }
    },
  },
  plugins: [forms, typography, aspectRatio, daisyui],
  daisyui: {
    themes: [
      {
        hse: {
          primary: '#2563eb',
          secondary: '#22d3ee',
          accent: '#f97316',
          neutral: '#1f2937',
          'base-100': '#0b1020',
          info: '#38bdf8',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
        },
      },
      'light',
    ],
  },
}