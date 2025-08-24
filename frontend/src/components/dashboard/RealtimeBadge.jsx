import React from 'react'
import { motion } from 'framer-motion'
import { Radio } from 'lucide-react'

function RealtimeBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <Radio className="w-3 h-3" />
      <span>Real-time</span>
    </motion.div>
  )
}

export default RealtimeBadge

