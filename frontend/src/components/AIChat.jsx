import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useHSEStore } from '../store/useHSEStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'

function AIChat() {
  const { messages, unreadCount, isOpen } = useHSEStore(s => s.chat)
  const addUserMessage = useHSEStore(s => s.addUserMessage)
  const markChatOpen = useHSEStore(s => s.markChatOpen)
  const markAllMessagesRead = useHSEStore(s => s.markAllMessagesRead)

  const [draft, setDraft] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    markChatOpen(true)
    markAllMessagesRead()
  }, [markChatOpen, markAllMessagesRead])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const onSend = useCallback(() => {
    const text = draft.trim()
    if (!text) return
    addUserMessage(text)
    setDraft('')
  }, [draft, addUserMessage])

  const bubbles = useMemo(() => messages.slice(-50), [messages])

  return (
    <div className="bg-white dark:bg-slate-900 p-4 shadow rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">AI Chat Assistant</h2>
        {unreadCount > 0 && <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">{unreadCount} new</span>}
      </div>
      <div ref={listRef} className="h-56 overflow-y-auto pr-1 space-y-2">
        <AnimatePresence initial={false}>
          {bubbles.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm border ${m.role === 'user' ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-slate-800 text-slate-100 border-slate-700'}`}>
                <div className="flex items-center gap-2 mb-0.5 opacity-80 text-xs">
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}<span>{m.role === 'user' ? 'You' : 'AI'}</span>
                </div>
                <div>{m.text}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() } }}
          placeholder="Ask about TRIR, permits, near misses, risk..."
          className="flex-1 bg-transparent border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-sm"
        />
        <button onClick={onSend} className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-2 rounded transition-colors">
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  )
}

export default AIChat