import React, { useMemo, useRef, useState } from 'react'
import { useHSEStore, generateAIResponse } from '../store/useHSEStore'

function AIChat() {
  const messages = useHSEStore(s => s.chat.messages)
  const pushMessage = useHSEStore(s => s.pushMessage)
  const markAllRead = useHSEStore(s => s.markAllRead)
  const state = useHSEStore()
  const [text, setText] = useState('')
  const listRef = useRef(null)

  const sorted = useMemo(() => messages.slice().sort((a,b) => a.timestamp - b.timestamp), [messages])

  const send = () => {
    const content = text.trim()
    if (!content) return
    pushMessage({ sender: 'user', text: content })
    setText('')
    // heuristic AI response
    const reply = generateAIResponse(content, state)
    setTimeout(() => {
      pushMessage({ sender: 'ai', text: reply })
    }, 400)
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/70 backdrop-blur-md dark:bg-zinc-900/60 shadow p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Chat Assistant</h2>
        <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">Mark read</button>
      </div>
      <div ref={listRef} className="mt-3 max-h-64 overflow-auto pr-1">
        {sorted.map(m => (
          <div key={m.id} className={`mb-2 flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm shadow ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-zinc-800 dark:text-white border border-white/10 rounded-bl-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key==='Enter' && send()} placeholder="Ask AI about safety..." className="w-full rounded-lg border border-white/10 bg-white/70 dark:bg-zinc-800/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40" />
        <button onClick={send} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">Send</button>
      </div>
    </div>
  )
}

export default AIChat